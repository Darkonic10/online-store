import { book } from "../types/Interfaces"

const books: book[] = [
  {
    id: 1,
    publisher: "Ember",
    description: "Charlotte Davis is in pieces. At seventeen she’s already lost more than most people lose in a lifetime. But she’s learned how to forget.",
    price: 10,
    title: "GIRL IN PIECES",
    author: "Kathleen Glasgow",
    genre: "Young Adult",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781101934715.jpg",
    "https://live.staticflickr.com/65535/49886655867_a5b440205b_b.jpg"],
    stock_balance: 25,
  },
  {
    id: 2,
    publisher: "Quill Tree",
    description: "Adam Silvera reminds us that there’s no life without death and no love without loss in this devastating yet uplifting story about two people whose lives change over the course of one unforgettable day.",
    price: 30,
    title: "THEY BOTH DIE AT THE END",
    author: "Adam Silvera",
    genre: "Young Adult",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780062457790.jpg",
    "https://live.staticflickr.com/65535/49886655562_743c06a6e7_b.jpg"],
    stock_balance: 16,
  },
  {
    id: 3,
    publisher: "Sourcebooks Fire",
    description: "When a girl disappears, who do you suspect?",
    price: 30,
    title: "SHE'S GONE",
    author: "David Bell",
    genre: "Young Adult",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781728254203.jpg",
    "https://live.staticflickr.com/65535/49886343016_aa7916e7e5_b.jpg"],
    stock_balance: 22,
  },
  {
    id: 4,
    publisher: "Ember",
    description: "A beautiful and distinguished family. A private island. A brilliant, damaged girl; a passionate, political boy. A group of four friends—the Liars—whose friendship turns destructive. A revolution. An accident. A secret.",
    price: 20,
    title: "WE WERE LIARS",
    author: "E. Lockhart",
    genre: "Young Adult",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780375984402.jpg",
    "https://live.staticflickr.com/65535/49886655147_9432334b1a_b.jpg"],
    stock_balance: 24,
  },
  {
    id: 5,
    publisher: "Simon & Schuster",
    description: "Liz Buxbaum has always known that Wes Bennett was not boyfriend material. You would think that her next-door neighbor would be a prince candidate for her romantic comedy fantasies, but Wes has only proven himself to be a pain in the butt, ever since they were little. Wes was the kid who put a frog in her Barbie Dreamhouse, the monster who hid a lawn gnome's severed head in her little homemade neighborhood book exchange.",
    price: 20,
    title: "BETTER THAN THE MOVIES",
    author: "Lynn Painter",
    genre: "Young Adult",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781534467637.jpg",
    "https://live.staticflickr.com/65535/49886342726_8e817e3994_b.jpg"],
    stock_balance: 17,
  },
  {
    id: 6,
    publisher: "Viz Media",
    description: "Revisit the Demon Slayer Corps in these novels that each contain five tales of love, friendship, and courage!",
    price: 30,
    title: "DEMON SLAYER: KIMETSU NO YAIBA--THE FLOWER OF HAPPINESS",
    author: "Aya Yajima.",
    genre: "Young Adult",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781974732524.jpg",
    "https://live.staticflickr.com/65535/49886654787_8972ba4bda_b.jpg"],
    stock_balance: 16,
  },
  {
    id: 7,
    publisher: "Knopf",
    description: "It is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will be busier still.",
    price: 15,
    title: "THE BOOK THIEF",
    author: "Markus Zusak",
    genre: "Young Adult",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780375842207.jpg",
    "https://live.staticflickr.com/65535/49886615937_3203a6585c_b.jpg",
    "https://live.staticflickr.com/65535/49885821628_68ce79fa1c_b.jpg"],
    stock_balance: 10,
  },
  {
    id: 8,
    publisher: "Margaret K. McElderry",
    description: "After her mother dies in an accident, sixteen-year-old Bree Matthews wants nothing to do with her family memories or childhood home.",
    price: 10,
    title: "LEGENDBORN",
    author: "Tracy Deonn",
    genre: "Young Adult",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781534441606.jpg",
    "https://live.staticflickr.com/65535/49886653957_dac66b061d_b.jpg"],
    stock_balance: 14,
  },
  {
    id: 9,
    publisher: "Ember",
    description: "The Fault in Our Stars meets Eleanor and Park in this exhilarating and heart-wrenching love story about a girl who learns to live from a boy who intends to die.",
    price: 30,
    title: "ALL THE BRIGHT PLACES",
    author: "Jennifer Niven",
    genre: "Young Adult",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780385755887.jpg",
    "https://live.staticflickr.com/65535/49886340696_b8e243c961_b.jpg"],
    stock_balance: 23,
  },
  {
    id: 10,
    publisher: "Square Fish",
    description: "Ketterdam: a bustling hub of international trade where anything can be had for the right price—and no one knows that better than criminal prodigy Kaz Brekker. Kaz is offered a chance at a deadly heist that could make him rich beyond his wildest dreams. But he can’t pull it off alone. . . ",
    price: 15,
    title: "SIX OF CROWS",
    author: "Leigh Bardugo",
    genre: "Young Adult",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781627792127.jpg",
    "https://live.staticflickr.com/65535/49886652717_04a7bdbf77_b.jpg"],
    stock_balance: 22,
  },
  {
    id: 11,
    publisher: "Spiegel & Grau",
    description: "A memoir about growing up in South Africa by the comedian, now the host of “The Daily Show,” whose birth was the result of an illegal (under apartheid) relationship between a white Swiss father and a black Xhosa mother.",
    price: 20,
    title: "BORN A CRIME",
    author: "Trevor Noah",
    genre: "Race and Civil Rights",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780399588181.jpg",
    "https://live.staticflickr.com/65535/49886652617_51332d233c_b.jpg"],
    stock_balance: 20,
  },
  {
    id: 12,
    publisher: "HarperCollins",
    description: "The story, based in part on interviews, of the black women mathematicians who were hired as “computers” by the precursor of NASA during World War II. The basis of the forthcoming movie.",
    price: 10,
    title: "HIDDEN FIGURES",
    author: "Margot Lee Shetterly",
    genre: "Race and Civil Rights",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780062363619.jpg",
    "https://live.staticflickr.com/65535/49886652517_deab1d2b98_b.jpg"],
    stock_balance: 14,
  },
  {
    id: 13,
    publisher: "Spiegel & Grau",
    description: "A meditation on race in America as well as a personal story by the national correspondent of The Atlantic, framed as a letter to his teenage son. Winner of the National Book Award.",
    price: 15,
    title: "BETWEEN THE WORLD AND ME",
    author: "Ta-Nehisi Coates",
    genre: "Race and Civil Rights",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780679645986.jpg",
    "https://live.staticflickr.com/65535/49885820038_34bd96fc81_b.jpg"],
    stock_balance: 12,
  },
  {
    id: 14,
    publisher: "New Press",
    description: "A law professor takes aim at the “war on drugs” and its impact on black men.",
    price: 10,
    title: "THE NEW JIM CROW",
    author: "Michelle Alexander",
    genre: "Race and Civil Rights",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781595586438.jpg",
    "https://live.staticflickr.com/65535/49886339846_27140066e9_b.jpg"],
    stock_balance: 15,
  },
  {
    id: 15,
    publisher: "Spiegel & Grau",
    description: "A law professor and MacArthur grant recipient's memoir of his decades of work to free innocent people condemned to death.",
    price: 25,
    title: "JUST MERCY",
    author: "Bryan Stevenson",
    genre: "Race and Civil Rights",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780812994520.jpg",
    "https://live.staticflickr.com/65535/49886652127_0d98c673aa_b.jpg"],
    stock_balance: 16,
  },
  {
    id: 16,
    publisher: "Top Shelf Productions",
    description: "All three volumes of Representative John Lewis's memoir of the civil rights movement are collected here.",
    price: 15,
    title: "MARCH TRILOGY",
    author: "John Lewis and Andrew Aydin",
    genre: "Race and Civil Rights",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781603093958.jpg",
    "https://live.staticflickr.com/65535/49886650782_bea57349ee_b.jpg"],
    stock_balance: 21,
  },
  {
    id: 17,
    publisher: "Top Shelf Productions",
    description: "Representative John Lewis of Georgia describes his childhood and the beginning of his involvement in the civil rights movement. The first volume of a trilogy.",
    price: 20,
    title: "MARCH: BOOK ONE",
    author: "John Lewis and Andrew Aydin",
    genre: "Race and Civil Rights",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781603093002.jpg",
    "https://live.staticflickr.com/65535/49885818103_1de957850c_b.jpg"],
    stock_balance: 16,
  },
  {
    id: 18,
    publisher: "Atria / 37 INK",
    description: "Humorous essays on what it is like to be awkward in a world that glorifies cool.",
    price: 15,
    title: "MISADVENTURES OF AWKWARD BLACK GIRL",
    author: "Issa Rae",
    genre: "Race and Civil Rights",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781476749051.jpg",
    "https://live.staticflickr.com/65535/49885817448_614d8af574_b.jpg"],
    stock_balance: 16,
  },
  {
    id: 19,
    publisher: "Penguin",
    description: "Essays by a stand-up comic on topics like race, gender, dating and feminism.",
    price: 15,
    title: "YOU CAN'T TOUCH MY HAIR",
    author: "Phoebe Robinson",
    genre: "Race and Civil Rights",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780143129202.jpg",
    "https://live.staticflickr.com/65535/49886336396_687c172d18_b.jpg"],
    stock_balance: 20,
  },
  {
    id: 20,
    publisher: "Nation",
    description: "The Definitive History of Racist Ideas in America.",
    price: 15,
    title: "STAMPED FROM THE BEGINNING",
    author: "Ibram X Kendi",
    genre: "Race and Civil Rights",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781568584638.jpg",
    "https://live.staticflickr.com/65535/49885816228_8862bac007_b.jpg"],
    stock_balance: 18,
  },
  {
    id: 21,
    publisher: "Harper Perennial",
    description: "100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens.",
    price: 15,
    title: "SAPIENS",
    author: "Yuval Noah Harari",
    genre: "Science",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780062316097.jpg",
    "https://live.staticflickr.com/65535/49886648322_930de3e079_b.jpg"],
    stock_balance: 23,
  },
  {
    id: 22,
    publisher: "Penguin",
    description: "A pioneering researcher and one of the world’s foremost experts on traumatic stress offers a bold new paradigm for healing.",
    price: 10,
    title: "THE BODY KEEPS THE SCORE",
    author: "Bessel van der Kolk",
    genre: "Science",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780670785933.jpg",
    "https://live.staticflickr.com/65535/49885815613_8cda544e01_b.jpg"],
    stock_balance: 12,
  },
  {
    id: 23,
    publisher: "Picador",
    description: "In Being Mortal, author Atul Gawande tackles the hardest challenge of his profession: how medicine can not only improve life but also the process of its ending",
    price: 10,
    title: "BEING MORTAL",
    author: "Atul Gawande",
    genre: "Science",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780805095159.jpg",
    "https://live.staticflickr.com/65535/49885815368_e7f09682d8_b.jpg"],
    stock_balance: 14,
  },
  {
    id: 24,
    publisher: "Farrar, Straus & Giroux",
    description: "In the highly anticipated Thinking, Fast and Slow, Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
    price: 10,
    title: "THINKING, FAST AND SLOW",
    author: "Daniel Kahneman",
    genre: "Science",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781429969352.jpg",
    "https://live.staticflickr.com/65535/49885815118_97fdd3834a_b.jpg"],
    stock_balance: 10,
  },
  {
    id: 25,
    publisher: "Dutton",
    description: "A pioneering and groundbreaking work of narrative nonfiction that offers a dramatic new perspective on the history of humankind, showing how through millennia, the mosquito has been the single most powerful force in determining humanity's fate",
    price: 25,
    title: "THE MOSQUITO",
    author: "Timothy C Winegard",
    genre: "Science",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781524743413.jpg",
    "https://live.staticflickr.com/65535/49885813873_5ac6010c5e_b.jpg"],
    stock_balance: 21,
  },
  {
    id: 26,
    publisher: "Broadway",
    description: "Her name was Henrietta Lacks, but scientists know her as HeLa. She was a poor Southern tobacco farmer who worked the same land as her enslaved ancestors, yet her cells—taken without her knowledge—became one of the most important tools in medicine. The first “immortal” human cells grown in culture, they are still alive today, though she has been dead for more than sixty years.",
    price: 20,
    title: "THE IMMORTAL LIFE OF HENRIETTA LACKS",
    author: "Rebecca Skloot",
    genre: "Science",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781400052189.jpg",
    "https://live.staticflickr.com/65535/49885813568_47ffc6f3f4_b.jpg"],
    stock_balance: 12,
  },
  {
    id: 27,
    publisher: "Little, Brown",
    description: "Beth Macy takes us into the epicenter of America's twenty-plus year struggle with opioid addiction. From distressed small communities in Central Appalachia to wealthy suburbs; from disparate cities to once-idyllic farm towns; it's a heartbreaking trajectory that illustrates how this national crisis has persisted for so long and become so firmly entrenched.",
    price: 25,
    title: "DOPESICK",
    author: "Beth Macy",
    genre: "Science",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780316551243.jpg",
    "https://live.staticflickr.com/65535/49886616197_504c347538_b.jpg",
    "https://live.staticflickr.com/65535/49886303326_329595de1d_b.jpg",
    "https://live.staticflickr.com/65535/49886645942_74b34e8151_b.jpg"],
    stock_balance: 16,
  },
  {
    id: 28,
    publisher: "Scribner",
    description: "Neuroscientist and sleep expert Matthew Walker provides a revolutionary exploration of sleep, examining how it affects every aspect of our physical and mental well-being.",
    price: 25,
    title: "WHY WE SLEEP",
    author: "Matthew Walker",
    genre: "Science",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781501144318.jpg",
    "https://live.staticflickr.com/65535/49886333391_368ddc5af8_b.jpg"],
    stock_balance: 20,
  },
  {
    id: 29,
    publisher: "Spiegel & Grau",
    description: "In Sapiens, he explored our past. In Homo Deus, he looked to our future. Now, one of the most innovative thinkers on the planet turns to the present to make sense of today's most pressing issues.",
    price: 25,
    title: "21 LESSONS FOR THE 21ST CENTURY",
    author: "Yuval Noah Harari",
    genre: "Science",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780525512172.jpg",
    "https://live.staticflickr.com/65535/49886645507_52148785a6_b.jpg"],
    stock_balance: 24,
  },
  {
    id: 30,
    publisher: "Broadway",
    description: "The Power of Introverts in a World That Can't Stop Talking",
    price: 15,
    title: "QUIET",
    author: "Susan Cain",
    genre: "Science",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780307452207.jpg",
    "https://live.staticflickr.com/65535/49886645322_acf7175a41_b.jpg"],
    stock_balance: 10,
  },
  {
    id: 31,
    publisher: "Abrams",
    description: "A woman travels through time — from the 1970s to the pre-Civil War era — in this adaptation of Butler’s 1979 novel.",
    price: 15,
    title: "KINDRED",
    author: "Octavia E Butler, Damian Duffy and John Jennings",
    genre: "Hardcover Graphic Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781419709470.jpg",
    "https://live.staticflickr.com/65535/49886332401_51ac29679d_b.jpg"],
    stock_balance: 10,
  },
  {
    id: 32,
    publisher: "HarperCollins",
    description: "Dr. Trayaurus and Dan must prevent five powerful crystals from falling into the hands of their arch–nemesis, Denton.",
    price: 20,
    title: "DANTDM: TRAYAURUS AND THE ENCHANTED CRYSTAL",
    author: "Dan Middleton, Doreen Mulryan and Mike Love",
    genre: "Hardcover Graphic Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780062574329.jpg",
    "https://live.staticflickr.com/65535/49885811648_8a8396e4c6_b.jpg"],
    stock_balance: 10,
  },
  {
    id: 33,
    publisher: "DC Comics",
    description: "This critically acclaimed story from 1988 offers a possible origin for the Joker.",
    price: 30,
    title: "BATMAN: THE KILLING JOKE",
    author: "Alan Moore and Brian Bolland",
    genre: "Hardcover Graphic Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781401216672.jpg",
    "https://live.staticflickr.com/65535/49886331776_288df84790_b.jpg"],
    stock_balance: 21,
  },
  {
    id: 34,
    publisher: "Candlewick",
    description: "The story of Snow White is reimagined here as a noir tale set in Manhattan during the Great Depression.",
    price: 15,
    title: "SNOW WHITE",
    author: "Matt Phelan",
    genre: "Hardcover Graphic Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780763672331.jpg",
    "https://live.staticflickr.com/65535/49886616372_faebef06e5_b.jpg"],
    stock_balance: 10,
  },
  {
    id: 35,
    publisher: "Houghton Mifflin Harcourt",
    description: "This collection features contributions from Chris Ware, Cece Bell and others.",
    price: 25,
    title: "THE BEST AMERICAN COMICS 2016",
    author: "edited  Roz Chast and Bill Kartalopoulos",
    genre: "Hardcover Graphic Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780544750357.jpg",
    "https://live.staticflickr.com/65535/49885810933_346248643c_b.jpg"],
    stock_balance: 14,
  },
  {
    id: 36,
    publisher: "Abrams",
    description: "The Texas Revolution is the latest subject in this nonfiction series.",
    price: 15,
    title: "NATHAN HALE’S HAZARDOUS TALES: ALAMO ALL–STARS",
    author: "Nathan Hale",
    genre: "Hardcover Graphic Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781419719028.jpg",
    "https://live.staticflickr.com/65535/49886642687_de5e691dcd_b.jpg"],
    stock_balance: 21,
  },
  {
    id: 37,
    publisher: "Drawn & Quarterly",
    description: "The author travels with a team of journalists as they interview civilians and refugees from various war zones.",
    price: 20,
    title: "ROLLING BLACKOUTS: DISPATCHES FROM TURKEY, SYRIA AND IRAQ",
    author: "Sarah Glidden",
    genre: "Hardcover Graphic Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781770462557.jpg",
    "https://live.staticflickr.com/65535/49885794963_bd451f4893_b.jpg"],
    stock_balance: 20,
  },
  {
    id: 38,
    publisher: "Disney-Lucasfilm",
    description: "A new adaptation of the first three movies.",
    price: 30,
    title: "STAR WARS: THE ORIGINAL TRILOGY",
    author: "the staff of the Lucas Film Book Group",
    genre: "Hardcover Graphic Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781484737842.jpg",
    "https://live.staticflickr.com/65535/49885782528_185b57d813_b.jpg",
    "https://live.staticflickr.com/65535/49885793668_a620b4c7cf_b.jpg"],
    stock_balance: 18,
  },
  {
    id: 39,
    publisher: "Little, Brown",
    description: "In the tradition of \"One Thousand and One Nights,\" this book depicts a variety of tales and myths centered on female storytellers in an imaginary world.",
    price: 30,
    title: "ONE HUNDRED NIGHTS OF HERO",
    author: "Isabel Greenberg",
    genre: "Hardcover Graphic Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780316259170.jpg",
    "https://live.staticflickr.com/65535/49886626507_93b32c995d_b.jpg"],
    stock_balance: 20,
  },
  {
    id: 40,
    publisher: "Dark Horse",
    description: "In this sequel to Palahniuk’s 1996 novel, Tyler Durden re-emerges to create mayhem once again.",
    price: 10,
    title: "FIGHT CLUB 2",
    author: "Chuck Palahniuk and Cameron Stewart",
    genre: "Hardcover Graphic Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781616559458.jpg",
    "https://live.staticflickr.com/65535/49885793013_081d884d35_b.jpg"],
    stock_balance: 24,
  },
  {
    id: 41,
    publisher: "Back Bay/Little, Brown",
    description: "Why some people succeed — it has to do with luck and opportunities as well as talent.",
    price: 15,
    title: "OUTLIERS",
    author: "Malcolm Gladwell",
    genre: "Paperback Business Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780316017930.jpg",
    "https://live.staticflickr.com/65535/49886312736_c4fe6e522b_b.jpg"],
    stock_balance: 17,
  },
  {
    id: 42,
    publisher: "Farrar, Straus & Giroux",
    description: "In a thrilling, enchanted world, he’ll learn to go from “I just can’t” to “Yes, I can!”",
    price: 20,
    title: "Now I Know How!",
    author: "Demetra Yuvanu",
    genre: "Hardcover Graphic Books",
    book_image: ["https://live.staticflickr.com/65535/49885792113_d9b4bd6bf1_b.jpg",
    "https://live.staticflickr.com/65535/49885811213_ee00145900_b.jpg"],
    stock_balance: 11,
  },
  {
    id: 43,
    publisher: "Simon & Schuster",
    description: "A biography of the entrepreneur, based on 40 interviews with Jobs conducted over two years.",
    price: 25,
    title: "STEVE JOBS",
    author: "Walter Isaacson",
    genre: "Paperback Business Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781451648553.jpg",
    "https://live.staticflickr.com/65535/49886624947_66f53dd118_b.jpg"],
    stock_balance: 20,
  },
  {
    id: 44,
    publisher: "Wiley",
    description: "How to increase your business’s Web site profits.",
    price: 20,
    title: "CONVERT EVERY CLICK",
    author: "Benji Rabhan",
    genre: "Paperback Business Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781118759677.jpg",
    "https://live.staticflickr.com/65535/49886624702_49309dc328_b.jpg"],
    stock_balance: 16,
  },
  {
    id: 45,
    publisher: "Back Bay/Little Brown",
    description: "How and why certain products and ideas become fads.",
    price: 25,
    title: "TIPPING POINT",
    author: "Malcolm Gladwell",
    genre: "Paperback Business Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780759574731.jpg",
    "https://live.staticflickr.com/65535/49885791603_78ca2b4d93_b.jpg"],
    stock_balance: 16,
  },
  {
    id: 46,
    publisher: "Anchor",
    description: "A veteran of the hotel industry offers an inside look at the not-always-savory tricks of the trade.",
    price: 25,
    title: "HEADS IN BEDS",
    author: "Jacob Tomsky",
    genre: "Paperback Business Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780385535649.jpg",
    "https://live.staticflickr.com/65535/49886624282_95bb7ee27a_b.jpg"],
    stock_balance: 25,
  },
  {
    id: 47,
    publisher: "Riverhead",
    description: "A look at what truly motivates us, and how we can use that knowledge to work smarter and live better.",
    price: 20,
    title: "DRIVE",
    author: "Daniel H Pink",
    genre: "Paperback Business Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9781594484803.jpg",
    "https://live.staticflickr.com/65535/49886623757_96ae495657_b.jpg"],
    stock_balance: 16,
  },
  {
    id: 48,
    publisher: "Harper Perennial",
    description: "A maverick scholar and a journalist apply economic theory to everything from cheating sumo wrestlers to the falling crime rate.",
    price: 15,
    title: "FREAKONOMICS",
    author: "Steven D Levitt and Stephen J Dubner",
    genre: "Paperback Business Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780061234002.jpg",
    "https://live.staticflickr.com/65535/49886308121_40110f39de_b.jpg"],
    stock_balance: 23,
  },
  {
    id: 49,
    publisher: "Picador",
    description: "A simple way to manage complexity.",
    price: 30,
    title: "THE CHECKLIST MANIFESTO",
    author: "Atul Gawande",
    genre: "Paperback Business Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780805091748.jpg",
    "https://live.staticflickr.com/65535/49886620762_e4a2835de3_b.jpg"],
    stock_balance: 19,
  },
  {
    id: 50,
    publisher: "Crown Business",
    description: "How political and economic institutions lead to economic success or failure.",
    price: 15,
    title: "WHY NATIONS FAIL",
    author: "Daron Acemoglu and James A Robinson",
    genre: "Paperback Business Books",
    book_image: ["https://storage.googleapis.com/du-prd/books/images/9780307719232.jpg",
    "https://live.staticflickr.com/65535/49886302821_844733091f_b.jpg",
    "https://live.staticflickr.com/65535/49886307411_d54bf37ea4_b.jpg"],
    stock_balance: 14,
  }
]

export { books }
