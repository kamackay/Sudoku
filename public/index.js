var tableBody;
var tableRows;
var elHeight = undefined;

$(document).ready(() => {
	tableBody = $("#tableBody");
	tableRows = [];
	$.get("https://afternoon-mountain-94217.herokuapp.com/sudoku/", (data) => {
		var board = data.sudokuBoard;
		console.log(board);
		for (var x = 0; x < board.length; x++) {
			var row = board[x];
			for (var y = 0; y < row.length; y++) {
				var index = x * board.length + y;
				if (row[y] != 0) {
					var $el = $("#cell-" + index);
					$el.val(row[y]);
					$el.attr("disabled", true);
					$el.addClass("unselectable");
				}
			}
		}
	});
});
