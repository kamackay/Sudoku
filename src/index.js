import React from "react";
import ReactDOM from "react-dom";
import "./general.css"
import "./index.css";

class Square extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null
		};
	}

	render() {
		return (
			<button
				className="square"
				onClick={() => this.setState({ value: "X" })}
			>
				{this.state.value}
			</button>
		);
	}
}

class SubBoard extends React.Component {
	renderSquare(i) {
		return <Square value={i} />;
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="board-row">
						{this.renderSquare()}
						{this.renderSquare()}
						{this.renderSquare()}
					</div>
					<div className="board-row">
						{this.renderSquare()}
						{this.renderSquare()}
						{this.renderSquare()}
					</div>
					<div className="board-row">
						{this.renderSquare()}
						{this.renderSquare()}
						{this.renderSquare()}
					</div>
				</div>
			</div>
		);
	}
}

class Board extends React.Component {
	renderSubBoard() {
		return <SubBoard className="subBoard" />;
	}

	render() {
		return (
			<div className="game-root">
				<table className="board-table">
					<tbody>
						<tr>
							<td>{this.renderSubBoard()}</td>
							<td>{this.renderSubBoard()}</td>
							<td>{this.renderSubBoard()}</td>
						</tr>
						<tr>
							<td>{this.renderSubBoard()}</td>
							<td>{this.renderSubBoard()}</td>
							<td>{this.renderSubBoard()}</td>
						</tr>
						<tr>
							<td>{this.renderSubBoard()}</td>
							<td>{this.renderSubBoard()}</td>
							<td>{this.renderSubBoard()}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
