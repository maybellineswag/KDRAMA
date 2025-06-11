'use client';
import React, { CSSProperties, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import './page.css';
import { useLanguage } from './contexts/LanguageContext';
import Link from 'next/link';
import { useMusicPlayer } from './contexts/MusicPlayerContext';

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
    album: "MUSIC - SORRY 4 DA WAIT",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823825/FOMDJ_vmuoec.mp3",
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
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823791/Faith_nc4fcd.mp3",
    cover: "assets/images/X.png"
},
{
    title: "PORSCHE POET",
    artist: "Lancey Foux",
    album: "PORSCHE POET",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823957/PORSCHE_POET_jajxv2.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822530/PORSCHE_POET_qxf81e.jpg"
},
{
    title: "ICY GRL",
    artist: "Saweetie",
    album: "ICY GRL",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823887/ICY_GRL_ocmlzw.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822525/ICY_GRL_kpehqt.jpg"
},
{
    title: "Stuck",
    artist: "Miss A",
    album: "Colors",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823977/STUCK_vwndbj.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822532/STUCK_yi0pwc.jpg"
},
{
    title: "Best Friend",
    artist: "Nettspend",
    album: "Best Friend",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823640/BEST_FRIEND_h7dtmx.mp3",
    cover: "assets/images/BEST FRIEND.jpg"
},
{
    title: "MMS",
    artist: "Полка",
    album: "MMS",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823908/MMS_rkwhpp.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/MMS_hcgvij.jpg"
},
{
    title: "Like This",
    artist: "박혜진 Park Hye Jin",
    album: "How can I",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823904/LIKE_THIS_jkdt6z.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822527/LIKE_THIS_r01apj.jpg"
},
{
    title: "XOXO",
    artist: "NMIXX",
    album: "Fe304: BREAK",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823999/XOXO_hizqaq.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822538/XOXO_ym9lio.jpg"
},
{
    title: "Safe",
    artist: "Young Thug",
    album: "Safe",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823969/SAFE_jkyiim.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822532/SAFE_kdypcm.jpg"
},
{
    title: "russian opps",
    artist: "Osamason",
    album: "russian opps",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823961/RUSSIAN_OPPS_hjslbd.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822532/RUSSIAN_OPPS_gnjiw5.jpg"
},
{
    title: "Avril 14th",
    artist: "Aphex Twin",
    album: "Drukqs",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823639/AVRIL_14TH_lztwke.mp3",
    cover: "assets/images/AVRIL 14TH.jpg"
},
{
    title: "Feeling's Gone",
    artist: "Frank Ocean",
    album: "Feeling's Gone",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823795/FEELINGS_GONE_l7jjs3.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822534/X_lmigbb.png"
},
{
    title: "These Days",
    artist: "Frank Ocean",
    album: "These Days",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748824017/THESE_DAYS_tffn9i.wav",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822534/X_lmigbb.pngg"
},
{
    title: "Like I'm Lying",
    artist: "Lancey Foux",
    album: "Like I'm Lying",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823902/LIKE_IM_LYING_izwxbw.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822527/LIKE_IM_LYING_c6k2ho.jpg"
},
{
    title: "Can't Be Us (Efan, Clou, JFEL Bootleg)",
    artist: "Headie One",
    album: "Can't Be Us",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823751/CANT_BE_US_uw9cyt.mp3",
    cover: "assets/images/CANT BE US.jpg"
},
{
    title: "Moonlight",
    artist: "Juice WRLD",
    album: "Moonlight",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823910/MOONLIGHT_tnlfjb.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/MOONLIGHT_zlwrra.jpg"
},
{
    title: "Messenger",
    artist: "YT",
    album: "Messenger",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823907/MESSENGER_fewlm2.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822529/MESSENGER_uyz3qt.png"
},
{
    title: "BIG SCIENTIST",
    artist: "Lil Yachty",
    album: "Big Scientist",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823643/BIG_SCIENTIST_xjmkyc.mp3",
    cover: "assets/images/BIG SCIENTIST.jpg"
},
{
    title: "2sick",
    artist: "kwes e",
    album: "2sick",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823627/2SICK_weskoy.mp3",
    cover: "assets/images/2SICK.jpg"
},
{
    title: "In Here Somewhere",
    artist: "Frank Ocean",
    album: "ENDLESS",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823888/IN_HERE_SOMEWHERE_fcpvpt.m4a",
    cover: "assets/images/endless.jpg"
},
{
    title: "Comme Des Garçons",
    artist: "Frank Ocean",
    album: "ENDLESS",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823758/COMME_DES_GAR%C3%87ONS_gjh29x.m4a",
    cover: "assets/images/endless.jpg"
},
{
    title: "Impietas + Deathwish (ASR)",
    artist: "Frank Ocean",
    album: "ENDLESS",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823890/IMPIETAS_DEATHWISH_gr1prv.m4a",
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
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823759/CASH_COW_uynq2y.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822534/X_lmigbb.png"
},
{
    title: "Just Because",
    artist: "Future & Young Thug",
    album: "Just Because",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823892/JUST_BECAUSE_x5si5n.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822526/JUST_BECAUSE_psl7s0.jpg"
},
{
    title: "YUNG NIGGAZ",
    artist: "Kodak Black",
    album: "YUNG NIGGAZ",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748824006/YUNG_NIGGAZ_jrwtwe.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822588/YUNG_NIGGAZ_shl5en.jpg"
},
{
    title: "Teamwork",
    artist: "Young Thug & Gunna",
    album: "Teamwork",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823979/TEAMWORK_ormapi.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822532/TEAMWORK_ty9iqg.jpg"
},
{
    title: "Digital Plane",
    artist: "Young Thug & NAV",
    album: "Digital Plane",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823786/DIGITAL_PLANE_b2s2yr.mp3",
    cover: "assets/images/DIGITAL PLANE.jpg"
},
{
    title: "Vivienne Me",
    artist: "The Act",
    album: "Vivienne Me",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823991/VIVIENNE_ME_uc2etx.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822534/VIVIENNE_ME_y6nzkz.jpg"
},
{
    title: "Life Of Sins",
    artist: "Young Thug",
    album: "Life Of Sins",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823901/LIFE_OF_SINS_qzaziv.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822527/LIFE_OF_SINS_qmqxsx.jpg"
},
{
    title: "At The Gates",
    artist: "Drake & Lil Uzi Vert",
    album: "At The Gates",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823643/AT_THE_GATES_itoy6f.mp3",
    cover: "assets/images/AT THE GATES.jpg"
},
{
    title: "Sky City",
    artist: "Kanye West",
    album: "Yandhi",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823971/SKY_CITY_c8coxj.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822551/YANDHI_dfpgit.jpg"
},
{
    title: "knotz",
    artist: "xhujung",
    album: "knotz",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823897/KNOTZ_n0wh6i.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/KNOTZ_ga7xwx.png"
},
{
    title: "Hoodway",
    artist: "454",
    album: "Hoodway",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823882/HOODWAY_ge0klx.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822526/HOODWAY_phkodb.png"
},
{
    title: "This Is God's Test",
    artist: "Kanye West",
    album: "Yandhi",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823984/THIS_IS_GODS_TEST_upfiu7.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822551/YANDHI_dfpgit.jpg"
},
{
    title: "keep me in the loop",
    artist: "YT",
    album: "keep me in the loop",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823897/KEEP_ME_IN_THE_LOOP_d5bfak.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822527/KEEP_ME_IN_THE_LOOP_n8mxp1.png"
},
{
    title: "Elle veut link",
    artist: "Serane & MissingKasper",
    album: "Elle veut link",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823783/ELLE_VEUT_LINK_c85pkl.mp3",
    cover: "assets/images/ELLE VEUT LINK.jpg"
},
{
    title: "nobody 2saveus",
    artist: "Ak4yla",
    album: "nobody 2saveus",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823915/NOBODY2SAVEUS_whqfcs.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822530/NOBODY_2SAVEUS_eykcrp.png"
},
{
    title: "Money Make Her",
    artist: "Lancey Foux",
    album: "Money Make Her",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823908/MONEY_MAKE_HER_mexx1m.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/MONEY_MAKE_HER_wcm6cn.jpg"
},
{
    title: "VISA",
    artist: "Lancey Foux",
    album: "VISA",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823992/VISA_r2sdjx.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822533/VISA_o6u3rd.jpg"
},
{
    title: "24HRS",
    artist: "Babyxsosa & PPGCASPER",
    album: "24HRS",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823628/24HRS_j6exks.mp3",
    cover: "assets/images/24HRS.jpg"
},
{
    title: "Odds",
    artist: "Drugbwoy",
    album: "Odds",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823948/ODDS_ywnqdy.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822530/ODDS_kvzmxo.png"
},
{
    title: "EVERYDAY",
    artist: "POLO PERKS",
    album: "EVERYDAY",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823785/EVERYDAY_ozfeai.mp3",
    cover: "assets/images/EVERYDAY.jpg"
},
{
    title: "uh uh",
    artist: "Babyxsosa",
    album: "uh uh",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823989/UH_UH_hrekxj.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822533/UH_UH_buk16i.png"
},
{
    title: "Come on World, You Can't Go!",
    artist: "Frank Ocean",
    album: "Come on World, You Can't Go!",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823769/COME_ON_WORLD_nekfuo.mp3",
    cover: "assets/images/COMEONWORLD.jpg"
},
{
    title: "gatlin gun",
    artist: "Dave & AJ Tracey",
    album: "gatlin gun",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823868/GATLIN_GUN_ak2pu6.mp3",
    cover: "assets/images/GATLIN GUN.jpg"
},
{
    title: "Her Loss Interlude",
    artist: "Drake & 21 Savage",
    album: "Her Loss",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823880/HER_LOSS_INTERLUDE_lfnl9x.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822525/INTERLUDE_i6s124.jpg"
},
{
    title: "FAKE RUNTZ",
    artist: "Caal Vo",
    album: "FAKE RUNTZ",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823792/FAKE_RUNTZ_orvoaf.mp3",
    cover: "assets/images/FAKE RUNTZ.jpg"
},
{
    title: "FERRIS WHEEL",
    artist: "454",
    album: "FERRIS WHEEL",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823795/FERRIS_WHEEL_cwklyi.mp3",
    cover: "assets/images/FERRIS WHEEL.jpg"
},
{
    title: "J.O.B.",
    artist: "Frank Ocean",
    album: "The Lonny Breaux Collection",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823891/J.O.B._p64qbs.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822527/LONNY_BREAUX_gnfvep.jpg"
},
{
    title: "It's On You",
    artist: "Chris Travis",
    album: "Waterszn 2",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823892/ITS_ON_YOU_jelteh.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822526/ITS_ON_YOU_ev7kzk.jpg"
},
{
    title: "K-POP",
    artist: "Lancey Foux",
    album: "K-POP",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823893/K-POP_zpvobd.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822526/K-POP_ofihrw.jpg"
},
{
    title: "from me 2 you",
    artist: "454",
    album: "from me 2 you",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823821/FROM_ME_2_YOU_oyvxpc.mp3",
    cover: "assets/images/FROM ME 2 YOU.jpg"
},
{
    title: "best for you",
    artist: "Bakar",
    album: "best for you",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823636/BEST_FOR_YOU_zuqdzy.mp3",
    cover: "assets/images/BEST FOR YOU.jpg"
},
{
    title: "I Hate This",
    artist: "evilgiane",
    album: "I Hate This",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823883/I_HATE_THIS_nhf2az.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822525/I_HATE_THIS_svob05.png"
},
{
    title: "Whip Appeal",
    artist: "Frank Ocean",
    album: "UNRELEASED;misc",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823999/WHIP_APPEAL_igycpz.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822534/UNRELEASED_MISC_uzejwa.jpg"
},
{
    title: "4 True ''Thug Angel''",
    artist: "Sickboyrari",
    album: "4 True ''Thug Angel''",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823628/4_TRUE_bjcuj2.mp3",
    cover: "assets/images/4 TRUE.jpg"
},
{
    title: "CAMPAIGN FREESTYLE",
    artist: "Teezo Touchdown",
    album: "CAMPAIGN FREESTYLE",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823749/CAMPAIGN_FREESTYLE_v2v7ea.mp3",
    cover: "assets/images/CAMPAIGN FREESTYLE.jpg"
},
{
    title: "Eric Koston",
    artist: "Kay9ine",
    album: "Eric Koston",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823787/ERIC_KOSTON_gjjqqr.mp3",
    cover: "assets/images/ERIC KOSTON.jpg"
},
{
    title: "GHOSTS IN MY ROOM",
    artist: "evilgiane & harrison",
    album: "GHOSTS IN MY ROOM",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823876/GHOSTS_IN_MY_ROOM_zjwceu.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822526/GHOSTS_IN_MY_ROOM_tasntm.png"
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
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823876/GOLDEN_AGE_oy2gaj.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822524/GOLDEN_AGE_xyh2ov.png"
},
{
    title: "samsung love",
    artist: "yung bruh",
    album: "samsung love",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823967/SAMSUNG_LOVE_eemufz.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822532/SAMSUNG_LOVE_wbv1dc.png"
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
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822576/YAO_MING_czrkke.png"
},
{
    title: "pack a punch",
    artist: "Destroy Lonely",
    album: "pack a punch",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823950/PACK_A_PUNCH_cxr46u.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822531/PACK_A_PUNCH_hmcu4q.png"
},
{
    title: "Plenty",
    artist: "PARTYNEXTDOOR",
    album: "Plenty",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823958/PLENTY_u2qaqe.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822531/PLENTY_u6xzgt.png"
},
{
    title: "Some Of Your Love",
    artist: "PARTYNEXTDOOR",
    album: "Some Of Your Love",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823977/SOME_OF_YOUR_LOVE_rywbg6.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822533/SOME_OF_YOUR_LOVE_oswnjq.png"
},
{
    title: "RaRa",
    artist: "Travis Scott & Lil Uzi Vert",
    album: "RaRa",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823960/RARA_tjcadk.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822532/RARA_sof67d.png"
},
{
    title: "Whatever You Say",
    artist: "PARTYNEXTDOOR",
    album: "Whatever You Say",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823994/WHATEVER_YOU_SAY_ogty8p.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822534/WHATEVER_YOU_SAY_glbpky.png"
},
{
    title: "Part Time",
    artist: "Travis Scott",
    album: "Part Time",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823949/PART_TIME_l4gbsn.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822531/PART_TIME_vcrzso.png"
},
{
    title: "Fit ID",
    artist: "Sainté",
    album: "Fit ID",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823798/FIT_ID_kbn8ld.mp3",
    cover: "assets/images/FIT ID.jpg"
},
{
    title: "Flatline",
    artist: "Journals",
    album: "Flatline",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823820/FLATLINE_ghwcgw.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822526/JOURNALS_ounm63.jpg"
},
{
    title: "Frontline",
    artist: "Pa Salieu",
    album: "Frontline",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823826/FRONTLINE_gmztfw.mp3",
    cover: "assets/images/FRONTLINE.jpg"
},
{
    title: "Broke Boi",
    artist: "Playboi Carti",
    album: "Broke Boi",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823648/BROKE_BOI_adxtem.mp3",
    cover: "assets/images/BROKE BOI.jpg"
},
{
    title: "FINE SHIT",
    artist: "Playboi Carti",
    album: "MUSIC",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823796/FINE_SHIT_bpu2an.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/MUSIC_kyv7kl.jpg"
},
{
    title: "FYBR (First Year Being Rich)",
    artist: "A$AP Mob",
    album: "Cozy Tapes Vol. 2: Too Cozy",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823847/FYBR_zqd0hg.mp3",
    cover: "assets/images/COZY TAPES 2.jpg"
},
{
    title: "In Vein (feat. The Weeknd)",
    artist: "Rick Ross ",
    album: "Mastermind",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823896/IN_VEIN_lcrwbj.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/MASTERMIND_ghvjh6.jpg"
},
{
    title: "Losing You",
    artist: "Solange",
    album: "Losing You",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823905/LOSING_YOU_vxsxnm.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/LOSING_YOU_klwgq4.jpg"
},
{
    title: "Love In The Sky",
    artist: "The Weeknd",
    album: "Kiss Land",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823917/LOVE_IN_THE_SKY_c5txzm.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822527/KISS_LAND_kac0oa.jpg"
},
{
    title: "No Sense",
    artist: "Justin Bieber & Travis Scott",
    album: "Purpose (Deluxe)",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823920/NO_SENSE_cjcsum.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822531/PURPOSE_wtnld3.jpg"
},
{
    title: "Right My Wrongs",
    artist: "Bryson Tiller",
    album: "T R A P S O U L",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823963/RIGHT_MY_WRONGS_wz43d1.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822533/TRAPSOUL_yotpss.jpg"
},
{
    title: "Solo",
    artist: "FUTURE",
    album: "HNDRXX",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823988/SOLO_j0t4di.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822524/HNDRXX_ttnlk5.jpg"
},
{
    title: "Green & Purple",
    artist: "Travis Scott & Playboi Carti",
    album: "Green & Purple",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823882/GREEN_PURPLE_et5w1b.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822525/GREEN_PURPLE_h6ncm7.png"
},
{
    title: "NASA",
    artist: "Future",
    album: "NASA",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823912/NASA_bnspea.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822529/NASA_ojnbzp.png"
},
{
    title: "Turn Your Phone Off",
    artist: "PinkPantheress & Destroy Lonely",
    album: "Turn Your Phone Off",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823990/TURN_YOUR_PHONE_OFF_vxwxh2.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822533/TURN_YOUR_PHONE_OFF_dcjnoy.jpg"
},
{
    title: "What You Doin",
    artist: "Gucci Mane & Migos",
    album: "Green Album",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823996/WHAT_YOU_DOIN_tox15q.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822524/GREEN_ALBUM_rigb7o.jpg"
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
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822601/%D0%9F%D0%9E%D0%9C%D0%9D%D0%AE_flreqa.jpg"
},
{
    title: "Таллин",
    artist: "JUGHEAD & Kinderlil",
    album: "Less Is More",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748824008/%D0%A2%D0%90%D0%9B%D0%9B%D0%98%D0%9D_dfiyfc.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822527/LESS_IS_MORE_upwdak.jpg"
},
{
    title: "Behave",
    artist: "Fimiguerrero & Len",
    album: "New World Order",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823642/BEHAVE_r7okr3.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822529/NEW_WORLD_ORDER_s9v36d.jpg"
},
{
    title: "Better By Yourself",
    artist: "Babyxsosa",
    album: "Better By Yourself",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823647/BETTER_BY_YOURSELF_ughudn.mp3",
    cover: "assets/images/BETTER BY YOURSELF.jpg"
},
{
    title: "Chanel",
    artist: "Babyxsosa",
    album: "Chanel",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823752/CHANEL_ju4ilh.mp3",
    cover: "assets/images/CHANEL.jpg"
},
{
    title: "Get Up",
    artist: "New Jeans",
    album: "Get Up",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823875/GET_UP_ngihuu.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822524/GET_UP_ljgbeu.jpg"
},
{
    title: "Designer Boi",
    artist: "A$AP NAST & D33J",
    album: "Designer Boi",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823762/DESIGNER_BOI_w3kqgq.mp3",
    cover: "assets/images/DESIGNER BOI.jpg"
},
{
    title: "FACETIME / TEXTING",
    artist: "Babyxsosa",
    album: "FACETIME / TEXTING",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823788/FACETIME_h9g0yv.mp3",
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
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823908/LES_FLEURS_krlwnv.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822527/LES_FLEURS_nwiyzm.jpg"
},
{
    title: "Losalamitoslatinfunklovesong",
    artist: "Gene Harris",
    album: "Astral Signals",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823819/FUNKLOVESONG_s96qsj.mp3",
    cover: "assets/images/ASTRAL SIGNALS.jpg"
},
{
    title: "So In Love",
    artist: "Curtis Mayfield",
    album: "There's No Place Like America Today",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823990/SO_IN_LOVE_ppkdsm.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822529/NO_PLACE_LIKE_AMERICA_aba1bq.jpg"
},
{
    title: "Tension",
    artist: "Central Cee",
    album: "Wild West",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823987/TENSION_wtenvn.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822534/WILD_WEST_ccfwzy.jpg"
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
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822533/THE_LIFE_OF_PABLO_uaqs9b.jpg"
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
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823641/AUTOMATIC_cd6nhg.mp3",
    cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822525/ICE_CREAM_CAKE_jc2yta.jpg"
},
{
    title: "All That Matters",
    artist: "Justin Bieber",
    album: "Journals",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823631/ALL_THAT_MATTERS_fkfs8k.mp3",
    cover: "assets/images/JOURNALS.jpg"
},
{
    title: "Cool With You",
    artist: "New Jeans",
    album: "Get Up",
    src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823762/COOL_WITH_YOU_rz1vrj.mp3",
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
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903842/SpotiDownloader.com_-_%D0%97%D0%BD%D0%B0%D1%8E_-_%D0%9F%D0%BE%D0%BB%D0%BA%D0%B0_lbu9dk.mp3",
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
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822528/MUSIC_kyv7kl.jpg"
},{
  title: "Provider",
  artist: "Frank Ocean",
  album: "Provider",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903828/SpotiDownloader.com_-_Provider_-_Frank_Ocean_hwbkvs.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903633/Cover_of_Provider_by_Frank_Ocean_q9k9jl.jpg"
},{
  title: "Please Tell Me",
  artist: "Future",
  album: "SAVE ME",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903826/SpotiDownloader.com_-_Please_Tell_Me_-_Future_un7sug.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903632/Cover_of_Please_Tell_Me_by_Future_lgkvoc.jpg"
},{
  title: "OLIVINE",
  artist: "Freeze corleone & ASHE 22",
  album: "RIYAD SADIO",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903826/SpotiDownloader.com_-_OLIVINE_-_Freeze_corleone_ok5hyw.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903629/Cover_of_OLIVINE_by_Freeze_corleone_ASHE_22_mt1u3r.jpg"
},{
  title: "paper chase",
  artist: "kwes e",
  album: "yup",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903825/SpotiDownloader.com_-_paper_chase_-_kwes_e_yhohip.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903629/Cover_of_OLIVINE_by_Freeze_corleone_ASHE_22_mt1u3r.jpg"
},{
  title: "PROJECTS",
  artist: "unki",
  album: "PROJECTS",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903825/SpotiDownloader.com_-_PROJECTS_-_unki_ygdbln.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903632/Cover_of_PROJECTS_by_unki_jtlxec.jpg"
},{
  title: "Loft Music",
  artist: "The Weeknd",
  album: "House Of Balloons (Original)",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903823/SpotiDownloader.com_-_Loft_Music_-_The_Weeknd_s3v3jv.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903624/Cover_of_Loft_Music_by_The_Weeknd_kqrbkt.jpg"
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
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903626/Cover_of_LUV_by_ROCKET_eu3nwf.jpg"
},{
  title: "LOUVRE",
  artist: "Destroy Lonely",
  album: "NS+(ULTRA)",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903819/SpotiDownloader.com_-_LOUVRE_-_Destroy_Lonely_ua3zkz.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903625/Cover_of_LOUVRE_by_Destroy_Lonely_k4akjy.jpg"
},{
  title: "Keep Your Faith To The Sky",
  artist: "Willie Scott",
  album: "Thank You Lord for One More Day",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903818/SpotiDownloader.com_-_Keep_Your_Faith_to_the_Sky_-_Willie_Scott_yd682k.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903622/Cover_of_Keep_Your_Faith_to_the_Sky_by_Willie_Scott_The_Birmingham_Spirituals_m7pqkv.jpg"
},{
  title: "MOSQUITO P2",
  artist: "SURF GANG",
  album: "SGV1",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903818/SpotiDownloader.com_-_Mosquito_P2_-_SURF_GANG_y5eiln.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903628/Cover_of_Mosquito_P2_by_SURF_GANG_bnsykb.jpg"
},{
  title: "mileys riddim",
  artist: "Jim Legxacy",
  album: "homeless n*gga pop music",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903818/SpotiDownloader.com_-_mileys_riddim_-_Jim_Legxacy_gr4pne.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903627/Cover_of_mileys_riddim_by_Jim_Legxacy_ye2r5f.jpg"
},{
  title: "KONAMI (2bigos)",
  artist: "COEURCO",
  album: "UNLIMITED ONLINE EXHIBITION",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903814/SpotiDownloader.com_-_KONAMI_2bigos_-_COEURCO_oqze1n.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903623/Cover_of_KONAMI_2bigos_by_COEURCO_ghc8hn.jpg"
},{
  title: "Jumbotron Shit Poppin",
  artist: "Drake",
  album: "Her Loss",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903813/SpotiDownloader.com_-_Jumbotron_Shit_Poppin_-_Drake_toclrz.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903620/Cover_of_Jumbotron_Shit_Poppin_by_Drake_k4a3gf.jpg"
},{
  title: "Fashion Show",
  artist: "Kwengface & Lancey Foux",
  album: "Fashion Show",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903813/SpotiDownloader.com_-_Fashion_Show_-_Kwengface_oxm6z3.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903619/Cover_of_Fashion_Show_by_Kwengface_Lancey_Foux_miwnzo.jpg"
},{
  title: "How Sweet",
  artist: "New Jeans",
  album: "How Sweet",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903813/SpotiDownloader.com_-_How_Sweet_-_NewJeans_b7cxtn.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903619/Cover_of_How_Sweet_by_NewJeans_hgxsni.jpg"
},{
  title: "I GOT U",
  artist: "Toxi$",
  album: "I GOT U",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903812/SpotiDownloader.com_-_I_GOT_U_-_Toxi_vb9593.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903620/Cover_of_I_GOT_U_by_Toxi_jpigst.jpg"
},{
  title: "Dreams Money Can Buy",
  artist: "Drake",
  album: "Care Package",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903809/SpotiDownloader.com_-_Dreams_Money_Can_Buy_-_Drake_qsllaj.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903619/Cover_of_Dreams_Money_Can_Buy_by_Drake_s1ng6q.jpg"
},{
  title: "Fakin'",
  artist: "JUE",
  album: "6 Shots",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903807/SpotiDownloader.com_-_Fakin_-_JUE_ilpful.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903622/Cover_of_Kin_by_Kevin_Abstract_ijksuw.jpg"
},{
  title: "Dopamine - GISELLE Solo",
  artist: "aespa",
  album: "SYNK: PARALLEL LINE - Special Digital Single",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903806/SpotiDownloader.com_-_Dopamine_-_GISELLE_Solo_-_aespa_kqs4lp.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903618/Cover_of_Dopamine_-_GISELLE_Solo_by_aespa_aqedro.jpg"
},{
  title: "Did You See",
  artist: "J Hus",
  album: "Common Sense",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903806/SpotiDownloader.com_-_Did_You_See_-_J_Hus_uoqm30.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903618/Cover_of_Did_You_See_by_J_Hus_fs6xuv.jpg"
},{
  title: "down",
  artist: "Effie",
  album: "E",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903805/SpotiDownloader.com_-_down_-_Effie_zzex5m.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903618/Cover_of_down_by_Effie_vflzc2.jpg"
},{
  title: "Desirée",
  artist: "Blood Orange",
  album: "Freetown Sound",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903805/SpotiDownloader.com_-_Desir%C3%A9e_-_Blood_Orange_kid6ff.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903516/Cover_of_Desir%C3%A9e_by_Blood_Orange_d54uik.jpg"
},{
  title: "Diamonds",
  artist: "YT & Fimiguerrero",
  album: "OI!",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903802/SpotiDownloader.com_-_Diamonds_-_YT_mg5hlh.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903519/Cover_of_Diamonds_by_YT_Fimiguerrero_cubotq.jpg"
},{
  title: "Dark Souls",
  artist: "FENDIGLOCK",
  album: "NO TUNE",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903801/SpotiDownloader.com_-_Dark_Souls_-_FENDIGLOCK_irg9br.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903501/Cover_of_Dark_Souls_by_FENDIGLOCK_ixxj58.jpg"
},{
  title: "Adore",
  artist: "Prince",
  album: "Sign 'O' The Times",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903800/SpotiDownloader.com_-_Adore_-_Prince_msbjep.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903493/Cover_of_Adore_by_Prince_ueywnu.jpg"
},{
  title: "BIPOLAR BAG",
  artist: "Lancey Foux",
  album: "FIRST DEGREE",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903799/SpotiDownloader.com_-_BIPOLAR_BAG_-_Lancey_Foux_ytpbab.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903500/Cover_of_BIPOLAR_BAG_by_Lancey_Foux_fzttmn.jpg"
},{
  title: "Bad - Remix",
  artist: "Wale & Rihanna",
  album: "The Gifted",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903799/SpotiDownloader.com_-_Bad_feat._Rihanna_-_Remix_-_Wale_r8nnhq.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903499/Cover_of_Bad_feat._Rihanna_-_Remix_by_Wale_Rihanna_igtdaj.jpg"
},{
  title: "CSO",
  artist: "ROCKET",
  album: "Ego Trippin'",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903798/SpotiDownloader.com_-_CSO_-_ROCKET_k9hd9x.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903501/Cover_of_CSO_by_ROCKET_gyj4gc.jpg"
},{
  title: "b*tches and money go",
  artist: "Baby Cute",
  album: "SENSATION! A Cute Chaotic Trail",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903797/SpotiDownloader.com_-_b_tches_And_Money_Go_-_Baby_Cute_xn3rol.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903497/Cover_of_b_tches_And_Money_Go_by_Baby_Cute_t3ybx0.jpg"
},{
  title: "B... Arp Forever V3 (109.613 BPM)",
  artist: "Vegyn",
  album: "Text While Driving If You Want To Meet God!",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903793/SpotiDownloader.com_-_B..._Arp_Forever_V3_109.613_BPM_-_Vegyn_mounwj.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903497/Cover_of_B..._Arp_Forever_V3_109.613_BPM_by_Vegyn_hogvyo.jpg"
},{
  title: "Apollo",
  artist: "Slimesito",
  album: "Vida BraZy",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903792/SpotiDownloader.com_-_Apollo_-_Slimesito_zsdidr.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903495/Cover_of_Apollo_by_Slimesito_rwpfs1.jpg"
},{
  title: "Amen",
  artist: "Drake & Teezo Touchdown",
  album: "For All The Dogs",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903791/SpotiDownloader.com_-_Amen_feat._Teezo_Touchdown_-_Drake_j3mt8n.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903494/Cover_of_Amen_feat._Teezo_Touchdown_by_Drake_Teezo_Touchdown_lraccq.jpg"
},{
  title: "01'beigecamry",
  artist: "Sideshow",
  album: "Farley",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903789/SpotiDownloader.com_-_01_beigecamry_-_Sideshow_lr6sd9.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903491/Cover_of_01_beigecamry_by_Sideshow_spt1ff.jpg"
},{
  title: "Легендарити",
  artist: "OG Buda & FRIENDLY THUG 52 NGG",
  album: "POX VAWË",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903789/SpotiDownloader.com_-_%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D0%B8%D1%82%D0%B8_-_OG_Buda_sptud1.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903490/Cover_of_%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D0%B8%D1%82%D0%B8_by_OG_Buda_FRIENDLY_THUG_52_NGG_n5nzad.jpg"
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
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903490/Cover_of_%D0%A2%D0%BE%D0%BF%D0%91%D0%BE%D0%B9_by_Guram_D_qoaqpn.jpg"
},{
  title: "Для Тебя (Пусто)",
  artist: "OG Buda",
  album: "Скучаю, Но Работаю",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903788/SpotiDownloader.com_-_%D0%94%D0%BB%D1%8F_%D0%A2%D0%B5%D0%B1%D1%8F_%D0%9F%D1%83%D1%81%D1%82%D0%BE_-_OG_Buda_mwccgy.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903487/Cover_of_%D0%94%D0%BB%D1%8F_%D0%A2%D0%B5%D0%B1%D1%8F_%D0%9F%D1%83%D1%81%D1%82%D0%BE_by_OG_Buda_ixsayk.jpg"
},{
  title: "Just How I'm Feelin'",
  artist: "Lil Yachty & Lil Baby",
  album: "Lil Boat 3.5",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903788/SpotiDownloader.com_-_Just_How_I_m_Feelin_feat._Lil_Baby_-_Lil_Yachty_kju60g.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903485/Cover_of_Just_How_I_m_Feelin_feat._Lil_Baby_by_Lil_Yachty_Lil_Baby_dl62dh.jpg"
},{
  title: "ROSTER",
  artist: "5EB & YT",
  album: "##MOTIONMUZIK",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903787/SpotiDownloader.com_-_ROSTER_-_5EB_zlguuz.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903487/Cover_of_ROSTER_by_5EB_YT_x9kdpm.jpg"
},{
  title: "XY",
  artist: "Feng",
  album: "What The Feng",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903786/SpotiDownloader.com_-_XY_-_Feng_xdhpdx.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903486/Cover_of_XY_by_Feng_lnpitd.jpg"
},{
  title: "Групи",
  artist: "Платина & OG Buda",
  album: "Сладких снов",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903784/SpotiDownloader.com_-_%D0%93%D1%80%D1%83%D0%BF%D0%B8_-_%D0%9F%D0%BB%D0%B0%D1%82%D0%B8%D0%BD%D0%B0_yfckeb.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903486/Cover_of_%D0%93%D1%80%D1%83%D0%BF%D0%B8_by_%D0%9F%D0%BB%D0%B0%D1%82%D0%B8%D0%BD%D0%B0_OG_Buda_oerofj.jpg"
},{
  title: "Caramel",
  artist: "PHARAOH",
  album: "Caramel",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903784/SpotiDownloader.com_-_Caramel_-_PHARAOH_iy1ujn.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903485/Cover_of_Caramel_by_PHARAOH_ptdmgm.jpg"
},{
  title: "AMMO",
  artist: "FRIENDLY THUG 52 NGG",
  album: "AMMO",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903782/SpotiDownloader.com_-_AMMO_-_FRIENDLY_THUG_52_NGG_at7dgl.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903485/Cover_of_AMMO_by_FRIENDLY_THUG_52_NGG_mozbz8.jpg"
},{
  title: "No Coco Senior Please",
  artist: "FRIENDLY THUG 52 NGG",
  album: "Graf Monte-Cristo / Most Valuable Pirate",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748903780/SpotiDownloader.com_-_No_Coco_Senior_Please_-_FRIENDLY_THUG_52_NGG_cxl4fm.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748903486/Cover_of_No_Coco_Senior_Please_by_FRIENDLY_THUG_52_NGG_dehie3.jpg"
},{
  title: "Slide On Me",
  artist: "Frank Ocean & Young Thug",
  album: "ENDLESS",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823972/SLIDE_ON_ME_avfsqq.mp3",
  cover: "IMG"
},{
  title: "Rushes To",
  artist: "Frank Ocean",
  album: "ENDLESS",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823967/Rushes_To_xpmm4e.m4a",
  cover: "IMG"
},{
  title: "PLAY THIS",
  artist: "Playboi Carti",
  album: "PLAY THIS",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1748823965/PLAY_THIS_ih1sn1.wav",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1748822530/PLAY_THIS_bk6tpf.jpg"
},{
  title: "Abu Dhabi Baбy",
  artist: "Платина, OG BUDA & MAYOT",
  album: "Sosa Muzik",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397404/SpotiDownloader.com_-_Abu_Dhabi_Ba6y_-_%D0%9F%D0%BB%D0%B0%D1%82%D0%B8%D0%BD%D0%B0_ibombl.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397370/Cover_of_Abu_Dhabi_Ba6y_by_%D0%9F%D0%BB%D0%B0%D1%82%D0%B8%D0%BD%D0%B0_OG_Buda_MAYOT_tegb1s.jpg"
},{
  title: "Блэсс",
  artist: "OG Buda & YUNGWAY",
  album: "Скучаю, Но Работаю",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397429/SpotiDownloader.com_-_%D0%91%D0%BB%D1%8D%D1%81%D1%81_-_OG_Buda_mpti3n.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397377/Cover_of_%D0%91%D0%BB%D1%8D%D1%81%D1%81_by_OG_Buda_YUNGWAY_pd831f.jpg"
},{
  title: "Programme Chanel",
  artist: "Sainté",
  album: "Programme Chanel",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397428/SpotiDownloader.com_-_Programme_Chanel_-_Saint%C3%A9_fmmfje.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397373/Cover_of_Programme_Chanel_by_Saint%C3%A9_lp0pfx.jpg"
},{
  title: "Rap Shit",
  artist: "City Girls",
  album: "PERIOD",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397424/SpotiDownloader.com_-_Rap_Shit_-_City_Girls_vrrqrt.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397374/Cover_of_Rap_Shit_by_City_Girls_zdvulq.jpg"
},{
  title: "WW3",
  artist: "Ye",
  album: "WW3",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397423/SpotiDownloader.com_-_WW3_-_Ye_svo8hb.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397376/Cover_of_WW3_by_Ye_dc7o3i.jpg"
},{
  title: "take your time",
  artist: "Channel Tres & Tinashe",
  album: "i can't go outside",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397421/SpotiDownloader.com_-_take_your_time_feat._Tinashe_-_Channel_Tres_jljuvj.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397375/Cover_of_take_your_time_feat._Tinashe_by_Channel_Tres_Tinashe_affu2a.jpg"
},{
  title: "My Mind",
  artist: "NAV",
  album: "NAV",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397409/SpotiDownloader.com_-_My_Mind_-_NAV_fjsovk.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397373/Cover_of_My_Mind_by_NAV_hg4rcd.jpg"
},{
  title: "Music and Me",
  artist: "Fakemink",
  album: "Music and Me",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397408/SpotiDownloader.com_-_Music_and_Me_-_fakemink_eynyso.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397371/Cover_of_Music_and_Me_by_fakemink_go5b2t.jpg"
},{
  title: "Hunnids",
  artist: "Sainté",
  album: "Local Mvp",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397408/SpotiDownloader.com_-_Hunnids_-_Saint%C3%A9_avrfjc.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397371/Cover_of_Hunnids_by_Saint%C3%A9_coagxa.jpg"
},{
  title: "Envy Me",
  artist: "Sainté",
  album: "Envy Me",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397406/SpotiDownloader.com_-_Envy_Me_-_Saint%C3%A9_zfziwg.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397370/Cover_of_Envy_Me_by_Saint%C3%A9_hedqwi.jpg"
},{
  title: "Good For It",
  artist: "NAV",
  album: "NAV",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397400/SpotiDownloader.com_-_Good_For_It_-_NAV_bewou6.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397371/Cover_of_Good_For_It_by_NAV_kdliuh.jpg"
},{
  title: "NAVUZIMETRO#PT2",
  artist: "NAV, Metro Boomin & Lil Uzi Vert",
  album: "Perfect Timing",
  src: "https://res.cloudinary.com/dynqvvscs/video/upload/v1749397939/SpotiDownloader.com_-_NAVUZIMETRO_PT2_-_NAV_w6vjdc.mp3",
  cover: "https://res.cloudinary.com/dynqvvscs/image/upload/v1749397927/Cover_of_NAVUZIMETRO_PT2_by_NAV_Metro_Boomin_Lil_Uzi_Vert_vxmfrk.jpg"
},
  // Add more tracks here
];

