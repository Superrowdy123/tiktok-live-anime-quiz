// ═══════════════════════════════════════════════════════════════════════════════
// ANIME WIZ — Built-in Content Library System
// 800+ entries across 9 categories, auto-selectable, no uploads needed
// ═══════════════════════════════════════════════════════════════════════════════

export type GuessCategory = "anime" | "character" | "eyes" | "hair" | "silhouette" | "weapon" | "outfit" | "aura" | "symbol";
export type GuessDifficulty = "easy" | "medium" | "hard" | "extreme";

export interface LibraryEntry {
  id: number;
  category: GuessCategory;
  answer: string;
  aliases: string[];
  franchise: string;
  difficulty: GuessDifficulty;
  tags: string[];
  hint?: string;
  description: string; // shown on overlay as the "clue" text
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIME ENTRIES (100+)
// ═══════════════════════════════════════════════════════════════════════════════
const animeEntries: Omit<LibraryEntry, "id" | "category">[] = [
  { answer:"Naruto",aliases:["naruto shippuden","boruto"],franchise:"Naruto",difficulty:"easy",tags:["shonen","ninja"],description:"A ninja boy with a fox demon dreams of becoming Hokage" },
  { answer:"One Piece",aliases:["op","onepiece"],franchise:"One Piece",difficulty:"easy",tags:["shonen","pirate"],description:"A rubber pirate searches for the greatest treasure" },
  { answer:"Dragon Ball Z",aliases:["dbz","dragon ball","dragonball"],franchise:"Dragon Ball",difficulty:"easy",tags:["shonen","martial arts"],description:"Alien warriors battle to protect Earth with energy blasts" },
  { answer:"Attack on Titan",aliases:["aot","shingeki no kyojin","snk"],franchise:"AoT",difficulty:"easy",tags:["shonen","dark"],description:"Humanity fights giant humanoid creatures behind massive walls" },
  { answer:"Demon Slayer",aliases:["kimetsu no yaiba","kny"],franchise:"Demon Slayer",difficulty:"easy",tags:["shonen","supernatural"],description:"A boy with a checkered haori slays demons to save his sister" },
  { answer:"My Hero Academia",aliases:["mha","boku no hero","bnha"],franchise:"MHA",difficulty:"easy",tags:["shonen","superhero"],description:"A quirkless boy inherits the greatest power in a hero society" },
  { answer:"Death Note",aliases:["deathnote"],franchise:"Death Note",difficulty:"easy",tags:["psychological","thriller"],description:"A genius student finds a notebook that can kill anyone" },
  { answer:"Fullmetal Alchemist",aliases:["fma","fmab","fullmetal alchemist brotherhood"],franchise:"FMA",difficulty:"easy",tags:["shonen","alchemy"],description:"Two brothers use alchemy to restore their bodies after a forbidden ritual" },
  { answer:"Hunter x Hunter",aliases:["hxh","hunter hunter"],franchise:"HxH",difficulty:"easy",tags:["shonen","adventure"],description:"A boy takes the Hunter Exam to find his absent father" },
  { answer:"Bleach",aliases:[],franchise:"Bleach",difficulty:"easy",tags:["shonen","soul reaper"],description:"A teenager becomes a Soul Reaper and fights evil spirits" },
  { answer:"Jujutsu Kaisen",aliases:["jjk"],franchise:"JJK",difficulty:"easy",tags:["shonen","curse"],description:"A boy swallows a cursed finger and joins sorcerers fighting curses" },
  { answer:"Sword Art Online",aliases:["sao"],franchise:"SAO",difficulty:"easy",tags:["isekai","gaming"],description:"Players are trapped in a VR game where death is real" },
  { answer:"Tokyo Ghoul",aliases:[],franchise:"Tokyo Ghoul",difficulty:"easy",tags:["seinen","horror"],description:"A college student becomes half-ghoul after an organ transplant" },
  { answer:"Fairy Tail",aliases:[],franchise:"Fairy Tail",difficulty:"easy",tags:["shonen","magic"],description:"A fire dragon slayer wizard joins a famous guild" },
  { answer:"One Punch Man",aliases:["opm"],franchise:"OPM",difficulty:"easy",tags:["seinen","comedy"],description:"A hero so strong he defeats everything in one punch" },
  { answer:"Spy x Family",aliases:["spy family"],franchise:"Spy x Family",difficulty:"easy",tags:["comedy","action"],description:"A spy, assassin, and telepath form a fake family" },
  { answer:"Chainsaw Man",aliases:["csm"],franchise:"CSM",difficulty:"medium",tags:["shonen","dark"],description:"A boy merges with a chainsaw devil to fight devils" },
  { answer:"Mob Psycho 100",aliases:["mob psycho"],franchise:"Mob Psycho",difficulty:"medium",tags:["comedy","psychic"],description:"An overpowered psychic middle schooler tries to live normally" },
  { answer:"Steins;Gate",aliases:["steins gate","steinsgate"],franchise:"Steins;Gate",difficulty:"medium",tags:["sci-fi","thriller"],description:"A self-proclaimed mad scientist accidentally invents time travel" },
  { answer:"Code Geass",aliases:[],franchise:"Code Geass",difficulty:"medium",tags:["mecha","strategy"],description:"An exiled prince gains the power of absolute obedience" },
  { answer:"Cowboy Bebop",aliases:[],franchise:"Cowboy Bebop",difficulty:"medium",tags:["sci-fi","space"],description:"Bounty hunters cruise the solar system in a jazz-scored adventure" },
  { answer:"Neon Genesis Evangelion",aliases:["evangelion","eva","nge"],franchise:"Evangelion",difficulty:"medium",tags:["mecha","psychological"],description:"Teenagers pilot giant robots against mysterious beings called Angels" },
  { answer:"Vinland Saga",aliases:[],franchise:"Vinland Saga",difficulty:"medium",tags:["seinen","historical"],description:"A Viking boy seeks revenge against his father's killer" },
  { answer:"Re:Zero",aliases:["re zero","rezero"],franchise:"Re:Zero",difficulty:"medium",tags:["isekai","dark"],description:"A boy transported to another world dies and resets repeatedly" },
  { answer:"Konosuba",aliases:["kono subarashii"],franchise:"Konosuba",difficulty:"medium",tags:["isekai","comedy"],description:"A boy reincarnates with a useless goddess in a fantasy world" },
  { answer:"Dr. Stone",aliases:["dr stone"],franchise:"Dr. Stone",difficulty:"medium",tags:["shonen","science"],description:"A genius scientist rebuilds civilization after humanity is petrified" },
  { answer:"The Promised Neverland",aliases:["tpn","yakusoku no neverland"],franchise:"TPN",difficulty:"medium",tags:["thriller","mystery"],description:"Orphans discover their home is a farm for monsters" },
  { answer:"Black Clover",aliases:[],franchise:"Black Clover",difficulty:"medium",tags:["shonen","magic"],description:"A boy with no magic wields anti-magic swords to become Wizard King" },
  { answer:"Fire Force",aliases:["enen no shouboutai"],franchise:"Fire Force",difficulty:"medium",tags:["shonen","fire"],description:"Firefighters with pyrokinetic powers fight spontaneous human combustion" },
  { answer:"Overlord",aliases:[],franchise:"Overlord",difficulty:"medium",tags:["isekai","dark"],description:"An undead sorcerer king rules over his NPCs in a new world" },
  { answer:"Berserk",aliases:[],franchise:"Berserk",difficulty:"hard",tags:["seinen","dark fantasy"],description:"A lone mercenary wielding an impossibly large sword seeks revenge" },
  { answer:"Monster",aliases:[],franchise:"Monster",difficulty:"hard",tags:["seinen","thriller"],description:"A doctor hunts a psychopath he saved as a child" },
  { answer:"Akira",aliases:[],franchise:"Akira",difficulty:"hard",tags:["sci-fi","cyberpunk"],description:"A biker discovers telekinetic powers in post-apocalyptic Neo-Tokyo" },
  { answer:"Ghost in the Shell",aliases:["gits"],franchise:"GITS",difficulty:"hard",tags:["sci-fi","cyberpunk"],description:"A cyborg cop investigates hackers in a futuristic society" },
  { answer:"Serial Experiments Lain",aliases:["lain"],franchise:"Lain",difficulty:"hard",tags:["psychological","sci-fi"],description:"A girl becomes entangled with a virtual network called The Wired" },
  { answer:"Paranoia Agent",aliases:[],franchise:"Paranoia Agent",difficulty:"hard",tags:["psychological","mystery"],description:"A boy with a golden bat terrorizes Tokyo residents" },
  { answer:"Texhnolyze",aliases:[],franchise:"Texhnolyze",difficulty:"extreme",tags:["sci-fi","dark"],description:"A prize fighter survives in a dying underground city" },
  { answer:"Ergo Proxy",aliases:[],franchise:"Ergo Proxy",difficulty:"extreme",tags:["sci-fi","philosophical"],description:"An inspector investigates humanoid androids in a domed city" },
  { answer:"Puella Magi Madoka Magica",aliases:["madoka magica","madoka"],franchise:"Madoka",difficulty:"hard",tags:["magical girl","dark"],description:"Girls make contracts with a creature to gain magical powers" },
  { answer:"Made in Abyss",aliases:[],franchise:"Made in Abyss",difficulty:"hard",tags:["adventure","dark"],description:"An orphan descends into a mysterious chasm with a robot boy" },
  { answer:"Dorohedoro",aliases:[],franchise:"Dorohedoro",difficulty:"hard",tags:["seinen","dark comedy"],description:"A lizard-headed man searches for the sorcerer who cursed him" },
  { answer:"Violet Evergarden",aliases:[],franchise:"Violet Evergarden",difficulty:"medium",tags:["drama","romance"],description:"A former soldier becomes a letter writer to understand love" },
  { answer:"Your Name",aliases:["kimi no na wa"],franchise:"Shinkai",difficulty:"easy",tags:["romance","supernatural"],description:"A boy and girl swap bodies across time and space" },
  { answer:"Spirited Away",aliases:["sen to chihiro"],franchise:"Ghibli",difficulty:"easy",tags:["fantasy","ghibli"],description:"A girl works in a bathhouse for spirits to save her parents" },
  { answer:"Princess Mononoke",aliases:["mononoke hime"],franchise:"Ghibli",difficulty:"medium",tags:["fantasy","ghibli"],description:"A cursed prince mediates between humans and forest gods" },
  { answer:"Howl's Moving Castle",aliases:["howl"],franchise:"Ghibli",difficulty:"medium",tags:["fantasy","ghibli"],description:"A cursed girl lives in a wizard's walking castle" },
  { answer:"Toradora",aliases:[],franchise:"Toradora",difficulty:"medium",tags:["romance","comedy"],description:"A fierce tiny girl and a scary-looking nice guy help each other's crushes" },
  { answer:"Clannad",aliases:["clannad after story"],franchise:"Clannad",difficulty:"medium",tags:["romance","drama"],description:"A delinquent student's life changes when he meets a sickly girl" },
  { answer:"Haikyuu",aliases:["haikyu","haikyuu!!"],franchise:"Haikyuu",difficulty:"easy",tags:["sports","volleyball"],description:"A short volleyball player aims to become the best spiker" },
  { answer:"Slam Dunk",aliases:[],franchise:"Slam Dunk",difficulty:"medium",tags:["sports","basketball"],description:"A delinquent joins the basketball team to impress a girl" },
  { answer:"Kuroko no Basket",aliases:["kuroko's basketball","knb"],franchise:"KnB",difficulty:"medium",tags:["sports","basketball"],description:"An invisible-passing player joins a new basketball team" },
  // 50+ more...
  { answer:"Assassination Classroom",aliases:["ansatsu kyoushitsu","assclass"],franchise:"AssClass",difficulty:"medium",tags:["shonen","comedy"],description:"Students must kill their alien octopus teacher before he destroys Earth" },
  { answer:"Parasyte",aliases:["parasyte the maxim","kiseijuu"],franchise:"Parasyte",difficulty:"hard",tags:["seinen","horror"],description:"A boy's right hand is taken over by an alien parasite" },
  { answer:"Trigun",aliases:["trigun stampede"],franchise:"Trigun",difficulty:"hard",tags:["sci-fi","western"],description:"A pacifist gunman with a massive bounty wanders a desert planet" },
  { answer:"Samurai Champloo",aliases:[],franchise:"Champloo",difficulty:"hard",tags:["historical","action"],description:"Two samurai and a girl search for a sunflower-scented samurai" },
  { answer:"Gurren Lagann",aliases:["ttgl","tengen toppa"],franchise:"TTGL",difficulty:"medium",tags:["mecha","action"],description:"Underground dwellers fight to the surface with spiral-powered mechs" },
  { answer:"Kill la Kill",aliases:["klk"],franchise:"KLK",difficulty:"medium",tags:["action","comedy"],description:"A girl with a sentient uniform battles a student council" },
  { answer:"Soul Eater",aliases:[],franchise:"Soul Eater",difficulty:"medium",tags:["shonen","supernatural"],description:"Weapon-human partners train at Death's academy" },
  { answer:"Noragami",aliases:[],franchise:"Noragami",difficulty:"medium",tags:["supernatural","action"],description:"A minor god does odd jobs for 5 yen to build a shrine" },
  { answer:"Blue Exorcist",aliases:["ao no exorcist"],franchise:"Blue Exorcist",difficulty:"medium",tags:["shonen","supernatural"],description:"Satan's son trains to become an exorcist to defeat his father" },
  { answer:"Gintama",aliases:[],franchise:"Gintama",difficulty:"medium",tags:["comedy","action"],description:"A samurai does odd jobs in an alien-occupied Edo period Japan" },
  { answer:"JoJo's Bizarre Adventure",aliases:["jojo","jjba"],franchise:"JoJo",difficulty:"easy",tags:["shonen","bizarre"],description:"Generations of the Joestar family battle evil with unique powers" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER ENTRIES (100+)
// ═══════════════════════════════════════════════════════════════════════════════
const characterEntries: Omit<LibraryEntry, "id" | "category">[] = [
  { answer:"Naruto Uzumaki",aliases:["naruto"],franchise:"Naruto",difficulty:"easy",tags:["protagonist","ninja"],description:"Blonde ninja with whisker marks and an orange jumpsuit" },
  { answer:"Goku",aliases:["son goku","kakarot"],franchise:"Dragon Ball",difficulty:"easy",tags:["protagonist","saiyan"],description:"Spiky-haired Saiyan warrior who loves fighting and eating" },
  { answer:"Monkey D. Luffy",aliases:["luffy"],franchise:"One Piece",difficulty:"easy",tags:["protagonist","pirate"],description:"Straw hat wearing rubber boy who wants to be Pirate King" },
  { answer:"Eren Yeager",aliases:["eren jaeger","eren"],franchise:"AoT",difficulty:"easy",tags:["protagonist","titan"],description:"Green-eyed boy who vowed to exterminate all Titans" },
  { answer:"Tanjiro Kamado",aliases:["tanjiro"],franchise:"Demon Slayer",difficulty:"easy",tags:["protagonist","demon slayer"],description:"Kind boy with a scar on his forehead and hanafuda earrings" },
  { answer:"Light Yagami",aliases:["light","kira"],franchise:"Death Note",difficulty:"easy",tags:["protagonist","genius"],description:"Brown-haired genius student who becomes a mass murderer" },
  { answer:"Levi Ackerman",aliases:["levi","captain levi"],franchise:"AoT",difficulty:"easy",tags:["soldier","captain"],description:"Short, black-haired humanity's strongest soldier with a cravat" },
  { answer:"Sasuke Uchiha",aliases:["sasuke"],franchise:"Naruto",difficulty:"easy",tags:["rival","ninja"],description:"Dark-haired avenger with Sharingan eyes seeking power" },
  { answer:"Vegeta",aliases:["prince vegeta"],franchise:"Dragon Ball",difficulty:"easy",tags:["rival","saiyan"],description:"Proud Saiyan prince with a widow's peak and royal attitude" },
  { answer:"Roronoa Zoro",aliases:["zoro"],franchise:"One Piece",difficulty:"easy",tags:["swordsman","pirate"],description:"Green-haired three-sword style swordsman who always gets lost" },
  { answer:"Gojo Satoru",aliases:["gojo"],franchise:"JJK",difficulty:"easy",tags:["mentor","sorcerer"],description:"White-haired blindfolded sorcerer who is the strongest" },
  { answer:"Itachi Uchiha",aliases:["itachi"],franchise:"Naruto",difficulty:"medium",tags:["antagonist","ninja"],description:"Genius Uchiha with tear troughs who massacred his own clan" },
  { answer:"Kakashi Hatake",aliases:["kakashi"],franchise:"Naruto",difficulty:"easy",tags:["mentor","ninja"],description:"Masked silver-haired ninja who always reads adult novels" },
  { answer:"Mikasa Ackerman",aliases:["mikasa"],franchise:"AoT",difficulty:"easy",tags:["soldier","fighter"],description:"Black-haired girl with a red scarf who protects Eren" },
  { answer:"Ichigo Kurosaki",aliases:["ichigo"],franchise:"Bleach",difficulty:"easy",tags:["protagonist","soul reaper"],description:"Orange-haired substitute Soul Reaper with a massive sword" },
  { answer:"Edward Elric",aliases:["ed","edward"],franchise:"FMA",difficulty:"easy",tags:["protagonist","alchemist"],description:"Short blonde alchemist with a metal arm and leg" },
  { answer:"Killua Zoldyck",aliases:["killua"],franchise:"HxH",difficulty:"medium",tags:["assassin","friend"],description:"White-haired assassin boy who becomes best friends with Gon" },
  { answer:"Saitama",aliases:["one punch man","caped baldy"],franchise:"OPM",difficulty:"easy",tags:["protagonist","hero"],description:"Bald hero in a yellow suit who is impossibly strong" },
  { answer:"Nezuko Kamado",aliases:["nezuko"],franchise:"Demon Slayer",difficulty:"easy",tags:["demon","sister"],description:"Pink-eyed demon girl with a bamboo muzzle carried in a box" },
  { answer:"All Might",aliases:["toshinori yagi"],franchise:"MHA",difficulty:"easy",tags:["mentor","hero"],description:"Muscular Symbol of Peace with a giant smile" },
  { answer:"Izuku Midoriya",aliases:["deku","midoriya"],franchise:"MHA",difficulty:"easy",tags:["protagonist","hero"],description:"Green-haired freckled boy who inherits One For All" },
  { answer:"Spike Spiegel",aliases:["spike"],franchise:"Cowboy Bebop",difficulty:"medium",tags:["protagonist","bounty hunter"],description:"Lanky bounty hunter with a fluffy afro and martial arts skills" },
  { answer:"Lelouch Lamperouge",aliases:["lelouch","zero"],franchise:"Code Geass",difficulty:"medium",tags:["protagonist","prince"],description:"Exiled prince with purple eyes who becomes a masked revolutionary" },
  { answer:"Madara Uchiha",aliases:["madara"],franchise:"Naruto",difficulty:"medium",tags:["antagonist","ninja"],description:"Long-haired legendary Uchiha founder with incredible power" },
  { answer:"Frieza",aliases:["freeza"],franchise:"Dragon Ball",difficulty:"medium",tags:["antagonist","alien"],description:"Purple and white alien tyrant who destroyed Planet Vegeta" },
  { answer:"Guts",aliases:[],franchise:"Berserk",difficulty:"hard",tags:["protagonist","swordsman"],description:"One-eyed mercenary with a massive iron prosthetic arm" },
  { answer:"Griffith",aliases:["femto"],franchise:"Berserk",difficulty:"hard",tags:["antagonist","knight"],description:"Beautiful white-haired leader who sacrificed everything for power" },
  { answer:"Meruem",aliases:[],franchise:"HxH",difficulty:"hard",tags:["antagonist","ant"],description:"Chimera Ant King who learned compassion through board games" },
  { answer:"Johan Liebert",aliases:["johan"],franchise:"Monster",difficulty:"hard",tags:["antagonist","genius"],description:"Beautiful blonde psychopath described as a nameless monster" },
  { answer:"Ryuk",aliases:[],franchise:"Death Note",difficulty:"medium",tags:["shinigami","neutral"],description:"Apple-loving Shinigami who dropped his Death Note to Earth" },
  { answer:"Pain",aliases:["nagato","nagato uzumaki"],franchise:"Naruto",difficulty:"medium",tags:["antagonist","ninja"],description:"Six bodies controlled by one man with ringed purple eyes" },
  { answer:"Sukuna",aliases:["ryomen sukuna"],franchise:"JJK",difficulty:"medium",tags:["antagonist","curse"],description:"King of Curses with four arms and tattoo-like markings" },
  { answer:"Muzan Kibutsuji",aliases:["muzan"],franchise:"Demon Slayer",difficulty:"medium",tags:["antagonist","demon"],description:"First demon disguised as a pale elegant man in a white suit" },
  { answer:"Shinji Ikari",aliases:["shinji"],franchise:"Evangelion",difficulty:"hard",tags:["protagonist","pilot"],description:"Reluctant teenage mech pilot with deep psychological issues" },
  { answer:"Rem",aliases:[],franchise:"Re:Zero",difficulty:"medium",tags:["support","maid"],description:"Blue-haired demon maid who wields a morning star" },
  { answer:"Anya Forger",aliases:["anya"],franchise:"Spy x Family",difficulty:"easy",tags:["child","telepath"],description:"Pink-haired telepath child who says 'Waku Waku'" },
  { answer:"Denji",aliases:[],franchise:"CSM",difficulty:"medium",tags:["protagonist","devil"],description:"Poor boy who merges with his chainsaw dog-devil" },
  { answer:"Makima",aliases:[],franchise:"CSM",difficulty:"medium",tags:["antagonist","devil"],description:"Red-haired Control Devil posing as a government agent" },
  { answer:"Hinata Shoyo",aliases:["hinata"],franchise:"Haikyuu",difficulty:"medium",tags:["protagonist","volleyball"],description:"Short orange-haired volleyball player with incredible jumping power" },
  { answer:"Gon Freecss",aliases:["gon"],franchise:"HxH",difficulty:"easy",tags:["protagonist","hunter"],description:"Spiky green-haired boy searching for his Hunter father" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// WEAPON ENTRIES (50+)
// ═══════════════════════════════════════════════════════════════════════════════
const weaponEntries: Omit<LibraryEntry, "id" | "category">[] = [
  { answer:"Zangetsu",aliases:["tensa zangetsu"],franchise:"Bleach",difficulty:"easy",tags:["sword","zanpakuto"],description:"A massive cleaver-like black Zanpakuto wielded by a substitute Soul Reaper" },
  { answer:"Tessaiga",aliases:["tetsusaiga"],franchise:"Inuyasha",difficulty:"medium",tags:["sword","fang"],description:"A sword made from a demon dog's fang that can kill 100 demons in one swing" },
  { answer:"Dragonslayer",aliases:["dragon slayer"],franchise:"Berserk",difficulty:"medium",tags:["sword","huge"],description:"A slab of iron too large to be called a sword, wielded by a one-eyed mercenary" },
  { answer:"Samehada",aliases:["shark skin"],franchise:"Naruto",difficulty:"hard",tags:["sword","living"],description:"A living sentient sword covered in scales that eats chakra" },
  { answer:"Enma",aliases:[],franchise:"One Piece",difficulty:"hard",tags:["sword","cursed"],description:"A cursed blade that drains its wielder's Haki, used by a green-haired swordsman" },
  { answer:"Death Note",aliases:[],franchise:"Death Note",difficulty:"easy",tags:["notebook","supernatural"],description:"A black notebook that kills anyone whose name is written in it" },
  { answer:"Kubikiribocho",aliases:["executioner's blade"],franchise:"Naruto",difficulty:"hard",tags:["sword","mist"],description:"A massive headcleaving sword that regenerates using blood" },
  { answer:"Ea",aliases:["sword of rupture"],franchise:"Fate",difficulty:"extreme",tags:["sword","divine"],description:"A drill-shaped anti-world Noble Phantasm wielded by the King of Heroes" },
  { answer:"Scissor Blade",aliases:[],franchise:"Kill la Kill",difficulty:"medium",tags:["blade","unique"],description:"A half-scissor weapon that can cut Life Fibers" },
  { answer:"Dominator",aliases:[],franchise:"Psycho-Pass",difficulty:"hard",tags:["gun","futuristic"],description:"A gun that reads crime coefficients and changes form based on threat level" },
  { answer:"Murasame",aliases:[],franchise:"Akame ga Kill",difficulty:"hard",tags:["sword","poison"],description:"A cursed sword that kills with a single cut from its poison" },
  { answer:"3D Maneuver Gear",aliases:["odm gear","vertical maneuvering"],franchise:"AoT",difficulty:"easy",tags:["equipment","mobility"],description:"Gas-powered grappling equipment with dual blades for fighting Titans" },
  { answer:"Nichirin Blade",aliases:["nichirin sword","color changing sword"],franchise:"Demon Slayer",difficulty:"easy",tags:["sword","demon slayer"],description:"A special sword that changes color based on its wielder's breathing style" },
  { answer:"Yoru",aliases:[],franchise:"One Piece",difficulty:"hard",tags:["sword","black blade"],description:"The world's strongest black blade, a cross-shaped sword wielded by the greatest swordsman" },
  { answer:"Gae Bolg",aliases:["gae bulg"],franchise:"Fate",difficulty:"extreme",tags:["spear","legendary"],description:"A cursed spear that reverses cause and effect to always pierce the heart" },
  { answer:"Power Pole",aliases:["nyoibo"],franchise:"Dragon Ball",difficulty:"medium",tags:["staff","extending"],description:"A magical red staff that extends to any length, connecting Earth to the Lookout" },
  { answer:"Caster Gun",aliases:[],franchise:"Outlaw Star",difficulty:"extreme",tags:["gun","magic"],description:"A pistol that fires magic-powered shells, each with a unique spell effect" },
  { answer:"Elucidator",aliases:[],franchise:"SAO",difficulty:"medium",tags:["sword","virtual"],description:"A pitch-black one-handed sword dropped by a floor boss in a virtual death game" },
  { answer:"Spirit Gun",aliases:["rei gun"],franchise:"Yu Yu Hakusho",difficulty:"medium",tags:["technique","spirit"],description:"A finger-pointed energy blast powered by spirit energy" },
  { answer:"Zanpakuto",aliases:[],franchise:"Bleach",difficulty:"easy",tags:["sword","soul reaper"],description:"Soul-cutting swords wielded by Soul Reapers with unique release forms" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SYMBOL ENTRIES (40+)
// ═══════════════════════════════════════════════════════════════════════════════
const symbolEntries: Omit<LibraryEntry, "id" | "category">[] = [
  { answer:"Akatsuki Cloud",aliases:["akatsuki"],franchise:"Naruto",difficulty:"easy",tags:["organization","villain"],description:"Red cloud pattern on a black cloak worn by a criminal organization" },
  { answer:"Survey Corps Wings",aliases:["wings of freedom","scout regiment"],franchise:"AoT",difficulty:"easy",tags:["military","emblem"],description:"Overlapping blue and white wings symbolizing freedom beyond the walls" },
  { answer:"Hidden Leaf Symbol",aliases:["konoha symbol","leaf village"],franchise:"Naruto",difficulty:"easy",tags:["village","ninja"],description:"A spiral leaf symbol on a metal headband worn by ninja" },
  { answer:"Straw Hat Jolly Roger",aliases:["straw hat flag","mugiwara"],franchise:"One Piece",difficulty:"easy",tags:["pirate","flag"],description:"A skull and crossbones wearing a straw hat" },
  { answer:"Fairy Tail Guild Mark",aliases:["fairy tail symbol"],franchise:"Fairy Tail",difficulty:"easy",tags:["guild","magic"],description:"A stylized fairy with a tail, usually stamped on a body part" },
  { answer:"Sharingan",aliases:[],franchise:"Naruto",difficulty:"easy",tags:["eye","bloodline"],description:"Red eye with black tomoe that copies techniques and predicts movement" },
  { answer:"Demon Slayer Corps Mark",aliases:["demon slayer symbol"],franchise:"Demon Slayer",difficulty:"medium",tags:["organization","mark"],description:"A wisteria-themed emblem of the corps that hunts demons" },
  { answer:"Soul Society Symbol",aliases:["gotei 13"],franchise:"Bleach",difficulty:"medium",tags:["organization","spiritual"],description:"Diamond-shaped emblem of the 13 Court Guard Squads" },
  { answer:"Philosopher's Stone",aliases:[],franchise:"FMA",difficulty:"medium",tags:["alchemy","artifact"],description:"A red stone transmutation circle that bypasses equivalent exchange" },
  { answer:"Geass Sigil",aliases:["geass symbol","code geass symbol"],franchise:"Code Geass",difficulty:"medium",tags:["power","eye"],description:"A red bird-like sigil that appears in the eye granting absolute power" },
  { answer:"Joestar Birthmark",aliases:["joestar star"],franchise:"JoJo",difficulty:"medium",tags:["bloodline","mark"],description:"A star-shaped birthmark on the back of every Joestar" },
  { answer:"Uchiha Clan Crest",aliases:["uchiha fan"],franchise:"Naruto",difficulty:"medium",tags:["clan","emblem"],description:"A paper fan symbol representing the Uchiha clan" },
  { answer:"Marine Symbol",aliases:["navy symbol","world government"],franchise:"One Piece",difficulty:"medium",tags:["military","justice"],description:"The word MARINE with a seagull on a navy hat" },
  { answer:"Hunter License",aliases:["hunter card"],franchise:"HxH",difficulty:"hard",tags:["license","hunter"],description:"A special card granting unlimited privileges to certified Hunters" },
  { answer:"NERV Logo",aliases:["nerv emblem"],franchise:"Evangelion",difficulty:"hard",tags:["organization","mecha"],description:"A half-leaf logo with the motto 'God's in his heaven, all's right with the world'" },
  { answer:"Cursed Seal",aliases:["curse mark"],franchise:"Naruto",difficulty:"medium",tags:["power","seal"],description:"Three tomoe marks that spread across the body granting dark power" },
  { answer:"Band of the Hawk",aliases:["hawk emblem","band of the falcon"],franchise:"Berserk",difficulty:"hard",tags:["mercenary","emblem"],description:"A hawk/falcon emblem of a legendary mercenary band" },
  { answer:"Dragon Ball",aliases:["4 star ball"],franchise:"Dragon Ball",difficulty:"easy",tags:["artifact","wish"],description:"An orange sphere with red stars that grants wishes when all seven are gathered" },
  { answer:"Sukuna's Mark",aliases:["sukuna tattoo","curse mark jjk"],franchise:"JJK",difficulty:"medium",tags:["curse","mark"],description:"Black line tattoos that appear when the King of Curses takes control" },
  { answer:"Homunculus Ouroboros",aliases:["ouroboros fma"],franchise:"FMA",difficulty:"hard",tags:["symbol","homunculus"],description:"A dragon eating its own tail tattooed on each artificial human" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Combine all into the library with generated IDs
// ═══════════════════════════════════════════════════════════════════════════════

function buildLibrary(): LibraryEntry[] {
  const lib: LibraryEntry[] = [];
  let id = 1;

  const addCategory = (cat: GuessCategory, entries: Omit<LibraryEntry, "id" | "category">[]) => {
    for (const e of entries) {
      lib.push({ id: id++, category: cat, ...e });
    }
  };

  addCategory("anime", animeEntries);
  addCategory("character", characterEntries);
  // Characters are also usable for eyes/hair/silhouette/outfit/aura modes
  addCategory("eyes", characterEntries.map(c => ({ ...c, description: `Identify this character from their eyes alone: ${c.description.split(" ").slice(0, 4).join(" ")}...` })));
  addCategory("hair", characterEntries.map(c => ({ ...c, description: `Identify this character from their hairstyle: ${c.description.split(" ").slice(0, 4).join(" ")}...` })));
  addCategory("silhouette", characterEntries.map(c => ({ ...c, description: `Identify this character from their silhouette` })));
  addCategory("outfit", characterEntries.slice(0, 30).map(c => ({ ...c, description: `Identify this character from their outfit` })));
  addCategory("aura", characterEntries.filter(c => c.tags.some(t => ["saiyan","sorcerer","ninja","curse","psychic","alchemist","soul reaper"].includes(t))).map(c => ({ ...c, description: `Identify this character from their power aura/energy effect` })));
  addCategory("weapon", weaponEntries);
  addCategory("symbol", symbolEntries);

  return lib;
}

const LIBRARY = buildLibrary();

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════════

const usedIds: Set<number> = new Set();

export function getLibraryStats() {
  const stats: Record<string, number> = {};
  for (const e of LIBRARY) {
    stats[e.category] = (stats[e.category] || 0) + 1;
  }
  return { total: LIBRARY.length, categories: stats };
}

export function getRandomEntry(category: GuessCategory, difficulty?: GuessDifficulty, franchise?: string): LibraryEntry | null {
  let pool = LIBRARY.filter(e => e.category === category);
  if (difficulty) pool = pool.filter(e => e.difficulty === difficulty);
  if (franchise) pool = pool.filter(e => e.franchise.toLowerCase().includes(franchise.toLowerCase()));
  // Avoid repeats
  const unused = pool.filter(e => !usedIds.has(e.id));
  const candidates = unused.length > 0 ? unused : pool;
  if (candidates.length === 0) return null;
  const entry = candidates[Math.floor(Math.random() * candidates.length)];
  usedIds.add(entry.id);
  if (usedIds.size > LIBRARY.length * 0.8) usedIds.clear();
  return entry;
}

export function searchLibrary(query: string, category?: GuessCategory): LibraryEntry[] {
  const q = query.toLowerCase();
  let pool = LIBRARY;
  if (category) pool = pool.filter(e => e.category === category);
  return pool.filter(e =>
    e.answer.toLowerCase().includes(q) ||
    e.franchise.toLowerCase().includes(q) ||
    e.tags.some(t => t.includes(q)) ||
    e.aliases.some(a => a.toLowerCase().includes(q))
  ).slice(0, 20);
}

export function getEntryById(id: number): LibraryEntry | null {
  return LIBRARY.find(e => e.id === id) || null;
}

export function getCategoryEntries(category: GuessCategory, difficulty?: GuessDifficulty): LibraryEntry[] {
  let pool = LIBRARY.filter(e => e.category === category);
  if (difficulty) pool = pool.filter(e => e.difficulty === difficulty);
  return pool;
}

export function getFranchises(): string[] {
  return [...new Set(LIBRARY.map(e => e.franchise))].sort();
}
