"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  ImageQuestion,
  QuizMode,
  Difficulty,
  RevealMode,
} from "@/lib/image-quiz-types";
import {
  QUIZ_MODES,
  DIFFICULTIES,
  REVEAL_MODES,
  TIMER_PRESETS,
  formatTimer,
  formatTimerLabel,
  generateId,
} from "@/lib/image-quiz-types";
import styles from "@/styles/admin.module.css";
import { generateDistractors, regenerateOption } from "@/lib/distractor-generator";

const STORAGE_KEY = "image_quiz_library";

function loadLibrary(): ImageQuestion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLibrary(questions: ImageQuestion[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch { /* ignore */ }
}

interface PanelProps {
  addEvent?: (type: string, data: string) => void;
}

const LABELS = ["A", "B", "C", "D"] as const;

export default function ImageQuizPanel({ addEvent }: PanelProps) {
  // Active tab in the panel
  const [panelTab, setPanelTab] = useState<"create" | "library" | "preview">("create");

  // Form state
  const [quizMode, setQuizMode] = useState<QuizMode>("character");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [hint, setHint] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [revealMode, setRevealMode] = useState<RevealMode>("normal");
  const [timerValue, setTimerValue] = useState(30);
  const [customTimer, setCustomTimer] = useState("");
  const [anime, setAnime] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Options state
  const [options, setOptions] = useState<[string, string, string, string]>(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Library
  const [library, setLibrary] = useState<ImageQuestion[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [libraryFilter, setLibraryFilter] = useState<{
    mode: QuizMode | "";
    difficulty: Difficulty | "";
    anime: string;
    search: string;
  }>({ mode: "", difficulty: "", anime: "", search: "" });

  // Session
  const [sessionStatus, setSessionStatus] = useState<string>("idle");
  const [livePreview, setLivePreview] = useState<ImageQuestion | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load library on mount
  useEffect(() => {
    setLibrary(loadLibrary());
  }, []);

  // Auto-generate distractors when correct answer changes
  useEffect(() => {
    if (!correctAnswer.trim() || generating) return;
    const timer = setTimeout(() => {
      generateOptions(correctAnswer);
    }, 400);
    return () => clearTimeout(timer);
  }, [correctAnswer, quizMode]);

  const generateOptions = useCallback(
    (answer: string) => {
      if (!answer.trim()) return;
      setGenerating(true);
      try {
        const result = generateDistractors(answer.trim(), quizMode);
        setOptions(result.options);
        setCorrectOptionIndex(result.correctOptionIndex);
        if (result.anime && !anime) setAnime(result.anime);
      } catch {
        const opts: [string, string, string, string] = [answer, "", "", ""];
        setOptions(opts);
      }
      setGenerating(false);
    },
    [quizMode, anime],
  );

  const handleImageUpload = useCallback(async (file: File) => {
    setUploading(true);
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setUploading(false);
  }, []);

  const handleImageDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleImageUpload(file);
  }, [handleImageUpload]);

  const uploadToServer = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/game/upload", { method: "POST", body: formData });
      if (!res.ok) return null;
      const data = await res.json();
      return data.url || null;
    } catch {
      return null;
    }
  };

  const shuffleOptions = useCallback(() => {
    const currentCorrect = options[correctOptionIndex];
    const indices = [0, 1, 2, 3].filter(i => i !== correctOptionIndex);
    const shuffled = indices.sort(() => Math.random() - 0.5);
    const newOptions: [string, string, string, string] = ["", "", "", ""];
    const newCorrectIndex = Math.floor(Math.random() * 4);
    newOptions[newCorrectIndex] = currentCorrect;
    let pos = 0;
    for (let i = 0; i < 4; i++) {
      if (i !== newCorrectIndex) {
        newOptions[i] = options[shuffled[pos]];
        pos++;
      }
    }
    setOptions(newOptions);
    setCorrectOptionIndex(newCorrectIndex);
  }, [options, correctOptionIndex]);

  const regenerateSingle = useCallback(
    (index: number) => {
      const newOption = regenerateOption(options, correctAnswer, quizMode, index);
      const newOptions: [string, string, string, string] = [...options];
      newOptions[index] = newOption;
      setOptions(newOptions);
    },
    [options, correctAnswer, quizMode],
  );

  const setOption = useCallback((index: number, value: string) => {
    const newOptions: [string, string, string, string] = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  }, []);

  const validate = useCallback((): string | null => {
    if (!imagePreview && !editingId) return "Missing image";
    if (!correctAnswer.trim()) return "Missing correct answer";
    if (!questionTitle.trim()) return "Missing question title";
    if (options.some(o => !o.trim())) return "All answers must be filled";
    const unique = new Set(options.map(o => o.trim().toLowerCase()));
    if (unique.size < 4) return "Duplicate answers detected";
    if (!options[correctOptionIndex]?.trim()) return "Missing correct answer selection";
    if (timerValue < 5) return "Timer cannot be below 5 seconds";
    if (timerValue > 3600) return "Timer cannot exceed 1 hour";
    return null;
  }, [imagePreview, editingId, correctAnswer, questionTitle, options, correctOptionIndex, timerValue]);

  const saveQuestion = useCallback(async () => {
    const error = validate();
    if (error) {
      addEvent?.("VALIDATION", error);
      return;
    }

    let imageUrl = imagePreview || "";
    if (imageFile && imagePreview?.startsWith("data:")) {
      const url = await uploadToServer(imageFile);
      if (url) imageUrl = url;
    }

    const question: ImageQuestion = {
      id: editingId || generateId(),
      imageUrl,
      quizMode,
      correctAnswer: correctAnswer.trim(),
      options: options.map(o => o.trim()) as [string, string, string, string],
      correctOptionIndex,
      title: questionTitle.trim(),
      hint: hint.trim(),
      difficulty,
      revealMode,
      timeLimit: timerValue,
      anime: anime.trim(),
      createdAt: editingId ? (library.find(q => q.id === editingId)?.createdAt || Date.now()) : Date.now(),
      locked: editingId ? locked : false,
    };

    const newLibrary = editingId
      ? library.map(q => q.id === editingId ? question : q)
      : [question, ...library];

    setLibrary(newLibrary);
    saveLibrary(newLibrary);
    addEvent?.("SAVE", `${editingId ? "Updated" : "Created"}: ${question.title}`);
    resetForm();
  }, [validate, imagePreview, imageFile, editingId, quizMode, correctAnswer, options, correctOptionIndex, questionTitle, hint, difficulty, revealMode, timerValue, anime, locked, library, addEvent]);

  const resetForm = useCallback(() => {
    setQuizMode("character");
    setCorrectAnswer("");
    setQuestionTitle("");
    setHint("");
    setDifficulty("medium");
    setRevealMode("normal");
    setTimerValue(30);
    setCustomTimer("");
    setAnime("");
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setOptions(["", "", "", ""]);
    setCorrectOptionIndex(0);
    setLocked(false);
    setGenerating(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const editQuestion = useCallback((q: ImageQuestion) => {
    setQuizMode(q.quizMode);
    setCorrectAnswer(q.correctAnswer);
    setQuestionTitle(q.title);
    setHint(q.hint || "");
    setDifficulty(q.difficulty);
    setRevealMode(q.revealMode);
    setTimerValue(q.timeLimit);
    setAnime(q.anime || "");
    setEditingId(q.id);
    setImagePreview(q.imageUrl);
    setImageFile(null);
    setOptions(q.options);
    setCorrectOptionIndex(q.correctOptionIndex);
    setLocked(q.locked);
    setPanelTab("create");
  }, []);

  const duplicateQuestion = useCallback((q: ImageQuestion) => {
    const copy: ImageQuestion = { ...q, id: generateId(), createdAt: Date.now() };
    const newLibrary = [copy, ...library];
    setLibrary(newLibrary);
    saveLibrary(newLibrary);
    addEvent?.("DUPLICATE", copy.title);
  }, [library, addEvent]);

  const deleteQuestion = useCallback((id: string) => {
    const newLibrary = library.filter(q => q.id !== id);
    setLibrary(newLibrary);
    saveLibrary(newLibrary);
    setSelectedIds(prev => { const next = new Set(prev); next.delete(id); return next; });
    addEvent?.("DELETE", id);
  }, [library, addEvent]);

  const bulkDelete = useCallback(() => {
    const newLibrary = library.filter(q => !selectedIds.has(q.id));
    setLibrary(newLibrary);
    saveLibrary(newLibrary);
    addEvent?.("BULK_DELETE", `${selectedIds.size} items`);
    setSelectedIds(new Set());
  }, [library, selectedIds, addEvent]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const startSession = useCallback(async (question: ImageQuestion) => {
    try {
      const res = await fetch("/api/new-image-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start", question }),
      });
      if (res.ok) {
        setSessionStatus("active");
        setLivePreview(question);
        addEvent?.("START", question.title);
      }
    } catch { /* ignore */ }
  }, [addEvent]);

  const stopSession = useCallback(async () => {
    try {
      await fetch("/api/new-image-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "stop" }),
      });
      setSessionStatus("idle");
      setLivePreview(null);
      addEvent?.("STOP", "");
    } catch { /* ignore */ }
  }, [addEvent]);

  const resetAll = useCallback(async () => {
    await stopSession();
    setLibrary([]);
    saveLibrary([]);
    setSelectedIds(new Set());
    setEditingId(null);
    setPanelTab("create");
    resetForm();
  }, [stopSession]);

  const revealAnswer = useCallback(async () => {
    try {
      await fetch("/api/new-image-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "end" }),
      });
      setSessionStatus("revealing");
      addEvent?.("REVEAL", "");
    } catch { /* ignore */ }
  }, [addEvent]);

  const parseCustomTimer = useCallback((value: string) => {
    const parts = value.split(":").map(Number);
    if (parts.length === 3) {
      const [h, m, s] = parts;
      const total = h * 3600 + m * 60 + s;
      if (total >= 5 && total <= 3600) setTimerValue(total);
    } else if (parts.length === 2) {
      const [m, s] = parts;
      const total = m * 60 + s;
      if (total >= 5 && total <= 3600) setTimerValue(total);
    }
  }, []);

  const filteredLibrary = library.filter(q => {
    if (libraryFilter.mode && q.quizMode !== libraryFilter.mode) return false;
    if (libraryFilter.difficulty && q.difficulty !== libraryFilter.difficulty) return false;
    if (libraryFilter.anime && !q.anime?.toLowerCase().includes(libraryFilter.anime.toLowerCase())) return false;
    if (libraryFilter.search) {
      const qs = libraryFilter.search.toLowerCase();
      if (!q.title.toLowerCase().includes(qs) && !q.correctAnswer.toLowerCase().includes(qs)) return false;
    }
    return true;
  });

  // Build the live preview question from form state
  const getPreviewQuestion = useCallback((): ImageQuestion | null => {
    if (!imagePreview || !correctAnswer.trim()) return null;
    const validOptions = options.every(o => o.trim());
    if (!validOptions) return null;
    return {
      id: editingId || "preview",
      imageUrl: imagePreview,
      quizMode,
      correctAnswer: correctAnswer.trim(),
      options: options.map(o => o.trim()) as [string, string, string, string],
      correctOptionIndex,
      title: questionTitle.trim() || "Untitled",
      hint: hint.trim(),
      difficulty,
      revealMode,
      timeLimit: timerValue,
      anime: anime.trim(),
      createdAt: Date.now(),
      locked: false,
    };
  }, [imagePreview, correctAnswer, options, correctOptionIndex, questionTitle, hint, difficulty, revealMode, timerValue, anime, quizMode, editingId]);

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Tab bar */}
      <div className="flex gap-2">
        {[
          ["create", "Create"],
          ["library", `Library (${library.length})`],
          ["preview", "Preview"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setPanelTab(key as "create" | "library" | "preview")}
            className={`btn-neon text-sm px-4 ${styles.adminTab} ${
              panelTab === key ? `${styles.adminTabActive} btn-neon-purple` : `${styles.adminTabInactive} bg-slate-800/50 text-gray-400`
            }`}
          >
            {label}
          </button>
        ))}
        {sessionStatus === "active" && (
          <span className={`ml-auto flex items-center gap-2 text-xs px-3 py-1 rounded-full border animate-pulse ${styles.statusBadge} ${styles.statusBadgeLive}`}>
            <span className="w-2 h-2 rounded-full bg-green-400" />
            LIVE
          </span>
        )}
      </div>

      {/* ─── CREATE PANEL ─── */}
      {panelTab === "create" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column: Form */}
          <div className={`glass-card neon-border p-5 space-y-4 ${styles.adminCard}`}>
            <h2 className={`text-lg font-bold text-purple-300 ${styles.sectionTitle}`} style={{ fontFamily: "Orbitron" }}>
              {editingId ? "EDIT QUESTION" : "CREATE QUESTION"}
            </h2>

            {/* Image Upload */}
            <div>
              <label className={`text-xs text-gray-500 block mb-1 ${styles.filterLabel}`}>Upload Image</label>
              <div
                onDrop={handleImageDrop}
                onDragOver={(e) => e.preventDefault()}
                className={`border-2 border-dashed border-slate-600 rounded-xl p-4 text-center cursor-pointer hover:border-purple-500/50 transition-colors ${styles.uploadZone}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-contain" />
                    <button
                      onClick={(e) => { e.stopPropagation(); setImagePreview(null); setImageFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center hover:bg-red-500"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="py-6 text-gray-500">
                    <div className="text-3xl mb-2">📁</div>
                    <p className="text-sm">Drag & drop or click to upload</p>
                    <p className="text-xs text-gray-600 mt-1">JPG, PNG, WEBP</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                />
              </div>
            </div>

            {/* Quiz Mode */}
            <div className={styles.formField}>
              <label className={styles.formLabel}>Quiz Mode</label>
              <select
                value={quizMode}
                onChange={(e) => setQuizMode(e.target.value as QuizMode)}
                className={`w-full text-sm ${styles.formInput}`}
              >
                {QUIZ_MODES.map(m => (
                  <option key={m.id} value={m.id}>{m.icon} {m.label}</option>
                ))}
              </select>
            </div>

            {/* Correct Answer */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Correct Answer</label>
              <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="e.g. Naruto Uzumaki"
                className="w-full"
              />
              {generating && (
                <p className="text-xs text-yellow-400 mt-1 animate-pulse">Generating options...</p>
              )}
            </div>

            {/* Question Title */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Question Title</label>
              <input
                type="text"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                placeholder="Who is this character?"
                className="w-full"
              />
            </div>

            {/* Hint */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Hint <span className="text-gray-600">(optional)</span>
              </label>
              <input
                type="text"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="Think orange..."
                className="w-full"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Difficulty</label>
              <div className="flex gap-2">
                {DIFFICULTIES.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDifficulty(d.id)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                      difficulty === d.id
                        ? d.id === "easy" ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/60"
                          : d.id === "medium" ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500/60"
                          : "bg-orange-500/30 text-orange-300 border border-orange-500/60"
                        : "bg-slate-800/50 text-gray-500 border border-transparent"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reveal Mode */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Image Reveal Mode</label>
              <select
                value={revealMode}
                onChange={(e) => setRevealMode(e.target.value as RevealMode)}
                className="w-full text-sm"
              >
                {REVEAL_MODES.map(m => (
                  <option key={m.id} value={m.id}>{m.label} — {m.description}</option>
                ))}
              </select>
            </div>

            {/* Timer */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Timer <span className="text-gray-600">({formatTimer(timerValue)})</span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {TIMER_PRESETS.map(t => (
                  <button
                    key={t}
                    onClick={() => { setTimerValue(t); setCustomTimer(""); }}
                    className={`px-2 py-1 text-xs rounded-lg transition-all ${
                      timerValue === t && !customTimer
                        ? "bg-purple-500/30 text-purple-300 border border-purple-500/60"
                        : "bg-slate-800/40 text-gray-400 border border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    {formatTimerLabel(t)}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-500">Custom:</span>
                <input
                  type="text"
                  value={customTimer}
                  onChange={(e) => setCustomTimer(e.target.value)}
                  onBlur={() => customTimer && parseCustomTimer(customTimer)}
                  onKeyDown={(e) => e.key === "Enter" && customTimer && parseCustomTimer(customTimer)}
                  placeholder="HH:MM:SS"
                  className="w-24 text-sm text-center"
                />
                <span className="text-xs text-gray-600">
                  {timerValue < 5 ? "Min 5s" : timerValue > 3600 ? "Max 1h" : ""}
                </span>
              </div>
            </div>

            {/* Anime */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Anime / Franchise</label>
              <input
                type="text"
                value={anime}
                onChange={(e) => setAnime(e.target.value)}
                placeholder="Naruto"
                className="w-full"
              />
            </div>

            {/* Lock */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={locked}
                onChange={(e) => setLocked(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-300">Lock question (prevent edits)</span>
            </label>

            {/* Save */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={saveQuestion}
                disabled={!imagePreview || !correctAnswer.trim() || !questionTitle.trim()}
                className={`btn-neon flex-1 py-2 ${
                  !imagePreview || !correctAnswer.trim() || !questionTitle.trim()
                    ? "bg-slate-700 text-gray-500 cursor-not-allowed"
                    : "btn-neon-purple"
                }`}
              >
                {editingId ? "UPDATE QUESTION" : "SAVE QUESTION"}
              </button>
              {editingId && (
                <button onClick={resetForm} className="btn-neon bg-slate-700 text-gray-300 py-2 px-4">
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Answers */}
          <div className={`glass-card neon-border p-5 space-y-4 ${styles.adminCard}`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold text-cyan-300 ${styles.sectionTitle}`} style={{ fontFamily: "Orbitron" }}>
                ANSWER MANAGEMENT
              </h2>
              <div className="flex gap-1">
                <button
                  onClick={shuffleOptions}
                  className="text-xs px-2 py-1 rounded bg-slate-700 text-gray-300 hover:bg-slate-600"
                  title="Shuffle answers"
                >
                  🔀
                </button>
                <button
                  onClick={() => generateOptions(correctAnswer)}
                  className="text-xs px-2 py-1 rounded bg-slate-700 text-gray-300 hover:bg-slate-600"
                  title="Regenerate all distractors"
                >
                  🔄
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Click to mark as correct. Lock prevents accidental edits.
            </p>

            <div className="space-y-2">
              {LABELS.map((label, i) => {
                const isCorrect = correctOptionIndex === i;
                const isLocked = locked;
                return (
                  <div
                    key={label}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${styles.answerRow} ${
                      isCorrect
                        ? `${styles.answerRowCorrect} border-green-500/60`
                        : "border-slate-700 bg-slate-800/30"
                    }`}
                  >
                    <button
                      onClick={() => !isLocked && setCorrectOptionIndex(i)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                        isCorrect
                          ? "bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                          : "bg-slate-700 text-gray-400 hover:bg-slate-600"
                      }`}
                    >
                      {isCorrect ? "✓" : label}
                    </button>
                    <input
                      type="text"
                      value={options[i]}
                      onChange={(e) => !isLocked && setOption(i, e.target.value)}
                      className={`flex-1 text-sm bg-transparent border-b ${
                        isCorrect
                          ? "border-green-500/40 text-green-200 font-semibold"
                          : "border-slate-700 text-gray-300"
                      } focus:outline-none focus:border-purple-500`}
                      disabled={isLocked}
                      placeholder={`Answer ${label}`}
                    />
                    {!isLocked && (
                      <button
                        onClick={() => regenerateSingle(i)}
                        className="text-xs px-2 py-1 rounded bg-slate-700 text-gray-400 hover:bg-slate-600 shrink-0"
                        title="Regenerate this option"
                      >
                        ↻
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => startSession(getPreviewQuestion()!)}
                disabled={!getPreviewQuestion() || sessionStatus === "active"}
                className={`btn-neon flex-1 py-2 ${
                  !getPreviewQuestion() || sessionStatus === "active"
                    ? "bg-slate-700 text-gray-500 cursor-not-allowed"
                    : "btn-neon-green"
                }`}
              >
                {sessionStatus === "active" ? "▶ LIVE" : "▶ START SESSION"}
              </button>
              <button
                onClick={revealAnswer}
                disabled={sessionStatus !== "active"}
                className={`btn-neon flex-1 py-2 ${
                  sessionStatus !== "active"
                    ? "bg-slate-700 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-600 text-white hover:bg-yellow-500"
                }`}
              >
                Reveal
              </button>
              <button
                onClick={stopSession}
                disabled={sessionStatus === "idle"}
                className={`btn-neon flex-1 py-2 ${
                  sessionStatus === "idle"
                    ? "bg-slate-700 text-gray-500 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-500"
                }`}
              >
                Stop
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── LIBRARY PANEL ─── */}
      {panelTab === "library" && (
        <div className={`glass-card neon-border p-5 space-y-4 ${styles.adminCard}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-bold text-purple-300 ${styles.sectionTitle}`} style={{ fontFamily: "Orbitron" }}>
              QUESTION LIBRARY
            </h2>
            <span className="text-xs text-gray-500">{library.length} questions</span>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div>
              <label className={styles.filterLabel}>Mode</label>
              <select
                value={libraryFilter.mode}
                onChange={(e) => setLibraryFilter(f => ({ ...f, mode: e.target.value as QuizMode | "" }))}
                className="w-full text-xs"
              >
                <option value="">All Modes</option>
                {QUIZ_MODES.map(m => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Difficulty</label>
              <select
                value={libraryFilter.difficulty}
                onChange={(e) => setLibraryFilter(f => ({ ...f, difficulty: e.target.value as Difficulty | "" }))}
                className="w-full text-xs"
              >
                <option value="">All Difficulties</option>
                {DIFFICULTIES.map(d => (
                  <option key={d.id} value={d.id}>{d.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Anime</label>
              <input
                type="text"
                value={libraryFilter.anime}
                onChange={(e) => setLibraryFilter(f => ({ ...f, anime: e.target.value }))}
                placeholder="Filter by anime..."
                className="w-full text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Search</label>
              <input
                type="text"
                value={libraryFilter.search}
                onChange={(e) => setLibraryFilter(f => ({ ...f, search: e.target.value }))}
                placeholder="Title or answer..."
                className="w-full text-xs"
              />
            </div>
          </div>

          {/* Bulk actions */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
              <span className="text-xs text-red-300">{selectedIds.size} selected</span>
              <button onClick={bulkDelete} className="text-xs px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500">
                Delete Selected
              </button>
              <button onClick={() => setSelectedIds(new Set())} className="text-xs px-3 py-1 rounded bg-slate-700 text-gray-300">
                Clear
              </button>
            </div>
          )}

          {/* Empty state */}
          {library.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-sm">No questions yet. Create one in the Create tab.</p>
            </div>
          )}

          {/* Question list */}
          {library.length > 0 && (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredLibrary.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No questions match your filters.</p>
              ) : (
                filteredLibrary.map(q => (
                  <div
                    key={q.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${styles.libraryItem} ${
                      selectedIds.has(q.id)
                        ? `${styles.libraryItemSelected} border-purple-500/60 bg-purple-500/10`
                        : "border-slate-700/50 bg-slate-800/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.has(q.id)}
                      onChange={() => toggleSelect(q.id)}
                      className="w-4 h-4 rounded shrink-0"
                    />
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-700 shrink-0">
                      {q.imageUrl && (
                        <img src={q.imageUrl} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-200 truncate">{q.title}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {q.correctAnswer} · {q.quizMode} · {q.difficulty}
                        {q.anime ? ` · ${q.anime}` : ""} · {formatTimer(q.timeLimit)}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => editQuestion(q)}
                        className="text-xs px-2 py-1 rounded bg-slate-700 text-gray-300 hover:bg-slate-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => duplicateQuestion(q)}
                        className="text-xs px-2 py-1 rounded bg-slate-700 text-gray-300 hover:bg-slate-600"
                      >
                        Dup
                      </button>
                      <button
                        onClick={() => deleteQuestion(q.id)}
                        className="text-xs px-2 py-1 rounded bg-red-600/50 text-red-300 hover:bg-red-600"
                      >
                        Del
                      </button>
                      <button
                        onClick={() => startSession(q)}
                        disabled={sessionStatus === "active"}
                        className={`text-xs px-2 py-1 rounded ${
                          sessionStatus === "active"
                            ? "bg-slate-700 text-gray-600"
                            : "bg-green-600/50 text-green-300 hover:bg-green-600"
                        }`}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* ─── PREVIEW PANEL ─── */}
      {panelTab === "preview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Preview rendering */}
          <div className={`glass-card neon-border p-5 ${styles.adminCard}`}>
            <h2 className={`text-lg font-bold text-cyan-300 mb-4 ${styles.sectionTitle}`} style={{ fontFamily: "Orbitron" }}>
              LIVE PREVIEW
            </h2>
            {livePreview ? <QuestionPreviewDisplay question={livePreview} /> : (
              getPreviewQuestion() ? <QuestionPreviewDisplay question={getPreviewQuestion()!} /> : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-3">👁️</div>
                  <p className="text-sm">Upload an image and type a correct answer to see preview.</p>
                </div>
              )
            )}
          </div>

          {/* Session info */}
          <div className={`glass-card neon-border p-5 space-y-3 ${styles.adminCard}`}>
            <h2 className={`text-lg font-bold text-purple-300 ${styles.sectionTitle}`} style={{ fontFamily: "Orbitron" }}>
              SESSION INFO
            </h2>
            {livePreview && sessionStatus !== "idle" ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Status:</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    sessionStatus === "active" ? "bg-green-600 text-white animate-pulse" : "bg-yellow-600 text-white"
                  }`}>
                    {sessionStatus}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-800/40 rounded-lg p-2">
                    <span className="text-gray-500">Mode</span>
                    <p className="text-gray-200 font-semibold">
                      {QUIZ_MODES.find(m => m.id === livePreview.quizMode)?.label || livePreview.quizMode}
                    </p>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-2">
                    <span className="text-gray-500">Difficulty</span>
                    <p className={`font-semibold ${
                      livePreview.difficulty === "easy" ? "text-cyan-300"
                      : livePreview.difficulty === "medium" ? "text-yellow-300"
                      : "text-orange-300"
                    }`}>{livePreview.difficulty}</p>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-2">
                    <span className="text-gray-500">Timer</span>
                    <p className="text-gray-200 font-semibold">{formatTimer(livePreview.timeLimit)}</p>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-2">
                    <span className="text-gray-500">Reveal</span>
                    <p className="text-gray-200 font-semibold">{REVEAL_MODES.find(r => r.id === livePreview.revealMode)?.label || livePreview.revealMode}</p>
                  </div>
                </div>
                <div className="bg-slate-800/40 rounded-lg p-2">
                  <span className="text-xs text-gray-500">Correct Answer</span>
                  <p className="text-green-300 font-bold text-lg">{livePreview.correctAnswer}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  {sessionStatus === "active" && (
                    <button onClick={revealAnswer} className="btn-neon bg-yellow-600 text-white py-2 px-4 flex-1">
                      Reveal Answer
                    </button>
                  )}
                  <button onClick={stopSession} className="btn-neon bg-red-600 text-white py-2 px-4 flex-1">
                    Stop Session
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500 space-y-4">
                <p className="text-sm">No active session. Start a question from the Create or Library tab.</p>
                <button onClick={resetAll} className="btn-neon bg-red-700/50 text-red-300 py-2 px-4 text-sm hover:bg-red-700">
                  Reset All
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PREVIEW SUB-COMPONENT ───
function QuestionPreviewDisplay({ question }: { question: ImageQuestion }) {
  const [revealProgress, setRevealProgress] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(question.timeLimit);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setRevealProgress(0);
    setShowAnswer(false);
    setTimeLeft(question.timeLimit);
    const startTime = Date.now();

    if (question.revealMode === "progressive") {
      progressRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setRevealProgress(Math.min(100, (elapsed / question.timeLimit) * 100));
      }, 200);
    }

    const tick = () => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setShowAnswer(true);
          return 0;
        }
        timerRef.current = setTimeout(tick, 1000);
        return prev - 1;
      });
    };
    timerRef.current = setTimeout(tick, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [question]);

  const getImageStyle = (): React.CSSProperties => {
    switch (question.revealMode) {
      case "blurred":
        return { filter: `blur(${Math.max(0, 20 - revealProgress * 0.2)}px)` };
      case "pixelated":
        const px = Math.max(2, 20 - revealProgress * 0.18);
        return { filter: `blur(${px}px)`, imageRendering: "pixelated" as React.CSSProperties["imageRendering"] };
      case "zoomed":
        const zoom = Math.max(1, 3 - (revealProgress / 100) * 2);
        return { transform: `scale(${zoom})`, objectFit: "cover" as const };
      case "silhouette":
        return { filter: `brightness(0) contrast(100%)` };
      case "progressive":
        return { filter: `blur(${Math.max(0, 15 - revealProgress * 0.15)}px) brightness(${0.3 + revealProgress * 0.007})` };
      default:
        return {};
    }
  };

  const modeInfo = QUIZ_MODES.find(m => m.id === question.quizMode);
  const diffInfo = DIFFICULTIES.find(d => d.id === question.difficulty);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
          {modeInfo?.icon} {modeInfo?.label || question.quizMode}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          timeLeft <= 5 ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
          : timeLeft <= 10 ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
          : "bg-slate-700/50 text-cyan-300 border border-cyan-500/40"
        }`}>
          {formatTimer(timeLeft)}
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full bg-slate-800/60 rounded-full h-1.5">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            timeLeft <= 5 ? "bg-gradient-to-r from-red-600 to-red-400"
            : timeLeft <= 10 ? "bg-gradient-to-r from-yellow-600 to-yellow-400"
            : "bg-gradient-to-r from-purple-600 to-pink-400"
          }`}
          style={{ width: `${(timeLeft / question.timeLimit) * 100}%` }}
        />
      </div>

      {/* Image */}
      <div className="relative rounded-xl overflow-hidden bg-slate-900/60 flex items-center justify-center aspect-video">
        <img
          src={question.imageUrl}
          alt="Quiz"
          className="max-w-full max-h-full object-contain transition-all duration-500"
          style={showAnswer ? {} : getImageStyle()}
        />
        {!showAnswer && question.revealMode !== "normal" && (
          <div className="absolute top-2 left-2 glass-card px-2 py-0.5 rounded-full text-xs">
            <span className="text-purple-300">{question.revealMode}</span>
          </div>
        )}
        {showAnswer && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="text-center animate-bounce-in">
              <p className="text-2xl font-black text-green-400">{question.correctAnswer}</p>
            </div>
          </div>
        )}
      </div>

      {/* Question title */}
      {question.title && (
        <p className="text-center font-semibold text-gray-200">{question.title}</p>
      )}

      {/* Hint */}
      {question.hint && !showAnswer && (
        <p className="text-center text-xs text-yellow-400">💡 {question.hint}</p>
      )}

      {/* Options */}
      <div className="grid grid-cols-2 gap-2">
        {(["A", "B", "C", "D"] as const).map((label, i) => {
          const isCorrect = question.correctOptionIndex === i;
          return (
            <div
              key={label}
              className={`flex items-center gap-2 p-2 rounded-xl border-2 transition-all ${
                showAnswer && isCorrect
                  ? "border-green-400 bg-green-500/20"
                  : showAnswer && !isCorrect
                  ? "border-gray-700 bg-gray-800/30 opacity-40"
                  : ["border-cyan-500/30", "border-pink-500/30", "border-amber-500/30", "border-emerald-500/30"][i]
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0 ${
                showAnswer && isCorrect ? "bg-green-500"
                : showAnswer && !isCorrect ? "bg-gray-700"
                : ["bg-cyan-500", "bg-pink-500", "bg-amber-500", "bg-emerald-500"][i]
              }`}>
                {showAnswer && isCorrect ? "✓" : label}
              </div>
              <span className={`text-xs font-semibold truncate ${
                showAnswer && isCorrect ? "text-green-200"
                : showAnswer && !isCorrect ? "text-gray-600"
                : "text-gray-200"
              }`}>
                {question.options[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
