export interface CharacterData {
  name: string;
  anime: string;
  role: "protagonist" | "deuteragonist" | "antagonist" | "mentor" | "supporting" | "villain";
  abilities: string[];
  weapons: string[];
  techniques: string[];
  affiliations: string[];
  family: string[];
  hairColor?: string;
  eyeColor?: string;
}

export interface AnimeData {
  id: string;
  title: string;
  genres: string[];
  creator: string;
  studio: string;
  yearStarted: number;
  protagonist: string;
  powerSystem?: string;
  characters: CharacterData[];
  arcs: string[];
  locations: string[];
  organizations: string[];
  episodes?: number;
}

export interface AnimeEntry {
  id: string;
  title: string;
  genres: string[];
  creator: string;
  studio: string;
  yearStarted: number;
  protagonist: string;
  powerSystem?: string;
  characters: string[];
  villains: string[];
  abilities: string[];
  weapons: string[];
  techniques: string[];
  locations: string[];
  organizations: string[];
  arcs: string[];
  families: string[][];
  hairColors: string[];
  eyeColors: string[];
  openings: string[];
}

export function buildAnimeLibrary(): Map<string, AnimeEntry> {
  const lib = new Map<string, AnimeEntry>();

  function add(entry: AnimeEntry) {
    lib.set(entry.id, entry);
  }

  add({
    id: "naruto", title: "Naruto", genres: ["shonen", "ninja", "action", "adventure"],
    creator: "Masashi Kishimoto", studio: "Studio Pierrot", yearStarted: 2002,
    protagonist: "Naruto Uzumaki", powerSystem: "Chakra",
    characters: ["Naruto Uzumaki", "Sasuke Uchiha", "Sakura Haruno", "Kakashi Hatake", "Itachi Uchiha", "Jiraiya", "Orochimaru", "Tsunade", "Hinata Hyuga", "Gaara", "Rock Lee", "Neji Hyuga", "Shikamaru Nara", "Kiba Inuzuka", "Choji Akimichi", "Ino Yamanaka", "Tenten", "Might Guy", "Shino Aburame", "Killer Bee", "Minato Namikaze", "Hashirama Senju", "Madara Uchiha", "Obito Uchiha", "Pain", "Konan", "Zabuza Momochi", "Haku", "Deidara", "Sasori", "Kakuzu", "Hidan", "Kisame Hoshigaki"],
    villains: ["Madara Uchiha", "Obito Uchiha", "Pain", "Orochimaru", "Kaguya Otsutsuki", "Itachi Uchiha", "Zabuza", "Sasori", "Deidara", "Kakuzu", "Hidan", "Kisame", "Danzo Shimura", "Kabuto Yakushi"],
    abilities: ["Shadow Clone Jutsu", "Rasengan", "Chidori", "Sharingan", "Byakugan", "Rinnegan", "Sage Mode", "Susanoo", "Amaterasu", "Tsukuyomi", "Fire Ball Jutsu", "Summoning Jutsu", "Edo Tensei"],
    weapons: ["Kunai", "Shuriken", "Kusanagi Sword", "Samehada", "Kubikiribocho", "Asa Kujaku"],
    techniques: ["Shadow Clone Jutsu", "Rasengan", "Rasenshuriken", "Chidori", "Fire Ball Jutsu", "Amaterasu", "Susanoo", "Shinra Tensei", "Chibaku Tensei", "Edo Tensei", "Kage Bunshin", "Sexy Jutsu"],
    locations: ["Konohagakure", "Sunagakure", "Amegakure", "Valley of the End", "Mount Myoboku", "Akatsuki Hideout"],
    organizations: ["Akatsuki", "Team 7", "ANBU", "Root", "Konoha 11", "Shinobi Alliance", "Tailed Beasts"],
    arcs: ["Chunin Exams", "Sasuke Retrieval", "Pain Invasion", "Fourth Great Ninja War", "Land of Waves"],
    families: [["Naruto Uzumaki", "Minato Namikaze", "Kushina Uzumaki"], ["Sasuke Uchiha", "Itachi Uchiha", "Fugaku Uchiha"], ["Hinata Hyuga", "Neji Hyuga"], ["Gaara", "Temari", "Kankuro"]],
    hairColors: ["Blonde", "Black", "Pink", "Silver", "White", "Red", "Dark Blue", "Brown"],
    eyeColors: ["Blue", "Black", "Green", "Red", "Purple", "White"],
    openings: ["Haruka Kanata", "GO!!!", "Blue Bird", "Diver", "Silhouette"]
  });

  add({
    id: "onepiece", title: "One Piece", genres: ["shonen", "pirate", "action", "adventure"],
    creator: "Eiichiro Oda", studio: "Toei Animation", yearStarted: 1999,
    protagonist: "Monkey D. Luffy", powerSystem: "Haki & Devil Fruits",
    characters: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Sanji", "Tony Tony Chopper", "Nico Robin", "Franky", "Brook", "Jinbe", "Usopp", "Portgas D. Ace", "Sabo", "Monkey D. Garp", "Shanks", "Edward Newgate", "Marshall D. Teach", "Kaido", "Big Mom", "Donquixote Doflamingo", "Crocodile", "Rob Lucci", "Trafalgar Law", "Eustass Kid", "Boa Hancock", "Kuzan", "Borsalino", "Sakazuki", "Yasopp", "Gol D. Roger", "Silvers Rayleigh"],
    villains: ["Marshall D. Teach", "Kaido", "Big Mom", "Donquixote Doflamingo", "Crocodile", "Rob Lucci", "Sakazuki", "Kuro", "Arlong", "Enel", "Sakazuki"],
    abilities: ["Gomu Gomu no Mi", "Haki", "Gear 5", "Three Sword Style", "Clima-Tact", "Hana Hana no Mi", "Ope Ope no Mi", "Mera Mera no Mi", "Yami Yami no Mi", "Gura Gura no Mi"],
    weapons: ["Swords", "Clima-Tact", "Kabuto", "Franky Shogun", "Soul Solid", "Enma", "Wado Ichimonji"],
    techniques: ["Gomu Gomu no Pistol", "Gear 4: Boundman", "Onigiri", "Diable Jambe", "Thunderbolt", "Clutch", "Gigantesco Mano", "Franky Radical Beam"],
    locations: ["Reverse Mountain", "Alabasta", "Skypiea", "Water 7", "Enies Lobby", "Thriller Bark", "Sabaody Archipelago", "Amazon Lily", "Impel Down", "Marineford", "Fish-Man Island", "Punk Hazard", "Dressrosa", "Zou", "Whole Cake Island", "Wano Kuni", "Egghead"],
    organizations: ["Straw Hat Pirates", "Marines", "Warlords", "Yonko", "Revolutionary Army", "CP0", "Whitebeard Pirates", "Red Hair Pirates", "Beast Pirates", "Big Mom Pirates", "Roger Pirates"],
    arcs: ["East Blue", "Alabasta", "Skypiea", "Enies Lobby", "Marineford", "Fish-Man Island", "Dressrosa", "Whole Cake Island", "Wano", "Egghead"],
    families: [["Monkey D. Luffy", "Monkey D. Garp", "Monkey D. Dragon"], ["Portgas D. Ace", "Gol D. Roger"], ["Sanji", "Vinsmoke Judge"], ["Usopp", "Yasopp"]],
    hairColors: ["Black", "Green", "Orange", "Blonde", "Blue", "Pink", "Red", "Brown"],
    eyeColors: ["Black", "Blue", "Brown", "Green", "Red"],
    openings: ["We Are!", "Hikari E", "Bon Voyage!", "Kokoro no Chizu", "Brand New World", "One Day", "Hope"]
  });

  add({
    id: "dragonball", title: "Dragon Ball", genres: ["shonen", "martial arts", "action", "sci-fi"],
    creator: "Akira Toriyama", studio: "Toei Animation", yearStarted: 1986,
    protagonist: "Goku", powerSystem: "Ki",
    characters: ["Goku", "Vegeta", "Gohan", "Piccolo", "Krillin", "Frieza", "Cell", "Majin Buu", "Trunks", "Goten", "Beerus", "Whis", "Broly", "Tien", "Yamcha", "Chiaotzu", "Android 17", "Android 18", "Master Roshi", "Bulma", "Chi-Chi", "Videl", "Pan", "King Kai", "Kami", "Dende", "Nappa", "Raditz", "Jiren", "Hit", "Goku Black", "Zamasu", "Toppo", "Dyspo"],
    villains: ["Frieza", "Cell", "Majin Buu", "Beerus (initially)", "Zamasu", "Goku Black", "Jiren (rival)", "Broly (initially)", "Nappa", "Raditz", "King Piccolo", "Hit (initially)"],
    abilities: ["Kamehameha", "Super Saiyan", "Ultra Instinct", "Spirit Bomb", "Instant Transmission", "Galick Gun", "Final Flash", "Special Beam Cannon", "Destructo Disc"],
    weapons: ["Power Pole", "Senzu Beans", "Potara Earrings", "Fusion Dance"],
    techniques: ["Kamehameha", "Spirit Bomb", "Instant Transmission", "Super Saiyan Transformation", "Fusion", "Galick Gun", "Final Flash", "Solar Flare", "Destructo Disc", "Special Beam Cannon"],
    locations: ["Earth", "Namek", "Planet Vegeta", "Supreme Kai Planet", "Other World", "Hyperbolic Time Chamber", "Tournament of Power Arena", "Beerus' Planet"],
    organizations: ["Z Fighters", "Frieza Force", "Red Ribbon Army", "Galactic Patrol", "Pride Troopers"],
    arcs: ["Saiyan Saga", "Frieza Saga", "Cell Saga", "Majin Buu Saga", "Battle of Gods", "Universe 6 Saga", "Future Trunks Saga", "Tournament of Power", "Granolah the Survivor"],
    families: [["Goku", "Gohan", "Goten", "Chi-Chi"], ["Vegeta", "Trunks", "Bra", "Bulma"], ["Gohan", "Videl", "Pan"], ["Frieza", "King Cold", "Cooler"]],
    hairColors: ["Black", "Yellow", "Red", "Blue", "White", "Purple"],
    eyeColors: ["Black", "Red", "Blue", "Green", "Gold"],
    openings: ["Cha La Head Cha La", "We Gotta Power", "Dan Dan Kokoro", "Dragon Soul", "Chozetsu Dynamic"]
  });

  add({
    id: "aot", title: "Attack on Titan", genres: ["shonen", "dark fantasy", "action", "horror"],
    creator: "Hajime Isayama", studio: "Wit Studio / MAPPA", yearStarted: 2013,
    protagonist: "Eren Yeager", powerSystem: "Titan Powers",
    characters: ["Eren Yeager", "Mikasa Ackerman", "Armin Arlert", "Levi Ackerman", "Erwin Smith", "Hange Zoe", "Reiner Braun", "Bertholdt Hoover", "Annie Leonhart", "Zeke Yeager", "Historia Reiss", "Jean Kirstein", "Connie Springer", "Sasha Blouse", "Ymir", "Marco Bodt", "Grisha Yeager", "Rod Reiss", "Kenny Ackerman", "Floch Forster", "Pieck Finger", "Porco Galliard", "Gabi Braun", "Falco Grice"],
    villains: ["Zeke Yeager", "Reiner Braun", "Bertholdt Hoover", "Annie Leonhart", "Rod Reiss", "Kenny Ackerman", "Floch Forster", "Eren Yeager (later)"],
    abilities: ["Attack Titan", "Founding Titan", "Armored Titan", "Colossal Titan", "Female Titan", "Beast Titan", "Jaw Titan", "Cart Titan", "War Hammer Titan", "ODM Gear"],
    weapons: ["ODM Gear", "Thunder Spears", "Blades", "Swords", "Guns"],
    techniques: ["Titan Transformation", "Hardening", "Crystalization", "Coordinate", "Scream", "ODM Maneuver", "Thunder Spear Attack"],
    locations: ["Wall Maria", "Wall Rose", "Wall Sina", "Trost District", "Shiganshina District", "Marley", "Liberio", "Paradis Island", "Underground City"],
    organizations: ["Survey Corps", "Military Police", "Garrison", "Warrior Unit", "Anti-Marleyan Volunteers", "Yeagerists"],
    arcs: ["Battle of Trost", "Female Titan Arc", "Clash of the Titans", "Uprising", "Return to Shiganshina", "Marley Arc", "War for Paradis", "The Final Chapters"],
    families: [["Eren Yeager", "Mikasa Ackerman", "Grisha Yeager", "Carla Yeager", "Zeke Yeager"], ["Levi Ackerman", "Kenny Ackerman"], ["Historia Reiss", "Rod Reiss"], ["Reiner Braun", "Mr. Braun"]],
    hairColors: ["Black", "Blonde", "Brown", "Black", "Blonde", "Red"],
    eyeColors: ["Green", "Black", "Blue", "Gray", "Brown"],
    openings: ["Guren no Yumiya", "Jiyuu no Tsubasa", "Shinzou wo Sasageyo", "Red Swan", "My War", "The Rumbling"]
  });

  add({
    id: "jjk", title: "Jujutsu Kaisen", genres: ["shonen", "dark fantasy", "action", "supernatural"],
    creator: "Gege Akutami", studio: "MAPPA", yearStarted: 2020,
    protagonist: "Yuji Itadori", powerSystem: "Cursed Energy",
    characters: ["Yuji Itadori", "Megumi Fushiguro", "Nobara Kugisaki", "Satoru Gojo", "Ryomen Sukuna", "Kento Nanami", "Maki Zenin", "Toge Inumaki", "Panda", "Yuta Okkotsu", "Suguru Geto", "Toji Fushiguro", "Mahito", "Jogo", "Hanami", "Dagon", "Choso", "Mei Mei", "Aoi Todo", "Masamichi Yaga", "Naobito Zenin", "Noritoshi Kamo", "Kasumi Miwa", "Mai Zenin", "Kiyotaka Ijichi"],
    villains: ["Ryomen Sukuna", "Suguru Geto", "Mahito", "Jogo", "Hanami", "Dagon", "Pseudo-Geto", "Kenjaku"],
    abilities: ["Limitless", "Six Eyes", "Ten Shadows Technique", "Resonance", "Cursed Speech", "Boogie Woogie", "Idle Transfiguration", "Disaster Flames"],
    weapons: ["Inverted Spear of Heaven", "Split Soul Katana", "Playful Cloud", "Dragon Bone", "Hammer and Nails"],
    techniques: ["Limitless: Blue", "Limitless: Red", "Hollow Purple", "Domain Expansion: Unlimited Void", "Malevolent Shrine", "Chimera Shadow Garden", "Black Flash", "Dismantle", "Cleave"],
    locations: ["Tokyo Jujutsu High", "Shibuya", "Kyoto Jujutsu High", "Zenin Estate", "Kogane Colony"],
    organizations: ["Jujutsu High", "Zenin Clan", "Gojo Clan", "Kamo Clan", "Paranormal Liberation Front"],
    arcs: ["Hidden Inventory", "Fearsome Womb", "Shibuya Incident", "Culling Games", "Shinjuku Showdown"],
    families: [["Megumi Fushiguro", "Toji Fushiguro", "Tsumiki Fushiguro"], ["Maki Zenin", "Mai Zenin", "Naobito Zenin"], ["Yuta Okkotsu", "Rika Orimoto"], ["Satoru Gojo", "Gojo Clan"]],
    hairColors: ["Pink", "Black", "Orange", "White", "Blonde", "Purple", "Black"],
    eyeColors: ["Brown", "Green", "Brown", "Blue", "Red", "Brown", "Green"],
    openings: ["Kaikai Kitan", "Vivid Vice", "Ao no Sumika", "Where Our Blue Is"]
  });

  add({
    id: "demonslayer", title: "Demon Slayer", genres: ["shonen", "dark fantasy", "action", "historical"],
    creator: "Koyoharu Gotouge", studio: "Ufotable", yearStarted: 2019,
    protagonist: "Tanjiro Kamado", powerSystem: "Breathing Techniques",
    characters: ["Tanjiro Kamado", "Nezuko Kamado", "Zenitsu Agatsuma", "Inosuke Hashibira", "Giyu Tomioka", "Kyojuro Rengoku", "Shinobu Kocho", "Mitsuri Kanroji", "Obanai Iguro", "Sanemi Shinazugawa", "Gyomei Himejima", "Muichiro Tokito", "Muzan Kibutsuji", "Kagaya Ubuyashiki", "Kanao Tsuyuri", "Genya Shinazugawa", "Tengen Uzui", "Tamayo", "Yushiro", "Kokushibo", "Akaza", "Doma", "Hantengu", "Gyokko", "Rui", "Hand Demon", "Sakonji Urokodaki", "Jigoro Kuwajima"],
    villains: ["Muzan Kibutsuji", "Kokushibo", "Akaza", "Doma", "Hantengu", "Gyokko", "Rui"],
    abilities: ["Water Breathing", "Sun Breathing", "Thunder Breathing", "Beast Breathing", "Flame Breathing", "Insect Breathing", "Love Breathing", "Wind Breathing", "Stone Breathing", "Mist Breathing", "Sound Breathing"],
    weapons: ["Nichirin Swords", "Poison Needles", "Whip Blade", "Kusarigama"],
    techniques: ["Hinokami Kagura", "Water Breathing 10th Form: Constant Flux", "Thunder Breathing 1st Form: Thunderclap and Flash", "Flame Breathing 9th Form: Rengoku", "Dead Calm", "Insect Breathing: Dance of the Bee"],
    locations: ["Mount Sagiri", "Asakusa", "Mugen Train", "Entertainment District", "Swordsmith Village", "Infinity Castle"],
    organizations: ["Demon Slayer Corps", "Upper Moons", "Lower Moons", "Hashira", "Butterfly Mansion"],
    arcs: ["Final Selection", "Mugen Train", "Entertainment District", "Swordsmith Village", "Hashira Training", "Infinity Castle"],
    families: [["Tanjiro Kamado", "Nezuko Kamado"], ["Muzan Kibutsuji", "Tamayo"], ["Shinobu Kocho", "Kanao Tsuyuri"]],
    hairColors: ["Red", "Black", "Blonde", "Purple", "Pink", "White"],
    eyeColors: ["Red", "Pink", "Yellow", "Blue", "Purple", "Gold"],
    openings: ["Gurenge", "Homura", "Akeboshi", "Kizuna no Kiseki"]
  });

  add({
    id: "hxh", title: "Hunter x Hunter", genres: ["shonen", "adventure", "action", "fantasy"],
    creator: "Yoshihiro Togashi", studio: "Madhouse", yearStarted: 2011,
    protagonist: "Gon Freecss", powerSystem: "Nen",
    characters: ["Gon Freecss", "Killua Zoldyck", "Kurapika", "Leorio Paradinight", "Hisoka Morow", "Chrollo Lucilfer", "Meruem", "Netero", "Ging Freecss", "Silva Zoldyck", "Illumi Zoldyck", "Kite", "Biscuit Krueger", "Shalnark", "Feitan", "Nobunaga", "Phinks", "Uvogin", "Pitou", "Pouf", "Youpi", "Komugi", "Wing", "Zushi", "Knuckle", "Shoot", "Morel", "Knov", "Ikalgo", "Meleoron"],
    villains: ["Hisoka Morow", "Chrollo Lucilfer", "Meruem", "Pitou", "Illumi Zoldyck"],
    abilities: ["Nen", "Jajanken", "Godspeed", "Emperor Time", "Bungee Gum", "Bandit's Secret", "Pain Packer"],
    weapons: ["Fishing Rod", "Yo-Yo", "Playing Cards", "Chains", "Umbrella Sword"],
    techniques: ["Jajanken: Rock", "Godspeed", "Emperor Time", "Chain Jail", "Bungee Gum", "Texture Surprise", "Bandit's Secret: Skill Hunter", "Pain Packer: Rising Sun"],
    locations: ["Whale Island", "Hunter Exam Site", "Heavens Arena", "Yorknew City", "Greed Island", "NGL", "East Gorteau", "Meteor City", "Dark Continent"],
    organizations: ["Hunter Association", "Phantom Troupe", "Zoldyck Family", "Chimera Ants", "Kakin Empire"],
    arcs: ["Hunter Exam", "Zoldyck Family", "Heavens Arena", "Yorknew City", "Greed Island", "Chimera Ant", "13th Chairman Election", "Dark Continent Expedition"],
    families: [["Gon Freecss", "Ging Freecss"], ["Killua", "Alluka", "Illumi", "Milluki", "Silva", "Kikyo Zoldyck"], ["Kurapika", "Kurta Clan"]],
    hairColors: ["Black", "Silver", "Blonde", "Red", "Green", "Pink"],
    eyeColors: ["Black", "Blue", "Grey", "Yellow", "Black"],
    openings: ["Departure", "Departure (version 2)"]
  });

  add({
    id: "bleach", title: "Bleach", genres: ["shonen", "supernatural", "action"],
    creator: "Tite Kubo", studio: "Studio Pierrot", yearStarted: 2004,
    protagonist: "Ichigo Kurosaki", powerSystem: "Reiatsu",
    characters: ["Ichigo Kurosaki", "Rukia Kuchiki", "Renji Abarai", "Byakuya Kuchiki", "Sosuke Aizen", "Toshiro Hitsugaya", "Kenpachi Zaraki", "Uryu Ishida", "Orihime Inoue", "Yasutora Sado", "Kisuke Urahara", "Yoruichi Shihoin", "Grimmjow Jaegerjaquez", "Ulquiorra Cifer", "Yhwach", "Jugram Haschwalth", "Shunsui Kyoraku", "Jushiro Ukitake", "Mayuri Kurotsuchi", "Retsu Unohana", "Soi Fon", "Gin Ichimaru", "Kaname Tosen", "Nelliel Tu Oderschvank", "Yamamoto Genryusai", "Zangetsu"],
    villains: ["Sosuke Aizen", "Yhwach", "Grimmjow Jaegerjaquez", "Ulquiorra Cifer", "Gin Ichimaru", "Kaname Tosen", "Soken Ishida"],
    abilities: ["Zanpakuto", "Bankai", "Kido", "Shunpo", "Cero", "Quincy Arrows", "Fullbring"],
    weapons: ["Zangetsu", "Senbonzakura", "Hyorinmaru", "Nozarashi", "Sode no Shirayuki", "Zabimaru"],
    techniques: ["Getsuga Tensho", "Bankai: Tensa Zangetsu", "Mugetsu", "Senior Bonbon Kageyoshi", "Daiguren Hyorinmaru", "Kurohitsugi", "Hado 99", "Rukia's Bankai: Hakka no Togame"],
    locations: ["Karakura Town", "Soul Society", "Seireitei", "Hueco Mundo", "Las Noches", "Royal Palace", "Wandenreich", "Rukongai"],
    organizations: ["Gotei 13", "Espada", "Wandenreich", "Quincy", "Xcution"],
    arcs: ["Substitute Shinigami", "Soul Society: The Rescue", "Arrancar: The Arrival", "Hueco Mundo", "Fake Karakura Town", "Lost Substitute Shinigami", "Thousand Year Blood War"],
    families: [["Ichigo Kurosaki", "Isshin Kurosaki", "Masaki Kurosaki"], ["Rukia Kuchiki", "Byakuya Kuchiki"], ["Uryu Ishida", "Ryuken Ishida"]],
    hairColors: ["Orange", "Black", "Red", "White", "Silver", "Brown", "Blue"],
    eyeColors: ["Brown", "Purple", "Black", "Grey", "Blue", "Turquoise"],
    openings: ["Asterisk", "D-tecnolife", "Ichirin no Hana", "Tonight Tonight", "Ranbu no Melody", "Blue"]
  });

  add({
    id: "mha", title: "My Hero Academia", genres: ["shonen", "superhero", "action", "academy"],
    creator: "Kohei Horikoshi", studio: "Bones", yearStarted: 2016,
    protagonist: "Izuku Midoriya", powerSystem: "Quirks",
    characters: ["Izuku Midoriya", "Katsuki Bakugo", "Shoto Todoroki", "All Might", "Ochaco Uraraka", "Tenya Iida", "Tomura Shigaraki", "All For One", "Endeavor", "Hawks", "Eijiro Kirishima", "Momo Yaoyorozu", "Fumikage Tokoyami", "Tsuyu Asui", "Mina Ashido", "Denki Kaminari", "Kyoka Jiro", "Hanta Sero", "Mezo Shoji", "Koji Koda", "Toru Hagakure", "Yuga Aoyama", "Mashirao Ojiro", "Mirio Togata", "Tamaki Amajiki", "Nejire Hado", "Shota Aizawa", "Present Mic", "Gran Torino", "Stain", "Overhaul", "Gentle Criminal"],
    villains: ["Tomura Shigaraki", "All For One", "Stain", "Overhaul", "Dabi", "Gentle Criminal", "Muscular", "Moonfish"],
    abilities: ["One For All", "Explosion", "Half-Cold Half-Hot", "Hellflame", "Fierce Wings", "Decay", "Hardening", "Creation", "Dark Shadow", "Engine"],
    weapons: ["Gauntlets", "Iron Soles", "Grenadier Bracers", "Capture Weapon"],
    techniques: ["Delaware Smash", "Detroit Smash", "United States of Smash", "AP Shot", "Flashfire Fist", "Prominence Burn", "Phosphor", "Recipro Burst"],
    locations: ["U.A. High School", "Musutafu", "USJ", "Hosu City", "Kamino Ward", "Forest Camp", "Nabu Island", "Jaku City"],
    organizations: ["Class 1-A", "League of Villains", "PLF", "Hero Commission", "Shie Hassaikai"],
    arcs: ["Entrance Exam", "USJ Incident", "Sports Festival", "Stain Arc", "Hideout Raid", "School Festival", "Provisional License", "Internship Arc", "Meta Liberation War", "War Arc"],
    families: [["All Might", "Izuku Midoriya", "Nana Shimura"], ["Endeavor", "Shoto Todoroki", "Fuyumi Todoroki"], ["Tomura Shigaraki", "All For One"]],
    hairColors: ["Green", "Blonde", "White/Red", "Brown", "Blue", "Red"],
    eyeColors: ["Green", "Red", "Gray", "Blue", "Brown", "Yellow"],
    openings: ["The Day", "Peace Sign", "Sora ni Utaeba", "Odd Future", "Star Marker", "No. 1"]
  });

  add({
    id: "blackclover", title: "Black Clover", genres: ["shonen", "fantasy", "magic", "action"],
    creator: "Yuki Tabata", studio: "Studio Pierrot", yearStarted: 2017,
    protagonist: "Asta", powerSystem: "Magic / Anti-Magic",
    characters: ["Asta", "Yuno", "Yami Sukehiro", "Noelle Silva", "Julius Novachrono", "Mereoleona Vermillion", "Fuegoleon Vermillion", "Luck Voltia", "Vanessa Enoteca", "Finral Roulacase", "Charmy Pappitson", "Gauche Adlai", "Gordon Agrippa", "Grey", "Henry Legolant", "Zora Ideale", "Secre Swallowtail", "Licht", "Patolli", "William Vangeance", "Dante Zogratis", "Zenon Zogratis", "Vanica Zogratis", "Loropechika"],
    villains: ["Dante Zogratis", "Zenon Zogratis", "Vanica Zogratis", "Patolli", "Morris"],
    abilities: ["Anti-Magic", "Wind Magic", "Dark Magic", "Water Magic", "Fire Magic", "Lightning Magic", "Time Magic", "Curse Magic"],
    weapons: ["Demon-Slayer Sword", "Demon-Dweller Sword", "Demon Destroyer Sword", "Four-Leaf Grimoire", "Katana"],
    techniques: ["Black Divider", "Black Hurricane", "Slash of Death", "Spirit Storm", "Sea Dragon's Roar", "Valkyrie Armor", "Dark Cloak Dimension Slash"],
    locations: ["Clover Kingdom", "Hage Village", "Heart Kingdom", "Spade Kingdom", "Underwater Temple", "Witches' Forest"],
    organizations: ["Black Bulls", "Golden Dawn", "Crimson Lion Kings", "Eye of the Midnight Sun", "Dark Triad"],
    arcs: ["Magic Knights Exam", "Dungeon Exploration", "Royal Knights", "Elf Reincarnation", "Spade Kingdom", "Dark Triad"],
    families: [["Noelle Silva", "Nozel Silva", "Acier Silva"], ["Mereoleona Vermillion", "Fuegoleon Vermillion"], ["Licht", "Tetia"]],
    hairColors: ["Yellow", "White", "Black", "Silver", "Red", "Orange"],
    eyeColors: ["Green", "Blue", "Black", "Red", "Yellow"],
    openings: ["Haruka Mirai", "PAiNT it BLACK", "Black Rover", "Gamushara", "Rakugaki Page"]
  });

  add({
    id: "solo_leveling", title: "Solo Leveling", genres: ["action", "fantasy", "dungeon", "hunter"],
    creator: "Chugong / DUBU", studio: "A-1 Pictures", yearStarted: 2024,
    protagonist: "Sung Jinwoo", powerSystem: "Shadow Monarch",
    characters: ["Sung Jinwoo", "Cha Hae-in", "Go Gunhee", "Choi Jongin", "Baek Yoonho", "Igris", "Beru", "Tank", "Yoo Jinho", "Song Yi", "Sung Il-hwan", "Thomas Andre", "Liu Zhigang", "Christopher Reed", "Dongsoo", "Hwang Dongsoo"],
    villains: ["Monarchs", "Frost Monarch", "Beast Monarch", "Giant Monarch", "Ant King", "Hwang Dongsoo"],
    abilities: ["Shadow Extraction", "Arise", "Stealth", "Shadow Exchange", "Monarch's Domain"],
    weapons: ["Demon King's Shortsword", "Kamish's Wrath", "Soul Weapon"],
    techniques: ["Arise", "Shadow Extraction", "Dagger Strike", "Ruler's Hand", "Mutillating Slash"],
    locations: ["A-Rank Gate", "Red Gate", "Demon Castle", "Jeju Island", "Japan Gate", "USA Gate"],
    organizations: ["Hunters Association", "Ahjin Guild", "Hunters Guild", "White Tiger Guild", "Scavenger Guild"],
    arcs: ["Debut Dungeon", "A-Rank Gate", "Red Gate", "Job Change", "Jeju Island", "Monarch War", "Final Battle"],
    families: [["Sung Jinwoo", "Sung Il-hwan", "Cha Hae-in"]],
    hairColors: ["Black", "White", "Gray", "Blonde", "Black"],
    eyeColors: ["Black", "Gold", "Black", "Red", "Brown"],
    openings: ["LEveL", "Please Please Please"]
  });

  add({
    id: "chainsaw_man", title: "Chainsaw Man", genres: ["shonen", "dark fantasy", "action", "horror"],
    creator: "Tatsuki Fujimoto", studio: "MAPPA", yearStarted: 2022,
    protagonist: "Denji",
    characters: ["Denji", "Makima", "Aki Hayakawa", "Power", "Pochita", "Kobeni Higashiyama", "Himeno", "Kishibe", "Reze", "Angel", "Beam", "Santa Claus", "Yoshida"],
    villains: ["Makima", "Katana Man", "Reze", "Santa Claus", "Gun Devil", "Control Devil"],
    abilities: ["Chainsaw Devil", "Blood Manipulation", "Control", "Curse Devil Contract", "Future Devil Contract", "Bomb Girl"],
    weapons: ["Chainsaw Blades", "Curse Nail", "Katana", "Blood Weapons"],
    techniques: ["Chainsaw Barrage", "Hero of Hell", "Blood Explosion", "Curse Nail Strike"],
    locations: ["Tokyo", "Public Safety Building", "Hell", "Aquarium", "Hotel"],
    organizations: ["Public Safety Devil Hunters", "International Assassins"],
    arcs: ["Introduction", "Katana Man", "International Assassins", "Bomb Girl", "Gun Devil", "Control Devil"],
    families: [["Denji", "Pochita"]],
    hairColors: ["Brown", "Red", "Black", "Yellow"],
    eyeColors: ["Brown", "Red", "Blue", "Yellow"],
    openings: ["KICK BACK", "Chainsaw Blood"]
  });

  add({
    id: "tokyo_ghoul", title: "Tokyo Ghoul", genres: ["seinen", "horror", "dark fantasy", "psychological"],
    creator: "Sui Ishida", studio: "Studio Pierrot", yearStarted: 2014,
    protagonist: "Ken Kaneki",
    characters: ["Ken Kaneki", "Touka Kirishima", "Rize Kamishiro", "Shuu Tsukiyama", "Kisho Arima", "Hideyoshi Nagachika", "Ayato Kirishima", "Nishiki Nishio", "Yoshimura", "Eto Yoshimura", "Tatara", "Noro", "Uta", "Yomo", "Amon Koutarou", "Mado Kureo"],
    villains: ["Rize Kamishiro", "Kisho Arima", "Eto Yoshimura", "Tatara", "Noro"],
    abilities: ["Rinkaku Kagune", "Ukaku Kagune", "Koukaku Kagune", "Bikaku Kagune", "Kakuja"],
    weapons: ["Quinque", "IXA", "Narukami"],
    techniques: ["Centipede Kakuja", "Half-Kakuja", "Kagune Whip", "Cochlea"],
    locations: ["Anteiku", ":re Cafe", "20th Ward", "Cochlea Prison", "Aogiri Tree Base"],
    organizations: ["Anteiku", "Aogiri Tree", "CCG", "V", "Clowns"],
    arcs: ["Ghoul", "Anteiku Raid", "Aogiri", "Cochlea", ":re", "Clown Siege"],
    families: [["Touka Kirishima", "Ayato Kirishima"], ["Ken Kaneki", "Hideyoshi Nagachika"]],
    hairColors: ["White", "Black", "Purple", "Brown"],
    eyeColors: ["Black/Red", "Purple", "Black", "Brown"],
    openings: ["Unravel", "Munou", "Asphyxia"]
  });

  add({
    id: "steins_gate", title: "Steins;Gate", genres: ["sci-fi", "thriller", "psychological", "time travel"],
    creator: "5pb. & Nitroplus", studio: "White Fox", yearStarted: 2011,
    protagonist: "Rintaro Okabe",
    characters: ["Rintaro Okabe", "Kurisu Makise", "Mayuri Shiina", "Daru Hashida", "Suzuha Amane", "Moeka Kiryu", "Luka Urushibara", "Faris NyanNyan", "Nae Tennoji", "Yugo Tennoji"],
    villains: ["SERN", "Moeka Kiryu"],
    abilities: ["Reading Steiner", "Intellect", "Time Travel"],
    weapons: ["Phone Microwave", "D-Mail", "Time Leap Machine"],
    techniques: ["Reading Steiner", "D-Mail", "Time Leap", "Amadeus"],
    locations: ["Akihabara", "Future Gadget Lab", "Viktor Chondria University", "Radio Kaikan"],
    organizations: ["Future Gadget Lab", "SERN", "Rounders"],
    arcs: ["Prologue", "D-Mail", "Time Paradox", "Steins Gate"],
    families: [],
    hairColors: ["Black", "Red", "Brown", "Reddish"],
    eyeColors: ["Brown", "Blue", "Blue", "Red"],
    openings: ["Hacking to the Gate", "Skyclad Observer", "Fatima"]
  });

  add({
    id: "code_geass", title: "Code Geass", genres: ["mecha", "strategy", "psychological", "drama"],
    creator: "Ichiro Okouchi & Gorō Taniguchi", studio: "Sunrise", yearStarted: 2006,
    protagonist: "Lelouch vi Britannia",
    characters: ["Lelouch vi Britannia", "Suzaku Kururugi", "C.C.", "Kallen Stadtfeld", "Nunnally vi Britannia", "Euphemia li Britannia", "Charles zi Britannia", "Marianne vi Britannia", "Schneizel el Britannia", "Lloyd Asplund", "Jeremiah Gottwald", "Rolo Lamperouge", "Anya Alstreim", "Gino Weinberg", "Diethard Ried", "Nina Einstein", "Rakshata Chawla"],
    villains: ["Charles zi Britannia", "Schneizel el Britannia", "Suzaku Kururugi"],
    abilities: ["Geass: Absolute Obedience", "Strategic Genius", "Knightmare Pilot"],
    weapons: ["Lancelot Knightmare", "Guren Knightmare", "Shinkiro", "VARIS Rifle"],
    techniques: ["Geass Command", "Zero Persona", "Knightmare Combat"],
    locations: ["Ashford Academy", "Pendragon", "Area 11", "Tokyo Settlement", "Kamine Island"],
    organizations: ["Black Knights", "Britannian Empire", "Knights of the Round"],
    arcs: ["Black Rebellion", "Zero Requiem"],
    families: [["Lelouch vi Britannia", "Nunnally vi Britannia", "Charles zi Britannia"], ["C.C.", "Marianne vi Britannia"]],
    hairColors: ["Black", "Brown", "Green", "Red"],
    eyeColors: ["Purple", "Green", "Gold", "Blue"],
    openings: ["Colors", "O2", "World End"]
  });

  add({
    id: "evangelion", title: "Neon Genesis Evangelion", genres: ["mecha", "psychological", "sci-fi"],
    creator: "Hideaki Anno", studio: "Gainax / Studio Khara", yearStarted: 1995,
    protagonist: "Shinji Ikari",
    characters: ["Shinji Ikari", "Rei Ayanami", "Asuka Langley Soryu", "Misato Katsuragi", "Gendo Ikari", "Ritsuko Akagi", "Kaworu Nagisa", "Mari Makinami", "Yui Ikari", "Kaji Ryoji", "Pen Pen"],
    villains: ["Gendo Ikari", "SEELE", "Angels"],
    abilities: ["EVA Pilot", "AT Field", "Entry Plug Synch Ratio"],
    weapons: ["Evangelion Unit-01", "Evangelion Unit-02", "Progressive Knife", "Positron Rifle", "Lance of Longinus"],
    techniques: ["AT Field Expansion", "Berserk Mode", "Progressive Knife Attack", "Dummy Plug Control"],
    locations: ["Tokyo-3", "NERV HQ", "Central Dogma", "GeoFront", "Terminal Dogma"],
    organizations: ["NERV", "SEELE", "WILLE", "JSSDF"],
    arcs: ["Angel Attacks", "Human Instrumentality", "End of Evangelion"],
    families: [["Shinji Ikari", "Gendo Ikari", "Yui Ikari"], ["Asuka Langley Soryu", "Kyoko Zeppelin Soryu"]],
    hairColors: ["Brown", "Blue", "Red", "Purple", "Silver"],
    eyeColors: ["Blue", "Red", "Blue", "Brown"],
    openings: ["Cruel Angel's Thesis", "Beautiful World", "Sakura Nagashi"]
  });

  add({
    id: "onepunchman", title: "One Punch Man", genres: ["seinen", "comedy", "action", "superhero"],
    creator: "ONE", studio: "Madhouse / J.C.Staff", yearStarted: 2015,
    protagonist: "Saitama",
    characters: ["Saitama", "Genos", "Mumen Rider", "Speed-o'-Sound Sonic", "Lord Boros", "King", "Bang", "Atomic Samurai", "Flashy Flash", "Zombieman", "Puri-Puri Prisoner", "Tanktop Master", "Watchdog Man", "Metal Knight", "Child Emperor", "Tatsumaki", "Fubuki", "Garou", "Mosquito Girl", "Lion", "Deep Sea King", "Carnage Kabuto", "Orochi", "Psykos"],
    villains: ["Lord Boros", "Garou", "Orochi", "Psykos", "Mosquito Girl", "Deep Sea King", "Speed-o'-Sound Sonic"],
    abilities: ["Super Strength", "Immeasurable Speed", "Invulnerability", "One Punch", "Cyborg Body", "Incinerate", "Fighting Spirit"],
    weapons: ["Saiyan Suit", "Cyborg Arms", "Metal Bat"],
    techniques: ["Serious Punch", "Consecutive Normal Punches", "Serious Series: Serious Side Steps", "Incinerate", "Water Stream Rock Smashing Fist"],
    locations: ["Z-City", "Hero Association HQ", "Monster Association Base", "Saitama's Apartment"],
    organizations: ["Hero Association", "Monster Association", "Dark Matter Thieves"],
    arcs: ["Hero Introduction", "House of Evolution", "Paradise Group", "Deep Sea King", "Boros Invasion", "Monster Association"],
    families: [],
    hairColors: ["Black", "Blonde", "Brown", "Purple", "White"],
    eyeColors: ["Black", "Black", "Brown", "Blue", "Blue"],
    openings: ["The Hero!", "Seijatachi no Tabiji"]
  });

  add({
    id: "konosuba", title: "Konosuba", genres: ["isekai", "comedy", "fantasy", "parody"],
    creator: "Natsume Akatsuki", studio: "Studio Deen", yearStarted: 2016,
    protagonist: "Kazuma Satou",
    characters: ["Kazuma Satou", "Aqua", "Megumin", "Darkness", "Wiz", "Vanir", "Eris", "Luna", "Yunyun", "Sylvia", "Beldia", "Hans", "Dust"],
    villains: ["Demon King", "Beldia", "Hans", "Sylvia"],
    abilities: ["Steal", "Explosion Magic", "Healing", "Crusader Defense"],
    weapons: ["Explosion Staff", "Crusader Greatsword", "Magic Sword"],
    techniques: ["Explosion!", "Steal", "God Blow", "Sacred Heal", "Turn Undead"],
    locations: ["Axel Town", "Crimson Demon Village", "Axis Church", "Demon King Castle", "Dungeon"],
    organizations: ["Axis Cult", "Crimson Demon Clan", "Eris Church"],
    arcs: ["Introduction", "Destroyer", "Crimson Demon", "Demon King Army"],
    families: [],
    hairColors: ["Brown", "Blue", "Black", "Blonde", "Pink"],
    eyeColors: ["Brown", "Blue", "Red", "Blue", "Blue"],
    openings: ["Tomorrow", "Happy Magic"]
  });

  add({
    id: "frieren", title: "Frieren: Beyond Journey's End", genres: ["fantasy", "adventure", "slice of life", "drama"],
    creator: "Kanehito Yamada", studio: "Madhouse", yearStarted: 2023,
    protagonist: "Frieren",
    characters: ["Frieren", "Fern", "Stark", "Himmel", "Heiter", "Eisen", "Aura", "Lügner", "Linie", "Qual", "Kanne", "Lawine", "Wirbel", "Sense", "Methode", "Edel", "Lernen", "Denken", "Richter", "Genau"],
    villains: ["Aura", "Lügner", "Qual", "Demon King"],
    abilities: ["Zoltraak", "Mana Suppression", "Holy Magic", "Battle Magic", "Swordsmanship"],
    weapons: ["Staff", "Battle Axe", "Sword"],
    techniques: ["Zoltraak", "Basic Tracking Magic", "Sniper Zoltraak", "Demon Analysis"],
    locations: ["Capital", "Northern Lands", "Demon Territory", "Goddess Monument"],
    organizations: ["Hero Party", "Mage Association", "First Class Mages"],
    arcs: ["Journey North", "Aura the Guillotine", "First Class Mage Exam", "Demon Territory"],
    families: [["Frieren", "Himmel", "Heiter", "Eisen"]],
    hairColors: ["White", "Purple", "Red", "Blue", "Gray"],
    eyeColors: ["Blue", "Purple", "Red", "Blue", "Blue"],
    openings: ["Yuusha", "Haru", "Anytime Anywhere"]
  });

  add({
    id: "rezero", title: "Re:Zero - Starting Life in Another World", genres: ["isekai", "dark fantasy", "psychological", "drama"],
    creator: "Tappei Nagatsuki", studio: "White Fox", yearStarted: 2016,
    protagonist: "Subaru Natsuki",
    characters: ["Subaru Natsuki", "Emilia", "Rem", "Ram", "Roswaal L Mathers", "Beatrice", "Puck", "Echidna", "Julius Juukulius", "Reinhard van Astrea", "Felt", "Rom", "Meili Portroute", "Frederica", "Petra Leyte", "Otto Suwen", "Garfiel Tinzel", "Elsa Granhiert", "Theresia van Astrea", "Wilhelm van Astrea", "Crusch Karsten", "Felix Argyle", "Priscilla Barielle", "Al"],
    villains: ["Elsa Granhiert", "Echidna", "Sin Archbishops", "Petelgeuse", "Regulus Corneas", "Ley Batenkaitos", "Roy Alphard", "Sirius"],
    abilities: ["Return by Death", "Ice Magic", "Oni Magic", "Wind Magic", "Yin Magic", "Great Spirit", "Sword Saint"],
    weapons: ["Morning Star", "Crystal Staff", "Dragon Sword Reid"],
    techniques: ["Return by Death", "Invisible Providence", "Cor Leones", "Shamak", "Al Shamak", "Absolute Zero", "El Fuera"],
    locations: ["Roswaal Mansion", "Capital Lugunica", "Pleides Watchtower", "Sanctuary", "Priestella"],
    organizations: ["Emilia Camp", "Witches of Sin", "Sin Archbishops of the Witch Cult", "Council of Wise Men"],
    arcs: ["Arc 1: The Beginning of the End", "Arc 2: The Mansion", "Arc 3: From Zero", "Arc 4: The Everlasting Covenant", "Arc 5: The Stars that Engrave the Name"],
    families: [["Rem", "Ram"], ["Emilia", "Fortuna"]],
    hairColors: ["Black", "Silver", "Blue", "Pink", "Blonde", "White"],
    eyeColors: ["Brown", "Purple", "Blue", "Pink", "Yellow", "Blue"],
    openings: ["Redo", "Paradisus-Paradoxum", "Realize", "Long Shot"]
  });

  add({
    id: "spy_x_family", title: "Spy x Family", genres: ["comedy", "action", "slice of life", "spy"],
    creator: "Tatsuya Endo", studio: "WIT Studio / CloverWorks", yearStarted: 2022,
    protagonist: "Loid Forger",
    characters: ["Loid Forger", "Anya Forger", "Yor Forger", "Bond Forger", "Yuri Briar", "Franky Franklin", "Sylvia Sherwood", "Becky Blackbell", "Damian Desmond", "Henderson", "Martha", "WISE Handler"],
    villains: ["Red Circus", "Mafia", "SSS"],
    abilities: ["Telepathy", "Spy Skills", "Assassin Skills", "Future Sight"],
    weapons: ["Pistol", "Butter Knife", "Stiletto", "Gadgets"],
    techniques: ["Disguise", "Covert Ops", "Thorn Princess Style", "Telepathic Reading"],
    locations: ["Berlint", "Eden Academy", "Forger Residence", "City Hall", "Cruise Ship"],
    organizations: ["WISE", "Garden", "SSS (State Security Service)", "Red Circus", "Eden Academy"],
    arcs: ["Mission 1: Twilight", "Doggy Crisis", "Cruise Adventure", "Imperial Scholars", "Red Circus"],
    families: [["Loid Forger", "Yor Forger", "Anya Forger", "Bond Forger"], ["Yor Forger", "Yuri Briar"]],
    hairColors: ["Blonde", "Pink", "Black", "White"],
    eyeColors: ["Blue", "Green", "Red", "Brown"],
    openings: ["Mixed Nuts", "Souvenir", "Kura Kura"]
  });

  add({
    id: "death_note", title: "Death Note", genres: ["psychological", "thriller", "supernatural", "crime"],
    creator: "Tsugumi Ohba & Takeshi Obata", studio: "Madhouse", yearStarted: 2006,
    protagonist: "Light Yagami",
    characters: ["Light Yagami", "L", "Ryuk", "Misa Amane", "Near", "Mello", "Soichiro Yagami", "Sachiko Yagami", "Sayu Yagami", "Wammy", "Rem", "Watari", "Matsuda", "Aizawa", "Mogi", "Ukita", "Mikami Teru", "Takada Kiyomi", "Demegawa"],
    villains: ["Light Yagami (as Kira)", "Mello", "Mikami"],
    abilities: ["Death Note", "Shinigami Eyes", "Genius Intellect", "Deduction", "Kira Task Force"],
    weapons: ["Death Note"],
    techniques: ["Death Note: Heart Attack", "Death Note: Accident", "Shinigami Eyes: Name & Lifespan", "Memory Manipulation", "5.5 Second Rule"],
    locations: ["Japan", "Los Angeles", "Wammy's House", "Kira Task Force HQ", "Yellow Box Warehouse"],
    organizations: ["Kira Task Force", "SPK", "Mafia", "Wammy's House"],
    arcs: ["A New World", "Confrontation", "Mello and Near", "Kira vs SPK", "Final Confrontation"],
    families: [["Light Yagami", "Soichiro Yagami", "Sachiko Yagami"], ["L", "Near", "Mello", "Wammy"]],
    hairColors: ["Brown", "Black", "Blonde", "White"],
    eyeColors: ["Brown", "Black", "Green", "Black", "Blue"],
    openings: ["The World", "What's Up People?", "Zetsubou Billy"]
  });

  add({
    id: "mob_psycho", title: "Mob Psycho 100", genres: ["comedy", "supernatural", "action", "slice of life"],
    creator: "ONE", studio: "Bones", yearStarted: 2016,
    protagonist: "Shigeo Kageyama",
    characters: ["Shigeo Kageyama", "Arataka Reigen", "Ritsu Kageyama", "Teruki Hanazawa", "Dimple", "Tome Kurata", "Musashi Goto", "Katsuya Serizawa", "Sho Suzuki", "Toichiro Suzuki", "Minegishi", "Hatori", "Mukai", "Koyama", "Matsuura", "Asagiri"],
    villains: ["Toichiro Suzuki", "Claw", "Divine Tree Cult"],
    abilities: ["Psychic Powers", "Telepathy", "Telekinesis", "100% Mode", "???% Mode"],
    weapons: ["Salt"],
    techniques: ["100%: Normal Punch", "Psychic Barrier", "Telekinetic Blast", "Psychic Shield", "???% Release"],
    locations: ["Seasoning City", "Black Vinegar Middle School", "Claw HQ", "Awakening Lab"],
    organizations: ["Spirits & Such Consulting", "Claw", "Telepathy Club"],
    arcs: ["Reigen Arc", "Teru Arc", "Claw Arc", "World Domination Arc", "Divine Tree Arc"],
    families: [["Shigeo Kageyama", "Ritsu Kageyama"]],
    hairColors: ["Black", "Blonde", "Black", "Blonde", "Green"],
    eyeColors: ["Black", "Brown", "Black", "Blue", "Green"],
    openings: ["99", "99.9", "1"]
  });

  add({
    id: "vinland_saga", title: "Vinland Saga", genres: ["seinen", "historical", "action", "drama"],
    creator: "Makoto Yukimura", studio: "Wit Studio / MAPPA", yearStarted: 2019,
    protagonist: "Thorfinn",
    characters: ["Thorfinn", "Askelaad", "Canute", "Thorkell", "Thors", "Helga", "Ylva", "Leif Ericson", "Bjorn", "Asgeir", "Ragnar", "Sweyn", "Floki", "Halfdan", "Garm", "Hild", "Einar", "Arnheid", "Ketil", "Snake"],
    villains: ["Askelaad", "Canute (initially antagonist)", "Floki", "Ketil"],
    abilities: ["Swordsmanship", "Combat", "Survival Skills", "Leadership"],
    weapons: ["Dagger", "Sword", "Axe", "Shield"],
    techniques: ["Dagger Combat", "Sword Slash", "Axe Throw", "Berserker Style"],
    locations: ["Iceland", "Denmark", "England", "Vinland", "Jomsborg", "Farmland"],
    organizations: ["Jomsvikings", "Danish Army"],
    arcs: ["War Arc", "Farmland Saga", "Vinland Arc", "Eastern Expedition"],
    families: [["Thorfinn", "Thors", "Helga", "Ylva"], ["Canute", "King Sweyn"]],
    hairColors: ["Black", "Blonde", "Brown", "Black"],
    eyeColors: ["Blue", "Blue", "Blue", "Black"],
    openings: ["Mukanjyo", "Dark Crow", "River"]
  });

  add({
    id: "kaiju_no8", title: "Kaiju No. 8", genres: ["shonen", "action", "sci-fi", "monster"],
    creator: "Naoya Matsumoto", studio: "Production I.G", yearStarted: 2024,
    protagonist: "Kafka Hibino",
    characters: ["Kafka Hibino", "Reno Ichikawa", "Mina Ashiro", "Soshiro Hoshina", "Kikoru Shinomiya", "Iharu Furuhashi", "Aoi Kaguragi", "Taichiro Hasegawa", "Haruichi Izumo", "Shinonome", "Okonogi", "Kaiju No. 9", "Kaiju No. 10", "Kaiju No. 11", "Kaiju No. 12"],
    villains: ["Kaiju No. 9", "Kaiju No. 10", "Kaiju No. 11", "Kaiju No. 12"],
    abilities: ["Kaiju Transformation", "Superhuman Strength", "Combat Suit", "Kaiju Sense"],
    weapons: ["Combat Suit", "Anti-Kaiju Railgun", "Dual Swords", "Axe"],
    techniques: ["Kaiju Form: No. 8", "Gravity Strike", "Impact Blast", "Kaiju Energy Release"],
    locations: ["Tachikawa Base", "Tokyo", "3rd Division HQ", "Shinagawa"],
    organizations: ["Japan Defense Force", "Anti-Kaiju Corps", "3rd Division"],
    arcs: ["Recruitment", "Tachikawa Base", "Kaiju Attack", "Identification", "Kaiju No. 9", "Mountain Defense"],
    families: [["Kafka Hibino", "Mina Ashiro"]],
    hairColors: ["Black", "Blonde", "Black", "White"],
    eyeColors: ["Brown", "Blue", "Red", "Black"],
    openings: ["Abyss"]
  });

  add({
    id: "fire_force", title: "Fire Force", genres: ["shonen", "action", "supernatural", "sci-fi"],
    creator: "Atsushi Ohkubo", studio: "David Production", yearStarted: 2019,
    protagonist: "Shinra Kusakabe",
    characters: ["Shinra Kusakabe", "Arthur Boyle", "Maki Oze", "Akitaru Obi", "Takehisa Hinawa", "Tamaki Kotatsu", "Sho Kusakabe", "Shohei Haijima", "Benimaru Shinmon", "Konro Sagamiya", "Hibana", "Joker", "Lisa Isaribi", "Flail", "Corona", "Ogun Montgomery", "Gustav Honda", "Yuuichirou Kurono", "Rei Hojima", "Sumire", "Haumea", "Ritsu", "Victor Licht"],
    villains: ["Haumea", "White-Clad", "Evangelist", "Sho Kusakabe (initially)"],
    abilities: ["Third Generation: Ignition Ability", "Second Generation: Fire Control", "Adolla Burst", "Devil's Footprints"],
    weapons: ["Plasma Sword", "Boots", "Fire Axe", "Flame Gun"],
    techniques: ["Devil's Footprints", "Adolla Flash", "Knight King's Sword", "Flame Blade", "Hell Flame"],
    locations: ["Tokyo Empire", "Company 8 HQ", "Netherworld", "Holy Sol Temple"],
    organizations: ["Special Fire Force Company 8", "White-Clad", "Holy Sol Temple"],
    arcs: ["Company 8", "Cataclysm", "Netherworld", "Holy Sol Temple", "Ashen Reunion", "Adolla"],
    families: [["Shinra Kusakabe", "Sho Kusakabe"]],
    hairColors: ["Black", "Blonde", "Red", "Black", "Pink"],
    eyeColors: ["Red", "Blue", "Red", "Black", "Green"],
    openings: ["Inferno", "MAYDAY", "SPARK-AGAIN"]
  });

  add({
    id: "fairy_tail", title: "Fairy Tail", genres: ["shonen", "fantasy", "magic", "adventure"],
    creator: "Hiro Mashima", studio: "A-1 Pictures / CloverWorks", yearStarted: 2009,
    protagonist: "Natsu Dragneel", powerSystem: "Magic",
    characters: ["Natsu Dragneel", "Lucy Heartfilia", "Erza Scarlet", "Gray Fullbuster", "Happy", "Wendy Marvell", "Carla", "Gajeel Redfox", "Levy McGarden", "Makarov Dreyar", "Mirajane Strauss", "Laxus Dreyar", "Mystogan", "Jellal Fernandes", "Juvia Lockser", "Lisanna Strauss", "Elfman Strauss", "Pantherlily", "Frosch", "Lector", "Zeref Dragneel", "Acnologia", "Mard Geer", "Hades"],
    villains: ["Zeref Dragneel", "Acnologia", "Mard Geer", "Hades", "Jellal Fernandes (initially)"],
    abilities: ["Fire Dragon Slayer Magic", "Celestial Spirit Magic", "Requip Magic", "Ice Maker Magic", "Sky Dragon Slayer Magic", "Iron Dragon Slayer Magic"],
    weapons: ["Celestial Keys", "Multiple Swords & Armors", "Heaven's Wheel Armor"],
    techniques: ["Fire Dragon's Iron Fist", "Fire Dragon's Roar", "Open: Gate of the Lion", "Universe of Erza", "Ice Cannon", "Sky Dragon's Roar"],
    locations: ["Fairy Tail Guild Hall", "Magnolia", "Tenrou Island", "Edolas", "Tartaros HQ", "Alvarez Empire"],
    organizations: ["Fairy Tail", "Phantom Lord", "Grimoire Heart", "Tartaros", "Alvarez Empire", "Council"],
    arcs: ["Lullaby", "Galuna Island", "Phantom Lord", "Tower of Heaven", "Oración Seis", "Tenrou Island", "Grand Magic Games", "Tartaros", "Alvarez Empire", "100 Years Quest"],
    families: [["Natsu Dragneel", "Zeref Dragneel"], ["Mirajane Strauss", "Elfman Strauss", "Lisanna Strauss"], ["Gajeel Redfox", "Levy McGarden"]],
    hairColors: ["Pink", "Blonde", "Red", "Black", "Blue", "Silver"],
    eyeColors: ["Black", "Brown", "Brown", "Blue", "Blue", "Purple"],
    openings: ["Snow Fairy", "Rock City Boy", "Breakthrough", "Eternal Fellows"]
  });

  add({
    id: "dr_stone", title: "Dr. Stone", genres: ["shonen", "sci-fi", "adventure", "educational"],
    creator: "Riichiro Inagaki & Boichi", studio: "TMS Entertainment", yearStarted: 2019,
    protagonist: "Senku Ishigami",
    characters: ["Senku Ishigami", "Taiju Oki", "Kohaku", "Chrome", "Gen Asagiri", "Tsukasa Shishio", "Byakuya Ishigami", "Ruri", "Kokuyo", "Ginro", "Kinko", "Matsukaze", "Ukyo", "Hyoga", "Homura", "Nikola Tesla", "Moz", "Kirisame", "Barrett", "Lilian Weinberg", "Connie Lee", "Shamil Volkov", "Darryl Welch"],
    villains: ["Tsukasa Shishio", "Hyoga", "Moz", "Barrett", "Kir"],
    abilities: ["Genius Intellect", "Scientific Knowledge", "Invention", "Superhuman Strength"],
    weapons: ["Science Lab Equipment", "Cell Phone", "Revival Fluid", "Various Inventions"],
    techniques: ["Revival Fluid", "Stone Formula", "Sulfa Drug", "Cell Phone", "Petrification Cure", "Musket", "Steam Engine", "Battery", "Light Bulb"],
    locations: ["Ishigami Village", "Corn Village", "Tsukasa Empire", "Treasure Island", "Petrification Island"],
    organizations: ["Kingdom of Science", "Tsukasa Empire", "Village Alliance"],
    arcs: ["Stone World", "Village Arc", "Petrification", "Kingdom of Science", "Age of Exploration", "Treasure Island", "New World"],
    families: [["Senku Ishigami", "Byakuya Ishigami"], ["Kohaku", "Ruri"]],
    hairColors: ["Green", "Black", "Pink", "White", "Black", "Yellow", "White"],
    eyeColors: ["Red", "Black", "Brown", "Black", "Purple", "Black", "Blue"],
    openings: ["Good Morning World", "Sangenshoku", "Rakuen", "Kasekateki Jiku"]
  });

  add({
    id: "gintama", title: "Gintama", genres: ["shonen", "comedy", "action", "parody", "sci-fi"],
    creator: "Hideaki Sorachi", studio: "Sunrise", yearStarted: 2006, protagonist: "Gintoki Sakata",
    characters: ["Gintoki Sakata", "Shinpachi Shimura", "Kagura", "Sadaharu", "Toshiro Hijikata", "Taizo Hasegawa", "Kotaro Katsura", "Shige Shiro", "Sogo Okita", "Ayame Sarutobi", "Tsukuyo", "Nobume", "Sakamoto Tatsuma", "Takasugi Shinsuke", "Otae", "Kondo Isao", "Yamazaki Sagaru", "Elizabeth", "Umibozu", "Abuto"],
    villains: ["Takasugi Shinsuke", "Nobunobu", "Utsuro", "Sadasima", "Jirocho"],
    abilities: ["Swordsmanship", "Strength", "Comedy", "Bakuyaku", "Kamehameha parody"],
    weapons: ["Bokuto (Wooden Sword)", "Akina (Lacquered Sword)", "Umbrella Gun", "Bazooka"],
    techniques: ["Bokuto Strike", "Kamehameha (Parody)", "Katsura's Running", "Okita's Sadism"],
    locations: ["Edo (Kabukicho)", "Yoshiwara", "Otsu", "Benten Tower", "Terakado"],
    organizations: ["Shinsengumi", "Kiheitai", "Joui Party", "Shogunate", "Kabukicho Four Devas"],
    arcs: ["Benizakura", "Yoshiwara in Flames", "Red Spider", "Courtesan of a Nation", "Shogun Assassination", "Farewell Shinsengumi", "Silver Soul"],
    families: [["Gintoki Sakata", "Shoyo Yoshida"], ["Kagura", "Umibozu", "Kamui"]],
    hairColors: ["Silver", "Brown", "Orange", "Black", "Blonde", "Red"],
    eyeColors: ["Red", "Brown", "Blue", "Black", "Brown", "Blue"],
    openings: ["Pray", "Tooi Nioi", "Gin", "Tougenkyou Alien", "Sakura Mitsutsuki"]
  });

  add({
    id: "parasyte", title: "Parasyte: The Maxim", genres: ["horror", "sci-fi", "psychological", "seinen"],
    creator: "Hitoshi Iwaaki", studio: "Madhouse", yearStarted: 2014, protagonist: "Shinichi Izumi",
    characters: ["Shinichi Izumi", "Migi", "Kana Kimishima", "Satomi Murano", "Goto", "Takeshi Hirokawa", "Hideo Shimada", "Reiko Tamura", "Kazuhiko Izumi", "Nobuko Izumi", "Akiho Suzuki", "Uda Ryo", "Mamoru Uda"],
    villains: ["Goto", "Takeshi Hirokawa", "Hideo Shimada", "Parasytes"],
    abilities: ["Body Manipulation", "Blade Arms", "Enhanced Senses", "Shape-shifting", "Parasite Control"],
    weapons: ["Migi (Blade Form)", "Migi (Various Forms)"],
    techniques: ["Blade Strike", "Sensory Detection", "Body Reformation", "Parasite Detection"],
    locations: ["Tokyo", "Shinichi's School", "Tamura Residence", "Hospital", "Coastal Cliffs"],
    organizations: [],
    arcs: ["Encounter", "Parasite Evolution", "Goto Arc", "Final Confrontation"],
    families: [["Shinichi Izumi", "Kazuhiko Izumi", "Nobuko Izumi"]],
    hairColors: ["Black", "Brown", "Black", "Brown", "White"],
    eyeColors: ["Black", "Black", "Brown", "Brown", "Black"],
    openings: ["Let Me Hear", "It's the Right Time"]
  });

  add({
    id: "mushishi", title: "Mushishi", genres: ["seinen", "supernatural", "slice of life", "mystery"],
    creator: "Yuki Urushibara", studio: "Artland", yearStarted: 2005, protagonist: "Ginko",
    characters: ["Ginko", "Tanyu", "Adashino", "Shige", "Toki", "Yui", "Koharu", "Nui", "Setsu", "Hiyo", "Mikawa", "Saku", "Karise", "Renzu", "Shino"],
    villains: [],
    abilities: ["Mushi Mastery", "Mushi-shi Skills", "Medicine", "Tracking"],
    weapons: ["Medicine Kit", "Light Bulbs", "Smoke"],
    techniques: ["Mushi Extraction", "Mushi Repellent", "Mushi Summoning", "Mushi Communication"],
    locations: ["Mountain Village", "Forest", "Lake", "Coastal Town", "Snowy Mountains"],
    organizations: ["Mushi-shi Guild"],
    arcs: ["The Green Seat", "The Light in the Eyelids", "Heavenly Thread", "Tender Horns", "The Warbling Sea"],
    families: [],
    hairColors: ["White", "Black", "Brown", "Blonde", "Gray"],
    eyeColors: ["Green", "Black", "Brown", "Blue", "Gray"],
    openings: ["The Sore Feet Song", "Shiver"]
  });

  add({
    id: "cowboy_bebop", title: "Cowboy Bebop", genres: ["sci-fi", "space western", "action", "noir"],
    creator: "Shinichiro Watanabe", studio: "Sunrise", yearStarted: 1998, protagonist: "Spike Spiegel",
    characters: ["Spike Spiegel", "Jet Black", "Faye Valentine", "Edward Wong", "Radical Ed", "Vicious", "Julia", "Ein", "Laughing Bull", "Annie", "Lydia", "Roco Bonnaro", "Dr. Londez", "Ursula Yung", "Gren", "Mao Yenrai", "Vincent Volaju"],
    villains: ["Vicious", "Vincent Volaju", "Mao Yenrai"],
    abilities: ["CQC", "Marksmanship", "Pilot", "Hunter Skills", "Hacking"],
    weapons: ["Pistol", "Swordfish II", "Bebop", "Machine Gun", "Knife"],
    techniques: ["Eye Shot", "CQC Strike", "Pilot Maneuver", "Bounty Hunt"],
    locations: ["Mars", "Venus", "Earth", "Jupiter", "Titan", "The Bebop", "Blue Crow"],
    organizations: ["Red Dragon Syndicate", "ISSP"],
    arcs: ["Asteroid Blues", "Stray Dog Strut", "Jupiter Jazz", "Mushroom Samba", "The Real Folk Blues"],
    families: [],
    hairColors: ["Green", "Black", "Blonde", "Orange", "White", "Red"],
    eyeColors: ["Brown", "Black", "Blue", "Brown", "Blue", "Red"],
    openings: ["Tank!", "Ask DNA"]
  });

  add({
    id: "samurai_champloo", title: "Samurai Champloo", genres: ["action", "adventure", "historical", "hip-hop"],
    creator: "Shinichiro Watanabe", studio: "Manglobe", yearStarted: 2004, protagonist: "Mugen",
    characters: ["Mugen", "Jin", "Fuu Kasumi", "Matsunosuke", "Shige", "Kariya Kagetoki", "Yatsuha", "Sagara", "Okuru", "Seiji", "Mya", "Mikami", "Ishimatsu", "Manji", "Koshimizu"],
    villains: ["Kariya Kagetoki", "Mikami", "Ishimatsu", "Sagara"],
    abilities: ["Breakdancing Sword Style", "Traditional Swordsmanship", "Cooking", "Gambling"],
    weapons: ["Katana", "Mugen's Blade", "Sword Cane", "Wooden Sword"],
    techniques: ["Mugen Style: ???", "Jin Style: Iaijutsu", "Mugen's Flurry", "Jin's Quick Draw"],
    locations: ["Edo", "Nagasaki", "Kyoto", "Countryside", "Port Town"],
    organizations: [],
    arcs: ["Searching for the Sunflower Samurai", "Nagasaki Arc", "Kariya Arc"],
    families: [],
    hairColors: ["Brown", "Black", "Brown", "Multi", "Black"],
    eyeColors: ["Brown", "Black", "Brown", "Brown", "Black"],
    openings: ["Battlecry", "Shiki no Uta"]
  });

  add({
    id: "fullmetal_alchemist", title: "Fullmetal Alchemist: Brotherhood", genres: ["shonen", "adventure", "fantasy", "drama"],
    creator: "Hiromu Arakawa", studio: "Bones", yearStarted: 2009, protagonist: "Edward Elric", powerSystem: "Alchemy",
    characters: ["Edward Elric", "Alphonse Elric", "Roy Mustang", "Riza Hawkeye", "Winry Rockbell", "Scar", "King Bradley", "Father", "Ling Yao", "Lan Fan", "Greed", "Envy", "Gluttony", "Lust", "Pride", "Sloth", "Wrath", "Van Hohenheim", "Trisha Elric", "Pinako Rockbell", "Solf J. Kimblee", "Maes Hughes", "Shou Tucker"],
    villains: ["Father", "King Bradley", "Envy", "Pride", "Lust", "Gluttony", "Sloth", "Wrath", "Solf J. Kimblee", "Shou Tucker", "Scar (initially)"],
    abilities: ["Alchemy", "Flame Alchemy", "Human Transmutation", "Philosopher's Stone", "Ultimate Shield"],
    weapons: ["Automail", "Pocket Watch", "Transmutation Circle", "Rapier", "Bomb"],
    techniques: ["Clap Transmutation", "Flame Alchemy: Snap", "Alkahestry", "Stone Transmutation", "Soul Binding"],
    locations: ["Amestris", "Central City", "Resembool", "Xerxes", "Dublith", "Rush Valley", "Ishval", "Liore", "Northern Briggs"],
    organizations: ["State Military", "Homunculi", "Ishvalan Liberation Army", "Xing", "Maternal Love"],
    arcs: ["Nina Tucker", "Lab 5", "Briggs Fortress", "Father's Plan", "Promised Day", "Ishval War"],
    families: [["Edward Elric", "Alphonse Elric", "Van Hohenheim", "Trisha Elric"], ["Roy Mustang", "Maes Hughes"], ["Winry Rockbell", "Pinako Rockbell"]],
    hairColors: ["Blonde", "Grey", "Black", "Brown", "Red", "White"],
    eyeColors: ["Gold", "Red", "Brown", "Black", "Red", "Blue"],
    openings: ["Again", "Period", "Rain", "Golden Time Lover", "Hologram"]
  });

  add({
    id: "classroom_of_elite", title: "Classroom of the Elite", genres: ["psychological", "drama", "school", "thriller"],
    creator: "Syougo Kinugasa", studio: "Lerche", yearStarted: 2017, protagonist: "Kiyotaka Ayanokoji",
    characters: ["Kiyotaka Ayanokoji", "Suzune Horikita", "Kikyo Kushida", "Yosuke Hirata", "Kei Karuizawa", "Ken Sudou", "Maya Sato", "Sae Chabashira", "Manabu Horikita", "Kakeru Ryuen", "Honami Ichinose", "Arisu Sakayanagi", "Kohei Katsuragi", "Rokusuke Koenji", "Chiaki Mashima", "Chabashira Sae", "Hideo Sotomura", "Haruka Hasebe"],
    villains: ["Kakeru Ryuen", "Arisu Sakayanagi", "Manabu Horikita (initially rival)"],
    abilities: ["Strategic Genius", "Manipulation", "Deduction", "Academic Excellence"],
    weapons: ["Test Scores", "SNS", "Strategies", "Internal Information"],
    techniques: ["Social Manipulation", "Group Strategy", "Isolation Tactic", "Internal Politics"],
    locations: ["Advanced Nurturing High School", "School Dorm", "School Island", "Sports Festival", "Cultural Festival"],
    organizations: ["Class 1-D", "Student Council", "Class 1-A", "Class 1-C", "Class 1-B"],
    arcs: ["Entrance", "Cruise Ship", "Sports Festival", "Cultural Festival", "Paper Shuffle", "Unanimous Vote", "2nd Year Introduction"],
    families: [["Kiyotaka Ayanokoji", "Ayanokoji Father"], ["Suzune Horikita", "Manabu Horikita"]],
    hairColors: ["Black", "Black", "Brown", "Blonde", "Silver", "Brown", "Blonde"],
    eyeColors: ["Black", "Blue", "Brown", "Red", "Silver", "Blue", "Green"],
    openings: ["Caste Room", "Dance in the Fake", "Mirage"]
  });

  add({
    id: "your_name", title: "Your Name (Kimi no Na wa)", genres: ["romance", "fantasy", "drama", "slice of life"],
    creator: "Makoto Shinkai", studio: "CoMix Wave Films", yearStarted: 2016, protagonist: "Mitsuha Miyamizu",
    characters: ["Mitsuha Miyamizu", "Taki Tachibana", "Miki Okudera", "Katsuhiko Teshigawara", "Sayaka Natori", "Yotsuha Miyamizu", "Hitoha Miyamizu", "Futaba Miyamizu", "Tsukasa Fujii", "Shinta Takagi"],
    villains: [],
    abilities: ["Body Swapping", "Time Manipulation (via Red Cord)", "Musubi (Connection Power)"],
    weapons: ["Red Cord", "Kuchikamizake"],
    techniques: ["Body Swap", "Memory App", "Phone Recording", "Drawing Skills"],
    locations: ["Itomori", "Tokyo", "Mountain Shrine", "High School", "Goshiki Lake", "Suga Shrine"],
    organizations: [],
    arcs: ["Body Swap", "Search for Each Other", "Catastrophe Prevention", "Reunion"],
    families: [["Mitsuha Miyamizu", "Yotsuha Miyamizu", "Hitoha Miyamizu"]],
    hairColors: ["Black", "Brown", "Blonde", "Brown", "Black"],
    eyeColors: ["Brown", "Brown", "Blue", "Brown", "Black"],
    openings: ["Yumetourou", "Zen Zen Zense", "Sparkle"]
  });

  add({
    id: "weathering_with_you", title: "Weathering with You", genres: ["romance", "fantasy", "drama", "slice of life"],
    creator: "Makoto Shinkai", studio: "CoMix Wave Films", yearStarted: 2019, protagonist: "Hodaka Morishima",
    characters: ["Hodaka Morishima", "Hina Amano", "Nagi Amano", "Keisuke Suga", "Natsumi Suga", "Tomie", "Yasui", "Takai", "Mitsuha Miyamizu (cameo)", "Taki Tachibana (cameo)"],
    villains: ["Police", "Yakuza"],
    abilities: ["Weather Control", "Sunshine-summoning Prayer", "Clear Sky Powers"],
    weapons: ["Prayer Necklace"],
    techniques: ["Clear Sky Prayer", "Sunshine Summoning", "Weather Modification"],
    locations: ["Tokyo", "Rooftop Shrine", "Yoyogi", "McDonald's", "Amano Residence"],
    organizations: [],
    arcs: ["Meeting", "Weather Business", "Sacrifice", "Rescue"],
    families: [["Hina Amano", "Nagi Amano"]],
    hairColors: ["Brown", "Black", "Brown", "Grey", "Orange"],
    eyeColors: ["Brown", "Blue", "Brown", "Black", "Brown"],
    openings: ["Ai ni Dekiru Koto wa Mada Aru Kai", "Grand Escape", "Kaze no Tadori Tsuku Basho"]
  });

  add({
    id: "suzume", title: "Suzume", genres: ["adventure", "fantasy", "drama", "slice of life"],
    creator: "Makoto Shinkai", studio: "CoMix Wave Films", yearStarted: 2022, protagonist: "Suzume Iwato",
    characters: ["Suzume Iwato", "Souta Munakata", "Daijin (Cat)", "Tamaki Iwato", "Tsubame Iwato", "Rumi Ninomiya", "Chika Amabe", "Miki", "Serizawa"],
    villains: ["Daijin (initially antagonist)", "Ever After Worms"],
    abilities: ["Supernatural Perception", "Lock Picking", "Key of Closure"],
    weapons: ["The Key", "Chair (possessed Souta)"],
    techniques: ["Door Closing", "Locking Away Calamity", "Worm Sealing"],
    locations: ["Kyushu", "Ehime", "Kobe", "Tokyo", "Tohoku", "Abandoned Towns"],
    organizations: [],
    arcs: ["Journey North", "Closure of Doors", "Past Healing", "Final Closure"],
    families: [["Suzume Iwato", "Tamaki Iwato", "Tsubame Iwato"]],
    hairColors: ["Black", "Brown", "White (Cat)", "Black", "Grey"],
    eyeColors: ["Brown", "Green", "Blue", "Brown", "Black"],
    openings: ["Suzume", "Kanata Haluka"]
  });

  add({
    id: "attack_on_titan_school", title: "Attack on Titan: Junior High", genres: ["comedy", "parody", "school"],
    creator: "Hajime Isayama", studio: "Production I.G", yearStarted: 2015, protagonist: "Eren Yeager",
    characters: ["Eren Yeager", "Mikasa Ackerman", "Armin Arlert", "Levi", "Jean", "Connie", "Sasha", "Historia", "Ymir", "Reiner", "Bertholdt", "Annie"],
    villains: [], abilities: ["Titan Power (Parody)", "ODM Gear (Broom)"], weapons: ["Brooms"], techniques: ["Cleaning Titans"],
    locations: ["Junior High", "Classroom", "Cafeteria", "School Roof"],
    organizations: ["Survey Club", "Cooking Club"], arcs: ["School Life", "Festival"],
    families: [], hairColors: ["Black", "Black", "Blonde", "Black"], eyeColors: ["Green", "Black", "Blue", "Grey"],
    openings: ["Guren no Yumiya (Parody)"]
  });

  add({
    id: "dandadan", title: "Dandadan", genres: ["shonen", "supernatural", "comedy", "romance", "sci-fi"],
    creator: "Yukinobu Tatsu", studio: "Science SARU", yearStarted: 2024, protagonist: "Ken Takakura (Okarun)",
    characters: ["Ken Takakura (Okarun)", "Momo Ayase", "Turbo Granny", "Aira Shiratori", "Jin Enjoji", "Seiko Ayase", "Serpoians", "Kinta Akane", "Zuma", "Vamola", "Muko", "Hase", "Rokuro", "Taro", "Tatsu", "Bamora"],
    villains: ["Turbo Granny (initially)", "Serpoians", "Evil Eye", "Kur", "Count Saint-Germain"],
    abilities: ["Turbo Granny Powers", "Psychic Powers", "Spirit Channeling", "Alien Technology"],
    weapons: ["Turbo Granny's Ball", "Golden Ball", "Spirit Guns", "Momo's Psychic Powers"],
    techniques: ["Turbo Dash", "Psychic Blast", "Ghost Form", "Alien Beam", "Spirit Ball"],
    locations: ["High School", "Momo's House", "Tunnel", "Shrine", "Space", "School Festival"],
    organizations: ["Serpoians", "Kur Invasion", "School Paranormal Club"],
    arcs: ["Turbo Granny", "Acrobatic Silky", "Evil Eye", "Space Globalists", "Kaiju", "Kur Invasion"],
    families: [["Momo Ayase", "Seiko Ayase"]],
    hairColors: ["Black", "Black", "Blonde", "Orange", "Blonde", "Purple"],
    eyeColors: ["Brown", "Brown", "Blue", "Green", "Blue", "Red"],
    openings: ["Otonoke"]
  });

  add({
    id: "oshi_no_ko", title: "Oshi no Ko", genres: ["drama", "mystery", "supernatural", "entertainment"],
    creator: "Aka Akasaka & Mengo Yokoyari", studio: "Doga Kobo", yearStarted: 2023, protagonist: "Aqua Hoshino",
    characters: ["Aqua Hoshino", "Ruby Hoshino", "Ai Hoshino", "Kana Arima", "Akane Kurokawa", "Miyako Saito", "Ichigo Saito", "Mem-Cho", "Frills", "Taiki Himekawa", "Crow Girl", "Hikaru Kamiki", "Yura Kichijoji", "Sarina", "Gorou", "Minami Kotobuki", "Toshirou Kindaichi", "Raida", "Abiko Samejima"],
    villains: ["Hikaru Kamiki", "Raida", "Yura Kichijoji"],
    abilities: ["Reincarnation", "Acting", "Singing", "Deduction", "Directing"],
    weapons: ["Intelligence", "Industry Connections", "Acting Skills"],
    techniques: ["Method Acting", "Undercover Investigation", "Entertainment Industry Strategy"],
    locations: ["Tokyo", "Ichigo Production", "Lala Lai Theater", "High School", "Filming Set", "Hospital", "Miyazaki"],
    organizations: ["Ichigo Production", "Lala Lai Theater Company", "B Komachi", "Sweet Today"],
    arcs: ["Prologue: Ai Hoshino", "Reality Dating Show", "2.5D Stage Play", "First Concert", "Mainstay Arc", "Scandal Arc", "Movie Arc"],
    families: [["Aqua Hoshino", "Ruby Hoshino", "Ai Hoshino"], ["Kana Arima", "Mrs. Arima"], ["Akane Kurokawa", "Sagittarius Siblings"]],
    hairColors: ["Black", "Pink", "Purple", "Blonde", "Black", "Orange", "Brown", "Black"],
    eyeColors: ["Blue/White", "Pink/White", "Purple", "Blue", "Yellow", "Red", "Blue", "Green"],
    openings: ["Idol", "Mephisto", "Fatal"]
  });

  add({
    id: "bocchi_the_rock", title: "Bocchi the Rock!", genres: ["comedy", "slice of life", "music"],
    creator: "Aki Hamaji", studio: "CloverWorks", yearStarted: 2022, protagonist: "Hitori Gotoh (Bocchi)",
    characters: ["Hitori Gotoh (Bocchi)", "Nijika Ijichi", "Ryo Yamada", "Ikuyo Kita", "Seika Ijichi", "PA-san", "Kikuri Hiroi", "Futari Gotoh", "Jimichan", "Eliza", "Fukuda"],
    villains: [], abilities: ["Guitar Skills", "Songwriting", "Social Anxiety", "Drumming", "Bass", "Vocal"], weapons: ["Guitar", "Bass", "Drums"],
    techniques: ["Guitar Hero (VR)", "Bocchi's Imagination", "Live Performance"], locations: ["Starway", "High School", "Kikuri's Bar", "Culture Festival", "School Roof", "Recording Studio"],
    organizations: ["Kessoku Band", "SIDEROS", "Ikebe"],
    arcs: ["Formation", "Live House", "Culture Festival", "Band Struggle", "School Festival"], families: [["Hitori Gotoh", "Futari Gotoh", "Naoki Gotoh", "Michiyo Gotoh"]],
    hairColors: ["Pink", "Orange", "Blue", "Yellow", "Grey", "Purple", "Pink"],
    eyeColors: ["Blue", "Yellow", "Blue", "Green", "Black", "Grey", "Pink"],
    openings: ["Seishun Complex", "Hitoribocchi no Tokyo", "Distortion"]
  });

  add({
    id: "jujutsu_kaisen_0", title: "Jujutsu Kaisen 0", genres: ["shonen", "dark fantasy", "action"],
    creator: "Gege Akutami", studio: "MAPPA", yearStarted: 2021, protagonist: "Yuta Okkotsu",
    characters: ["Yuta Okkotsu", "Rika Orimoto", "Satoru Gojo", "Maki Zenin", "Panda", "Toge Inumaki", "Suguru Geto", "Miguel", "Nanako Hasaba", "Mimiko Hasaba", "Kiyoshi Kamo"],
    villains: ["Suguru Geto", "Miguel"],
    abilities: ["Rika Orimoto", "Copy Technique", "Immense Cursed Energy", "Cursed Speech"],
    weapons: ["Katana (Cursed Tool)"],
    techniques: ["Copy: Cursed Speech", "Rika's Full Manifestation", "Love Beam", "Cursed Energy Blast"],
    locations: ["Tokyo Jujutsu High", "Night Parade of 100 Demons", "Shinjuku", "Jujutsu High"],
    organizations: ["Jujutsu High", "Geto's Followers"],
    arcs: ["Cursed Child", "Night Parade of 100 Demons"],
    families: [["Yuta Okkotsu", "Rika Orimoto"]],
    hairColors: ["Black", "Brown", "White", "Black"],
    eyeColors: ["Blue", "Yellow", "Blue", "Black"],
    openings: ["Ichizu", "Greatest Strength"]
  });

  add({
    id: "tokyo_revengers", title: "Tokyo Revengers", genres: ["shonen", "drama", "sci-fi", "delinquent"],
    creator: "Ken Wakui", studio: "Liden Films", yearStarted: 2021, protagonist: "Takemichi Hanagaki",
    characters: ["Takemichi Hanagaki", "Manjiro Sano (Mikey)", "Ken Ryuguji (Draken)", "Naoto Tachibana", "Hinata Tachibana", "Chifuyu Matsuno", "Kazutora Hanemiya", "Keisuke Baji", "Shuji Hanma", "Izana Kurokawa", "Taiju Shiba", "Hakkai Shiba", "Yuzuha Shiba", "Sanzu Haruchiyo", "Kakucho", "Kisaki Tetta", "Mitsuya Takashi", "Emma Sano", "Pah-chin", "Peh-yan", "Smiley", "Angry"],
    villains: ["Kisaki Tetta", "Shuji Hanma", "Kazutora Hanemiya", "Izana Kurokawa", "Taiju Shiba"],
    abilities: ["Time Leap", "Fist Fighting", "Leadership", "Bike Skills"],
    weapons: ["Fists", "Metal Bat", "Chains", "Bikes"],
    techniques: ["Time Leap Trigger", "Future Saving", "Delinquent Brawl", "Bike Chase"],
    locations: ["Tokyo", "Shinjuku", "Musashi", "Toman HQ", "Shiba Shrine", "Kanto", "Jukkai"],
    organizations: ["Tokyo Manji Gang (Toman)", "Valhalla", "Black Dragon", "Tenjiku", "Kanto Manji Gang", "Moebius"],
    arcs: ["Beginning", "Valhalla", "Black Dragon", "Tenjiku", "Kanto Manji", "Final Arc"],
    families: [["Manjiro Sano", "Ken Ryuguji", "Emma Sano"], ["Hinata Tachibana", "Naoto Tachibana"], ["Taiju Shiba", "Hakkai Shiba", "Yuzuha Shiba"]],
    hairColors: ["Black", "Black", "Blonde", "Black", "Black", "White", "Blonde", "Black", "Blonde", "Grey", "Brown"],
    eyeColors: ["Brown", "Black", "Brown", "Brown", "Black", "Black", "Blue", "Red", "Blue", "Black", "Brown"],
    openings: ["Cry Baby", "White Noise", "Kizuna no Kiseki", "Say My Name"]
  });

  add({
    id: "haikyuu", title: "Haikyuu!!", genres: ["sports", "shonen", "comedy", "drama"],
    creator: "Haruichi Furudate", studio: "Production I.G", yearStarted: 2014, protagonist: "Shoyo Hinata",
    characters: ["Shoyo Hinata", "Tobio Kageyama", "Daichi Sawamura", "Koshi Sugawara", "Asahi Azumane", "Yu Nishinoya", "Ryunosuke Tanaka", "Kei Tsukishima", "Tadashi Yamaguchi", "Chikara Ennoshita", "Kazuhito Narita", "Hisashi Kinoshita", "Kiyoko Shimizu", "Hitoka Yachi", "Ittetsu Takeda", "Keishin Ukai", "Toru Oikawa", "Tooru Oikawa", "Hajime Iwaizumi", "Kotaro Bokuto", "Keiji Akaashi", "Wakatoshi Ushijima", "Eita Semi", "Satori Tendo", "Tetsuro Kuroo", "Kenma Kozume", "Morisuke Yaku", "Shohei Fukunaga", "Shinji Kominato", "Takashi Naoi"],
    villains: [],
    abilities: ["Jumping", "Setting", "Spiking", "Receiving", "Blocking", "Serving", "Floor Defense"],
    weapons: ["Volleyball", "Net", "Athletic Shoes"],
    techniques: ["Quick Attack (Freak Quick)", "Jump Serve", "Block", "Rolling Thunder", "Bokuto's Wipe", "Oikawa's Serve", "Ushijima's Spike", "Kageyama's Perfect Set"],
    locations: ["Karasuno High", "Nekoma High", "Aoba Johsai High", "Shiratorizawa High", "Fukurōdani High", "Inarizaki High", "Kamiomedai High", "National Tournament Arenas"],
    organizations: ["Karasuno Boys' Volleyball Club", "Nekoma", "Aoba Johsai", "Shiratorizawa", "Fukurodani", "Inarizaki", "Dateko"],
    arcs: ["Preliminary Rounds", "Inter-high", "Spring Nationals", "Tokyo Expedition", "Battle at the Dumpster", "Kamomedai"],
    families: [["Shoyo Hinata", "Natsu Hinata", "Saeko Tanaka"]],
    hairColors: ["Orange", "Black", "Brown", "Grey", "Black", "Brown", "Blonde", "Black", "Brown", "Silver", "Red", "Black"],
    eyeColors: ["Brown", "Blue", "Brown", "Brown", "Brown", "Black", "Golden", "Green", "Hazel", "Blue", "Black", "Brown"],
    openings: ["Imagination", "Fly High", "Hikari Are", "Phoenix", "Youth"]
  });

  add({
    id: "kurokos_basketball", title: "Kuroko's Basketball", genres: ["sports", "shonen", "school"],
    creator: "Tadatoshi Fujimaki", studio: "Production I.G", yearStarted: 2012, protagonist: "Tetsuya Kuroko",
    characters: ["Tetsuya Kuroko", "Taiga Kagami", "Seijuro Akashi", "Daiki Aomine", "Shintaro Midorima", "Ryota Kise", "Atsushi Murasakibara", "Junpei Hyuga", "Shun Izuki", "Ryo Sakurai", "Koki Furuhata", "Satoshi Tsuchida", "Yoshinori Susa", "Hiroshi Fukuda", "Tatsuya Himuro", "Haizaki Shogo", "Kazunari Takao", "Alex Garcia"],
    villains: [], abilities: ["Misunderstood Direction", "Vanishing Drive", "Emperor Eye", "Perfect Copy", "Zone", "Meteor Jam", "Full Court Shot"],
    weapons: ["Basketball"],
    techniques: ["Misdirection", "Vanishing Drive", "Zigzag Dribble", "Ignite Pass", "Emperor Eye", "Zone", "Perfect Copy", "Meteor Jam", "Murasakibara's Defense"],
    locations: ["Seirin High", "Teiko Middle", "Yosen High", "Shutoku High", "Kaijo High", "Touou Academy", "Rakuzan High", "Interhigh Arena", "Winter Cup Arena"],
    organizations: ["Seirin Basketball Team", "Generation of Miracles", "Teiko", "Kaijo", "Touou", "Shutoku", "Yosen", "Rakuzan", "Jabberwock"],
    arcs: ["Teiko Arc", "Interhigh", "Winter Cup", "Seirin vs Kaijo", "Seirin vs Touou", "Seirin vs Yosen", "Seirin vs Rakuzan", "EXTRA GAME (Jabberwock)"],
    families: [["Taiga Kagami", "Tatsuya Himuro"]],
    hairColors: ["Blue", "Red", "Red/Blue", "Black", "Green", "Orange", "Purple", "Black", "Blue", "Silver"],
    eyeColors: ["Blue", "Red", "Red/Blue", "Black", "Green", "Orange", "Purple", "Black", "Blue", "Grey"],
    openings: ["Can Do", "RIMFIRE", "The Other Self", "Punky Funk Baby", "ZERO", "Glorious Days"]
  });

  add({
    id: "food_wars", title: "Food Wars! Shokugeki no Soma", genres: ["shonen", "cooking", "comedy", "ecchi"],
    creator: "Tsukasa Fushimi & Yuto Tsukuda", studio: "J.C.Staff", yearStarted: 2015, protagonist: "Soma Yukihira",
    characters: ["Soma Yukihira", "Erina Nakiri", "Ikumi Mito", "Megumi Tadokoro", "Takumi Aldini", "Isami Aldini", "Hisako Arato", "Alice Nakiri", "Ryo Kurokiba", "Akira Hayama", "Satoshi Isshiki", "Terunori Kuga", "Joichiro Yukihira", "Senzaemon Nakiri", "Azami Nakiri", "Momo Akanegakubo", "Saito Tosuke", "Eizan Etsuya", "Subaru Mimasaka", "Nao Sadatsuka"],
    villains: ["Azami Nakiri", "Eizan Etsuya", "Subaru Mimasaka (initially)"],
    abilities: ["Cooking Genius", "Superhuman Taste", "God's Tongue", "Cooking Instinct", "Knife Skills"],
    weapons: ["Chef's Knife", "Cooking Utensils", "Seasoning"],
    techniques: ["Yukihira Style Cooking", "Improvisational Cuisine", "Challenger's Spirit", "Flavoring Combos", "Tasting Analysis"],
    locations: ["Totsuki Culinary Academy", "Polar Star Dormitory", "Totsuki Resort", "Moon Festival", "Central Kitchen", "Restaurant Yukihira"],
    organizations: ["Totsuki Culinary Academy", "Polar Star Dorm", "Central", "Rebels (Elite Ten Resistance)", "Nakiri Family"],
    arcs: ["Totsuki Academy", "Autumn Elections", "Stagiaire", "Moon Festival", "Central Rupture", "BLUE"],
    families: [["Soma Yukihira", "Joichiro Yukihira", "Tamako Yukihira"], ["Erina Nakiri", "Azami Nakiri", "Senzaemon Nakiri", "Alice Nakiri"], ["Takumi Aldini", "Isami Aldini"]],
    hairColors: ["Red", "Blonde", "Pink", "Green", "Blonde", "Red", "Silver", "White", "Black", "Black", "Green", "Purple"],
    eyeColors: ["Red", "Gold", "Pink", "Green", "Blue", "Red", "Silver", "Blue", "Black", "Black", "Green", "Purple"],
    openings: ["Kibou no Uta", "Brave Lip", "Rough Diamonds", "Spice", "Chronostasis"]
  });

  add({
    id: "sao", title: "Sword Art Online", genres: ["isekai", "action", "sci-fi", "romance", "gaming"],
    creator: "Reki Kawahara", studio: "A-1 Pictures", yearStarted: 2012, protagonist: "Kirito", powerSystem: "Sword Skills",
    characters: ["Kirito (Kirigaya Kazuto)", "Asuna Yuuki", "Yui", "Klein", "Agil", "Silica", "Lisbeth", "Sinon", "Leafa (Suguha Kirigaya)", "Heathcliff (Kayaba Akihiko)", "Eugeo", "Alice Zuberg", "Quinella", "Cardinal", "Bercouli", "Fanatio", "Deusolbert", "Sheyta", "Iskahn", "Gabriel Miller", "Vassago Casals", "PoH", "Death Gun", "Kyouji Shinkawa", "Mito", "Kuradeel"],
    villains: ["Kayaba Akihiko", "Death Gun", "PoH", "Gabriel Miller", "Quinella", "Sugou Nobuyuki", "Kuradeel"],
    abilities: ["Dual Blades", "Reactor", "Incarnation", "Starburst Stream", "Gun Gale Online", "Fairy Dance", "Ice Magic"],
    weapons: ["Elucidator", "Dark Repulser", "Lambent Light", "Kagemitsu G4", "Annihilate Ray", "Blue Rose Sword", "Night Sky Sword", "Fragrant Olive"],
    techniques: ["Starburst Stream", "Vorpal Strike", "Eclipse", "Mother's Rosario", "Incarnation", "Aincrad Style", "Release Recollection"],
    locations: ["Aincrad", "ALfheim", "Gun Gale Online", "Underworld", "Ratatosk", "Central Cathedral", "Great Eastern Empire", "Gloomis", "Rulid Village"],
    organizations: ["Knights of the Blood Oath", "Sleeping Knights", "Army of Light", "Dark Territory", "Integrity Knights", "Japan SDF", "Glowgen Defense Systems"],
    arcs: ["Aincrad", "Fairy Dance", "Phantom Bullet", "Calibur", "Mother's Rosario", "Alicization", "Alicization: Underworld", "Unital Ring"],
    families: [["Kirito", "Suguha Kirigaya", "Yui"], ["Asuna Yuuki", "Shouzou Yuuki", "Kyouko Yuuki"], ["Eugeo", "Alice Zuberg"]],
    hairColors: ["Black", "Blonde", "Gold", "Pink", "Orange", "Blue", "Brown", "Grey", "Silver", "Purple", "Black", "Red"],
    eyeColors: ["Black", "Brown", "Gold", "Green", "Brown", "Blue", "Green", "Blue", "Amber", "Brown", "Red", "Amber"],
    openings: ["Crossing Field", "Innocence", "Ignite", "Courage", "Adamas", "Resolution", "Anima", "Iris"]
  });

  add({
    id: "noragami", title: "Noragami", genres: ["shonen", "supernatural", "action", "comedy"],
    creator: "Adachitoka", studio: "Bones", yearStarted: 2014, protagonist: "Yato",
    characters: ["Yato", "Hiyori Iki", "Yukine", "Bishamon", "Kazuma", "Kofuku", "Daikoku", "Ebisu", "Takemikazuchi", "Nora", "Kugaha", "Kiun", "Aiha", "Mao", "Kuraha", "Tsuyu", "Okinu", "Mihashira", "Kazuma", "Suunahiko"],
    villains: ["Nora", "Kugaha", "Father (Phantom)", "Takemikazuchi (initially)"],
    abilities: ["Divine Powers", "Weapon Manifestation", "New Name", "Healing", "Border Crossing"],
    weapons: ["Shinki (Regalia - Yukine)", "Shinki (Various)", "Sacred Treasure"],
    techniques: ["Weapon Transformation: Yukine", "Divine Slash", "Blessing", "Fixing (Loose Ends)"],
    locations: ["Far Shore", "Near Shore", "Hiyori's Home", "Yato's Hideout", "Heaven's Court", "Heaven", "Earth"],
    organizations: ["Heavenly Assembly", "Seven Gods of Fortune", "Yato's Shrines"],
    arcs: ["Hiyori", "Yukine", "Bishamon Arc", "Heavenly Trail", "Yomi Arc"],
    families: [["Yato", "Father", "Sakura"], ["Hiyori Iki", "Hiyori's Parents"]],
    hairColors: ["Blue", "Brown", "White", "Blonde", "Brown", "Pink", "Black", "Red"],
    eyeColors: ["Blue", "Brown", "White", "Blue", "Brown", "Red", "Black", "Green"],
    openings: ["Goya no Machiawase", "The Audience", "Noragami", "Labyrinth"]
  });

  add({
    id: "psychopass", title: "Psycho-Pass", genres: ["sci-fi", "psychological", "crime", "thriller"],
    creator: "Gen Urobuchi", studio: "Production I.G", yearStarted: 2012, protagonist: "Akane Tsunemori",
    characters: ["Akane Tsunemori", "Shinya Kogami", "Nobuchika Ginoza", "Sakuya Togane", "Yayoi Kunizuka", "Shion Karanomori", "Shusei Kagari", "Masaoka", "Mitsuru Sasayama", "Joshu Kasei", "Shogo Makishima", "Choe Gu-sung", "Mika Shimotsuki", "Kamui Kirito", "Akira Tsunemori"],
    villains: ["Shogo Makishima", "Kamui Kirito"],
    abilities: ["Crime Coefficient Measurement", "Dominator", "Holographic Analysis", "Deduction", "Investigation"],
    weapons: ["Dominator (Pistol)", "Eliminator", "Exoskeleton"],
    techniques: ["Dominator Setting: Lethal Eliminator", "Dominator Setting: Non-Lethal Paralyzer", "Decomposer", "Investigation Analysis"],
    locations: ["Tokyo (Sibyl System)", "MWPSB HQ", "Tsunemori Residence", "Outsider Area", "Mongrel Island"],
    organizations: ["Sibyl System", "MWPSB (Ministry of Welfare PSB)", "Police", "Outsiders"],
    arcs: ["S1 Makishima", "S2 Kirito", "S3 Global Crime", "Movie: Providence"],
    families: [["Akane Tsunemori", "Akira Tsunemori"]],
    hairColors: ["Black", "Brown", "Black", "Grey", "Red", "Purple", "Black"],
    eyeColors: ["Brown", "Blue", "Black", "Black", "Brown", "Purple", "Blue"],
    openings: ["abnormalize", "Enigmatic Feeling", "Q-vism", "All Alone With You"]
  });

  add({
    id: "bunny_girl_senpai", title: "Rascal Does Not Dream of Bunny Girl Senpai", genres: ["romance", "supernatural", "comedy", "drama"],
    creator: "Hajime Kamoshida", studio: "CloverWorks", yearStarted: 2018, protagonist: "Sakuta Azusagawa",
    characters: ["Sakuta Azusagawa", "Mai Sakurajima", "Kaede Azusagawa", "Tomoe Koga", "Rio Futaba", "Nodoka Toyohama", "Shoko Makinohara", "Saki Kamisato", "Yuma Kunimi", "Hirokazu Gonda", "Fumika Nanjo", "Sarasa Haramura", "Hikari Tsunashi"],
    villains: [],
    abilities: ["Puberty Syndrome Detection", "Deduction", "Emotional Connection", "Adolescence Supernatural"],
    weapons: ["Smartphone", "Knowledge of Quantum Mechanics"],
    techniques: ["Adolescence Syndrome Resolution", "Timeline Observation", "Emotional Resonance"],
    locations: ["Fujisawa", "Enoshima", "Shichirigahama High School", "Mai's Agency", "Kaede's Apartment", "Library", "Aquarium", "Beach"],
    organizations: ["Shichirigahama High School", "Fujisawa Yacht Club"],
    arcs: ["Mai Sakurajima (Bunny Girl)", "Kaede Azusagawa (Sister)", "Tomoe Koga (Lover)", "Rio Futaba (Friend)", "Nodoka Toyohama (Little Sister Rival)", "Shoko Makinohara (Dreaming Girl)"],
    families: [["Sakuta Azusagawa", "Kaede Azusagawa"], ["Mai Sakurajima", "Nodoka Toyohama"]],
    hairColors: ["Brown", "Black", "Light Brown", "Blonde", "Black", "Brown", "Black", "Blonde"],
    eyeColors: ["Brown", "Blue", "Brown", "Blue", "Black", "Brown", "Brown", "Green"],
    openings: ["Kiminosei", "Fukashiki no Carte", "Iza Going", "Kaede no uta"]
  });

  add({
    id: "violet_evergarden", title: "Violet Evergarden", genres: ["drama", "fantasy", "slice of life", "romance"],
    creator: "Kana Akatsuki", studio: "Kyoto Animation", yearStarted: 2018, protagonist: "Violet Evergarden",
    characters: ["Violet Evergarden", "Gilbert Bougainvillea", "Claudia Hodgins", "Cattleya Baudelaire", "Benedict Blue", "Iris Canary", "Erica Brown", "Roland", "Anne Magnolia", "Leon Stephanotis", "Oscar Webster", "Aiden Field", "Spoiler", "Charlotte Eberbach", "Dietfried Bougainvillea"],
    villains: [],
    abilities: ["Auto Memory Doll", "Writing", "Combat Skills", "Emotional Intelligence", "Typewriter Mastery"],
    weapons: ["Typewriter", "Combat Knife", "Auto Memory Doll Brooch"],
    techniques: ["Emotional Letter Writing", "Ghostwriting", "Mail Delivery", "Combat Reflexes"],
    locations: ["Leiden", "CH Postal Company", "Auto Memory Doll Agency", "Bougainvillea Estate", "Lighthouse Islands", "Railway Town", "Sanctuary of the Eternal"],
    organizations: ["CH Postal Company", "Auto Memory Doll Agency", "Leiden Military"],
    arcs: ["Becoming a Doll", "Love Letters", "Theater Script", "Ghost of the Past", "Gilbert's Truth"],
    families: [["Violet Evergarden", "Gilbert Bougainvillea"], ["Anne Magnolia", "Clara Magnolia"]],
    hairColors: ["Blonde", "Brown", "Grey", "Red", "Blonde", "Green", "Brown"],
    eyeColors: ["Blue", "Blue", "Grey", "Blue", "Green", "Brown", "Brown"],
    openings: ["Sincerely", "Michishirube", "Believe In", "Echo"]
  });

  add({
    id: "hellsing", title: "Hellsing Ultimate", genres: ["seinen", "horror", "action", "supernatural"],
    creator: "Kouta Hirano", studio: "Graphinica / Satelight", yearStarted: 2006, protagonist: "Alucard",
    characters: ["Alucard", "Integra Hellsing", "Seras Victoria", "Walter C Dornez", "Pip Bernadotte", "Alexander Anderson", "The Major (Montana Max)", "Doctor", "Schrodinger", "Zorin Blitz", "Rip Van Winkle", "Tubalcain Alhambra", "Enrico Maxwell", "Yumie", "Harkonnen", "Heinkel Wolfe", "Luke Valentine", "Jan Valentine", "Capitain Hans"],
    villains: ["The Major", "Alexander Anderson", "Millennium", "Enrico Maxwell", "Luke Valentine", "Jan Valentine"],
    abilities: ["Vampire Powers", "Regeneration", "Familiar Control", "Shadow Manipulation", "Teleportation", "Bayonet Combat"],
    weapons: ["Jackal (Pistol)", "Casull (Pistol)", "Harkonnen (Anti-tank Cannon)", "Bayonets", "Blessed Bayonets"],
    techniques: ["Restraint Level Zero", "Release Control Art", "Familiar Summoning", "Drain Power", "Shadow Teleportation"],
    locations: ["Hellsing Manor", "London", "Brazil", "Warsaw", "The Eagle (Zeppelin)", "Vatican", "Iscariot HQ"],
    organizations: ["Hellsing Organization", "Iscariot (Vatican)", "Millennium (Nazi)", "FREAK", "Wild Geese"],
    arcs: ["The Invaders", "Rip Van Winkle", "Zorin Blitz", "London Battle", "The Dawn"],
    families: [["Integra Hellsing", "Arthur Hellsing"]],
    hairColors: ["Black", "Blonde", "Red", "Brown", "Grey", "White", "Blonde"],
    eyeColors: ["Red", "Blue", "Red", "Brown", "Green", "Brown", "Black"],
    openings: ["The World Without Logos", "Let Me Hear"]
  });

  add({
    id: "clannad", title: "Clannad / Clannad After Story", genres: ["romance", "drama", "slice of life", "school"],
    creator: "Key / Visual Arts", studio: "Kyoto Animation", yearStarted: 2007, protagonist: "Tomoya Okazaki",
    characters: ["Tomoya Okazaki", "Nagisa Furukawa", "Kyou Fujibayashi", "Ryou Fujibayashi", "Tomoyo Sakagami", "Kotomi Ichinose", "Fuko Ibuki", "Yukine Miyazawa", "Akio Furukawa", "Sanae Furukawa", "Youhei Sunohara", "Boh-chan", "Misae Sagara", "Kappei Hiiragi", "Toshio Koumura", "Ushio Okazaki", "Shino Okazaki", "Katsuki Shima"],
    villains: [],
    abilities: ["Baseball", "Acting", "Musical Talent", "Guitar Playing", "Intelligence", "Artistic Talent", "Cooking"],
    weapons: [], techniques: ["Nagisa's Encouragement", "Dango Daikazoku Song", "Sunohara's Comedy", "Fuko's Carving"],
    locations: ["Hikarizaka High School", "Furukawa Bakery", "School Theater", "Library", "Baseball Field", "Snowy Road", "Flower Field"],
    organizations: ["Drama Club", "School Band"],
    arcs: ["School Life", "Fuko Arc", "Kotomi Arc", "Tomoyo Arc", "Kyou Arc", "After Story: Nagisa Arc", "After Story: Ushio Arc", "Alternative World"],
    families: [["Tomoya Okazaki", "Nagisa Furukawa", "Ushio Okazaki", "Akio Furukawa", "Sanae Furukawa"], ["Kyou Fujibayashi", "Ryou Fujibayashi"]],
    hairColors: ["Brown", "Brown", "Purple", "Purple", "Silver", "Brown", "Blonde", "Brown", "Brown", "Brown", "Orange"],
    eyeColors: ["Blue", "Brown", "Purple", "Purple", "Silver", "Brown", "Blue", "Green", "Brown", "Brown", "Blue"],
    openings: ["Mag Mell", "Toki wo Kizamu Uta", "Chiisana Te no Hira", "Nagisa (Clannad)", "Da capo II"]
  });

  add({
    id: "angel_beats", title: "Angel Beats!", genres: ["action", "comedy", "drama", "supernatural"],
    creator: "Jun Maeda", studio: "Key / P.A. Works", yearStarted: 2010, protagonist: "Yuzuru Otonashi",
    characters: ["Yuzuru Otonashi", "Yuri Nakamura", "Angel (Kanade Tachibana)", "Hideki Hinata", "Takamatsu", "Noda", "Miyuki Irie", "Shiina", "Ooyama", "Yui", "Matsushita", "TK", "Chaa", "Fujimaki", "Seki", "Takeyama", "Iwatsuki", "Hisako", "Suzuki", "Kazuki"],
    villains: ["Angel / Kanade (initially)"],
    abilities: ["Soul Regeneration", "Guild Weapons", "Angel Player Program", "Martial Arts", "Hand Sonic", "Distortion", "Delay", "Howling"],
    weapons: ["Hand Sonic", "Guild Guns", "Swords", "Snipers", "Guerrilla Gear", "Yuri's Pistol"],
    techniques: ["Hand Sonic", "Distortion", "Delay", "Howling", "Angel Player Hack", "Guild Assault", "Guerrilla Tactics"],
    locations: ["Afterlife School", "Guild", "Battlefield", "Baseball Field", "Dining Hall", "Nurse's Office", "School Rooftop", "Library"],
    organizations: ["Afterlife Battlefront (SSS)", "Guild", "Student Council", "Girls Dead Monster (Band)"],
    arcs: ["Battlefront Formation", "Guild Collapse", "Yui's Wish", "Angel's Truth", "Graduation"],
    families: [["Yuzuru Otonashi", "Kanade Tachibana"], ["Yuri Nakamura", "Ayato Nakamura"]],
    hairColors: ["Brown", "Brown", "Silver", "Blue", "Brown", "Blonde", "Black", "Green", "Red", "Pink", "Orange"],
    eyeColors: ["Brown", "Red", "Gold", "Blue", "Black", "Blue", "Green", "Green", "Brown", "Blue", "Black"],
    openings: ["My Soul, Your Beats!", "Brave Song", "Ichiban no Takaramono"]
  });

  add({
    id: "demon_slayer_mugen", title: "Demon Slayer: Mugen Train", genres: ["shonen", "dark fantasy", "action"],
    creator: "Koyoharu Gotouge", studio: "Ufotable", yearStarted: 2020, protagonist: "Tanjiro Kamado",
    characters: ["Tanjiro Kamado", "Nezuko Kamado", "Zenitsu Agatsuma", "Inosuke Hashibira", "Kyojuro Rengoku", "Enmu", "Akaza", "Rengoku Father", "Senjuro Rengoku", "Tamayo", "Yushiro"],
    villains: ["Enmu", "Akaza", "Muzan Kibutsuji"],
    abilities: ["Flame Breathing", "Water Breathing", "Thunder Breathing", "Beast Breathing", "Hinokami Kagura"],
    weapons: ["Nichirin Sword (Flame)", "Tanjiro's Sword", "Nezuko's Blood Art"],
    techniques: ["Flame Breathing 9th Form: Rengoku", "Hinokami Kagura", "Thunder Breathing 1st Form", "Beast Breathing 1st Fang"],
    locations: ["Mugen Train", "Yoshiwara (Entertainment District)", "Rengoku Estate"],
    organizations: ["Demon Slayer Corps", "Hashira"],
    arcs: ["Mugen Train"],
    families: [["Kyojuro Rengoku", "Senjuro Rengoku", "Shinjuro Rengoku"]],
    hairColors: ["Red", "Black", "Blonde", "Black", "Red"],
    eyeColors: ["Red", "Pink", "Yellow", "Blue", "Gold"],
    openings: ["Homura (LiSA)", "Akeboshi"]
  });

  add({
    id: "wonder_egg_priority", title: "Wonder Egg Priority", genres: ["psychological", "drama", "fantasy", "horror"],
    creator: "Shinji Nojima", studio: "CloverWorks", yearStarted: 2021, protagonist: "Ai Ohto",
    characters: ["Ai Ohto", "Neiru Aonuma", "Momoe Sawaki", "Rika Kawai", "Koito Nagase", "Acca", "Ura-Acca", "Mrs. Ohto", "Miyo Igarashi", "Chiemi", "Haruka", "Minami"],
    villains: ["Wonder Killers", "Sawaki's Father"],
    abilities: ["Wonder Egg Entry", "Dream World Weapon", "Egg Girl Summoning"],
    weapons: ["Pen Knife", "Wonder World Items", "Dreamer's Weapon"],
    techniques: ["Egg Breaking", "Wonder World Battle", "Friend Rescue"],
    locations: ["Dream World", "Ai's School", "Pet Shop", "Museum", "Hospital", "Aquarium"],
    organizations: ["Egg Girls"] as string[],
    arcs: ["Each Girl's Trauma", "Separation", "Reunion", "Wonder World Truth", "Final Arc"],
    families: [["Ai Ohto", "Mrs. Ohto", "Koito Nagase"], ["Rika Kawai", "Rika's Mother"]],
    hairColors: ["Blue/White", "Purple", "Orange/Green", "Pink/Blue"],
    eyeColors: ["Blue", "Purple", "Heterochromia", "Red"],
    openings: ["Sudachi no Uta", "Lapis"]
  });

  add({
    id: "kaguya_sama", title: "Kaguya-sama: Love is War", genres: ["romance", "comedy", "psychological", "school"],
    creator: "Aka Akasaka", studio: "A-1 Pictures", yearStarted: 2019, protagonist: "Miyuki Shirogane",
    characters: ["Miyuki Shirogane", "Kaguya Shinomiya", "Chika Fujiwara", "Yu Ishigami", "Miko Iino", "Ai Hayasaka", "Kei Shirogane", "Nagisa Kashiwagi", "Tsubasa Tanuma", "Kobachi Osaragi", "Koromo Shindou", "Maki Shijo", "Tsubame Koyasu", "Miyu", "Shiranui", "Karen Kino", "Erika Kose", "Shirogane's Father", "Dio"],
    villains: [],
    abilities: ["Strategic Genius", "Psychological Warfare", "Seduction Tactics", "Debate", "Academic Excellence"],
    weapons: ["Smartphone", "Mind Games", "Romantic Strategies"],
    techniques: ["War of Love and Intellect", "Psychological Trap", "Ultra Romantic Offensive", "Love Detective Chika"],
    locations: ["Shuchiin Academy", "Student Council Room", "Kaguya's Mansion", "Shirogane Residence", "School Festival", "Aquarium", "Culture Festival", "Theme Park", "Kyoto Trip"],
    organizations: ["Shuchiin Academy Student Council", "Shinomiya Group", "Shirogane Family"],
    arcs: ["First Term", "Culture Festival", "Kyoto Trip", "Ishigami Arc", "Dual Confessions", "Final Arc"],
    families: [["Miyuki Shirogane", "Kei Shirogane", "Shirogane's Father"], ["Kaguya Shinomiya", "Gan'an Shinomiya", "Unra Shinomiya"], ["Yu Ishigami", "Ishigami Parents"]],
    hairColors: ["Black", "Black", "Brown", "Black", "Orange", "Blonde", "Brown", "Blonde", "Brown", "Black"],
    eyeColors: ["Black", "Red", "Blue", "Green", "Orange", "Blue", "Brown", "Blue", "Brown", "Green"],
    openings: ["Love Dramatic", "Daddy! Daddy! Do!", "Girlish Love", "Broken Love", "My Love"]
  });

  add({
    id: "overlord_ii", title: "Overlord II", genres: ["isekai", "dark fantasy", "action"],
    creator: "Kugane Maruyama", studio: "Madhouse", yearStarted: 2018, protagonist: "Ainz Ooal Gown",
    characters: ["Ainz Ooal Gown", "Albedo", "Shalltear Bloodfallen", "Demiurge", "Cocytus", "Sebas Tian", "Aura Bella Fiora", "Mare Bello Fiore", "Victim", "Gargantua", "Pandora's Actor", "Yuri Alpha", "Lupusregina Beta", "CZ2128 Delta", "Narberal Gamma", "Shizu", "Entoma", "Solution Epsilon"],
    villains: ["Slane Theocracy", "Black Scripture", "Re-Estize Kingdom", "Bahad (Demon)"],
    abilities: ["Overlord Magic", "Protection of Nazarick", "Divine Powers", "Fallen Powers"],
    weapons: ["Staff of Ainz Ooal Gown", "Spuit Lance", "Halberd", "Shield of Nazarick"],
    techniques: ["Super-Tier Magic", "Grasp Heart", "Time Stop", "Black Hole", "Reality Slash"],
    locations: ["Great Tomb of Nazarick", "E-Rantel", "Carne Village", "Re-Estize Kingdom", "Katze Plains", "Lizardman Village"],
    organizations: ["Great Tomb of Nazarick", "Sorcerer Kingdom", "Re-Estize Kingdom"],
    arcs: ["Lizardman Arc", "Holy Kingdom Arc", "Invasion of the Re-Estize"],
    families: [["Albedo", "Ainz Ooal Gown"]],
    hairColors: ["Black", "Black", "Silver", "Black", "Grey", "Silver", "Brown"],
    eyeColors: ["Red", "Yellow", "Red", "Yellow", "Blue", "Red", "Blue"],
    openings: ["Go Cry Go", "Silent Solitude", "VORACITY"]
  });

  add({
    id: "mushoku_tensei_ii", title: "Mushoku Tensei Season 2", genres: ["isekai", "fantasy", "drama", "adventure"],
    creator: "Rifujin na Magonote", studio: "Studio Bind", yearStarted: 2023, protagonist: "Rudeus Greyrat",
    characters: ["Rudeus Greyrat", "Sylphiette", "Fitz", "Elinalise Dragonroad", "Mir", "Orsted", "Nanahoshi", "Roxy Migurdia", "Eris Boreas Greyrat", "Soldat Heckler", "Cliff Grimoire", "Zanoba Shirone", "Julie", "Counter Arrow", "Elinaus Dragonroad", "Talhand", "Ginger", "Badi Gigino"],
    villains: ["Hitogami (Man-God)", "Orsted (initially)"],
    abilities: ["Magic", "Healing Magic", "Sword God Style", "North God Style", "Water God Style", "Foresight Eye"],
    weapons: ["Staff", "Sword", "Magic Gauntlet", "Magic Armor"],
    techniques: ["Quagmire", "Electric", "Saint-Class Magic", "Sword of Light", "Water Saint Magic"],
    locations: ["Ranoa University of Magic", "Asura Kingdom", "Boreas Territory", "Shirone Kingdom", "Begaritt Continent", "Demon Continent"],
    organizations: ["Ranoa University", "Counter Arrow", "Dead End"],
    arcs: ["Ranoa University Arc", "Shirone Arc", "Labyrinth Arc"],
    families: [["Rudeus Greyrat", "Sylphiette"], ["Roxy Migurdia", "Eris Boreas Greyrat"]],
    hairColors: ["Brown", "Green", "Blue", "Red", "Black"],
    eyeColors: ["Brown", "Green", "Blue", "Red", "Blue"],
    openings: ["Spiral", "Hikari no Nai Machi"]
  });

  add({
    id: "lycoris_recoil", title: "Lycoris Recoil", genres: ["action", "slice of life", "comedy", "spy"],
    creator: "Yoshimasa Konda", studio: "A-1 Pictures", yearStarted: 2022, protagonist: "Chisato Nishikigi",
    characters: ["Chisato Nishikigi", "Takina Inoue", "Mizuki Nakahara", "Kurumi (Walnut)", "Mika", "Yoshimatsu", "Shinji Yoshimatsu", "Robota", "Fuki Harukawa", "Sakura Otome", "Erika", "Mai", "Himari", "Miyako", "Minato Kiritani"],
    villains: ["Shinji Yoshimatsu", "Robota", "Alan Institute"],
    abilities: ["Superhuman Reflexes", "Marksmanship", "Spy Skills", "Hacking", "Intelligence"],
    weapons: ["Rubber Bullets", "Pistol", "Sniper Rifle", "Gadgets"],
    techniques: ["Non-lethal Combat", "Quick Draw", "Disarm", "Information Extraction"],
    locations: ["Lycoris Recoil Cafe", "Tokyo", "Cafe Lily Belle", "Daikoku", "Odaiba", "Beach"],
    organizations: ["DA (Direct Attack)", "Lycoris", "Alan Institute", "Dictator"],
    arcs: ["Takina's Transfer", "Walnut Incident", "Yoshimatsu Conspiracy", "Final Showdown"],
    families: [["Chisato Nishikigi", "Shinji Yoshimatsu"], ["Takina Inoue", "Mika"]],
    hairColors: ["Blonde", "Black", "Purple", "Orange", "Grey", "Brown"],
    eyeColors: ["Blue", "Blue", "Purple", "Orange", "Black", "Black"],
    openings: ["Alive", "Diamond"]
  });

  add({
    id: "berzerk", title: "Berserk", genres: ["seinen", "dark fantasy", "horror", "action"],
    creator: "Kentaro Miura", studio: "Studio Ghibli", yearStarted: 1997, protagonist: "Guts",
    characters: ["Guts", "Griffith", "Casca", "Puck", "Skull Knight", "Farnese de Vandimion", "Serpico", "Schierke", "Isidro", "Zodd", "Godot", "Rickert", "Corkus", "Gambino", "Slan", "Ubik", "Conrad", "Princess Charlotte", "Flora", "Locus"],
    villains: ["Griffith (Femto)", "Godot", "Zodd", "Slan", "Ubik", "Conrad", "Emperor Ganishka", "Void", "The Count"],
    abilities: ["Berserker Armor", "Dragon Slayer", "Hand Cannon", "Magic", "Demon Powers", "Astral Projection"],
    weapons: ["Dragon Slayer", "Repeater Crossbow", "Bomb", "Hand Cannon", "Sword of Light", "Knife"],
    techniques: ["Berserker Rage", "Formation Swing", "Crossbow Volley", "Canon Shot", "Skull Knight's Sword"],
    locations: ["Midland", "Tower of Conviction", "Elfhelm", "Falconia", "Godo's Domain", "Portland", "Graveyard"],
    organizations: ["Band of the Hawk", "Falcon of Light", "Holy See", "Kushan Empire", "God's Hand", "Apostles", "Inquisition"],
    arcs: ["Golden Age Arc", "Conviction Arc", "Millennium Falcon Arc", "Falconia Arc", "Lost Children Arc", "Black Swordsman Arc"],
    families: [["Guts", "Casca"], ["Gambino", "Guts (adoptive)"], ["Griffith", "Charlotte"]],
    hairColors: ["Black", "White", "Silver", "Red", "Blonde", "Brown"],
    eyeColors: ["Brown", "Blue", "Red", "Green", "Gold", "Black"],
    openings: ["Tell Me Why", "Sign"]
  });

  add({
    id: "jojo", title: "JoJo's Bizarre Adventure", genres: ["shonen", "action", "adventure", "supernatural"],
    creator: "Hirohiko Araki", studio: "David Production", yearStarted: 2012, protagonist: "Jonathan Joestar",
    characters: ["Jonathan Joestar", "Joseph Joestar", "Jotaro Kujo", "Josuke Higashikata", "Giorno Giovanna", "Jolyne Cujoh", "Dio Brando", "Speedwagon", "Caesar Zeppeli", "Lisa Lisa", "Kars", "Wham", "Polnareff", "Kakyoin", "Rohan Kishibe", "Koichi Hirose", "Okuyasu Nijimura", "Yoshikage Kira", "Diavolo", "Pucci", "Weather Report", "Anasui"],
    villains: ["Dio Brando", "Kars", "Wham", "Yoshikage Kira", "Diavolo", "Pucci", "Kira Yoshikage", "Esidisi", "Rudol von Stroheim"],
    abilities: ["Stand", "Ripple", "Hammeron", "Spin", "Stone Mask Power"],
    weapons: ["Sword", "Crossbow", "Tommy Gun", "Clacker Volley", "Stand Arrow"],
    techniques: ["Ora Ora", "Muda Muda", "Star Platinum Punch", "ZA WARUDO", "Crazy Diamond Repair", "Gold Experience Requiem", "Sticky Fingers Zip", "D4C Love Train"],
    locations: ["Morioh", "Venice", "Cairo", "Green Dolphin Street Prison", "Duwang", "Naples", "Hirose Town"],
    organizations: ["Speedwagon Foundation", "Passione", "Stardust Crusaders", "La Squadra Esecuzioni", "DIO's Minions"],
    arcs: ["Phantom Blood", "Battle Tendency", "Stardust Crusaders", "Diamond is Unbreakable", "Golden Wind", "Stone Ocean", "Steel Ball Run"],
    families: [["Jonathan Joestar", "Joseph Joestar"], ["Dio Brando", "Giorno Giovanna"], ["Josuke Higashikata", "Jotaro Kujo"], ["Jotaro Kujo", "Jolyne Cujoh"]],
    hairColors: ["Black", "Blue", "Purple", "Blonde", "Green", "Red"],
    eyeColors: ["Blue", "Green", "Purple", "Red", "Brown"],
    openings: ["Sono Chi no Sadame", "Bloody Stream", "Stand Proud", "End of THE WORLD", "Crazy Noisy Bizarre Town", "Fighting Gold"]
  });

  add({
    id: "aot_junior", title: "Attack on Titan: Junior High", genres: ["comedy", "parody", "school"],
    creator: "Hajime Isayama", studio: "Production I.G", yearStarted: 2015, protagonist: "Eren Yeager",
    characters: ["Eren Yeager", "Mikasa Ackerman", "Armin Arlert", "Jean Kirstein", "Sasha Blouse", "Connie Springer", "Hange Zoe", "Levi Ackerman", "Erwin Smith", "Historia Reiss", "Ymir", "Reiner Braun", "Bertholdt Hoover", "Annie Leonhart", "Marco Bodt", "Keith Shadis", "Freckled Ymir", "Christa Lenz"],
    villains: ["Titans", "Reiner Braun", "Bertholdt Hoover", "Annie Leonhart"],
    abilities: ["3D Maneuver Gear", "Titan Powers", "Intelligence", "Comedy"],
    weapons: ["3DMG", "Sword", "Blade"],
    techniques: ["Titan Transformation", "Slash", "Shock Absorb"],
    locations: ["Paradise Island", "Wall Rose", "Wall Sina", "Classroom 1-5", "Cafeteria"],
    organizations: ["Survey Corps", "Military Police", "Student Council"],
    arcs: ["School Life Arc", "Wall Rose Arc", "Titan Exam Arc"],
    families: [["Eren Yeager", "Mikasa Ackerman"], ["Historia Reiss", "Ymir"]],
    hairColors: ["Black", "Brown", "Blonde", "Red", "Grey"],
    eyeColors: ["Blue", "Green", "Grey", "Brown"],
    openings: ["Guren no Yumiya", "Jiyuu no Tsubasa"]
  });

  add({
    id: "92_anime", title: "86 - Eighty-Six", genres: ["sci-fi", "drama", "mecha", "action"],
    creator: "Asato Asato", studio: "A-1 Pictures", yearStarted: 2021, protagonist: "Shinei Nouzen",
    characters: ["Shinei Nouzen", "Vladilena Milize", "Raiden Shuga", "Theoto Rikka", "Anju Emma", "Kurena Kukumila", "Henrietta Penrose", "Jerome Karlstal", "Ernst Zimmerman", "Eliya", "Yuki", "Tristan", "Mikuri", "Olivia", "Kay"],
    villains: ["Legion", "Republic Military Command", "Knights of St. Magnus"],
    abilities: ["Mecha Pilot", "Enhanced Reflexes", "Tactical Acumen", "EMP Resistance"],
    weapons: ["Juggernaut", "Reginleif", "M4 Carbine", "Grenade"],
    techniques: ["Phalanx Formation", "Morph Attack", "Spearhead", "Infiltrate"],
    locations: ["Republic of San Magnolia", "Battlefield Frontier", "Giadian Empire Ruins", "Underground Bunker", "Fleet Sea"],
    organizations: ["Spearhead Squadron", "Republic Military", "Legion", "Federation Military"],
    arcs: ["Handling the War", "Battle of the Morphos", "Federation Arc", "Reunion Arc"],
    families: [["Shinei Nouzen", "Raiden Shuga"]],
    hairColors: ["Black", "White", "Brown", "Blonde", "Red", "Blue"],
    eyeColors: ["Red", "Blue", "Brown", "Green", "Grey"],
    openings: ["Kyouran Hey Kids!!", "Avid"]
  });

  add({
    id: "death_parade", title: "Death Parade", genres: ["psychological", "thriller", "drama", "mystery"],
    creator: "Yuzuru Tachikawa", studio: "Madhouse", yearStarted: 2015, protagonist: "Decim",
    characters: ["Decim", "Chiyuki", "Ginti", "Harada", "Nona", "Oculus", "Clavis", "Mayu", "Sachiko", "Takashi", "Shigeru", "Mai", "Misaki", "Kintaro"],
    villains: ["Nona", "Oculus"],
    abilities: ["Dead Judgment", "Memory Manipulation", "Soul Assay", "Arbitration"],
    weapons: ["Barbells", "Game Tokens"],
    techniques: ["Death Game", "Soul Evaluation", "Memory Extraction"],
    locations: ["Quindecim", "Arbitration Land", "Void", "Waiting Room", "Game Room"],
    organizations: ["Arbitration Council", "Dead Souls Management"],
    arcs: ["Decim's Awakening", "Ginti's Judgment", "Chiyuki's Past", "Final Revelation"],
    families: [["Decim", "Chiyuki"], ["Nona", "Oculus"]],
    hairColors: ["Black", "White", "Purple", "Blonde", "Green", "Blue"],
    eyeColors: ["Black", "Red", "Blue", "Green", "Purple"],
    openings: ["Flyers"]
  });

  add({
    id: "assassination_classroom", title: "Assassination Classroom", genres: ["comedy", "action", "school", "sci-fi"],
    creator: "Yusei Matsui", studio: "Lerche", yearStarted: 2015, protagonist: "Koro-sensei",
    characters: ["Koro-sensei", "Nagisa Shiota", "Karma Akabane", "Kaede Kayano", "Mano", "Sugaya", "Okuda", "Chiba", "Hayami", "Kurahashi", "Yada", "Okano", "Kimura", "Maehara", "Nakamura", "Irina Jelavic", "Karasuma", "Ritsu", "Takaoka", "Shiro"],
    villains: ["Takaoka", "Shiro", "The Reaper", "Government Officials"],
    abilities: ["Mach 20 Speed", "Anti-Sensei Weapons", "Stealth", "Poison Resistance", "Assassination Skills"],
    weapons: ["Knife", "BB Gun", "Slingshot", "Bomb", "Poison", "Anti-Sensei Knife"],
    techniques: ["Room Sweep", "Camouflage", "Grenade Trap", "Distract and Ambush", "Multi-angle Attack"],
    locations: ["Kunugigaoka Junior High", "Class 3E Room", "Old School Building", "Beach", "Mountain Training Camp"],
    organizations: ["Class 3E", "Ministry of Defense", "The Reaper's Organization"],
    arcs: ["Introduction Arc", "Transfer Student Arc", "Final Exam Arc", "Graduation Arc", "Koro-sensei's Past Arc"],
    families: [["Nagisa Shiota", "Hiromi Shiota"], ["Karma Akabane", "Gakushu Asano"]],
    hairColors: ["Yellow", "Blue", "Red", "Black", "Blonde", "Green", "Purple", "Brown"],
    eyeColors: ["Yellow", "Blue", "Red", "Black", "Brown", "Green", "Purple"],
    openings: ["Seishun Daisuki", "Jiriki Hongan Revolution"]
  });

  add({
    id: "mashle", title: "Mashle: Magic and Muscles", genres: ["shonen", "comedy", "fantasy", "action"],
    creator: "Hajime Komoto", studio: "A-1 Pictures", yearStarted: 2023, protagonist: "Mash Burnedead",
    characters: ["Mash Burnedead", "Finn Ames", "Lance Crown", "Dot Barrett", "Lemon Irvine", "Ray Ames", "Abel Rayne", "Luther Lux", "Innocent Zero", "Brad Coleman", "Tom Knowles", "Sofia Belial", "Regro Burnedead", "Milo", "Walker"],
    villains: ["Innocent Zero", "Abel Rayne", "Luther Lux", "Tom Knowles", "Sofia Belial"],
    abilities: ["Superhuman Strength", "Muscle Magic", "Enhanced Speed", "Durability", "Regeneration"],
    weapons: ["Bare Fists", "Sword", "Magic Staff", "Cream Puffs"],
    techniques: ["Muscle Punch", "Muscle Rush", "Magic Repel", "Muscle Tornado", "Full Power Punch"],
    locations: ["Easton Magic Academy", "Magic World", "Cream Puff Shop", "Mushroom Forest", "Forbidden Forest"],
    organizations: ["Easton Academy", "Divine Visionaries", "Innocent Zero's Group", "Magi"],
    arcs: ["Admissions Arc", "Academy Arc", "Divine Visionary Selection Exam Arc", "Innocent Zero Arc"],
    families: [["Mash Burnedead", "Regro Burnedead"], ["Finn Ames", "Ray Ames"]],
    hairColors: ["Black", "White", "Blonde", "Brown", "Red", "Pink"],
    eyeColors: ["Black", "Blue", "Red", "Green", "Grey", "Purple"],
    openings: ["Knock Out", "Blizzard"]
  });

  add({
    id: "hells_paradise", title: "Hell's Paradise", genres: ["shonen", "dark fantasy", "action", "historical"],
    creator: "Yuji Kaku", studio: "MAPPA", yearStarted: 2023, protagonist: "Gabimaru the Hollow",
    characters: ["Gabimaru", "Yamada Asaemon Sagiri", "Yamada Asaemon Shugen", "Yamada Asaemon Fuchi", "Toma", "Senta", "Nurugai", "Yamada Asaemon Tenza", "Rien", "Ju Fa", "Ran Ha", "Tao Fa", "Zhu Jin", "Doshin", "Yoshida", "Aza Chobe", "Aza Tamiya", "Eizen", "Kisho", "Horai"],
    villains: ["Rien", "Ju Fa", "Ran Ha", "Tao Fa", "Zhu Jin", "Doshin"],
    abilities: ["Tao", "Ninjutsu", "Swordsmanship", "Medicine", "Monster Abilities"],
    weapons: ["Ninja Blade", "Katana", "Sickle", "Staff", "Poison"],
    techniques: ["Sword Draw", "Fire Ninjutsu", "Water Tao", "Earth Tao", "Wind Tao"],
    locations: ["Shinsenkyo", "Island of Death", "Execution Ground", "Cave of Wonders", "Village of the Immortals"],
    organizations: ["Tokugawa Shogunate", "Yamada Clan", "Kotaku Clan", "Executioners"],
    arcs: ["Island Arc", "Tao Arc", "Garden of Paradise Arc", "Final Battle Arc"],
    families: [["Gabimaru", "Yui"], ["Aza Chobe", "Aza Tamiya"]],
    hairColors: ["Black", "White", "Brown", "Red", "Blonde"],
    eyeColors: ["Black", "Red", "Brown", "Yellow", "Blue"],
    openings: ["W●RK", "Kaikai"]
  });

  add({
    id: "summertime_rendering", title: "Summertime Rendering", genres: ["mystery", "thriller", "sci-fi", "supernatural"],
    creator: "Yasunori Tanaka", studio: "OLM", yearStarted: 2022, protagonist: "Shinpei Ajiro",
    characters: ["Shinpei Ajiro", "Ushio Kofune", "Mio Kofune", "Sou Hishigata", "Nagumo", "Tokiko", "Ginjiro", "Ryunosuke", "Tetsu", "Karl", "Kazuki", "Yoshino", "Kazma", "Miyoko", "Kazuyoshi"],
    villains: ["The Shadows", "Shide", "Mio's Shadow", "Ushio's Shadow", "Ginjiro's Shadow"],
    abilities: ["Time Loop", "Shadow Detection", "Visualization", "Observation", "Copy Ability"],
    weapons: ["Fish Spear", "Knife", "Gun", "Boomerang"],
    techniques: ["Time Reset", "Shadow Copy", "Memory Transfer", "Doppelganger", "Loop Jump"],
    locations: ["Wakayama", "Hinogami Island", "Kofune Shrine", "Ferry Dock", "School", "Lighthouse"],
    organizations: ["Hinogami Police", "Shadow Organization", "Kofune Family"],
    arcs: ["Ushio's Return", "Shadow Invasion", "Truth of the Shadows", "Final Loop", "Resolution"],
    families: [["Ushio Kofune", "Mio Kofune"], ["Shinpei Ajiro", "Sou Hishigata"]],
    hairColors: ["Black", "Blue", "Red", "Brown", "Blonde"],
    eyeColors: ["Brown", "Blue", "Red", "Green", "Black"],
    openings: ["Hituzi", "Natsuyume Noisy"]
  });

  add({
    id: "cyberpunk_edgerunners", title: "Cyberpunk: Edgerunners", genres: ["sci-fi", "action", "drama", "cyberpunk"],
    creator: "Masahiko Otsuka", studio: "Trigger", yearStarted: 2022, protagonist: "David Martinez",
    characters: ["David Martinez", "Lucyna Kushinada", "Maine", "Dorio", "Kiwami Lillith", "Rebecca", "Pilar", "Falco", "Gloria Martinez", "Doc", "Maine (Smasher)", "Adam Smasher", "Taki", "Tanaka", "James Norris", "NetWatch Agent"],
    villains: ["Adam Smasher", "Arasaka Corporation", "Maine (post-cyberpsychosis)", "Tanaka", "NetWatch"],
    abilities: ["Cybernetic Enhancements", "Sandevistan", "Netrunning", "Cyberpsychosis", "Reflex Booster"],
    weapons: ["M-179 Achilles", "Gorilla Arms", "Mantis Blades", "Monowire", "Smart SMG", "Projectile Launch System"],
    techniques: ["Sandevistan Burst", "Berserk Mode", "Netrunner Hack", "Infiltrate", "Combat Quickhack"],
    locations: ["Night City", "Arasaka Tower", "Afterlife Bar", "Mega Building H4", "Corporate Plaza", "Jig-Jig Street"],
    organizations: ["Arasaka Corporation", "Militech", "Maine's Crew", "NetWatch"],
    arcs: ["Rise of David", "Edgerunners Crew", "Cyberpsychosis", "Arasaka Tower Raid"],
    families: [["David Martinez", "Gloria Martinez"], ["Maine", "Dorio"]],
    hairColors: ["Brown", "Blue", "Red", "Purple", "Blonde", "Pink", "White"],
    eyeColors: ["Brown", "Blue", "Red", "Purple", "Yellow", "Green"],
    openings: ["This Fffire"]
  });

  add({
    id: "dandadan", title: "Dandadan", genres: ["shonen", "supernatural", "comedy", "romance", "sci-fi"],
    creator: "Yukinobu Tatsu", studio: "Science SARU", yearStarted: 2024, protagonist: "Momo Ayase",
    characters: ["Momo Ayase", "Okarun (Ken Takakura)", "Aira Shiratori", "Jin Enjoji", "Seiko Ayase", "Turbo Granny", "Serpoians", "Evil Eye", "Kinta Sakata", "Muko", "Taro", "Sakata Rin", "Miyako", "Ryo", "Naki", "Matsumoto"],
    villains: ["Turbo Granny", "Evil Eye", "Serpoians", "Kur (Space Globalist)", "Sakata Clan"],
    abilities: ["Psychic Powers", "Ghost Possession", "Spiritual Sense", "Yokai Abilities", "Alien Powers", "Transformation"],
    weapons: ["Cursed Knife", "Spiritual Artifacts", "Golden Ball", "Acrobatic Silky"],
    techniques: ["Spiritual Punch", "Yokai Transformation", "Turbo Granny Speed", "Psychic Shield", "Occult Blast"],
    locations: ["Kamigoe City", "Ayase Residence", "School", "Tunnel", "Shrine"],
    organizations: ["Spirit World", "Serpoian Aliens", "Yokai Alliance"],
    arcs: ["Turbo Granny Arc", "Acrobatic Silky Arc", "Evil Eye Arc", "Space Globalist Arc"],
    families: [["Momo Ayase", "Seiko Ayase"], ["Aira Shiratori", "Taro"]],
    hairColors: ["Black", "Blonde", "Red", "Brown", "White", "Blue"],
    eyeColors: ["Brown", "Blue", "Green", "Red", "Gold", "Purple"],
    openings: ["Otonoke", "Falling Down"]
  });

  add({
    id: "oshi_no_ko", title: "Oshi no Ko", genres: ["drama", "mystery", "supernatural", "entertainment"],
    creator: "Aka Akasaka", studio: "Doga Kobo", yearStarted: 2023, protagonist: "Aqua Hoshino",
    characters: ["Aqua Hoshino", "Ruby Hoshino", "Kana Arima", "Akane Kurokawa", "Ai Hoshino", "Miyako Saito", "Ichigo Saito", "Memcho", "Fubuki", "Kaburagi", "Mel (Melt)", "Pyon (Pyonkichi)", "Goa", "Taishi Gotanda", "Hikaru Kamiki", "Nino", "Sarina", "Gorou", "Yoriko", "Ienaka"],
    villains: ["Hikaru Kamiki", "Nino", "Kaburagi", "Stalker"],
    abilities: ["Acting", "Singing", "Strategy", "Investigation", "Entertainment Knowledge"],
    weapons: ["None (showbiz world)"],
    techniques: ["Method Acting", "Emotional Control", "Idol Dance", "Variety Show Skills"],
    locations: ["Tokyo", "Studio", "School", "Hospital", "Concert Hall", "B Komachi Studio"],
    organizations: ["B Komachi", "Sweet Today", "Strawberry Productions", "Lala Lai Theatre"],
    arcs: ["Ai Hoshino Arc", "Reality Dating Show Arc", "Stage Play Arc", "Movie Arc", "Investigation Arc"],
    families: [["Aqua Hoshino", "Ruby Hoshino"], ["Aqua Hoshino", "Ai Hoshino"], ["Kana Arima", "Akane Kurokawa"]],
    hairColors: ["Black", "Pink", "Red", "Blonde", "Purple", "Blue", "Grey"],
    eyeColors: ["Blue", "Red", "Purple", "Green", "Gold", "Black"],
    openings: ["Idol", "Fatale", "Mephisto", "Burning"]
  });

  add({
    id: "bocchi_the_rock", title: "Bocchi the Rock!", genres: ["comedy", "slice of life", "music"],
    creator: "Aki Hamaji", studio: "CloverWorks", yearStarted: 2022, protagonist: "Hitori Gotoh",
    characters: ["Hitori Gotoh (Bocchi)", "Nijika Ijichi", "Ryo Yamada", "Ikuyo Kita", "Seika Ijichi", "PA San", "Futari Gotoh", "Michuri", "Kikuri", "Erika", "Naoki", "Manager"],
    villains: ["Social Anxiety", "Stage Fright"],
    abilities: ["Guitar Mastery", "Songwriting", "Singing", "Bass Guitar", "Drums"],
    weapons: ["Electric Guitar", "Bass Guitar", "Drum Kit", "Microphone"],
    techniques: ["Speed Picking", "Power Chord", "Fingerstyle", "Sweep Picking"],
    locations: ["Star Corona", "School", "Hitori's Closet", "Live House", "Park", "Culture Festival"],
    organizations: ["Kessoku Band", "SIDEROS", "Folk song research club"],
    arcs: ["Band Formation Arc", "Culture Festival Arc", "Summer Camp Arc", "School Festival Arc"],
    families: [["Hitori Gotoh", "Futari Gotoh"], ["Nijika Ijichi", "Seika Ijichi"]],
    hairColors: ["Pink", "Yellow", "Blue", "Red", "Grey", "Brown", "Blonde"],
    eyeColors: ["Blue", "Yellow", "Green", "Red", "Grey", "Brown"],
    openings: ["Seishun Complex", "Guitar to Kodoku to Ao"]
  });

  add({
    id: "gurren_lagann", title: "Gurren Lagann", genres: ["mecha", "action", "adventure", "sci-fi"],
    creator: "Kazuki Nakashima", studio: "Gainax", yearStarted: 2007, protagonist: "Simon",
    characters: ["Simon", "Kamina", "Yoko Littner", "Nia Teppelin", "Kittan Bachika", "Leeron", "Viral", "Lordgenome", "Anti-Spiral", "Daril", "Dayakka", "Adiane", "Thymilph", "Cytomander", "Gimmy", "Darry", "Booru", "Makken", "Kiyal", "Zorthy"],
    villains: ["Lordgenome", "Anti-Spiral", "Viral", "Human Extinction Group"],
    abilities: ["Spiral Power", "Pilot", "Combat", "Mechanics", "Willpower"],
    weapons: ["Drill", "Gurren Lagann", "Arc-Gurren", "Super Galaxy Gurren Lagann", "Chouginga Gurren Lagann"],
    techniques: ["Giga Drill Break", "Super Galaxy Drill", "Tengen Toppa Gurren Lagann", "Infinity Big Bang Storm"],
    locations: ["Jiha Village", "Teppelin City", "Kamina's Cave", "Moon Base", "Anti-Spiral Dimension"],
    organizations: ["Team Dai-Gurren", "Beastmen Army", "Anti-Spiral"],
    arcs: ["Underground Arc", "Beastmen Arc", "Space Arc", "Anti-Spiral Arc"],
    families: [["Simon", "Kamina"], ["Simon", "Nia Teppelin"], ["Kittan Bachika", "Kiyal"]],
    hairColors: ["Black", "Red", "Blue", "Blonde", "Green", "Purple", "White"],
    eyeColors: ["Red", "Blue", "Green", "Yellow", "Purple", "Black"],
    openings: ["Sorairo Days", "Happily Ever After"]
  });

  add({
    id: "fate_stay_night", title: "Fate/stay night", genres: ["action", "fantasy", "supernatural", "drama"],
    creator: "Kinoko Nasu", studio: "Type-Moon", yearStarted: 2006, protagonist: "Shirou Emiya",
    characters: ["Shirou Emiya", "Saber (Artoria Pendragon)", "Rin Tohsaka", "Sakura Matou", "Archer", "Gilgamesh", "Illyasviel von Einzbern", "Berserker (Heracles)", "Lancer (Cu Chulainn)", "Caster (Medea)", "Assassin (Kojiro)", "Rider (Medusa)", "Shinji Matou", "Kirei Kotomine", "Kiritsugu Emiya", "Taiga Fujimura", "Kuzuki Souichirou", "Zouken Matou"],
    villains: ["Kirei Kotomine", "Gilgamesh", "Zouken Matou", "Caster (Medea)", "True Assassin"],
    abilities: ["Magecraft", "Reinforcement", "Projection", "Servant Summoning", "Command Seals", "Noble Phantasms"],
    weapons: ["Kanshou and Bakuya", "Excalibur", "Rule Breaker", "Gate of Babylon", "Ea", "Gae Bolg", "Caladbolg"],
    techniques: ["Unlimited Blade Works", "Excalibur Blast", "Gae Bolg", "Nine Lives", "Rule Breaker"],
    locations: ["Fuyuki City", "Emiya Household", "Einzbern Castle", "Tohsaka Mansion", "Church", "Ryudou Temple", "Holy Grail War"],
    organizations: ["Mages Association", "Holy Church", "Einzbern Family", "Tohsaka Family", "Matou Family"],
    arcs: ["Fate Route", "Unlimited Blade Works", "Heaven's Feel", "Holy Grail War Arc"],
    families: [["Kiritsugu Emiya", "Shirou Emiya"], ["Rin Tohsaka", "Sakura Matou"], ["Illyasviel von Einzbern", "Kiritsugu Emiya"]],
    hairColors: ["Red", "Brown", "Blonde", "Black", "Purple", "White", "Blue"],
    eyeColors: ["Brown", "Blue", "Gold", "Red", "Purple", "Green"],
    openings: ["This Illusion", "Brave Shine", "Ideal White"]
  });

  add({
    id: "fate_zero", title: "Fate/Zero", genres: ["action", "fantasy", "drama", "psychological"],
    creator: "Gen Urobuchi", studio: "ufotable", yearStarted: 2011, protagonist: "Kiritsugu Emiya",
    characters: ["Kiritsugu Emiya", "Saber (Artoria Pendragon)", "Irisviel von Einzbern", "Kirei Kotomine", "Gilgamesh", "Rider (Iskandar)", "Waver Velvet", "Lancer (Diarmuid)", "Tokiomi Tohsaka", "Kariya Matou", "Ryuunosuke Uryuu", "Caster (Bluebeard)", "Assassin (Hassan)", "Maiya Hisau", "Risei Kotomine", "Julius Harway", "Natalia Kaminski", "Shirley"],
    villains: ["Kirei Kotomine", "Caster", "Tokiomi Tohsaka", "Gilgamesh"],
    abilities: ["Magecraft", "Time Alter", "Origin Bullets", "Battle Continuation", "Charisma"],
    weapons: ["Contender", "Thompson Contender", "Origin Bullet", "Excalibur", "Ionian Hetairoi", "Gate of Babylon"],
    techniques: ["Time Alter: Double Accel", "Time Alter: Squall", "Origin Round", "Ionian Hetairoi", "Enuma Elish"],
    locations: ["Fuyuki City", "Einzbern Castle", "Tohsaka Mansion", "Building at the pier", "Caster's lair", "Church"],
    organizations: ["Einzbern Family", "Tohsaka Family", "Matou Family", "Mages Association"],
    arcs: ["First War", "Command Seals Arc", "Confrontation", "Finale Arc"],
    families: [["Kiritsugu Emiya", "Irisviel von Einzbern"], ["Tokiomi Tohsaka", "Rin Tohsaka"], ["Kariya Matou", "Sakura Matou"]],
    hairColors: ["Black", "Brown", "Blonde", "Red", "White", "Blue"],
    eyeColors: ["Brown", "Blue", "Gold", "Red", "Green", "Purple"],
    openings: ["Oath Sign", "Memoria", "to the beginning"]
  });

  add({
    id: "mob_psycho", title: "Mob Psycho 100", genres: ["comedy", "supernatural", "action", "slice of life"],
    creator: "One", studio: "Bones", yearStarted: 2016, protagonist: "Shigeo Kageyama (Mob)",
    characters: ["Mob (Shigeo Kageyama)", "Arataka Reigen", "Ritsu Kageyama", "Teruki Hanazawa (Teru)", "Tome Kurata", "Mezato Ichi", "Kaito", "Shou Suzuki", "Toichiro Suzuki", "Minegishi", "Matsuura", "Koyama", "Mukai", "Serizawa", "Kageyama Family", "Musashi Goda", "Hoshino", "Hiroto", "Sakuragi"],
    villains: ["Toichiro Suzuki", "Minegishi", "Claw", "Black Vinegar Middle School", "Mukai"],
    abilities: ["Psychic Powers", "Telepathy", "Teleportation", "Energy Barrier", "Psychic Absorption", "???'s Power", "Paranormal Detection"],
    weapons: ["None (uses psychic powers)", "Salt", "Spirit Scanner"],
    techniques: ["Psychic Punch", "Psychic Barrier", "Telekinetic Throw", "Psychic Healing", "100% Mode", "??? Mode"],
    locations: ["Seasoning City", "Spirits and Such Consultation Office", "Salt Middle School", "Claw Base", "Black Vinegar Middle School", "Tokyo Tower", "Awakening Lab"],
    organizations: ["Spirits and Such Consultation Office", "Claw", "Telepathy Club", "Body Improvement Club"],
    arcs: ["Evil Spirit Arc", "Telepathy Club Arc", "Claw Invasion Arc", "World Domination Arc", "Divine Tree Arc", "??? Arc"],
    families: [["Mob (Shigeo Kageyama)", "Ritsu Kageyama"], ["Toichiro Suzuki", "Shou Suzuki"]],
    hairColors: ["Black", "Brown", "Blonde", "Red", "Blue", "Grey"],
    eyeColors: ["Black", "Brown", "Blue", "Green", "Red"],
    openings: ["99", "99.9", "1"]
  });

  add({
    id: "madoka_magica", title: "Puella Magi Madoka Magica", genres: ["psychological", "magical girl", "dark fantasy", "drama"],
    creator: "Gen Urobuchi", studio: "Shaft", yearStarted: 2011, protagonist: "Madoka Kaname",
    characters: ["Madoka Kaname", "Homura Akemi", "Mami Tomoe", "Sayaka Miki", "Kyoko Sakura", "Kyubey", "Walpurgisnacht", "Charlotte", "Hitomi Shizuki", "Junko Kaname", "Tomohisa Kaname", "Kazuko Saotome", "Nakazawa", "Kamijo Kyosuke"],
    villains: ["Kyubey", "Walpurgisnacht", "Witches (various)", "Homura Akemi (later)"],
    abilities: ["Magic", "Time Manipulation", "Witch Detection", "Healing", "Barrier Creation", "Wish Magic"],
    weapons: ["Bow and Arrow", "Shield", "Guns", "Ribbon Sword", "Musket", "Spear"],
    techniques: ["Mami's Ribbon", "Homura's Shield (Time Stop)", "Kyoko's Spear", "Madoka's Arrow", "Grief Seed Absorption"],
    locations: ["Mitakihara City", "School", "Witch Barrier Labyrinth", "Hospital", "Mami's Apartment", "Train Station"],
    organizations: ["Puella Magi System", "Incubators", "Kyubey's Network"],
    arcs: ["Mami's Guidance", "Sayaka's Fall", "Kyoko's Redemption", "Homura's Truth", "Final Wish"],
    families: [["Madoka Kaname", "Junko Kaname"], ["Homura Akemi", "Madoka Kaname"]],
    hairColors: ["Pink", "Black", "Blue", "Red", "Blonde", "Purple", "Brown"],
    eyeColors: ["Pink", "Red", "Yellow", "Green", "Blue", "Gold"],
    openings: ["Connect", "Claris"]
  });

  add({
    id: "kaguya_sama", title: "Kaguya-sama: Love is War", genres: ["romance", "comedy", "psychological", "school"],
    creator: "Aka Akasaka", studio: "A-1 Pictures", yearStarted: 2019, protagonist: "Miyuki Shirogane",
    characters: ["Miyuki Shirogane", "Kaguya Shinomiya", "Yu Ishigami", "Miko Iino", "Chika Fujiwara", "Ai Hayasaka", "Nagi", "Kei Shirogane", "Shindou", "Kashiwagi", "Tsubasa Tanuma", "Karen Kino", "Erika Kose", "Maki Shijo", "Nagisa", "Osaragi", "Momoyo", "Miyuki's Father", "Kaguya's Father", "Un'yo Shinomiya"],
    villains: ["Shinomiya Family", "Un'yo Shinomiya", "Kaguya's Father"],
    abilities: ["Academic Excellence", "Strategy", "Scheming", "Mind Games", "Martial Arts (Chika)"],
    weapons: ["Smartphone", "Mind Games", "Intellect", "Chika's Pounding"],
    techniques: ["Love War Strategy", "Emotional Manipulation", "Reverse Psychology", "Feigned Indifference"],
    locations: ["Shuchiin Academy", "Student Council Room", "Shirogane Residence", "Shinomiya Mansion", "Cafeteria", "Culture Festival", "Karaoke Bar", "Fireworks Spot"],
    organizations: ["Shuchiin Student Council", "Shinomiya Group", "Fujiwara Family"],
    arcs: ["Introduction Arc", "Culture Festival Arc", "Ice Kaguya Arc", "Dual Confession Arc", "Relationship Arc"],
    families: [["Miyuki Shirogane", "Kei Shirogane"], ["Kaguya Shinomiya", "Un'yo Shinomiya"], ["Maki Shijo", "Kaguya Shinomiya"]],
    hairColors: ["Black", "Red", "Blonde", "Brown", "Purple", "Green", "Pink", "White"],
    eyeColors: ["Black", "Red", "Blue", "Green", "Brown", "Purple", "Yellow", "Red"],
    openings: ["Love Dramatic", "Father", "DADDY! DADDY! DO!", "GIRI GIRI"]
  });

  add({
    id: "your_lie_in_april", title: "Your Lie in April", genres: ["romance", "drama", "music", "slice of life"],
    creator: "Naoshi Arakawa", studio: "A-1 Pictures", yearStarted: 2014, protagonist: "Kosei Arima",
    characters: ["Kosei Arima", "Kaori Miyazono", "Tsubaki Sawabe", "Ryota Watari", "Nagisa Aiza", "Saki Arima", "Hiroko Seto", "Takeshi Aiza", "Emi Igawa", "Nene", "Koharu", "Saito", "Miyako", "Kazama", "Yuriko"],
    villains: ["Kosei's Trauma", "Saki Arima's Death"],
    abilities: ["Piano Mastery", "Violin Performance", "Music Composition", "Absolute Pitch"],
    weapons: ["Piano", "Violin"],
    techniques: ["Chopin Etude", "Beethoven Sonata", "Kreisler Pieces", "Improvisation", "Duet Performance"],
    locations: ["Concert Hall", "School Auditorium", "Park", "Hospital", "Kosei's House", "Music Room", "Bridge"],
    organizations: ["School Music Club", "Competition Circuit"],
    arcs: ["Meeting Kaori", "Competition Arc", "Hospital Arc", "Final Performance Arc"],
    families: [["Kosei Arima", "Saki Arima"], ["Tsubaki Sawabe", "Ryota Watari"]],
    hairColors: ["Brown", "Green", "Blonde", "Black", "Pink"],
    eyeColors: ["Brown", "Green", "Blue", "Black", "Grey"],
    openings: ["Hikaru Nara", "Nanairo Symphony"]
  });

  add({
    id: "erased", title: "Erased (Boku dake ga Inai Machi)", genres: ["mystery", "thriller", "supernatural", "drama"],
    creator: "Kei Sanbe", studio: "A-1 Pictures", yearStarted: 2016, protagonist: "Satoru Fujinuma",
    characters: ["Satoru Fujinuma", "Kayo Hinazuki", "Kenya Oyamada", "Hiromi Sugita", "Airi Katagiri", "Sachiko Fujinuma", "Jun Shiratori", "Gaku Yashiro", "Satoru (Adult)", "Yamazaki", "Misato", "Yoshida", "Rika", "Osamu", "Minoru"],
    villains: ["Gaku Yashiro", "Jun Shiratori", "Kidnapper"],
    abilities: ["Revival (Time Leap)", "Premonition", "Observation",
    "Deduction", "Future Memory"],
    weapons: ["None (uses intellect)"],
    techniques: ["Revival Trigger", "Time Leap", "Butterfly Effect", "Evidence Gathering"],
    locations: ["Hokkaido", "Tokyo", "School", "Satoru's Apartment", "Sachiko's House", "Library", "Bridge", "Convenience Store"],
    organizations: ["Police", "School", "Publishing Company"],
    arcs: ["Adult Arc", "First Revival Arc", "Friendship Arc", "Confrontation Arc", "Final Revival Arc"],
    families: [["Satoru Fujinuma", "Sachiko Fujinuma"], ["Kayo Hinazuki", "Akemi Hinazuki"]],
    hairColors: ["Black", "Brown", "Blonde", "Grey", "Red"],
    eyeColors: ["Brown", "Blue", "Green", "Black", "Grey"],
    openings: ["Re:Re:", "Sore wa Chiisana Hikari no Youna", "Kimi no Uta"]
  });

  add({
    id: "kodomo_no_omocha", title: "Kodomo no Omocha", genres: ["comedy", "romance", "slice of life", "school"],
    creator: "Miho Obana", studio: "Studio Gallop", yearStarted: 1996, protagonist: "Sana Kurata",
    characters: ["Sana Kurata", "Akito Hayama", "Fuka", "Rei", "Baba", "Suzuki", "Misako Kurata", "Hiroshi", "Nao", "Yasu", "Matsu", "Yoshiko", "Shin", "Mariko", "Sakura"],
    villains: ["Akito's Mother", "Yoshiko"],
    abilities: ["Acting", "Singing", "Dancing", "Comedy"],
    weapons: ["Charisma", "Energy"],
    techniques: ["Kidnapped by Sana", "Comedy Routines", "Dramatic Acting"],
    locations: ["School", "Studio", "Sana's House", "Akito's House", "Hospital"],
    organizations: ["School", "Talent Agency", "Drama Club"],
    arcs: ["Love Triangle Arc", "Parent Issues Arc", "Career Arc"],
    families: [["Sana Kurata", "Misako Kurata"], ["Akito Hayama", "Hiroshi Hayama"]],
    hairColors: ["Brown", "Black", "Blonde", "Red"],
    eyeColors: ["Brown", "Black", "Blue", "Green"],
    openings: ["19 - Nineteen", "Ultra Relax"]
  });

  add({
    id: "monogatari", title: "Monogatari Series", genres: ["mystery", "romance", "supernatural", "psychological"],
    creator: "Nisio Isin", studio: "Shaft", yearStarted: 2009, protagonist: "Koyomi Araragi",
    characters: ["Koyomi Araragi", "Hitagi Senjougahara", "Mayoi Hachikuji", "Suruga Kanbaru", "Nadeko Sengoku", "Tsubasa Hanekawa", "Shinobu Oshino", "Meme Oshino", "Karen Araragi", "Tsukihi Araragi", "Sodachi Oikura", "Yotsugi Ononoki", "Dramaturgy", "Kagenui Yozuru", "Gaen Izuko", "Episode", "Guillotine Cutter", "Black Hanekawa", "Yozuru Kagenui"],
    villains: ["Dramaturgy", "Episode", "Guillotine Cutter", "Nadeko Sengoku (later)", "Black Hanekawa", "Straying Cat"],
    abilities: ["Vampire Powers", "Superhuman Strength", "Regeneration", "Shadow Shaping", "Monster Abilities"],
    weapons: ["None (uses vampire abilities)", "Stapler", "School Supplies"],
    techniques: ["Vampire Transformation", "Shadow Play", "Regeneration", "Speed Burst"],
    locations: ["Kamihama City", "School", "Park", "Araragi Residence", "Shrine", "Abandoned Building", "Cram School", "Apartments"],
    organizations: ["Gabriel's Angels", "Oddity Specialists", "Gaen Family"],
    arcs: ["Bakemonogatari", "Nisemonogatari", "Nekomonogatari", "Kabukimonogatari", "Owarimonogatari", "Hanamonogatari", "Tsukimonogatari"],
    families: [["Koyomi Araragi", "Karen Araragi"], ["Koyomi Araragi", "Tsukihi Araragi"], ["Hitagi Senjougahara", "Koyomi Araragi"]],
    hairColors: ["Black", "Blue", "Purple", "Blonde", "Red", "Brown", "Pink", "Grey"],
    eyeColors: ["Red", "Blue", "Green", "Purple", "Yellow", "Gold", "Brown"],
    openings: ["Staple Stable", "Ambivalent World", "Renai Circulation", "Sugar Sweet Nightmare", "Platinum Disco"]
  });

  add({
    id: "toradora", title: "Toradora!", genres: ["romance", "comedy", "drama", "school"],
    creator: "Yuyuko Takemiya", studio: "J.C.Staff", yearStarted: 2008, protagonist: "Ryuuji Takasu",
    characters: ["Ryuuji Takasu", "Taiga Aisaka", "Minori Kushieda", "Yusaku Kitamura", "Ami Kawashima", "Yasuko Takasu", "Inko", "Tomio", "Nanako", "Maya", "Kazuyo", "Kihara", "Nishikata", "Haruta", "Noto"],
    villains: ["None (slice of life conflicts)"],
    abilities: ["Cooking", "Housekeeping", "Palm Top Tiger", "Martial Arts (Taiga)", "Modeling (Ami)"],
    weapons: ["Wooden Sword (Taiga)", "Cleaning Supplies", "Bento Box"],
    techniques: ["Taiga's Punch", "Ryuuji's Cooking", "Kitamura's Speech"],
    locations: ["School", "Takasu Residence", "Aisaka Residence", "Street", "Park", "Beach House", "Ski Lodge", "Bridge", "Classroom"],
    organizations: ["Student Council", "Class 2-C"],
    arcs: ["Introduction Arc", "Beach House Arc", "Culture Festival Arc", "Christmas Arc", "Graduation Arc"],
    families: [["Ryuuji Takasu", "Yasuko Takasu"], ["Taiga Aisaka", "Ryuuji Takasu"]],
    hairColors: ["Brown", "Blonde", "Black", "Red", "Green"],
    eyeColors: ["Brown", "Blue", "Green", "Red", "Black"],
    openings: ["Pre-Parade", "Silky Heart", "Vanilla Salt"]
  });

  add({
    id: "goblin_slayer", title: "Goblin Slayer", genres: ["dark fantasy", "action", "adventure"],
    creator: "Kumo Kagyu", studio: "White Fox", yearStarted: 2018, protagonist: "Goblin Slayer",
    characters: ["Goblin Slayer", "Priestess", "High Elf Archer", "Dwarf Shaman", "Lizard Priest", "Sword Maiden", "Spearman", "Heavy Warrior", "Witch", "Guild Girl", "Cow Girl", "Bard", "Rookie Warrior", "Rhea Scout", "Anvil"],
    villains: ["Goblin Lord", "Goblin Champion", "Evil Priest", "Demon Lord", "Goblins (various)"],
    abilities: ["Swordsmanship", "Tactical Knowledge", "Survival Skills", "Healing Magic", "Archery", "Shaman Magic"],
    weapons: ["Short Sword", "Shield", "Bow", "Morning Star", "Spear", "Wand", "Dagger"],
    techniques: ["Goblin Slaying Tactics", "Firebombing", "Trap Setting", "Encirclement", "Stealth Kill"],
    locations: ["Adventurer's Guild", "Goblin Nest", "Farm", "Water Town", "Elven Forest", "Dwarven Mine", "Lizardman Village"],
    organizations: ["Adventurer's Guild", "Goblin Slayer's Party", "Water Town Temple"],
    arcs: ["Brand New Day Arc", "Goblin Nest Arc", "Water Town Arc", "High Elf Arc", "Dawn of the Demon Lord Arc"],
    families: [["Goblin Slayer", "Cow Girl"], ["Goblin Slayer", "Priestess"]],
    hairColors: ["Black", "Brown", "Blonde", "Red", "Green", "White", "Blue"],
    eyeColors: ["Red", "Blue", "Green", "Gold", "Brown", "Black"],
    openings: ["Rightfully", "Overdose"]
  });

  add({
    id: "shield_hero", title: "The Rising of the Shield Hero", genres: ["isekai", "action", "drama", "fantasy"],
    creator: "Aneko Yusagi", studio: "Kinema Citrus", yearStarted: 2019, protagonist: "Naofumi Iwatani",
    characters: ["Naofumi Iwatani", "Raphtalia", "Filo", "Ren Amaki (Sword Hero)", "Motoyasu Kitamura (Spear Hero)", "Itsuki Kawasumi (Bow Hero)", "Malty S. Melromarc", "Aultcray Melromarc", "Melty Q. Melromarc", "Erhard", "L'Arc Berg", "Therese Alexandrite", "Rishia Ivyred", "S'yne", "Kiel", "Fohl", "Atla", "Eclair", "Glass"],
    villains: ["Malty S. Melromarc", "Aultcray Melromarc", "Takt", "Heroes (jealous)"],
    abilities: ["Shield Mastery", "Cursed Series", "Item Absorption", "Rare Monster Taming", "Hunting Web"],
    weapons: ["Legendary Shield", "Small Shield", "Spirit Tortoise Shield", "Wrath Shield", "Dragon Shield"],
    techniques: ["Shield Prison", "Air Strike Shield", "Second Shield", "Change Shield", "Heal"],
    locations: ["Melromarc Kingdom", "Castle Town", "Dragon Hourglass", "Raphtalia's Village", "Cal Mira", "Spirit Tortoise", "Siltran", "Q'ten Lo"],
    organizations: ["Heroes Party", "Melromarc Royalty", "Church of the Three Heroes", "Shield Hero's Party"],
    arcs: ["Betrayal Arc", "Wave of Catastrophe Arc", "Spirit Tortoise Arc", "Other World Arc", "Revenge Arc"],
    families: [["Naofumi Iwatani", "Raphtalia"], ["Malty S. Melromarc", "Melty Q. Melromarc"], ["Atla", "Fohl"]],
    hairColors: ["Brown", "White", "Blonde", "Black", "Red", "Blue", "Green", "Purple", "Pink"],
    eyeColors: ["Brown", "Red", "Blue", "Green", "Purple", "Yellow", "Black"],
    openings: ["RISE", "FAITH"]
  });

  add({
    id: "seven_deadly_sins", title: "The Seven Deadly Sins", genres: ["shonen", "fantasy", "adventure", "action"],
    creator: "Nakaba Suzuki", studio: "A-1 Pictures", yearStarted: 2014, protagonist: "Meliodas",
    characters: ["Meliodas", "Elizabeth Liones", "Diane", "Ban", "King (Harlequin)", "Gowther", "Merlin", "Escanor", "Hawk", "Hendrickson", "Gilthunder", "Howzer", "Griamore", "Arthur Pendragon", "Ludociel", "Zeldris", "Estarossa", "Chandler", "Cusack", "Mael"],
    villains: ["The Demon King", "Zeldris", "Estarossa", "Hendrickson", "Friesia", "Dahlia", "Galand", "Melascula", "Monspeet", "Derieri"],
    abilities: ["Full Counter", "Snatch", "Creation", "Miracle", "Physical Enhancement", "Invincible", "Infinity", "Sunshine"],
    weapons: ["Dragon Handle (Lostvayne)", "Sacred Treasure: Gideon", "Sacred Treasure: Spirit Spear Chastiefol", "Rhitta", "Sacred Treasure: Aldan"],
    techniques: ["Revenge Counter", "Full Counter", "Divine Slayer", "Regeneration", "Godspeed", "Stigma"],
    locations: ["Britannia", "Liones Kingdom", "Celestial Dimension", "Demon World", "Boar Hat Tavern", "Baste Prison", "Byzel", "Capital of the Dead"],
    organizations: ["Seven Deadly Sins", "Holy Knights", "Demon Clan", "Goddess Clan", "Stigma"],
    arcs: ["Holy Knights Arc", "Sins Arc", "Ten Commandments Arc", "Revival Arc", "Holy War Arc", "Cursed By Light Arc"],
    families: [["Meliodas", "Elizabeth Liones"], ["Ban", "Elaine"], ["King (Harlequin)", "Diane"], ["Zeldris", "Meliodas"]],
    hairColors: ["Blonde", "Pink", "White", "Red", "Grey", "Green", "Black", "Brown", "Purple"],
    eyeColors: ["Blue", "Green", "Red", "Purple", "Brown", "Yellow", "Black"],
    openings: ["Netsujo no Spectrum", "SEVEN", "Howling"]
  });

  add({
    id: "demon_slayer_mugen_train", title: "Demon Slayer: Mugen Train", genres: ["shonen", "dark fantasy", "action"],
    creator: "Koyoharu Gotouge", studio: "ufotable", yearStarted: 2020, protagonist: "Tanjiro Kamado",
    characters: ["Tanjiro Kamado", "Nezuko Kamado", "Zenitsu Agatsuma", "Inosuke Hashibira", "Kyojuro Rengoku", "Akaza", "Haganezuka", "Muzan Kibutsuji", "Tanjuro Kamado", "Rengoku Family"],
    villains: ["Akaza", "Enmu", "Muzan Kibutsuji"],
    abilities: ["Flame Breathing", "Sun Breathing", "Total Concentration Breathing", "Projection", "Dream World"],
    weapons: ["Flame Nichirin Sword", "Sun Blade", "Kebori (Inosuke's Swords)"],
    techniques: ["Flame Breathing: First Form", "Rengoku's Hospitality", "Dream World Attack", "Akaza's Compass Needle"],
    locations: ["Mugen Train", "Infinity Castle", "Rengoku's House", "Kamado Residence"],
    organizations: ["Demon Slayer Corps", "Twelve Kizuki"],
    arcs: ["Mugen Train Arc"],
    families: [["Kyojuro Rengoku", "Senjuro Rengoku"], ["Tanjiro Kamado", "Nezuko Kamado"]],
    hairColors: ["Red", "Black", "Yellow", "Blue", "White", "Brown"],
    eyeColors: ["Red", "Pink", "Yellow", "Blue", "Brown", "Green"],
    openings: ["Akeboshi", "Homura"]
  });

  add({
    id: "promise_neverland", title: "The Promised Neverland", genres: ["horror", "mystery", "thriller", "sci-fi"],
    creator: "Kaiu Shirai", studio: "CloverWorks", yearStarted: 2019, protagonist: "Emma",
    characters: ["Emma", "Norman", "Ray", "Mama Isabella", "Krone", "Phil", "Don", "Gilda", "Nat", "Anna", "Lani", "Thoma", "Mark", "Alicia", "Conny", "Leslie", "Lucas", "Yugo", "Sonju", "Mujika"],
    villains: ["Mama Isabella", "Krone", "Demons", "Ratri Clan", "Peter Ratri", "Lewis", "Queens"],
    abilities: ["High Intelligence", "Strategic Planning", "Stealth", "Physical Prowess (Emma)", "Tracking (Ray)"],
    weapons: ["Rope", "Lamp", "Pen", "Disguise"],
    techniques: ["Escape Plan", "Distraction", "Climbing", "Lock Picking", "Code Breaking"],
    locations: ["Grace Field House", "William Minerva's Bunkers", "Goldy Pond", "Human World", "Demon World", "Shelter 26"],
    organizations: ["Ratry Clan", "Demon Nobility", "Minerva Network"],
    arcs: ["Grace Field Escape Arc", "Yugo and Lucas Arc", "Goldy Pond Arc", "Demon World Arc", "Return to Grace Field Arc"],
    families: [["Emma", "Norman"], ["Emma", "Ray"], ["Leslie", "Mama Isabella"]],
    hairColors: ["Orange", "White", "Black", "Brown", "Blonde", "Green", "Pink"],
    eyeColors: ["Green", "Blue", "Grey", "Brown", "Red", "Purple"],
    openings: ["Touch Off", "Identity", "Vivid"]
  });

  add({
    id: "reincarnated_slime", title: "That Time I Got Reincarnated as a Slime", genres: ["isekai", "fantasy", "adventure", "comedy"],
    creator: "Fuse", studio: "8bit", yearStarted: 2018, protagonist: "Rimuru Tempest",
    characters: ["Rimuru Tempest", "Veldora Tempest", "Shuna", "Shion", "Benimaru", "Souei", "Diablo", "Milim Nava", "Ramiris", "Veldora", "Guy Crimson", "Hinata Sakaguchi", "Ranga", "Gobta", "Gabil", "Gabiru", "Hakuro", "Kaijin", "Kurobe", "Kumara"],
    villains: ["Clayman", "Yuuki Kagurazaka", "Falmuth Kingdom", "Charybdis", "Hinata Sakaguchi (initially)"],
    abilities: ["Predator", "Great Sage", "Wisdom King Raphael", "Void God Azathoth", "Turn Null", "Ultimate Skills", "Magic"],
    weapons: ["None (uses magic and fists)", "Shadow Movement"],
    techniques: ["Merciless", "Predator", "Black Lightning", "Imaginary Supply", "Cooking"],
    locations: ["Jura Forest", "Tempest Federation", "Dwargon", "Falmuth", "Klein Kingdom", "Holy Empire Lubelius", "Eastern Empire"],
    organizations: ["Tempest Federation", "Monster Council", "Demon Lords", "Western Holy Church", "Eastern Empire"],
    arcs: ["Establishment Arc", "Children of the Forest Arc", "Demon Lord Arc", "Harvest Festival Arc", "Eastern Empire Arc"],
    families: [["Rimuru Tempest", "Veldora Tempest"], ["Rimuru Tempest", "Shuna"], ["Benimaru", "Shuna"]],
    hairColors: ["Blue", "Black", "Blonde", "Pink", "Green", "White", "Red", "Purple", "Grey"],
    eyeColors: ["Blue", "Red", "Gold", "Green", "Purple", "Black", "Yellow"],
    openings: ["Nameless Story", "Another", "Meguriau"]
  });

  add({
    id: "kill_la_kill", title: "Kill la Kill", genres: ["action", "comedy", "sci-fi", "ecchi"],
    creator: "Hiromi Inoue", studio: "Trigger", yearStarted: 2013, protagonist: "Ryuko Matoi",
    characters: ["Ryuko Matoi", "Satsuki Kiryuin", "Mako Mankanshoku", "Senketsu", "Ragyo Kiryuin", "Nui Harime", "Aikuro Mikisugi", "Tsumugu Kinagase", "Ira Gamagoori", "Nonon Jakuzure", "Houka Inumuta", "Uzu Sanageyama", "Rei Houomaru", "Takaharu Fukuroda", "Kyo", "Kazuki", "Suzuki"],
    villains: ["Ragyo Kiryuin", "Nui Harime", "Life Fibers", "Satsuki Kiryuin (initially)"],
    abilities: ["Life Fiber Synchronization", "Enhanced Strength", "Speed", "Regeneration", "Special Abilities"],
    weapons: ["Bazooka (Half Scissors)", "Senketsu (Uniform)", "Bleeding Blade", "Rending Scissors"],
    techniques: ["Senketsu Kisaragi", "Senketsu Senjin", "Senketsu Shippu", "DTR (Domination of Three Rules)", "Killing Intent"],
    locations: ["Honnouji Academy", "Kiryuin Manor", "Osaka", "Matoi Residence", "Underground Lab", "Sewer"],
    organizations: ["Honnouji Academy Student Council", "Nudist Beach", "REVOCS Corporation", "Life Fiber Organization"],
    arcs: ["Two-Star Arc", "Osaka Arc", "Culture Festival Arc", "Satsuki's Truth Arc", "Ragyo Arc"],
    families: [["Ryuko Matoi", "Satsuki Kiryuin"], ["Ragyo Kiryuin", "Satsuki Kiryuin"]],
    hairColors: ["Black", "Blue", "Red", "Blonde", "Green", "Purple", "Pink"],
    eyeColors: ["Blue", "Red", "Green", "Yellow", "Purple", "Black"],
    openings: ["Sirius", "ambiguous"]
  });

  add({
    id: "cowboy_bebop", title: "Cowboy Bebop", genres: ["sci-fi", "space western", "action", "noir"],
    creator: "Shinichiro Watanabe", studio: "Sunrise", yearStarted: 1998, protagonist: "Spike Spiegel",
    characters: ["Spike Spiegel", "Jet Black", "Faye Valentine", "Edward Wong", "Ein", "Vicious", "Julia", "Laughing Bull", "Big Shot", "Annie", "Laughing Bull", "Roco Bonnaro", "Andy", "Punch", "Judy", "Laughing Man", "Shinichiro Watanabe", "VT", "Mao Yenrai", "Gren"],
    villains: ["Vicious", "Syndicate", "Laughing Bull"],
    abilities: ["Marksmanship", "Hand-to-hand Combat", "Pilot", "Bounty Hunting", "Hacking", "Martial Arts"],
    weapons: ["Jericho 941", "Sword", "Knife", "Space Ship Swordfish II"],
    techniques: ["Quick Draw", "Gun Fu", "Martial Arts Combo", "Space Combat"],
    locations: ["Mars", "Tijuana", "Callisto", "Venus", "Space Station", "Bebop Ship", "Earth", "Asteroid Belt"],
    organizations: ["Red Dragon Crime Syndicate", "ISSP", "Bebop Crew"],
    arcs: ["Venus Arc", "Vicious Arc", "Jupiter Arc", "Final Arc"],
    families: [["Spike Spiegel", "Julia"]],
    hairColors: ["Black", "Brown", "Green", "Blonde", "Red", "Grey"],
    eyeColors: ["Brown", "Blue", "Green", "Black", "Grey"],
    openings: ["Tank!"]
  });

  add({
    id: "dr_stone", title: "Dr. Stone", genres: ["shonen", "sci-fi", "adventure", "educational"],
    creator: "Riichiro Inagaki", studio: "TMS Entertainment", yearStarted: 2019, protagonist: "Senku Ishigami",
    characters: ["Senku Ishigami", "Taiju Oki", "Yuzuriha Ogawa", "Tsukasa Shishio", "Kohaku", "Chrome", "Gen Asagiri", "Kaseki", "Ukyo Saionji", "Ruri", "Mirai", "Fuli", "Kinro", "Ginro", "Magne", "Amber", "Tungsten", "Carl", "Luna", "Stanley Snyder"],
    villains: ["Tsukasa Shishio", "Stanley Snyder", "Hyoga", "Moz", "Dr. Xeno"],
    abilities: ["Science", "Chemistry", "Engineering", "Medicine", "Mathematics", "Innovation"],
    weapons: ["Sword", "Spear", "Gun", "Chemical Weapons", "Trebuchet", "Steam Engine"],
    techniques: ["Sulfa Drug Production", "Gunpowder Making", "Electricity Generation", "Steam Power", "Rocket Building"],
    locations: ["Ishigami Village", "Stone World", "Corn Village", "Treasure Island", "South America", "Moon Base"],
    organizations: ["Kingdom of Science", "Tsukasa Empire", "Perseus Crew", "Team Human"],
    arcs: ["Stone World Arc", "Village Arc", "Communications Arc", "Treasure Island Arc", "New World Arc", "Science Wars Arc"],
    families: [["Senku Ishigami", "Taiju Oki"], ["Senku Ishigami", "Byakuya Ishigami"]],
    hairColors: ["White", "Black", "Blonde", "Red", "Brown", "Green", "Purple"],
    eyeColors: ["Green", "Black", "Blue", "Red", "Brown"],
    openings: ["Good Morning World", "Sangenshoku", "Rakuen"]
  });

  add({
    id: "no_game_no_life", title: "No Game No Life", genres: ["isekai", "comedy", "fantasy", "ecchi"],
    creator: "Yuu Kamiya", studio: "Madhouse", yearStarted: 2014, protagonist: "Sora",
    characters: ["Sora", "Shiro", "Stephanie Dola", "Jibril", "Tet", "Izuna Hatsuse", "Miko", "Ino Hatsuse", "Fei", "Kurami", "Azril", "Lily", "Viera", "Lula", "Salamander", "Suzu"],
    villains: ["Kurami", "The Old Deus", "Tet", "Various Races"],
    abilities: ["Game Mastery", "Logic", "Strategy", "Programming", "Chess", "Psychology"],
    weapons: ["None (games only)", "Avant Heim"],
    techniques: ["Blank's Gambit", "Psychological Warfare", "Deduction", "8D Chess", "Hacking"],
    locations: ["Disboard", "Elchea Kingdom", "Elven Garden", "Eastern Federation", "Oceand", "Avant Heim", "Crown of Kingdom"],
    organizations: ["The Blank", "Elchea Kingdom", "Eastern Federation", "Werebeast Alliance"],
    arcs: ["Game Arc", "Eastern Federation Arc", "Elven Garden Arc", "Disboard Arc"],
    families: [["Sora", "Shiro"]],
    hairColors: ["Black", "White", "Red", "Blue", "Blonde", "Green", "Pink", "Purple"],
    eyeColors: ["Red", "Blue", "Gold", "Green", "Purple", "Black"],
    openings: ["This Game", "Oracion"]
  });

  add({
    id: "emminence_in_shadow", title: "The Eminence in Shadow", genres: ["isekai", "comedy", "action", "fantasy"],
    creator: "Daisuke Aizawa", studio: "Nexus", yearStarted: 2022, protagonist: "Cid Kagenou (Shadow)",
    characters: ["Cid Kagenou (Shadow)", "Alexia Midgar", "Claire Kagenou", "Rose Oriana", "Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Eta", "Zeta", "Nunally", "Aurora", "Mordred", "Ragnarok", "Perv Asshat", "Skull Face", "John Smith", "Yukime", "Sherry Barnett"],
    villains: ["Cult of Diablos", "Perv Asshat", "Mordred", "Ragnarok"],
    abilities: ["Shadow Mastery", "Mana Manipulation", "Swordsmanship", "Stealth", "Illusions", "Nucleus (Shadow's Power)"],
    weapons: ["Shadow Sword", "Dagger", "Mana Blade", "Gun"],
    techniques: ["Shadow Step", "Shadow Clone", "I Am Atomic", "Slash of Shadows", "Shadow Garden's Techniques"],
    locations: ["Midgar Kingdom", "Shadow Garden HQ", "Academy", "Lawless City", "Oriana Kingdom", "Sanctuary"],
    organizations: ["Shadow Garden", "Cult of Diablos", "Knights of the Round", "Midgar Royalty"],
    arcs: ["Introduction Arc", "Terrorist Arc", "Lawless City Arc", "Oriana Arc", "Blood Moon Arc"],
    families: [["Cid Kagenou (Shadow)", "Claire Kagenou"], ["Alexia Midgar", "Rose Oriana"]],
    hairColors: ["Black", "Blonde", "Red", "Brown", "Silver", "Pink", "Green", "Blue"],
    eyeColors: ["Blue", "Red", "Green", "Gold", "Purple", "Brown", "Black"],
    openings: ["HIGHEST", "Darling in the Night"]
  });

  add({
    id: "apothecary_diaries", title: "The Apothecary Diaries", genres: ["mystery", "historical", "drama", "romance"],
    creator: "Natsu Hyuuga", studio: "TOHO animation", yearStarted: 2023, protagonist: "Maomao",
    characters: ["Maomao", "Jinshi", "Gaoshun", "Xiaolan", "Yingsu", "Lihua", "Lishu", "Meiling", "Sui", "Princess Fuyou", "Rouran", "Tan", "Luomen", "Fengming", "Pai", "Baibi", "Kokuyu", "En'en", "Lingli", "Shishou"],
    villains: ["Court Intrigue", "Various Court Ladies", "Corrupt Officials"],
    abilities: ["Apothecary Knowledge", "Poison Detection", "Deduction", "Medicine", "Chemistry", "Observation"],
    weapons: ["Medicine", "Poison", "Herbs", "Knowledge"],
    techniques: ["Poison Analysis", "Herbal Remedy", "Forensic Examination", "Medical Treatment"],
    locations: ["Rear Palace", "Imperial Court", "Apothecary Shop", "Pleasure District", "Imperial Library", "Garden"],
    organizations: ["Rear Palace", "Imperial Court", "Apothecary Shop"],
    arcs: ["Poison Taster Arc", "Court Arc", "Garden Party Arc", "Fertility Arc", "Military Arc"],
    families: [["Maomao", "Luomen"], ["Jinshi", "Gaoshun"]],
    hairColors: ["Black", "Blonde", "Brown", "Red", "Silver", "Green"],
    eyeColors: ["Black", "Blue", "Green", "Red", "Brown", "Grey"],
    openings: ["Sumi", "Shiawase no Karte"]
  });

  add({
    id: "to_your_eternity", title: "To Your Eternity", genres: ["drama", "fantasy", "adventure", "supernatural"],
    creator: "Yoshitoki Oima", studio: "Brain's Base", yearStarted: 2021, protagonist: "Fushi",
    characters: ["Fushi", "March", "Parona", "Hayase", "Tonari", "Gugu", "Rean", "Kahak", "Bonchien Nicol Prisma (Bon)", "Suzu", "Eko", "Hisame", "Messar", "Kahak", "Kahaku", "Hayase (descendants)", "Pioran", "Fyodor"],
    villains: ["Hayase", "Nokkers", "Knockers", "Hayase's Clan"],
    abilities: ["Immortality", "Shape-shifting", "Object Creation", "Memory Replication", "Damage Reflection", "Healing"],
    weapons: ["Fist", "Transformed Weapons", "Spirit Weapons"],
    techniques: ["Transformation", "Regeneration", "Spirit Manifestation", "Nokker Purification"],
    locations: ["Ninannah", "Yanome", "Takunaha", "Renril", "Salka", "Lonely Island", "Forest", "Desert"],
    organizations: ["Hayase Clan", "Guardians of Renril", "Knockers"],
    arcs: ["March Arc", "Gugu Arc", "Tonari Arc", "Renril Arc", "Eternal Arc"],
    families: [["Fushi", "March"], ["Fushi", "Gugu"], ["Fushi", "Tonari"]],
    hairColors: ["White", "Black", "Blonde", "Red", "Brown", "Green", "Blue"],
    eyeColors: ["Red", "Brown", "Blue", "Green", "Gold", "Grey", "Purple"],
    openings: ["Pink Blood", "Pulse", "Tropism"]
  });

  add({
    id: "ranking_of_kings", title: "Ranking of Kings", genres: ["fantasy", "adventure", "comedy", "drama"],
    creator: "Sousuke Toka", studio: "WIT Studio", yearStarted: 2021, protagonist: "Bojji",
    characters: ["Bojji", "Kage", "Daida", "Hiling", "Bosse", "Queen Hiling", "Appa", "Mozu", "Miranjo", "Gigan", "Domas", "Hokuro", "Desha", "Despa", "Ouken", "Zurra", "Kage Family", "Bebin", "Sheena", "Kagemitsu"],
    villains: ["Miranjo", "Queen Hiling (initially)", "Bosse", "Domas (initially)"],
    abilities: ["Stealth", "Swordsmanship", "Magic", "Cursed Abilities", "Super Strength", "Shadow Manipulation"],
    weapons: ["Dagger", "Sword", "Shadow Weapons", "Bojji's Sword"],
    techniques: ["Shadow Trap", "Kage's Cut", "Bojji's Determination", "Magic Barrier"],
    locations: ["Kingdom of Bosse", "Castle", "Underworld", "Shadow World", "Training Grounds", "Village", "Underground Lake"],
    organizations: ["Bosse Kingdom", "Shadow Clan", "Underworld Council"],
    arcs: ["Bojji's Training Arc", "Daida's Rule Arc", "Underworld Arc", "Miranjo's Truth Arc", "Final Battle Arc"],
    families: [["Bojji", "Daida"], ["Bojji", "Bosse"], ["Bojji", "Hiling"], ["Kage", "Kagemitsu"]],
    hairColors: ["Black", "White", "Red", "Blonde", "Brown", "Purple", "Pink"],
    eyeColors: ["Black", "Red", "Blue", "Green", "Gold", "Brown", "Grey"],
    openings: ["BOY", "Naked", "Underground"]
  });

  add({
    id: "k_on", title: "K-On!", genres: ["comedy", "slice of life", "music"],
    creator: "Kakifly", studio: "Kyoto Animation", yearStarted: 2009, protagonist: "Yui Hirasawa",
    characters: ["Yui Hirasawa", "Ritsu Tainaka", "Mio Akiyama", "Tsumugi Kotobuki", "Azusa Nakano", "Sawako Yamanaka", "Ui Hirasawa", "Nodoka Manabe", "Suzu", "Megumi", "Jun Suzuki", "Ayame", "Sachi", "Akio", "Tomio"],
    villains: ["None (slice of life)"],
    abilities: ["Guitar", "Drums", "Bass", "Keyboard", "Singing", "Songwriting"],
    weapons: ["Gibson Les Paul", "Fender Jazz Bass", "Yamaha Drum Kit", "Korg Keyboard"],
    techniques: ["Mio's Bass Slap", "Yui's Guitar Solo", "Ritsu's Drum Fill", "Tsumugi's Piano Riff"],
    locations: ["Sakuragaoka High School", "Light Music Club Room", "School Hall", "Culture Festival", "Summer House", "K-On! House", "London"],
    organizations: ["Light Music Club", "After School Tea Time", "School Festival Committee"],
    arcs: ["Formation Arc", "Summer Camp Arc", "School Festival Arc", "Graduation Arc", "College Arc"],
    families: [["Yui Hirasawa", "Ui Hirasawa"], ["Ritsu Tainaka", "Tsumugi Kotobuki"]],
    hairColors: ["Black", "Brown", "Blonde", "Pink", "Grey", "Red", "Purple"],
    eyeColors: ["Brown", "Green", "Blue", "Purple", "Black", "Grey"],
    openings: ["Cagayake! GIRLS", "GO! GO! MANIAC", "Utauyo!! MIRACLE"]
  });

  add({
    id: "inuyasha", title: "Inuyasha", genres: ["action", "romance", "fantasy", "adventure", "historical"],
    creator: "Rumiko Takahashi", studio: "Sunrise", yearStarted: 2000, protagonist: "Inuyasha",
    characters: ["Inuyasha", "Kagome Higurashi", "Miroku", "Sango", "Shippo", "Sesshomaru", "Kikyo", "Kaede", "Jaken", "Rin", "Kohaku", "Naraku", "Myoga", "Koga", "Ayame", "Kirara", "Hachiemon", "Totosai", "Bankotsu", "Jakotsu", "Ginkotsu", "Renkotsu", "Suikotsu", "Mukotsu", "Kaguya", "Byakuya"],
    villains: ["Naraku", "Sesshomaru (initially)", "Kagura", "Kanna", "The Band of Seven", "Hakudoshi", "Byakuya"],
    abilities: ["Swordsmanship", "Magic", "Transformation", "Spirit Powers", "Healing", "Poison", "Flight"],
    weapons: ["Tessaiga", "Bakusaiga", "Tokijin", "Goryomaru", "Tenseiga", "Sacred Arrow", "Kazaana (Wind Tunnel)", "Hiraikotsu"],
    techniques: ["Wind Scar", "Backlash Wave", "Meido Zangetsuha", "Adamant Barrage", "Dragon Strike", "Sesshomaru's Poison Claws"],
    locations: ["Feudal Japan", "Bone Eater's Well", "Kaede's Village", "Castle", "Mountains", "Naraku's Barrier", "Modern Day Tokyo"],
    organizations: ["Band of Seven", "Naraku's Forces", "Inuyasha's Group", "Wolf Demon Tribe"],
    arcs: ["Shikon Jewel Arc", "Band of Seven Arc", "Naraku's Final Form Arc", "Final Act Arc"],
    families: [["Inuyasha", "Sesshomaru"], ["Inuyasha", "Kagome Higurashi"], ["Miroku", "Sango"], ["Sesshomaru", "Rin"]],
    hairColors: ["Black", "White", "Brown", "Red", "Green", "Blonde", "Blue", "Silver"],
    eyeColors: ["Gold", "Brown", "Blue", "Green", "Red", "Purple", "Grey"],
    openings: ["Change the World", "Grip!", "Owarinai Yume", "I am", "Kimi ga Inai Mirai"]
  });

  add({
    id: "yu_yu_hakusho", title: "Yu Yu Hakusho", genres: ["shonen", "supernatural", "action", "martial arts"],
    creator: "Yoshihiro Togashi", studio: "Studio Pierrot", yearStarted: 1992, protagonist: "Yusuke Urameshi",
    characters: ["Yusuke Urameshi", "Kazuma Kuwabara", "Kurama (Shuichi Minamino)", "Hiei", "Keiko Yukimura", "Genkai", "Botan", "Koenma", "Jorge", "Toguro Brothers", "Younger Toguro", "Elder Toguro", "Karasu", "Bui", "Sakyo", "Itsuki", "Sensui", "Shinobu", "Mukuro", "Yomi", "Raizen"],
    villains: ["Younger Toguro", "Elder Toguro", "Sakyo", "Sensui", "Yomi", "Karasu", "Bui", "Itsuki", "Shinobu"],
    abilities: ["Reiki", "Spirit Energy", "Demon Energy", "Healing", "Barrier", "Spirit Gun", "Jigen-To", "Psychic Powers"],
    weapons: ["Spirit Gun", "Jigen-To", "Rose Whip", "Dimension Sword", "Shadow Sword", "Fist"],
    techniques: ["Spirit Gun", "Rei Gun", "Jigen-To", "Kuwabara's Light Sword", "Rose Whip", "Dragon of the Darkness Flame", "Finger of Death", "Razor Ice Fang"],
    locations: ["Spirit World", "Demon World", "Human World", "Dark Tournament Arena", "Castle of Toguro", "Makai", "Reikai"],
    organizations: ["Spirit World (Reikai)", "Toguro Brothers", "Team Urameshi", "Demon World Council", "Sensui's Group", "Psychic Team"],
    arcs: ["Spirit Detective Arc", "Dark Tournament Arc", "Chapter Black Arc", "Demon World Tournament Arc"],
    families: [["Yusuke Urameshi", "Raizen"], ["Kurama (Shuichi Minamino)", "Sawatari"]],
    hairColors: ["Black", "Red", "Brown", "Blonde", "White", "Green", "Silver", "Purple"],
    eyeColors: ["Brown", "Red", "Blue", "Green", "Gold", "Purple", "Black", "Grey"],
    openings: ["Smile Bomb", "Hohoemi no Bakudan", "Dead or Alive"]
  });

  add({
    id: "code_geass", title: "Code Geass", genres: ["mecha", "strategy", "psychological", "drama"],
    creator: "Ichiro Okouchi", studio: "Sunrise", yearStarted: 2006, protagonist: "Lelouch vi Britannia",
    characters: ["Lelouch vi Britannia", "Suzaku Kururugi", "CC (C.C.)", "Kallen Stadtfeld", "Nunnally vi Britannia", "Euphemia li Britannia", "Cornelia li Britannia", "Schneizel el Britannia", "Lloyd Asplund", "Milly Ashford", "Rivalz Cardemonde", "Shirley Fenette", "Anya Alstreim", "Jeremiah Gottwald", "Villetta Nu", "Diethard Ried", "Rakshata Chawla", "Nina Einstein", "Mao", "Charles zi Britannia"],
    villains: ["Charles zi Britannia", "Schneizel el Britannia", "V.V.", "Mao", "Holy Britannian Empire"],
    abilities: ["Geass (Absolute Obedience)", "Strategic Genius", "Mech Pilot", "Intellect", "Command"],
    weapons: ["Knightmare Frame (Lancelot)", "Knightmare Frame (Guren)", "Guns", "Sword"],
    techniques: ["Geass Command", "Zero's Strategy", "Knightmare Combat", "Naraku", "Kallen's Guren Attack"],
    locations: ["Tokyo Settlement", "Ashford Academy", "Britannia", "Aries Villa", "Chinese Federation", "Japan", "Area 11", "Kamine Island", "Geass Ruins"],
    organizations: ["Black Knights", "Holy Britannian Empire", "Order of the Black Knights", "Special Administrative Zone of Japan", "Knights of the Round"],
    arcs: ["Black Rebellion Arc", "Ikaruga Arc", "Ragnarok Connection Arc", "Re;surrection Arc"],
    families: [["Lelouch vi Britannia", "Nunnally vi Britannia"], ["Lelouch vi Britannia", "Euphemia li Britannia"], ["Charles zi Britannia", "Lelouch vi Britannia"]],
    hairColors: ["Black", "Brown", "Blonde", "Red", "Green", "Pink", "White", "Purple"],
    eyeColors: ["Blue", "Green", "Brown", "Purple", "Red", "Gold", "Black"],
    openings: ["Colors", "Kaidoku Function", "JIBUN", "I Dare You"]
  });

  add({
    id: "frieren", title: "Frieren: Beyond Journey's End", genres: ["fantasy", "adventure", "slice of life", "drama"],
    creator: "Kanehito Yamada", studio: "Madhouse", yearStarted: 2023, protagonist: "Frieren",
    characters: ["Frieren", "Fern", "Stark", "Himmel", "Heiter", "Eisen", "Kraft", "Sein", "Stark", "Ubel", "Land", "Wirbel", "Sense", "Methode", "Denken", "Genau", "Linie", "Lernen", "Qual", "Lugner", "Draht"],
    villains: ["Aura the Guillotine", "Lugner", "Linie", "Qual", "Demon King", "Demons (various)"],
    abilities: ["Magic", "Healing", "Swordsmanship", "Elven Longevity", "Zoltraak", "Demon Detection"],
    weapons: ["Staff", "Sword", "Grimoire", "Magic Artifacts"],
    techniques: ["Zoltraak", "Frieren's Barrier", "Stark's Axe", "Fern's Magic Missile", "Doppelganger", "Radiant Prison"],
    locations: ["Continental Magic Region", "Northern Plateau", "King's Capital", "Village of Swords", "Demon Castle", "Goddess Monument", "Evergreen", "Aurea Region"],
    organizations: ["Party of Heroes", "Magic Guild", "Demon Forces", "Continental Magic Association"],
    arcs: ["Hero Party Arc", "Aura Arc", "First Class Mage Exam Arc", "Demon Castle Arc", "Northern Regions Arc", "Goddess Monument Arc"],
    families: [["Frieren", "Himmel (implied)"], ["Fern", "Heiter (adoptive)"], ["Stark", "Eisen"]],
    hairColors: ["White", "Black", "Red", "Blonde", "Green", "Brown", "Purple", "Pink"],
    eyeColors: ["Green", "Red", "Blue", "Brown", "Gold", "Purple", "Grey"],
    openings: ["Yuusha", "Sunny", "Anytime Anywhere"]
  });

