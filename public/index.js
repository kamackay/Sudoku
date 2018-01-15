var tableBody;
var tableRows;
var elHeight = undefined;

const DIM = 9;

$(document).ready(() => {
	tableBody = $("#tableBody");
	tableRows = [];
	$.get("https://afternoon-mountain-94217.herokuapp.com/sudoku/", data => {
		var board = data.sudokuBoard;
		console.log(board);
		for (var x = 0; x < board.length; x++) {
			var row = board[x];
			for (var y = 0; y < row.length; y++) {
				var index = x * board.length + y;
				var $el = $("#cell-" + index);
				if (row[y] != 0) {
					$el.val(row[y]);
					$el.attr("disabled", true);
					$el.addClass("unselectable");
				}
				$el.on("change paste keyup", verifyBoard);
				$el.attr("maxlength", 1);
			}
		}

		$("#loading").hide();
		$("#grid").fadeIn(500);
	});
	// window.setInterval(verifyBoard, 1000);
});

function verifyBoard() {
	const startDate = new Date();
	// Rows
	for (var x = 0; x < DIM; x++) {
		var row = [];
		for (var y = 0; y < DIM; y++) {
			var index = x * DIM + y;
			var $el = $("#cell-" + index);
			$el.removeClass("error");
			var value = parseInt($el.val());
			const matchIdx = $.inArray(value, row);
			if (matchIdx !== -1) {
				console.log("ERROR");
				$el.addClass("error");
				var otherElId = x * DIM + matchIdx;
				$("#cell-" + otherElId).addClass("error");
			}
			row.push(value);
		}
	}
	// Columns
	for (var x = 0; x < DIM; x++) {
		var row = [];
		for (var y = 0; y < DIM; y++) {
			var index = y * DIM + x;
			var $el = $("#cell-" + index);
			$el.removeClass("error");
			var value = parseInt($el.val());
			const matchIdx = $.inArray(value, row);
			if (matchIdx !== -1) {
				console.log("ERROR");
				$el.addClass("error");
				var otherElId = matchIdx * DIM + x;
				$("#cell-" + otherElId).addClass("error");
			}
			row.push(value);
		}
	}

	// Squares

	var seconds = (new Date().getTime() - startDate.getTime()) / 1000;

	console.log("Check Done in " + seconds + " sec");
}
