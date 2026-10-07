# Quiz

En simpel trin-for-trin quiz: vælg sværhedsgrad → rebus/spørgsmål (evt. med lydklip) → vinderside.
Ren HTML/CSS/JS, intet build-trin — klar til GitHub Pages.

## Redigér quizzen

Alt indhold ligger i **`quiz-config.js`**. Læg billeder og lydfiler i `media/`.

### Sværhedsgrader

`levels` indeholder de tre sværhedsgrader (Nem 2, Middel 5, Svær 10 spørgsmål).
Hver har sin egen liste `steps` — antallet af spørgsmål på knappen tælles automatisk.
En sværhedsgrad kan have sin egen `winner`, som lægges oven på den fælles vinderside;
Svær bruger det til en ekstrapræmie (`extra`).

### "Jeg er for gammel til sjov"

`lazy` styrer linket på forsiden, der springer quizzen over og viser en gimmick-"præmie"
(`media/gimmick.svg`, en animeret pakke). Skift `image` til en GIF, hvis du hellere vil det.

| Trin-type | Bruges til |
|-----------|-----------|
| `rebus`   | Emojis/tekst (`rebus`) og/eller billede (`image`) + indtastet svar (`answers`) |
| `text`    | Spørgsmål med indtastet svar (`answers`) |
| `choice`  | Spørgsmål med svarmuligheder (`options` + `correct`, hvor 0 = første) |

Alle trin kan have `image`, `audio`, `youtube` og `hint`.

`youtube` er et almindeligt YouTube-link (`youtube.com/watch?v=…`, `youtu.be/…`, `shorts/…`),
som vises som en indlejret video. Tilføj `t=` til linket (fx `?t=90` eller `&t=1m30s`)
for at starte videoen et bestemt sted. YouTube-videoer afspilles kun, når siden ligger
online (fx på GitHub Pages) — ikke når `index.html` åbnes direkte fra disken.
Vindersiden (`winner`) kan have tekst, billede, et link-knap, egen HTML og en ekstrapræmie (`extra`).

## Prøv lokalt

Åbn `index.html` i browseren — det virker direkte fra disken.

## Udgiv på GitHub Pages (gratis)

1. Opret et nyt repository på GitHub og push filerne:
   ```sh
   git init && git add . && git commit -m "Quiz"
   git branch -M main
   git remote add origin https://github.com/<bruger>/<repo>.git
   git push -u origin main
   ```
2. På GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`** → Save.
3. Efter et minut ligger quizzen på `https://<bruger>.github.io/<repo>/`.

> **NB:** Det er en statisk side, så svarene og præmien kan ses i kildekoden af
> den, der kigger efter. Fint til en sjov quiz — men brug den ikke til noget,
> der skal være hemmeligt for alvor.
