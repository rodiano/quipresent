// =====================================================================
//  QUIZ-INDSTILLINGER — det er kun denne fil, du skal redigere.
//
//  All questions live in one shared list (questions), ordered from easy
//  to hard. Each difficulty level uses the first `count` questions from
//  that list (omitted = all). A level can also have its own winner page
//  (winner), which is layered on top of the shared winner page.
//
//  Trin-typer:
//    "rebus"  – vis emojis/tekst og/eller et billede, svar skrives ind
//    "text"   – almindeligt spørgsmål, svar skrives ind
//    "choice" – spørgsmål med svarmuligheder
//
//  Alle trin kan desuden have:
//    image: "media/billede.jpg"   – et billede
//    audio: "media/lydklip.m4a"   – et lydklip (mp3, m4a, wav, ogg)
//    video: "media/klip.mp4"      – a video clip (mp4, webm)
//    hint:  "..."                 – vises når man trykker "Vis hint"
//
//  Svar der skrives ind sammenlignes uden forskel på store/små bogstaver,
//  mellemrum og tegnsætning ("Æble træ!" = "æbletræ").
// =====================================================================

window.QUIZ = {
  title: "Den Store Quiz",
  intro: "Løs alle opgaverne for at finde præmien!",
  chooseLevel: "Vælg sværhedsgrad:",

  // Årstals-side der vises før quizzen. Er årstallet før `cutoffYear`,
  // vises `oldMessage` i `delayMs` millisekunder, og så sendes man videre.
  // `image` is shown to everyone (below `oldEmoji`/`oldMessage`) for `delayMs` ms.
  gate: {
    title: "Før vi starter…",
    text: "Hvilket år er du født?",
    placeholder: "fx 1985",
    button: "Videre",
    invalid: "Skriv et gyldigt årstal",
    cutoffYear: 1980,
    oldMessage:
      "Hold da op, det er lige før du har oplevet dinosaurerne her på jorden!",
    oldEmoji: "😎",
    image: "media/dinokiss.gif",
    delayMs: 4500,
  },

  levels: [
    // description: "2 spørgsmål", // udelades = antal spørgsmål vises automatisk
    { id: "nem", label: "Nem", emoji: "🙂", count: 2 },
    { id: "middel", label: "Middel", emoji: "🤔", count: 5 },
    {
      id: "svaer",
      label: "Svær",
      emoji: "🧠",
      // no count = all questions
      // Ekstra for at klare den svære: lægges oven på den fælles "winner".
      winner: {
        title: "Du er et geni! 🏆",
        text: "Du klarede den svære quiz. Her er din præmie:",
        extra: {
          title: "⭐ Ekstrapræmie ⭐",
          text: "Fordi du valgte den svære, får du også denne bonus:",
          image: "", // fx "media/bonus.jpg"
          link: {
            text: "Hent ekstrapræmien",
            url: "https://example.com/bonus",
          },
        },
      },
    },
  ],

  // Shared questions, ordered from easy to hard.
  // Nem = first 2, Middel = first 5, Svær = all.
  questions: [
    // ------------------------------------------------------------ NEM
    {
      type: "choice",
      title: "Navn",
      text: "Det næstmest almindelige drengenavn i Danmark i 1970'erne?",
      options: ["Anders", "Michael", "Peter", "Thomas"],
      correct: 1,
    },
    {
      type: "choice",
      title: "Flag",
      text: "Hvilke farver er der i det iranske flag?",
      options: [
        "Blå, hvid, rød",
        "Grøn, hvid, rød",
        "Sort, hvid, rød",
        "Rød, hvid, grøn",
      ],
      correct: 1,
    },

    // --------------------------------------------------------- MIDDEL
    {
      type: "text",
      title: "Lyt godt efter",
      text: "Afspil lydklippet. Hvad hedder sangen?",
      video: "media/actor.mp4",
      answers: ["The Actor", "Actor"],
    },
    {
      type: "text",
      title: "Dyr",
      text: "Hvor mange ben har en edderkop?",
      answers: ["8", "otte"],
    },
    {
      type: "text",
      title: "Kalenderen",
      text: "Hvor mange dage er der i et skudår?",
      answers: ["366"],
    },

    // ----------------------------------------------------------- SVÆR
    {
      type: "choice",
      title: "Lyt godt efter",
      text: "Afspil lydklippet. Hvilken sang gemmer sig?",
      audio: "media/sleeping.mp3",
      options: ["Stupid Man", "Barbie Girl", "Sleeping Child", "What A Life"],
      correct: 2,
    },
    {
      type: "choice",
      title: "Hvilken bygning ses her?",
      image: "media/dr.png",
      text: "Hvad gemmer sig her?",
      options: ["Børsen", "DR Koncerthuset", "Vega", "En blå bygning"],
      correct: 1,
      hint: "Den ligger på Amager.",
    },
    {
      type: "choice",
      title: "Historie",
      text: "Hvilket år fik Danmark sin første grundlov?",
      options: ["1814", "1849", "1864", "1915"],
      correct: 1,
    },
    {
      type: "text",
      title: "Kemi",
      text: "Hvad er det kemiske tegn for guld?",
      answers: ["Au"],
      hint: "Det kommer fra det latinske ord 'aurum'.",
    },
    {
      type: "text",
      title: "Rummet",
      text: "Hvad hedder den største planet i solsystemet?",
      answers: ["Jupiter"],
    },
    {
      type: "choice",
      title: "Kunst",
      text: "Hvem malede Mona Lisa?",
      options: ["Michelangelo", "Rafael", "Leonardo da Vinci", "Rembrandt"],
      correct: 2,
    },
    {
      type: "choice",
      title: "Danmark",
      text: "Hvad hedder Danmarks højeste naturlige punkt?",
      options: ["Himmelbjerget", "Møllehøj", "Ejer Bavnehøj", "Yding Skovhøj"],
      correct: 1,
      hint: "Det ligger kun 170,86 meter over havet.",
    },
    {
      type: "text",
      title: "Matematik",
      text: "Hvad er kvadratroden af 144?",
      answers: ["12", "tolv"],
    },
  ],

  // "Jeg er for gammel til sjov"-knappen på forsiden → en gimmick-side.
  // Skift image ud med en GIF, hvis du vil, fx "media/gimmick.gif".
  lazy: {
    button: "Jeg er for gammel til sjov – bare vis mig præmien",
    title: "Her er din præmie! 🎁",
    text: "Tillykke, du har vundet … absolut ingenting. Præmier skal man gøre sig fortjent til. 😜",
    image: "media/giphy.gif",
    back: "Okay, okay – jeg tager quizzen",
  },

  // Fælles vinderside for alle sværhedsgrader
  winner: {
    title: "Tillykke (også med fødselsdagen)! 🎉",
    text: "Du har løst hele quizzen. Her er din præmie:",
    image: "media/price.png", // tom "" = intet billede
    imageTwo: "media/minions.gif", // tom "" = intet billede
    html: "", // valgfrit: egen HTML, fx en YouTube-embed eller en gavekode
    confetti: true,
    // extra: { title, text, image, link, html } – valgfri ekstrapræmie
  },

  messages: {
    correct: "Rigtigt! 🎉",
    wrong: "Ikke helt — prøv igen!",
    next: "Videre",
    check: "Svar",
    hint: "Vis hint",
    placeholder: "Skriv dit svar…",
    restart: "Start forfra",
    questions: "spørgsmål",
  },
};
