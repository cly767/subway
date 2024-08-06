'use strict';
function setupAnchor() {
	let ali = document.getElementsByTagName('a');
	let container = document.getElementById('container');
	for( let i of ali )
		i.addEventListener('click', e => {
			if(e.target.target === '' || e.target.target === '_self') {
				e.preventDefault();
				container.classList.add('transparent');
				setTimeout(() => {
					window.location.assign(e.target.href);
				}, 100);
			}
		});
	window.addEventListener('pageshow', e => {
		container.classList.remove('transparent');
	});
}

setupAnchor();
