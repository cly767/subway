'use strict';
function setupNavigation() {
	// getting stuff
	let container = document.getElementById('container');
	let navigationEnter = document.getElementById('navigationEnter');
	let navigationQuit = document.getElementById('navigationQuit');
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
		navigationEnter.removeEventListener('click', enterNavigation);
		navigationEnter.addEventListener('click', leaveNavigation);
		attachOverlay();
		container.classList.add('pressed');
		drawer.classList.add('activated');
		shift1by1(drawer.children);
	}

	function leaveNavigation(e) {
		// we're leaving, so stop entering
		clearInterval(timerid);
		navigationEnter.removeEventListener('click', leaveNavigation);
		navigationEnter.addEventListener('click', enterNavigation);
		restoreShift(drawer.children);
		drawer.classList.remove('activated');
		container.classList.remove('pressed');
		overlay.remove();
	}

	function attachOverlay() {
		overlay = document.createElement('div');
		overlay.classList = 'overlay';
		overlay.addEventListener('click', leaveNavigation);
		document.body.append(overlay);
	}

	// register event listener
	navigationEnter.addEventListener('click', enterNavigation);
	navigationQuit.addEventListener('click', leaveNavigation);
}

setupNavigation();
