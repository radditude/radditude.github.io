---
---

function setUpExpanders() {
	const sections = document.querySelectorAll('.subhead')
	for (var i = 0; i < sections.length; i++) {
		sections[i].onclick = handleClick
	}
}

function getSection(element) {
	const parent = element.parentNode
	if (parent.tagName === 'SECTION') {
		return parent
	} else {
		return getSection(parent)
	}
}

function handleClick(e) {
	const section = getSection(e.target)
	const expander = section.querySelector('.expander').classList
	const body = section.querySelector('.section-body')
	expander.toggle('rotated')
	if (body.clientHeight) {
		body.style.height = 0
	} else {
		body.style.height = body.scrollHeight + "px";
	}
}

function copyToClipboard() {
	const confirm = document.querySelector('#clipper-confirm')
	const tocopy = document.createElement('textarea')
	tocopy.value = '{{ site.author.email }}'
	tocopy.style.visibility = 'none'
  document.body.appendChild(tocopy)
  tocopy.select()
  document.execCommand('copy')
	document.body.removeChild(tocopy)
	confirm.style.display = 'initial'
}

function setUpEmailClipper() {
	const copier = document.querySelector('#email-clipper')
	copier.onclick = copyToClipboard
}

function init() {
	setUpExpanders()
	setUpEmailClipper()
}

init()
