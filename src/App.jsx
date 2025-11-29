import React, { useState, useMemo, useEffect } from 'react';
import {
  Star, User, Phone, Lock, Unlock, Search, Filter,
  Music, Play, Pause, Video, ChevronLeft, ChevronRight, Gift,
  Instagram, Twitter, Facebook, Heart, Trophy, X,Terminal
} from 'lucide-react';

// --- CONFIGURATION & DATA ---

// 0. PROFILE IMAGES (For the circular carousel)
const PROFILE_IMAGES = [
 "images/vcwater.jpg",
"images/class7.jpg",
"images/handonchin.jpeg",
"images/pic3.jpg",
"images/cleanshave1.jpg",
"images/eatice1.jpg",
"images/johncena3.jpg",
"images/pic4.jpg",
"images/ground1.jpg",
"images/vcdogsmile.jpg",
"images/blooddonation.jpeg",
"images/class4.jpg",
"images/peace1.jpg",
"images/sum3.jpg",
"images/papercheck2.jpg",
"images/pheonix1.jpg",
"images/sleep4.jpg",
"images/lift1.jpeg",
"images/johncena1.jpg",
"images/eatice2.jpg",
"images/class.jpg",
"images/carrot.jpeg",
"images/vcdogmain.jpg",
"images/oldpg1.jpg",
"images/seeingphone.jpg",
"images/handonchin2.jpg",
"images/cleanshave4.jpg",
"images/sleep3.jpg",
"images/sum1.jpg",
"images/pic1.jpg",
"images/vol1.jpg",
"images/ground2.jpg",
"images/cleanshave3.jpg",
"images/codeleaper1.jpg",
"images/cleanshave2.jpg",
"images/class5.jpg",
"images/vcbigmouth.jpg",
"images/cakecovered.jpeg",
"images/write.jpg",
"images/sleep2.jpg",
"images/gym1.jpg",
"images/papercheck.jpg",
"images/johncena2.jpg",
"images/seeingphone2.jpg",
"images/johncena4.jpg",
"images/toldyouso.jpeg",
"images/vcglass.jpg",
"images/car1.jpg",
"images/pic2.jpg",
"images/handonchin3.jpg",
"images/class3.jpg",
"images/peace1.jpg",
"images/sleep1.jpg",
"images/eatice4.jpg",
"images/gym2.jpg",
"images/eatice3.jpg",
"images/class8.jpg",
"images/class6.jpg",
"images/vc1.jpg",
"images/class2.jpg",
"images/deathstare.jpg",
"images/sleep5.jpg",
"images/sum2.jpg",
"images/vcmic.jpg",
"images/pic2.jpg",
"images/vcnormal.jpg",
"images/hill1.jpg",
"images/vcdog.jpg"
];

// 1. ACCOLADES (Now with images)
const ACCOLADES = [
  { id: 1, title: "Blood Donation", desc: "Even before we knew that there were activity points for blood donation you stepped up ,encouraged me to do the same,These are small things but are a testament to how you are as a person.", src: "images/blooddonation.jpeg" },
  { id: 2, title: "Code Leaper", desc: "Developed the Code Leaper Website.", src: "images/codeleaper1.jpg" },
  { id: 3, title: "Gym Mentor", desc: "You have helped many people in the gym , especially me without you i couldnt have done what i do now, I can actually say i can do most of them by myself now. You never showed any disinterest while teaching someone ", src: " images/gym2.jpg" },
  {id:4,title:"10 SGPA",desc:"You have immense dedication to whatever you put your mind into , achieving a perfect sgpa is no small feat , no room for errors but still you did it , im extra happy because nange nisarga garden alli free agi uta sikthu after a year  .",src:"images/result.jpg"},
  {id:5,title:"LockIn",desc:"You completed a hackathon project requiring 5 people by yourslef ie all the core mechanics , you created a product which we all are proud of even if we werent in top 10, eventhough the fault was clearly ours you didnt get mad , which is a testament how u can lead people while being with them",src:"images/lockin.jpeg"},
  {id:6,title:"Best CR",desc:"Neen cr admele nam class alli bunk culture and unity thumba beledide , especially in 5th sem classige bandirode kammi , Ask anyone of 5F theyll tell our cr is the best,",src:"images/cr1.jpg"},
  {id:7,title:"More to come...",desc:" I believe thay this is just the begining , You will do/create many more good things over time",src:"images/more.jpg"}
];

// 2. SONGS & VIDEO (Sound Gallery)
const MEDIA = {
  songs: [
    { id: 1, title: "ನನ್ನ ಗೆಳತಿ", src: "sounds/aditi.mpeg" },
    { id: 2, title: "ಎರಡನೆಯ ತಪ್ಪು", src: "sounds/anu.mpeg" },
    { id: 3, title: "ಕಡಲು", src: "sounds/bunny.mpeg" },
  ],
  videos: [
    "/sounds/ukulele2.mp4",
    "/sounds/ukulele1.mp4",
    "/sounds/ukulele3.mp4"
  ]
};

