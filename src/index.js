import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginControl from "./loginControl.js";
import NumberList from "./list.js";
import Reservation from "./multipleinput.js";
import {FileInput} from "./uncontrolled.js";
import Calculator from "./boilingVerdict.js";
import SignupDialogue from "./composition.js";
import FilterableProductTable from "./products.js";
import KeyboardFriendly from "./keyboardFriendly.js";
import './index.css';

//commented because functional component used instead of this
/*class Square extends React.Component {
    
    render() {
        return (
        <button 
            className="square" 
            onClick={()=> this.props.onClick() }>
            {this.props.value}
        </button>
        );
    }
}*/

function Square(props){
  return (
    <button 
      className="square" 
      onClick={()=>props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history:[{squares: Array(9).fill(null)}],
      xIsNext: true,
      stepNumber: 0
    };
  }
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    console.log(this.state.stepNumber);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    console.log(history);
    this.setState({history:history.concat([{squares:squares}]), xIsNext: !this.state.xIsNext, stepNumber: history.length});
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if(winner){
      status = "Winner :" + winner;
    }else{
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move)=>{
      const desc = move ? 'Go to move # '+ move : 'Go to game start';
      return (  
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i)=>this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: new Date()
    };
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount(){
    //this.timerID = setInterval(()=>this.tick(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  startTimer(){
    this.timerID = setInterval(()=>this.tick(), 1000);
  }

  tick(){
    /*this.setState({
      date: new Date()
    });*/
    //other way to do it
    //because state updates may be asynchronous
    this.setState((state, props)=>({
      date: new Date()
    }));
  }

  render(){
    return(
      <div>
        <h1>Hello, world</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
        <button onClick={this.startTimer}>Start</button>
      </div>
    );
  }
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<NumberList numbers={[1,2,3,4,5]}/>);
//root.render(<Reservation />);
root.render(<KeyboardFriendly />);

function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for(let i=0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
