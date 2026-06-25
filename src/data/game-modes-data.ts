// 
// ANIME WIZ — Game Modes Content Database
// Who Wins matchups, Hot Takes, Tier List characters, Tournament seeds
// 

// Character Database for Who Wins / Tier List 
export interface AnimeCharacter {
 name: string;
 anime: string;
 tier: "S"|"A"|"B"|"C"|"D";
 power: number; // 1-100
 tags: string[]; // strength, speed, magic, sword, intelligence, leadership
}

export const CHARACTERS: AnimeCharacter[] = [
 // Dragon Ball
 {name:"Son Goku",anime:"Dragon Ball",tier:"S",power:99,tags:["strength","speed","martial arts"]},
 {name:"Vegeta",anime:"Dragon Ball",tier:"S",power:96,tags:["strength","speed","pride"]},
 {name:"Frieza",anime:"Dragon Ball",tier:"S",power:94,tags:["strength","villain","alien"]},
 {name:"Gohan",anime:"Dragon Ball",tier:"A",power:88,tags:["strength","potential","hybrid"]},
 {name:"Broly",anime:"Dragon Ball",tier:"S",power:97,tags:["strength","berserker"]},
 {name:"Beerus",anime:"Dragon Ball",tier:"S",power:100,tags:["strength","god","destruction"]},
 // Naruto
 {name:"Naruto Uzumaki",anime:"Naruto",tier:"S",power:95,tags:["strength","speed","ninja"]},
 {name:"Sasuke Uchiha",anime:"Naruto",tier:"S",power:93,tags:["speed","intelligence","sword"]},
 {name:"Madara Uchiha",anime:"Naruto",tier:"S",power:96,tags:["strength","intelligence","villain"]},
 {name:"Itachi Uchiha",anime:"Naruto",tier:"A",power:89,tags:["intelligence","genjutsu","speed"]},
 {name:"Kakashi Hatake",anime:"Naruto",tier:"A",power:82,tags:["intelligence","speed","leadership"]},
 {name:"Minato Namikaze",anime:"Naruto",tier:"S",power:91,tags:["speed","intelligence","leadership"]},
 {name:"Pain/Nagato",anime:"Naruto",tier:"S",power:90,tags:["strength","villain","rinnegan"]},
 {name:"Rock Lee",anime:"Naruto",tier:"B",power:72,tags:["strength","speed","martial arts"]},
 // One Piece
 {name:"Monkey D. Luffy",anime:"One Piece",tier:"S",power:94,tags:["strength","speed","leadership"]},
 {name:"Roronoa Zoro",anime:"One Piece",tier:"A",power:88,tags:["sword","strength","endurance"]},
 {name:"Sanji",anime:"One Piece",tier:"A",power:84,tags:["speed","strength","intelligence"]},
 {name:"Shanks",anime:"One Piece",tier:"S",power:96,tags:["sword","strength","leadership"]},
 {name:"Kaido",anime:"One Piece",tier:"S",power:98,tags:["strength","endurance","villain"]},
 {name:"Whitebeard",anime:"One Piece",tier:"S",power:97,tags:["strength","leadership"]},
 {name:"Blackbeard",anime:"One Piece",tier:"S",power:93,tags:["strength","villain","devil fruit"]},
 // Bleach
 {name:"Ichigo Kurosaki",anime:"Bleach",tier:"S",power:92,tags:["sword","strength","speed"]},
 {name:"Sosuke Aizen",anime:"Bleach",tier:"S",power:95,tags:["intelligence","villain","magic"]},
 {name:"Kenpachi Zaraki",anime:"Bleach",tier:"A",power:90,tags:["sword","strength","berserker"]},
 {name:"Byakuya Kuchiki",anime:"Bleach",tier:"A",power:85,tags:["sword","speed","intelligence"]},
 {name:"Yamamoto",anime:"Bleach",tier:"S",power:96,tags:["sword","strength","leadership"]},
 // JJK
 {name:"Gojo Satoru",anime:"Jujutsu Kaisen",tier:"S",power:98,tags:["magic","speed","intelligence"]},
 {name:"Sukuna",anime:"Jujutsu Kaisen",tier:"S",power:99,tags:["strength","magic","villain"]},
 {name:"Yuji Itadori",anime:"Jujutsu Kaisen",tier:"A",power:80,tags:["strength","speed","martial arts"]},
 {name:"Megumi Fushiguro",anime:"Jujutsu Kaisen",tier:"A",power:78,tags:["magic","intelligence"]},
 {name:"Toji Fushiguro",anime:"Jujutsu Kaisen",tier:"A",power:88,tags:["strength","speed","assassin"]},
 // Attack on Titan
 {name:"Levi Ackerman",anime:"Attack on Titan",tier:"A",power:85,tags:["speed","sword","leadership"]},
 {name:"Eren Yeager",anime:"Attack on Titan",tier:"S",power:92,tags:["strength","villain","titan"]},
 {name:"Mikasa Ackerman",anime:"Attack on Titan",tier:"A",power:83,tags:["strength","speed","sword"]},
 // Demon Slayer
 {name:"Tanjiro Kamado",anime:"Demon Slayer",tier:"A",power:78,tags:["sword","speed","endurance"]},
 {name:"Muzan Kibutsuji",anime:"Demon Slayer",tier:"S",power:93,tags:["strength","villain","immortal"]},
 {name:"Yoriichi Tsugikuni",anime:"Demon Slayer",tier:"S",power:99,tags:["sword","speed","legendary"]},
 {name:"Gyomei Himejima",anime:"Demon Slayer",tier:"A",power:86,tags:["strength","endurance"]},
 {name:"Akaza",anime:"Demon Slayer",tier:"A",power:85,tags:["strength","martial arts","villain"]},
 // HxH
 {name:"Gon Freecss",anime:"Hunter x Hunter",tier:"A",power:80,tags:["strength","potential"]},
 {name:"Killua Zoldyck",anime:"Hunter x Hunter",tier:"A",power:82,tags:["speed","intelligence","assassin"]},
 {name:"Meruem",anime:"Hunter x Hunter",tier:"S",power:97,tags:["strength","intelligence","villain"]},
 {name:"Hisoka",anime:"Hunter x Hunter",tier:"A",power:84,tags:["intelligence","speed","villain"]},
 {name:"Netero",anime:"Hunter x Hunter",tier:"S",power:90,tags:["strength","speed","martial arts"]},
 // MHA
 {name:"All Might",anime:"My Hero Academia",tier:"S",power:95,tags:["strength","speed","leadership"]},
 {name:"Deku (Izuku)",anime:"My Hero Academia",tier:"A",power:85,tags:["strength","speed","potential"]},
 {name:"Endeavor",anime:"My Hero Academia",tier:"A",power:82,tags:["strength","leadership"]},
 {name:"All For One",anime:"My Hero Academia",tier:"S",power:93,tags:["villain","intelligence","strength"]},
 // Other
 {name:"Saitama",anime:"One Punch Man",tier:"S",power:100,tags:["strength","speed","comedy"]},
 {name:"Guts",anime:"Berserk",tier:"A",power:87,tags:["sword","strength","endurance"]},
 {name:"Griffith/Femto",anime:"Berserk",tier:"S",power:95,tags:["villain","intelligence","magic"]},
 {name:"Lelouch",anime:"Code Geass",tier:"A",power:65,tags:["intelligence","leadership","strategy"]},
 {name:"Light Yagami",anime:"Death Note",tier:"B",power:50,tags:["intelligence","strategy"]},
 {name:"Mob",anime:"Mob Psycho 100",tier:"S",power:92,tags:["magic","psychic"]},
 {name:"Meliodas",anime:"Seven Deadly Sins",tier:"S",power:94,tags:["strength","speed","sword"]},
 {name:"Rimuru Tempest",anime:"Slime Isekai",tier:"S",power:96,tags:["magic","intelligence","strength"]},
 {name:"Ainz Ooal Gown",anime:"Overlord",tier:"S",power:93,tags:["magic","intelligence","villain"]},
 {name:"Spike Spiegel",anime:"Cowboy Bebop",tier:"B",power:60,tags:["martial arts","intelligence"]},
  {name:"Edward Elric",anime:"FMA",tier:"A",power:75,tags:["intelligence","martial arts","magic"]},
  // JJK additions
  {name:"Yuta Okkotsu",anime:"Jujutsu Kaisen",tier:"S",power:92,tags:["magic","sword","curse"]},
  {name:"Hakari Kinji",anime:"Jujutsu Kaisen",tier:"A",power:85,tags:["magic","endurance","luck"]},
  // Demon Slayer additions
  {name:"Kyojuro Rengoku",anime:"Demon Slayer",tier:"A",power:83,tags:["sword","speed","fire"]},
  {name:"Shinobu Kocho",anime:"Demon Slayer",tier:"B",power:72,tags:["sword","speed","poison"]},
  // One Piece additions
  {name:"Akainu",anime:"One Piece",tier:"S",power:94,tags:["strength","villain","magma"]},
  {name:"Aokiji",anime:"One Piece",tier:"A",power:90,tags:["strength","ice","speed"]},
  {name:"Mihawk",anime:"One Piece",tier:"S",power:95,tags:["sword","strength","speed"]},
  // Naruto additions
  {name:"Obito Uchiha",anime:"Naruto",tier:"S",power:91,tags:["strength","villain","kamui"]},
  {name:"Hashirama Senju",anime:"Naruto",tier:"S",power:95,tags:["strength","regeneration","sage"]},
  // Recent hits
  {name:"Sung Jinwoo",anime:"Solo Leveling",tier:"S",power:97,tags:["strength","speed","shadow"]},
  {name:"Frieren",anime:"Frieren: Beyond Journey's End",tier:"A",power:85,tags:["magic","intelligence","mage"]},
  {name:"Denji",anime:"Chainsaw Man",tier:"A",power:80,tags:["strength","speed","chainsaw"]},
  {name:"Power",anime:"Chainsaw Man",tier:"B",power:68,tags:["strength","blood","devil"]},
  {name:"Aki Hayakawa",anime:"Chainsaw Man",tier:"B",power:65,tags:["sword","curse","intelligence"]},
  {name:"Makima",anime:"Chainsaw Man",tier:"S",power:88,tags:["intelligence","villain","control"]},
  {name:"Reze",anime:"Chainsaw Man",tier:"B",power:70,tags:["strength","bomb","speed"]},
  // Other series
  {name:"Vash the Stampede",anime:"Trigun",tier:"B",power:70,tags:["speed","gunman","pacifist"]},
  {name:"Kazuma Satou",anime:"Konosuba",tier:"C",power:45,tags:["intelligence","strategy","luck"]},
  {name:"Megumin",anime:"Konosuba",tier:"C",power:50,tags:["magic","explosion","glass cannon"]},
  {name:"Aqua (Konosuba)",anime:"Konosuba",tier:"D",power:35,tags:["magic","healing","useless"]},
  {name:"Darkness",anime:"Konosuba",tier:"C",power:55,tags:["strength","endurance","tank"]},
  {name:"Subaru Natsuki",anime:"Re:Zero",tier:"D",power:30,tags:["intelligence","endurance","return by death"]},
  {name:"Reinhard van Astrea",anime:"Re:Zero",tier:"S",power:98,tags:["strength","speed","sword","blessed"]},
  {name:"Emilia",anime:"Re:Zero",tier:"A",power:75,tags:["magic","ice","half-elf"]},
  {name:"Roswaal L Mathers",anime:"Re:Zero",tier:"A",power:88,tags:["magic","intelligence"]},
  {name:"Bocchi (Hitori Gotoh)",anime:"Bocchi the Rock",tier:"D",power:10,tags:["music","anxiety"]},
  {name:"Kaguya Shinomiya",anime:"Kaguya-sama",tier:"D",power:15,tags:["intelligence","strategy"]},
  {name:"Miyuki Shirogane",anime:"Kaguya-sama",tier:"D",power:18,tags:["intelligence","hard work"]},
  {name:"Koro-sensei",anime:"Assassination Classroom",tier:"A",power:89,tags:["speed","strength","intelligence"]},
  {name:"Alucard",anime:"Hellsing Ultimate",tier:"S",power:96,tags:["strength","speed","vampire","immortal"]},
  {name:"Yujiro Hanma",anime:"Baki",tier:"S",power:97,tags:["strength","martial arts","villain"]},
  {name:"Baki Hanma",anime:"Baki",tier:"A",power:85,tags:["strength","martial arts","speed"]},
  {name:"Yusuke Urameshi",anime:"Yu Yu Hakusho",tier:"A",power:83,tags:["strength","speed","spirit"]},
  {name:"Sensui",anime:"Yu Yu Hakusho",tier:"A",power:88,tags:["strength","villain","psychic"]},
];

