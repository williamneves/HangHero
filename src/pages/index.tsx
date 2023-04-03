import { type NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import clsx from "clsx";

const hangmanWords: string[] = [
  "ability",
  "absence",
  "academy",
  "account",
  "address",
  "advance",
  "advice",
  "arrival",
  "article",
  "athlete",
  "attempt",
  "balance",
  "battery",
  "believe",
  "brother",
  "capital",
  "capture",
  "central",
  "ceremony",
  "chamber",
  "channel",
  "climate",
  "college",
  "company",
  "compare",
  "complex",
  "confirm",
  "connect",
  "control",
  "courage",
  "culture",
  "declare",
  "default",
  "defense",
  "deliver",
  "despite",
  "display",
  "economy",
  "elegant",
  "element",
  "embrace",
  "emerge",
  "enforce",
  "enhance",
  "example",
  "expense",
  "explain",
  "express",
  "fashion",
  "feature",
  "finance",
  "freedom",
  "gallery",
  "general",
  "gravity",
  "harvest",
  "history",
  "holiday",
  "imagine",
  "improve",
  "include",
  "inspire",
  "intense",
  "journey",
  "justice",
  "kingdom",
  "library",
  "license",
  "loyalty",
  "manager",
  "measure",
  "mention",
  "message",
  "mission",
  "mistake",
  "monitor",
  "mystery",
  "natural",
  "opinion",
  "package",
  "partner",
  "pattern",
  "perform",
  "picture",
  "plastic",
  "present",
  "private",
  "produce",
  "project",
  "promise",
  "protect",
  "protest",
  "purpose",
  "quality",
  "recover",
  "reflect",
  "refresh",
  "release",
  "request",
  "respect",
  "revenue",
  "romance",
  "section",
  "segment",
  "serious",
  "service",
  "sibling",
  "society",
  "station",
  "strange",
  "stretch",
  "support",
  "survive",
  "teacher",
  "thought",
  "traffic",
  "version",
  "victory",
  "village",
  "visible",
];

// You can access a random word from the array as follows:
const randomIndex = Math.floor(Math.random() * hangmanWords.length);
const randomWord = (): string => hangmanWords[randomIndex] as string;

interface LetterBoxProps {
  letter: string;
  guessed: boolean;
}

const LetterBox: React.FC<LetterBoxProps> = ({ letter, guessed }) => {

  // random index key
  const randomIndex = Math.floor(Math.random() * 1000);

  if (guessed) {
    return (
      <div
        key={`${letter}_guessedLetter${randomIndex}`}
        className="flex h-10 w-8 justify-center rounded-md border border-base-300 p-2 text-center align-baseline text-base">
        {letter}
      </div>
    );
  }

  return (
    <div
      key={`${letter}_guessedLetter${randomIndex}`}
      className="flex h-10 w-8 justify-center rounded-md border border-base-300 p-2 text-center align-baseline text-base"
    >
      {"_"}
    </div>
  );
};

const qwerty = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const abc = [
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
  ["k", "l", "m", "n", "o", "p", "q", "r", "s"],
  ["t", "u", "v", "w", "x", "y", "z"],
];

interface KeyboardProps {
  guess: string;
  word: string;
  guesses: string[];
  onKeyPress: (key: string) => void;
  layout: "qwerty" | "abc";
}

const Keyboard: React.FC<KeyboardProps> = ({ guess ,guesses, onKeyPress, layout, word }) => {
  const keyboard = layout === "qwerty" ? qwerty : abc;

  return (
    <div className="flex flex-col gap-2">
      {keyboard.map((row, i) => (
        <div className="flex flex-row justify-center gap-2" key={i}>
          {row.map((key) => (
            <button
              key={key}
              className={clsx(
                "kbd transition-all duration-100 hover:opacity-90 hover:shadow disabled:shadow-none disabled:cursor-no-drop",
                guesses.includes(key) 
                  ?
                  word.includes(key) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  :
                guess === key ? "bg-blue-100 text-blue-700 font-semibold" : ""
              )}
              onClick={() => onKeyPress(key)}
              disabled={guesses.includes(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};



const Home: NextPage = () => {

  // States
  const [word, setWord] = useState(randomWord());
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<[] | string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "won" | "loose">("playing");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [keyboardLayout, setKeyboardLayout] = useState<"qwerty" | "abc">("qwerty");

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    // Each change, reset the error message
    setErrorMessage("");

    // Only allow letters
    if (!e.target.value.match(/^[a-zA-Z]+$/)) { 
      setErrorMessage("You can only guess letters");
      return;
    }

    // The field is only one character long, so replace the value to be always the last character
    setGuess(e.target.value[e.target.value.length - 1] as string);
  };

  // Handlers
  const handleGuess = () => {
    if (guess.length > 1) {
      setErrorMessage("You can only guess one letter at a time");
      return;
    }

    setGuesses((prev) => [...prev, guess]);

    setGuess("");
  };

  const handleReset = () => {
    setWord(randomWord());
    setGuess("");
    setGuesses([]);
    setWrongGuesses(0);
    setGameState("playing");
    setErrorMessage("");
  };



  return (
    <>
      <Head>
        <title>HangHero</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex h-screen max-w-3xl flex-col items-center">
        <nav className="navbar mt-4 rounded-md bg-base-200 shadow">
          <div className="flex-none">
            <button className="btn-ghost btn-square btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <a className="btn-ghost btn text-xl normal-case">HangHero</a>
          </div>
          <div className="flex-none">
            <button className="btn-ghost btn-square btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>
          </div>
        </nav>

        <div className="my-5 flex flex-row items-center gap-3">
          {
            // Pick the wordLetters map and map over it to create a list of letters, and if the letter is guessed, show it, if not, show a dash
            Array.from(word).map((letter, i) => {
              return (
                <LetterBox
                  key={letter + String(i)}
                  letter={letter}
                  guessed={(guesses as string[]).includes(letter)}
                />
              );
            })
          }
        </div>

        {/* Keyboard */}
        <Keyboard
          word={word}
          guess={guess}
          guesses={guesses}
          onKeyPress={(key) => setGuess(key)}
          layout={keyboardLayout}
        />

        <button className="btn btn-wide mt-5 text-white" onClick={handleGuess}>
          Guess
        </button>
      </main>
    </>
  );
};

export default Home;

