'use strict';
function setupNavigation() {
	function updateState(mql) {
		if(mql.matches)
			animate = false;
		else
			animate = true;
	}
	// state indicator
	let animate = true;
	let mql = window.matchMedia('(prefers-reduced-motion: reduce)');
	mql.addListener(updateState);
	// init on page load
	updateState(mql);

	// getting stuff
	let navigation= document.getElementById('navigation');
	let navigationToggle = document.getElementById('navigationToggle');
	let siteLinks = document.getElementById('siteLinks');
	let contents = document.getElementById('contents');
	let timerid;

	function showSiteLinks(linkList) {
		let i = 0;
		// one by one
		timerid = setInterval(() => {
			linkList[i].classList.remove('prepared');
			// we've reached the end
			if(i >= linkList.length -1) {
				clearInterval(timerid);
				return;
			}
			i++;
		}, animate?50:0);
	}

	function prepareSiteLinks(linkList) {
		for( let i of linkList )
			i.classList.add('prepared');
	}

	function enterNavigation(e) {
		// re-register event listeners
		navigationToggle.removeEventListener('click', enterNavigation);
		navigationToggle.addEventListener('click', leaveNavigation);
		// activate the button
		navigationToggle.classList.add('activated');
		// fade out
		contents.classList.add('transparent')
		if(!animate) showSiteLinks(siteLinks.children);
		setTimeout(linkList => {
			// activate the navigation layer
			navigation.classList.add('activated');
			// hide the contents
			contents.classList.add('truncated');
			if(animate) showSiteLinks(linkList);
		}, 100, siteLinks.children);
	}

	function leaveNavigation(e) {
		// we're leaving, so stop entering
		clearInterval(timerid);
		// restore the link list
		prepareSiteLinks(siteLinks.children);
		// deactivate the button
		navigationToggle.classList.remove('activated');
		// deactivate the navigation layer
		navigation.classList.remove('activated');
		// wait for the links to disappear
		setTimeout(() => {
			// show & fade in
			contents.classList.remove('truncated');
			contents.classList.remove('transparent');
			// re-register event listeners
			navigationToggle.removeEventListener('click', leaveNavigation);
			navigationToggle.addEventListener('click', enterNavigation);
		}, 270);
	}

	// register event listener
	navigationToggle.addEventListener('click', enterNavigation);
}

setupNavigation();
