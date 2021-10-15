import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import WordEntry from './WordEntry.js';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          word: null
      }
      let today = new Date().toDateString().split(" ").slice(1);
      this.todaysDate = today[0] + " " + today[1] + ", " + today[2];
      this.lesson = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fetchWordEntry = this.fetchWordEntry.bind(this);
  }

  handleSubmit(event) {
      event.preventDefault();
      this.lesson.current.clearWord();
      let word = new FormData(event.target).get("word");
      document.getElementById("wordInput").value = "";
      this.fetchWordEntry(word);
      this.setState({word : word});
  }

  fetchWordEntry(word) {
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              if (data.length === undefined)
                  return this.fetchWordEntry("erroneous");

              this.lesson.current.setupWordLesson(data);
          })
  }

  render() {
      return (
      <div>
        <h1 id="titleLabel">WordFort</h1>
        <div id="miscLabels">
            <h6>ENG1.01</h6>
            <h6>{this.todaysDate}</h6>
        </div>
        <form id="wordSearcher" onSubmit={this.handleSubmit}>
            <input id="wordInput" name="word" className="form-control form-control-lg" placeholder="Enter word"/>
            <button id="submitButton" type="submit" className="btn btn-primary"><i className="bi bi-search" /></button>
        </form>
        <WordEntry ref={this.lesson} />
      </div>
    );
  }
}

export default App;
