/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-alarm' : '&#xe000;',
			'icon-close' : '&#xe001;',
			'icon-facebook' : '&#xe002;',
			'icon-twitter' : '&#xe003;',
			'icon-moon-stroke' : '&#xe004;',
			'icon-sun-fill' : '&#xe005;',
			'icon-sun-stroke' : '&#xe006;',
			'icon-moon-fill' : '&#xe007;',
			'icon-sun' : '&#xe008;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};