'use strict';
function setupCopyCode() {
	let codeList = document.getElementsByTagName('figure');
	for( let i of codeList ) {
		let codeTable = i.childNodes[0];
		let codeHeader = document.createElement('div');
		let codeLang = document.createElement('div');
		let separator = document.createElement('div');
		let copyCode = document.createElement('button');

		codeHeader.classList.add('codeHeader');

		let lang = i.classList[1];
		if( lang !== undefined )
			codeLang.innerText = lang;
		codeLang.classList.add('codeLang');

		separator.classList.add('separator');

		copyCode.innerText = 'COPY';
		copyCode.classList.add('outlined');
		copyCode.addEventListener('click', e => {
			navigator.clipboard.writeText(codeTable.getElementsByClassName('code')[0].innerText);
		});

		codeHeader.append(codeLang, separator, copyCode);
		i.insertBefore(codeHeader, codeTable);
	}
}

setupCopyCode();
