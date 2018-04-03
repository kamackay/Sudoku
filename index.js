const express = require("express");
const server = express();
const cors = require("cors");
const router = express.Router();
const generator = require("./sudoku.js");
server.use(express.static(__dirname + "/public"));
server.use(cors());

router.get("/:difficulty", (req, res) => {
	const boardText = generator.generate(req.params.difficulty);
	const board = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	for (var x = 0; x < 9 * 9; x++) {
		const boardVal = boardText.charAt(x);
		if (boardVal !== ".") {
			board[Math.floor(x / 9)][x % 9] = parseInt(boardVal);
		}
	}
	console.log(board);
	res.json({ board: board });
});
server.use("/api", router);
const port = process.env.PORT || 5555;
console.log("Listening on port: " + port);
server.listen(port);
