/* Magasépítés II. – tananyag adatbázis, II. rész (03–05. fejezet) */
window.MAG_B = {
chapters: [
  { id: "ch03", n: "03", title: "Födémek, boltozatok", sections: ["s03a", "s03b", "s03c", "s03d", "s03e", "s03f"] },
  { id: "ch04", n: "04", title: "Lépcsők", sections: ["s04a", "s04c"] },
  { id: "ch05", n: "05", title: "Hő- és páratechnikai szerkezetalakítások", sections: ["s05a", "s05b", "s05c"] }
],
sections: {
"s03a": {
  title: "E-gerendás + béléstestes födém",
  body: [
    "A családi házak jellemző födéme évtizedek óta vizsga-kedvenc. Elemei az E-jelű feszített vasbeton gerendák 2,40–6,60 m között, 60 cm-es méretlépcsőben, valamint az EB 60/19, EB 60/24 és EB 30/19 jelű kitöltő béléstestek. A gerendák 60 cm-es, sűrítve 30 cm-es tengelykiosztással, kéttámaszú tartóként építhetők be.",
    ["Felfekvés 4,80 m falközig 10-10 cm, e felett 12-12 cm a két tartófalon.", "A 4,80 m-nél hosszabb gerendákat építés alatt gyámolítani (alátámasztani) kell.", "A födém teljes teherbírását csak a gerendák és béléstestek közötti hézagok kibetonozása és a koszorú után éri el.", "5,40 m fesztáv felett átlagos lakótehernél is gerenda-kettőzés kell: két gerenda kerül egymás mellé, csak utána jön a béléstest.", "Előregyártott gerendánál 5,40 m fesztáv felett kötelező a statikai kiviteli terv.", "Felbetonnal és anélkül más a teherbírás, a gyártói táblázat mindkettőt megadja.", "A gerendák mellé, a koszorúba nyúló sávba pótvasakat kell tenni, a gerendák kiálló hosszvasai bekötnek a koszorúba.", "Ha a födémre válaszfal kerül, azt a méretezésnél figyelembe kell venni."],
    "Tipikus hibák: a gyámolítás lehagyása (lehajlás, repedés), a kettőzés lehagyása (elégtelen teherbírás), a koszorúba való bekötés hiánya (nincs együttdolgozás), valamint átnedvesedett vagy fagyos béléstest beépítése.",
    "A Porotherm födém kerámiaköpenyes előfeszített gerendából (250–725 cm, 25 cm-es lépcsőben, szabad falköz 225–700 cm, 16 kg/fm), kerámia béléstestből (45/10, 45/17, 60/10, 60/17, azaz 45/57/60/72 cm tengelytávra) és C20/25-ös helyszíni felbetonból áll, kiegészítő vasalással. Felfekvése legalább 120 mm, tűzállósága vakoltan REI 120 (A1). Beépítési menete: gerendák elhelyezése, béléstestek berakása, pótvasak és háló elhelyezése, majd bordák, felbeton és koszorú kibetonozása egy ütemben. Rokon vázkerámia rendszerek a FERT (lágyvasalású, 3,0–6,6 m) és a PPB (feszített). Megjegyzés: az ismétlőlistán szereplő SG rövidítés a gyártói katalógusokból nem azonosítható, kérdezd meg az oktatót!"
  ],
  simple: "Az E-gerendás födém olyan, mint a Lego: gerenda, közte béléstest, tetejére beton. Három számot jegyezz meg: 4,80 (felette gyámolítás), 5,40 (felette kettőzés + statikus terv), 10/12 (felfekvés). A beton (kibetonozás + koszorú) nélkül a szerkezet még nem tart.",
  keys: ["Gerenda: E-jelű feszített, 2,40–6,60 m", "Béléstest: EB 60/19, 60/24, 30/19", "Tengelytáv: 60 cm (sűrítve 30 cm)", "Felfekvés: 10-10 cm 4,80 m-ig, 12-12 cm felette", "4,80 m felett gyámolítás építés alatt", "5,40 m felett kettőzés + kiviteli terv", "Teherbírás csak kibetonozás + koszorú után", "Porotherm gerenda: 250–725 cm, felfekvés ≥ 120 mm, REI 120", "Porotherm menete: gerenda → béléstest → vasalás → betonozás egy ütemben"],
  cards: [
    { q: "Milyen hosszú E-gerendák készülnek?", a: "2,40–6,60 m között, 60 cm-es lépcsőben.", kind: "fact" },
    { q: "Melyek az E-gerendához való béléstestek?", a: "EB 60/19, EB 60/24 és EB 30/19.", kind: "term" },
    { q: "Mennyi a minimális felfekvés?", a: "4,80 m falközig 10-10 cm, e felett 12-12 cm.", kind: "fact" },
    { q: "Mikor kell gyámolítani?", a: "A 4,80 m-nél hosszabb gerendákat építés alatt.", kind: "qa" },
    { q: "Mi a gerenda-kettőzés, és mikor kell?", a: "Két gerenda egymás mellett; 5,40 m fesztáv felett átlagos lakótehernél is.", kind: "concept" },
    { q: "Mikor kötelező statikai kiviteli terv?", a: "Előregyártott gerendánál 5,40 m fesztáv felett.", kind: "fact" },
    { q: "Miből áll a Porotherm födém?", a: "Kerámiaköpenyes gerendából, kerámia béléstestből és C20/25 felbetonból, vasalással.", kind: "qa" },
    { q: "Mi a Porotherm födém beépítési menete?", a: "Gerendák, béléstestek, vasalás, majd bordák + felbeton + koszorú egy ütemben.", kind: "qa" }
  ],
  quiz: [
    { t: "mc", q: "Milyen tengelykiosztással építhetők az E-gerendák?", opts: ["Csak 60 cm", "60 cm, sűrítve 30 cm", "Csak 30 cm", "100 cm"], ans: 1, exp: "Alapból 60 cm, sűrítve 30 cm a tengelytáv.", ref: "Elemek" },
    { t: "tf", q: "A födém a gerendák elhelyezése után azonnal teljes teherbírású.", ans: false, exp: "Csak a hézagok kibetonozása és a koszorú után éri el.", ref: "Beépítés" },
    { t: "fill", q: "5,40 m fesztáv felett ___ kell alkalmazni.", ans: ["gerenda-kettőzés", "gerendakettőzés", "kettőzés"], exp: "Két gerenda kerül egymás mellé a béléstest előtt.", ref: "Beépítés" },
    { t: "mc", q: "Mennyi a felfekvés 5 m-es falköznél?", opts: ["10-10 cm", "12-12 cm", "20-20 cm", "5-5 cm"], ans: 1, exp: "4,80 m felett 12-12 cm kell.", ref: "Beépítés" },
    { t: "tf", q: "A födémre kerülő válaszfalat a méretezésnél figyelembe kell venni.", ans: true, exp: "Többletterhelés, nem hagyható figyelmen kívül.", ref: "Beépítés" },
    { t: "mc", q: "Melyik NEM tipikus E-gerendás hiba?", opts: ["Gyámolítás lehagyása", "Kettőzés lehagyása", "Koszorúba bekötés hiánya", "Túl sok pótvas"], ans: 3, exp: "A pótvas éppen hogy kell a gerendák mellé.", ref: "Hibák" },
    { t: "mc", q: "Mekkora a Porotherm födémgerenda hossztartománya?", opts: ["2,40–6,60 m", "250–725 cm", "1,20–9,20 m", "3,50–23,50 m"], ans: 1, exp: "250–725 cm 25 cm-es lépcsőben (szabad falköz 225–700 cm). Az 1,20–9,20 az LMF, a 3,50–23,50 a LÜF palló.", ref: "Porotherm födém" },
    { t: "tf", q: "A Porotherm födém felfekvése legalább 120 mm.", ans: true, exp: "A rendszer előírása: ≥ 120 mm.", ref: "Porotherm födém" }
  ]
},
"s03b": {
  title: "Monolit és előregyártott vb födémek",
  body: [
    "A monolit vasbeton lemez 12–20 cm vastag, egy- vagy kétirányú teherhordású, pontszerű támaszoknál gombafödémként készül. Előnye, hogy bármilyen alaprajz lefedhető vele, nagy a teherbírása, jó az akusztikája és a hőtárolása, ami a KNE szerinti nehéz épületminősítéshez is segít. Hátránya a zsaluzás, az állványozás és a technológiai várakozási idő. Mai változata az aktív betonfödém: fűtő-hűtő csövek (például REHAU panelek) kerülnek a vasalat alá, felületközeli kialakítással; az aktív zónában függesztett zárt álmennyezet nem megengedett.",
    "Az előregyártottak közül a Ferrobeton-féle extrudált üreges födémpanel 16–50 cm magassággal, hosszú fesztávra jó; létezik Porotherm- és Ytong-födémpalló rendszer, Filigrán fél-előregyártott rendszer vékony kéregpanelből és helyszíni felbetonból, valamint acél trapézlemez bennmaradó zsaluzatként felbetonnal, irodákhoz és ipari épületekhez. Követelmények minden födémre: teherbírás EC2 szerint, lehajláskorlát, REI tűzállóság, lépéshang-szigetelés úsztatott padlóval, valamint légzárás.",
    "A pórusbeton (Ytong) födémpalló könnyű, jó hőszigetelésű, méretre gyártott elem, amelyet daruval raknak egymás mellé, majd kibetonozott hézagokkal és koszorúval dolgoztatnak együtt. Fesztávja és teherbírása a gyártói táblázatból veendő, beépítése a gyártó alkalmazástechnikája szerint történik."
  ],
  simple: "Monolit vagy előregyártott? A monolit bármit kibír és jól tárolja a hőt, de lassú. Az előregyártott gyors, de kötött a mérete. Újdonság, hogy a födémbe fűtőcsövet is tesznek – akkor viszont ne takard el álmennyezettel.",
  keys: ["Monolit lemez: 12–20 cm, egy/kétirányú, gomba", "Előny: alaprajzi szabadság, hőtárolás (nehéz épület)", "Hátrány: zsaluzás, állvány, technológiai idő", "Aktív födém: cső a vasalat alatt, álmennyezet tilos felette", "Előregyártott: üreges panel 16–50 cm, palló, Filigrán, trapézlemez", "Ytong födémpalló: könnyű, daruzott, gyártói táblázatból méretezve", "Követelmény: EC2, lehajlás, REI, lépéshang, légzárás"],
  cards: [
    { q: "Milyen vastag a monolit vb lemez?", a: "12–20 cm.", kind: "fact" },
    { q: "Mi a gombafödém?", a: "Pontszerű támaszokra készülő, kétirányú monolit lemez.", kind: "concept" },
    { q: "Mi az aktív betonfödém?", a: "Fűtő-hűtő csövekkel szerelt monolit födém a vasalat alatt.", kind: "term" },
    { q: "Mi tilos az aktív zóna alatt?", a: "Függesztett zárt álmennyezet.", kind: "qa" },
    { q: "Mi a Filigrán rendszer?", a: "Vékony kéregpanel + helyszíni felbeton, fél-előregyártott födém.", kind: "term" },
    { q: "Hogyan készül a lépéshang-szigetelés?", a: "Úsztatott padlóval.", kind: "qa" },
    { q: "Mit kell tudni az Ytong födémpallóról?", a: "Könnyű, méretre gyártott, daruval rakják, gyártói táblázatból méretezik.", kind: "qa" }
  ],
  quiz: [
    { t: "mc", q: "Melyik a monolit födém előnye?", opts: ["Olcsó zsaluzás", "Bármilyen alaprajz + jó hőtárolás", "Nincs technológiai idő", "Daruzás nélkül építhető"], ans: 1, exp: "Szabad forma és nagy hőtároló tömeg a fő előny.", ref: "Monolit vb lemez" },
    { t: "tf", q: "Az aktív födém fölé az aktív zónában álmennyezet tehető.", ans: false, exp: "Zárt álmennyezet nem megengedett az aktív zónában.", ref: "Aktív betonfödém" },
    { t: "fill", q: "Az extrudált üreges födémpanel ___ cm magassággal készül.", ans: ["16–50", "16-50"], exp: "16–50 cm közötti magassággal gyártják.", ref: "Előregyártott" },
    { t: "mc", q: "Melyik fél-előregyártott rendszer?", opts: ["Gombafödém", "Filigrán", "Csehsüveg", "Donga"], ans: 1, exp: "Filigrán: kéregpanel + helyszíni felbeton.", ref: "Előregyártott" },
    { t: "tf", q: "A monolit födém segíti a nehéz épületminősítést.", ans: true, exp: "Nagy hőtároló tömege miatt igen.", ref: "Monolit vb lemez" },
    { t: "tf", q: "Az Ytong födémpalló daru nélkül, kézzel is beépíthető.", ans: false, exp: "Daruval rakják, méretezés gyártói táblázatból.", ref: "Pórusbeton palló" }
  ]
},
"s03c": {
  title: "Boltozatok (történeti)",
  body: [
    "A boltozatok ma már csak meglévő, illetve műemlék épületeken fordulnak elő, de vizsgán vázlatot és nevet kérnek. A donga egy irányban íves, hosszan futó boltozat (födémként főleg pincefödémnek); a csehsüveg, más néven porosz süveg, acélgerendák közötti kis dongák sora; a keresztboltozat két donga áthatása, amely pillérekre terhel. Anyaguk tégla vagy kő, működésük nyomott ív vállnyomással. Felújításuk vállmerevítéssel, hézagkiöntéssel és acél vonóvassal történik. Szakkifejezések: vezérgörbe (a felületet származtató görbe), intradosz (belső felület), extradosz (külső felület), záradékvonal (az ív tetején futó vonal), fiokboltozat (zárt felület áttörése nyíláshoz)."
  ],
  simple: "Három nevet jegyezz meg: donga (hosszú alagútív), csehsüveg (gerendák közti kis ívek), keresztboltozat (két ív találkozása). Mind téglából van, mind nyom, és a szélét fogni kell.",
  keys: ["Donga: egy irányban íves, hosszan futó (pincefödém)", "Csehsüveg (porosz süveg): acélgerendák közti dongák", "Keresztboltozat: két donga áthatása, pillérre terhel", "Anyag: tégla/kő; működés: nyomott ív + vállnyomás", "Felújítás: vállmerevítés, hézagkiöntés, vonóvas", "Vezérgörbe, intradosz, extradosz, záradékvonal, fiokboltozat"],
  cards: [
    { q: "Mi a donga?", a: "Egy irányban íves, hosszan futó boltozat.", kind: "term" },
    { q: "Mi a csehsüveg?", a: "Acélgerendák közötti kis dongák sora (porosz süveg).", kind: "term" },
    { q: "Mi a keresztboltozat?", a: "Két donga áthatása, pillérekre terhel.", kind: "term" },
    { q: "Hogyan működik a boltozat?", a: "Nyomott ívként, vállnyomással.", kind: "concept" },
    { q: "Mivel újítják fel a boltozatot?", a: "Vállmerevítéssel, hézagkiöntéssel, acél vonóvassal.", kind: "qa" },
    { q: "Mi az intradosz és az extradosz?", a: "A boltozat belső (alsó), illetve külső (felső) felülete.", kind: "term" }
  ],
  quiz: [
    { t: "mc", q: "Melyik boltozat terhel pillérekre?", opts: ["Donga", "Csehsüveg", "Keresztboltozat", "Porosz süveg"], ans: 2, exp: "A keresztboltozat két donga áthatása, a sarkokon pillérrel.", ref: "Típusok" },
    { t: "tf", q: "A csehsüveg acélgerendák közötti dongákból áll.", ans: true, exp: "Ezért hívják porosz süvegnek is.", ref: "Típusok" },
    { t: "fill", q: "A boltozat ___ ívként működik.", ans: ["nyomott"], exp: "Nyomott ív vállnyomással.", ref: "Működés" },
    { t: "mc", q: "Mivel történik a boltozat felújítása?", opts: ["Bontással", "Vállmerevítéssel és vonóvassal", "Vakolással", "Festéssel"], ans: 1, exp: "Vállmerevítés, hézagkiöntés, acél vonóvas.", ref: "Felújítás" },
    { t: "tf", q: "Új építésben ma is boltozatot tervezünk.", ans: false, exp: "Csak meglévő, műemlék épületeken fordul elő.", ref: "Bevezető" }
  ]
},
"s03d": {
  title: "Hagyományos fa födémek",
  body: [
    "Ma új szerkezetként már ritkán készül fa födém, de felújításnál és vizsgán részletesen kell. Két alaphelyzet van: a gerendafödémnél a tartók egymás mellett zárt sorban fekszenek, a gerendás födémnél a távolabb lévő gerendák között kitöltő vagy átfedő elemek vannak. A csapos gerendafödém sűrűn egymás mellé helyezett bárdolt vagy fűrészelt gerendákból áll, együttdolgozásukat mintegy 2,0 m-ként beépített keményfa csapok biztosítják; a gerendavégek alátétdeszka közbeiktatásával támaszkodnak a főfalakra, a padló és a gerendák között homokfeltöltés van, az alsó síkra pedig nádszövet közbeiktatásával kerül a mennyezetvakolat.",
    "A gerendás fafödémek változatai: a szalmapólyásnál lécekre vagy vájatokba sárba áztatott szalmacsöves karók kerülnek, sártapasztással és agyagréteggel (jó hőszigetelésű, házilagos); a pórfödém alulról látható gyalult gerendákból és deszkázatból áll, feltöltéssel és agyagtapasztással; a pallófödém karcsú magas pallókból készül sűrű kiosztással, kifordulás elleni kitámasztással; a borított gerendásnál 60–100 cm-ként álló négyszög gerendákra alul-felül deszkaborítás kerül, felül feltöltéssel és padozattal (béléses változatban a gerendák közé süllyesztett bélésdeszkára, kisebb szerkezeti magassággal); a mestergerendás 7–8 m-es helyiségekre való, 5–6 m-ként fektetett mestergerendákkal és merőleges fiókgerendákkal."
  ],
  simple: "A fa födémek logikája: gerenda + kitöltés + vakolat. A neveket a kitöltés adja: csap (csapos), szalma (pólyás), deszka (pór), palló (palló), borítás (borított). A béléses trükk: ha a deszkát a gerendák közé süllyeszted, laposabb lesz a födém.",
  keys: ["Gerendafödém: zárt sor; gerendás: távol + kitöltő", "Csapos: ~2 m-ként keményfa csap, alátétdeszka, homok, nádszövet + vakolat", "Szalmapólyás: szalmacsöves karók + sár + agyag", "Pórfödém: látható gyalult gerenda + deszkázat", "Borított: 60–100 cm gerenda + alul-felül deszka", "Béléses: kisebb magasság; vakgerendás: burkolat deszkákra", "Mestergerendás: 7–8 m-re, 5–6 m-ként + fiókgerendák"],
  cards: [
    { q: "Mi tartja össze a csapos gerendafödémet?", a: "Mintegy 2 m-ként beépített keményfa csapok.", kind: "qa" },
    { q: "Mi kerül a gerendavégek alá?", a: "Alátétdeszka.", kind: "fact" },
    { q: "Miből áll a szalmapólyás födém?", a: "Sárba áztatott szalmacsöves karókból, sártapasztással és agyagréteggel.", kind: "qa" },
    { q: "Mi a pórfödém?", a: "Alulról látható gyalult gerendák + deszkázat, feltöltéssel.", kind: "term" },
    { q: "Mi a béléses borított födém előnye?", a: "Kisebb szerkezeti magasság (a feltöltés a gerendák között van).", kind: "concept" },
    { q: "Mire való a mestergerendás födém?", a: "7–8 m széles helyiségekre, fiókgerendákkal fa-megtakarítással.", kind: "qa" }
  ],
  quiz: [
    { t: "mc", q: "Milyen gyakran vannak a csapok a csapos födémben?", opts: ["50 cm-ként", "Kb. 2 m-ként", "60 cm-ként", "5 m-ként"], ans: 1, exp: "Mintegy 2,0 m-ként építik be a keményfa csapokat.", ref: "Csapos gerendafödém" },
    { t: "tf", q: "A borított gerendás gerendatávolsága 60–100 cm.", ans: true, exp: "Négyszög gerendák 60–100 cm-re egymástól.", ref: "Borított gerendás" },
    { t: "fill", q: "A mennyezetvakolat ___ közbeiktatásával készül a fa födémen.", ans: ["nádszövet"], exp: "Nádszövet tartja a vakolatot a fán.", ref: "Csapos gerendafödém" },
    { t: "mc", q: "Melyik födémnek jó a hőszigetelése?", opts: ["Pórfödém", "Szalmapólyás", "Vakgerendás", "Acélgerendás"], ans: 1, exp: "A szalma-sár-agyag réteg jól szigetel.", ref: "Szalmapólyás" },
    { t: "tf", q: "Mestergerendás födémmel 7–8 m is áthidalható.", ans: true, exp: "Mestergerendák 5–6 m-ként + fiókgerendák.", ref: "Mestergerendás" }
  ]
},
"s03e": {
  title: "Koporsófödém és félmonolit rendszerek",
  body: [
    "Gyártási technológia szerint a födém monolit (helyszínen készített), félmonolit (részben helyszínen készített), előregyártott vagy szerelt jellegű lehet. A félmonolit az előregyártott és a monolit előnyeit ötvözi: az elemek könnyűek, emelőgép nélkül rakhatók, a végleges teherbírást a helyszíni kibetonozás (borda, felbeton, koszorú) adja. A koporsófödém ferde vasbeton födémlemez tetőtér-beépítésnél: a tető ferde síkjai alkotta koporsó maga a teherhordó födém, előregyártott változata is létezik a tetőtérhez. Zsaluzási szabályai: 30° alatt kontrazsalu nélkül építhető, 30–45° között 50 cm-kénti Streckmetall-betét és sűrűbb beton kell (statikussal egyeztetve), 45° felett a kontrazsalu kötelező, a két héjat ankerekkel kötik át; betonozáskor először a vízszintes középrészt kell bebetonozni. A szigetelés a külső oldalra kerül, így a nagy hőtárolású lemez jó nyári hőcsillapítást ad.",
    "A Leier Mesterfödém (LMF) félmonolit rendszer: rácsos LMF gerenda (csak az alsó öv betonozott: 4,5 cm, C25/30; rácsmagasság 15 vagy 19 cm; szélesség 11,0 vagy 12,5 cm; hossz 1,20–9,20 m 20 cm-es lépcsőben) és Leier EB 60/19 béléstest (450/250/190 mm, 19 kg), a bordákat és a 4–11 cm felbetont a koszorúval egy ütemben betonozva. Fektetés M10 habarcságyba (min. 1 cm), feltámaszkodás 680 cm-ig 10 cm, 700 cm-től 15 cm; csak Leier EB 60/19 használható hozzá. Kinyúló LMF gerendákkal erkély és loggia is képezhető. Rokon vázkerámia rendszerek a FERT (lágyvasalású, 3,0–6,6 m) és a PPB (feszített)."
  ],
  simple: "Félmonolit = könnyű elemek + helyszíni beton: kézzel rakod, a beton adja az erőt. A koporsófödém a tetőtér ferde betonfödémje. Az LMF-nél három számot jegyezz meg: 4,5 cm alsó beton, 4–11 cm felbeton, 10/15 cm felfekvés.",
  keys: ["Félmonolit: részben helyszínen készülő", "Koporsó: ferde vb lemez tetőtérben", "Zsalu: 30° alatt sima, 30–45° Streckmetall, 45° felett kontrazsalu", "Betonozás: vízszintes középrész először", "Szigetelés kívülre → jó nyári hőcsillapítás", "LMF: 1,20–9,20 m, alsó beton 4,5 cm C25/30", "Felbeton 4–11 cm + koszorú egy ütemben", "Felfekvés 10 cm (680-ig) / 15 cm (700-tól)", "Csak Leier EB 60/19; erkély/loggia kinyúlással"],
  cards: [
    { q: "Mit jelent a félmonolit?", a: "Részben helyszínen készülő födémet: könnyű elemek + helyszíni beton.", kind: "concept" },
    { q: "Mi a koporsófödém?", a: "Ferde vasbeton födémlemez tetőtér-beépítésnél.", kind: "term" },
    { q: "Mikor kötelező a kontrazsalu koporsónál?", a: "45° hajlás felett.", kind: "fact" },
    { q: "Mit kell először bebetonozni a koporsónál?", a: "A vízszintes középrészt.", kind: "qa" },
    { q: "Mekkora az LMF hossztartománya?", a: "1,20–9,20 m, 20 cm-es lépcsőben.", kind: "fact" },
    { q: "Milyen béléstest kell az LMF-hez?", a: "Csak a Leier EB 60/19.", kind: "fact" }
  ],
  quiz: [
    { t: "mc", q: "Mi a koporsófödém?", opts: ["Fa födém", "Ferde vasbeton födém tetőtérben", "Boltozat", "Üvegtető"], ans: 1, exp: "A tető ferde síkjai alkotta koporsó a teherhordó födém.", ref: "Koporsófödém" },
    { t: "tf", q: "45° felett kontrazsalu nélkül is zsaluzható a koporsó.", ans: false, exp: "45° felett a kontrazsalu elengedhetetlen.", ref: "Zsaluzási szabályok" },
    { t: "fill", q: "Az LMF alsó betonozott részének magassága ___ .", ans: ["4,5 cm", "4,5"], exp: "Egységesen 4,5 cm, C25/30.", ref: "LMF" },
    { t: "mc", q: "Mennyi az LMF felfekvése 700 cm-től?", opts: ["10 cm", "12 cm", "15 cm", "20 cm"], ans: 2, exp: "700 cm elemhossztól minimum 15 cm.", ref: "LMF" },
    { t: "tf", q: "Az LMF-fel erkély és loggia is képezhető.", ans: true, exp: "Kinyúló gerendákkal és megfelelő vasalással igen.", ref: "LMF" },
    { t: "mc", q: "Milyen vastag az LMF felbetonja?", opts: ["1–2 cm", "4–11 cm", "15–25 cm", "30 cm"], ans: 1, exp: "4–11 cm, a koszorúval egy ütemben.", ref: "LMF" }
  ]
},
"s03f": {
  title: "Erkély, függőfolyosó, loggia, párkány",
  body: [
    "Az erkély (balkon) a homlokzati síkból kinyúló, legalább félig nyitott tartózkodótér, közvetlenül a szobából megközelíthető. Szerkezetileg konzolos lemez: hőhídmegszakító elemmel, vagy kinyúló gerendákkal (például LMF-fel) és megfelelő vasalással készül, a koszorúval együttdolgoztatva. A függőfolyosó (gang) a bérházak udvari oldalán futó nyitott folyosó; történeti kialakítása acélgerendás, poroszsüveg-boltozatos vagy vasbeton lemezes, felújításnál a korrózióvédelem és a vízelvezetés a kritikus pont. A loggia három oldalról fallal, alul-felül födémmel körülvett külső tér, amely nem nyúlik ki a homlokzatból, ezért időjárásvédettebb. A franciaerkély nem tartózkodó, hanem a fal síkjában lévő korlátos nyílászáró. Hasznos alapterületbe csak a fedett és legalább 1,9 m belmagasságú külső tartózkodó számít be.",
    "A párkány vízszintes homlokzati tagoló- és védőelem. Fajtái a főpárkány (koronázó, az épületet lezáró), az övpárkány (szinteket elválasztó), a könyöklőpárkány (ablak alatt) és a szemöldökpárkány (ablak felett). Készülhet téglasorok kiültetésével (például fogsoros mintával), vasbetonból vagy kőből. Szerepe kettős: tagolja a homlokzatot, és a kiülő profil (cseppentő) levezeti a vizet a falról."
  ],
  simple: "Erkély kinyúlik, loggia bent van a tömegben, franciaerkély csak ablak korláttal. A gang a bérház udvari folyosója. A párkány a homlokzat vízszintes dísz- és védősávja, ami az esővizet is levezeti.",
  keys: ["Erkély: kinyúló konzolos lemez (hőhídmegszakító / LMF-kinyúlás)", "Függőfolyosó: bérházak udvari folyosója (acél + poroszsüveg / vb)", "Loggia: 3 oldal fal, nem nyúlik ki, védettebb", "Franciaerkély: csak korlátos ablak, nem tartózkodó", "Beszámítás: fedett + min. 1,9 m (loggia igen)", "Párkány: fő, öv, könyöklő, szemöldök", "Készítés: tégla kiültetés / vb / kő; szerep: tagolás + cseppentés"],
  cards: [
    { q: "Mi az erkély szerkezetileg?", a: "Kinyúló konzolos lemez.", kind: "concept" },
    { q: "Mi a függőfolyosó?", a: "Bérházak udvari oldalán futó nyitott folyosó.", kind: "term" },
    { q: "Miben különbözik a loggia az erkélytől?", a: "Három oldalról fal veszi körül, nem nyúlik ki a homlokzatból.", kind: "qa" },
    { q: "Mi a franciaerkély?", a: "Korlátos nyílászáró a fal síkjában, nem tartózkodó.", kind: "term" },
    { q: "Melyik párkány zárja le az épületet?", a: "A főpárkány (koronázó).", kind: "qa" },
    { q: "Mi a párkány két szerepe?", a: "Homlokzattagolás és vízelvezetés (cseppentés).", kind: "qa" }
  ],
  quiz: [
    { t: "mc", q: "Melyik nyúlik ki a homlokzatból?", opts: ["Loggia", "Erkély", "Franciaerkély", "Függőfolyosó"], ans: 1, exp: "Az erkély kinyúló konzolos tér.", ref: "Erkély" },
    { t: "tf", q: "A franciaerkélyre ki lehet lépni.", ans: false, exp: "Nem tartózkodó, csak korlátos ablak.", ref: "Franciaerkély" },
    { t: "fill", q: "Beszámításhoz a külső tartózkodó belmagassága legalább ___ .", ans: ["1,9 m", "1,9"], exp: "Fedett + legalább 1,9 m kell.", ref: "Alapterület" },
    { t: "mc", q: "Melyik párkány választja el a szinteket?", opts: ["Főpárkány", "Övpárkány", "Könyöklőpárkány", "Szemöldökpárkány"], ans: 1, exp: "Az övpárkány fut végig a szintek között.", ref: "Párkányfajták" },
    { t: "tf", q: "A gang felújításnál a korrózióvédelem kritikus.", ans: true, exp: "Történeti acélszerkezet + vízelvezetési gondok.", ref: "Függőfolyosó" }
  ]
},
"s04a": {
  title: "Lépcsők",
  body: [
    "Formái: egykarú, kétkarú pihenővel, háromkarú, húzott fokú, csiga- és lebegőlépcső. Szerkezete új építésben leggyakrabban monolit vasbeton, emellett előregyártott vasbeton, acél vagy fa (tetőtérhez, üzemi célra).",
    "A méretezést be kell magolni: a fokméreteket a 2m + sz = 60–64 cm összefüggéssel kell meghatározni a járóvonalon mérve, és egy lépcsőkaron belül csak azonos fokméret lehet. A fokmagasság általános esetben legfeljebb 17 cm; közhasználatú építmény akadálymentes lépcsőjénél legfeljebb 15 cm, a kar egyenes vonalú, és legfeljebb 1,8 m szintkülönbséget hidalhat át. Lakáson vagy üdülőegységen belül, tetőtérre vagy üzemi berendezéshez legfeljebb 20 cm lehet. Az egyenes kar közbenső pihenője a járóvonalon mérve legalább 0,60 m. A fejmagasság a fokélekre illesztett érintőtől függőlegesen mérve legalább 2,0–2,2 m. Az akadálymentes fok homloklapos és orr nélküli, az első és az utolsó fokot jelölni kell. Közhasználatú építményben a lépcső mellett legalább egy helyen akadálymentes útvonalról is gondoskodni kell."
  ],
  simple: "Egy képlet az egész: kétszer a magasság plusz a szélesség 60 és 64 között legyen, különben botladozol. Akadálymentesnél alacsonyabb (15 cm) és egyenes legyen a kar. Példa: 17-es fellépőhöz 30-as belépő illik, mert 2×17+30=64.",
  keys: ["Képlet: 2m + sz = 60–64 cm (járóvonalon)", "Egy karon belül csak azonos fok!", "m ≤ 17 cm általános; ≤ 15 cm akadálymentes; ≤ 20 cm lakás/tetőtér", "Akadálymentes kar: egyenes, max. 1,8 m szint", "Pihenő egyenes karnál: min. 0,60 m", "Fejmagasság: min. ~2,0–2,2 m", "Akadálymentes fok: homloklapos, orr nélküli, jelölt szélső fokok"],
  cards: [
    { q: "Mi a lépcsőképlet?", a: "2m + sz = 60–64 cm, a járóvonalon mérve.", kind: "fact" },
    { q: "Lehet-e egy karon belül eltérő fokméret?", a: "Nem, csak azonos lépcsőfok-méret lehet.", kind: "qa" },
    { q: "Mennyi a fokmagasság határa általános esetben?", a: "Legfeljebb 17 cm.", kind: "fact" },
    { q: "Mennyi akadálymentes lépcsőnél?", a: "Legfeljebb 15 cm, egyenes karral, karonként max. 1,8 m szint.", kind: "fact" },
    { q: "Mennyi lakáson belül, tetőtérre?", a: "Legfeljebb 20 cm.", kind: "fact" },
    { q: "Milyen az akadálymentes fok?", a: "Homloklapos, orr nélküli, az első és utolsó fok jelölve.", kind: "qa" }
  ],
  quiz: [
    { t: "mc", q: "Melyik fokpár felel meg a képletnek?", opts: ["m=17, sz=25", "m=17, sz=30", "m=20, sz=30", "m=15, sz=20"], ans: 1, exp: "2×17+30=64, a 60–64-es sávban van.", ref: "Méretezés" },
    { t: "tf", q: "Egy karon belül lehet eltérő fokméret a tetőtérre vezető karon.", a: 0, exp: "Kivétel nincs: egy karon belül csak azonos méret lehet.", ref: "Méretezés", ans: false },
    { t: "fill", q: "A közbenső pihenő egyenes karnál legalább ___ hosszú.", ans: ["0,60 m", "0,6 m", "60 cm"], exp: "A járóvonalon mérve 0,60 m a minimum.", ref: "Méretezés" },
    { t: "mc", q: "Mekkora szintet hidalhat át az akadálymentes kar?", opts: ["3 m-t", "1,8 m-t", "5 m-t", "Korlátlanul"], ans: 1, exp: "Legfeljebb 1,8 m szintkülönbség karonként.", ref: "Akadálymentes" },
    { t: "tf", q: "Közhasználatú építményben elég csak lépcsőt építeni.", ans: false, exp: "Legalább egy helyen akadálymentes útvonal is kell.", ref: "Akadálymentes" },
    { t: "mc", q: "Mekkora a fejmagasság minimuma?", opts: ["1,5 m", "2,0–2,2 m", "2,5 m", "1,8 m"], ans: 1, exp: "A fokélekre illesztett érintőtől mérve 2,0–2,2 m.", ref: "Méretezés" },
    { t: "short", q: "Írd le a lépcsőképletet, és számold ki: m = 16 esetén mennyi az ideális sz?", keywords: ["60", "64", "28", "32"], model: "2m + sz = 60–64 cm, tehát 2×16 + sz = 60–64, azaz sz = 28–32 cm (gyakorlatban 30 cm).", exp: "A képlet a járás ritmusát követi.", ref: "Méretezés" }
  ]
},
"s04c": {
  title: "Korlátok, mellvédek, felületek",
  body: [
    "A lépcső járófelületét csúszásgátló módon kell kialakítani. A korlát, illetve mellvéd magassága a szintkülönbségtől függ: általánosan mintegy 95–100 cm, nagy esésnél 110 cm, a pontos értéket a terv és a TÉKA adja. Akadálymentes közlekedésnél kétoldali kapaszkodó kell, gyermekkorlát külön magasságban. A pálcák kiosztásánál arra kell ügyelni, hogy a gyermekfej ne szorulhasson be. Kültérben fagyálló kialakítás és vízelvezetett lábazat szükséges."
  ],
  simple: "A korlát akkor jó, ha nem csúszol meg, nem esel át rajta, és a gyerek feje sem akad be. Kint bírnia kell a fagyot és a vizet.",
  keys: ["Járófelület: csúszásgátló mindenhol", "Magasság: ~95–100 cm, nagy esésnél 110 cm", "Akadálymentes: kétoldali kapaszkodó", "Gyermekkorlát külön magasságban", "Pálcaosztás: gyermekfej be nem szorulhat", "Kültér: fagyálló + vízelvezetett lábazat"],
  cards: [
    { q: "Milyen a lépcső járófelülete?", a: "Csúszásgátló.", kind: "fact" },
    { q: "Mekkora az általános korlátmagasság?", a: "Mintegy 95–100 cm, nagy esésnél 110 cm.", kind: "fact" },
    { q: "Mi kell akadálymentes közlekedésnél?", a: "Kétoldali kapaszkodó.", kind: "qa" },
    { q: "Mire kell ügyelni a pálcaosztásnál?", a: "Hogy a gyermekfej ne szorulhasson be.", kind: "qa" },
    { q: "Mi kell a kültéri korláthoz?", a: "Fagyálló kialakítás és vízelvezetett lábazat.", kind: "qa" }
  ],
  quiz: [
    { t: "mc", q: "Milyen legyen a járófelület?", opts: ["Fényes márvány", "Csúszásgátló", "Szőnyeg", "Jég"], ans: 1, exp: "Csúszásgátló kialakítás kötelező.", ref: "Felületek" },
    { t: "tf", q: "Nagy esésnél 110 cm-es korlát kell.", ans: true, exp: "Általános 95–100 cm, nagy esésnél 110 cm.", ref: "Magasság" },
    { t: "fill", q: "Akadálymentesnél ___ kapaszkodó kell.", ans: ["kétoldali"], exp: "Mindkét oldalon kapaszkodó szükséges.", ref: "Akadálymentes" },
    { t: "mc", q: "Miért fontos a pálcaosztás?", opts: ["Szép legyen", "A gyermekfej be ne szorulhasson", "Olcsó legyen", "Könnyű legyen"], ans: 1, exp: "Biztonsági méret a beszorulás ellen.", ref: "Hézagok" },
    { t: "tf", q: "Kültéri korlátnál elég a beltéri festés.", ans: false, exp: "Fagyálló kialakítás és vízelvezetett lábazat kell.", ref: "Kültér" }
  ]
},
"s05a": {
  title: "Hő- és párafizika alapok",
  body: [
    "A hővezetést a λ (lambda), a szerkezet ellenállását az R, az átbocsátást az U = 1/R érték írja le W/m2K-ben. A vonalmenti hőhidat a ψ (pszí), a pontszerűt (dűbel, konzol) a χ (khí) jellemzi. A páradiffúziót a μ ellenállási szám és az Sd egyenértékű légrétegvastagság írja le. A harmatpont az a hőmérséklet, ahol a pára kicsapódik: ez penészt, fagyást és korróziót okozhat. A felületi hőmérséklet-tényező (fRsi) legalább 0,7 kell legyen a penészvédelemhez. A nagy hőtároló tömegű, nehéz épület (az aktív rétegek tömege 400 kg/m2 felett) segíti a KNE teljesítését. A nyári hővédelem eszköze a külső árnyékolás, az üveg alacsony g-értéke és az átszellőztetés."
  ],
  simple: "Az U azt mondja meg, mennyi meleg szökik át a falon: minél kisebb, annál jobb. A hőhíd az a pont (sarkok, koszorú), ahol jobban szökik. A pára ott csapódik le, ahol hideg a felület: ezért kell a belső felületet melegen tartani (fRsi) és szellőztetni.",
  keys: ["U = 1/R, mértékegység W/m2K", "ψ vonalmenti, χ pontszerű hőhíd", "μ és Sd a páradiffúzióra", "Harmatpont = lecsapódás helye", "fRsi ≥ 0,7 penész ellen", "Nehéz épület: aktív tömeg > 400 kg/m2", "Nyári védelem: külső árnyék, g-érték, szellőzés"],
  cards: [
    { q: "Mit jelent az U-érték?", a: "A hőátbocsátást: U = 1/R, W/m2K-ben.", kind: "term" },
    { q: "Mi a különbség ψ és χ között?", a: "ψ a vonalmenti, χ a pontszerű hőhíd jele.", kind: "concept" },
    { q: "Mit ír le a μ és az Sd?", a: "A páradiffúziós ellenállást.", kind: "qa" },
    { q: "Mi a harmatpont?", a: "A hőmérséklet, ahol a pára kicsapódik.", kind: "term" },
    { q: "Mennyi az fRsi minimuma?", a: "Legalább 0,7 a penészvédelemhez.", kind: "fact" },
    { q: "Mikor nehéz az épület?", a: "Ha az aktív hőtároló rétegek tömege 400 kg/m2 felett van.", kind: "fact" }
  ],
  quiz: [
    { t: "mc", q: "Mi az U és R viszonya?", opts: ["U = R", "U = 1/R", "U = R²", "Nincs összefüggés"], ans: 1, exp: "Az átbocsátás az ellenállás reciproka.", ref: "Alapfogalmak" },
    { t: "tf", q: "A dűbel pontszerű hőhidat okoz.", ans: true, exp: "Jele χ (khí).", ref: "Alapfogalmak" },
    { t: "fill", q: "A penészvédelemhez fRsi legalább ___ .", ans: ["0,7"], exp: "0,7 alatti értéknél penészveszély van.", ref: "Penészvédelem" },
    { t: "mc", q: "Mi a nyári hővédelem eszköze?", opts: ["Belső sötétítő", "Külső árnyékolás", "Több fűtés", "Párazáró fólia"], ans: 1, exp: "A külső árnyékolás tartja kint a hőt.", ref: "Nyári védelem" },
    { t: "tf", q: "A nehéz épület segíti a KNE teljesítését.", ans: true, exp: "A hőtároló tömeg csökkenti a hőveszteség-tényezőt.", ref: "Hőtárolás" },
    { t: "mc", q: "Hol csapódik le a pára?", opts: ["A harmatponti hőmérsékleten", "Mindig 20 °C-on", "Csak 0 °C alatt", "Sehol"], ans: 0, exp: "A harmatpont az a hőmérséklet, ahol a pára kicsapódik.", ref: "Harmatpont" }
  ]
},
"s05b": {
  title: "Követelmények 2026 (9/2023 ÉKM)",
  body: [
    "Az értékek új épület használatbavételi engedélyéhez kellenek. A régi TNM U-értékei gyakorlatilag azonosak, de a KNE-szintek különböznek. ÉKM szerinti U-értékek W/m2K-ben: homlokzati fal 0,24; lapostető, fűtött tetőtér, padlásfödém és árkád feletti födém 0,17; alsó zárófödém fűtetlen tér felett 0,26; üvegezés 1,0, különleges üvegezés 1,2; fa vagy PVC ablak 0,5 m2 felett 1,1; fém ablak 1,4; üvegfal és függönyfal 1,4; üvegtető 1,5; felülvilágító 1,7; tetősík ablak 1,3; ipari és tűzgátló ajtó 2,0; fűtött és fűtetlen tér közötti ajtó 1,4, kapu 1,8; fűtött és fűtetlen tér közötti fal 0,4; szomszédos fűtött épületek közötti fal 1,5; lábazati fal, új épületnél talajon fekvő padló és talajjal érintkező fal 0,30.",
    "A KNE ÉKM szerint: fajlagos hőveszteség-tényező, összesített energetikai jellemző lakóra legfeljebb 76 kWh/m2év, CO2 legfeljebb 20 kg/m2év, legalább A/A besorolás. Működő példa: Porotherm 30 tégla 15 cm EPS-sel, padlásfödém 30 cm gyapottal, padló 10 cm lépésálló szigeteléssel és 8 cm XPS lábazattal, háromrétegű üvegezésű nyílászárókkal. Részletes tábla és példaszámítás a faga.hu energetikai összefoglalójában található."
  ],
  simple: "Három számot jegyezz meg: fal 0,24, tető 0,17, ablak 1,1. Ha ezeket tudod, a táblázat nagyját tudod. A ház akkor mehet át, ha az éves fogyasztása 76 alatt van és A-s a papírja.",
  keys: ["Fal 0,24 / tető-födém 0,17 / fűtetlen felett 0,26", "Ablak fa/PVC 1,1; fém 1,4; tetősík 1,3", "Ajtó 1,4; kapu 1,8; ipari kapu 2,0", "Padló/lábazat/talajjal érintkező: 0,30", "KNE: Ep ≤ 76, CO2 ≤ 20, A/A", "Példa: P30 + 15 EPS, padlás 30, padló 10 + lábazat 8 XPS"],
  cards: [
    { q: "Mennyi a homlokzati fal U-határa?", a: "0,24 W/m2K.", kind: "fact" },
    { q: "Mennyi a lapostető és a padlásfödém U-határa?", a: "0,17 W/m2K.", kind: "fact" },
    { q: "Mennyi a fa/PVC ablak U-határa?", a: "1,1 W/m2K (0,5 m2 felett).", kind: "fact" },
    { q: "Mennyi a talajon fekvő padló U-határa új épületnél?", a: "0,30 W/m2K.", kind: "fact" },
    { q: "Mik a KNE számai ÉKM szerint?", a: "Ep ≤ 76 kWh/m2év, CO2 ≤ 20 kg/m2év, A/A.", kind: "fact" },
    { q: "Milyen rétegrend felel meg példaként?", a: "Porotherm 30 + 15 cm EPS, padlás 30 cm gyapot, padló 10 cm + lábazat 8 cm XPS, háromrétegű ablak.", kind: "qa" }
  ],
  quiz: [
    { t: "mc", q: "Mennyi a homlokzati fal U-határa?", opts: ["0,17", "0,24", "0,30", "1,1"], ans: 1, exp: "0,24 W/m2K a homlokzati falra.", ref: "U-értékek" },
    { t: "tf", q: "A padlásfödém határa 0,17.", ans: true, exp: "Padlás, lapostető, fűtött tetőtér: 0,17.", ref: "U-értékek" },
    { t: "fill", q: "A tetősík ablak U-határa ___ .", ans: ["1,3", "1,25"], exp: "ÉKM szerint 1,3 W/m2K.", ref: "U-értékek" },
    { t: "mc", q: "Mennyi az Ep határa lakóra KNE-nél?", opts: ["100", "76", "75", "60"], ans: 1, exp: "ÉKM szerint legfeljebb 76 kWh/m2év.", ref: "KNE" },
    { t: "tf", q: "A fűtött-fűtetlen közötti fal határa 0,26.", ans: false, exp: "ÉKM szerint 0,4 (a TNM-ben volt 0,26).", ref: "U-értékek" },
    { t: "mc", q: "Mekkora EPS kell a példában a P30-as falra?", opts: ["8 cm", "12 cm", "15 cm", "30 cm"], ans: 2, exp: "A működő példában 15 cm EPS szerepel.", ref: "Példa rétegrend" },
    { t: "match", q: "Párosítsd a szerkezetet az U-határértékével!", pairs: [["Homlokzati fal", "0,24"], ["Lapostető", "0,17"], ["Fa/PVC ablak", "1,1"], ["Talajon fekvő padló", "0,30"]], exp: "0,24 – 0,17 – 1,1 – 0,30.", ref: "U-értékek" }
  ]
},
"s05c": {
  title: "Csomópontok, hőhidak, rétegrend",
  body: [
    "Tipikus hőhidak, amelyeket vizsgán rajzolni kell: az áthidaló és a koszorú síkja (Thermo áthidalóval vagy a külső szigetelés folytonosságával kezelve), az erkélylemez átvezetése (hőhídmegszakító elemmel vagy külön szerkezettel), a lábazat és a talajcsatlakozás (XPS-sel és vízszigeteléssel), az ablakbeépítés (a tok a szigetelés síkjában, légzáró szalaggal), továbbá a padlásfeljáró és a gépészeti áttörések.",
    "A rétegrend szabálya: belül légzárás és párafékezés fóliával, átlapolással és ragasztással; kívül páraáteresztő, szélzáró és csapadékvédő réteg. A szigetelés legyen folytonos és hézagmentes, átfedéssel vagy két rétegben eltolva fektetve. Lapostetőnél a sorrend: lejtésképzés, párazáró réteg, hőszigetelés, vízszigetelés. A penészvédelem eszközei: megfelelő fRsi, hővisszanyerős szellőzés, a bútorok mögötti átszellőzés, hőhídmentes sarok és ablakkáva-szigetelés."
  ],
  simple: "A hőszigetelés olyan, mint a télikabát: csak akkor véd, ha nincs rajta rés, és a cipzár (légzárás) is be van húzva. A koszorú, az erkély és az ablak környéke a tipikus luk – ezeket külön kell kezelni.",
  keys: ["Hőhidak: áthidaló, koszorú, erkély, lábazat, ablak, áttörés", "Erkély: hőhídmegszakító vagy külön szerkezet", "Belül: légzárás + párafékezés", "Kívül: páraáteresztő + szélzáró + csapadékvédelem", "Szigetelés: folytonos, átfedve / eltolva", "Lapostető: lejtés, párazáró, hőszig, vízszig", "Penész: fRsi, szellőzés, káva-szigetelés"],
  cards: [
    { q: "Sorolj fel három tipikus hőhidat!", a: "Áthidaló/koszorú síkja, erkélylemez, lábazat (elfogadható: ablak, áttörés).", kind: "qa" },
    { q: "Hogyan kezelhető az erkély hőhídja?", a: "Hőhídmegszakító elemmel vagy külön szerkezettel.", kind: "qa" },
    { q: "Mi kerül a rétegrend belső oldalára?", a: "Légzárás és párafékezés.", kind: "qa" },
    { q: "Mi kerül a külső oldalra?", a: "Páraáteresztő, szélzáró, csapadékvédő réteg.", kind: "qa" },
    { q: "Mi a lapostető rétegrendje fentről lefelé fordítva, alulról?", a: "Lejtésképzés, párazáró réteg, hőszigetelés, vízszigetelés.", kind: "qa" }
  ],
  quiz: [
    { t: "mc", q: "Melyik tipikus hőhíd?", opts: ["Belső válaszfal", "Koszorú síkja", "Parketta", "Festés"], ans: 1, exp: "A koszorú átvezeti a hőt, ha nincs leszigetelve.", ref: "Hőhidak" },
    { t: "tf", q: "Az erkélylemez átvezetése hőhídmegszakítóval kezelhető.", ans: true, exp: "Vagy külön, dilatált szerkezettel.", ref: "Hőhidak" },
    { t: "fill", q: "Belül ___ és párafékezés kell.", ans: ["légzárás"], exp: "A belső oldal lég- és párazáró.", ref: "Rétegrend" },
    { t: "mc", q: "Mi a lapostető helyes sorrendje alulról?", opts: ["Vízszig, hőszig, párazáró, lejtés", "Lejtés, párazáró, hőszig, vízszig", "Hőszig, vízszig, lejtés, párazáró", "Párazáró, lejtés, vízszig, hőszig"], ans: 1, exp: "Lejtésképzés, párazáró réteg, hőszigetelés, vízszigetelés.", ref: "Rétegrend" },
    { t: "tf", q: "A szigetelést elég egy rétegben, hézagokkal fektetni.", ans: false, exp: "Folytonosan, átfedéssel vagy két rétegben eltolva kell.", ref: "Rétegrend" }
  ]
}
}
};
