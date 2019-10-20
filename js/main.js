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
		body.style.height = body.scrollHeight + "px"
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

function setUpModeSwitcher() {
  // get previous saved value from localStorage if it exists
  const rememberedValue = localStorage.getItem('chosen-color-scheme');
  // check media query
  const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
  // set inital value
  window.mode = rememberedValue || (prefersLightMode ? 'light' : 'dark')
  switchMode(window.mode)

  // set up event listener for toggle
  const toggle = document.querySelector('#toggle')

  toggle.addEventListener('click', () => {
    window.mode = window.mode === 'light' ? 'dark' : 'light'
    localStorage.setItem('chosen-color-scheme', window.mode);
    switchMode(window.mode)
  })
}

function switchMode(mode) {
  const darkCSS = document.querySelector('link[rel=stylesheet][href*=dark]')
  const lightCSS = document.querySelector('link[rel=stylesheet][href*=light]')
  const ALL = 'all'
  const NOT_ALL = 'not all'

  if (mode === 'light') {
    lightCSS.media = ALL
    lightCSS.disabled = false
    darkCSS.media = NOT_ALL
    darkCSS.disabled = true
  } else {
    lightCSS.media = NOT_ALL;
    lightCSS.disabled = true;
    darkCSS.media = ALL;
    darkCSS.disabled = false;
  }
}

function credits() {
  const credits = `
  CREDITS
  =======

  Dark and light mode icons found via the Noun Project.
  https://thenounproject.com


  The moon icon is by Three Six Five.
  The sun icon is by Karan.
  `
  console.log(credits)
}

function init() {
  credits()
	setUpExpanders()
  setUpEmailClipper()
  setUpModeSwitcher()
}

init()
