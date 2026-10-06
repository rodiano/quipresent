// =====================================================================
//  QUIZ-INDSTILLINGER — det er kun denne fil, du skal redigere.
//
//  Quizzen har tre sværhedsgrader (levels). Hver har sin egen liste
//  af spørgsmål (steps) og kan have sin egen vinderside (winner), som
//  lægges oven på den fælles vinderside længere nede.
//
//  Trin-typer:
//    "rebus"  – vis emojis/tekst og/eller et billede, svar skrives ind
//    "text"   – almindeligt spørgsmål, svar skrives ind
//    "choice" – spørgsmål med svarmuligheder
//
//  Alle trin kan desuden have:
//    image: "media/billede.jpg"   – et billede
//    audio: "media/lydklip.m4a"   – et lydklip (mp3, m4a, wav, ogg)
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
  gate: {
    title: "Før vi starter…",
    text: "Hvilket år er du født?",
    placeholder: "fx 1985",
    button: "Videre",
    invalid: "Skriv et gyldigt årstal",
    cutoffYear: 1980,
    oldMessage: "Hold da op, det er lige før du har oplevet dinosaurerne her på jorden!",
    oldEmoji: "😎",
    delayMs: 3000,
  },

  levels: [
    // ------------------------------------------------------------ NEM
    {
      id: "nem",
      label: "Nem",
      emoji: "🙂",
      // description: "2 spørgsmål", // udelades = antal spørgsmål vises automatisk
      steps: [
        {
          type: "rebus",
          title: "Rebus",
          text: "Hvilket ord gemmer sig her?",
          rebus: "🍎 + 🌳",
          answers: ["æbletræ", "et æbletræ"], // alle svar der godkendes
          hint: "Det vokser i haven og giver frugt.",
        },
        {
          type: "choice",
          title: "Spørgsmål",
          text: "Hvad er hovedstaden i Danmark?",
          options: ["Aarhus", "København", "Odense", "Aalborg"],
          correct: 1, // 0 = første mulighed, 1 = anden, osv.
        },
      ],
    },

    // --------------------------------------------------------- MIDDEL
    {
      id: "middel",
      label: "Middel",
      emoji: "🤔",
      steps: [
        {
          type: "rebus",
          title: "Rebus",
          text: "Hvilken frugt gemmer sig her?",
          rebus: "🌍 + 🫐",
          answers: ["jordbær", "et jordbær", "jordbæret"],
          hint: "Rødt og sødt – og godt med fløde.",
        },
        {
          type: "choice",
          title: "Farvelære",
          text: "Hvilken farve får man, når man blander blå og gul?",
          options: ["Lilla", "Orange", "Grøn", "Brun"],
          correct: 2,
        },
        {
          type: "choice",
          title: "Lyt godt efter",
          text: "Afspil lydklippet. Hvad er det hemmelige ord?",
          audio: "media/lydklip.m4a",
          options: ["Æble", "Banan", "Citron", "Pære"],
          correct: 1,
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
      ],
    },

    // ----------------------------------------------------------- SVÆR
    {
      id: "svaer",
      label: "Svær",
      emoji: "🧠",
      steps: [
        {
          type: "rebus",
          title: "Rebus 1",
          text: "Hvilket dyr gemmer sig her?",
          rebus: "🌊 + ⭐",
          answers: ["søstjerne", "en søstjerne", "havstjerne"],
          hint: "Det har fem arme og bor på havbunden.",
        },
        {
          type: "rebus",
          title: "Rebus 2",
          image: "media/dr.png",
          text: "Hvad gemmer sig her?",
          rebus: "🌧️ + 🏹",
          answers: ["regnbue", "en regnbue"],
          hint: "Den har syv farver.",
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
          type: "choice",
          title: "Navn",
          text: "Det næstmest almindelige drengenavn i Danmark i 1970'erne?",
          options: ["Anders", "Michael", "Peter", "Thomas"],
          correct: 2,
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
          options: [
            "Himmelbjerget",
            "Møllehøj",
            "Ejer Bavnehøj",
            "Yding Skovhøj",
          ],
          correct: 1,
          hint: "Det ligger kun 170,86 meter over havet.",
        },
        {
          type: "text",
          title: "Matematik",
          text: "Hvad er kvadratroden af 144?",
          answers: ["12", "tolv"],
        },
        {
          type: "choice",
          title: "Lyt godt efter",
          text: "Afspil lydklippet. Hvad er det hemmelige ord?",
          audio: "media/lydklip.m4a",
          options: ["Æble", "Banan", "Citron", "Pære"],
          correct: 1,
        },
      ],
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
    title: "Tillykke! 🎉",
    text: "Du har løst hele quizzen. Her er din præmie:",
    image: "media/premie.svg", // tom "" = intet billede
    link: { text: "Hent din præmie", url: "https://example.com" }, // null = intet link
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
