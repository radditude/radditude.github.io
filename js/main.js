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

setUpEmailClipper()