// 3. MEMORIES (Gallery) with TAGS
const MEMORIES = [
  { id: 1, src: "/images/blooddonation.jpeg", tags: ["blood", "donation"], date: "2024-11-12", caption: "Blood Donation" },
  { id: 2, src: "/images/cakecovered.jpeg", tags: ["cake", "birthday"], date: "2024-12-02", caption: " cake idi bodyge bekitthu" },
  { id: 3, src: "/images/car1.jpg", tags: ["car", "drive"], date: "gotthilla", caption: "Carrrr" },
  { id: 4, src: "/images/carrot.jpeg", tags: ["carrot", "food"], date: "gotthilla", caption: "Carrot thindre eyesight chennagi irutthe anthe" },
  { id: 5, src: "/images/class.jpg", tags: ["class","think"], date: "2024-11-21", caption: "Too much thinking" },
  { id: 6, src: "/images/class2.jpg", tags: ["class", "think"], date: "2024-11-21", caption: "thinking part 2" },
  { id: 7, src: "/images/class3.jpg", tags: ["class", "school"], date: "2025-03-25", caption: "Class" },
  { id: 8, src: "/images/class4.jpg", tags: ["class", "smile"], date: "2025-03-25", caption: "ahh adond smile noda" },
  { id: 9, src: "/images/class5.jpg", tags: ["class", "sincere"], date: "2025-03-25", caption: "too sincere for his own good , rashmi mam class" },
  { id: 10, src: "/images/class6.jpg", tags: ["class", "cool","no"], date: "2025-09-09", caption: " no photos please" },
  { id: 11, src: "/images/class7.jpg", tags: ["class", "school"], date: "2025-09-10", caption: "phone ge full addict" },
  { id: 12, src: "/images/class8.jpg", tags: ["class", "school"], date: "2025-09-10", caption: "Class" },
  { id: 13, src: "/images/cleanshave1.jpg", tags: ["shave", "look"], date: "2025-06-30", caption: "Clean Shave 1" },
  { id: 14, src: "/images/cleanshave2.jpg", tags: ["shave", "look"], date: "2025-06-30", caption: "Dimple ide antha nange gotthu stop flexing" },
  { id: 15, src: "/images/cleanshave3.jpg", tags: ["shave", "look"], date: "2025-06-30", caption: "Clean Shave 3" },
  { id: 16, src: "/images/cleanshave4.jpg", tags: ["shave", "look"], date: "2023-04-07", caption: "Creepy uncle" },
  { id: 17, src: "/images/codeleaper1.jpg", tags: ["code", "tech","codeleaper"], date: "2025-08-03", caption: "Code Leaper website" },
  { id: 18, src: "/images/deathstare.jpg", tags: ["funny", "stare"], date: "2023-04-20", caption: "Death Stare" },
  { id: 19, src: "/images/eatice1.jpg", tags: ["eat", "icecream"], date: "2024-06-05", caption: "Ice Cream 1" },
  { id: 20, src: "/images/eatice2.jpg", tags: ["eat", "icecream"], date: "2024-06-05", caption: "Ice Cream 2" },
  { id: 21, src: "/images/eatice3.jpg", tags: ["eat", "icecream"], date: "2024-06-05", caption: "Ice Cream 3" },
  { id: 22, src: "/images/eatice4.jpg", tags: ["eat", "icecream"], date: "2024-06-05", caption: "Ice Cream 4" },
  { id: 23, src: "/images/ground1.jpg", tags: ["ground", "shashank","shashank r"], date: "2025-09-15", caption: "near Ground with shashank" },
  { id: 24, src: "/images/ground2.jpg", tags: ["ground", "shashank","shashank r"], date: "2025-09-15", caption: "near Ground 2" },
  { id: 25, src: "/images/gym1.jpg", tags: ["gym", "workout","forearm"], date: "2025-03-07", caption: " forearm speacial 1" },
  { id: 26, src: "/images/gym2.jpg", tags: ["gym", "workout","forearm"], date: "2025-03-07", caption: "forearm special 2" },
  { id: 27, src: "/images/handonchin.jpeg", tags: ["pose", "chin"], date: "gotthilla", caption: "how you doinn" },
  { id: 28, src: "/images/handonchin2.jpg", tags: ["pose", "chin"], date: "2025-03-08", caption: "full pose" },
  { id: 29, src: "/images/handonchin3.jpg", tags: ["pose", "chin"], date: "2025-03-08", caption: "kupla" },
  { id: 30, src: "/images/hill1.jpg", tags: ["hill", "trip"], date: "2023-07-16", caption: "Hill Station insta du photo" },
  { id: 31, src: "/images/johncena1.jpg", tags: ["pose", "johncena"], date: "2024-05-01", caption: "John Cena Pose 1" },
  { id: 32, src: "/images/johncena2.jpg", tags: ["pose", "johncena"], date: "2024-05-01", caption: "John Cena Pose 2" },
  { id: 33, src: "/images/johncena3.jpg", tags: ["pose", "johncena"], date: "2024-05-13", caption: "John Cena Pose 3" },
  { id: 34, src: "/images/johncena4.jpg", tags: ["pose", "johncena"], date: "2024-05-13", caption: "John Cena Pose 4" },
  { id: 35, src: "/images/lift1.jpeg", tags: ["lift", "mirror"], date: "2024-12-02", caption: "Lift alli ninthirodu" },
  { id: 36, src: "/images/oldpg1.jpg", tags: ["pg", "home"], date: "2023-05-13", caption: "hari  PG the good old days" },
  { id: 37, src: "/images/papercheck.jpg", tags: ["paper", "exam","data","datastructure"], date: "gotthilla ", caption: "Data Structure cie Paper Check" },
  { id: 38, src: "/images/papercheck2.jpg", tags: ["paper", "exam"], date: "gotthilla", caption: "olle marks antha smile" },
  { id: 39, src: "/images/peace1.jpg", tags: ["peace", "pose"], date: "2024-12-04", caption: "Peace Sign" },
  { id: 40, src: "/images/pheonix1.jpg", tags: ["pheonix", "pizza","natwest"], date: "2025-08-18", caption: "Pheonix pizza after Natwest" },
  { id: 41, src: "/images/pic1.jpg", tags: ["pic", "random"], date: "2025-03-07", caption: "Random Pic 1" },
  { id: 42, src: "/images/pic2.jpg", tags: ["pic", "random"], date: "2025-03-07", caption: "Random Pic 2" },
  { id: 43, src: "/images/pic3.jpg", tags: ["pic", "random"], date: "2025-04-29", caption: "Random Pic 3" },
  { id: 44, src: "/images/pic4.jpg", tags: ["pic", "random"], date: "2025-04-29", caption: "Random Pic 4" },
  { id: 45, src: "/images/seeingphone.jpg", tags: ["phone", "busy"], date: "2024-06-04", caption: "On Phone 1" },
  { id: 46, src: "/images/seeingphone2.jpg", tags: ["phone", "busy"], date: "gotthilla", caption: "On Phone 2" },
  { id: 47, src: "/images/sleep1.jpg", tags: ["sleep", "nap","audi"], date: "2024-04-22", caption: "Sleeping in audi 1 part 1" },
  { id: 48, src: "/images/sleep2.jpg", tags: ["sleep", "nap","audi"], date: "2024-06-04", caption: "Sleeping in audi 1 part 2" },
  { id: 49, src: "/images/sleep3.jpg", tags: ["sleep", "nap"], date: "2024-06-10", caption: "niddelli sa flex madodu bidalla" },
  { id: 50, src: "/images/sleep4.jpg", tags: ["sleep", "nap"], date: "2024-11-21", caption: "kannada or physics class nidde" },
  { id: 51, src: "/images/sleep5.jpg", tags: ["sleep", "nap","peace"], date: "2024-11-21", caption: "half awake half asleep" },
  { id: 52, src: "/images/sum1.jpg", tags: ["sumanth", "pic"], date: "2025-06-23", caption: "with sumanth 1 " },
  { id: 53, src: "/images/sum2.jpg", tags: ["sumanth", "pic"], date: "2025-06-23", caption: "with sumanth 2" },
  { id: 54, src: "/images/sum3.jpg", tags: ["sumanth", "pic"], date: "2025-03-25", caption: "with sumanth 3" },
  { id: 55, src: "/images/toldyouso.jpeg", tags: ["funny", "meme"], date: "gotthilla", caption: "Told You So" },
  { id: 56, src: "/images/vc1.jpg", tags: ["vc", "call","videocall"], date: "2025-03-08", caption: "Video Call" },
  { id: 57, src: "/images/vcbigmouth.jpg", tags: ["vc", "funny"], date: "2025-03-08", caption: "Big Mouth filter" },
  { id: 58, src: "/images/vcdog.jpg", tags: ["vc", "dog","call","videocall"], date: "2025-03-08", caption: "naayi f2 " },
  { id: 59, src: "/images/vcdogmain.jpg", tags: ["vc", "dog","call","videocall"], date: "2025-03-08", caption: "en madli swaami nan hudugi nayi premi " },
  { id: 60, src: "/images/vcdogsmile.jpg", tags: ["vc", "dog"], date: "2025-03-08", caption: "naayi f1" },
  { id: 61, src: "/images/vcglass.jpg", tags: ["vc", "glass"], date: "2025-03-08", caption: "cooling Glasses f1" },
  { id: 62, src: "/images/vcmic.jpg", tags: ["vc", "mic","call","videocall"], date: "2025-03-08", caption: "singer ultra pro max" },
  { id: 63, src: "/images/vcnormal.jpg", tags: ["vc", "normal","call","videocall"], date: "2025-03-08", caption: "VC" },
  { id: 64, src: "/images/vcwater.jpg", tags: ["vc", "water"], date: "2025-03-08", caption: "kaveri yalli punya snana" },
  { id: 65, src: "/images/vol1.jpg", tags: ["vol", "volunteering","utsav","fest"], date: "2024-02-01", caption: "eraderadu tag " },
  { id: 66, src: "/images/write.jpg", tags: ["write", "letter","love"], date: "2024-06-09", caption: "love letter" },
  {id: 67, src: "/images/sasu.jpeg", tags: ["sanjana", "thangacchi","thangi","sister","cyber","bully","sushmitha","sumanth"], date: "2025-11-27", caption: "with the mahila mandali and sumanth" },
  {id: 68, src: "/images/thangi1.jpeg", tags: ["sanjana", "thangacchi","thangi","sister","cyber","bully","rakhi","rakshabandhana"], date: "2025-09-03", caption: "rakshabandhana admele photoshoot" },
  {id: 69, src: "/images/spider.jpeg", tags: ["manoj","spiderman","sumanth"], date: "2025-11-27", caption: "this trend is old but so is sanath" },
  {id: 70, src: "/images/manoj.jpeg", tags: ["manoj","sumanth"], date: "2025-08-09", caption: "karsiddu yarigo photo thegskondiddu yaroo" },
  { id: 71, src: "/images/achar.jpeg", tags: ["achar","shreyas"], date: "2025-11-27", caption: "with shreyas uppinkayi(hindi)" },
{ id: 72, src: "/images/rai2.jpeg", tags: ["rai","sushanth"], date: "2025-11-27", caption: "rai jothe photo " },
{ id: 73, src: "/images/mitra.jpeg", tags: ["mitra","sarthaka"], date: "2025-11-27", caption: "sarthaka " },
{ id: 74, src: "/images/hb2.jpeg", tags: ["hosabelaku","suhas","sumanth"], date: "2025-11-27", caption: "hosabelaku first official photo" },
{ id: 75, src: "/images/hb1.jpeg", tags: ["hosabelaku","suhas","sumanth"], date: "2025-11-27", caption: "innnond photo" },
{ id: 76, src: "/images/suhasrai.jpeg", tags: ["suhas","rai"], date: "2025-11-27", caption: "the middle benchers" },
{ id: 77, src: "/images/squint2.jpeg", tags: ["squint","whiteshirt","eye"], date: "2025-11-27", caption: "weird poses between the photos part1" },
{ id: 78, src: "/images/turnedback.jpeg", tags: ["turned","back","pose"], date: "2025-11-27", caption: "turned back to see someone??" },
{ id: 79, src: "/images/handsome2.jpeg", tags: ["handsome","pose","style"], date: "2025-11-27", caption: "handsome boii part 2" },
{ id: 80, src: "/images/handsome1.jpeg", tags: ["handsome"], date: "2025-11-27", caption: "handsome boii part 1" },
{ id: 81, src: "/images/handinpant.jpeg", tags: ["pose","style","zip","pant"], date: "2025-11-27", caption: "weird poses between the photos part 2" },
{ id: 82, src: "/images/squint1.jpeg", tags: ["squint"], date: "2025-11-27", caption: "the squint " },
{ id: 83, src: "/images/rai1.jpeg", tags: ["rai","lift"], date: "2025-11-27", caption: "hudgi illa andre enu rai saku" },
{id : 84, src: "/images/hegde.jpeg", tags: ["vasishta"], date: "2025-11-27", caption: "with Vasishta" },
{ id: 85, src: "/images/selfie.jpeg", tags: ["selfie","photo"], date: "2025-11-27", caption: "aparoopa da selfie " },
{id : 86, src: "/images/siblings.jpeg", tags: ["party","dance"], date: "2025-11-27", caption: "The sibling Squad( chotu , thangacchi, annayya ( from left to right))" }

];

