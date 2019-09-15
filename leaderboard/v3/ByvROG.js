
var $divs = $("div.row");
$(document).ready(function () {
    var numericallyOrderedDivs = $divs.sort(function (a, b) {
        return $(a).find(".score").text() > $(b).find(".score").text();
    });
    $("#container").html(numericallyOrderedDivs);

   $("#container").find(".row:eq(0)").addClass("highLight");
   $("#container").find(".row:eq(1)").addClass("highLight")
   $("#container").find(".row:eq(2)").addClass("highLight");



});
