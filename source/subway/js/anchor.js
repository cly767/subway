'use strict';
function setupAnchor() {
	let ali = document.getElementsByTagName('a');
	let wrapper = document.getElementById('wrapper');
	let drawer = document.getElementById('drawer');
	for( let i of ali )
		i.addEventListener('click', e => {
			if(e.target.target === '' || e.target.target === '_self') {
				e.preventDefault();
				wrapper.classList.add('transparent');
				drawer.classList.add('transparent');
				setTimeout(() => {
					window.location.assign(e.target.href);
				}, 100);
			}
		});
	window.addEventListener('pageshow', e => {
		wrapper.classList.remove('transparent');
		drawer.classList.remove('transparent');
	});
}

setupAnchor();