// 4. QUIZ DATA
const QUIZ_QUESTIONS = [
  { q: "when did virat kohli join rcb", options: ["2009 july", "2008 august ", "2008 july", "2009 august"], correct: 1 },
  { q: "Who was the man of the match in ipl final 2025", options: ["Virat Kohli", "Rajat Pathidar", "Krunal Pandya", "None of the above"], correct: 2 },
  {q: "Name the restaurant in which sanji worked before joining the straw hat crew?",options:["Baratie","Yoshoku","Sukiyaki","Okonomiyaki"],correct:0},
  {q:"Who was the war hammer titan from the heroes blood line in attack on titan?",options:["Willy Tybur","Yana Tybur","Lara Tybur","william  Galliard"],correct:2},
  {q:"what colour shirt did u wear on the day of solo sfh presentation?",options:["Black","parrot green ","White","blue"],correct:2},
  {q:"what was the first thing i had with u in ur pg?",options:["Maggi","biriyani"," egg omlet","Ice cream"],correct:0}
];
const BUNNY_QUIZ_QUESTIONS = [
  { q: "What is the last name of bunny ?", options: ["MADEN", " MOHSIN", " MAGDUM", "MAZIN"], correct: 2 },
  { q: "What was the NO on bunnys shirt on the day of jhumka sale within college?", options: [ "97","91 ", "98", "83"], correct: 1 },
  { q:"What colour attire did she wear on 13 novemebr (codeIO induction Protocol github workshop",options:["Red","Black","Brown","Green"],correct:0},
  {q:"On what day did you first see her in our class(408)",options:["Wednesday","Thursday","Monday","Friday"],correct:3},
  {q:"Bunny made sanath ",options:["Secular","Socialist","Funny","Mature"],correct:0}

];