// Hot Takes Database 
export interface HotTake {
 statement: string;
 category: string;
 controversy: number; // 1-10, how divisive
}

export const HOT_TAKES: HotTake[] = [
 {statement:"Naruto is the greatest anime of all time",category:"ranking",controversy:8},
 {statement:"One Piece is too long to get into",category:"ranking",controversy:7},
 {statement:"Dragon Ball Z is overrated",category:"ranking",controversy:9},
 {statement:"Attack on Titan has the best ending in anime",category:"ending",controversy:10},
 {statement:"Demon Slayer is carried by its animation",category:"quality",controversy:8},
 {statement:"Jujutsu Kaisen has better fights than Naruto",category:"fights",controversy:7},
 {statement:"Bleach has the best power system",category:"power",controversy:6},
 {statement:"Hunter x Hunter is the smartest shonen",category:"ranking",controversy:5},
 {statement:"My Hero Academia fell off after Season 3",category:"quality",controversy:7},
 {statement:"Goku would beat any anime character",category:"power",controversy:9},
 {statement:"Luffy is a better protagonist than Naruto",category:"character",controversy:8},
 {statement:"Sasuke was right to leave Konoha",category:"character",controversy:6},
 {statement:"Sakura is actually a good character",category:"character",controversy:9},
 {statement:"Itachi did nothing wrong",category:"character",controversy:7},
 {statement:"Gojo is the most overrated character",category:"character",controversy:8},
 {statement:"Death Note should have ended after L died",category:"ending",controversy:5},
 {statement:"Fullmetal Alchemist Brotherhood is a perfect anime",category:"ranking",controversy:4},
 {statement:"Cowboy Bebop is boring",category:"ranking",controversy:8},
 {statement:"Evangelion is pretentious nonsense",category:"ranking",controversy:9},
 {statement:"Saitama solos every anime verse",category:"power",controversy:10},
 {statement:"Sub is always better than dub",category:"general",controversy:7},
 {statement:"Filler episodes should be removed forever",category:"general",controversy:5},
 {statement:"Anime peaked in the 90s",category:"general",controversy:8},
 {statement:"CGI ruins anime",category:"quality",controversy:7},
 {statement:"Isekai is the worst genre",category:"genre",controversy:6},
 {statement:"Shonen is for kids",category:"genre",controversy:8},
 {statement:"Slice of Life is more enjoyable than action",category:"genre",controversy:6},
 {statement:"Vegeta is a better character than Goku",category:"character",controversy:7},
 {statement:"Zoro is stronger than Sanji",category:"power",controversy:6},
 {statement:"Madara is the best anime villain ever",category:"character",controversy:7},
 {statement:"Eren Yeager was right",category:"character",controversy:10},
 {statement:"Chainsaw Man is the future of shonen",category:"ranking",controversy:6},
 {statement:"One Piece animation has always been bad",category:"quality",controversy:7},
 {statement:"Fairy Tail is the worst popular shonen",category:"ranking",controversy:6},
 {statement:"Black Clover is underrated",category:"ranking",controversy:5},
 {statement:"Tanjiro is a boring protagonist",category:"character",controversy:7},
 {statement:"Power of friendship ruins anime fights",category:"general",controversy:6},
 {statement:"Talk no Jutsu is the strongest technique",category:"general",controversy:5},
 {statement:"Anime villains are better than heroes",category:"general",controversy:6},
 {statement:"Makima is the best female villain",category:"character",controversy:7},
 {statement:"Levi is overrated as a fighter",category:"character",controversy:8},
 {statement:"Mob Psycho 100 is better than One Punch Man",category:"ranking",controversy:6},
 {statement:"Vinland Saga Season 2 is better than Season 1",category:"ranking",controversy:5},
 {statement:"Re:Zero is the best isekai",category:"ranking",controversy:6},
 {statement:"Konosuba is funnier than Gintama",category:"ranking",controversy:7},
 {statement:"Berserk manga will never be finished properly",category:"general",controversy:8},
 {statement:"Bleach TYBW is the best anime comeback",category:"ranking",controversy:5},
 {statement:"Code Geass ending is peak fiction",category:"ending",controversy:6},
 {statement:"Steins;Gate is slow and overrated",category:"ranking",controversy:7},
 {statement:"Your Name is the best anime movie ever",category:"ranking",controversy:6},
];

