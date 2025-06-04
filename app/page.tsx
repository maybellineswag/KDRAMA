'use client';
import React, { CSSProperties, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import './page.css';

// Define track type
interface Track {
  title: string;
  artist: string;
  album: string;
  src: string;
  cover: string;
}

// Define tracks array
const tracks: Track[] = [
  {
    title: "FOMDJ",
    artist: "Playboi Carti",
    album: "MUSIC - SO...",
    src: "https://res.cloudinary.com/your-cloud-name/video/upload/v1/FOMDJ.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/MUSIC_kyv7kl.jpg"
  },
  {
    title: "Nothing But Net",
    artist: "Travis Scott",
    album: "Nothing But Net",
    src: "https://res.cloudinary.com/your-cloud-name/video/upload/v1/Nothing_But_Net.mp3",
    cover: "https://res.cloudinary.com/your-cloud-name/image/upload/v1/nothing_but_net.jpg"
  },
  {
    title: "Nothing But Net (feat. Young Thug & PARTYNEXTDOOR)",
    artist: "Travis Scott",
    album: "Nothing But Net",
    src: "Nothing But Net.mp3",
    cover: "assets/images/nothing but net.jpg"
},
{
    title: "Faith",
    artist: "Lil Uzi Vert",
    album: "Faith",
    src: "Faith.mp3",
    cover: "assets/images/X.png"
},
{
    title: "PORSCHE POET",
    artist: "Lancey Foux",
    album: "PORSCHE POET",
    src: "PORSCHE POET.mp3",
    cover: "assets/images/PORSCHE POET.jpg"
},
{
    title: "ICY GRL",
    artist: "Saweetie",
    album: "ICY GRL",
    src: "ICY GRL.mp3",
    cover: "assets/images/ICY GRL.jpg"
},
{
    title: "Stuck",
    artist: "Miss A",
    album: "Colors",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823977/STUCK_vwndbj.mp3",
    cover: "assets/images/STUCK.jpg"
},
{
    title: "Best Friend",
    artist: "Nettspend",
    album: "Best Friend",
    src: "BEST FRIEND.mp3",
    cover: "assets/images/BEST FRIEND.jpg"
},
{
    title: "MMS",
    artist: "Полка",
    album: "MMS",
    src: "MMS.mp3",
    cover: "assets/images/MMS.jpg"
},
{
    title: "Like This",
    artist: "박혜진 Park Hye Jin",
    album: "How can I",
    src: "LIKE THIS.mp3",
    cover: "assets/images/LIKE THIS.jpg"
},
{
    title: "XOXO",
    artist: "NMIXX",
    album: "Fe304: BREAK",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823999/XOXO_hizqaq.mp3",
    cover: "assets/images/XOXO.jpg"
},
{
    title: "Safe",
    artist: "Young Thug",
    album: "Safe",
    src: "SAFE.mp3",
    cover: "assets/images/SAFE.jpg"
},
{
    title: "russian opps",
    artist: "Osamason",
    album: "russian opps",
    src: "RUSSIAN OPPS.mp3",
    cover: "assets/images/RUSSIAN OPPS.jpg"
},
{
    title: "Avril 14th",
    artist: "Aphex Twin",
    album: "Drukqs",
    src: "AVRIL 14TH.mp3",
    cover: "assets/images/AVRIL 14TH.jpg"
},
{
    title: "Feeling's Gone",
    artist: "Frank Ocean",
    album: "Feeling's Gone",
    src: "FEELINGS GONE.mp3",
    cover: "assets/images/X.png"
},
{
    title: "These Days",
    artist: "Frank Ocean",
    album: "These Days",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748824017/THESE_DAYS_tffn9i.wav",
    cover: "assets/images/X.png"
},
{
    title: "Like I'm Lying",
    artist: "Lancey Foux",
    album: "Like I'm Lying",
    src: "LIKE IM LYING.mp3",
    cover: "assets/images/LIKE IM LYING.jpg"
},
{
    title: "Can't Be Us (Efan, Clou, JFEL Bootleg)",
    artist: "Headie One",
    album: "Can't Be Us",
    src: "CANT BE US.mp3",
    cover: "assets/images/CANT BE US.jpg"
},
{
    title: "Moonlight",
    artist: "Juice WRLD",
    album: "Moonlight",
    src: "MOONLIGHT.mp3",
    cover: "assets/images/MOONLIGHT.jpg"
},
{
    title: "Messenger",
    artist: "YT",
    album: "Messenger",
    src: "MESSENGER.mp3",
    cover: "assets/images/MESSENGER.jpg"
},
{
    title: "BIG SCIENTIST",
    artist: "Lil Yachty",
    album: "Big Scientist",
    src: "BIG SCIENTIST.mp3",
    cover: "assets/images/BIG SCIENTIST.jpg"
},
{
    title: "2sick",
    artist: "kwes e",
    album: "2sick",
    src: "2sick.mp3",
    cover: "assets/images/2SICK.jpg"
},
{
    title: "In Here Somewhere",
    artist: "Frank Ocean",
    album: "ENDLESS",
    src: "IN HERE SOMEWHERE.m4a",
    cover: "assets/images/endless.jpg"
},
{
    title: "Comme Des Garçons",
    artist: "Frank Ocean",
    album: "ENDLESS",
    src: "COMME DES GARÇONS.m4a",
    cover: "assets/images/endless.jpg"
},
{
    title: "Impietas + Deathwish (ASR)",
    artist: "Frank Ocean",
    album: "ENDLESS",
    src: "IMPIETAS + DEATHWISH.m4a",
    cover: "assets/images/endless.jpg"
},
{
    title: "Sideways",
    artist: "Frank Ocean",
    album: "ENDLESS",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823979/SIDEWAYS_hvuzwn.m4a",
    cover: "assets/images/endless.jpg"
},
{
    title: "CASH COW",
    artist: "Kanye West & Skepta",
    album: "CASH COW",
    src: "CASH COW.mp3",
    cover: "assets/images/X.png"
},
{
    title: "Just Because",
    artist: "Future & Young Thug",
    album: "Just Because",
    src: "JUST BECAUSE.mp3",
    cover: "assets/images/JUST BECAUSE.jpg"
},
{
    title: "YUNG NIGGAZ",
    artist: "Kodak Black",
    album: "YUNG NIGGAZ",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748824006/YUNG_NIGGAZ_jrwtwe.mp3",
    cover: "assets/images/YUNG NIGGAZ.jpg"
},
{
    title: "Teamwork",
    artist: "Young Thug & Gunna",
    album: "Teamwork",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823979/TEAMWORK_ormapi.mp3",
    cover: "assets/images/TEAMWORK.jpg"
},
{
    title: "Digital Plane",
    artist: "Young Thug & NAV",
    album: "Digital Plane",
    src: "DIGITAL PLANE.mp3",
    cover: "assets/images/DIGITAL PLANE.jpg"
},
{
    title: "Vivienne Me",
    artist: "The Act",
    album: "Vivienne Me",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823991/VIVIENNE_ME_uc2etx.mp3",
    cover: "assets/images/VIVIENNE ME.jpg"
},
{
    title: "Life Of Sins",
    artist: "Young Thug",
    album: "Life Of Sins",
    src: "LIFE OF SINS.mp3",
    cover: "assets/images/LIFE OF SINS.jpg"
},
{
    title: "At The Gates",
    artist: "Drake & Lil Uzi Vert",
    album: "At The Gates",
    src: "AT THE GATES.mp3",
    cover: "assets/images/AT THE GATES.jpg"
},
{
    title: "Sky City",
    artist: "Kanye West",
    album: "Yandhi",
    src: "SKY CITY.mp3",
    cover: "assets/images/YANDHI.jpg"
},
{
    title: "knotz",
    artist: "xhujung",
    album: "knotz",
    src: "KNOTZ.mp3",
    cover: "assets/images/KNOTZ.jpg"
},
{
    title: "Hoodway",
    artist: "454",
    album: "Hoodway",
    src: "HOODWAY.mp3",
    cover: "assets/images/HOODWAY.jpg"
},
{
    title: "This Is God's Test",
    artist: "Kanye West",
    album: "Yandhi",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823984/THIS_IS_GODS_TEST_upfiu7.mp3",
    cover: "assets/images/YANDHI2.jpg"
},
{
    title: "keep me in the loop",
    artist: "YT",
    album: "keep me in the loop",
    src: "KEEP ME IN THE LOOP.mp3",
    cover: "assets/images/KEEP ME IN THE LOOP.jpg"
},
{
    title: "Elle veut link",
    artist: "Serane & MissingKasper",
    album: "Elle veut link",
    src: "ELLE VEUT LINK.mp3",
    cover: "assets/images/ELLE VEUT LINK.jpg"
},
{
    title: "nobody 2saveus",
    artist: "Ak4yla",
    album: "nobody 2saveus",
    src: "NOBODY2SAVEUS.mp3",
    cover: "assets/images/NOBODY 2SAVEUS.jpg"
},
{
    title: "Money Make Her",
    artist: "Lancey Foux",
    album: "Money Make Her",
    src: "MONEY MAKE HER.mp3",
    cover: "assets/images/MONEY MAKE HER.jpg"
},
{
    title: "VISA",
    artist: "Lancey Foux",
    album: "VISA",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823992/VISA_r2sdjx.mp3",
    cover: "assets/images/VISA.jpg"
},
{
    title: "24HRS",
    artist: "Babyxsosa & PPGCASPER",
    album: "24HRS",
    src: "24HRS.mp3",
    cover: "assets/images/24HRS.jpg"
},
{
    title: "Odds",
    artist: "Drugbwoy",
    album: "Odds",
    src: "ODDS.mp3",
    cover: "assets/images/ODDS.jpg"
},
{
    title: "EVERYDAY",
    artist: "POLO PERKS",
    album: "EVERYDAY",
    src: "EVERYDAY.mp3",
    cover: "assets/images/EVERYDAY.jpg"
},
{
    title: "uh uh",
    artist: "Babyxsosa",
    album: "uh uh",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823989/UH_UH_hrekxj.mp3",
    cover: "assets/images/UH UH.jpg"
},
{
    title: "Come on World, You Can't Go!",
    artist: "Frank Ocean",
    album: "Come on World, You Can't Go!",
    src: "COME ON WORLD.mp3",
    cover: "assets/images/COMEONWORLD.jpg"
},
{
    title: "gatlin gun",
    artist: "Dave & AJ Tracey",
    album: "gatlin gun",
    src: "GATLIN GUN.mp3",
    cover: "assets/images/GATLIN GUN.jpg"
},
{
    title: "Her Loss Interlude",
    artist: "Drake & 21 Savage",
    album: "Her Loss",
    src: "HER LOSS INTERLUDE.mp3",
    cover: "assets/images/INTERLUDE.jpg"
},
{
    title: "FAKE RUNTZ",
    artist: "Caal Vo",
    album: "FAKE RUNTZ",
    src: "FAKE RUNTZ.mp3",
    cover: "assets/images/FAKE RUNTZ.jpg"
},
{
    title: "FERRIS WHEEL",
    artist: "454",
    album: "FERRIS WHEEL",
    src: "FERRIS WHEEL.mp3",
    cover: "assets/images/FERRIS WHEEL.jpg"
},
{
    title: "J.O.B.",
    artist: "Frank Ocean",
    album: "The Lonny Breaux Collection",
    src: "J.O.B..mp3",
    cover: "assets/images/LONNY BREAUX.jpg"
},
{
    title: "It's On You",
    artist: "Chris Travis",
    album: "Waterszn 2",
    src: "ITS ON YOU.mp3",
    cover: "assets/images/ITS ON YOU.jpg"
},
{
    title: "K-POP",
    artist: "Lancey Foux",
    album: "K-POP",
    src: "K-POP.mp3",
    cover: "assets/images/K-POP.jpg"
},
{
    title: "from me 2 you",
    artist: "454",
    album: "from me 2 you",
    src: "FROM ME 2 YOU.mp3",
    cover: "assets/images/FROM ME 2 YOU.jpg"
},
{
    title: "best for you",
    artist: "Bakar",
    album: "best for you",
    src: "BEST FOR YOU.mp3",
    cover: "assets/images/BEST FOR YOU.jpg"
},
{
    title: "I Hate This",
    artist: "evilgiane",
    album: "I Hate This",
    src: "I HATE THIS.mp3",
    cover: "assets/images/I HATE THIS.jpg"
},
{
    title: "Whip Appeal",
    artist: "Frank Ocean",
    album: "UNRELEASED;misc",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823999/WHIP_APPEAL_igycpz.mp3",
    cover: "assets/images/UNRELEASED MISC.jpg"
},
{
    title: "4 True ''Thug Angel''",
    artist: "Sickboyrari",
    album: "4 True ''Thug Angel''",
    src: "4 TRUE.mp3",
    cover: "assets/images/4 TRUE.jpg"
},
{
    title: "CAMPAIGN FREESTYLE",
    artist: "Teezo Touchdown",
    album: "CAMPAIGN FREESTYLE",
    src: "CAMPAIGN FREESTYLE.mp3",
    cover: "assets/images/CAMPAIGN FREESTYLE.jpg"
},
{
    title: "Eric Koston",
    artist: "Kay9ine",
    album: "Eric Koston",
    src: "ERIC KOSTON.mp3",
    cover: "assets/images/ERIC KOSTON.jpg"
},
{
    title: "GHOSTS IN MY ROOM",
    artist: "evilgiane & harrison",
    album: "GHOSTS IN MY ROOM",
    src: "GHOSTS IN MY ROOM.mp3",
    cover: "assets/images/GHOSTS IN MY ROOM.jpg"
},
{
    title: "Truth",
    artist: "evilgiane",
    album: "bottle in the ocean",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823986/TRUTH_eeo4yo.mp3",
    cover: "assets/images/BOTTLE.jpg"
},
{
    title: "GOLDEN AGE",
    artist: "Yves Tumor",
    album: "GOLDEN AGE",
    src: "GOLDEN AGE.mp3",
    cover: "assets/images/GOLDEN AGE.jpg"
},
{
    title: "samsung love",
    artist: "yung bruh",
    album: "samsung love",
    src: "SAMSUNG LOVE.mp3",
    cover: "assets/images/SAMSUNG LOVE.jpg"
},
{
    title: "Wither",
    artist: "Frank Ocean",
    album: "ENDLESS",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823999/WITHER_bx8v7v.m4a",
    cover: "assets/images/ENDLESS.jpg"
},
{
    title: "yao ming",
    artist: "Destroy Lonely",
    album: "yao ming",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748824001/YAO_MING_sspjeg.mp3",
    cover: "assets/images/YAO MING.jpg"
},
{
    title: "pack a punch",
    artist: "Destroy Lonely",
    album: "pack a punch",
    src: "PACK A PUNCH.mp3",
    cover: "assets/images/PACK A PUNCH.jpg"
},
{
    title: "Plenty",
    artist: "PARTYNEXTDOOR",
    album: "Plenty",
    src: "PLENTY.mp3",
    cover: "assets/images/PLENTY.jpg"
},
{
    title: "Some Of Your Love",
    artist: "PARTYNEXTDOOR",
    album: "Some Of Your Love",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823977/SOME_OF_YOUR_LOVE_rywbg6.mp3",
    cover: "assets/images/SOME OF YOUR LOVE.jpg"
},
{
    title: "RaRa",
    artist: "Travis Scott & Lil Uzi Vert",
    album: "RaRa",
    src: "RARA.mp3",
    cover: "assets/images/RARA.jpg"
},
{
    title: "Whatever You Say",
    artist: "PARTYNEXTDOOR",
    album: "Whatever You Say",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823994/WHATEVER_YOU_SAY_ogty8p.mp3",
    cover: "assets/images/WHATEVER YOU SAY.jpg"
},
{
    title: "Part Time",
    artist: "Travis Scott",
    album: "Part Time",
    src: "PART TIME.mp3",
    cover: "assets/images/PART TIME.jpg"
},
{
    title: "Fit ID",
    artist: "Sainté",
    album: "Fit ID",
    src: "FIT ID.mp3",
    cover: "assets/images/FIT ID.jpg"
},
{
    title: "Flatline",
    artist: "Journals",
    album: "Flatline",
    src: "FLATLINE.mp3",
    cover: "assets/images/JOURNALS.jpg"
},
{
    title: "Frontline",
    artist: "Pa Salieu",
    album: "Frontline",
    src: "FRONTLINE.mp3",
    cover: "assets/images/FRONTLINE.jpg"
},
{
    title: "Broke Boi",
    artist: "Playboi Carti",
    album: "Broke Boi",
    src: "BROKE BOI.mp3",
    cover: "assets/images/BROKE BOI.jpg"
},
{
    title: "FINE SHIT",
    artist: "Playboi Carti",
    album: "MUSIC",
    src: "FINE SHIT.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/MUSIC_kyv7kl.jpg"
},
{
    title: "FYBR (First Year Being Rich)",
    artist: "A$AP Mob",
    album: "Cozy Tapes Vol. 2: Too Cozy",
    src: "FYBR.mp3",
    cover: "assets/images/COZY TAPES 2.jpg"
},
{
    title: "In Vein (feat. The Weeknd)",
    artist: "Rick Ross ",
    album: "Mastermind",
    src: "IN VEIN.mp3",
    cover: "assets/images/MASTERMIND.jpg"
},
{
    title: "Losing You",
    artist: "Solange",
    album: "Losing You",
    src: "LOSING YOU.mp3",
    cover: "assets/images/LOSING YOU.jpg"
},
{
    title: "Love In The Sky",
    artist: "The Weeknd",
    album: "Kiss Land",
    src: "LOVE IN THE SKY.mp3",
    cover: "assets/images/KISS LAND.jpg"
},
{
    title: "No Sense (feat. Travis Scott)",
    artist: "Justin Bieber",
    album: "Purpose (Deluxe)",
    src: "NO SENSE.mp3",
    cover: "assets/images/PURPOSE.jpg"
},
{
    title: "Right My Wrongs",
    artist: "Bryson Tiller",
    album: "T R A P S O U L",
    src: "RIGHT MY WRONGS.mp3",
    cover: "assets/images/TRAPSOUL.jpg"
},
{
    title: "Solo",
    artist: "FUTURE",
    album: "HNDRXX",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823988/SOLO_j0t4di.mp3",
    cover: "assets/images/HNDRXX.jpg"
},
{
    title: "Green & Purple",
    artist: "Travis Scott & Playboi Carti",
    album: "Green & Purple",
    src: "GREEN & PURPLE.mp3",
    cover: "assets/images/GREEN & PURPLE.jpg"
},
{
    title: "NASA",
    artist: "Future",
    album: "NASA",
    src: "NASA.mp3",
    cover: "assets/images/NASA.jpg"
},
{
    title: "Turn Your Phone Off",
    artist: "PinkPantheress & Destroy Lonely",
    album: "Turn Your Phone Off",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823990/TURN_YOUR_PHONE_OFF_vxwxh2.mp3",
    cover: "assets/images/TURN YOUR PHONE OFF.jpg"
},
{
    title: "What You Doin",
    artist: "Gucci Mane & Migos",
    album: "Green Album",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823996/WHAT_YOU_DOIN_tox15q.mp3",
    cover: "assets/images/GREEN ALBUM.jpg"
},
{
    title: "Yeah, I Said It",
    artist: "Rihanna",
    album: "ANTI(Deluxe)",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748824005/YEAH_I_SAID_IT_vwzzi8.mp3",
    cover: "assets/images/ANTI.jpg"
},
{
    title: "ПОМНЮ",
    artist: "unki",
    album: "ПОМНЮ",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748824005/%D0%9F%D0%9E%D0%9C%D0%9D%D0%AE_srlh0n.mp3",
    cover: "assets/images/ПОМНЮ.jpg"
},
{
    title: "Таллин",
    artist: "JUGHEAD & Kinderlil",
    album: "Less Is More",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748824008/%D0%A2%D0%90%D0%9B%D0%9B%D0%98%D0%9D_dfiyfc.mp3",
    cover: "assets/images/LESS IS MORE.jpg"
},
{
    title: "Behave",
    artist: "Fimiguerrero & Len",
    album: "New World Order",
    src: "BEHAVE.mp3",
    cover: "assets/images/NEW WORLD ORDER.jpg"
},
{
    title: "Better By Yourself",
    artist: "Babyxsosa",
    album: "Better By Yourself",
    src: "BETTER BY YOURSELF.mp3",
    cover: "assets/images/BETTER BY YOURSELF.jpg"
},
{
    title: "Chanel",
    artist: "Babyxsosa",
    album: "Chanel",
    src: "CHANEL.mp3",
    cover: "assets/images/CHANEL.jpg"
},
{
    title: "Get Up",
    artist: "New Jeans",
    album: "Get Up",
    src: "GET UP.mp3",
    cover: "assets/images/GET UP.jpg"
},
{
    title: "Designer Boi",
    artist: "A$AP NAST & D33J",
    album: "Designer Boi",
    src: "DESIGNER BOI.mp3",
    cover: "assets/images/DESIGNER BOI.jpg"
},
{
    title: "FACETIME / TEXTING",
    artist: "Babyxsosa",
    album: "FACETIME / TEXTING",
    src: "FACETIME.mp3",
    cover: "assets/images/FACETIME.jpg"
},
{
    title: "Kin",
    artist: "Kevin Abstract",
    album: "American Boyfriend",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903811/SpotiDownloader.com_-_Kin_-_Kevin_Abstract_homaag.mp3",
    cover: "assets/images/AMERICAN BOYFRIEND.jpg"
},
{
    title: "Les Fleurs",
    artist: "Minnie Riperton",
    album: "Les Fleurs",
    src: "LES FLEURS.mp3",
    cover: "assets/images/LES FLEURS.jpg"
},
{
    title: "Losalamitoslatinfunklovesong",
    artist: "Gene Harris",
    album: "Astral Signals",
    src: "FUNKLOVESONG.mp3",
    cover: "assets/images/ASTRAL SIGNALS.jpg"
},
{
    title: "So In Love",
    artist: "Curtis Mayfield",
    album: "There's No Place Like America Today",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823990/SO_IN_LOVE_ppkdsm.mp3",
    cover: "assets/images/NO PLACE LIKE AMERICA.jpg"
},
{
    title: "Tension",
    artist: "Central Cee",
    album: "Wild West",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823987/TENSION_wtenvn.mp3",
    cover: "assets/images/WILD WEST.jpg"
},
{
    title: "Three Cheers For My Baby",
    artist: "Amnesty",
    album: "Free Your Mind",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823991/THREE_CHEERS_FOR_MY_BABY_wbpimf.mp3",
    cover: "assets/images/FREE YOUR MIND.jpg"
},
{
    title: "Warriors",
    artist: "1017 ALYX 9SM & Lil Yachty",
    album: "COMPILATION V1",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823996/WARRIORS_zg6omc.mp3",
    cover: "assets/images/COMPILATION V1.jpg"
},
{
    title: "Wolves",
    artist: "Kanye West",
    album: "The Life of Pablo",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748824005/WOLVES_gpixb4.mp3",
    cover: "assets/images/THE LIFE OF PABLO.jpg"
},
{
    title: "Work Ya Wrist",
    artist: "Gucci Mane & Yo Gotti",
    album: "Chicken Talk",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748824008/WORK_YA_WRIST_rfr2on.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903644/Cover_of_Under_Arm_Kush_by_Gucci_Mane_sn01ul.jpg"
},
{
    title: "Automatic",
    artist: "Red Velvet",
    album: "Ice Cream Cake",
    src: "AUTOMATIC.mp3",
    cover: "assets/images/ICE CREAM CAKE.jpg"
},
{
    title: "All That Matters",
    artist: "Justin Bieber",
    album: "Journals",
    src: "ALL THAT MATTERS.mp3",
    cover: "assets/images/JOURNALS.jpg"
},
{
    title: "Cool With You",
    artist: "New Jeans",
    album: "Get Up",
    src: "COOL WITH YOU.mp3",
    cover: "assets/images/GET UP.jpg"
},{
  title: "峠の恋人",
  artist: "REGI & 陈彦希",
  album: "峠の恋人",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903845/SpotiDownloader.com_-_%E5%B3%A0%E3%81%AE%E6%81%8B%E4%BA%BA_-_REGI%E9%99%88%E5%BD%A6%E5%B8%8C_wli0rk.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903652/Cover_of_%E5%B3%A0%E3%81%AE%E6%81%8B%E4%BA%BA_by_REGI%E9%99%88%E5%BD%A6%E5%B8%8C_%E7%8E%8B%E5%97%A3%E5%B0%A7TURBO_z0fd7n.jpg"
},{
  title: "Мысли - Читаю о драгах",
  artist: "ROCKET",
  album: "SWAG SEASON 2",
  src: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903650/Cover_of_%D0%9C%D1%8B%D1%81%D0%BB%D0%B8_-_%D0%A7%D0%B8%D1%82%D0%B0%D1%8E_%D0%BE_%D0%B4%D1%80%D0%B0%D0%B3%D0%B0%D1%85_by_ROCKET_f3ibki.jpg",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903650/Cover_of_%D0%9C%D1%8B%D1%81%D0%BB%D0%B8_-_%D0%A7%D0%B8%D1%82%D0%B0%D1%8E_%D0%BE_%D0%B4%D1%80%D0%B0%D0%B3%D0%B0%D1%85_by_ROCKET_f3ibki.jpg"
},{
  title: "Дежавю",
  artist: "JUGHEAD",
  album: "Hurt+Unlocked",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903841/SpotiDownloader.com_-_%D0%94%D0%B5%D0%B6%D0%B0%D0%B2%D1%8E_-_JUGHEAD_fvseeq.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903648/Cover_of_%D0%94%D0%B5%D0%B6%D0%B0%D0%B2%D1%8E_by_JUGHEAD_cwqw2a.jpg"
},{
  title: "Знаю",
  artist: "Полка",
  album: "Знаю",
  src: "Chttps://res.cloudinary.com/dynqvvscs/video/upload/v1748903842/SpotiDownloader.com_-_%D0%97%D0%BD%D0%B0%D1%8E_-_%D0%9F%D0%BE%D0%BB%D0%BA%D0%B0_lbu9dk.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903648/Cover_of_%D0%97%D0%BD%D0%B0%D1%8E_by_%D0%9F%D0%BE%D0%BB%D0%BA%D0%B0_icozqj.jpg"
},{
  title: "When I Was Broke",
  artist: "Future",
  album: "FUTURE",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903841/SpotiDownloader.com_-_When_I_Was_Broke_-_Future_dncai3.mp3",
  cover: "assets/images/GET UP.jpg"
},{
  title: "Unfair",
  artist: "ARTMS",
  album: "<DALL>",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903839/SpotiDownloader.com_-_Unf_Air_-_ARTMS_l7yyi9.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903645/Cover_of_Unf_Air_by_ARTMS_igthkr.jpg"
},{
  title: "Summers Over Interlude",
  artist: "Drake",
  album: "Views",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903836/SpotiDownloader.com_-_Summers_Over_Interlude_-_Drake_arpo8h.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903642/Cover_of_Summers_Over_Interlude_by_Drake_Majid_Jordan_snpwl4.jpg"
},{
  title: "WE NEED ALL DA VIBES",
  artist: "Playboi Carti",
  album: "MUSIC",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903840/SpotiDownloader.com_-_WE_NEED_ALL_DA_VIBES_with_Young_Thug_Ty_Dolla_ign_-_Playboi_Carti_cwor2k.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/MUSIC_kyv7kl.jpg"
},{
  title: "Two Thousand Nineteen",
  artist: "FRIENDLY THUG 52 NGG",
  album: "Cruiser Auror",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903836/SpotiDownloader.com_-_Two_Thousand_Nineteen_-_FRIENDLY_THUG_52_NGG_llkb6b.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903642/Cover_of_Two_Thousand_Nineteen_by_FRIENDLY_THUG_52_NGG_gitd6e.jpg"
},{
  title: "TWIN TRIM",
  artist: "Playboi Carti",
  album: "MUSIC",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903837/SpotiDownloader.com_-_TWIN_TRIM_-_Playboi_Carti_y00000.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/MUSIC_kyv7kl.jpg.jpg"
},{
  title: "SO FREE",
  artist: "Lancey Foux",
  album: "FRIEND OR FOUX",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903835/SpotiDownloader.com_-_SO_FREE_-_Lancey_Foux_bzkawc.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903639/Cover_of_SO_FREE_by_Lancey_Foux_vyumyc.jpg"
},{
  title: "skate depot",
  artist: "Channel Tres",
  album: "i can't go outside",
  src: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903638/Cover_of_skate_depot_by_Channel_Tres_uzbgfn.jpg",
  cover: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903832/SpotiDownloader.com_-_skate_depot_-_Channel_Tres_kajqvj.mp3"
},{
  title: "Sparkle",
  artist: "ARTMS",
  album: "<DALL>",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903837/SpotiDownloader.com_-_Sparkle_-_ARTMS_hrm6zj.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903645/Cover_of_Unf_Air_by_ARTMS_igthkr.jpg"
},{
  title: "RiRi",
  artist: "Young Thug",
  album: "JEFFERY",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903832/SpotiDownloader.com_-_RiRi_-_Young_Thug_ovsb6p.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903633/Cover_of_RiRi_by_Young_Thug_pnqcmd.jpg"
},{
  title: "Scellé part.2",
  artist: "Freeze corleone & ASHE 22",
  album: "LMF",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903831/SpotiDownloader.com_-_Scell%C3%A9_part.2_-_Freeze_corleone_qmtg1v.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903637/Cover_of_Scell%C3%A9_part.2_by_Freeze_corleone_ASHE_22_xrqjdn.jpg"
},{
  title: "Silhouette",
  artist: "Len & Fimiguerrero",
  album: "CONGLOMERATE",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903831/SpotiDownloader.com_-_Silhouette_-_Len_emghex.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903637/Cover_of_Silhouette_by_Len_Fimiguerrero_nd8awh.jpg"
},{
  title: "RATHER LIE",
  artist: "Playboi Carti & The Weeknd",
  album: "MUSIC",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903832/SpotiDownloader.com_-_RATHER_LIE_with_The_Weeknd_-_Playboi_Carti_c0sriw.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/MUSIC_kyv7kl.jpg.jpg"
},{
  title: "Provider",
  artist: "Frank Ocean",
  album: "Provider",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903828/SpotiDownloader.com_-_Provider_-_Frank_Ocean_hwbkvs.mp3",
  cover: "IMG"
},{
  title: "Please Tell Me",
  artist: "Future",
  album: "SAVE ME",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903826/SpotiDownloader.com_-_Please_Tell_Me_-_Future_un7sug.mp3",
  cover: "IMG"
},{
  title: "OLIVINE",
  artist: "Freeze corleone & ASHE 22",
  album: "RIYAD SADIO",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903826/SpotiDownloader.com_-_OLIVINE_-_Freeze_corleone_ok5hyw.mp3",
  cover: "IMG"
},{
  title: "paper chase",
  artist: "kwes e",
  album: "yup",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903825/SpotiDownloader.com_-_paper_chase_-_kwes_e_yhohip.mp3",
  cover: "IMG"
},{
  title: "PROJECTS",
  artist: "unki",
  album: "PROJECTS",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903825/SpotiDownloader.com_-_PROJECTS_-_unki_ygdbln.mp3",
  cover: "IMG"
},{
  title: "Loft Music",
  artist: "The Weeknd",
  album: "House Of Balloons (Original)",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903823/SpotiDownloader.com_-_Loft_Music_-_The_Weeknd_s3v3jv.mp3",
  cover: "IMG"
},{
  title: "Palaces",
  artist: "EsDeeKid & Rico Ace",
  album: "Palaces",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903821/SpotiDownloader.com_-_Palaces_-_EsDeeKid_cpa6ku.mp3",
  cover: "IMG"
},{
  title: "LUV",
  artist: "ROCKET",
  album: "Tsukuyomi Dream",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903820/SpotiDownloader.com_-_LUV_-_ROCKET_hew2dc.mp3",
  cover: "IMG"
},{
  title: "LOUVRE",
  artist: "Destroy Lonely",
  album: "NS+(ULTRA)",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903819/SpotiDownloader.com_-_LOUVRE_-_Destroy_Lonely_ua3zkz.mp3",
  cover: "IMG"
},{
  title: "Keep Your Faith To The Sky",
  artist: "Willie Scott",
  album: "Thank You Lord for One More Day",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903818/SpotiDownloader.com_-_Keep_Your_Faith_to_the_Sky_-_Willie_Scott_yd682k.mp3",
  cover: "IMG"
},{
  title: "MOSQUITO P2",
  artist: "SURF GANG",
  album: "SGV1",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903818/SpotiDownloader.com_-_Mosquito_P2_-_SURF_GANG_y5eiln.mp3",
  cover: "IMG"
},{
  title: "mileys riddim",
  artist: "Jim Legxacy",
  album: "homeless n*gga pop music",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903818/SpotiDownloader.com_-_mileys_riddim_-_Jim_Legxacy_gr4pne.mp3",
  cover: "IMG"
},{
  title: "KONAMI (2bigos)",
  artist: "COEURCO",
  album: "UNLIMITED ONLINE EXHIBITION",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903814/SpotiDownloader.com_-_KONAMI_2bigos_-_COEURCO_oqze1n.mp3",
  cover: "IMG"
},{
  title: "Jumbotron Shit Poppin",
  artist: "Drake",
  album: "Her Loss",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903813/SpotiDownloader.com_-_Jumbotron_Shit_Poppin_-_Drake_toclrz.mp3",
  cover: "IMG"
},{
  title: "Fashion Show",
  artist: "Kwengface & Lancey Foux",
  album: "Fashion Show",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903813/SpotiDownloader.com_-_Fashion_Show_-_Kwengface_oxm6z3.mp3",
  cover: "IMG"
},{
  title: "How Sweet",
  artist: "New Jeans",
  album: "How Sweet",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903813/SpotiDownloader.com_-_How_Sweet_-_NewJeans_b7cxtn.mp3",
  cover: "IMG"
},{
  title: "I GOT U",
  artist: "Toxi$",
  album: "I GOT U",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903812/SpotiDownloader.com_-_I_GOT_U_-_Toxi_vb9593.mp3",
  cover: "IMG"
},{
  title: "Dreams Money Can Buy",
  artist: "Drake",
  album: "Care Package",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903809/SpotiDownloader.com_-_Dreams_Money_Can_Buy_-_Drake_qsllaj.mp3",
  cover: "IMG"
},{
  title: "Fakin'",
  artist: "JUE",
  album: "6 Shots",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903807/SpotiDownloader.com_-_Fakin_-_JUE_ilpful.mp3",
  cover: "IMG"
},{
  title: "Dopamine - GISELLE Solo",
  artist: "aespa",
  album: "SYNK: PARALLEL LINE - Special Digital Single",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903806/SpotiDownloader.com_-_Dopamine_-_GISELLE_Solo_-_aespa_kqs4lp.mp3",
  cover: "IMG"
},{
  title: "Did You See",
  artist: "J Hus",
  album: "Common Sense",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903806/SpotiDownloader.com_-_Did_You_See_-_J_Hus_uoqm30.mp3",
  cover: "IMG"
},{
  title: "down",
  artist: "Effie",
  album: "E",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903805/SpotiDownloader.com_-_down_-_Effie_zzex5m.mp3",
  cover: "IMG"
},{
  title: "Desirée",
  artist: "Blood Orange",
  album: "Freetown Sound",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903805/SpotiDownloader.com_-_Desir%C3%A9e_-_Blood_Orange_kid6ff.mp3",
  cover: "IMG"
},{
  title: "Diamonds",
  artist: "YT & Fimiguerrero",
  album: "OI!",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903802/SpotiDownloader.com_-_Diamonds_-_YT_mg5hlh.mp3",
  cover: "IMG"
},{
  title: "Dark Souls",
  artist: "FENDIGLOCK",
  album: "NO TUNE",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903801/SpotiDownloader.com_-_Dark_Souls_-_FENDIGLOCK_irg9br.mp3",
  cover: "IMG"
},{
  title: "Adore",
  artist: "Prince",
  album: "Sign 'O' The Times",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903800/SpotiDownloader.com_-_Adore_-_Prince_msbjep.mp3",
  cover: "IMG"
},{
  title: "BIPOLAR BAG",
  artist: "Lancey Foux",
  album: "FIRST DEGREE",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903799/SpotiDownloader.com_-_BIPOLAR_BAG_-_Lancey_Foux_ytpbab.mp3",
  cover: "IMG"
},{
  title: "Bad - Remix",
  artist: "Wale & Rihanna",
  album: "The Gifted",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903799/SpotiDownloader.com_-_Bad_feat._Rihanna_-_Remix_-_Wale_r8nnhq.mp3",
  cover: "IMG"
},{
  title: "CSO",
  artist: "ROCKET",
  album: "Ego Trippin'",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903798/SpotiDownloader.com_-_CSO_-_ROCKET_k9hd9x.mp3",
  cover: "IMG"
},{
  title: "b*tches and money go",
  artist: "Baby Cute",
  album: "SENSATION! A Cute Chaotic Trail",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903797/SpotiDownloader.com_-_b_tches_And_Money_Go_-_Baby_Cute_xn3rol.mp3",
  cover: "IMG"
},{
  title: "B... Arp Forever V3 (109.613 BPM)",
  artist: "Vegyn",
  album: "Text While Driving If You Want To Meet God!",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903793/SpotiDownloader.com_-_B..._Arp_Forever_V3_109.613_BPM_-_Vegyn_mounwj.mp3",
  cover: "IMG"
},{
  title: "Apollo",
  artist: "Slimesito",
  album: "Vida BraZy",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903792/SpotiDownloader.com_-_Apollo_-_Slimesito_zsdidr.mp3",
  cover: "IMG"
},{
  title: "Amen",
  artist: "Drake & Teezo Touchdown",
  album: "For All The Dogs",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903791/SpotiDownloader.com_-_Amen_feat._Teezo_Touchdown_-_Drake_j3mt8n.mp3",
  cover: "IMG"
},{
  title: "01'beigecamry",
  artist: "Sideshow",
  album: "Farley",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903789/SpotiDownloader.com_-_01_beigecamry_-_Sideshow_lr6sd9.mp3",
  cover: "IMG"
},{
  title: "Легендарити",
  artist: "OG Buda & FRIENDLY THUG 52 NGG",
  album: "POX VAWË",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903789/SpotiDownloader.com_-_%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D0%B8%D1%82%D0%B8_-_OG_Buda_sptud1.mp3",
  cover: "IMG"
},{
  title: "HEIL HITLER",
  artist: "Ye",
  album: "HEIL HITLER",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749038096/SaveTwitter.Net_qMZdtjELoPY3TAHu__540p_oymnbc.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749038094/Cover_of_HALLELUJAH_by_Ye_pmprp6.jpg"
},{
  title: "ТопБой",
  artist: "Guram D",
  album: "Только на старте",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903788/SpotiDownloader.com_-_%D0%A2%D0%BE%D0%BF%D0%91%D0%BE%D0%B9_-_Guram_D_veu0u2.mp3",
  cover: "IMG"
},{
  title: "Для Тебя (Пусто)",
  artist: "OG Buda",
  album: "Скучаю, Но Работаю",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903788/SpotiDownloader.com_-_%D0%94%D0%BB%D1%8F_%D0%A2%D0%B5%D0%B1%D1%8F_%D0%9F%D1%83%D1%81%D1%82%D0%BE_-_OG_Buda_mwccgy.mp3",
  cover: "IMG"
},{
  title: "Just How I'm Feelin'",
  artist: "Lil Yachty & Lil Baby",
  album: "Lil Boat 3.5",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903788/SpotiDownloader.com_-_Just_How_I_m_Feelin_feat._Lil_Baby_-_Lil_Yachty_kju60g.mp3",
  cover: "IMG"
},{
  title: "ROSTER",
  artist: "5EB & YT",
  album: "##MOTIONMUZIK",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903787/SpotiDownloader.com_-_ROSTER_-_5EB_zlguuz.mp3",
  cover: "IMG"
},{
  title: "XY",
  artist: "Feng",
  album: "What The Feng",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903786/SpotiDownloader.com_-_XY_-_Feng_xdhpdx.mp3",
  cover: "IMG"
},{
  title: "Групи",
  artist: "Платина & OG Buda",
  album: "Сладких снов",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903784/SpotiDownloader.com_-_%D0%93%D1%80%D1%83%D0%BF%D0%B8_-_%D0%9F%D0%BB%D0%B0%D1%82%D0%B8%D0%BD%D0%B0_yfckeb.mp3",
  cover: "IMG"
},{
  title: "Caramel",
  artist: "PHARAOH",
  album: "Caramel",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903784/SpotiDownloader.com_-_Caramel_-_PHARAOH_iy1ujn.mp3",
  cover: "IMG"
},{
  title: "AMMO",
  artist: "FRIENDLY THUG 52 NGG",
  album: "AMMO",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903782/SpotiDownloader.com_-_AMMO_-_FRIENDLY_THUG_52_NGG_at7dgl.mp3",
  cover: "IMG"
},{
  title: "No Coco Senior Please",
  artist: "FRIENDLY THUG 52 NGG",
  album: "Graf Monte-Cristo / Most Valuable Pirate",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903780/SpotiDownloader.com_-_No_Coco_Senior_Please_-_FRIENDLY_THUG_52_NGG_cxl4fm.mp3",
  cover: "IMG"
},{
  title: "Slide On Me",
  artist: "ARTMS",
  album: "<DALL>",
  src: "SRC",
  cover: "IMG"
},{
  title: "Sparkle",
  artist: "ARTMS",
  album: "<DALL>",
  src: "SRC",
  cover: "IMG"
},{
  title: "Sparkle",
  artist: "ARTMS",
  album: "<DALL>",
  src: "SRC",
  cover: "IMG"
},{
  title: "Sparkle",
  artist: "ARTMS",
  album: "<DALL>",
  src: "SRC",
  cover: "IMG"
},{
  title: "Sparkle",
  artist: "ARTMS",
  album: "<DALL>",
  src: "SRC",
  cover: "IMG"
},{
  title: "Sparkle",
  artist: "ARTMS",
  album: "<DALL>",
  src: "SRC",
  cover: "IMG"
},{
  title: "Sparkle",
  artist: "ARTMS",
  album: "<DALL>",
  src: "SRC",
  cover: "IMG"
},{
  title: "Sparkle",
  artist: "ARTMS",
  album: "<DALL>",
  src: "SRC",
  cover: "IMG"
},{
  title: "Sparkle",
  artist: "ARTMS",
  album: "<DALL>",
  src: "SRC",
  cover: "IMG"
},{
  title: "Sparkle",
  artist: "ARTMS",
  album: "<DALL>",
  src: "SRC",
  cover: "IMG"
},
  // Add more tracks here
];

export default function Home() {
  // Default to desktop layout
  const [isMobile, setIsMobile] = useState(false);
  // Add a flag to track if component has mounted
  const [hasMounted, setHasMounted] = useState(false);
  // Add state for music player
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [trackOrder, setTrackOrder] = useState<number[]>([]);
  const [currentPosition, setCurrentPosition] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to create new shuffled order
  const createNewOrder = () => {
    let indices = Array.from({ length: tracks.length }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setTrackOrder(indices);
    return indices;
  };

  // Function to load a track
  const loadTrack = (trackIndex: number) => {
    const track = tracks[trackIndex];
    if (!track) return;
    
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track.src;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  // Function to play next track
  const nextTrack = () => {
    let nextPos = currentPosition + 1;
    if (nextPos >= trackOrder.length) {
      const newOrder = createNewOrder();
      nextPos = 0;
    }
    setCurrentPosition(nextPos);
    loadTrack(trackOrder[nextPos]);
  };

  useEffect(() => {
    // Mark component as mounted
    setHasMounted(true);
    
    // Initialize audio element
    audioRef.current = new Audio();
    audioRef.current.volume = volume / 100;
    
    // Create initial track order
    const initialOrder = createNewOrder();
    setCurrentPosition(0);
    loadTrack(initialOrder[0]);
    
    // Start playing
    setIsPlaying(true);
    audioRef.current.play().catch(console.error);
    
    // Add event listeners
    const audio = audioRef.current;
    audio.addEventListener('ended', nextTrack);
    
    // Check if we're on client-side
    const checkMobile = () => {
      const width = window.innerWidth;
      const isMobileView = width < 768;
      console.log('Window width:', width, 'Is Mobile:', isMobileView);
      setIsMobile(isMobileView);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (audio) {
        audio.removeEventListener('ended', nextTrack);
        audio.pause();
      }
    };
  }, []);

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume / 100;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Volume down function
  const volumeDown = () => {
    const newVolume = Math.max(0, volume - 10);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Volume up function
  const volumeUp = () => {
    const newVolume = Math.min(100, volume + 10);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    setIsMuted(false);
  };

  // Prevent hydration mismatch by not rendering anything specific until mounted
  if (!hasMounted) {
    return (
      <main className="h-screen w-screen overflow-hidden fixed inset-0 bg-white">
        <div className="h-full w-full flex items-center justify-center">
          <div className="relative w-[65vw] max-w-[800px]" style={{ aspectRatio: '3/4' }}>
            <div className="relative w-full h-full">
              <Image
                src="/assets/KDRAMA SILHOUETTE.svg"
                alt="KDRAMA Silhouette"
                fill
                priority
                className="object-contain"
                style={{ 
                  objectPosition: '45% 50%',
                  transform: 'scale(0.6)'
                }}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  const navLinkStyle: CSSProperties = {
    fontFamily: 'SF Pro, sans-serif',
    fontSize: isMobile ? 'clamp(14px, 4.5vw, 18px)' : 'clamp(16px, 1.7vw, 24px)',
    textTransform: 'lowercase' as const,
    letterSpacing: '-0.02em',
    color: isMobile ? 'white' : 'black',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: isMobile ? '500' : 'normal'
  };

  return (
    <main className={`h-screen w-screen overflow-hidden fixed inset-0 bg-white ${isMobile ? 'mobile-view' : 'desktop-view'}`}>
      <div className="h-full w-full flex items-center justify-center">
        {/* Main container with fixed aspect ratio */}
        <div className={`relative ${isMobile ? 'w-[90vw]' : 'w-[65vw]'} max-w-[800px]`} style={{ aspectRatio: '3/4' }}>
          {/* Silhouette container */}
          <div className="relative w-full h-full">
            <Image
              src="/assets/KDRAMA SILHOUETTE.svg"
              alt="KDRAMA Silhouette"
              fill
              priority
              className="object-contain"
              style={{ 
                objectPosition: '45% 50%',
                transform: isMobile ? 'scale(1.0)' : 'scale(0.6)'
              }}
            />
            
            {/* Desktop Layout - Will be hidden via CSS on small screens */}
            <div className="desktop-layout">
              {/* KDRAMA Logo */}
              <div className="absolute left-[11.6%] top-[42.6%] kdrama-logo" style={{ transform: 'scale(0.85)' }}>
                <Image
                  src="/assets/kdrama-logo.svg"
                  alt="KDRAMA Logo"
                  width={100}
                  height={35}
                  className="object-contain brightness-0"
                />
              </div>

              {/* Flags */}
              <div className="absolute left-[43%] top-[43.4%] transform -translate-x-1/2">
                <div className="flex items-center space-x-[4px]">
                  <Image src="/assets/us-flag.png" alt="US Flag" width={24} height={16} className="object-contain" />
                  <Image src="/assets/france-flag.png" alt="France Flag" width={24} height={16} className="object-contain" />
                  <Image src="/assets/russia-flag.png" alt="Russia Flag" width={24} height={16} className="object-contain" />
                  <Image src="/assets/korea-flag.png" alt="Korea Flag" width={24} height={16} className="object-contain" />
                  <Image src="/assets/china-flag.png" alt="China Flag" width={24} height={16} className="object-contain" />
                </div>
              </div>

              {/* Navigation Links */}
              <div className="absolute left-[62.5%] top-[43.8%] transform -translate-y-1/2">
                <a href="/artworks" className="nav-item" style={navLinkStyle}>
                  artworks
                </a>
              </div>
              <div className="absolute left-[62.8%] top-[44.5%]">
                <a href="/photography" className="nav-item" style={navLinkStyle}>
                  photography
                </a>
              </div>
              <div className="absolute left-[71%] top-[46.7%]">
                <a href="/music" className="nav-item" style={navLinkStyle}>
                  music
                </a>
              </div>
              
              {/* Music Player - between music and contact links */}
              <div className="absolute flex items-center music-player-desktop" style={{ 
                left: '97%',
                top: '51.3%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1
              }}>
                {/* Album Cover */}
                <div style={{ 
                  width: '28px', 
                  height: '28px', 
                  backgroundColor: '#ADD8E6',
                  backgroundImage: currentTrack?.cover ? `url(${currentTrack.cover})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}></div>
                
                {/* Song Info */}
                <div style={{ 
                  marginLeft: '30px',
                  marginRight: '30px',
                  width: '120px',
                  height: '18px',
                  color: isMobile ? 'white' : 'black',
                  fontSize: '7px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  letterSpacing: '0.01em'
                }}>
                  <div style={{
                    width: '100%',
                    height: '50%',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 500,
                    letterSpacing: '0.01em'
                  }}>{currentTrack?.title || 'Loading...'}</div>
                  <div style={{
                    width: '100%',
                    height: '50%',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isMobile ? '#cccccc' : 'gray',
                    fontWeight: 400,
                    letterSpacing: '0.01em'
                  }}>{currentTrack ? `${currentTrack.artist} — ${currentTrack.album}` : 'Loading...'}</div>
                </div>
                
                {/* Player Controls */}
                <div style={{
                  width: '170px',
                  height: '28px',
                  display: 'flex',
                  flexDirection: 'row'
                }}>
                  {/* Play/Pause Button */}
                  <div 
                    onClick={togglePlay} 
                    style={{
                      cursor: 'pointer',
                      height: '28px',
                      width: '28px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image 
                      src={isPlaying ? "/assets/PAUSE.png" : "/assets/PLAY.png"}
                      alt={isPlaying ? "Pause" : "Play"}
                      width={15}
                      height={15}
                      style={{ height: '15px', width: 'auto' }}
                    />
                  </div>
                  
                  {/* Next Button */}
                  <div 
                    onClick={nextTrack}
                    style={{
                      cursor: 'pointer',
                      height: '28px',
                      width: '28px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Image 
                      src="/assets/SKIP.png" 
                      alt="Skip" 
                      width={12} 
                      height={12}
                      style={{ height: '12px', width: 'auto' }}
                    />
                  </div>
                  
                  {/* Volume Down Button */}
                  <div 
                    onClick={volumeDown}
                    style={{
                      cursor: 'pointer',
                      height: '28px',
                      width: '28px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image 
                      src="/assets/V DOWN.png" 
                      alt="Volume Down" 
                      width={17} 
                      height={17}
                      style={{ height: '17px', width: 'auto' }}
                    />
                  </div>
                  
                  {/* Volume Slider */}
                  <div style={{
                    height: '28px',
                    width: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start'
                  }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        width: '100%',
                        height: '3px',
                        background: `linear-gradient(to right, ${isMobile ? '#fff' : '#000'} ${isMuted ? 0 : volume}%, ${isMobile ? '#444' : '#ddd'} ${isMuted ? 0 : volume}%)`,
                        borderRadius: '5px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  
                  {/* Volume Up Button */}
                  <div 
                    onClick={volumeUp}
                    style={{
                      cursor: 'pointer',
                      height: '28px',
                      width: '28px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image 
                      src="/assets/V UP.png" 
                      alt="Volume Up" 
                      width={17} 
                      height={17}
                      style={{ height: '17px', width: 'auto' }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="absolute left-[72.5%] top-[52.7%] contact-link-desktop">
                <a href="/contact" className="nav-item" style={navLinkStyle}>
                  contact
                </a>
              </div>
            </div>

            {/* Mobile Layout - Will be shown via CSS on small screens */}
            <style>{`
              @media (max-width: 767px) {
                .mobile-volume-slider input[type=range]::-webkit-slider-thumb {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: #fff;
                  border: 1px solid #888;
                  box-shadow: 0 0 2px #0002;
                  -webkit-appearance: none;
                  appearance: none;
                }
                .mobile-volume-slider input[type=range]::-moz-range-thumb {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: #fff;
                  border: 1px solid #888;
                  box-shadow: 0 0 2px #0002;
                }
                .mobile-volume-slider input[type=range]::-ms-thumb {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: #fff;
                  border: 1px solid #888;
                  box-shadow: 0 0 2px #0002;
                }
              }
            `}</style>
            <div
              className="mobile-layout absolute inset-0 flex flex-col items-start justify-center space-y-1"
              style={{
                transform: 'translateY(0%) scale(0.85)',
                display: 'none',
                marginLeft: '7vw'
              }}
            >
              {/* KDRAMA Logo */}
              <div className="mb-0.5">
                <Image
                  src="/assets/kdrama-logo.svg"
                  alt="KDRAMA Logo"
                  width={90}
                  height={32}
                  className="object-contain brightness-0 invert mobile-logo"
                />
              </div>

              {/* Flags */}
              <div className="mb-0.5">
                <div className="flex items-center space-x-[2px] mobile-flags">
                  <Image src="/assets/us-flag.png" alt="US Flag" width={20} height={13} className="object-contain" />
                  <Image src="/assets/france-flag.png" alt="France Flag" width={20} height={13} className="object-contain" />
                  <Image src="/assets/russia-flag.png" alt="Russia Flag" width={20} height={13} className="object-contain" />
                  <Image src="/assets/korea-flag.png" alt="Korea Flag" width={20} height={13} className="object-contain" />
                  <Image src="/assets/china-flag.png" alt="China Flag" width={20} height={13} className="object-contain" />
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col items-start mobile-nav w-full">
                <a href="/artworks" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                  artworks
                </a>
                <a href="/photography" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                  photography
                </a>
                <a href="/music" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                  music
                </a>

                {/* Mobile Music Player - left-aligned, in nav flow */}
                <div className="flex flex-row items-center mt-1 mb-1 w-full" style={{ maxWidth: '100%', gap: '8px' }}>
                  {/* Album Cover */}
                  <div style={{
                    width: '22px',
                    height: '22px',
                    backgroundColor: '#ADD8E6',
                    backgroundImage: currentTrack?.cover ? `url(${currentTrack.cover})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexShrink: 0
                  }}></div>
                  {/* Song Info */}
                  <div style={{
                    marginLeft: '8px',
                    marginRight: '8px',
                    flexGrow: 1,
                    minWidth: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    maxWidth: '90px'
                  }}>
                    <div style={{
                      fontSize: '8px',
                      fontWeight: 600,
                      color: 'white',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      letterSpacing: '0.01em',
                      textAlign: 'left'
                    }}>{currentTrack?.title || 'Loading...'}</div>
                    <div style={{
                      fontSize: '7px',
                      color: '#cccccc',
                      fontWeight: 400,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      letterSpacing: '0.01em',
                      textAlign: 'left'
                    }}>{currentTrack ? `${currentTrack.artist} — ${currentTrack.album}` : 'Loading...'}</div>
                  </div>
                  {/* Controls and Volume */}
                  <div className="flex flex-row items-center" style={{ gap: '4px' }}>
                    {/* Play/Pause Button */}
                    <div
                      onClick={togglePlay}
                      style={{
                        cursor: 'pointer',
                        height: '18px',
                        width: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white'
                      }}
                    >
                      <Image
                        src={isPlaying ? "/assets/PAUSE.png" : "/assets/PLAY.png"}
                        alt={isPlaying ? "Pause" : "Play"}
                        width={10}
                        height={10}
                        style={{ height: '10px', width: 'auto' }}
                      />
                    </div>
                    {/* Next Button */}
                    <div 
                      onClick={nextTrack}
                      style={{
                        cursor: 'pointer',
                        height: '18px',
                        width: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white'
                      }}>
                      <Image
                        src="/assets/SKIP.png"
                        alt="Skip"
                        width={8}
                        height={8}
                        style={{ height: '8px', width: 'auto' }}
                      />
                    </div>
                    {/* Volume Down Button */}
                    <div
                      onClick={volumeDown}
                      style={{
                        cursor: 'pointer',
                        height: '18px',
                        width: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white'
                      }}
                    >
                      <Image
                        src="/assets/V DOWN.png"
                        alt="Volume Down"
                        width={10}
                        height={10}
                        style={{ height: '10px', width: 'auto' }}
                      />
                    </div>
                    {/* Volume Slider */}
                    <div className="mobile-volume-slider" style={{
                      height: '18px',
                      width: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start'
                    }}>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        style={{
                          WebkitAppearance: 'none',
                          appearance: 'none',
                          width: '100%',
                          height: '2px',
                          background: `linear-gradient(to right, #fff ${isMuted ? 0 : volume}%, #444 ${isMuted ? 0 : volume}%)`,
                          borderRadius: '5px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    {/* Volume Up Button */}
                    <div
                      onClick={volumeUp}
                      style={{
                        cursor: 'pointer',
                        height: '18px',
                        width: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white'
                      }}
                    >
                      <Image
                        src="/assets/V UP.png"
                        alt="Volume Up"
                        width={10}
                        height={10}
                        style={{ height: '10px', width: 'auto' }}
                      />
                    </div>
                  </div>
                </div>

                <a href="/contact" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                  contact
                </a>
              </div>
            </div>

            {/* Manual adjustment for very small screens (iPhone 4/5) */}
            <style>{`
              @media (max-width: 330px) {
                /* Shrink the whole block */
                .mobile-layout {
                  transform: translateY(0%) scale(0.75) translateX(-8%) !important;
                }
                .mobile-layout .nav-item {
                  font-size: 13px !important;
                }
                .mobile-volume-slider {
                  width: 24px !important;
                }
                .mobile-volume-slider input[type=range]::-webkit-slider-thumb {
                  width: 8px;
                  height: 8px;
                }
                .mobile-volume-slider input[type=range]::-moz-range-thumb {
                  width: 8px;
                  height: 8px;
                }
                .mobile-volume-slider input[type=range]::-ms-thumb {
                  width: 8px;
                  height: 8px;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </main>
  );
} 