// MarqueeText component for scrolling overflow text
function MarqueeText({ text, style, className = '', speed = 20, pause = 4000 }: { text: string, style?: React.CSSProperties, className?: string, speed?: number, pause?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);
  const [minX, setMinX] = useState(0);

  // Check for overflow and calculate minX
  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.scrollWidth;
        setIsOverflowing(textWidth > containerWidth);
        setMinX(containerWidth - textWidth); // negative value
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  // Reset on text or overflow change
  useEffect(() => {
    setPosition(0);
    setDirection('left');
    setIsPaused(false);
    if (textRef.current) {
      textRef.current.style.transform = 'translateX(0)';
    }
  }, [text, isOverflowing]);

  // Animation loop
  useEffect(() => {
    if (!isOverflowing) return;
    let lastTimestamp: number | null = null;
    let currentDirection = direction;
    let paused = isPaused;

    function step(timestamp: number) {
      if (paused) return;
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      let pxPerMs = speed / 1000; // px/ms
      setPosition(prev => {
        let next = prev + (currentDirection === 'left' ? -1 : 1) * pxPerMs * delta;
        if (currentDirection === 'left' && next <= minX) {
          next = minX;
          setIsPaused(true);
          pauseTimeout.current = setTimeout(() => {
            setDirection('right');
            setIsPaused(false);
          }, pause);
          return next;
        }
        if (currentDirection === 'right' && next >= 0) {
          next = 0;
          setIsPaused(true);
          pauseTimeout.current = setTimeout(() => {
            setDirection('left');
            setIsPaused(false);
          }, pause);
          return next;
        }
        return next;
      });
      animationRef.current = requestAnimationFrame(step);
    }
    if (!paused) {
      animationRef.current = requestAnimationFrame(step);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    };
  }, [isOverflowing, direction, isPaused, speed, pause, minX]);

  // Apply transform
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.transform = `translateX(${position}px)`;
    }
  }, [position]);

  // Center text only if not overflowing, otherwise left-align
  const containerStyles: React.CSSProperties = {
    ...style,
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: isOverflowing ? 'left' : (style?.textAlign || 'center'),
    display: isOverflowing ? 'block' : 'flex',
    alignItems: isOverflowing ? undefined : 'center',
    justifyContent: isOverflowing ? undefined : 'center',
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyles}
    >
      <div
        ref={textRef}
        style={{
          display: 'inline-block',
          willChange: 'transform',
          transition: isOverflowing ? 'none' : 'transform 0.2s',
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default function Home() {
  // Remove all local music player state, refs, shuffle logic, and <audio> element
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { language, setLanguage, translations } = useLanguage();
  const {
    isPlaying,
    togglePlay,
    nextTrack,
    volume,
    handleVolumeChange,
    volumeDown,
    volumeUp,
    shuffledTracks,
    currentTrackIndex,
  } = useMusicPlayer();

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!hasMounted) {
    return null;
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
    <>
    
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
              
              {/* Desktop Layout */}
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
                    <div 
                      onClick={() => setLanguage('en')}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image 
                        src="/assets/us-flag.png" 
                        alt="US Flag" 
                        width={24} 
                        height={16} 
                        className="object-contain"
                      />
                    </div>
                    <div 
                      onClick={() => setLanguage('fr')}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image 
                        src="/assets/france-flag.png" 
                        alt="France Flag" 
                        width={24} 
                        height={16} 
                        className="object-contain"
                      />
                    </div>
                    <div 
                      onClick={() => setLanguage('ru')}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image 
                        src="/assets/russia-flag.png" 
                        alt="Russia Flag" 
                        width={24} 
                        height={16} 
                        className="object-contain"
                      />
                    </div>
                    <div 
                      onClick={() => setLanguage('ko')}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image 
                        src="/assets/korea-flag.png" 
                        alt="Korea Flag" 
                        width={24} 
                        height={16} 
                        className="object-contain"
                      />
                    </div>
                    <div 
                      onClick={() => setLanguage('zh')}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image 
                        src="/assets/china-flag.png" 
                        alt="China Flag" 
                        width={24} 
                        height={16} 
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-8 ml-8">
                  <Link href="/artworks" className="nav-item" style={navLinkStyle}>
                    {translations.artworks}
                  </Link>
                  <Link href="/photography" className="nav-item" style={navLinkStyle}>
                    {translations.photography}
                  </Link>
                  <Link href="/music" className="nav-item" style={navLinkStyle}>
                    {translations.music}
                  </Link>
                  <Link href="/contact" className="nav-item" style={navLinkStyle}>
                    {translations.contact}
                  </Link>
                </div>

                {/* Navigation Links */}
                <div className="absolute left-[62.5%] top-[43.8%] transform -translate-y-1/2">
                  <Link href="/artworks" className="nav-item" style={navLinkStyle}>
                    {translations.artworks}
                  </Link>
                </div>
                <div className="absolute left-[62.8%] top-[44.5%]">
                  <Link href="/photography" className="nav-item" style={navLinkStyle}>
                    {translations.photography}
                  </Link>
                </div>
                <div className="absolute left-[71%] top-[46.7%]">
                  <Link href="/music" className="nav-item" style={navLinkStyle}>
                    {translations.music}
                  </Link>
                </div>
                
                {/* Music Player */}
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
                    backgroundImage: shuffledTracks[currentTrackIndex]?.cover ? `url(${shuffledTracks[currentTrackIndex].cover})` : 'none',
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
                    <MarqueeText
                      text={shuffledTracks[currentTrackIndex]?.title || 'Loading...'}
                      style={{
                        width: '100%',
                        height: '50%',
                        textAlign: 'center',
                        fontWeight: 500,
                        letterSpacing: '0.01em',
                        fontSize: '7px',
                        color: isMobile ? 'white' : 'black',
                      }}
                      speed={20}
                      pause={4000}
                    />
                    <MarqueeText
                      text={shuffledTracks[currentTrackIndex] ? `${shuffledTracks[currentTrackIndex].artist} — ${shuffledTracks[currentTrackIndex].album}` : 'Loading...'}
                      style={{
                        width: '100%',
                        height: '50%',
                        textAlign: 'center',
                        color: isMobile ? '#cccccc' : 'gray',
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                        fontSize: '7px',
                      }}
                      speed={20}
                      pause={4000}
                    />
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
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={{
                          WebkitAppearance: 'none',
                          appearance: 'none',
                          width: '100%',
                          height: '3px',
                          background: `linear-gradient(to right, ${isMobile ? '#fff' : '#000'} ${volume * 100}%, ${isMobile ? '#444' : '#ddd'} ${volume * 100}%)`,
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
                  <Link href="/contact" className="nav-item" style={navLinkStyle}>
                    {translations.contact}
                  </Link>
                </div>
              </div>

              {/* Mobile Layout */}
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
                    <div 
                      onClick={() => setLanguage('en')}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image 
                        src="/assets/us-flag.png" 
                        alt="US Flag" 
                        width={20} 
                        height={13} 
                        className="object-contain"
                      />
                    </div>
                    <div 
                      onClick={() => setLanguage('fr')}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image 
                        src="/assets/france-flag.png" 
                        alt="France Flag" 
                        width={20} 
                        height={13} 
                        className="object-contain"
                      />
                    </div>
                    <div 
                      onClick={() => setLanguage('ru')}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image 
                        src="/assets/russia-flag.png" 
                        alt="Russia Flag" 
                        width={20} 
                        height={13} 
                        className="object-contain"
                      />
                    </div>
                    <div 
                      onClick={() => setLanguage('ko')}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image 
                        src="/assets/korea-flag.png" 
                        alt="Korea Flag" 
                        width={20} 
                        height={13} 
                        className="object-contain"
                      />
                    </div>
                    <div 
                      onClick={() => setLanguage('zh')}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image 
                        src="/assets/china-flag.png" 
                        alt="China Flag" 
                        width={20} 
                        height={13} 
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col items-start mobile-nav w-full">
                  <Link href="/artworks" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                    {translations.artworks}
                  </Link>
                  <Link href="/photography" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                    {translations.photography}
                  </Link>
                  <Link href="/music" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                    {translations.music}
                  </Link>
                  <Link href="/contact" className="nav-item py-0.5" style={{ ...navLinkStyle, color: 'white', textAlign: 'left' }}>
                    {translations.contact}
                  </Link>
                </div>

                {/* Mobile Music Player */}
                <div className="flex flex-row items-center mt-1 mb-1 w-full" style={{ maxWidth: '100%', gap: '8px' }}>
                  {/* Album Cover */}
                  <div style={{
                    width: '22px',
                    height: '22px',
                    backgroundColor: '#ADD8E6',
                    backgroundImage: shuffledTracks[currentTrackIndex]?.cover ? `url(${shuffledTracks[currentTrackIndex].cover})` : 'none',
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
                    <MarqueeText
                      text={shuffledTracks[currentTrackIndex]?.title || 'Loading...'}
                      style={{
                        fontSize: '8px',
                        fontWeight: 600,
                        color: 'white',
                        letterSpacing: '0.01em',
                        textAlign: 'left',
                        maxWidth: '90px',
                      }}
                      speed={20}
                      pause={4000}
                    />
                    <MarqueeText
                      text={shuffledTracks[currentTrackIndex] ? `${shuffledTracks[currentTrackIndex].artist} — ${shuffledTracks[currentTrackIndex].album}` : 'Loading...'}
                      style={{
                        fontSize: '7px',
                        color: '#cccccc',
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                        textAlign: 'left',
                        maxWidth: '90px',
                      }}
                      speed={20}
                      pause={4000}
                    />
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
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={{
                          WebkitAppearance: 'none',
                          appearance: 'none',
                          width: '100%',
                          height: '2px',
                          background: `linear-gradient(to right, #fff ${volume * 100}%, #444 ${volume * 100}%)`,
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

                {/* Manual adjustment for very small screens */}
                <style>{`
                  @media (max-width: 330px) {
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
        </div>
      </main>
    </>
  );
}