// Anime list for tournaments 
export const TOURNAMENT_ANIME = [
 "Naruto","One Piece","Dragon Ball Z","Attack on Titan","Demon Slayer",
 "Jujutsu Kaisen","Bleach","Hunter x Hunter","My Hero Academia","Fullmetal Alchemist Brotherhood",
 "Death Note","Code Geass","Steins;Gate","Cowboy Bebop","Neon Genesis Evangelion",
 "One Punch Man","Mob Psycho 100","Vinland Saga","Chainsaw Man","Spy x Family",
 "Tokyo Ghoul","Sword Art Online","Black Clover","Fire Force","Dr. Stone",
 "Re:Zero","Konosuba","Overlord","Fairy Tail","Soul Eater",
 "Gintama","Haikyuu","Slam Dunk","Kuroko no Basket","Your Name",
 "Spirited Away","Princess Mononoke","Akira","Ghost in the Shell","Made in Abyss",
 "Promised Neverland","Violet Evergarden","Berserk","Trigun","Samurai Champloo",
 "Kill la Kill","Gurren Lagann","Toradora","Clannad","Fruits Basket",
 "Blue Lock","Bocchi the Rock","Frieren","Oshi no Ko","Solo Leveling",
 "Dandadan","JoJo's Bizarre Adventure","Assassination Classroom","Parasyte","Noragami",
 "Blue Exorcist","The Rising of Shield Hero","That Time I Got Reincarnated as a Slime","Mushoku Tensei","Goblin Slayer",
];

// Generate random matchup 
export function generateWhoWins(count = 4, tag?: string): AnimeCharacter[] {
 let pool = [...CHARACTERS];
 if (tag) pool = pool.filter(c => c.tags.includes(tag));
 // Shuffle
 for (let i = pool.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [pool[i], pool[j]] = [pool[j], pool[i]];
 }
 return pool.slice(0, Math.min(count, pool.length));
}

export function generateHotTake(): HotTake {
 return HOT_TAKES[Math.floor(Math.random() * HOT_TAKES.length)];
}

export function generateTierListCharacter(): AnimeCharacter {
 return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

export function generateTournamentBracket(size: 8 | 16 | 32 = 16): string[][] {
 const shuffled = [...TOURNAMENT_ANIME].sort(() => Math.random() - 0.5).slice(0, size);
 const matchups: string[][] = [];
 for (let i = 0; i < shuffled.length; i += 2) {
 matchups.push([shuffled[i], shuffled[i + 1] || "BYE"]);
 }
 return matchups;
}
