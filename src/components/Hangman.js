import {Component, useState} from 'react'
import {randomWord} from "./Words.js"
import step0 from "./images/0.jpg"
import step1 from "./images/1.jpg"
import step2 from "./images/2.jpg"
import step3 from "./images/3.jpg"
import step4 from "./images/4.jpg"
import step5 from "./images/5.jpg"
import step6 from "./images/6.jpg"

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6, 
    images :[step0, step1, step2, step3, step4, step5, step6]
  }
constructor (props){
  super(props);
  this.state = {
    mistake: 0,
    guessed: new Set(), 
    answer: randomWord(),

  };
  this.handleGuess = this.handleGuess.bind(this);
    this.resetButton = this.resetButton.bind(this);
}


resetButton(){
  this.setState({
    mistake:0,
    guessed:new Set(),
    answer: randomWord(),
  }) 
}



guessedWord() {
return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "))
}


handleGuess = e => {
  let letter = e.target.value;
  this.setState(st => ({
    guessed: st.guessed.add(letter),
    mistake:st.mistake + (st.answer.includes(letter) ? 0 : 1)

  }))
}
generateButtons() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split("").map(letter => (
    <button  className='gameState' key={letter} value={letter} onClick={this.handleGuess} disabled ={this.state.guessed.has(letter)}>
      {letter}
    </button>
  ))
}


  render() {
     const gameOver = this.state.mistake >= this.props.maxWrong; 
     const isWinner = this.guessedWord().join("") === this.state.answer;
     let gameStat = this.generateButtons();
     let restart = gameOver || isWinner;

     if(isWinner){
        gameStat = "Win"
     } 
     
     if (gameOver){
       gameStat = "Lost"
     }
  

    return (
      <div >
        <h1>Hangman</h1>
       <div className='wrong-guesses'>Wrong Guesses: {this.state.mistake} of {this.props.maxWrong }</div>
       <div className='text-center'>
          <img src={this.props.images[this.state.mistake]} alt='image'/>
       </div>
       <p className='guessWord-container'>{!gameOver ? this.guessedWord() : this.state.answer}</p>
       <p className='gameResult'>{gameStat}</p>
       <div>
         <div className='popup-container'>
           <div className='popup'>
        {restart && (
          <button id="reset" onClick={this.resetButton}>
            Restart?
          </button>
        )}
        </div>
       </div>
       </div>
      </div>
    )
  }
}

export default Hangman