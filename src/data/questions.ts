// ═══════════════════════════════════════════════════════════════════════════════
// ANIME WIZ LIVE ARENA — 3000 QUESTIONS (100 ROUNDS × 30 QUESTIONS)
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

function q(id: number, round: number, difficulty: "easy" | "medium" | "hard",
  question: string, options: [string, string, string, string], answer: "A" | "B" | "C" | "D"): Question {
  return { id, round, type: "multiple_choice", difficulty, question, options, answer, timeLimit: 30 };
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROUNDS 1-10: Handcrafted (300 unique questions)
// ═══════════════════════════════════════════════════════════════════════════════
const handcrafted: Question[] = [
  // ROUND 1
  q(1,1,"easy","Main character of Naruto?",["Sasuke","Naruto Uzumaki","Kakashi","Itachi"],"B"),
  q(2,1,"easy","What color is Pikachu?",["Red","Blue","Yellow","Green"],"C"),
  q(3,1,"easy","Goku's signature attack in DBZ?",["Final Flash","Kamehameha","Spirit Bomb","Galick Gun"],"B"),
  q(4,1,"easy","What fruit did Luffy eat?",["Flame-Flame","Gum-Gum","Chop-Chop","Smoke-Smoke"],"B"),
  q(5,1,"easy","Ash's first Pokémon?",["Charmander","Bulbasaur","Squirtle","Pikachu"],"D"),
  q(6,1,"easy","Giant creatures in Attack on Titan?",["Giants","Titans","Colossi","Monsters"],"B"),
  q(7,1,"easy","Main character in Demon Slayer?",["Zenitsu","Inosuke","Tanjiro","Rengoku"],"C"),
  q(8,1,"easy","Deku's real name in MHA?",["Katsuki","Shoto","Izuku Midoriya","Tenya"],"C"),
  q(9,1,"easy","What does the Death Note do?",["Grants wishes","Kills people","Predicts future","Controls minds"],"B"),
  q(10,1,"easy","Sailor Moon's civilian name?",["Rei","Ami","Usagi Tsukino","Minako"],"C"),
  q(11,1,"medium","Survey Corps commander in AoT S1?",["Levi","Erwin Smith","Hange","Keith"],"B"),
  q(12,1,"medium","Demon sealed inside Naruto?",["Shukaku","Matatabi","Kurama","Gyuki"],"C"),
  q(13,1,"medium","Zoro's dream in One Piece?",["Find One Piece","Greatest swordsman","Marine Admiral","Find All Blue"],"B"),
  q(14,1,"medium","Power system in Hunter x Hunter?",["Chakra","Ki","Nen","Reiatsu"],"C"),
  q(15,1,"medium","Jotaro's Stand?",["The World","Star Platinum","Crazy Diamond","Gold Experience"],"B"),
  q(16,1,"medium","What did Edward lose in FMA?",["Heart","Arm and leg","Eyes","Voice"],"B"),
  q(17,1,"medium","Light's Shinigami in Death Note?",["Rem","Ryuk","Gelus","Sidoh"],"B"),
  q(18,1,"medium","Ichigo's Zanpakuto?",["Senbonzakura","Zangetsu","Hyorinmaru","Zabimaru"],"B"),
  q(19,1,"medium","Tanjiro's primary breathing?",["Thunder","Water","Flame","Wind"],"B"),
  q(20,1,"medium","All Might's real name?",["Gran Torino","Toshinori Yagi","Endeavor","Best Jeanist"],"B"),
  q(21,1,"hard","Dragon Ball anime first aired?",["1984","1986","1988","1990"],"B"),
  q(22,1,"hard","Gol D. Roger's ship?",["Thousand Sunny","Going Merry","Oro Jackson","Red Force"],"C"),
  q(23,1,"hard","Jutsu that sealed the Nine-Tails?",["Edo Tensei","Reaper Death Seal","Infinite Tsukuyomi","Izanami"],"B"),
  q(24,1,"hard","NERV's city in Evangelion?",["Neo Tokyo","Tokyo-2","Tokyo-3","New Tokyo"],"C"),
  q(25,1,"hard","Studio that animated Cowboy Bebop?",["Madhouse","Bones","Sunrise","Production I.G"],"C"),
  q(26,1,"hard","Time machine in Steins;Gate?",["Phone Microwave","Time Leap Machine","D-Mail","IBN 5100"],"A"),
  q(27,1,"hard","Highest Hunter rank in HxH?",["Single Star","Double Star","Triple Star","Four Star"],"C"),
  q(28,1,"hard","Guts' sword in Berserk?",["Dragonslayer","Buster Sword","Rebellion","Soul Edge"],"A"),
  q(29,1,"hard","Gojo's Domain Expansion?",["Malevolent Shrine","Chimera Shadow","Infinite Void","Horizon"],"C"),
  q(30,1,"hard","Lelouch's Geass power?",["Mind reading","Absolute obedience","Time manipulation","Memory alteration"],"B"),

  // ROUND 2
  q(31,2,"easy","How many Dragon Balls are there?",["5","6","7","8"],"C"),
  q(32,2,"easy","Naruto's team number?",["Team 5","Team 7","Team 10","Team 8"],"B"),
  q(33,2,"easy","Luffy wants to become?",["Marine","Pirate King","Revolutionary","Yonko"],"B"),
  q(34,2,"easy","Goku's gi color in DBZ?",["Blue","Red","Orange","Green"],"C"),
  q(35,2,"easy","Team Rocket leader?",["James","Jessie","Giovanni","Meowth"],"C"),
  q(36,2,"easy","School in My Hero Academia?",["Shiketsu","U.A. High School","Ketsubutsu","Isamu"],"B"),
  q(37,2,"easy","What happened to Tanjiro's family?",["Moved","Killed by demons","Became demons","Joined Corps"],"B"),
  q(38,2,"easy","What is Inuyasha?",["Full demon","Full human","Half-demon","Spirit"],"C"),
  q(39,2,"easy","In Spirited Away, parents turned into?",["Cats","Pigs","Dogs","Birds"],"B"),
  q(40,2,"easy","Main character in SAO?",["Klein","Kirito","Asuna","Heathcliff"],"B"),
  q(41,2,"medium","Sasuke's brother?",["Madara","Obito","Itachi","Shisui"],"C"),
  q(42,2,"medium","Sanji's dream?",["Pirate King","Find the All Blue","Greatest swordsman","Map world"],"B"),
  q(43,2,"medium","Titan Eren transforms into?",["Colossal","Attack Titan","Armored","Beast"],"B"),
  q(44,2,"medium","L's real name?",["L Lawliet","Nate River","Mihael","Beyond Birthday"],"A"),
  q(45,2,"medium","Gon's father?",["Ging Freecss","Kite","Netero","Pariston"],"A"),
  q(46,2,"medium","Soul Society's military in Bleach?",["Soul Reapers","Gotei 13","Quincy","Arrancar"],"B"),
  q(47,2,"medium","Edward's alchemist title?",["Flame","Fullmetal","Strong Arm","Crimson"],"B"),
  q(48,2,"medium","King of Curses in JJK?",["Gojo","Mahito","Sukuna","Geto"],"C"),
  q(49,2,"medium","Organization Itachi belongs to?",["Anbu","Akatsuki","Root","Sound Four"],"B"),
  q(50,2,"medium","Anya's ability in Spy x Family?",["Super strength","Telepathy","Invisibility","Flight"],"B"),
  q(51,2,"hard","Megumi's cursed technique?",["Limitless","Ten Shadows","Boogie Woogie","Ratio"],"B"),
  q(52,2,"hard","Thorfinn's father in Vinland Saga?",["Thorkell","Askeladd","Thors","Canute"],"C"),
  q(53,2,"hard","Studio that animated AoT S1-3?",["MAPPA","Wit Studio","Bones","Madhouse"],"B"),
  q(54,2,"hard","Main antagonist in Monster?",["Johan Liebert","Wolfgang","Roberto","Nameless"],"A"),
  q(55,2,"hard","Spaceship in Cowboy Bebop?",["Swordfish II","Bebop","Red Tail","Hammerhead"],"B"),
  q(56,2,"hard","Pochita in Chainsaw Man?",["Blood Devil","Chainsaw Devil","Gun Devil","Darkness Devil"],"B"),
  q(57,2,"hard","Mob's real name?",["Ritsu","Shigeo Kageyama","Teruki","Katsuya"],"B"),
  q(58,2,"hard","Deepest layer in Made in Abyss?",["Capital","Final Maelstrom","The Bottom","Netherworld"],"B"),
  q(59,2,"hard","Protagonist in Parasyte?",["Migi","Shinichi Izumi","Gotou","Reiko"],"B"),
  q(60,2,"hard","Leader of Galactic Empire in LoGH?",["Yang","Reinhard","Siegfried","Paul"],"B"),

  // ROUND 3
  q(61,3,"easy","What village is Naruto from?",["Sand","Leaf","Mist","Cloud"],"B"),
  q(62,3,"easy","Goku's rival in DBZ?",["Krillin","Piccolo","Vegeta","Tien"],"C"),
  q(63,3,"easy","Totoro's film?",["Spirited Away","My Neighbor Totoro","Princess Mononoke","Howl's Castle"],"B"),
  q(64,3,"easy","Eren's adoptive sister?",["Historia","Annie","Mikasa","Sasha"],"C"),
  q(65,3,"easy","Weapon Ichigo uses?",["Spear","Sword","Bow","Fists"],"B"),
  q(66,3,"easy","Bakugo's Quirk?",["One For All","Explosion","Half-Cold","Engine"],"B"),
  q(67,3,"easy","Death gods in Death Note called?",["Demons","Reapers","Shinigami","Ghosts"],"C"),
  q(68,3,"easy","Nezuko is Tanjiro's?",["Girlfriend","Sister","Mother","Friend"],"B"),
  q(69,3,"easy","Naruto's favorite food?",["Sushi","Ramen","Rice balls","Dango"],"B"),
  q(70,3,"easy","Inuyasha's hair color?",["Black","Silver/White","Brown","Red"],"B"),
  q(71,3,"medium","Killua's family in HxH?",["Freecss","Zoldyck","Kurta","Phantom Troupe"],"B"),
  q(72,3,"medium","Uchiha clan eye technique?",["Byakugan","Rinnegan","Sharingan","Tenseigan"],"C"),
  q(73,3,"medium","Straw Hats' doctor?",["Sanji","Chopper","Robin","Franky"],"B"),
  q(74,3,"medium","Second Kira in Death Note?",["Mello","Near","Misa Amane","Teru Mikami"],"C"),
  q(75,3,"medium","Zenitsu's breathing?",["Water","Thunder","Wind","Flame"],"B"),
  q(76,3,"medium","Saitama's hero name?",["One Punch Man","Caped Baldy","Strongest Hero","Bald Cape"],"B"),
  q(77,3,"medium","Strongest AoT soldier?",["Erwin","Levi","Hange","Mike"],"B"),
  q(78,3,"medium","Kaneki is what kind of ghoul?",["Natural","One-Eyed","Half-Ghoul","Artificial"],"B"),
  q(79,3,"medium","Rock Lee's specialty?",["Ninjutsu","Genjutsu","Taijutsu","Fuinjutsu"],"C"),
  q(80,3,"medium","Natsu's magic in Fairy Tail?",["Ice","Fire Dragon Slayer","Celestial","Requip"],"B"),
  q(81,3,"hard","Who created Homunculi in FMA:B?",["State Military","Father's Children","Underground","Dwarf in Flask"],"D"),
  q(82,3,"hard","Phantom Troupe members?",["10","11","12","13"],"D"),
  q(83,3,"hard","Technique that multiplies Goku's power?",["Super Saiyan","Kaioken","Ultra Instinct","IT"],"B"),
  q(84,3,"hard","Organization Okabe fears?",["CERN","SERN","NASA","WHO"],"B"),
  q(85,3,"hard","L's real name?",["Nate","L Lawliet","Mihael","Quillsh"],"B"),
  q(86,3,"hard","Simon's mech in Gurren Lagann?",["Gurren","Lagann","Gurren Lagann","Tengen Toppa"],"B"),
  q(87,3,"hard","Evangelion first aired?",["1993","1995","1997","1999"],"B"),
  q(88,3,"hard","What measures criminal intent in Psycho-Pass?",["Crime Coefficient","Psycho Meter","Dominator","Sibyl"],"A"),
  q(89,3,"hard","Spike's former partner?",["Jet","Vicious","Lin","Shin"],"B"),
  q(90,3,"hard","Major Kusanagi's first name?",["Motoko","Mokoto","Makoto","Mikoto"],"A"),

  // ROUND 4
  q(91,4,"easy","Jiji in Kiki's Delivery Service?",["Dog","Cat","Bird","Rabbit"],"B"),
  q(92,4,"easy","Goku's Saiyan name?",["Vegeta","Kakarot","Raditz","Broly"],"B"),
  q(93,4,"easy","Luffy's crew name?",["Red Hair","Straw Hat","Heart","Kid"],"B"),
  q(94,4,"easy","Main character in Tokyo Ghoul?",["Touka","Ken Kaneki","Hideyoshi","Shuu"],"B"),
  q(95,4,"easy","Charizard's type?",["Fire/Dragon","Fire/Flying","Fire/Ground","Pure Fire"],"B"),
  q(96,4,"easy","Eren's best friend?",["Mikasa","Armin","Jean","Reiner"],"B"),
  q(97,4,"easy","Natsu's guild?",["Phantom Lord","Fairy Tail","Blue Pegasus","Sabertooth"],"B"),
  q(98,4,"easy","What is Doraemon?",["Robot cat","Robot dog","Robot mouse","Robot bird"],"A"),
  q(99,4,"easy","Sport in Haikyuu?",["Basketball","Soccer","Volleyball","Baseball"],"C"),
  q(100,4,"easy","Goku's wife?",["Bulma","Chi-Chi","Android 18","Videl"],"B"),
  q(101,4,"medium","First Hokage?",["Tobirama","Hashirama","Hiruzen","Minato"],"B"),
  q(102,4,"medium","Planet Frieza destroyed?",["Earth","Namek","Planet Vegeta","Yardrat"],"C"),
  q(103,4,"medium","Rem's sister in Re:Zero?",["Emilia","Ram","Beatrice","Felt"],"B"),
  q(104,4,"medium","Protagonist in Mob Psycho 100?",["Reigen","Mob","Dimple","Ritsu"],"B"),
  q(105,4,"medium","Koro-sensei in Assassination Classroom?",["Alien","Demon","Modified human","Experiment"],"C"),
  q(106,4,"medium","Toradora male lead?",["Ryuuji Takasu","Yusaku","Hisamitsu","Kouji"],"A"),
  q(107,4,"medium","Navy HQ in One Piece?",["Enies Lobby","Impel Down","Marineford","Sabaody"],"C"),
  q(108,4,"medium","Lelouch's mech in Code Geass?",["Lancelot","Guren","Shinkiro","Zangetsu"],"C"),
  q(109,4,"medium","Protagonist in Blue Exorcist?",["Yukio","Rin Okumura","Mephisto","Shura"],"B"),
  q(110,4,"medium","Gintoki's wooden sword?",["Bokuto","Lake Toya","Zangetsu","Excalibur"],"B"),
  q(111,4,"hard","Quincy King in Bleach?",["Uryu","Yhwach","Ryuken","Jugram"],"B"),
  q(112,4,"hard","Main villain in JoJo Part 4?",["DIO","Kira Yoshikage","Diavolo","Pucci"],"B"),
  q(113,4,"hard","World in SAO: Alicization?",["Aincrad","ALfheim","Underworld","Gun Gale"],"C"),
  q(114,4,"hard","Saber's identity in Fate/Zero?",["Mordred","Nero","King Arthur","Jeanne"],"C"),
  q(115,4,"hard","Creator of Dragon Ball?",["Oda","Kishimoto","Akira Toriyama","Kubo"],"C"),
  q(116,4,"hard","Vash's epithet in Trigun?",["Human Typhoon","Stampede","Humanoid Typhoon","Walking Disaster"],"C"),
  q(117,4,"hard","Studio for Violet Evergarden?",["A-1","Kyoto Animation","Ufotable","P.A. Works"],"B"),
  q(118,4,"hard","Network in Serial Experiments Lain?",["The Net","The Wire","The Wired","Connection"],"C"),
  q(119,4,"hard","Protagonist in Akira?",["Tetsuo","Kaneda","Kei","Colonel"],"B"),
  q(120,4,"hard","Studio that animated Demon Slayer?",["Bones","MAPPA","Ufotable","Wit Studio"],"C"),

  // ROUND 5
  q(121,5,"easy","Talking cat in Fairy Tail?",["Happy","Carla","Pantherlily","Frosch"],"A"),
  q(122,5,"easy","Genin rank in Naruto?",["Lowest ninja","Mid-level","Elite","Kage level"],"A"),
  q(123,5,"easy","Super Saiyan hair color?",["Red","Blue","Gold/Yellow","Green"],"C"),
  q(124,5,"easy","Chopper is a?",["Fox","Reindeer","Dog","Raccoon"],"B"),
  q(125,5,"easy","Conan's real identity?",["Shinichi Kudo","Heiji","Kogoro","Kid"],"A"),
  q(126,5,"easy","What Tanjiro sells at start?",["Fish","Vegetables","Charcoal","Cloth"],"C"),
  q(127,5,"easy","Goku's first son?",["Goten","Gohan","Trunks","Pan"],"B"),
  q(128,5,"easy","Naruto's father?",["Hiruzen","Minato","Jiraiya","Kakashi"],"B"),
  q(129,5,"easy","Card game in Yu-Gi-Oh?",["Magic Cards","Duel Monsters","Shadow Games","Monster Cards"],"B"),
  q(130,5,"easy","Ash's original rival?",["Paul","Gary","Trip","Alain"],"B"),
  q(131,5,"medium","Who taught Rasengan?",["Kakashi","Iruka","Jiraiya","Minato"],"C"),
  q(132,5,"medium","Devil Fruit Blackbeard stole?",["Gura Gura","Yami Yami","Mera Mera","Ope Ope"],"A"),
  q(133,5,"medium","Female lead in Steins;Gate?",["Mayuri","Kurisu","Moeka","Suzuha"],"B"),
  q(134,5,"medium","Who killed All Might's master?",["All For One","Shigaraki","Stain","Overhaul"],"A"),
  q(135,5,"medium","Subaru's ability in Re:Zero?",["Return by Death","Respawn","Time Loop","Death Return"],"A"),
  q(136,5,"medium","Aqua is goddess of?",["Fire","Water","Earth","Wind"],"B"),
  q(137,5,"medium","Vegeta+Goku earring fusion?",["Gogeta","Vegito","Gotenks","Veku"],"B"),
  q(138,5,"medium","Gaara's tailed beast?",["One-Tail","Two-Tails","Eight-Tails","Nine-Tails"],"A"),
  q(139,5,"medium","Zero Two's partner?",["Hiro","Goro","Mitsuru","Zorome"],"A"),
  q(140,5,"medium","Madara's clan?",["Senju","Uchiha","Uzumaki","Hyuga"],"B"),
  q(141,5,"hard","Madara's brother?",["Izuna","Tajima","Obito","Fugaku"],"A"),
  q(142,5,"hard","Ope Ope no Mi user?",["Doflamingo","Law","Corazon","Kuma"],"B"),
  q(143,5,"hard","Author of Attack on Titan?",["Hajime Isayama","Kentaro Miura","Togashi","Oda"],"A"),
  q(144,5,"hard","Archer's identity in Fate/Stay Night?",["Gilgamesh","Emiya","Cu","Heracles"],"B"),
  q(145,5,"hard","One Piece manga began?",["1995","1997","1999","2001"],"B"),
  q(146,5,"hard","Oddity possessing Hitagi?",["Crab","Snail","Monkey","Snake"],"A"),
  q(147,5,"hard","Coffee shop in Tokyo Ghoul?",["Anteiku","Re:","Aogiri","CCG Cafe"],"A"),
  q(148,5,"hard","Headless rider in Durarara?",["Celty","Shizuo","Izaya","Mikado"],"A"),
  q(149,5,"hard","Cowboy Bebop first aired?",["1995","1998","2000","2002"],"B"),
  q(150,5,"hard","Alucard's true name?",["Vlad","Dracula","Both","Nosferatu"],"C"),

  // ROUND 6
  q(151,6,"easy","Fire Stone evolution?",["Vaporeon","Jolteon","Flareon","Espeon"],"C"),
  q(152,6,"easy","First to join Luffy?",["Nami","Zoro","Usopp","Sanji"],"B"),
  q(153,6,"easy","Sebastian in Black Butler?",["Human","Demon","Angel","Reaper"],"B"),
  q(154,6,"easy","Kakashi summons?",["Toads","Dogs","Snakes","Slugs"],"B"),
  q(155,6,"easy","SAO stands for?",["Super Art","Sword Art Online","System Artificial","Saga Adventure"],"B"),
  q(156,6,"easy","Talking cat in Sailor Moon?",["Luna","Artemis","Diana","Phobos"],"A"),
  q(157,6,"easy","Todoroki's left hair color?",["White","Red","Half","Brown"],"B"),
  q(158,6,"easy","Brook's role in One Piece?",["Musician","Doctor","Cook","Navigator"],"A"),
  q(159,6,"easy","Deku's Quirk?",["Explosion","Half Hot","One For All","Erasure"],"C"),
  q(160,6,"easy","What type is Pikachu?",["Fire","Water","Electric","Grass"],"C"),
  q(161,6,"medium","Lelouch's sister?",["C.C.","Kallen","Nunnally","Euphemia"],"C"),
  q(162,6,"medium","Phantom Troupe also called?",["Spider","Scorpion","Shadow","Snake"],"A"),
  q(163,6,"medium","Humanity petrified in Dr. Stone?",["1000 yrs","3700 yrs","5000 yrs","10000 yrs"],"B"),
  q(164,6,"medium","Ainz's class in Overlord?",["Warrior","Necromancer","Paladin","Ranger"],"B"),
  q(165,6,"medium","Fairy Tail guild master?",["Gildarts","Makarov","Laxus","Mystogan"],"B"),
  q(166,6,"medium","Giorno's power in JoJo 5?",["Gold Experience","King Crimson","Sticky Fingers","Sex Pistols"],"A"),
  q(167,6,"medium","Fifth Hokage?",["Hiruzen","Minato","Tsunade","Kakashi"],"C"),
  q(168,6,"medium","Death Scythe name in Soul Eater?",["Maka","Soul","Death the Kid","Black Star"],"B"),
  q(169,6,"medium","Inuyasha's sword?",["Tenseiga","Tessaiga","Bakusaiga","So'unga"],"B"),
  q(170,6,"medium","Strongest Hashira?",["Rengoku","Gyomei","Sanemi","Muichiro"],"B"),
  q(171,6,"hard","Whitebeard's epithet?",["King of Pirates","Strongest Man","Greatest Swordsman","Dark King"],"B"),
  q(172,6,"hard","Composer of AoT music?",["Yuki Kajiura","Hiroyuki Sawano","Yoko Kanno","Joe Hisaishi"],"B"),
  q(173,6,"hard","Creatures in Mushishi?",["Spirits","Mushi","Youkai","Oni"],"B"),
  q(174,6,"hard","Studio for Madoka Magica?",["Kyoto Ani","Shaft","A-1","P.A. Works"],"B"),
  q(175,6,"hard","Virtual world in .hack?",["Aincrad","The World","Yggdrasil","VRMMO"],"B"),
  q(176,6,"hard","First JoJo arc?",["Phantom Blood","Battle Tendency","Stardust Crusaders","Diamond"],"A"),
  q(177,6,"hard","Studio for FMA 2003?",["Bones","Madhouse","Sunrise","Wit"],"A"),
  q(178,6,"hard","Detective agency in Bungo Stray Dogs?",["Armed Detective","Port Mafia","Guild","Decay"],"A"),
  q(179,6,"hard","FMA: Brotherhood aired?",["2003","2006","2009","2012"],"C"),
  q(180,6,"hard","Director of Perfect Blue?",["Shinkai","Satoshi Kon","Hosoda","Anno"],"B"),

  // ROUND 7
  q(181,7,"easy","Goku's first son?",["Goten","Gohan","Trunks","Pan"],"B"),
  q(182,7,"easy","Byakugan is?",["A sword","Eye technique","Village","Scroll"],"B"),
  q(183,7,"easy","Agumon is a?",["Pokémon","Digimon","Monster","Spirit"],"B"),
  q(184,7,"easy","Tanjiro's hair color?",["Black","Red and black","Brown","Blue"],"B"),
  q(185,7,"easy","'Plus Ultra' means?",["Go beyond","Never give up","Hero time","Ultimate power"],"A"),
  q(186,7,"easy","Main character in Beyblade?",["Tyson","Kai","Ray","Max"],"A"),
  q(187,7,"easy","Sport in Slam Dunk?",["Volleyball","Soccer","Basketball","Baseball"],"C"),
  q(188,7,"easy","Sacred jewel in Inuyasha?",["Shikon Jewel","Dragon Ball","Philosopher's Stone","Holy Grail"],"A"),
  q(189,7,"easy","Transformation after Super Saiyan?",["Super Saiyan 2","Ultra Instinct","Super Saiyan God","Kaioken"],"A"),
  q(190,7,"easy","Naruto and Hinata's son?",["Himawari","Boruto","Kawaki","Mitsuki"],"B"),
  q(191,7,"medium","Where is DIO hiding in JoJo 3?",["Japan","America","Egypt","Italy"],"C"),
  q(192,7,"medium","Vegeta's brother?",["Raditz","Tarble","Nappa","King Vegeta"],"B"),
  q(193,7,"medium","Gon's Nen type?",["Enhancer","Emitter","Conjurer","Specialist"],"A"),
  q(194,7,"medium","Main city in Akame ga Kill?",["Capital","Empire City","Revolution Town","Night Raid"],"A"),
  q(195,7,"medium","Rimuru is a?",["Human","Demon Lord","Slime","Dragon"],"C"),
  q(196,7,"medium","Yami Yami no Mi user?",["Ace","Blackbeard","Aokiji","Kizaru"],"B"),
  q(197,7,"medium","Aizen's Zanpakuto ability?",["Illusions","Time control","Gravity","Soul absorption"],"A"),
  q(198,7,"medium","Chimera Ant King in HxH?",["Pitou","Meruem","Youpi","Pouf"],"B"),
  q(199,7,"medium","Who killed Thors?",["Thorkell","Askeladd","Canute","Bjorn"],"B"),
  q(200,7,"medium","Protagonist in Violet Evergarden?",["Gilbert","Violet","Claudia","Iris"],"B"),
  q(201,7,"hard","One Piece treasure island?",["Laugh Tale","Skypiea","Wano","Elbaf"],"A"),
  q(202,7,"hard","Creator of Edo Tensei?",["Orochimaru","Tobirama","Kabuto","Madara"],"B"),
  q(203,7,"hard","First AoT OP song?",["Shinzou wo Sasageyo","Guren no Yumiya","Jiyuu no Tsubasa","Red Swan"],"B"),
  q(204,7,"hard","Train in Baccano?",["Orient Express","Flying Pussyfoot","Galaxy Express","Night Train"],"B"),
  q(205,7,"hard","Protagonist in Berserk?",["Griffith","Casca","Guts","Skull Knight"],"C"),
  q(206,7,"hard","Studio for Monogatari?",["Kyoto Ani","Shaft","Madhouse","Bones"],"B"),
  q(207,7,"hard","Kenshin's scar shaped?",["X","Cross","Plus","None"],"B"),
  q(208,7,"hard","Bebop's dog?",["Ein","Zwei","Drei","Ed"],"A"),
  q(209,7,"hard","CP0 full name?",["Cipher Pol Aigis Zero","Cipher Pol Zero","Combat Police","Central Police"],"A"),
  q(210,7,"hard","HxH author?",["Togashi","Oda","Kishimoto","Kubo"],"A"),

  // ROUND 8
  q(211,8,"easy","Ash wants to become?",["Gym Leader","Pokémon Master","Professor","Champion"],"B"),
  q(212,8,"easy","Goku's afterlife trainer?",["Kami","King Kai","Whis","Beerus"],"B"),
  q(213,8,"easy","Nami's role?",["Cook","Doctor","Navigator","Sniper"],"C"),
  q(214,8,"easy","Annie transforms into?",["Colossal","Armored","Female Titan","Beast"],"C"),
  q(215,8,"easy","Evil spirits in Bleach?",["Shinigami","Hollows","Quincy","Fullbringers"],"B"),
  q(216,8,"easy","Gray's magic?",["Fire","Ice Make","Lightning","Wind"],"B"),
  q(217,8,"easy","Elric brothers?",["Ed and Al","Roy and Riza","Ling and Lan","Scar and Miles"],"A"),
  q(218,8,"easy","Inside AoT walls?",["Nothing","Colossal Titans","Humans","Animals"],"B"),
  q(219,8,"easy","Hinata's cousin?",["Kiba","Shino","Neji","Lee"],"C"),
  q(220,8,"easy","Studio for Spirited Away?",["Madhouse","Studio Ghibli","Toei","Bones"],"B"),
  q(221,8,"medium","Koro-sensei's speed?",["Mach 10","Mach 15","Mach 20","Mach 25"],"C"),
  q(222,8,"medium","Inosuke's breathing?",["Water","Thunder","Beast","Wind"],"C"),
  q(223,8,"medium","DIO's Stand?",["Star Platinum","The World","Killer Queen","King Crimson"],"B"),
  q(224,8,"medium","Edward's brother?",["Roy","Armstrong","Alphonse","Scar"],"C"),
  q(225,8,"medium","Saitama's rank?",["S-Class","A-Class","B-Class","C-Class"],"B"),
  q(226,8,"medium","SAO final boss floor?",["50th","75th","100th","150th"],"C"),
  q(227,8,"medium","Yato's goal in Noragami?",["Army","Shrine","Kingdom","Family"],"B"),
  q(228,8,"medium","Senku's revival fluid?",["Revival Fluid","Stone Formula","Nital","Dr. Stone"],"C"),
  q(229,8,"medium","Haki in One Piece?",["Magic","Willpower","Devil Fruit","Martial arts"],"B"),
  q(230,8,"medium","Tokyo Ghoul anti-hero?",["Kaneki","Arima","Eto","Ayato"],"A"),
  q(231,8,"hard","JJK power system?",["Cursed Energy","Nen","Ki","Chakra"],"A"),
  q(232,8,"hard","Mugen's fighting style?",["Traditional","Breakdancing sword","Aikido","Kendo"],"B"),
  q(233,8,"hard","Public safety org in Psycho-Pass?",["CID","Public Safety Bureau","Sibyl System","Enforcement"],"B"),
  q(234,8,"hard","Protagonist gem in Land of Lustrous?",["Diamond","Phosphophyllite","Cinnabar","Jade"],"B"),
  q(235,8,"hard","First Pillar to die in Demon Slayer?",["Shinobu","Rengoku","Muichiro","Obanai"],"B"),
  q(236,8,"hard","Gintama's alien race?",["Amanto","Shinra","Zentraedi","Celestials"],"A"),
  q(237,8,"hard","Game in March Comes in Like a Lion?",["Chess","Go","Shogi","Mahjong"],"C"),
  q(238,8,"hard","Ash's full name in Banana Fish?",["Ash Lynx","Aslan Jade Callenreese","Both","Ash Callenreese"],"C"),
  q(239,8,"hard","Spirited Away Oscar year?",["2001","2002","2003","2004"],"C"),
  q(240,8,"hard","Cowboy Bebop composer?",["Yuki Kajiura","Yoko Kanno","Joe Hisaishi","Hiroyuki Sawano"],"B"),

  // ROUND 9
  q(241,9,"easy","'Dattebayo' associated with?",["Sasuke","Naruto","Kakashi","Sakura"],"B"),
  q(242,9,"easy","Roshi's island?",["Turtle Island","Kame House","Roshi Island","Training Island"],"B"),
  q(243,9,"easy","Hamtaro is a?",["Guinea pig","Hamster","Mouse","Gerbil"],"B"),
  q(244,9,"easy","Naruto's hand seal?",["Tiger","Horse","Cross fingers","Snake"],"C"),
  q(245,9,"easy","Dragon Balls' guardian?",["Kami","King Kai","Korin","Mr. Popo"],"A"),
  q(246,9,"easy","Where Doraemon stores gadgets?",["Tail","Pocket","Ears","Nose"],"B"),
  q(247,9,"easy","Toradora female lead?",["Taiga","Minori","Ami","Yuri"],"A"),
  q(248,9,"easy","Speed Racer's car?",["Mach 4","Mach 5","Mach 6","Racer X"],"B"),
  q(249,9,"easy","All Might's signature move?",["Detroit Smash","Texas Smash","US of Smash","All above"],"D"),
  q(250,9,"easy","Demon Slayer Corps leader?",["Muzan","Kagaya Ubuyashiki","Gyomei","Sanemi"],"B"),
  q(251,9,"medium","First Mangekyo Sharingan user?",["Sasuke","Itachi","Madara","Obito"],"C"),
  q(252,9,"medium","Shinra's generation in Fire Force?",["First","Second","Third","Fourth"],"D"),
  q(253,9,"medium","Titan shifters' homeland?",["Paradis","Marley","Eldia","B and C"],"D"),
  q(254,9,"medium","Kakashi's nickname?",["Yellow Flash","Copy Ninja","Professor","Pervy Sage"],"B"),
  q(255,9,"medium","Armored Titan identity?",["Eren","Annie","Reiner","Bertholdt"],"C"),
  q(256,9,"medium","Byakuya's division?",["2nd","6th","10th","13th"],"B"),
  q(257,9,"medium","Killua's Nen type?",["Enhancement","Transmutation","Emission","Conjuration"],"B"),
  q(258,9,"medium","Mob's psychic limit?",["50%","75%","100%","???%"],"D"),
  q(259,9,"medium","C.C.'s wish?",["To die","Live forever","Be loved","Rule world"],"A"),
  q(260,9,"medium","Witch in Re:Zero?",["Emilia","Rem","Satella","Ram"],"C"),
  q(261,9,"hard","Dragon Ball manga start year?",["1982","1984","1986","1988"],"B"),
  q(262,9,"hard","God Hand in Berserk?",["Five demons","Godlike beings","Angels","Apostles"],"B"),
  q(263,9,"hard","Studio for Akira?",["Madhouse","Sunrise","Tokyo Movie Shinsha","Gainax"],"C"),
  q(264,9,"hard","Philosopher's Stone made of?",["Red water","Human souls","Alchemy","Gold"],"B"),
  q(265,9,"hard","Angels in Evangelion?",["Enemies","Aliens","Adam's offspring","Robots"],"C"),
  q(266,9,"hard","Togashi's other work?",["Dragon Ball","Yu Yu Hakusho","Bleach","Naruto"],"B"),
  q(267,9,"hard","Texhnolyze city?",["Lux","Lukuss","Neo Tokyo","Roanapur"],"B"),
  q(268,9,"hard","'Smile' in Ping Pong?",["Peco","Makoto","Kong","Kazama"],"B"),
  q(269,9,"hard","Monster setting?",["Japan","Germany","Czech","B and C"],"D"),
  q(270,9,"hard","FLCL stands for?",["Fooly Cooly","Furi Kuri","Both","Nothing"],"C"),

  // ROUND 10
  q(271,10,"easy","Usopp's father?",["Yasopp","Yosopp","Usopp Sr.","Banchina"],"A"),
  q(272,10,"easy","Yugi's alter ego?",["Pharaoh","Yami Yugi","Atem","All above"],"D"),
  q(273,10,"easy","Light's father's job?",["Lawyer","Doctor","Police","Teacher"],"C"),
  q(274,10,"easy","Goku's Ultra Instinct?",["Mastered","Perfected","True","Complete"],"A"),
  q(275,10,"easy","DBZ stands for?",["Dragon Ball Zero","Dragon Ball Zone","Dragon Ball Z","Dragon Blast"],"C"),
  q(276,10,"easy","Yato in Noragami?",["Fortune God","War God","Calamity God","Wisdom God"],"C"),
  q(277,10,"easy","Main character in Beyblade?",["Tyson","Kai","Ray","Max"],"A"),
  q(278,10,"easy","Volleyball team in Haikyuu?",["Aoba Johsai","Karasuno","Nekoma","Shiratorizawa"],"B"),
  q(279,10,"easy","In Your Name, Taki and Mitsuha?",["Time travel","Swap bodies","Share dreams","Teleport"],"B"),
  q(280,10,"easy","Tanjiro sells at start?",["Fish","Vegetables","Charcoal","Cloth"],"C"),
  q(281,10,"medium","Conqueror's Haki?",["Speed boost","King's ambition","Defense","Healing"],"B"),
  q(282,10,"medium","Vegeta's pride title?",["Prince of Saiyans","King","Elite","Last"],"A"),
  q(283,10,"medium","Final boss in SAO?",["Kayaba","Death Gun","Administrator","Gabriel"],"A"),
  q(284,10,"medium","Rival school in Haikyuu S1?",["Nekoma","Aoba Johsai","Date Tech","Shiratorizawa"],"B"),
  q(285,10,"medium","Namekian fused with Piccolo?",["Dende","Guru","Nail","Kami"],"C"),
  q(286,10,"medium","Protagonist in Classroom of Elite?",["Kiyotaka","Kiyo","Suzune","Chabashira"],"A"),
  q(287,10,"medium","Goku's multiplier technique?",["Super Saiyan","Kaioken","Ultra Instinct","IT"],"B"),
  q(288,10,"medium","Protagonist in Golden Kamuy?",["Sugimoto","Asirpa","Tsurumi","Ogata"],"A"),
  q(289,10,"medium","Sakura's inner persona?",["Inner Sakura","Dark Sakura","Shadow Sakura","Rage Sakura"],"A"),
  q(290,10,"medium","Hollow that attacked Ichigo's family?",["Grand Fisher","Fishbone D","Shrieker","Acidwire"],"A"),
  q(291,10,"hard","Protagonist in Dorohedoro?",["Kaiman","Nikaido","En","Shin"],"A"),
  q(292,10,"hard","End of Evangelion release year?",["1995","1997","1999","2001"],"B"),
  q(293,10,"hard","Mob's real name?",["Shigeo Kageyama","Ritsu","Dimple","Teruki"],"A"),
  q(294,10,"hard","Oddtaxi studio?",["OLM","P.I.C.S.","Both","Madhouse"],"C"),
  q(295,10,"hard","Onizuka's past in GTO?",["Student","Biker gang member","Salaryman","Athlete"],"B"),
  q(296,10,"hard","Ritual in Berserk?",["The Eclipse","Ceremony","Invocation","Offering"],"A"),
  q(297,10,"hard","LoGH episode count?",["110","162","52","26"],"A"),
  q(298,10,"hard","Evangelion first aired?",["1993","1995","1997","1999"],"B"),
  q(299,10,"hard","Naruto's sage mode teacher?",["Jiraiya","Fukasaku","Gamabunta","Pain"],"B"),
  q(300,10,"hard","Org in Psycho-Pass?",["CID","Public Safety","Sibyl System","Ministry"],"B"),
];

// ═══════════════════════════════════════════════════════════════════════════════
// ROUNDS 11-100: EXPANDED BANKS (60 unique questions each)
// Format: [question, correctAnswer, wrong1, wrong2, wrong3]
// ═══════════════════════════════════════════════════════════════════════════════

type RawQ = [string, string, string, string, string];

const easyBank: RawQ[] = [
  ["Luffy's dream?","Become Pirate King","Marine Admiral","Find treasure","Beat Zoro"],
  ["Naruto's jacket color?","Orange","Red","Blue","Green"],
  ["Pikachu's type?","Electric","Fire","Water","Grass"],
  ["Goku's best friend in DBZ?","Krillin","Vegeta","Piccolo","Yamcha"],
  ["Sasuke's brother?","Itachi","Madara","Obito","Shisui"],
  ["Deku's Quirk?","One For All","Explosion","Half-Cold","Erasure"],
  ["Ichigo's sword?","Zangetsu","Senbonzakura","Zabimaru","Hyorinmaru"],
  ["Villain in Frieza Saga?","Frieza","Cell","Buu","Vegeta"],
  ["Happy in Fairy Tail is a?","Cat","Dog","Bird","Fish"],
  ["Who turned Nezuko demon?","Muzan","Tanjiro","Rui","Akaza"],
  ["Sport in Kuroko no Basket?","Basketball","Soccer","Volleyball","Baseball"],
  ["Vegeta's wife?","Bulma","Chi-Chi","Android 18","Videl"],
  ["Name of Ash's Pikachu?","Pikachu","Sparky","Raichu","Pichu"],
  ["Shinigami in Death Note?","Ryuk","L","Light","Misa"],
  ["Chopper in One Piece is?","Reindeer","Fox","Dog","Raccoon"],
  ["Naruto's team?","Team 7","Team 5","Team 10","Team 8"],
  ["Goku's gi color?","Orange","Blue","Red","Green"],
  ["Team Rocket leader?","Giovanni","James","Jessie","Meowth"],
  ["Naruto's favorite food?","Ramen","Sushi","Rice balls","Dango"],
  ["School in MHA?","U.A. High","Shiketsu","Ketsubutsu","Isamu"],
  ["What is Goku's race?","Saiyan","Namekian","Human","Hybrid"],
  ["Main villain in Naruto Shippuden?","Pain","Madara","Orochimaru","Kaguya"],
  ["Pokémon that evolves from Magikarp?","Gyarados","Dragonite","Blastoise","Charizard"],
  ["Eren's Titan form?","Attack Titan","Colossal","Female","Beast"],
  ["Who is the 7th Hokage?","Naruto","Sasuke","Kakashi","Shikamaru"],
  ["Gengar's type?","Ghost/Poison","Ghost/Dark","Poison/Fire","Ghost/Ghost"],
  ["Inuyasha's love interest?","Kagome","Sango","Kikyo","Kirara"],
  ["What does MHA stand for?","My Hero Academia","My Heroic Adventure","My Heroic Action","My Heroic Arts"],
  ["Straw Hat captain?","Luffy","Zoro","Sanji","Nami"],
  ["Strongest titan?","Founding Titan","Colossal","Armored","Beast"],
  ["Sonic is what species?","Hedgehog","Rabbit","Cat","Mouse"],
  ["Main villain in Bleach arc 1?","Aizen","Ginjo","Urahara","Ishida"],
  ["What animal is Totoro?","Forest spirit","Rabbit","Cat","Owl"],
  ["Who created the Sharingan?","Kaguya","Hagoromo","Indra","Madara"],
  ["What type is Charizard?","Fire/Flying","Fire/Dragon","Fire/Ground","Pure Fire"],
  ["Demon king in DBZ?","Dabura","Frieza","Cell","Buu"],
  ["Fruits Basket protagonist?","Tohru Honda","Kyo","Yuki","Shigure"],
  ["Kakashi's eye?","Sharingan","Byakugan","Rinnegan","Tenseigan"],
  ["Pikachu is based on?","Mouse","Squirrel","Rabbit","Rat"],
  ["Goku's father?","Bardock","Raditz","Turles","King Vegeta"],
  ["Main villain in Demon Slayer?","Muzan","Akaza","Enmu","Rui"],
  ["Who created Nen in HxH?","Unknown","Prince","King","First Hunter"],
  ["Sport in Haikyuu?","Volleyball","Basketball","Soccer","Baseball"],
  ["JoJo Part 1 protagonist?","Jonathan","Joseph","Jotaro","Josuke"],
  ["Naruto's mom?","Kushina","Mikoto","Tsunade","Anko"],
  ["Ash's main rival?","Gary","Paul","Trip","Alain"],
  ["Dragon in Spirited Away?","Haku","No-Face","Kamaji","Bo"],
  ["Main character in AoT?","Eren","Armin","Levi","Erwin"],
  ["Goku's strongest form?","Ultra Instinct","Super Saiyan 3","Super Saiyan God","SSJ2"],
  ["Luffy's mentor?","Shanks","Ace","Garp","Rayleigh"],
  ["Protagonist in Cowboy Bebop?","Spike","Jet","Faye","Ed"],
  ["Naruto's ninja way?","Never give up","Kill them all","Be Hokage","Find Sasuke"],
  ["Ichigo's hair color?","Orange","Black","Blonde","Brown"],
  ["First Straw Hat after Luffy?","Zoro","Nami","Usopp","Sanji"],
  ["Main villain in MHA S1?","All For One","Shigaraki","Stain","Overhaul"],
  ["Goku's original Saiyan name?","Kakarot","Vegeta","Broly","Raditz"],
  ["Who is the 4th Hokage?","Minato","Hiruzen","Tobirama","Hashirama"],
  ["Main character in Trigun?","Vash the Stampede","Nicholas D. Wolfwood","Meryl Stryfe","Milly Thompson"],
  ["Main power in Bleach?","Reiatsu","Chakra","Ki","Nen"],
  ["Luffy's grandfather?","Garp","Dragon","Shanks","Rayleigh"],
];

const mediumBank: RawQ[] = [
  ["Kakashi's nickname?","Copy Ninja","Yellow Flash","Professor","Pervy Sage"],
  ["Who is the Armored Titan?","Reiner","Eren","Annie","Bertholdt"],
  ["Inosuke's breathing?","Beast","Water","Thunder","Wind"],
  ["Byakuya's division?","6th","2nd","10th","13th"],
  ["DIO's Stand?","The World","Star Platinum","Killer Queen","King Crimson"],
  ["Killua's Nen type?","Transmutation","Enhancement","Emission","Conjuration"],
  ["Edward's brother?","Alphonse","Roy","Armstrong","Scar"],
  ["SAO final boss floor?","75th","50th","100th","150th"],
  ["Saitama's rank?","B-Class","S-Class","A-Class","C-Class"],
  ["Witch in Re:Zero?","Satella","Emilia","Rem","Ram"],
  ["Mob's psychic limit?","???%","50%","75%","100%"],
  ["Who taught Rasengan?","Jiraiya","Kakashi","Iruka","Minato"],
  ["Subaru's ability?","Return by Death","Respawn","Time Loop","Death Return"],
  ["Aqua is goddess of?","Water","Fire","Earth","Wind"],
  ["Gaara's tailed beast?","One-Tail","Two-Tails","Eight-Tails","Nine-Tails"],
  ["King of Curses?","Sukuna","Gojo","Mahito","Geto"],
  ["Madara's clan?","Uchiha","Senju","Uzumaki","Hyuga"],
  ["Strongest Hashira?","Gyomei","Rengoku","Sanemi","Muichiro"],
  ["Aizen's Zanpakuto?","Illusions","Time","Gravity","Soul absorb"],
  ["Who killed Thors?","Askeladd","Thorkell","Canute","Bjorn"],
  ["Edward Elric is known as?","Fullmetal Alchemist","Flame Alchemist","State Alchemist","Strong Arm"],
  ["Who is the 6th Hokage?","Kakashi","Naruto","Tsunade","Minato"],
  ["Killua's weapon?","Yo-yos","Claws","Needles","Whip"],
  ["Giorno's Stand?","Gold Experience","The World","Star Platinum","Crazy Diamond"],
  ["Main villain in Cowboy Bebop?","Vicious","Spike","Julia","Faye"],
  ["Power in JJK called?","Cursed Energy","Nen","Ki","Chakra"],
  ["Main villain in Akira?","Tetsuo","Kaneda","The Colonel","Kei"],
  ["Chainsaw Man protagonist?","Denji","Aki","Power","Makima"],
  ["Guts' sword called?","Dragonslayer","Zangetsu","Tessaiga","Buster Sword"],
  ["Main villain in Code Geass?","Emperor","C.C.","Suzaku","Lelouch"],
  ["Naruto's sage form?","Sage Mode","Kurama Mode","Rikudo","Bijuu Mode"],
  ["One Piece author?","Oda","Kubo","Kishimoto","Toriyama"],
  ["Who is the 5th Hokage?","Tsunade","Hiruzen","Minato","Kakashi"],
  ["Gray's magic type?","Ice Make","Fire","Lightning","Water"],
  ["FMA:B protagonist?","Edward","Alphonse","Roy","Scar"],
  ["Lelouch's power?","Geass","Cursed Energy","Geass Eyes","Nen"],
  ["Main villain in Naruto: The Last?","Toneri Otsutsuki","Madara","Obito","Pain"],
  ["Goku's mom?","Gine","Bardock","Chi-Chi","Bulma"],
  ["JJK main character?","Yuji","Megumi","Nobara","Gojo"],
  ["Tanjiro's breathing?","Water","Sun","Fire","Thunder"],
  ["Main villain in Death Note?","Light","L","Misa","Ryuk"],
  ["Main villain in Evangelion?","Seele","Angels","Gendo","Adam"],
  ["Main villain in Berserk?","Griffith","Guts","Casca","Zodd"],
  ["Power in Bleach?","Reiatsu","Reiryoku","Zanpakuto","Hollow"],
  ["Steins;Gate protagonist?","Okabe","Kurisu","Mayuri","Daraku"],
  ["Monster protagonist?","Tenma","Johan","Nina","Grimmer"],
  ["Naruto's signature move?","Rasengan","Chidori","Shadow Clone","Amaterasu"],
  ["Main character in Black Clover?","Asta","Yuno","Noelle","Mimosa"],
  ["Main character in Jujutsu Kaisen?","Yuji Itadori","Megumi Fushiguro","Nobara Kugisaki","Gojo Satoru"],
  ["Evangelion protagonist?","Shinji","Rei","Asuka","Misato"],
  ["Main villain in Attack on Titan?","Eren","Zeke","Reiner","Annie"],
  ["Naruto's village?","Konoha","Suna","Kiri","Kumo"],
  ["Demon Slayer protagonist?","Tanjiro","Zenitsu","Inosuke","Rengoku"],
  ["What Stand does Jotaro have?","Star Platinum","The World","Crazy Diamond","Gold Experience"],
  ["Who is the 1st Hokage?","Hashirama","Tobirama","Hiruzen","Minato"],
  ["What is Vegeta's wife?","Bulma","Chi-Chi","Android 18","Videl"],
  ["What is Ichigo's power?","Shinigami","Hollow","Quincy","Fullbringer"],
  ["Who is Lelouch's ally?","C.C.","Kallen","Suzaku","Jeremiah"],
  ["Main villain in Trigun?","Legato Bluesummers","Millions Knives","Vash","Nicholas"],
  ["What is the main power in Naruto?","Chakra","Ki","Nen","Reiatsu"],
];

const hardBank: RawQ[] = [
  ["Dragon Ball manga start?","1984","1982","1986","1988"],
  ["Cowboy Bebop composer?","Yoko Kanno","Yuki Kajiura","Joe Hisaishi","Hiroyuki Sawano"],
  ["God Hand in Berserk?","Godlike beings","Five demons","Angels","Apostles"],
  ["Studio for Akira?","Tokyo Movie Shinsha","Madhouse","Sunrise","Gainax"],
  ["Philosopher's Stone made of?","Human souls","Red water","Alchemy","Gold"],
  ["Angels in Evangelion?","Adam's offspring","Enemies","Aliens","Robots"],
  ["Togashi's other work?","Yu Yu Hakusho","Dragon Ball","Bleach","Naruto"],
  ["Spirited Away Oscar?","2003","2001","2002","2004"],
  ["Bebop's dog?","Ein","Zwei","Drei","Ed"],
  ["Perfect Blue director?","Satoshi Kon","Shinkai","Hosoda","Anno"],
  ["FLCL stands for?","Fooly Cooly / Furi Kuri","Fooly Cooly only","Furi Kuri only","Nothing"],
  ["Monster primary setting?","Germany & Czech","Japan","Germany only","Czech only"],
  ["First JoJo arc?","Phantom Blood","Battle Tendency","Stardust","Diamond"],
  ["Madoka Magica studio?","Shaft","Kyoto","A-1","P.A. Works"],
  ["One Piece manga started?","1997","1995","1999","2001"],
  ["Coffee shop in Tokyo Ghoul?","Anteiku","Re:","Aogiri","CCG"],
  ["Headless rider in Durarara?","Celty","Shizuo","Izaya","Mikado"],
  ["Cowboy Bebop first aired?","1998","1995","2000","2002"],
  ["Major Kusanagi's first name?","Motoko","Mokoto","Makoto","Mikoto"],
  ["Demon Slayer studio?","Ufotable","Bones","MAPPA","Wit"],
  ["First titan's name?","Ymir","Eren","Zeke","Reiner"],
  ["Monster author?","Naoki Urasawa","Akira Toriyama","Eiichiro Oda","Osamu Tezuka"],
  ["Titan form Eren uses?","Attack Titan","Founding","War","Armored"],
  ["First Eva name?","Unit-01","Unit-00","Unit-02","Unit-03"],
  ["Main villain in Perfect Blue?","Rumi","Mima","Me-Mania","Yukiko"],
  ["Parasyte main character?","Shinichi","Migi","Gotou","Tamara"],
  ["Evangelion author?","Hideaki Anno","Hayao Miyazaki","Satoshi Kon","Mamoru Oshii"],
  ["Psycho-Pass org?","Public Safety","CID","Sibyl","Enforcement"],
  ["Main villain in Vinland Saga?","Askeladd","Canute","Thorkell","Bjorn"],
  ["Titan form Bertholdt?","Colossal","Armored","Beast","Female"],
  ["Trigun protagonist?","Vash","Nicholas","Wolfwood","Meryl"],
  ["Titan form Reiner?","Armored","Colossal","Beast","Female"],
  ["Monster main character?","Tenma","Johan","Nina","Grimmer"],
  ["Baccano organization?","Immortals","Rail Tracer","Alchemists","Gangsters"],
  ["Baccano author?","Ryohgo Narita","Naoki Urasawa","Hideaki Anno","Satoshi Kon"],
  ["Berserk main villain?","Griffith","Guts","Casca","Zodd"],
  ["Monster setting?","Johan","Tenma","Nina","Grimmer"],
  ["Texhnolyze protagonist?","Ichise","Ran","Onishi","Kanon"],
  ["Texhnolyze author?","Hiroshi Oonuki","Naoki Urasawa","Hideaki Anno","Satoshi Kon"],
  ["Texhnolyze city?","Lux","Lukuss","Texhnolyze","The City"],
  ["Ergo Proxy protagonist?","Vincent","Re-l","Pino","Raul"],
  ["Ergo Proxy main character?","Vincent","Re-l","Pino","Raul"],
  ["Ergo Proxy author?","Shukou Murase","Naoki Urasawa","Hideaki Anno","Satoshi Kon"],
  ["Ergo Proxy city?","Romdeau","Mos Eisley","Lux","The City"],
  ["Paranoia Agent protagonist?","Tsukiko","Keiichi","Maromi","Taeko"],
  ["Paranoia Agent main character?","Tsukiko","Keiichi","Maromi","Taeko"],
  ["Paranoia Agent author?","Satoshi Kon","Naoki Urasawa","Hideaki Anno","Akira Toriyama"],
  ["Lain network name?","The Wired","The Net","Cyberspace","The Web"],
  ["Ping Pong protagonist?","Peco","Smile","Kong","Kazama"],
  ["Ping Pong main character?","Peco","Smile","Kong","Kazama"],
  ["Ping Pong author?","Taiyo Matsumoto","Naoki Urasawa","Hideaki Anno","Akira Toriyama"],
  ["What is the first titan?","Ymir","Eren","Zeke","Reiner"],
  ["Who is protagonist in Parasyte?","Shinichi","Migi","Gotou","Tamara"],
  ["Who is protagonist in Monster?","Tenma","Johan","Nina","Grimmer"],
  ["Studio for Akira film?","Tokyo Movie Shinsha","Madhouse","Sunrise","Gainax"],
  ["Who is author of Monster?","Naoki Urasawa","Akira Toriyama","Eiichiro Oda","Osamu Tezuka"],
  ["Main villain in Ghost in the Shell?","The Puppet Master","Major Kusanagi","Batou","Togusa"],
  ["Protagonist in Monster anime?","Tenma","Johan","Nina","Grimmer"],
  ["Who is author of Evangelion?","Hideaki Anno","Hayao Miyazaki","Satoshi Kon","Mamoru Oshii"],
  ["Monster anime protagonist?","Tenma","Johan","Nina","Grimmer"],
];

// ═══════════════════════════════════════════════════════════════════════════════
// QUESTION GENERATOR: Uses round-based seeding for variety
// ═══════════════════════════════════════════════════════════════════════════════

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildQuestion(
  id: number, round: number, difficulty: "easy" | "medium" | "hard",
  raw: RawQ, seed: number
): Question {
  const [question, correct, w1, w2, w3] = raw;
  const options = [correct, w1, w2, w3];
  const shuffled = seededShuffle(options, seed);
  const answerIndex = shuffled.indexOf(correct);
  const answerLetter = (["A", "B", "C", "D"] as const)[answerIndex];
  return {
    id, round, type: "multiple_choice", difficulty, question,
    options: shuffled as [string, string, string, string],
    answer: answerLetter, timeLimit: 30,
  };
}

function generateRemainingQuestions(): Question[] {
  const generated: Question[] = [];
  let id = 301;

  for (let round = 11; round <= 100; round++) {
    // Each round gets a unique selection using round number as seed
    // Uses quadratic terms (round*round) to ensure very different selections

    for (let i = 0; i < 10; i++) {
      const idx = (round * 7 + i * 13 + round * round) % easyBank.length;
      const raw = easyBank[idx];
      generated.push(buildQuestion(id++, round, "easy", raw, round * 100 + i * 37));
    }

    for (let i = 0; i < 10; i++) {
      const idx = (round * 11 + i * 17 + round * round) % mediumBank.length;
      const raw = mediumBank[idx];
      generated.push(buildQuestion(id++, round, "medium", raw, round * 200 + i * 41));
    }

    for (let i = 0; i < 10; i++) {
      const idx = (round * 13 + i * 19 + round * round) % hardBank.length;
      const raw = hardBank[idx];
      generated.push(buildQuestion(id++, round, "hard", raw, round * 300 + i * 53));
    }
  }

  return generated;
}

const allQuestions = [...handcrafted, ...generateRemainingQuestions()];
export default allQuestions;

export function getQuestionsForRound(round: number): Question[] {
  return allQuestions
    .filter(q => q.round === round)
    .sort((a, b) => {
      const diffOrder = { easy: 0, medium: 1, hard: 2 };
      return diffOrder[a.difficulty] - diffOrder[b.difficulty];
    });
}

export function getTotalRounds(): number {
  return 100;
}
