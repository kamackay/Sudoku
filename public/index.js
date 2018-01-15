var tableBody;
var tableRows;
var elHeight = undefined;

$(document).ready(() => {
	tableBody = $("#tableBody");
	var minDim = Math.min(window.innerWidth, window.innerHeight) * 0.8;
	$("#root>table").css({ height: minDim + "px", width: minDim + "px" });
	tableRows = [];
	for (var x = 0; x < 3; x++) {
		tableBody.append($("<tr id='row" + x + "' class='tableRow'/>"));
		var row = $("#row" + x);
		for (var y = 0; y < 3; y++) {
			row.append($("<td id='col" + (x * 3 + y) + "' class='tableD'/>"));
		}
	}

	$.each($(".tableD"), (idx, element) => {
		$(element).append(
			$("<table align='center' class='subTable'><tbody><tr><td class='space'/><td class='space'/><td class='space'/></tr><tr><td class='space'/><td class='space'/><td class='space'/></tr><tr><td class='space'/><td class='space'/><td class='space'/></tr></tbody></table>")
		);
	});

	$.each($("td.space"), (idx, element) => {
		var $element = $(element);
		if (!elHeight) elHeight = $element.height() * .5;
		$element.append("<input type='text' class='spaceInput' maxlength='1' id='space" +idx + "' />")
		$element.css({ "font-size": elHeight + "px" });
	});

	$.get("https://afternoon-mountain-94217.herokuapp.com/sudoku/", (data) => {
		var board = data.sudokuBoard;
		console.log(board);
		for (var x = 0; x < board.length; x++) {
			var row = board[x];
			for (var y = 0; y < row.length; y++) {
				var index = x * board.length + y;
				if (row[y] != 0) {
					$("#space" + index).val(row[y]);
				}
			}
		}
	});
});
