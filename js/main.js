---
---

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
  if (copier) {
    copier.onclick = copyToClipboard
  }
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

  if (toggle) {
    toggle.addEventListener('click', () => {
      window.mode = window.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('chosen-color-scheme', window.mode);
      switchMode(window.mode)
    })
  }
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
  setUpEmailClipper()
  setUpModeSwitcher()
}

init()
