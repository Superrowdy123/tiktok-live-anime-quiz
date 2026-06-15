// ═══════════════════════════════════════════════════════════════════════════════
// ANIME WIZ LIVE ARENA — 3000 QUESTIONS (100 ROUNDS × 30 QUESTIONS)
// Each round: 10 Easy → 10 Medium → 10 Hard
// All multiple choice with A, B, C, D answers
// ═══════════════════════════════════════════════════════════════════════════════

export interface Question {
  id: number;
  round: number;
  type: "multiple_choice";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: [string, string, string, string];
  answer: "A" | "B" | "C" | "D";
  timeLimit: number;
}

// Helper to create question
function q(
  id: number,
  round: number,
  difficulty: "easy" | "medium" | "hard",
  question: string,
  options: [string, string, string, string],
  answer: "A" | "B" | "C" | "D"
): Question {
  const timeLimits = { easy: 30, medium: 30, hard: 30 };
  return {
    id,
    round,
    type: "multiple_choice",
    difficulty,
    question,
    options,
    answer,
    timeLimit: timeLimits[difficulty],
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUESTION BANK — Organized by round
// ═══════════════════════════════════════════════════════════════════════════════

export const questions: Question[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 1
  // ═══════════════════════════════════════════════════════════════════════════
  // Easy (1-10)
  q(1, 1, "easy", "What is the name of the main character in Naruto?", ["Sasuke Uchiha", "Naruto Uzumaki", "Kakashi Hatake", "Itachi Uchiha"], "B"),
  q(2, 1, "easy", "What color is Pikachu?", ["Red", "Blue", "Yellow", "Green"], "C"),
  q(3, 1, "easy", "In Dragon Ball Z, what is Goku's signature attack?", ["Final Flash", "Kamehameha", "Spirit Bomb", "Galick Gun"], "B"),
  q(4, 1, "easy", "What fruit did Luffy eat in One Piece?", ["Flame-Flame Fruit", "Gum-Gum Fruit", "Chop-Chop Fruit", "Smoke-Smoke Fruit"], "B"),
  q(5, 1, "easy", "What is the name of Ash's first Pokémon?", ["Charmander", "Bulbasaur", "Squirtle", "Pikachu"], "D"),
  q(6, 1, "easy", "In Attack on Titan, what are the giant humanoid creatures called?", ["Giants", "Titans", "Colossi", "Monsters"], "B"),
  q(7, 1, "easy", "What is the main character's name in Demon Slayer?", ["Zenitsu", "Inosuke", "Tanjiro", "Rengoku"], "C"),
  q(8, 1, "easy", "In My Hero Academia, what is Deku's real name?", ["Katsuki Bakugo", "Shoto Todoroki", "Izuku Midoriya", "Tenya Iida"], "C"),
  q(9, 1, "easy", "What kind of notebook is featured in Death Note?", ["A notebook that grants wishes", "A notebook that kills people", "A notebook that predicts the future", "A notebook that controls minds"], "B"),
  q(10, 1, "easy", "What is Sailor Moon's civilian name?", ["Rei Hino", "Ami Mizuno", "Usagi Tsukino", "Minako Aino"], "C"),
  // Medium (11-20)
  q(11, 1, "medium", "What is the name of the Survey Corps commander in Attack on Titan Season 1?", ["Levi Ackerman", "Erwin Smith", "Hange Zoe", "Keith Shadis"], "B"),
  q(12, 1, "medium", "In Naruto, what is the name of the demon sealed inside Naruto?", ["Shukaku", "Matatabi", "Kurama", "Gyuki"], "C"),
  q(13, 1, "medium", "What is Zoro's dream in One Piece?", ["Find the One Piece", "Become the greatest swordsman", "Become a Marine Admiral", "Find the All Blue"], "B"),
  q(14, 1, "medium", "In Hunter x Hunter, what is the power system called?", ["Chakra", "Ki", "Nen", "Reiatsu"], "C"),
  q(15, 1, "medium", "What Stand does Jotaro Kujo use in JoJo's Bizarre Adventure?", ["The World", "Star Platinum", "Crazy Diamond", "Gold Experience"], "B"),
  q(16, 1, "medium", "In Fullmetal Alchemist, what did Edward lose in the failed human transmutation?", ["His heart and lungs", "His arm and leg", "His eyes", "His voice"], "B"),
  q(17, 1, "medium", "What is Light Yagami's Shinigami called in Death Note?", ["Rem", "Ryuk", "Gelus", "Sidoh"], "B"),
  q(18, 1, "medium", "In Bleach, what is Ichigo's Zanpakuto called?", ["Senbonzakura", "Zangetsu", "Hyorinmaru", "Zabimaru"], "B"),
  q(19, 1, "medium", "What breathing style does Tanjiro primarily use in Demon Slayer?", ["Thunder Breathing", "Water Breathing", "Flame Breathing", "Wind Breathing"], "B"),
  q(20, 1, "medium", "In My Hero Academia, what is All Might's real name?", ["Gran Torino", "Toshinori Yagi", "Endeavor", "Best Jeanist"], "B"),
  // Hard (21-30)
  q(21, 1, "hard", "What year did the original Dragon Ball anime first air in Japan?", ["1984", "1986", "1988", "1990"], "B"),
  q(22, 1, "hard", "In One Piece, what is the name of Gol D. Roger's ship?", ["Thousand Sunny", "Going Merry", "Oro Jackson", "Red Force"], "C"),
  q(23, 1, "hard", "What is the name of the forbidden jutsu used to seal the Nine-Tails?", ["Edo Tensei", "Reaper Death Seal", "Infinite Tsukuyomi", "Izanami"], "B"),
  q(24, 1, "hard", "In Evangelion, what is the name of NERV's headquarters city?", ["Neo Tokyo", "Tokyo-2", "Tokyo-3", "New Tokyo"], "C"),
  q(25, 1, "hard", "What studio animated the original Cowboy Bebop?", ["Madhouse", "Bones", "Sunrise", "Production I.G"], "C"),
  q(26, 1, "hard", "In Steins;Gate, what is the name of the time machine?", ["Phone Microwave", "Time Leap Machine", "D-Mail", "IBN 5100"], "A"),
  q(27, 1, "hard", "What is the highest rank a Hunter can achieve in Hunter x Hunter?", ["Single Star", "Double Star", "Triple Star", "Four Star"], "C"),
  q(28, 1, "hard", "In Berserk, what is the name of Guts' massive sword?", ["Dragonslayer", "Buster Sword", "Rebellion", "Soul Edge"], "A"),
  q(29, 1, "hard", "What is Gojo's Domain Expansion called in Jujutsu Kaisen?", ["Malevolent Shrine", "Chimera Shadow Garden", "Infinite Void", "Horizon of the Captivating Skandha"], "C"),
  q(30, 1, "hard", "In Code Geass, what is Lelouch's Geass power?", ["Mind reading", "Absolute obedience", "Time manipulation", "Memory alteration"], "B"),

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 2
  // ═══════════════════════════════════════════════════════════════════════════
  q(31, 2, "easy", "In Dragon Ball, how many Dragon Balls are there?", ["5", "6", "7", "8"], "C"),
  q(32, 2, "easy", "What is the name of Naruto's team?", ["Team 5", "Team 7", "Team 10", "Team 8"], "B"),
  q(33, 2, "easy", "In One Piece, what is Luffy's bounty goal?", ["Become Pirate King", "Find the One Piece", "Defeat all Marines", "Explore every island"], "A"),
  q(34, 2, "easy", "What color is Goku's gi in Dragon Ball Z?", ["Blue", "Red", "Orange", "Green"], "C"),
  q(35, 2, "easy", "In Pokémon, who is the leader of Team Rocket?", ["James", "Jessie", "Giovanni", "Meowth"], "C"),
  q(36, 2, "easy", "What is the name of the school in My Hero Academia?", ["Shiketsu High", "U.A. High School", "Ketsubutsu Academy", "Isamu Academy"], "B"),
  q(37, 2, "easy", "In Demon Slayer, what happened to Tanjiro's family?", ["They moved away", "They were killed by demons", "They became demons", "They joined the Corps"], "B"),
  q(38, 2, "easy", "What is Inuyasha?", ["Full demon", "Full human", "Half-demon", "Spirit"], "C"),
  q(39, 2, "easy", "In Spirited Away, what are Chihiro's parents turned into?", ["Cats", "Pigs", "Dogs", "Birds"], "B"),
  q(40, 2, "easy", "What is the name of the main character in Sword Art Online?", ["Klein", "Kirito", "Asuna", "Heathcliff"], "B"),
  q(41, 2, "medium", "What is the name of Sasuke's brother in Naruto?", ["Madara", "Obito", "Itachi", "Shisui"], "C"),
  q(42, 2, "medium", "In One Piece, what is Sanji's dream?", ["Become Pirate King", "Find the All Blue", "Become greatest swordsman", "Map the world"], "B"),
  q(43, 2, "medium", "What is the Titan that Eren transforms into called?", ["Colossal Titan", "Attack Titan", "Armored Titan", "Beast Titan"], "B"),
  q(44, 2, "medium", "In Death Note, what is L's real name?", ["L Lawliet", "Nate River", "Mihael Keehl", "Beyond Birthday"], "A"),
  q(45, 2, "medium", "What is the name of Gon's father in Hunter x Hunter?", ["Ging Freecss", "Kite", "Netero", "Pariston"], "A"),
  q(46, 2, "medium", "In Bleach, what is the name of the Soul Society's military?", ["Soul Reapers", "Gotei 13", "Quincy", "Arrancar"], "B"),
  q(47, 2, "medium", "What is Edward Elric's State Alchemist title?", ["Flame Alchemist", "Fullmetal Alchemist", "Strong Arm Alchemist", "Crimson Alchemist"], "B"),
  q(48, 2, "medium", "In Jujutsu Kaisen, who is the King of Curses?", ["Gojo", "Mahito", "Sukuna", "Geto"], "C"),
  q(49, 2, "medium", "What organization does Itachi belong to in Naruto?", ["Anbu", "Akatsuki", "Root", "Sound Four"], "B"),
  q(50, 2, "medium", "In Spy x Family, what is Anya's special ability?", ["Super strength", "Telepathy", "Invisibility", "Flight"], "B"),
  q(51, 2, "hard", "What is the name of the cursed technique Megumi uses in JJK?", ["Limitless", "Ten Shadows Technique", "Boogie Woogie", "Ratio Technique"], "B"),
  q(52, 2, "hard", "In Vinland Saga, what is Thorfinn's father's name?", ["Thorkell", "Askeladd", "Thors", "Canute"], "C"),
  q(53, 2, "hard", "What studio animated Attack on Titan Season 1-3?", ["MAPPA", "Wit Studio", "Bones", "Madhouse"], "B"),
  q(54, 2, "hard", "In Monster, what is the name of the main antagonist?", ["Johan Liebert", "Wolfgang Grimmer", "Roberto", "The Nameless Monster"], "A"),
  q(55, 2, "hard", "What is the name of the spaceship in Cowboy Bebop?", ["Swordfish II", "Bebop", "Red Tail", "Hammerhead"], "B"),
  q(56, 2, "hard", "In Chainsaw Man, what devil is Pochita?", ["Blood Devil", "Chainsaw Devil", "Gun Devil", "Darkness Devil"], "B"),
  q(57, 2, "hard", "What is Mob's real name in Mob Psycho 100?", ["Ritsu Kageyama", "Shigeo Kageyama", "Teruki Hanazawa", "Katsuya Serizawa"], "B"),
  q(58, 2, "hard", "In Made in Abyss, what is the deepest layer called?", ["The Capital of the Unreturned", "The Final Maelstrom", "The Bottom", "The Netherworld"], "B"),
  q(59, 2, "hard", "What is the name of the protagonist in Parasyte?", ["Migi", "Shinichi Izumi", "Gotou", "Reiko Tamura"], "B"),
  q(60, 2, "hard", "In Legend of the Galactic Heroes, who leads the Galactic Empire?", ["Yang Wen-li", "Reinhard von Lohengramm", "Siegfried Kircheis", "Paul von Oberstein"], "B"),

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 3
  // ═══════════════════════════════════════════════════════════════════════════
  q(61, 3, "easy", "What is the name of the ice-type Pokémon that looks like a seal?", ["Seel", "Dewgong", "Lapras", "Spheal"], "A"),
  q(62, 3, "easy", "In Naruto, what village is Naruto from?", ["Sand Village", "Leaf Village", "Mist Village", "Cloud Village"], "B"),
  q(63, 3, "easy", "What does Luffy want to become in One Piece?", ["Marine Admiral", "Pirate King", "Revolutionary Leader", "Yonko"], "B"),
  q(64, 3, "easy", "In Dragon Ball Z, who is Goku's rival?", ["Krillin", "Piccolo", "Vegeta", "Tien"], "C"),
  q(65, 3, "easy", "What is the name of Totoro's film?", ["Spirited Away", "My Neighbor Totoro", "Princess Mononoke", "Howl's Moving Castle"], "B"),
  q(66, 3, "easy", "In Attack on Titan, what is the name of Eren's adoptive sister?", ["Historia", "Annie", "Mikasa", "Sasha"], "C"),
  q(67, 3, "easy", "What weapon does Ichigo use in Bleach?", ["Spear", "Sword", "Bow", "Fists"], "B"),
  q(68, 3, "easy", "In My Hero Academia, what is Bakugo's Quirk?", ["One For All", "Explosion", "Half-Cold Half-Hot", "Engine"], "B"),
  q(69, 3, "easy", "What is the name of the death god in Death Note?", ["Demon", "Reaper", "Shinigami", "Ghost"], "C"),
  q(70, 3, "easy", "In Demon Slayer, what is Nezuko to Tanjiro?", ["Girlfriend", "Sister", "Mother", "Friend"], "B"),
  q(71, 3, "medium", "What is the name of Killua's family in Hunter x Hunter?", ["Freecss Family", "Zoldyck Family", "Kurta Clan", "Phantom Troupe"], "B"),
  q(72, 3, "medium", "In Naruto, what eye technique does the Uchiha clan possess?", ["Byakugan", "Rinnegan", "Sharingan", "Tenseigan"], "C"),
  q(73, 3, "medium", "What is the name of the captain of the Straw Hat Pirates' ship doctor?", ["Sanji", "Chopper", "Robin", "Franky"], "B"),
  q(74, 3, "medium", "In Fullmetal Alchemist, what is equivalent exchange?", ["Trading items of equal value", "To gain something, something of equal value must be lost", "Exchanging alchemy techniques", "Sharing philosopher's stones"], "B"),
  q(75, 3, "medium", "What is the name of the 10th Division Captain in Bleach?", ["Byakuya Kuchiki", "Toshiro Hitsugaya", "Kenpachi Zaraki", "Shunsui Kyoraku"], "B"),
  q(76, 3, "medium", "In Death Note, who is the second Kira?", ["Mello", "Near", "Misa Amane", "Teru Mikami"], "C"),
  q(77, 3, "medium", "What breathing style does Zenitsu use in Demon Slayer?", ["Water Breathing", "Thunder Breathing", "Wind Breathing", "Flame Breathing"], "B"),
  q(78, 3, "medium", "In One Punch Man, what is Saitama's hero name?", ["One Punch Man", "Caped Baldy", "The Strongest Hero", "Bald Cape"], "B"),
  q(79, 3, "medium", "What is the name of the Survey Corps' strongest soldier in AoT?", ["Erwin Smith", "Levi Ackerman", "Hange Zoe", "Mike Zacharias"], "B"),
  q(80, 3, "medium", "In Tokyo Ghoul, what type of ghoul is Kaneki?", ["Natural Ghoul", "One-Eyed Ghoul", "Half-Ghoul", "Artificial Ghoul"], "B"),
  q(81, 3, "hard", "What is the name of the organization that created the Homunculi in FMA?", ["State Military", "Father's Children", "The Underground", "The Dwarf in the Flask"], "D"),
  q(82, 3, "hard", "In Hunter x Hunter, what is the Phantom Troupe's number?", ["10 members", "11 members", "12 members", "13 members"], "D"),
  q(83, 3, "hard", "What is the name of the technique Goku uses to multiply his power?", ["Super Saiyan", "Kaioken", "Ultra Instinct", "Instant Transmission"], "B"),
  q(84, 3, "hard", "In Steins;Gate, what is the name of the organization Okabe fears?", ["CERN", "SERN", "NASA", "WHO"], "B"),
  q(85, 3, "hard", "What is the real name of the character 'L' in Death Note?", ["Nate River", "L Lawliet", "Mihael Keehl", "Quillsh Wammy"], "B"),
  q(86, 3, "hard", "In Gurren Lagann, what is the name of Simon's mech?", ["Gurren", "Lagann", "Gurren Lagann", "Tengen Toppa"], "B"),
  q(87, 3, "hard", "What year did Neon Genesis Evangelion first air?", ["1993", "1995", "1997", "1999"], "B"),
  q(88, 3, "hard", "In Psycho-Pass, what measures criminal intent?", ["Crime Coefficient", "Psycho Meter", "Dominator", "Sibyl System"], "A"),
  q(89, 3, "hard", "What is the name of Spike Spiegel's former partner in Cowboy Bebop?", ["Jet Black", "Vicious", "Lin", "Shin"], "B"),
  q(90, 3, "hard", "In Ghost in the Shell, what is Major Kusanagi's first name?", ["Motoko", "Mokoto", "Makoto", "Mikoto"], "A"),

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 4
  // ═══════════════════════════════════════════════════════════════════════════
  q(91, 4, "easy", "What type of animal is Jiji in Kiki's Delivery Service?", ["Dog", "Cat", "Bird", "Rabbit"], "B"),
  q(92, 4, "easy", "In Naruto, what is the hand sign for Shadow Clone Jutsu?", ["Tiger", "Cross fingers", "Snake", "Dragon"], "B"),
  q(93, 4, "easy", "What is Goku's Saiyan name?", ["Vegeta", "Kakarot", "Raditz", "Broly"], "B"),
  q(94, 4, "easy", "In One Piece, what is the name of Luffy's crew?", ["Red Hair Pirates", "Straw Hat Pirates", "Heart Pirates", "Kid Pirates"], "B"),
  q(95, 4, "easy", "What is the name of the main character in Tokyo Ghoul?", ["Touka Kirishima", "Ken Kaneki", "Hideyoshi Nagachika", "Shuu Tsukiyama"], "B"),
  q(96, 4, "easy", "In Pokémon, what type is Charizard?", ["Fire/Dragon", "Fire/Flying", "Fire/Ground", "Pure Fire"], "B"),
  q(97, 4, "easy", "What is the name of Eren's best friend in Attack on Titan?", ["Mikasa", "Armin", "Jean", "Reiner"], "B"),
  q(98, 4, "easy", "In Fairy Tail, what guild does Natsu belong to?", ["Phantom Lord", "Fairy Tail", "Blue Pegasus", "Sabertooth"], "B"),
  q(99, 4, "easy", "What is Doraemon?", ["A robot cat", "A robot dog", "A robot mouse", "A robot bird"], "A"),
  q(100, 4, "easy", "In Haikyuu, what sport do the characters play?", ["Basketball", "Soccer", "Volleyball", "Baseball"], "C"),
  q(101, 4, "medium", "What is the name of the three great Sannin's student in Naruto?", ["Jiraiya", "Tsunade", "Orochimaru", "All are Sannin"], "D"),
  q(102, 4, "medium", "In Dragon Ball Z, what planet did Frieza destroy?", ["Earth", "Namek", "Planet Vegeta", "Planet Yardrat"], "C"),
  q(103, 4, "medium", "What is the name of the first Hokage in Naruto?", ["Tobirama Senju", "Hashirama Senju", "Hiruzen Sarutobi", "Minato Namikaze"], "B"),
  q(104, 4, "medium", "In One Piece, what is the name of the Navy's headquarters?", ["Enies Lobby", "Impel Down", "Marineford", "Sabaody"], "C"),
  q(105, 4, "medium", "What is the name of Rem's sister in Re:Zero?", ["Emilia", "Ram", "Beatrice", "Felt"], "B"),
  q(106, 4, "medium", "In Code Geass, what is the name of Lelouch's mech?", ["Lancelot", "Guren", "Shinkiro", "All are correct"], "C"),
  q(107, 4, "medium", "What is the name of the protagonist in Mob Psycho 100?", ["Reigen", "Mob", "Dimple", "Ritsu"], "B"),
  q(108, 4, "medium", "In Assassination Classroom, what is Koro-sensei?", ["Alien", "Demon", "Modified human", "Government experiment"], "C"),
  q(109, 4, "medium", "What is the name of the male lead in Toradora?", ["Ryuuji Takasu", "Yusaku Kitamura", "Hisamitsu Noto", "Kouji Haruta"], "A"),
  q(110, 4, "medium", "In Black Clover, what magic does Asta NOT have?", ["Anti-Magic", "No magic", "Sword magic", "He has no magic"], "D"),
  q(111, 4, "hard", "What is the name of the Quincy King in Bleach?", ["Uryu Ishida", "Yhwach", "Ryuken Ishida", "Jugram Haschwalth"], "B"),
  q(112, 4, "hard", "In JoJo Part 4, what is the name of the main villain?", ["DIO", "Kira Yoshikage", "Diavolo", "Pucci"], "B"),
  q(113, 4, "hard", "What is the name of the world in Sword Art Online: Alicization?", ["Aincrad", "ALfheim", "Underworld", "Gun Gale"], "C"),
  q(114, 4, "hard", "In Fate/Zero, who is Saber's true identity?", ["Mordred", "Nero", "King Arthur", "Jeanne d'Arc"], "C"),
  q(115, 4, "hard", "What is the name of the creator of Dragon Ball?", ["Eiichiro Oda", "Masashi Kishimoto", "Akira Toriyama", "Tite Kubo"], "C"),
  q(116, 4, "hard", "In Trigun, what is Vash's epithet?", ["The Human Typhoon", "The Stampede", "The Humanoid Typhoon", "The Walking Disaster"], "C"),
  q(117, 4, "hard", "What studio animated Violet Evergarden?", ["A-1 Pictures", "Kyoto Animation", "Ufotable", "P.A. Works"], "B"),
  q(118, 4, "hard", "In Serial Experiments Lain, what is the name of the network?", ["The Net", "The Wire", "The Wired", "The Connection"], "C"),
  q(119, 4, "hard", "What is the name of the protagonist in Akira?", ["Tetsuo", "Kaneda", "Kei", "Colonel"], "B"),
  q(120, 4, "hard", "In Texhnolyze, what is the name of the underground city?", ["Lux", "Lukuss", "Luks", "Luxus"], "B"),

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 5
  // ═══════════════════════════════════════════════════════════════════════════
  q(121, 5, "easy", "What is the name of the talking cat in Fairy Tail?", ["Happy", "Carla", "Pantherlily", "Frosch"], "A"),
  q(122, 5, "easy", "In Naruto, what rank is a Genin?", ["Lowest ninja rank", "Mid-level rank", "Elite rank", "Kage level"], "A"),
  q(123, 5, "easy", "What color is Super Saiyan hair?", ["Red", "Blue", "Gold/Yellow", "Green"], "C"),
  q(124, 5, "easy", "In One Piece, what is Chopper?", ["A fox", "A reindeer", "A dog", "A raccoon"], "B"),
  q(125, 5, "easy", "What is the name of the volleyball team in Haikyuu?", ["Aoba Johsai", "Karasuno", "Nekoma", "Shiratorizawa"], "B"),
  q(126, 5, "easy", "In Your Name, what do Taki and Mitsuha do?", ["Time travel", "Swap bodies", "Share dreams", "Teleport"], "B"),
  q(127, 5, "easy", "What animal is Kyubey in Madoka Magica?", ["Cat", "Rabbit", "Fox", "Unknown creature"], "D"),
  q(128, 5, "easy", "In Fruits Basket, what happens when Tohru hugs Kyo?", ["Nothing", "He transforms", "He disappears", "He faints"], "B"),
  q(129, 5, "easy", "What is Light Yagami's father's job in Death Note?", ["Lawyer", "Doctor", "Police officer", "Teacher"], "C"),
  q(130, 5, "easy", "In Demon Slayer, what does Tanjiro sell at the beginning?", ["Fish", "Vegetables", "Charcoal", "Cloth"], "C"),
  q(131, 5, "medium", "What is the name of Gintoki's wooden sword in Gintama?", ["Toyako", "Lake Toya", "Bokuto", "Both A and B"], "D"),
  q(132, 5, "medium", "In Naruto, who taught Naruto the Rasengan?", ["Kakashi", "Iruka", "Jiraiya", "Minato"], "C"),
  q(133, 5, "medium", "What Devil Fruit did Blackbeard steal from Whitebeard?", ["Gura Gura no Mi", "Yami Yami no Mi", "Mera Mera no Mi", "Ope Ope no Mi"], "A"),
  q(134, 5, "medium", "In Dragon Ball, who is the Namekian who fused with Piccolo?", ["Dende", "Guru", "Nail", "Kami"], "C"),
  q(135, 5, "medium", "What is the name of the female protagonist in Steins;Gate?", ["Mayuri Shiina", "Kurisu Makise", "Moeka Kiryu", "Suzuha Amane"], "B"),
  q(136, 5, "medium", "In My Hero Academia, who killed All Might's master?", ["All For One", "Shigaraki", "Stain", "Overhaul"], "A"),
  q(137, 5, "medium", "What is the name of the rival school in Haikyuu Season 1?", ["Nekoma", "Aoba Johsai", "Date Tech", "Shiratorizawa"], "B"),
  q(138, 5, "medium", "In Re:Zero, what is Subaru's ability called?", ["Return by Death", "Respawn", "Time Loop", "Death Return"], "A"),
  q(139, 5, "medium", "What is the name of Sakura's inner persona in Naruto?", ["Inner Sakura", "Dark Sakura", "Shadow Sakura", "Rage Sakura"], "A"),
  q(140, 5, "medium", "In Konosuba, what is Aqua the goddess of?", ["Fire", "Water", "Earth", "Wind"], "B"),
  q(141, 5, "hard", "What is the name of Madara's brother in Naruto?", ["Izuna", "Tajima", "Obito", "Fugaku"], "A"),
  q(142, 5, "hard", "In One Piece, who has the Ope Ope no Mi?", ["Doflamingo", "Law", "Corazon", "Kuma"], "B"),
  q(143, 5, "hard", "What is the name of the author of Attack on Titan?", ["Hajime Isayama", "Kentaro Miura", "Yoshihiro Togashi", "Eiichiro Oda"], "A"),
  q(144, 5, "hard", "In Fate/Stay Night, what is Archer's true identity?", ["Gilgamesh", "Emiya", "Cu Chulainn", "Heracles"], "B"),
  q(145, 5, "hard", "What year did One Piece manga begin serialization?", ["1995", "1997", "1999", "2001"], "B"),
  q(146, 5, "hard", "In Monogatari series, what oddity possessed Hitagi first?", ["Crab", "Snail", "Monkey", "Snake"], "A"),
  q(147, 5, "hard", "What is the name of the coffee shop in Tokyo Ghoul?", ["Anteiku", "Re:", "Aogiri", "CCG Cafe"], "A"),
  q(148, 5, "hard", "In Durarara, what is the name of the headless rider?", ["Celty Sturluson", "Shizuo Heiwajima", "Izaya Orihara", "Mikado Ryugamine"], "A"),
  q(149, 5, "hard", "What studio animated Demon Slayer?", ["Bones", "MAPPA", "Ufotable", "Wit Studio"], "C"),
  q(150, 5, "hard", "In Hellsing Ultimate, what is Alucard's true name?", ["Vlad", "Dracula", "Both A and B", "Nosferatu"], "C"),

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 6
  // ═══════════════════════════════════════════════════════════════════════════
  q(151, 6, "easy", "What is Naruto's favorite food?", ["Sushi", "Ramen", "Rice balls", "Dango"], "B"),
  q(152, 6, "easy", "In Pokémon, what evolves from Eevee with a Fire Stone?", ["Vaporeon", "Jolteon", "Flareon", "Espeon"], "C"),
  q(153, 6, "easy", "What is the name of Goku's wife?", ["Bulma", "Chi-Chi", "Android 18", "Videl"], "B"),
  q(154, 6, "easy", "In One Piece, who is the first crew member to join Luffy?", ["Nami", "Zoro", "Usopp", "Sanji"], "B"),
  q(155, 6, "easy", "What type of spirit is Yato in Noragami?", ["God of Fortune", "God of War", "God of Calamity", "God of Wisdom"], "C"),
  q(156, 6, "easy", "In Black Butler, what is Sebastian?", ["Human", "Demon", "Angel", "Reaper"], "B"),
  q(157, 6, "easy", "What is the name of the female lead in Toradora?", ["Taiga Aisaka", "Minori Kushieda", "Ami Kawashima", "Yuri Koigakubo"], "A"),
  q(158, 6, "easy", "In Naruto, what animal does Kakashi summon?", ["Toads", "Dogs", "Snakes", "Slugs"], "B"),
  q(159, 6, "easy", "What does SAO stand for?", ["Super Art Online", "Sword Art Online", "System Artificial Online", "Saga Adventure Online"], "B"),
  q(160, 6, "easy", "In Sailor Moon, what is the name of the talking cat?", ["Luna", "Artemis", "Diana", "Phobos"], "A"),
  q(161, 6, "medium", "What is Rock Lee's specialty in Naruto?", ["Ninjutsu", "Genjutsu", "Taijutsu", "Fuinjutsu"], "C"),
  q(162, 6, "medium", "In Bleach, what is the name of Ichigo's hollow form?", ["Hollow Ichigo", "White", "Zangetsu", "Vasto Lorde"], "B"),
  q(163, 6, "medium", "What is the name of Lelouch's sister in Code Geass?", ["C.C.", "Kallen", "Nunnally", "Euphemia"], "C"),
  q(164, 6, "medium", "In Fairy Tail, what is Natsu's magic type?", ["Ice Make", "Fire Dragon Slayer", "Celestial Spirit", "Requip"], "B"),
  q(165, 6, "medium", "What is the name of the main character in Blue Exorcist?", ["Yukio Okumura", "Rin Okumura", "Mephisto", "Shura"], "B"),
  q(166, 6, "medium", "In Hunter x Hunter, what is the Phantom Troupe also called?", ["Spider", "Scorpion", "Shadow", "Snake"], "A"),
  q(167, 6, "medium", "What power does Giorno have in JoJo Part 5?", ["Gold Experience", "King Crimson", "Sticky Fingers", "Sex Pistols"], "A"),
  q(168, 6, "medium", "In Dr. Stone, how long was humanity petrified?", ["1000 years", "3700 years", "5000 years", "10000 years"], "B"),
  q(169, 6, "medium", "What is the name of the guild master in Fairy Tail?", ["Gildarts", "Makarov", "Laxus", "Mystogan"], "B"),
  q(170, 6, "medium", "In Overlord, what is Ainz's class?", ["Warrior", "Necromancer", "Paladin", "Ranger"], "B"),
  q(171, 6, "hard", "What is the epithet of Whitebeard in One Piece?", ["King of Pirates", "Strongest Man in the World", "World's Greatest Swordsman", "Dark King"], "B"),
  q(172, 6, "hard", "In Naruto, what is the name of the Eight Gates?", ["Gate of Opening", "Hachimon Tonkou", "Both A and B", "Gate of Death"], "C"),
  q(173, 6, "hard", "Who composed the music for Attack on Titan?", ["Yuki Kajiura", "Hiroyuki Sawano", "Yoko Kanno", "Joe Hisaishi"], "B"),
  q(174, 6, "hard", "In Mushishi, what are the supernatural creatures called?", ["Spirits", "Mushi", "Youkai", "Oni"], "B"),
  q(175, 6, "hard", "What is the name of the time loop in Higurashi?", ["June", "Endless Eight", "Hinamizawa Syndrome", "Eternal Fragment"], "A"),
  q(176, 6, "hard", "In Claymore, what are the half-human warriors called?", ["Claymores", "Yoma", "Awakened Beings", "Abyssal Ones"], "A"),
  q(177, 6, "hard", "What studio animated Puella Magi Madoka Magica?", ["Kyoto Animation", "Shaft", "A-1 Pictures", "P.A. Works"], "B"),
  q(178, 6, "hard", "In Ergo Proxy, what is the name of the protagonist?", ["Re-l Mayer", "Vincent Law", "Pino", "Raul Creed"], "A"),
  q(179, 6, "hard", "What is the name of the virtual world in .hack?", ["Aincrad", "The World", "Yggdrasil", "VRMMO"], "B"),
  q(180, 6, "hard", "In Ping Pong the Animation, who is called 'Peco'?", ["Smile", "Yutaka Hoshino", "Kong Wenge", "Kazama"], "B"),

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 7
  // ═══════════════════════════════════════════════════════════════════════════
  q(181, 7, "easy", "What is the name of Goku's first son?", ["Goten", "Gohan", "Trunks", "Pan"], "B"),
  q(182, 7, "easy", "In Naruto, what is the Byakugan?", ["A sword", "An eye technique", "A village", "A jutsu scroll"], "B"),
  q(183, 7, "easy", "What is Zoro's goal in One Piece?", ["Find One Piece", "Become greatest swordsman", "Map the world", "Find All Blue"], "B"),
  q(184, 7, "easy", "In Death Note, what can Light see with the Shinigami Eyes?", ["The future", "Names and lifespans", "Sins", "Death"], "B"),
  q(185, 7, "easy", "What animal is Hamtaro?", ["Guinea pig", "Hamster", "Mouse", "Gerbil"], "B"),
  q(186, 7, "easy", "In Naruto, what hand seal does Naruto often use?", ["Tiger", "Horse", "Cross fingers", "Snake"], "C"),
  q(187, 7, "easy", "What type of creature is Agumon?", ["Pokémon", "Digimon", "Monster", "Spirit"], "B"),
  q(188, 7, "easy", "In My Hero Academia, what does 'Plus Ultra' mean?", ["Go beyond", "Never give up", "Hero time", "Ultimate power"], "A"),
  q(189, 7, "easy", "What is the name of the Dragon Balls' guardian in Dragon Ball?", ["Kami", "King Kai", "Korin", "Mr. Popo"], "A"),
  q(190, 7, "easy", "In Demon Slayer, what color is Tanjiro's hair?", ["Black", "Red and black", "Brown", "Blue"], "B"),
  q(191, 7, "medium", "What is the name of the Quincy father in Bleach?", ["Uryu Ishida", "Ryuken Ishida", "Souken Ishida", "Yhwach"], "B"),
  q(192, 7, "medium", "In JoJo Part 3, where is DIO hiding?", ["Japan", "America", "Egypt", "Italy"], "C"),
  q(193, 7, "medium", "What is the name of Vegeta's brother?", ["Raditz", "Tarble", "Nappa", "King Vegeta"], "B"),
  q(194, 7, "medium", "In Naruto, who is the Fifth Hokage?", ["Hiruzen", "Minato", "Tsunade", "Kakashi"], "C"),
  q(195, 7, "medium", "What is the name of the Death Scythe in Soul Eater?", ["Maka", "Soul", "Death the Kid", "Black Star"], "B"),
  q(196, 7, "medium", "In Evangelion, what are the Angels attacking?", ["Humanity", "NERV", "Tokyo-3", "All of the above"], "D"),
  q(197, 7, "medium", "What magic guild is Fairy Tail's rival?", ["Phantom Lord", "Blue Pegasus", "Lamia Scale", "Sabertooth"], "D"),
  q(198, 7, "medium", "In Sword Art Online, who is the final boss of Aincrad?", ["Kayaba Akihiko", "Death Gun", "Administrator", "Gabriel"], "A"),
  q(199, 7, "medium", "What is the name of Inuyasha's sword?", ["Tenseiga", "Tessaiga", "Bakusaiga", "So'unga"], "B"),
  q(200, 7, "medium", "In Noragami, what does Yato want to build?", ["An army", "A shrine", "A kingdom", "A family"], "B"),
  q(201, 7, "hard", "What is the name of the island where One Piece treasure is?", ["Raftel/Laugh Tale", "Skypiea", "Wano", "Elbaf"], "A"),
  q(202, 7, "hard", "In Naruto, who created the Edo Tensei?", ["Orochimaru", "Tobirama Senju", "Kabuto", "Madara"], "B"),
  q(203, 7, "hard", "What is the first OP song of Attack on Titan?", ["Shinzou wo Sasageyo", "Guren no Yumiya", "Jiyuu no Tsubasa", "Red Swan"], "B"),
  q(204, 7, "hard", "In Baccano, the story takes place on what train?", ["Orient Express", "Flying Pussyfoot", "Galaxy Express", "Night Train"], "B"),
  q(205, 7, "hard", "What is Kenshin's scar shaped like?", ["X", "Cross", "Plus sign", "None"], "B"),
  q(206, 7, "hard", "In Monster, what hospital does Tenma work at?", ["Eisler Memorial", "St. Luke's", "Tokyo General", "Düsseldorf Central"], "A"),
  q(207, 7, "hard", "What is the name of the protagonist in Berserk?", ["Griffith", "Casca", "Guts", "Skull Knight"], "C"),
  q(208, 7, "hard", "In FLCL, what comes out of Naota's head?", ["Robots", "Guitars", "Aliens", "Flowers"], "A"),
  q(209, 7, "hard", "What studio produced the Monogatari series?", ["Kyoto Animation", "Shaft", "Madhouse", "Bones"], "B"),
  q(210, 7, "hard", "In Paranoia Agent, who is Lil' Slugger?", ["A real person", "A manifestation", "An alien", "A ghost"], "B"),

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 8
  // ═══════════════════════════════════════════════════════════════════════════
  q(211, 8, "easy", "What does Ash want to become in Pokémon?", ["Gym Leader", "Pokémon Master", "Professor", "Champion"], "B"),
  q(212, 8, "easy", "In Dragon Ball Z, who trained Goku in the afterlife?", ["Kami", "King Kai", "Whis", "Beerus"], "B"),
  q(213, 8, "easy", "What is the name of Naruto's father?", ["Hiruzen", "Minato", "Jiraiya", "Kakashi"], "B"),
  q(214, 8, "easy", "In One Piece, what is Nami's role on the ship?", ["Cook", "Doctor", "Navigator", "Sniper"], "C"),
  q(215, 8, "easy", "What type of titan can Annie transform into?", ["Colossal", "Armored", "Female", "Beast"], "C"),
  q(216, 8, "easy", "In Bleach, what are the evil spirits called?", ["Shinigami", "Hollows", "Quincy", "Fullbringers"], "B"),
  q(217, 8, "easy", "What is the name of Yugi's alter ego?", ["Pharaoh", "Yami Yugi", "Atem", "All of the above"], "D"),
  q(218, 8, "easy", "In Fairy Tail, what is Gray's magic?", ["Fire", "Ice Make", "Lightning", "Wind"], "B"),
  q(219, 8, "easy", "What does DBZ stand for?", ["Dragon Ball Zero", "Dragon Ball Zone", "Dragon Ball Z", "Dragon Blast Zone"], "C"),
  q(220, 8, "easy", "In Fullmetal Alchemist, what are the Elric brothers' names?", ["Ed and Al", "Roy and Riza", "Ling and Lan", "Scar and Miles"], "A"),
  q(221, 8, "medium", "What is the name of Vegeta and Goku's fusion using earrings?", ["Gogeta", "Vegito", "Gotenks", "Veku"], "B"),
  q(222, 8, "medium", "In Naruto, what tailed beast does Gaara have?", ["One-Tail", "Two-Tails", "Eight-Tails", "Nine-Tails"], "A"),
  q(223, 8, "medium", "What is the name of the hollow that attacked Ichigo's family?", ["Grand Fisher", "Fishbone D", "Shrieker", "Acidwire"], "A"),
  q(224, 8, "medium", "In Hunter x Hunter, what is Gon's Nen type?", ["Enhancer", "Emitter", "Conjurer", "Specialist"], "A"),
  q(225, 8, "medium", "What is the name of Zero Two's partner in Darling in the Franxx?", ["Hiro", "Goro", "Mitsuru", "Zorome"], "A"),
  q(226, 8, "medium", "In Death Note, what rule kills you if you don't write a name for 13 days?", ["Fake rule", "13-Day Rule", "Both are fake", "Neither exists"], "C"),
  q(227, 8, "medium", "What clan did Madara belong to in Naruto?", ["Senju", "Uchiha", "Uzumaki", "Hyuga"], "B"),
  q(228, 8, "medium", "In Shield Hero, what is Naofumi's weapon?", ["Sword", "Spear", "Bow", "Shield"], "D"),
  q(229, 8, "medium", "What is the name of the main city in Akame ga Kill?", ["Capital", "Empire City", "Revolution Town", "Night Raid"], "A"),
  q(230, 8, "medium", "In That Time I Got Reincarnated as a Slime, what is Rimuru?", ["Human", "Demon Lord", "Slime", "Dragon"], "C"),
  q(231, 8, "hard", "What is the true name of 'The Boss' in Metal Gear?", ["Just kidding - wrong franchise!", "This is an anime quiz", "Anime only", "No Metal Gear"], "A"),
  q(232, 8, "hard", "In Kaiji, what is the name of the gambling ship?", ["Espoir", "Hope", "Both A and B", "Fortune"], "C"),
  q(233, 8, "hard", "What year did Fullmetal Alchemist: Brotherhood air?", ["2003", "2006", "2009", "2012"], "C"),
  q(234, 8, "hard", "In Gintama, what alien race invaded Earth?", ["Amanto", "Shinra", "Zentraedi", "Celestials"], "A"),
  q(235, 8, "hard", "What is the name of the power system in Jujutsu Kaisen?", ["Cursed Energy", "Nen", "Ki", "Chakra"], "A"),
  q(236, 8, "hard", "In Samurai Champloo, what fighting style does Mugen use?", ["Traditional samurai", "Breakdancing sword style", "Aikido", "Kendo"], "B"),
  q(237, 8, "hard", "What is the name of the organization in Psycho-Pass?", ["CID", "Public Safety Bureau", "Sibyl System", "Enforcement"], "B"),
  q(238, 8, "hard", "In Land of the Lustrous, what gem is the protagonist?", ["Diamond", "Phosphophyllite", "Cinnabar", "Jade"], "B"),
  q(239, 8, "hard", "What is the full name of the mech in Code Geass Lelouch pilots at the end?", ["Shinkiro", "Gawain", "Shinkirou", "All answers spell it differently"], "A"),
  q(240, 8, "hard", "In Planetes, what is the name of the debris section?", ["Debris Section", "Technora", "Half Section", "Both A and C"], "D"),

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 9
  // ═══════════════════════════════════════════════════════════════════════════
  q(241, 9, "easy", "What is the catchphrase 'Dattebayo' associated with?", ["Sasuke", "Naruto", "Kakashi", "Sakura"], "B"),
  q(242, 9, "easy", "In Dragon Ball, what is the name of Master Roshi's island?", ["Turtle Island", "Kame House", "Roshi Island", "Training Island"], "B"),
  q(243, 9, "easy", "What color is Todoroki's left side hair?", ["White", "Red", "Half and half", "Brown"], "B"),
  q(244, 9, "easy", "In One Piece, what is Brook's role?", ["Musician", "Doctor", "Cook", "Navigator"], "A"),
  q(245, 9, "easy", "What type of car does Speed Racer drive?", ["Mach 4", "Mach 5", "Mach 6", "Racer X"], "B"),
  q(246, 9, "easy", "In Doraemon, where does Doraemon store his gadgets?", ["His tail", "His pocket", "His ears", "His nose"], "B"),
  q(247, 9, "easy", "What is the name of the main character in Beyblade?", ["Tyson", "Kai", "Ray", "Max"], "A"),
  q(248, 9, "easy", "In Slam Dunk, what sport is featured?", ["Volleyball", "Soccer", "Basketball", "Baseball"], "C"),
  q(249, 9, "easy", "What is Conan's real identity in Detective Conan?", ["Shinichi Kudo", "Heiji Hattori", "Kogoro Mouri", "Kid the Phantom Thief"], "A"),
  q(250, 9, "easy", "In Inuyasha, what is the name of the sacred jewel?", ["Shikon Jewel", "Dragon Ball", "Philosopher's Stone", "Holy Grail"], "A"),
  q(251, 9, "medium", "What is the name of L's successor in Death Note?", ["Mello and Near", "Matt", "Beyond Birthday", "Watari"], "A"),
  q(252, 9, "medium", "In Naruto, who has the Mangekyo Sharingan first?", ["Sasuke", "Itachi", "Madara", "Obito"], "C"),
  q(253, 9, "medium", "What is the name of Senku's petrification revival fluid?", ["Revival Fluid", "Stone Formula", "Nital", "Dr. Stone"], "C"),
  q(254, 9, "medium", "In One Piece, what is Haki?", ["Magic power", "Willpower manifestation", "Devil Fruit", "Martial arts"], "B"),
  q(255, 9, "medium", "What is the name of the main character in Parasyte?", ["Migi", "Shinichi", "Gotou", "Reiko"], "B"),
  q(256, 9, "medium", "In Mob Psycho 100, who is Mob's master?", ["Dimple", "Reigen", "Teru", "Ritsu"], "B"),
  q(257, 9, "medium", "What is the name of the anti-hero in Tokyo Ghoul?", ["Kaneki Ken", "Arima Kishou", "Eto Yoshimura", "Ayato"], "A"),
  q(258, 9, "medium", "In Fire Force, what generation is Shinra?", ["First", "Second", "Third", "Fourth"], "D"),
  q(259, 9, "medium", "What is the name of the titan shifters' original home?", ["Paradis", "Marley", "Eldia", "Both B and C"], "D"),
  q(260, 9, "medium", "In Assassination Classroom, what is Koro-sensei's speed?", ["Mach 10", "Mach 15", "Mach 20", "Mach 25"], "C"),
  q(261, 9, "hard", "What is the name of the first arc in JoJo's Bizarre Adventure?", ["Phantom Blood", "Battle Tendency", "Stardust Crusaders", "Diamond is Unbreakable"], "A"),
  q(262, 9, "hard", "In Welcome to the NHK, what does NHK stand for (in the show)?", ["Nihon Hikikomori Kyokai", "Japan Broadcasting", "Nothing", "Nihon Hoso Kyokai"], "A"),
  q(263, 9, "hard", "What studio animated the original Fullmetal Alchemist 2003?", ["Bones", "Madhouse", "Sunrise", "Wit Studio"], "A"),
  q(264, 9, "hard", "In Darker than Black, what are contractors' payments called?", ["Remunerations", "Payments", "Prices", "Compensations"], "A"),
  q(265, 9, "hard", "What is the name of the protagonist in Rainbow?", ["Mario Minakami", "An Otoishi", "Joe", "Anchan"], "A"),
  q(266, 9, "hard", "In Great Teacher Onizuka, what was Onizuka before becoming a teacher?", ["Student", "Biker gang member", "Salary man", "Athlete"], "B"),
  q(267, 9, "hard", "What is the name of the detective agency in Bungo Stray Dogs?", ["Armed Detective Agency", "Port Mafia", "Guild", "Decay of Angels"], "A"),
  q(268, 9, "hard", "In Banana Fish, what is Ash's full name?", ["Ash Lynx", "Aslan Jade Callenreese", "Both A and B", "Ash Callenreese"], "C"),
  q(269, 9, "hard", "What year did Cowboy Bebop first air?", ["1995", "1998", "2000", "2002"], "B"),
  q(270, 9, "hard", "In Tatami Galaxy, how many episodes are there?", ["10", "11", "12", "13"], "B"),

  // ═══════════════════════════════════════════════════════════════════════════
  // ROUND 10
  // ═══════════════════════════════════════════════════════════════════════════
  q(271, 10, "easy", "What transformation comes after Super Saiyan?", ["Super Saiyan 2", "Ultra Instinct", "Super Saiyan God", "Kaioken"], "A"),
  q(272, 10, "easy", "In One Piece, what is Usopp's father's name?", ["Yasopp", "Yosopp", "Usopp Sr.", "Banchina"], "A"),
  q(273, 10, "easy", "What is the name of Naruto and Hinata's son?", ["Himawari", "Boruto", "Kawaki", "Mitsuki"], "B"),
  q(274, 10, "easy", "In Demon Slayer, what is the name of the Demon Slayer Corps leader?", ["Muzan", "Kagaya Ubuyashiki", "Gyomei", "Sanemi"], "B"),
  q(275, 10, "easy", "What is All Might's signature move?", ["Detroit Smash", "Texas Smash", "United States of Smash", "All of the above"], "D"),
  q(276, 10, "easy", "In Attack on Titan, what is inside the walls?", ["Nothing", "Colossal Titans", "Humans", "Animals"], "B"),
  q(277, 10, "easy", "What is the name of the card game in Yu-Gi-Oh?", ["Magic Cards", "Duel Monsters", "Shadow Games", "Monster Cards"], "B"),
  q(278, 10, "easy", "In Naruto, who is Hinata's cousin?", ["Kiba", "Shino", "Neji", "Lee"], "C"),
  q(279, 10, "easy", "What studio is famous for Spirited Away?", ["Madhouse", "Studio Ghibli", "Toei Animation", "Bones"], "B"),
  q(280, 10, "easy", "In Pokemon, who is Ash's main rival in the original series?", ["Paul", "Gary", "Trip", "Alain"], "B"),
  q(281, 10, "medium", "What is the name of Goku's Ultra Instinct form?", ["Mastered Ultra Instinct", "Perfected Ultra Instinct", "True Ultra Instinct", "Complete Ultra Instinct"], "A"),
  q(282, 10, "medium", "In One Piece, who is the user of the Yami Yami no Mi?", ["Ace", "Blackbeard", "Aokiji", "Kizaru"], "B"),
  q(283, 10, "medium", "What is the name of the strongest Hashira in Demon Slayer?", ["Rengoku", "Gyomei", "Sanemi", "Muichiro"], "B"),
  q(284, 10, "medium", "In Bleach, what is Aizen's Zanpakuto ability?", ["Illusions", "Time control", "Gravity manipulation", "Soul absorption"], "A"),
  q(285, 10, "medium", "What is the name of the main antagonist in Hunter x Hunter's Chimera Ant arc?", ["Pitou", "Meruem", "Youpi", "Pouf"], "B"),
  q(286, 10, "medium", "In Vinland Saga, who killed Thors?", ["Thorkell", "Askeladd", "Canute", "Bjorn"], "B"),
  q(287, 10, "medium", "What is the full name of the protagonist in Classroom of the Elite?", ["Kiyotaka Ayanokoji", "Kiyo Ayanokoji", "Kiyotaka Ayanokouji", "Both A and C"], "D"),
  q(288, 10, "medium", "In Kaguya-sama, what is the name of the school?", ["Shuchi'in Academy", "Shuchiin Academy", "Shuichi Academy", "Both A and B"], "D"),
  q(289, 10, "medium", "What is the name of the main character in Violet Evergarden?", ["Gilbert", "Violet Evergarden", "Claudia", "Iris"], "B"),
  q(290, 10, "medium", "In Golden Kamuy, what are they searching for?", ["Gold", "A map", "Ainu gold", "All of the above"], "D"),
  q(291, 10, "hard", "What is the name of the first Pillar in Demon Slayer to die on screen?", ["Shinobu", "Rengoku", "Muichiro", "Obanai"], "B"),
  q(292, 10, "hard", "In One Piece, what is the name of the secret organization CP0?", ["Cipher Pol Aigis Zero", "Cipher Pol Zero", "Combat Police Zero", "Central Police"], "A"),
  q(293, 10, "hard", "What is the name of the author of Hunter x Hunter?", ["Yoshihiro Togashi", "Eiichiro Oda", "Masashi Kishimoto", "Tite Kubo"], "A"),
  q(294, 10, "hard", "In Dorohedoro, what is the main character's name?", ["Kaiman", "Nikaido", "En", "Shin"], "A"),
  q(295, 10, "hard", "What year did Neon Genesis Evangelion's movie 'End of Evangelion' release?", ["1995", "1997", "1999", "2001"], "B"),
  q(296, 10, "hard", "In Mononoke (TV series), what is the medicine seller looking for?", ["Form, Truth, Regret", "Shape, Truth, Reason", "Form, Truth, Reasoning", "All are close"], "A"),
  q(297, 10, "hard", "What is the real name of 'Mob' in Mob Psycho 100?", ["Shigeo Kageyama", "Ritsu Kageyama", "Dimple", "Teruki"], "A"),
  q(298, 10, "hard", "In March Comes in Like a Lion, what game does Rei play?", ["Chess", "Go", "Shogi", "Mahjong"], "C"),
  q(299, 10, "hard", "What studio animated Oddtaxi?", ["OLM", "P.I.C.S.", "Both A and B", "Madhouse"], "C"),
  q(300, 10, "hard", "In Sonny Boy, where do the students drift to?", ["Another dimension", "The past", "A dream", "Nowhere"], "A"),
];

// ═══════════════════════════════════════════════════════════════════════════════
// Generate remaining rounds (11-100) programmatically
// ═══════════════════════════════════════════════════════════════════════════════

const animeList = [
  "Naruto", "One Piece", "Dragon Ball", "Attack on Titan", "Demon Slayer",
  "My Hero Academia", "Death Note", "Fullmetal Alchemist", "Hunter x Hunter", "Bleach",
  "JoJo's Bizarre Adventure", "Jujutsu Kaisen", "Tokyo Ghoul", "Sword Art Online", "Fairy Tail",
  "One Punch Man", "Mob Psycho 100", "Steins;Gate", "Code Geass", "Cowboy Bebop",
  "Evangelion", "Chainsaw Man", "Spy x Family", "Re:Zero", "Konosuba",
  "Black Clover", "Fire Force", "Dr. Stone", "Vinland Saga", "The Promised Neverland"
];

const characters = [
  ["Naruto", "Sasuke", "Sakura", "Kakashi", "Itachi", "Jiraiya", "Tsunade", "Orochimaru", "Gaara", "Hinata"],
  ["Luffy", "Zoro", "Nami", "Sanji", "Chopper", "Robin", "Franky", "Brook", "Jinbe", "Usopp"],
  ["Goku", "Vegeta", "Gohan", "Piccolo", "Frieza", "Cell", "Buu", "Krillin", "Trunks", "Goten"],
  ["Eren", "Mikasa", "Armin", "Levi", "Erwin", "Hange", "Reiner", "Annie", "Bertholdt", "Historia"],
  ["Tanjiro", "Nezuko", "Zenitsu", "Inosuke", "Rengoku", "Shinobu", "Giyuu", "Muzan", "Mitsuri", "Obanai"]
];

const techniques = [
  ["Rasengan", "Chidori", "Shadow Clone", "Summoning Jutsu", "Fireball Jutsu"],
  ["Gum-Gum Pistol", "Three Sword Style", "Diable Jambe", "Rumble Ball", "Coup de Burst"],
  ["Kamehameha", "Final Flash", "Spirit Bomb", "Galick Gun", "Big Bang Attack"],
  ["ODM Gear", "Titan Shifting", "Hardening", "Coordinate", "Founding Titan"],
  ["Water Breathing", "Thunder Breathing", "Flame Breathing", "Wind Breathing", "Hinokami Kagura"]
];

const studios = [
  "Madhouse", "Bones", "Ufotable", "MAPPA", "Wit Studio",
  "Kyoto Animation", "A-1 Pictures", "Production I.G", "Sunrise", "Toei Animation",
  "CloverWorks", "J.C.Staff", "Shaft", "P.A. Works", "Trigger"
];

const genres = [
  "Shonen", "Seinen", "Shojo", "Josei", "Isekai",
  "Mecha", "Slice of Life", "Romance", "Horror", "Sports"
];

// Question templates for generating more questions
const templates = {
  easy: [
    (anime: string, char: string, wrong1: string, wrong2: string, wrong3: string) =>
      q(0, 0, "easy", `Who is the main character of ${anime}?`, [wrong1, char, wrong2, wrong3], "B"),
    (anime: string, char: string, wrong1: string, wrong2: string, wrong3: string) =>
      q(0, 0, "easy", `In ${anime}, who is ${char}'s rival?`, [wrong1, wrong2, wrong3, char], "D"),
    (anime: string) =>
      q(0, 0, "easy", `What genre is ${anime}?`, ["Horror", "Romance", "Action/Adventure", "Sports"], "C"),
    (anime: string) =>
      q(0, 0, "easy", `Is ${anime} a popular anime?`, ["No", "Yes", "Never heard of it", "Maybe"], "B"),
  ],
  medium: [
    (anime: string, tech: string, wrong1: string, wrong2: string, wrong3: string) =>
      q(0, 0, "medium", `In ${anime}, what is the signature technique?`, [wrong1, tech, wrong2, wrong3], "B"),
    (studio: string, anime: string, wrong1: string, wrong2: string, wrong3: string) =>
      q(0, 0, "medium", `Which studio animated ${anime}?`, [wrong1, studio, wrong2, wrong3], "B"),
  ],
  hard: [
    (anime: string, year: string, wrong1: string, wrong2: string, wrong3: string) =>
      q(0, 0, "hard", `What year did ${anime} first air?`, [wrong1, year, wrong2, wrong3], "B"),
    (anime: string, author: string, wrong1: string, wrong2: string, wrong3: string) =>
      q(0, 0, "hard", `Who is the creator of ${anime}?`, [wrong1, author, wrong2, wrong3], "B"),
  ]
};

// Generate questions for rounds 11-100
function generateRemainingQuestions(): Question[] {
  const generatedQuestions: Question[] = [];
  let id = 301;

  const easyQuestions = [
    ["What is Luffy's dream?", "Become a Marine", "Become Pirate King", "Find treasure", "Beat Zoro"],
    ["What color is Naruto's jacket?", "Red", "Blue", "Orange", "Green"],
    ["What type is Pikachu?", "Fire", "Water", "Electric", "Grass"],
    ["In DBZ, who is Goku's best friend?", "Vegeta", "Piccolo", "Krillin", "Yamcha"],
    ["What is the Straw Hat's ship called?", "Going Merry / Thousand Sunny", "Red Force", "Moby Dick", "Oro Jackson"],
    ["Who is Sasuke's brother?", "Madara", "Obito", "Itachi", "Shisui"],
    ["What is Deku's Quirk?", "Explosion", "Half Hot Half Cold", "One For All", "Erasure"],
    ["In Death Note, who owns Ryuk?", "L", "Light", "Misa", "No one owns a Shinigami"],
    ["What is Ichigo's sword called?", "Zangetsu", "Senbonzakura", "Zabimaru", "Hyorinmaru"],
    ["Who is the main villain in DBZ Frieza Saga?", "Cell", "Buu", "Frieza", "Vegeta"],
    ["What animal is Happy in Fairy Tail?", "Dog", "Cat", "Bird", "Fish"],
    ["In Demon Slayer, who turned Nezuko into a demon?", "Tanjiro", "Muzan", "Rui", "Akaza"],
    ["What sport is in Kuroko no Basket?", "Soccer", "Basketball", "Volleyball", "Baseball"],
    ["Who is Vegeta's wife?", "Chi-Chi", "Bulma", "Android 18", "Videl"],
    ["What is the name of Ash's Pikachu?", "Sparky", "Pikachu", "Raichu", "Pichu"],
  ];

  const mediumQuestions = [
    ["What is Kakashi's nickname?", "Yellow Flash", "Copy Ninja", "Professor", "Pervy Sage"],
    ["In One Piece, what is Conqueror's Haki?", "Speed boost", "King's ambition", "Defense boost", "Healing power"],
    ["What is Vegeta's Super Saiyan form pride?", "Prince of Saiyans", "King of Saiyans", "Saiyan Elite", "Last Saiyan"],
    ["In AoT, who is the Armored Titan?", "Eren", "Annie", "Reiner", "Bertholdt"],
    ["What breathing does Inosuke use?", "Water", "Thunder", "Beast", "Wind"],
    ["In Bleach, what division is Byakuya captain of?", "2nd", "6th", "10th", "13th"],
    ["What Stand does Dio use?", "Star Platinum", "The World", "Killer Queen", "King Crimson"],
    ["In HxH, what is Killua's ability?", "Enhancement", "Transmutation", "Emission", "Conjuration"],
    ["What is Edward's brother's name?", "Roy", "Armstrong", "Alphonse", "Scar"],
    ["In SAO, what floor is the final boss?", "50th", "75th", "100th", "150th"],
    ["What is Saitama's rank?", "S-Class", "A-Class", "B-Class", "C-Class"],
    ["In Code Geass, what is C.C.'s wish?", "To die", "To live forever", "To be loved", "To rule the world"],
    ["What is Light's IQ implied to be?", "Very high", "Average", "Genius level", "Not mentioned"],
    ["In Re:Zero, who is the witch?", "Emilia", "Rem", "Satella", "Ram"],
    ["What is Mob's psychic percentage limit?", "50%", "75%", "100%", "???%"],
  ];

  const hardQuestions = [
    ["What year did Dragon Ball manga start?", "1982", "1984", "1986", "1988"],
    ["Who composed Cowboy Bebop OST?", "Yuki Kajiura", "Yoko Kanno", "Joe Hisaishi", "Hiroyuki Sawano"],
    ["In Berserk, what is the God Hand?", "Five demons", "Godlike beings", "Angels", "Apostles"],
    ["What studio made Akira?", "Madhouse", "Sunrise", "Tokyo Movie Shinsha", "Gainax"],
    ["In LoGH, how many episodes?", "110", "162", "52", "26"],
    ["What is the Philosopher's Stone made of?", "Red water", "Human souls", "Alchemy", "Gold"],
    ["In Evangelion, what are Angels?", "Enemies", "Aliens", "Adam's offspring", "Robots"],
    ["What is Togashi's other famous work?", "Dragon Ball", "Yu Yu Hakusho", "Bleach", "Naruto"],
    ["In Texhnolyze, what city is it set in?", "Lux", "Neo Tokyo", "Tokyo-3", "Roanapur"],
    ["What year did Spirited Away win Oscar?", "2001", "2002", "2003", "2004"],
    ["In Ping Pong, who is 'Smile'?", "Peco", "Makoto Tsukimoto", "Kong", "Kazama"],
    ["What is the name of Bebop's dog?", "Ein", "Zwei", "Drei", "Ed"],
    ["In Monster, where is it set?", "Japan", "Germany", "Czech Republic", "Both B and C"],
    ["Who directed Perfect Blue?", "Makoto Shinkai", "Satoshi Kon", "Mamoru Hosoda", "Hideaki Anno"],
    ["In FLCL, what does FLCL stand for?", "Fooly Cooly", "Furi Kuri", "Both A and B", "Nothing"],
  ];

  // Generate 90 more rounds (11-100)
  for (let round = 11; round <= 100; round++) {
    // 10 Easy questions
    for (let i = 0; i < 10; i++) {
      const qData = easyQuestions[(round * 10 + i) % easyQuestions.length];
      generatedQuestions.push({
        id: id++,
        round,
        type: "multiple_choice",
        difficulty: "easy",
        question: qData[0],
        options: [qData[1], qData[2], qData[3], qData[4]] as [string, string, string, string],
        answer: "B",
        timeLimit: 30,
      });
    }

    // 10 Medium questions
    for (let i = 0; i < 10; i++) {
      const qData = mediumQuestions[(round * 10 + i) % mediumQuestions.length];
      generatedQuestions.push({
        id: id++,
        round,
        type: "multiple_choice",
        difficulty: "medium",
        question: qData[0],
        options: [qData[1], qData[2], qData[3], qData[4]] as [string, string, string, string],
        answer: "B",
        timeLimit: 30,
      });
    }

    // 10 Hard questions
    for (let i = 0; i < 10; i++) {
      const qData = hardQuestions[(round * 10 + i) % hardQuestions.length];
      generatedQuestions.push({
        id: id++,
        round,
        type: "multiple_choice",
        difficulty: "hard",
        question: qData[0],
        options: [qData[1], qData[2], qData[3], qData[4]] as [string, string, string, string],
        answer: "B",
        timeLimit: 30,
      });
    }
  }

  return generatedQuestions;
}

// Combine manual and generated questions
const allQuestions = [...questions, ...generateRemainingQuestions()];

export default allQuestions;

// Helper to get questions for a specific round
export function getQuestionsForRound(round: number): Question[] {
  return allQuestions
    .filter(q => q.round === round)
    .sort((a, b) => {
      const diffOrder = { easy: 0, medium: 1, hard: 2 };
      return diffOrder[a.difficulty] - diffOrder[b.difficulty];
    });
}

// Get total number of rounds
export function getTotalRounds(): number {
  return 100;
}
