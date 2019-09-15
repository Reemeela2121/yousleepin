setInterval(function () {
    alert("test your fatigue");
		chrome.tabs.create({ url: 'work.html' });
}, 10000);

document.addEventListener('DOMContentLoaded', function() {
	var checkPageButton = document.getElementById('checkPage');
	checkPageButton.addEventListener('click', function() {

		chrome.tabs.getSelected(null, function(tab) {
			d = document;

			var f = d.createElement('form');
			f.action = 'homepage.html';
			f.method = 'post';
			var i = d.createElement('input');
			i.type = 'hidden';
			i.name = 'url';
			i.value = tab.url;
			f.appendChild(i);
			d.body.appendChild(f);
			f.submit();
		    });
	    }, false);
    }, false);
		chrome.browserAction.onClicked.addListener(function(activeTab){
		  var newURL = "work.html/";
		  chrome.tabs.create({ url: newURL });
		});
