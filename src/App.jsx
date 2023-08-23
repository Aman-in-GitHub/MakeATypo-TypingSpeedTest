import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Counter from './Components/Counter';
import Word from './Components/Word';
import data from './data';

function App() {
  const [userInput, setUserInput] = useState('');
  const [words, setWords] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [startCount, setStartCount] = useState(false);
  const [time, setTime] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('HIGH') || 0);

  useEffect(() => {
    const random = Math.floor(Math.random() * data.length);
    const para = data[random].split(' ');
    setWords(para);
  }, []);

  useEffect(() => {
    let timer;
    if (startCount) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [startCount]);

  const minutes = time / 60;
  const speed =
    Math.floor(correctWordArray.filter(Boolean).length / minutes) || 0;

  function processInput(value) {
    if (activeIndex === words.length) {
      return;
    }

    setStartCount(true);

    if (value.endsWith(' ')) {
      if (activeIndex === words.length - 1) {
        setStartCount(false);
        setUserInput(`Completed in ${time} seconds`);
        if (speed > highScore) {
          setHighScore(speed);
        }
      } else {
        setUserInput('');
      }

      setActiveIndex((index) => index + 1);

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newData = [...data];
        newData[activeIndex] = word === words[activeIndex];
        return newData;
      });
    } else {
      setUserInput(value);
    }
  }

  function restartGame() {
    const random = Math.floor(Math.random() * data.length);
    const para = data[random].split(' ');
    setWords(para);

    setUserInput('');

    if (speed > highScore) {
      setHighScore(speed);
    }

    setStartCount(false);
    setCorrectWordArray([]);
    setActiveIndex(0);
    setTime(0);
  }

  localStorage.setItem('HIGH', highScore);

  return (
    <>
      <div className="min-h-[100dvh] max-w-[100rem] mx-auto dark:bg-[#232323] dark:text-white select-none">
        <Navbar />
        <div className="mx-5 md:mx-20 lg:mx-32">
          <Counter speed={speed} time={time} highScore={highScore} />
          <div className="h-[25vh] md:h-[25vh] lg:h-[20vh] overflow-y-auto paragraph">
            {words.map((word, index) => {
              return (
                <Word
                  key={index}
                  text={word}
                  active={index === activeIndex}
                  correct={correctWordArray[index]}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            className="border text-xl md:text-2xl px-4 py-3 md:py-4 md:px-5 outline-none mx-5 md:mx-20 lg:mx-32 dark:text-black dark:border-0"
            placeholder="Start Typing..."
            value={userInput}
            onChange={(e) => processInput(e.target.value)}
          />
          <button
            onClick={restartGame}
            className="mx-5 md:mx-20 lg:mx-32 bg-black text-white px-5 py-2 md:text-3xl md:py-3 text-2xl font-semibold duration-300 hover:bg-[#232323] active:scale-[0.99] dark:text-black dark:bg-white dark:hover:bg-[#ebebeb]"
          >
            Restart
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
