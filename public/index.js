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
				$el.keydown(keyHandler);
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
			}
			row.push(value);
		}
	}

	// Squares

	var seconds = (new Date().getTime() - startDate.getTime()) / 1000;

	console.log("Check Done in " + seconds + " sec");
}

const keyHandler = function (e) {
	// Allow: backspace, delete, tab, escape, enter and .
	if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		 // Allow: Ctrl+A, Command+A
		(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))) {
			 // let it happen, don't do anything
			 return;
	}
	else if ((e.keyCode >= 36 && e.keyCode <= 40)) {
		const id = getId($(e.target));
		switch(e.keyCode) {
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
		console.log(e.keyCode);
	}
	// Ensure that it is a number and stop the keypress
	if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		e.preventDefault();
	}
}

function getId(el) {
	if (el instanceof jQuery) {
		return parseInt(el.attr('id').substring(5));
	} else {
		return parseInt(el.id.substring(5));
	}
}