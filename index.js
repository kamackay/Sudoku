const express = require("express");
const server = express();
const cors = require("cors");
const easy = require("./data/easyBoards").easyBoards;
const medium = require("./data/mediumBoards").mediumBoards;
const hard = require("./data/hardBoards").hardBoards;
const router = express.Router();
server.use(express.static(__dirname + "/public"));
server.use(cors());

router.get("/:difficulty", (req, res) => {
	if (req.params.difficulty === "easy") {
		res.json(easy[Math.floor(Math.random() * easy.length)]);
	} else if (req.params.difficulty === "medium") {
		res.json(medium[Math.floor(Math.random() * medium.length)]);
	} else if (req.params.difficulty === "hard") {
		res.json(hard[Math.floor(Math.random() * hard.length)]);
	} else {
		res.json({ error: "Request is not valid." });
	}
});
server.use("/api", router);

server.listen(process.env.PORT || 5555);
