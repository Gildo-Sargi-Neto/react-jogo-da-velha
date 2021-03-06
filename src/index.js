import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
        {props.value}
        </button>
    );
}

  class Board extends React.Component {
    renderSquare(i) {
      return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    createsquares(qtd){
      var squaresArr = [];
      for(let i = 0; i<qtd;i++){
        squaresArr.push(this.renderSquare(i))
      }
      return squaresArr;
    }

    createBoard(nd, qtd){
      var divs = [];
      var squaresArr = this.createsquares(qtd);
      for(let i = 0; i<(qtd/nd);i++){
        divs.push(
          <div className="board-row">
            {squaresArr.splice(0,qtd/nd)}
          </div>
        )
      }
      return divs
    }

    render() {
      return (
        <div>
          {this.createBoard(3,9)}
        </div>
      );
    }
  }

  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          selected: [],
          stepNumber: 0,
          xIsNext: true,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        var a = [];
        a[history.length] = true;
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          selected: a,
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
      console.log(step);
      var a = [];
      a[step] = true;
        this.setState({
            stepNumber: step,
            selected: a,
            xIsNext: (step % 2) === 0,
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button className={this.state.selected[move] ? 'test' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });

        const velha = current.squares.find(element => !element);
        let status;
        if(winner) {
            status = 'Winner: '+ winner;
        }
        else if(typeof velha === 'undefined') {
            status = 'Winner: VELHA';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
            <div className="game-board">
                <Board
                    squares = {current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div>
                    {/* <h1>JA VOLTO :3</h1> */}
                {/* <h1>JA VOLTO, BUSCANDO CAFÉ</h1> */}
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // ========================================

  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
