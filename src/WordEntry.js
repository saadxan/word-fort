import React from 'react';
import './WordEntry.css'

class WordEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            word: null,
            phonetic: null,
            origin: null,
            definitions: []
        }
    }

    setupWordLesson(data) {
        this.setState({
            word: data[0]["word"],
            phonetic: data[0]["phonetic"],
            origin: data[0]["origin"],
            definitions: this.parseDefinitions(data[0]["meanings"])
        })
    }

    parseDefinitions(meaningsData) {
        let definitions = [];

        for (let i = 0; i < meaningsData.length; i++) {
            let defs = [];

            for(let j = 0; j < meaningsData[i]["definitions"].length; j++) {
                defs.push(meaningsData[i]["definitions"][j]["definition"]);
            }

            definitions.push({partOfSpeech: meaningsData[i]["partOfSpeech"], meanings: defs});
        }

        return definitions;
    }

    getDefinitions() {
        let definitions = [];

        for (let i = 0; i < this.state.definitions.length; i++) {
            definitions.push((<h4>{this.state.definitions[i]["partOfSpeech"]}</h4>));

            for(let j = 0; j < this.state.definitions[i]["meanings"].length; j++) {
                definitions.push((<h6> — {this.state.definitions[i]["meanings"][j]}</h6>));
            }
        }

        return definitions;
    }

    clearWord() {
        this.setState({word: null});
    }

    render() {
        return (
            <div>
                {this.state.word != null &&
                    <div id="lesson">
                        <h2>{this.state.word} • /{this.state.phonetic}/</h2>
                        <em><h8>{this.state.origin}</h8></em>
                        <br />
                        <br />
                        <div>{this.getDefinitions()}</div>
                    </div>
                }
            </div>
        );
    }
}

export default WordEntry;
