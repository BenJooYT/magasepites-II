/* Magasépítés II. – tananyag adatbázis, I. rész (00–02. fejezet) */
window.MAG_A = {
chapters: [
  { id: "ch00", n: "00", title: "Szabályozási háttér 2025–26", sections: ["s00"] },
  { id: "ch01", n: "01", title: "Függőleges nem teherhordó szerkezetek", sections: ["s01a", "s01b", "s01c"] },
  { id: "ch02", n: "02", title: "Nyílásáthidalások, boltövek, koszorúk", sections: ["s02a", "s02b", "s02c"] }
],
sections: {
"s00": {
  title: "Szabályozási háttér 2025–26",
  body: [
    "Két nagy rendszercsere történt az elmúlt években. Az országos építési követelményeket ma a TÉKA tartalmazza: a 280/2024. (IX. 30.) Korm. rendelet 2025. július 1-től alkalmazandó. A régi helyi szabályzatok még az OTÉK-re (253/1997.) épülnek, az újak már TÉKA-alapúak, ezért 2025-ben mindkét típus született. A 284/2025. (VIII. 25.) és későbbi módosító rendeletek pontosítják az átmeneteket, például a 136. §-ban.",
    "Az energetikában a 7/2006. (V. 24.) TNM rendeletet a 9/2023. (V. 25.) ÉKM rendelet váltotta fel, amelyet a 2023. október 31. után beadott engedélyekre kell alkalmazni. Az új épület akkor közel nulla energiaigényű (KNE), ha teljesíti az 1. mellékletet (U-értékek, nyári hővédelem, épülettechnika) és a 2. mellékletet (fajlagos hőveszteség, összesített energetikai jellemző lakóépületre legfeljebb 76 kWh/m2év, CO2 legfeljebb 20 kg/m2év, mindegyikre legalább A besorolás). A régi TNM szerint a KNE a BB besorolást, legfeljebb 100 kWh/m2év fogyasztást és legalább 25% megújuló részarányt jelentett.",
    ["A vasbeton szerkezeteket az EC2 (MSZ EN 1992-1-1), a falazott szerkezeteket az EC6 (MSZ EN 1996) szerint kell méretezni.", "Az előregyártott áthidalókra az MSZ EN 845-2, a gerendás-béléstestes födémrendszerekre az MSZ EN 15037 vonatkozik.", "A tűzállóság jele REI teherhordó, EI térelhatároló szerkezetekre, az akusztikai méretezés alapja az MSZ EN ISO 12354."]
  ],
  simple: "Két cserét jegyezz meg: OTÉK helyett TÉKA, TNM helyett ÉKM. A képletek és a számok (lépcsőképlet, U-értékek) nem változtak, csak a keretrendszer és a közel nulla határértékei. Méretezni mindig Eurocode szerint kell: betonra EC2, falazatra EC6.",
  keys: ["TÉKA: 280/2024., alkalmazandó 2025. 07. 01-től", "OTÉK: 253/1997., régi HÉSZ-ek alapja", "ÉKM: 9/2023., 2023. 10. 31. utáni engedélyekre", "KNE (ÉKM, lakó): Ep ≤ 76, CO2 ≤ 20, min. A/A", "KNE (régi TNM): BB, Ep ≤ 100, min. 25% megújuló", "EC2 = vasbeton, EC6 = falazat"],
  cards: [
    { q: "Melyik rendelet a TÉKA, és mikortól alkalmazandó?", a: "280/2024. (IX. 30.) Korm. rendelet, 2025. július 1-től.", kind: "term" },
    { q: "Melyik rendeletet váltotta fel a TÉKA?", a: "Az OTÉK-et, a 253/1997. (XII. 20.) Korm. rendeletet.", kind: "qa" },
    { q: "Mettől kell az ÉKM energetikai rendeletet alkalmazni?", a: "2023. november 1-től, a 2023. október 31. után beadott engedélyekre.", kind: "date" },
    { q: "Mik az ÉKM szerinti KNE feltételei lakóépületre?", a: "Ep legfeljebb 76 kWh/m2év, CO2 legfeljebb 20 kg/m2év, legalább A/A besorolás.", kind: "fact" },
    { q: "Mik voltak a TNM szerinti KNE feltételei?", a: "BB besorolás, Ep legfeljebb 100 kWh/m2év, legalább 25% megújuló részarány.", kind: "qa" },
    { q: "Melyik Eurocode vonatkozik a vasbetonra, és melyik a falazatra?", a: "Vasbetonra az EC2 (MSZ EN 1992-1-1), falazatra az EC6 (MSZ EN 1996).", kind: "concept" }
  ],
  quiz: [
    { t: "mc", q: "Mikortól alkalmazandó a TÉKA?", opts: ["2024. január 1-től", "2025. július 1-től", "2023. november 1-től", "2026. január 1-től"], ans: 1, exp: "A 280/2024. rendelet 2025. július 1-től alkalmazandó.", ref: "TÉKA váltja az OTÉK-et" },
    { t: "tf", q: "Az ÉKM rendeletet a 2023. október 31. után beadott engedélyekre kell alkalmazni.", ans: true, exp: "Így szól az átmeneti szabály: a határnap 2023. október 31.", ref: "Energetika: TNM helyett ÉKM" },
    { t: "mc", q: "Mennyi lakóépületre az összesített energetikai jellemző határértéke ÉKM szerinti KNE esetén?", opts: ["100 kWh/m2év", "76 kWh/m2év", "75 kWh/m2év", "120 kWh/m2év"], ans: 1, exp: "ÉKM szerint legfeljebb 76 kWh/m2év, a TNM 100-as határával szemben.", ref: "Energetika: TNM helyett ÉKM" },
    { t: "fill", q: "A falazott szerkezetek méretezése ___ szerint történik.", ans: ["EC6", "Eurocode 6", "MSZ EN 1996"], exp: "Falazatra az EC6 (MSZ EN 1996) vonatkozik.", ref: "Eurocode-ok" },
    { t: "mc", q: "Mire vonatkozik az MSZ EN 845-2?", opts: ["Gerendás födémrendszerekre", "Előregyártott áthidalókra", "Akusztikai méretezésre", "Tűzállósági vizsgálatra"], ans: 1, exp: "Az EN 845-2 az előregyártott (falazó-) áthidalók szabványa.", ref: "Eurocode-ok" },
    { t: "tf", q: "A TNM szerint megújuló nélkül is elérhető volt a BB, ha az Ep 75 kWh/m2év alatt maradt.", ans: true, exp: "A 25% megújuló kiváltható volt 75 alatti fajlagos fogyasztással.", ref: "Energetika: TNM helyett ÉKM" },
    { t: "match", q: "Párosítsd a rendeletet a számával!", pairs: [["TÉKA", "280/2024"], ["OTÉK", "253/1997"], ["ÉKM", "9/2023"], ["TNM", "7/2006"]], exp: "TÉKA 280/2024, OTÉK 253/1997, ÉKM 9/2023, TNM 7/2006.", ref: "Szabályozás" },
    { t: "short", q: "Mennyi lakóépületre az Ep és a CO2 határértéke ÉKM szerinti KNE esetén?", keywords: ["76", "20"], model: "Ep legfeljebb 76 kWh/m2év, CO2 legfeljebb 20 kg/m2év.", exp: "Mindkét számot tudni kell a KNE-hez.", ref: "Energetika: TNM helyett ÉKM" }
  ]
},
"s01a": {
  title: "Falazott válaszfalak",
  body: [
    "A falazott válaszfal hagyományos kőműves munkával, kézi falazóelemek habarcshézagba rakásával készül. Anyaga lehet tömör kisméretű égetett agyag- vagy mészhomok tégla, kevés- vagy soklyukú magasított tégla, égetett üreges kerámia válaszfallap, gázszilikát vagy könnyűbeton válaszfallap, gipsz, illetve gipszperlit kézi elem, továbbá közép- vagy kettős falú üvegtégla.",
    "A legelterjedtebb a 6 vagy 10 cm vastag égetett kerámia válaszfallap. Szilárdság és merevség szempontjából elfogadható, jól véshető, könnyen szegezhető, kis súlya miatt a födémen bárhol elhelyezhető. Ha vízellátási vagy egyéb gépészeti hornyot kell belevésni, a 10 cm vastag változatot kell választani. A vékony fal állékonyságát fokozni kell: minden második vízszintes fugában lágyvas huzal fut, amely a főfalba tüskékkel befogott, függőleges helyzetű köracél szelvényhez kapcsolódik.",
    ["A főfalhoz tüskés, illetve huzalos bekötés tartozik, a födémnél rugalmas hézaggal.", "A padlóhoz és a mennyezethez takarószegéllyel, illetve rugalmas kitöltéssel csatlakozik a hangátvitel csökkentésére.", "Az ajtótok körül merevítés és áthidaló szükséges."]
  ],
  simple: "A válaszfal nem tart semmit, csak elválaszt, ezért lehet vékony és könnyű. A vékonyság ára, hogy hozzá kell kötni a főfalhoz huzallal és tüskével, különben kiborul. Ha csövet vésel bele, a vastagabb, 10 cm-es lapot kérd.",
  keys: ["Vastagság: 6 vagy 10 cm kerámia válaszfallap", "Gépészeti horonyhoz 10 cm kell", "Merevítés minden 2. fugában: lágyvas huzal", "Huzalok főfali tüskés függőleges köracélhoz kötnek", "Födémnél rugalmas hézag, padlónál takarószegély", "Üvegtégla: közép- vagy kettős falú"],
  cards: [
    { q: "Milyen vastag a kerámia válaszfallap?", a: "6 vagy 10 cm.", kind: "fact" },
    { q: "Mikor kell a 10 cm-es változat?", a: "Ha vízellátási vagy egyéb gépészeti hornyot vésnek bele.", kind: "qa" },
    { q: "Hogyan merevítik a falazott válaszfalat?", a: "Minden második vízszintes fugában vezetett lágyvas huzallal.", kind: "qa" },
    { q: "Mihez kapcsolódnak a merevítő huzalok?", a: "A főfalba tüskékkel befogott, függőleges helyzetű köracél szelvényhez.", kind: "qa" },
    { q: "Milyen az üvegtégla fala?", a: "Középfalú vagy kettős falú.", kind: "term" },
    { q: "Miért kell rugalmas hézag a födémnél?", a: "Hogy a födém lehajlása ne repessze meg a falat, és csökkenjen a hangátvitel.", kind: "concept" }
  ],
  quiz: [
    { t: "mc", q: "Melyik a legelterjedtebb hagyományos falazott válaszfal?", opts: ["Tömör kisméretű téglafal", "Égetett kerámia válaszfallap", "Gipszperlit blokk", "Üvegtéglafal"], ans: 1, exp: "A kerámia válaszfallap a legelterjedtebb: könnyű, véshető, szegezhető.", ref: "Legelterjedtebb típus" },
    { t: "tf", q: "Gépészeti horony vésése esetén elég a 6 cm-es válaszfallap.", ans: false, exp: "Horony esetén a 10 cm-es változatot kell alkalmazni.", ref: "Legelterjedtebb típus" },
    { t: "fill", q: "A merevítő lágyvas huzalokat minden ___ vízszintes fugában kell vezetni.", ans: ["második", "2."], exp: "Minden második fugában fut huzal.", ref: "Merevítés" },
    { t: "mc", q: "Mihez kapcsolódnak a huzalok a főfalnál?", opts: ["Dűbelhez", "Tüskékkel befogott függőleges köracélhoz", "Szerelőkerethez", "Vakolathálóhoz"], ans: 1, exp: "A huzalok a főfalba tüskézett függőleges köracélhoz kötnek.", ref: "Merevítés" },
    { t: "tf", q: "A kerámia válaszfallap kis súlya miatt a födémen bárhol elhelyezhető.", ans: true, exp: "Könnyű, ezért nem kell alatta külön alátámasztás.", ref: "Legelterjedtebb típus" }
  ]
},
"s01b": {
  title: "Monolit válaszfalak",
  body: [
    "A monolit válaszfalak helyszíni nedves technológiával készülnek, ezért ma már ritkák. A rabic válaszfal 5–10 cm vastag, egyoldali zsaluzatot igényel: a körítő falakba és a mennyezetbe rögzített 8 mm-es köracél keretre 40×40 cm lyukbőségű, 5,5 mm-es rácsháló kerül, erre erősítik a 25 mm lyukbőségű, 1,5 mm-es rabichálót, majd az egyik oldalról felcsapják az anyagot, és mindkét oldalt vakolják. A gipszrabic homok, mész, gipsz és enyv keveréke, vasbetétje a korrózió ellen horganyzott; a cementrabic homok, cement és salak keveréke, nem igényel horganyzást. Ma már csak íves vagy bonyolult torzfelületű falakhoz, illetve burkolatokhoz építik.",
    "A vasbeton válaszfal általában 6–15 cm vastag. Lépcsőházi falként, liftakna falaként, tűz- és betörésbiztos helyiségek falaként előnyös, a teherhordó szerkezetekbe acéltüskékkel kötik be. Hátránya a magas zsaluzatigény, a nedves technológia, a rossz hőtechnika, valamint hogy nehezen véshető és nem szegezhető. Betörésbiztonsági igény, például pénzintézet esetén kézenfekvő a választása."
  ],
  simple: "Monolit falat csak oda építs, ahol muszáj: tűz, liftakna, trezor. Mindenhol máshol macerás (zsaluzás, vizes technológia), rosszul szigetel, és szöget sem verhetsz bele. Íves falhoz még jó a rabic.",
  keys: ["Rabic: 5–10 cm, egyoldali zsaluzat, kétoldali vakolat", "Rács: Ø8 keret + 40×40-es Ø5,5 háló + rabicháló", "Gipszrabic: horganyzott betét kell", "Cementrabic: nem igényel horganyzást", "Vb válaszfal: 6–15 cm, liftakna, trezor, acéltüskés bekötés", "Hátrány: zsaluzat, hőtechnika, véshetőség hiánya"],
  cards: [
    { q: "Milyen vastag a rabic válaszfal?", a: "5–10 cm.", kind: "fact" },
    { q: "Miből áll a gipszrabic?", a: "Homok, mész, gipsz és enyv keveréke.", kind: "term" },
    { q: "Miért horganyzott a gipszrabic vasbetétje?", a: "A korrózió megakadályozására.", kind: "qa" },
    { q: "Mikor elég a cementrabic horganyzás nélkül?", a: "Mindig: a cementrabic nem igényel horganyzást.", kind: "qa" },
    { q: "Hova való vasbeton válaszfal?", a: "Lépcsőházba, liftaknába, tűz- és betörésbiztos helyiségbe.", kind: "qa" }
  ],
  quiz: [
    { t: "mc", q: "Mire használják ma a rabic válaszfalat?", opts: ["Tűzfalnak", "Íves vagy torzfelületű falakhoz", "Liftaknába", "Alapozáshoz"], ans: 1, exp: "Ma többnyire csak íves, bonyolult felületű falakhoz építik.", ref: "Rabic" },
    { t: "tf", q: "A vasbeton válaszfal jól véshető és szegezhető.", ans: false, exp: "Nehezen véshető és nem szegezhető, ez a fő hátránya.", ref: "Vasbeton" },
    { t: "fill", q: "A gipszrabic vasbetétjét ___ védelemmel kell ellátni.", ans: ["horganyzott", "horgany"], exp: "A gipsz korrozív, ezért horganyzott betét kell.", ref: "Rabic" },
    { t: "mc", q: "Milyen vastag a vasbeton válaszfal?", opts: ["3–5 cm", "6–15 cm", "20–30 cm", "1–2 cm"], ans: 1, exp: "Általában 6–15 cm vastagságban készül.", ref: "Vasbeton" },
    { t: "tf", q: "Pénzintézetbe kézenfekvő választás a vasbeton válaszfal.", ans: true, exp: "Betörésbiztonsági igény esetén ez a jó választás.", ref: "Vasbeton" }
  ]
},
"s01c": {
  title: "Szerelt, réteges válaszfalak",
  body: [
    "A szerelt válaszfal száraz technológiával, kis helyszíni élőmunkával épül, ezért irodákban és középületekben terjedt el. Három rendszere van: a vázas az építés helyszínén összeállított függőleges vagy vízszintes vázelemekre erősített burkolótáblákkal készül; a panelos (keretes) előregyártott, általában helyiségmagas panelek sorolásából áll; a vegyes a kettő kombinációja. Fokozott akusztikai igény esetén a burkolat két, egymástól függetlenített, gyakran eltolt vázoszlopra kerül, a légrésbe ásványgyapot paplan függeszthető.",
    "A vázelemek fából, acélból vagy extrudált alumíniumból, a burkolólapok gipszkartonból, farostlemezből, műanyag- vagy cementkötésű forgácslapból, acél-, alumínium- vagy műanyaglemez­ből, üvegtáblából, illetve eternitből készülnek, akusztikai betétként ásványgyapot paplan vagy lemez szolgál. A rögzítés a padlóra, illetve a mennyezetre erősített vezetőléchez történik, gyakori a feszítéses megoldás is. Panelos rendszernél a függőleges illesztéseknél gyakran a panel vastagságával azonos szélességű hézagot hagynak (szalagraszter), amelyet bepattintható takaróprofil zár le: ebben vezeték is elvihető, és később merőleges fal is csatlakoztatható. Súlyos berendezési tárgyat vázas falnál a vázszerkezetre, panelosnál a beépített szerelőkeretre vagy bordázatra kell erősíteni.",
    "Hazai példa volt a KÖZFAL típusú acélvázas gipszkarton fal, a PRE-M-ISOL fakeretes-gipsz bordás fal, emellett elterjedt a Gyproc, valamint a francia Sitraplast- és CLOISALL-féle aluprofilos rendszer. Rokon szerkezet a tároló és térelválasztó feladatot egyszerre ellátó szekrényfal, amely kitöltve jelentős hangszigetelésű is lehet, valamint a mennyezetig fel nem érő, tagolással stabilizált paravánfal."
  ],
  simple: "A szerelt fal olyan, mint a bútor: váz + lapok, csavarokkal, víz nélkül. Irodába ideális, mert gyorsan átrakható. A titka a réteg: két lap között gyapot adja a hangszigetelést, a nehéz szekrényt pedig a vázra, ne a gipszkartonra akaszd.",
  keys: ["3 rendszer: vázas, panelos, vegyes", "Váz: fa / acél / aluprofil; lap: gipszkarton stb.", "Hangra: dupla eltolt váz + ásványgyapot", "Szalagraszter + bepattintható takaróprofil", "Súlyos tárgy a vázra / szerelőkeretre", "Példák: KÖZFAL, PRE-M-ISOL, Gyproc", "Szekrényfal, paravánfal"],
  cards: [
    { q: "Melyik a szerelt válaszfal három rendszere?", a: "Vázas, panelos (keretes) és vegyes.", kind: "term" },
    { q: "Hogyan fokozható a szerelt fal hangszigetelése?", a: "Két függetlenített, eltolt vázzal és a légrésbe függesztett ásványgyapottal.", kind: "qa" },
    { q: "Mi a szalagraszter?", a: "A panel vastagságával azonos hézag a függőleges illesztéseknél, takaróprofillal lezárva.", kind: "concept" },
    { q: "Hova akasztható súlyos tárgy szerelt falra?", a: "Vázas falnál a vázszerkezetre, panelosnál a szerelőkeretre vagy bordázatra.", kind: "qa" },
    { q: "Nevezz meg két hazai szerelt falszisztémát!", a: "KÖZFAL és PRE-M-ISOL (elfogadható még: Gyproc).", kind: "fact" },
    { q: "Miben különbözik a paravánfal a válaszfaltól?", a: "Nem ér fel a mennyezetig, tagolással stabilizálják, csak vizuálisan határol.", kind: "concept" }
  ],
  quiz: [
    { t: "mc", q: "Melyik NEM szerelt válaszfal-rendszer?", opts: ["Vázas", "Panelos", "Vegyes", "Monolit"], ans: 3, exp: "A monolit nedves technológia, nem szerelt rendszer.", ref: "Rendszerek" },
    { t: "tf", q: "Fokozott akusztikai igény esetén a burkolat két függetlenített vázra kerül.", ans: true, exp: "Az eltolt dupla váz + gyapot adja a többlet hangszigetelést.", ref: "Rendszerek" },
    { t: "fill", q: "Az akusztikai betét anyaga ___ .", ans: ["ásványgyapot", "ásványgyapot paplan"], exp: "Ásványgyapot paplan vagy lemez kerül a légrésbe.", ref: "Anyagok" },
    { t: "mc", q: "Mire jó a szalagraszter hézaga?", opts: ["Szellőzésre", "Vezeték elhelyezésére és későbbi falcsatlakozásra", "Hőtágulásra", "Víz elvezetésére"], ans: 1, exp: "A takaróprofil mögött vezeték futhat, és merőleges fal csatlakozhat.", ref: "Rögzítés, részletek" },
    { t: "tf", q: "A szekrényfal kitöltve jelentős hangszigetelésű lehet.", ans: true, exp: "A kitöltött szekrényfal egy fix válaszfalat is kiválthat.", ref: "Rokon szerkezetek" }
  ]
},
"s02a": {
  title: "Áthidalók",
  body: [
    "Az előregyártott áthidaló a szerkezet alsó húzott öve, a felső nyomott övet a ráfalazás (kisméretű tömör tégla vagy falazóelem) vagy a rábetonozás adja. Enélkül az áthidalás nem nyeri el végleges teherbírását. Kivétel az egyszerű áthidaló, például a Porotherm M-25: ez helyszíni nyomott öv nélkül is tervezhető, azonnal terhelhető és korlátlanul darabolható.",
    "A mai kínálat: Porotherm A-10 neo 10 cm-es válaszfalakhoz (100×65 mm keresztmetszet, mintegy 12,7 kg/fm, 100–325 cm hossz 25 cm-es lépcsőben, A1 nem éghető); Porotherm A-12 12 cm széles áthidalásokhoz (14 kg/fm, kézzel emelhető); Porotherm Thermo beépített hőszigeteléssel; Porotherm M-25 25 cm elemmagas kerámia kéreggel és C40/50-es előfeszített betonnal, a legnagyobb teherbírású, felújításhoz is jó; Ytong PSF és Pve vasalt pórusbeton áthidalók korrózióvédett hálós vasalással, amelyek a ráfalazás megszilárdulásáig ideiglenes alátámasztást igényelnek; valamint a helyszíni zsaluzással készülő monolit vasbeton áthidaló bármilyen méretre.",
    ["Felfekvés: M-25-nél legalább 12-12 cm; Ytong PSF-nél legalább 20-20 cm, 1500 mm nyílásméret felett 25-25 cm.", "Az elemeket habarcságyba (Ytongnál vékonyágyazó vagy Hf25/Hf50 habarcsba) kell ültetni, vízszintesen beállítva.", "Ráfalazás előtt a port és a laza részeket el kell távolítani, és nedvesíteni kell a jó kapcsolatért.", "A nyomott öv magassága legalább egy sor (20 cm) az áthidaló felett, teljes hosszban.", "Hajlítási méretezésnél hasznos magasságként legfeljebb a falköz 5/12 része vehető figyelembe.", "Ha az áthidaló felett méretezett vasbeton koszorú vagy lemez van, csak a födém alatti terhekre kell ellenőrizni.", "Az alátámasztás csak a nyomott öv és a koszorú teljes megszilárdulása után bontható.", "Ökölszabály: 100 cm-es tokhoz 125-ös áthidaló kell, azaz oldalanként legalább 10 cm túlfedéssel, hosszabb áthidalónál többel."]
  ],
  simple: "Az áthidaló önmagában csak fél szerkezet: alul ő húz, felül a ráfalazott tégla vagy beton nyom. Ezért kell a minimális felfekvés és a szilárdulás megvárása. Ha ezt a két számot (húzott öv + nyomott öv) megérted, az összes beépítési szabály logikus lesz.",
  keys: ["Húzott öv = előregyártott elem; nyomott öv = ráfalazás/rábetonozás", "M-25: egyszerű áthidaló, azonnal terhelhető, darabolható", "A-10 neo: 10 cm falba, 100×65 mm, ~12,7 kg/fm", "Felfekvés: 12 / 20 / 25 cm (M-25 / PSF / 1500 mm felett)", "Nyomott öv: min. 1 sor (20 cm)", "Hasznos magasság ≤ falköz 5/12-e", "Alátámasztás csak szilárdulás után bontható"],
  cards: [
    { q: "Mi az áthidaló húzott és nyomott öve?", a: "Húzott öv az előregyártott elem, nyomott öv a ráfalazás vagy rábetonozás.", kind: "concept" },
    { q: "Melyik áthidaló nem igényel helyszíni nyomott övet?", a: "A Porotherm M-25 egyszerű áthidalóként.", kind: "qa" },
    { q: "Mennyi az M-25 minimális felfekvése?", a: "Oldalanként legalább 12 cm.", kind: "fact" },
    { q: "Mennyi az Ytong PSF minimális felfekvése?", a: "20-20 cm, 1500 mm nyílás felett 25-25 cm.", kind: "fact" },
    { q: "Mekkora a nyomott öv minimális magassága?", a: "Egy sor, azaz 20 cm az áthidaló felett, teljes hosszban.", kind: "fact" },
    { q: "Mekkora hasznos magasság vehető figyelembe méretezésnél?", a: "Legfeljebb a falköz 5/12 része.", kind: "fact" },
    { q: "Mikor bontható az alátámasztás?", a: "Csak a nyomott öv és a koszorú teljes megszilárdulása után.", kind: "qa" }
  ],
  quiz: [
    { t: "mc", q: "Mi kell a Porotherm áthidaló mellé a végleges teherbíráshoz?", opts: ["Semmi, önmagában elég", "Ráfalazás vagy rábetonozás mint felső nyomott öv", "Még egy áthidaló alája", "Csak vakolat"], ans: 1, exp: "Az elem az alsó húzott öv; a felső nyomott öv nélkül nincs végleges teherbírás (kivéve M-25 egyszerű áthidalóként).", ref: "Működés" },
    { t: "tf", q: "Az M-25 egyszerű áthidalóként azonnal terhelhető.", ans: true, exp: "Nem igényel helyszíni nyomott övet, ezért nem kell alátámasztani.", ref: "M-25" },
    { t: "mc", q: "Mennyi a minimális felfekvés Ytong PSF-nél 1500 mm felett?", opts: ["12-12 cm", "20-20 cm", "25-25 cm", "10-10 cm"], ans: 2, exp: "1500 mm nyílásméret felett 25-25 cm a minimum.", ref: "Beépítési szabályok" },
    { t: "fill", q: "Hajlítási méretezésnél a hasznos magasság legfeljebb a falköz ___ része.", ans: ["5/12"], exp: "Például 1 m falköznél legfeljebb 41 cm.", ref: "Beépítési szabályok" },
    { t: "tf", q: "Az alátámasztás a ráfalazás másnapján bontható.", ans: false, exp: "Csak a nyomott öv és a koszorú teljes megszilárdulása után.", ref: "Beépítési szabályok" },
    { t: "mc", q: "Mekkora áthidaló kell 100 cm-es tokhoz?", opts: ["100-as", "112-es", "125-ös", "150-es"], ans: 2, exp: "Oldalanként legalább 10 cm túlfedés kell, tehát 125-ös.", ref: "Beépítési szabályok" },
    { t: "match", q: "Párosítsd az áthidalót a minimális felfekvésével!", pairs: [["M-25", "12-12 cm"], ["Ytong PSF", "20-20 cm"], ["Ytong PSF 1500 mm felett", "25-25 cm"]], exp: "12, 20, illetve 25 cm oldalanként.", ref: "Beépítési szabályok" }
  ]
},
"s02b": {
  title: "Boltövek",
  body: [
    "A boltöv történeti tégla nyílásáthidalás: nyomott ívként működik, amely a terhet ferde támaszerőként adja át a vállakra. Húzott vasalása nincs, a falazat nyomásra dolgozik. Formái az egyenes (szegett), a szegmensíves és a félköríves. A vállat egész téglából kell képezni, megfelelő felfekvéssel és ellensúllyal (gyámfallal), mert a váll szétcsúszása a leggyakoribb hiba: ilyenkor a vállnál, illetve a koronán repedés jelenik meg. Ma új építésben már nem készül, helyette előregyártott vagy monolit áthidaló készül; vizsgán vázlatot és a „nyomott, vasalatlan szerkezet” meghatározást kérik."
  ],
  simple: "A boltöv egy téglából rakott ív az ablak felett: az ív összenyomódik és oldalra tolja a falat, ezért kell erős váll. Vas nincs benne. Ma már csak régi házakon látod, újat nem építünk.",
  keys: ["Működés: nyomott ív, vasalatlan", "Formák: egyenes, szegmensíves, félköríves", "Váll: egész tégla + ellensúly (gyámfal)", "Hiba: váll szétcsúszása → repedés vállnál/koronán", "Ma: helyette előregyártott/monolit áthidaló"],
  cards: [
    { q: "Hogyan működik a boltöv?", a: "Nyomott ívként, vasalás nélkül, a falazat nyomásra dolgozik.", kind: "concept" },
    { q: "Melyek a boltöv formái?", a: "Egyenes (szegett), szegmensíves, félköríves.", kind: "term" },
    { q: "Mi a boltöv leggyakoribb hibája?", a: "A váll szétcsúszása, repedéssel a vállnál vagy a koronán.", kind: "qa" },
    { q: "Miből készül a boltöv válla?", a: "Egész téglából, megfelelő felfekvéssel és ellensúllyal.", kind: "qa" },
    { q: "Készül-e ma új boltöv?", a: "Nem, helyette előregyártott vagy monolit áthidaló készül.", kind: "fact" }
  ],
  quiz: [
    { t: "mc", q: "Milyen erőjátékú a boltöv?", opts: ["Húzott", "Nyomott ív", "Hajlított", "Nyírt"], ans: 1, exp: "Nyomott ívként adja át a terhet a vállakra.", ref: "Működés" },
    { t: "tf", q: "A boltövben húzott vasalás dolgozik.", ans: false, exp: "Vasalatlan szerkezet, a falazat nyomásra dolgozik.", ref: "Működés" },
    { t: "fill", q: "A váll szétcsúszásakor repedés keletkezik a vállnál vagy a ___ .", ans: ["koronán", "korona"], exp: "A korona az ív záróköve körüli felső rész.", ref: "Hibák" },
    { t: "mc", q: "Melyik NEM boltövforma?", opts: ["Szegett", "Szegmensíves", "Félköríves", "Keresztboltozat"], ans: 3, exp: "A keresztboltozat födémtípus, nem nyílásáthidaló forma.", ref: "Formák" },
    { t: "tf", q: "Új építésben ma is boltövet kell tervezni.", ans: false, exp: "Ma előregyártott vagy monolit áthidaló készül helyette.", ref: "Ma" }
  ]
},
"s02c": {
  title: "Koszorúk",
  body: [
    "A koszorú minden teherhordó falon, födémsíkban végigfutó monolit vasbeton gyűrű (EC2). Feladata a terhek egyenletes elosztása, a födém és a fal együttdolgoztatása, valamint az épület merevítése szél- és földrengésteherre. A födémgerendák kiálló hosszvasai bekötnek a koszorú betonjába. Megfelelő magasság és anyagminőség esetén az áthidaló felett nyomott övként is figyelembe vehető.",
    "Kialakítása bennmaradó zsaluként például Porotherm 30 U zsaluelemmel történik (240×300×238 mm, h×sz×m, mintegy 7,5 kg), amely illeszkedik a falazati modulhoz. Vasalása tipikusan 4×Ø10–12 hosszvas kengyelekkel, de mindig a terv szerint. Minimális magassága mintegy 15–25 cm, végigfutó, a sarkokban átvezetett vasalással. Külső oldalára hőszigetelés kerül (Multipor, XPS vagy a homlokzati EPS folytonossága): ha ez lemarad, a koszorú lesz az épület leggyakoribb hőhídja."
  ],
  simple: "A koszorú egy betonabroncs a falak tetején: összefogja a házat, szétosztja a födém terhét, és belé kapaszkodnak a gerendák. Kívülről viszont szigetelni kell, különben itt szökik a meleg.",
  keys: ["Hol: minden teherhordó falon, födémsíkban", "Feladat: teherelosztás, együttdolgozás, merevítés", "U-zsalu: 240×300×238 mm, ~7,5 kg", "Vasalás: 4×Ø10–12 + kengyel (terv szerint)", "Magasság: min. ~15–25 cm, sarkokban átvezetve", "Kívül hőszigetelés kötelező (hőhíd!)"],
  cards: [
    { q: "Hol fut a koszorú?", a: "Minden teherhordó falon, födémsíkban, végigfutó gyűrűként.", kind: "qa" },
    { q: "Mi a koszorú három feladata?", a: "Teherelosztás, födém-fal együttdolgoztatás, merevítés.", kind: "concept" },
    { q: "Mekkora a Porotherm 30 U zsalu?", a: "240×300×238 mm, mintegy 7,5 kg.", kind: "fact" },
    { q: "Milyen a koszorú tipikus vasalása?", a: "4×Ø10–12 hosszvas kengyelekkel, mindig a terv szerint.", kind: "fact" },
    { q: "Miért kell a koszorút kívül szigetelni?", a: "Mert szigeteletlenül az épület leggyakoribb hőhídja.", kind: "qa" },
    { q: "Mikor számítható be a koszorú nyomott övként?", a: "Ha magassága és anyagminősége megfelelő az áthidaló felett.", kind: "qa" }
  ],
  quiz: [
    { t: "mc", q: "Mi a koszorú fő feladata?", opts: ["Hőszigetelés", "Terhek elosztása és az épület összefogása", "Vízszigetelés", "Burkolattartás"], ans: 1, exp: "Szétosztja a terheket és merevíti az épületet.", ref: "Feladata" },
    { t: "tf", q: "A gerendák hosszvasai bekötnek a koszorúba.", ans: true, exp: "A kiálló hosszvasak biztosítják az együttdolgozást.", ref: "Feladata" },
    { t: "fill", q: "A koszorú tipikus vasalása ___ hosszvas kengyelekkel.", ans: ["4", "négy", "4 db", "4 szál"], exp: "Tipikusan 4 szál Ø10–12 kengyelekkel, de a terv az irányadó.", ref: "Kialakítás" },
    { t: "mc", q: "Mekkora a Porotherm 30 U zsalu tömege?", opts: ["Kb. 2 kg", "Kb. 7,5 kg", "Kb. 14 kg", "Kb. 25 kg"], ans: 1, exp: "Mintegy 7,5 kg, kézzel rakható.", ref: "Kialakítás" },
    { t: "tf", q: "A koszorú szigeteletlenül is megfelel hőtechnikailag.", ans: false, exp: "Szigeteletlenül ez a leggyakoribb hőhíd.", ref: "Kialakítás" }
  ]
}
}
};