// --- COMPONENTS ---

// Confetti Component
const Confetti = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-fall opacity-0"
        style={{
          left: `${Math.random() * 100}%`,
          top: `-${Math.random() * 20}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
          backgroundColor: ['#FFD700', '#FF69B4', '#00BFFF', '#32CD32', '#FFFFFF'][Math.floor(Math.random() * 5)],
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 5 + 5}px`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    ))}
  </div>
);


// 1. ACCOLADES VIEW (Interactive)
const AccoladesView = ({ onBack }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    // 1. HARDCODED REDIRECT FOR CODE LEAPER
    if (item.title === "Code Leaper") {
      window.open("https://code-leaper-bhos.vercel.app/", "_blank"); // REPLACE THIS URL
      return;
    }
    
    // 2. OPEN MODAL FOR OTHERS
    setSelectedItem(item);
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pt-10 px-4 pb-20 text-white">
      <button onClick={onBack} className="mb-6 flex items-center text-white/70 hover:text-white"><ChevronLeft /> Home</button>
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 text-yellow-400">
        <Star className="fill-current" /> Hall of Fame
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ACCOLADES.map((item) => (
          <div 
            key={item.id} 
            onClick={() => handleCardClick(item)}
            className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/20 cursor-pointer hover:scale-105 transition-transform group"
          >
            <div className="h-48 overflow-hidden relative">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-bold text-sm uppercase tracking-widest border border-white px-4 py-2 rounded-full">
                  {item.title === "Code Leaper" ? "Visit Site " : "Read More"}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-2xl mb-2">{item.title}</h3>
              <p className="text-white/80 line-clamp-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL POPUP */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedItem(null)}>
          <div className="bg-gray-900 border border-white/20 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transform transition-all scale-100 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-white hover:text-black transition-colors z-10">
              <X size={20} />
            </button>
            
            <div className="h-64 overflow-hidden">
               <img src={selectedItem.src} className="w-full h-full object-cover" alt={selectedItem.title} />
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-yellow-400">{selectedItem.title}</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {selectedItem.desc}
                <br/><br/>
                <span className="text-sm text-white/50 italic">
                  (Click outside the modal or the 'X' button to close)
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// 7. TERMINAL VIEW (Secret Gateway)
// 7. TERMINAL VIEW (Secret Gateway)
const TerminalView = ({ onBack, onUnlock }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "Microsoft Windows [Version 10.0.19045]",
    "(c) Microsoft Corporation. All rights reserved.",
    "",
    "C:\\Users\\shett\\Downloads\\Projects by San> echo 'Enter access code to start quiz...'"
  ]);
  const [secretVideo, setSecretVideo] = useState(null); // State for secret video modal

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, `C:\\Users\\shett\\Downloads\\Projects by San> ${input}`];
      
      if (cmd === 'bunny') {
        newHistory.push(">> ACCESS GRANTED: SECRET BUNNY PROTOCOL INITIATED...", ">> Loading...");
        setHistory(newHistory);
        setTimeout(() => onUnlock('bunny'), 1500); // Only navigates away for 'bunny'
      } 
      else if (cmd === 'secretvideo') {
        newHistory.push(">> ACCESS GRANTED: SECRET VIDEO DECRYPTION INITIATED...", ">> Loading Video...");
        setHistory(newHistory);
        // Play video directly here, do NOT call onUnlock
        setTimeout(() => setSecretVideo("/sounds/secretvideo.mp4"), 1500); 
      }
      else {
        newHistory.push(">> STANDARD PROTOCOL DETECTED.", ">> Launching Standard Quiz...");
        setHistory(newHistory);
        setTimeout(() => onUnlock('standard'), 1000);
      }
      setInput("");
    }
  };

  return (
    <div className="animate-fadeIn min-h-screen bg-[#1e1e1e] text-gray-300 font-mono p-4 md:p-10 flex flex-col relative">
      <button onClick={onBack} className="self-start mb-4 text-white/50 hover:text-white flex items-center gap-2"><ChevronLeft size={20}/> Exit Terminal</button>
      
      <div className="flex-1 bg-[#000000] border border-[#333] rounded-lg shadow-2xl overflow-hidden flex flex-col max-w-4xl mx-auto w-full relative z-10">
        {/* VS Code Header */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between text-xs select-none">
           <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
             <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
             <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
           </div>
           <div className="text-gray-400">admin@birthday-pc: ~</div>
           <div></div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-1" onClick={() => document.getElementById('term-input').focus()}>
          {history.map((line, i) => (
            <div key={i} className="break-words">{line}</div>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-[#27c93f]">C:\Users\shett\Downloads\Projects by San&gt;</span>
            <input 
              id="term-input"
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              className="flex-1 bg-transparent outline-none border-none text-white caret-white"
            />
          </div>
        </div>
      </div>

      {/* Secret Video Modal - Renders ON TOP of terminal */}
      {secretVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fadeIn p-4">
          <button 
            onClick={() => setSecretVideo(null)}
            className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 z-50 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="w-full max-w-4xl border border-green-500/30 rounded-xl p-1 shadow-[0_0_50px_rgba(0,255,0,0.1)] relative">
            {/* Added aspect-video (16:9) to ensure no cropping */}
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black relative">
                <video controls autoPlay className="w-full h-full object-contain">
                <source src={secretVideo} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
            <div className="absolute top-4 left-4 text-green-500 font-mono text-xs tracking-widest bg-black/50 px-2 py-1 rounded border border-green-500/30 animate-pulse">
              :: SECRET_ARCHIVE_UNLOCKED ::
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. CONTACT VIEW
const ContactView = ({ onBack }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    // Updated Password Logic
    if (password.toLowerCase() === "sanman") {
      setIsLocked(false);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto pt-10 px-4 text-white pb-20">
      <button onClick={onBack} className="mb-8 flex items-center text-white/70 hover:text-white text-lg font-medium"><ChevronLeft size={24} /> Back</button>
      <h1 className="text-5xl font-bold mb-10 text-center">Contact Info</h1>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-[3rem] shadow-2xl border border-white/20">
        
        {isLocked ? (
          /* LOCKED STATE */
          <div className="py-16 px-4">
             <div className="flex flex-col items-center gap-4 mb-8 text-pink-300">
               <div className="p-6 bg-pink-500/20 rounded-full">
                 <Lock size={48} />
               </div>
               <h2 className="font-bold text-3xl">Private Details</h2>
             </div>
             
             <p className="text-center mb-8 text-white/80 text-xl font-medium">what does sanath call himself as?</p>
             
             <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password..."
                  className="flex-1 px-6 py-4 bg-black/20 border border-white/10 rounded-2xl focus:outline-none focus:border-pink-400 text-center placeholder-white/30 text-xl"
                />
                <button 
                  onClick={handleUnlock} 
                  className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-pink-50 transition-colors text-xl"
                >
                  Go
                </button>
             </div>
             {error && <p className="text-red-400 text-lg font-bold text-center mt-6 animate-pulse">Wrong password!</p>}
          </div>
        ) : (
          /* UNLOCKED STATE */
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center gap-3 mb-8 justify-center text-green-400">
               <Unlock size={32} />
               <h2 className="font-bold text-3xl">Access Granted</h2>
            </div>

            {/* 1. WhatsApp Card */}
            <div className="bg-white/5 p-6 rounded-3xl flex items-center gap-8 border border-white/10 hover:bg-white/10 transition-colors">
              <img src="/images/whatsappdp.jpeg" className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-lg" alt="WA" />
              <div>
                <p className="text-sm text-green-400 font-black uppercase tracking-widest mb-1">WhatsApp & Contact</p>
                <p className="text-3xl font-bold tracking-tight">+91 76762 06958</p>
              </div>
            </div>

            {/* 2. Instagram Card */}
            <div className="bg-white/5 p-6 rounded-3xl flex items-center gap-8 border border-white/10 hover:bg-white/10 transition-colors">
              <img src="/images/profile.jpeg" className="w-24 h-24 rounded-full object-cover border-4 border-pink-500 shadow-lg" alt="IG" />
              <div>
                 <p className="text-sm text-pink-400 font-black uppercase tracking-widest mb-1">Instagram ID</p>
                 <p className="text-3xl font-bold tracking-tight">@sanath.44</p>
              </div>
            </div>

            {/* 3. LinkedIn Card */}
            <a 
              href="https://www.linkedin.com/in/sanath-s-shetty?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/5 p-6 rounded-3xl flex items-center gap-8 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <img src="/images/pheonix1.jpg" className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg" alt="LI" />
              <div className="flex-1">
                 <p className="text-sm text-blue-400 font-black uppercase tracking-widest mb-1">LinkedIn</p>
                 <p className="text-3xl font-bold tracking-tight group-hover:underline decoration-blue-400 underline-offset-4">Sanath Shetty</p>
              </div>
              <ChevronRight size={32} className="text-white/30 group-hover:text-white transform group-hover:translate-x-2 transition-transform" />
            </a>

            <button onClick={() => setIsLocked(true)} className="w-full py-5 text-lg font-medium text-white/40 hover:text-white mt-8 border-t border-white/10 transition-colors">
              Lock Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. GALLERY VIEW (Search & Sort)
// 3. GALLERY VIEW (Search, Sort & Lightbox)
const GalleryView = ({ onBack }) => {
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState("alpha"); // Default to alphabetical
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredMemories = useMemo(() => {
    let result = MEMORIES.filter(m => 
      m.tags.some(t => t.includes(search.toLowerCase())) || 
      m.caption.toLowerCase().includes(search.toLowerCase())
    );

    // Sort Logic - Removed date sorting, kept only alphabetical
    if (sortMode === "alpha") {
      result = [...result].sort((a, b) => a.caption.localeCompare(b.caption));
    }

    return result;
  }, [search, sortMode]);

  return (
    <div className="animate-fadeIn pb-20 px-4 pt-6 max-w-5xl mx-auto text-white relative">
      <button onClick={onBack} className="mb-6 flex items-center text-white/70 hover:text-white"><ChevronLeft /> Home</button>

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-end md:items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2"><Camera className="text-pink-300" /> Moments</h1>
        
        <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-3 text-white/50" size={16} />
            <input 
              type="text" 
              placeholder="Search tags..." 
              className="w-full pl-10 pr-4 py-2 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/10 text-white placeholder-white/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        
        {/* Simplified Sort Dropdown */}
        <select 
            className="px-4 py-2 border border-white/30 rounded-full bg-white/10 text-white text-sm font-medium focus:outline-none"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
          >
            <option value="alpha" className="text-gray-800">A-Z</option>
          </select>
      </div>

      {/* Gallery Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {filteredMemories.map(mem => (
          <div key={mem.id} className="break-inside-avoid bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedImage(mem)}>
            <img src={mem.src} className="w-full rounded-xl" alt={mem.caption} loading="lazy" />
            <div className="px-2 pt-2 pb-1">
              <p className="font-bold">{mem.caption}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-white/60">{mem.date}</span>
                
              </div>
            </div>
          </div>
        ))}
      </div>
     {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center overflow-hidden"
          onClick={() => setSelectedImage(null)}
        >
          {/* Image Container */}
          <div 
            className="relative flex flex-col items-center justify-center max-w-full max-h-full p-4"
            onClick={(e) => e.stopPropagation()} 
          >
             {/* Close Button (Positioned relative to the image container) */}
            <button 
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>

            <img 
              src={selectedImage.src} 
              alt={selectedImage.caption} 
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl" 
            />
            
            <div className="mt-4 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-white font-bold text-lg border border-white/10 shrink-0 text-center">
              {selectedImage.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. SOUND GALLERY
const SoundView = ({ onBack }) => {
  const [currentSong, setCurrentSong] = useState(MEDIA.songs[0]);
  const [vIdx, setVIdx] = useState(0);

  const next = () => setVIdx((p) => (p + 1) % MEDIA.videos.length);
  const prev = () => setVIdx((p) => (p - 1 + MEDIA.videos.length) % MEDIA.videos.length);

  return (
    <div className="animate-fadeIn pb-20 px-4 pt-6 max-w-3xl mx-auto text-center text-white">
      <button onClick={onBack} className="mb-6 flex items-center text-white/70 hover:text-white"><ChevronLeft /> Home</button>
      <h1 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">Sound Gallery 🎵</h1>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-xl mb-8 border border-white/20 relative">
        <h2 className="text-xl font-bold mb-4 flex items-center justify-center gap-2"><Video className="text-red-400" /> Featured Video</h2>
        
        <div className="aspect-video bg-black/50 rounded-xl overflow-hidden shadow-inner relative">
          <video key={vIdx} controls className="w-full h-full object-cover">
            <source src={MEDIA.videos[vIdx]} type="video/mp4" />
          </video>
          
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"><ChevronLeft /></button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"><ChevronRight /></button>
        </div>
        <p className="mt-2 text-xs text-white/50">Video {vIdx + 1} / {MEDIA.videos.length}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-xl mb-8 border border-white/20 sticky top-4 z-20">
        <div className="flex items-center gap-4 mb-4">
           <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center animate-spin-slow shadow-lg"><Music size={32} /></div>
           <div className="text-left"><h2 className="font-bold text-xl">{currentSong.title}</h2><p className="text-white/60 text-sm">Now Playing</p></div>
        </div>
        <audio controls autoPlay className="w-full" src={currentSong.src} key={currentSong.id} />
      </div>

      <div className="space-y-4">
        {MEDIA.songs.map(song => (
          <button key={song.id} onClick={() => setCurrentSong(song)} className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all border text-left ${currentSong.id === song.id ? 'bg-white/20 border-pink-400 shadow-lg scale-[1.02]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">{currentSong.id === song.id ? <Play size={16} fill="currentColor"/> : <Music size={16} />}</div>
            <div className="flex-1"><h3 className="font-bold">{song.title}</h3><p className="text-xs text-white/50">Click to play</p></div>
          </button>
        ))}
      </div>
    </div>
  );
};

// 5. ABOUT VIEW
// 5. ABOUT VIEW
const AboutView = ({ onBack }) => {
  const ABOUT_CARDS = [
    { id: 1, label: "Gym boii", src: "/sounds/gym.mp4" },
    { id: 2, label: "Coder++", src: "/sounds/code.mp4" },
    { id: 3, label: "Full Foodie", src: "/sounds/eat.mp4" },
  ];

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pt-10 px-4 text-white pb-20">
      <button onClick={onBack} className="mb-6 flex items-center text-white/70 hover:text-white"><ChevronLeft /> Back</button>
      <div className="text-center">
        <img src={"/images/profile.jpeg"} className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-xl" alt="Him" />
        
        <h1 className="text-4xl font-bold mb-4">About The Birthday boiiii</h1>
        
        <p className="text-lg text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
          our boii is a genius with a lot of muscles ( drishti beelade irali ) , be it gym or 
          coding he excels at both. Eventhough he might not admit it hes HIM. however 
          good of a friend he might be he will for sure trade you for lifetime supply of 
          icecream. He looks out for others and has helped many people be it in the gym 
          or class. He even helped me secure an internship. swalpa nenapina shakti kammi 
          but a craxxy good person.
        </p>

        {/* Video Cards - Scrollable on mobile, Grid on desktop */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x md:grid md:grid-cols-3 md:overflow-visible">
          {ABOUT_CARDS.map((card) => (
            <div key={card.id} className="min-w-[220px] md:min-w-0 flex-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden relative aspect-[9/16] snap-center shadow-2xl group">
              {/* The Background Video */}
              <video
                src={card.src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              
              {/* Label */}
              <div className="absolute bottom-0 inset-x-0 p-6">
                <span className="font-black text-white text-2xl tracking-wider uppercase drop-shadow-md">{card.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 6. QUIZ VIEW
// 6. QUIZ VIEW (Updated to accept props)
const QuizView = ({ onBack, questions }) => {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
   
  const currentQuestions = questions || QUIZ_QUESTIONS; // Fallback

  const handleAnswer = (i) => {
    if (i === currentQuestions[qIndex].correct) setScore(s => s + 1);
    if (qIndex < currentQuestions.length - 1) setQIndex(q => q + 1);
    else setFinished(true);
  };

  return (
    <div className="animate-fadeIn min-h-[80vh] flex flex-col items-center justify-center p-4 text-white">
      <button onClick={onBack} className="self-start mb-6 flex items-center text-white/70 hover:text-white"><ChevronLeft /> Home</button>
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border-t-8 border-yellow-400 border border-white/20">
        {!finished ? (
          <>
            <h2 className="text-2xl font-bold mb-6">{currentQuestions[qIndex].q}</h2>
            <div className="space-y-3">
              {currentQuestions[qIndex].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(i)} className="w-full p-4 bg-white/5 hover:bg-yellow-500/20 rounded-xl font-bold transition-colors text-left flex justify-between group border border-white/10">
                  {opt} <span className="opacity-0 group-hover:opacity-100">👉</span>
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/50 uppercase tracking-widest">Question {qIndex + 1}/{currentQuestions.length}</p>
          </>
        ) : (
          <div className="text-center">
            <Trophy size={64} className="mx-auto text-yellow-400 mb-4" />
            <h2 className="text-3xl font-black mb-2">Score: {score}/{currentQuestions.length}</h2>
            <p className="mb-6 text-white/70">
              {score === currentQuestions.length ? "Perfect Score!" : "Good try!"}
            </p>
            <button onClick={onBack} className="bg-white text-indigo-900 px-8 py-3 rounded-xl font-bold hover:bg-white/90">Back to Home</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [view, setView] = useState("home"); // home, about, contact, gallery, sound, quiz, accolades
 const [currentProfileIdx, setCurrentProfileIdx] = useState(0);
const [quizMode, setQuizMode] = useState("main"); // main or bunny
 const [tvIndex, setTvIndex] = useState(0); // Moved to top level
  const tvVideos = ["/sounds/manasilayo.mp4", "/sounds/yaah.mp4"];
  const getRelativeIndex = (diff) => (currentProfileIdx + diff + PROFILE_IMAGES.length) % PROFILE_IMAGES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProfileIdx((prev) => (prev - 1 + PROFILE_IMAGES.length) % PROFILE_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextProfile = () => setCurrentProfileIdx((prev) => (prev + 1) % PROFILE_IMAGES.length);
  const prevProfile = () => setCurrentProfileIdx((prev) => (prev - 1 + PROFILE_IMAGES.length) % PROFILE_IMAGES.length);
  const handleTerminalUnlock = (mode) => {
    setQuizMode(mode);
    setView("quiz");
  };
  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white animate-gradient">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>


      {/* GLOBAL HEADER (Visible on Home) */}
      {view === "home" && (
        <header className="p-6 flex justify-between items-center animate-fadeIn relative z-20">
          
          {/* Dynamic Side-by-Side Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => setView("about")} 
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:border-white/50"
            >
              About You
            </button>
            <button 
              onClick={() => setView("contact")} 
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:border-white/50"
            >
              Contact Info
            </button>
          </div>
          
          {/* Magnificent Attracting Star */}
          <button 
            onClick={() => setView("accolades")} 
            className="relative group"
          >
            {/* Pulsing Glow Effect */}
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-60 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
            
            {/* The Star Button */}
            <div className="relative bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-500 p-4 rounded-full shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 border-4 border-white/30">
              <Star size={32} fill="white" className="text-white drop-shadow-md" />
            </div>
          </button>
        </header>
      )}


      {/* MAIN CONTENT AREA */}
      <main className="min-h-screen relative z-10">

        {view === "home" && (
          <div className="max-w-md mx-auto px-6 pb-20 pt-4 space-y-8 animate-fadeIn text-center relative z-10">
            <Confetti />
            
            {/* Title Section */}
            <div className="mb-12 relative">
                   <div className="hidden xl:block absolute right-[125%] top-[875px] w-80 z-20">
                 <div className="bg-white/10 backdrop-blur-xl p-4 rounded-[2.5rem] shadow-2xl border border-white/20 transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                    <h3 className="text-orange-400 font-black text-xl mb-3 ml-2 uppercase tracking-wide drop-shadow-md text-left">2023-24 Rewind </h3>
                    <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black shadow-inner relative group">
                      <video controls className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity">
                        <source src="/sounds/oldvid1.mp4" type="video/mp4" />
                      </video>
                    </div>
                 </div>
              </div>
              {/* --- RIGHT SIDE CARD (Talent TV) --- */}
            <div className="hidden xl:block absolute left-[125%] top-[875px] w-80 z-20">
               <div className="bg-white/10 backdrop-blur-xl p-4 rounded-[2.5rem] shadow-2xl border border-white/20 transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                  <h3 className="text-cyan-400 font-black text-xl mb-3 ml-2 uppercase tracking-wide drop-shadow-md text-left">Talent TV </h3>
                  <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black shadow-inner relative group">
                    <video key={tvIndex} controls className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity">
                      <source src={tvVideos[tvIndex]} type="video/mp4" />
                    </video>
                    <div className="absolute bottom-4 inset-x-4 flex justify-between items-center bg-black/60 backdrop-blur-md p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setTvIndex((i) => (i - 1 + tvVideos.length) % tvVideos.length)} className="text-white hover:text-cyan-400"><ChevronLeft size={20}/></button>
                        <span className="text-[10px] font-bold text-white/50 tracking-widest">CH {tvIndex + 1}</span>
                        <button onClick={() => setTvIndex((i) => (i + 1) % tvVideos.length)} className="text-white hover:text-cyan-400"><ChevronRight size={20}/></button>
                    </div>
                  </div>
               </div>
            </div>

              {/* 3D Carousel Container */}
              <div className="relative h-80 w-full max-w-3xl mx-auto flex items-center justify-center overflow-visible perspective-1000">
                
                {/* LEFT IMAGE (Upcoming) - 3D Tilted */}
                <div className="absolute left-4 md:left-10 opacity-40 scale-75 z-0 transition-all duration-700 ease-in-out blur-[2px] rotate-y-12 origin-right">
                   <img 
                     src={PROFILE_IMAGES[getRelativeIndex(-1)]} 
                     className="w-48 h-64 object-cover rounded-3xl shadow-2xl" 
                     alt="Upcoming" 
                   />
                </div>

                {/* CENTER IMAGE (Active) - Radiant & Floating */}
                <div className="relative z-20 transform transition-all duration-700 ease-in-out scale-100 hover:scale-105">
                   <div className="relative group">
                     {/* Magnificent Aura Glow */}
                     <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
                     
                     {/* Main Photo */}
                     <img
                       src={PROFILE_IMAGES[currentProfileIdx]}
                       alt="Birthday Boy"
                       className="w-56 h-72 md:w-64 md:h-80 object-cover rounded-[2rem] border-4 border-white/90 shadow-[0_0_50px_rgba(255,255,255,0.4)] relative z-10"
                     />
                     
                     {/* Glassy Arrows */}
                     <button onClick={prevProfile} className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 transition-all">
                        <ChevronLeft size={28} />
                     </button>
                     <button onClick={nextProfile} className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 transition-all">
                        <ChevronRight size={28} />
                     </button>

                     {/* Floating Badge */}
                     <div className="absolute -bottom-6 right-1/2 translate-x-1/2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-lg font-black px-8 py-2 rounded-full animate-bounce z-30 border-4 border-white shadow-xl whitespace-nowrap transform rotate-[-3deg]">
                      Happy Birthday  kupla!! 
                     </div>
                   </div>
                </div>

                {/* RIGHT IMAGE (Previous) - 3D Tilted */}
                <div className="absolute right-4 md:right-10 opacity-40 scale-75 z-0 transition-all duration-700 ease-in-out blur-[2px] -rotate-y-12 origin-left">
                   <img 
                     src={PROFILE_IMAGES[getRelativeIndex(1)]} 
                     className="w-48 h-64 object-cover rounded-3xl shadow-2xl" 
                     alt="Previous" 
                   />
                </div>
              </div>

               {/* Massive Typography */}
               <div className="relative mt-16">
                 <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-900 drop-shadow-2xl">BISCOTTI'S BDAY HUB</h1>
                 <div className="h-1 w-24 bg-pink-500 mx-auto rounded-full mt-2 mb-4"></div>
                 <p className="text-white/80 text-xl font-bold tracking-widest uppercase text-shadow-sm">Your personalized birthday zone</p>
               </div>
            </div>

            {/* Navigation Cards - Premium Glassmorphism */}
            <div className="space-y-8">
              
              {/* Gallery Card */}
              <button
                onClick={() => setView("gallery")}
                className="w-full bg-white/5 backdrop-blur-xl p-1 rounded-[2.5rem] shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden border border-white/10 hover:border-pink-400/50 ring-1 ring-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600/40 via-purple-600/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="h-44 bg-black/40 rounded-t-[2.3rem] overflow-hidden relative">
                   <img src="images/handonchin3.jpg" className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700 ease-out" alt="Gallery" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                   
                   <div className="absolute bottom-5 left-8 text-left z-10">
                      <span className="text-pink-400 text-xs font-black uppercase tracking-[0.2em] mb-1 block">Memories</span>
                      <span className="text-4xl font-black text-white drop-shadow-lg">View Moments</span>
                   </div>
                </div>
                <div className="p-5 flex justify-between items-center relative z-10 bg-white/5 border-t border-white/5">
                  <span className="text-white/40 text-sm font-medium group-hover:text-white/80 transition-colors">The Photo Dump</span>
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-4 rounded-full text-white shadow-lg group-hover:scale-110 group-hover:rotate-90 transition-all duration-500"><Camera size={24} /></div>
                </div>
              </button>

              {/* Sound Gallery Card */}
              <button
                onClick={() => setView("sound")}
                className="w-full bg-white/5 backdrop-blur-xl p-1 rounded-[2.5rem] shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden border border-white/10 hover:border-indigo-400/50 ring-1 ring-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 via-blue-600/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="h-32 bg-gradient-to-br from-indigo-900/90 to-black rounded-t-[2.3rem] flex items-center justify-center relative overflow-hidden">
                   <Music className="text-white/5 absolute -bottom-6 -right-6 transform rotate-12 group-hover:rotate-45 transition-transform duration-700" size={140} />
                   
                   {/* Animated Visualizer Bars */}
                   <div className="flex gap-3 items-end h-16 pb-4">
                     <div className="w-3 bg-indigo-400 rounded-full animate-[bounce_1s_infinite] h-8 group-hover:bg-white"></div>
                     <div className="w-3 bg-purple-400 rounded-full animate-[bounce_1.2s_infinite] h-12 group-hover:bg-white"></div>
                     <div className="w-3 bg-pink-400 rounded-full animate-[bounce_0.8s_infinite] h-6 group-hover:bg-white"></div>
                     <div className="w-3 bg-blue-400 rounded-full animate-[bounce_1.1s_infinite] h-10 group-hover:bg-white"></div>
                   </div>
                   
                   <div className="absolute bottom-5 left-8 text-left">
                      <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-1 block">Studio</span>
                      <span className="text-4xl font-black text-white drop-shadow-lg">Sound Gallery</span>
                   </div>
                </div>
                <div className="p-5 flex justify-between items-center relative z-10 bg-white/5 border-t border-white/5">
                  <span className="text-white/40 text-sm font-medium group-hover:text-white/80 transition-colors">Tune in to the Sanath FM </span>
                  <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-4 rounded-full text-white shadow-lg group-hover:scale-110 transition-all duration-500"><Play size={24} fill="currentColor" /></div>
                </div>
              </button>
            
              {/* Quiz Card */}
              <button
                onClick={() => setView("terminal")}
                className="w-full bg-black/40 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-500/30 hover:border-green-400 group flex items-center justify-between relative overflow-hidden ring-1 ring-green-500/20"
              >
                 {/* Matrix/Code Rain Effect Background */}
                 <div className="absolute inset-0 opacity-10 bg-[url('https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif')] bg-cover"></div>
                 
                 <div className="text-left relative z-10">
                   <span className="text-green-400 text-xs font-mono font-bold uppercase tracking-[0.2em] mb-2 block">&gt; SYSTEM_CHECK</span>
                   <span className="font-mono font-bold text-3xl text-white group-hover:text-green-300 transition-colors">Terminal_Access</span>
                 </div>
                 <div className="bg-gray-900 p-5 rounded-full text-green-400 shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10 border border-green-500/50">
                   <Terminal size={32} />
                 </div>
              </button>
            </div>
          </div>
        )}

        {/* VIEW RENDERER */}
        {view === "about" && <AboutView onBack={() => setView("home")} />}
        {view === "contact" && <ContactView onBack={() => setView("home")} />}
        {view === "gallery" && <GalleryView onBack={() => setView("home")} />}
        {view === "sound" && <SoundView onBack={() => setView("home")} />}
        {view === "terminal" && <TerminalView onBack={() => setView("home")} onUnlock={handleTerminalUnlock} />}
        {view === "quiz" && <QuizView onBack={() => setView("home")} questions={quizMode === 'bunny' ? BUNNY_QUIZ_QUESTIONS : QUIZ_QUESTIONS} />}
        {view === "accolades" && <AccoladesView onBack={() => setView("home")} />}

      </main>

      <style>{`
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fall {
          0% { transform: translateY(-10%) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall { animation: fall linear infinite; }
        .animate-gradient { background-size: 400% 400%; animation: gradient 15s ease infinite; }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

// Helper icon component
const Camera = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);