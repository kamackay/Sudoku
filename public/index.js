var tableBody;
var tableRows;
var elHeight = undefined;

window.boardValid = true;

const DIM = 9;

const subSquares = [
	[0, 1, 2, 9, 10, 11, 18, 19, 20],
	[3, 4, 5, 12, 13, 14, 21, 22, 23],
	[6, 7, 8, 15, 16, 17, 24, 25, 26],
	[27, 28, 29, 36, 37, 38, 45, 46, 47],
	[30, 31, 32, 39, 40, 41, 48, 49, 50],
	[33, 34, 35, 42, 43, 44, 51, 52, 53],
	[54, 55, 56, 63, 64, 65, 72, 73, 74],
	[57, 58, 59, 66, 67, 68, 75, 76, 77],
	[60, 61, 62, 69, 70, 71, 78, 79, 80]
];

$(document).ready(() => {
	tableBody = $("#tableBody");
	tableRows = [];
	$.get("./api/easy", data => {
		var board = data.board;
		console.log(board);
		for (var x = 0; x < board.length; x++) {
			var row = board[x];
			for (var y = 0; y < row.length; y++) {
				var index = x * board.length + y;
				var $el = $("#cell-" + index);
				if (row[y] != 0 && row[y] != null) {
					$el.val(row[y]);
					$el.attr("disabled", true);
					$el.addClass("unselectable");
				}
				$el.on("change paste keyup", verifyBoard);
				$el.keydown(keyHandler);
				$el.attr("maxlength", 1);
			}
		}

		$("#loading").hide();
		$("#grid").fadeIn(500);
		verifyBoard();
	});
	// window.setInterval(verifyBoard, 1000);
});

function verifyBoard() {
	const startDate = new Date();
	setBoardValid(true);

	// Remove all errors from last check
	for (var x = 0; x < DIM; x++) {
		for (var y = 0; y < DIM; y++) {
			$("#cell-" + (x * DIM + y)).removeClass("error");
		}
	}

	// Rows
	for (var x = 0; x < DIM; x++) {
		var row = [];
		for (var y = 0; y < DIM; y++) {
			var index = x * DIM + y;
			var $el = $("#cell-" + index);
			var value = parseInt($el.val());
			const matchIdx = $.inArray(value, row);
			if (matchIdx !== -1) {
				$el.addClass("error");
				var otherElId = x * DIM + matchIdx;
				$("#cell-" + otherElId).addClass("error");
				setBoardValid(false);
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
			var value = parseInt($el.val());
			const matchIdx = $.inArray(value, row);
			if (matchIdx !== -1) {
				$el.addClass("error");
				var otherElId = matchIdx * DIM + x;
				$("#cell-" + otherElId).addClass("error");
				setBoardValid(false);
			}
			row.push(value);
		}
	}

	// Squares
	subSquares.forEach(square => {
		var values = [];
		for (var x = 0; x < square.length; x++) {
			var index = square[x];
			var $el = $("#cell-" + index);
			var value = parseInt($el.val());
			if (!isNaN(value)) {
				const matchIdx = $.inArray(value, values);
				if (matchIdx !== -1) {
					$el.addClass("error");
					var otherElId = square[matchIdx];
					$("#cell-" + otherElId).addClass("error");
					setBoardValid(false);
				}
			}
			values.push(value);
		}
	});

	if (!window.boardValid) {
		$("#messages")
			.html("Errors on Board")
			.addClass("error");
	} else {
		$("#messages")
			.html("")
			.removeClass("error");
	}

	// Count empty spaces
	var emptySpaces = 0;
	for (var index = 0; index < DIM * DIM; index++) {
		if (isNaN(parseInt($("#cell-" + index).val()))) {
			emptySpaces++;
		}
	}

	if (emptySpaces === 0) {
		$("#messages")
			.html("You Won!")
			.removeClass("error")
			.addClass("success");
	}

	var seconds = (new Date().getTime() - startDate.getTime()) / 1000;

	console.log("Check Done in " + seconds + " sec");
}

const keyHandler = function(e) {
	// Allow: backspace, delete, tab, escape, enter and .
	if (
		$.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 123, 116]) !== -1 ||
		(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))
	) {
		return;
	} else if (e.keyCode >= 36 && e.keyCode <= 40) {
		const id = getId($(e.target));
		switch (e.keyCode) {
			case 37:
				// Left
				console.log("Left Press on ID " + id);
				var x = id;
				while (x >= 0) {
					x--;
					var $el = $("#cell-" + x);
					if ($el.attr("disabled") === undefined) {
						$el.focus();
						break;
					}
				}
				return;
			case 38:
				var x = id;
				while (x >= 0) {
					x -= DIM;
					var $el = $("#cell-" + x);
					if ($el.attr("disabled") === undefined) {
						$el.focus();
						break;
					}
				}
				return;
			case 39:
				// Right
				var x = id;
				while (x <= DIM * DIM) {
					x++;
					var $el = $("#cell-" + x);
					if ($el.attr("disabled") === undefined) {
						$el.focus();
						break;
					}
				}
				return;
			case 40:
				// Down
				var x = id;
				while (x <= DIM * DIM) {
					x += DIM;
					var $el = $("#cell-" + x);
					if ($el.attr("disabled") === undefined) {
						$el.focus();
						break;
					}
				}
				return;
		}
	}
	console.log("Keypress code: " + e.keyCode);
	// Ensure that it is a number and stop the keypress
	if (
		(e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
		(e.keyCode < 96 || e.keyCode > 105)
	) {
		e.preventDefault();
	} else {
		$(e.target).val("");
	}
};

function getId(el) {
	if (el instanceof jQuery) {
		return parseInt(el.attr("id").substring(5));
	} else {
		return parseInt(el.id.substring(5));
	}
}

function setBoardValid(valid) {
	window.boardValid = valid === true;
}
