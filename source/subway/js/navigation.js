'use strict';
function setupNavigation() {
	// getting stuff
	let navigationToggle = document.getElementById('navigationToggle');
	let drawer = document.getElementById('drawer');
	let navigation = document.getElementById('navigation');
	let siteLinks = document.getElementById('siteLinks');
	let notes = document.getElementById('notes');
	// we'll need these later
	let timerid;
	let overlay;

	function shift1by1(linkList) {
		let i = 0;
		// one by one
		timerid = setInterval(() => {
			linkList[i].classList.remove('prepared');
			// we've reached the end
			if(i >= linkList.length - 1) {
				clearInterval(timerid);
				return;
			}
			i++;
		}, 50);
	}

	function restoreShift(linkList) {
		for( let i of linkList )
			i.classList.add('prepared');
	}

	function enterNavigation(e) {
		// re-register event listeners
		navigationToggle.removeEventListener('click', enterNavigation);
		navigationToggle.addEventListener('click', leaveNavigation);
		attachOverlay();
		drawer.classList.add('activated');
		shift1by1(Array(siteLinks, notes));
	}

	function leaveNavigation(e) {
		// we're leaving, so stop entering
		clearInterval(timerid);
		navigationToggle.removeEventListener('click', leaveNavigation);
		navigationToggle.addEventListener('click', enterNavigation);
		restoreShift(Array(siteLinks, notes));
		drawer.classList.remove('activated');
		overlay.remove();
	}

	function attachOverlay() {
		overlay = document.createElement('div');
		overlay.classList = 'overlay';
		overlay.addEventListener('click', leaveNavigation);
		document.body.append(overlay);
	}

	// register event listener
	navigationToggle.addEventListener('click', enterNavigation);
}

setupNavigation();
