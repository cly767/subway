'use strict';
function setupAnchor() {
	let ali = document.getElementsByTagName('a');
	let pageContainer = document.getElementById('pageContainer');
	for( let i of ali )
		i.addEventListener('click', e => {
			if(e.target.target === '' || e.target.target === '_self') {
				e.preventDefault();
				pageContainer.classList.add('transparent');
				setTimeout(() => {
					window.location.assign(e.target.href);
				}, 100);
			}
		});
	window.addEventListener('pageshow', e => {
		pageContainer.classList.remove('transparent');
	});
}

setupAnchor();
