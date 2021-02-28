import "./App.css";
import alphabet from "./alphabet";
import { useState } from "react";

function App() {
  const [ukrainianSentence, setUkrainianSentence] = useState();
  const [parseltongueSentence, setParseltongueSentence] = useState();

  const handleChange = ({ target }) => {
    setUkrainianSentence(() => target.value);
  };

  // не розпізнає великі букви, повертати великі букви
  // повертати помилку на незнайдені символи

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
  };

  function getParseltongueSyllables(array, search) {
    var i = array.length;
    while (i--) {
      if (array[i].ukrainian === search) {
        return array[i].parseltongue;
      }
    }
  }

  return (
    <div className="App">
      <h1 className="App__headline">Парселтанг перекладач &#128013;</h1>
      <p className="App__languages-table">Українська > Парселтанг</p>
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
