# Magasépítés II. (GS-5-17) – tanulókártyák

Szega Books GS-5-17 / Bársony István tankönyvsorozat II. kötete alapján készült,
2025–26-os szabályokkal frissítve.

> Nem a könyv másolata, hanem saját szavakkal írt vizsgaösszefoglaló.

## Tanulóweboldal (`web/`) – offline

Interaktív tanulótárs ugyanehhez az anyaghoz: leckék, kártyák ismétléses
ütemezéssel (SM-2), minivizsgák, vizsgaszimuláció, gyenge pontok gyakorlása,
statisztika. 16 lecke, 92 kártya, 91 kérdés. Nincs szerver, nincs internet,
nincs regisztráció – a haladás a böngésződben tárolódik.

Megnyitás internet nélkül:

- **Telefonon:** fájlkezelőben keresd meg a `web/index.html` fájlt, és nyisd
  meg böngészővel (Chrome). Ezután a címsor ⋮ menüjében
  „Hozzáadás a kezdőképernyőhöz” – így ikonként is indítható, offline.
- **Gépen:** kattints duplán a `web/index.html`-re, vagy ugyanabban
  a mappában futtasd: `python3 -m http.server 8000`, majd nyisd meg
  a `http://localhost:8000` címet.
- **Tárhely:** ha másik gépre/telefonra költözöl, a Beállítások oldalon
  az „Export letöltése” menti a haladásodat, amit ugyanott vissza is
  tölthetsz.

## Tartalom (`anyag/`)

- `00-szabalyozas/` – TÉKA (OTÉK helyett), ÉKM energetika (TNM helyett), Eurocode-ok
- `01-valaszfalak/` – falazott / monolit / szerelt válaszfalak
- `02-athidalas-boltov-koszoru/` – áthidalók / boltövek / koszorúk
- `03-fodemek-boltozatok/` – gerendás / monolit + előregyártott / történeti boltozatok
- `04-lepcsok-lejtok/` – lépcsők / lejtők-rámpák / korlátok
- `05-ho-paratechnika/` – hőfizika / 2026-os követelmények / csomópontok

Mindegyik mappában `README.md` van vizsgakérdés-szerű pontokkal.

## Források

- Szega Books: GS-5-17 Magasépítés II. (katalógusleírás)
- SZE Épületszerkezettan jegyzet – válaszfalak
- Wienerberger Porotherm alkalmazási útmutatók (A-10 neo, A-12, M-25, Thermo, U-zsalu)
- Xella Ytong PSF áthidaló beépítési útmutató
- E-gerenda gyártói és forgalmazói leírások (Railone, Dalos Tüzép)
- OTÉK 65–68. § (lépcső/lejtő) + TÉKA 280/2024
- 9/2023. (V.25.) ÉKM energetika, FaGa.hu 2026-os összefoglaló
- építésijog.hu – TÉKA-átmenetek 2025–26
