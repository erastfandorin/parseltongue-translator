import "./App.css";
import alphabet from "./alphabet";
import { useState } from "react";
import { error, defaultModules } from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";

defaultModules.set(PNotifyMobile, {});

function App() {
  const [ukrainianSentence, setUkrainianSentence] = useState();
  const [parseltongueSentence, setParseltongueSentence] = useState();

  const handleChange = ({ target }) => {
    setUkrainianSentence(() => target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parseltongueWords = [];
    const ukrainianWords = ukrainianSentence.split(" ");

    for (let i = 0; i < ukrainianWords.length; i++) {
      const letters = ukrainianWords[i].split("");
      const parseltongueWord = [];

      letters.forEach((letter) =>
        parseltongueWord.push(getParseltongueSyllables(alphabet, letter))
      );
      parseltongueWords.push(parseltongueWord.join(""));
    }

    setParseltongueSentence(() => parseltongueWords.join(" "));
    console.log(ukrainianSentence);
  };

  function getParseltongueSyllables(array, search) {
    let i = array.length;
    while (i--) {
      if (array[i].ukrainian === search) {
        return array[i].parseltongue;
      }
    }
    error({
      title: "Не розпізнаний символ",
      text: "Українською, будь ласка!",
    });
  }

  return (
    <div className="App">
      <h1 className="App__headline">Парселтанг перекладач &#128013;</h1>
      <p className="App__languages-table">Українська &gt; Парселтанг</p>
      <form className="App__form form" onSubmit={handleSubmit}>
        <textarea className="form_textarea" onChange={handleChange}></textarea>
        <textarea
          className="form_textarea"
          disabled
          value={parseltongueSentence}
        ></textarea>
        <button className="form_button">Перекласти</button>
      </form>
      <div className="how-work">
        <h2>Як це працює?</h2>
        <p>Програма заміняє букви українських слів на склади перселтангу</p>
      </div>
    </div>
  );
}

export default App;
