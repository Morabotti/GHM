export const copyToClipboard = (text: string) => {
  /*  eslint-disable @typescript-eslint/no-explicit-any */
  if ((navigator as any).clipboard) {
    /*  eslint-disable @typescript-eslint/no-explicit-any */
    (navigator as any).clipboard.writeText(text)
    return
  }
  var span = document.createElement('span')
  span.textContent = text

  span.style.whiteSpace = 'pre'

  document.body.appendChild(span)

  var selection = window.getSelection()
  var range = window.document.createRange()
  if (selection) {
    selection.removeAllRanges()
    range.selectNode(span)
    selection.addRange(range)
  }

  window.document.execCommand('copy')

  if (selection) {
    selection.removeAllRanges()
  }
  window.document.body.removeChild(span)
}

export const navigateTo = (text: string) => {
  const link = document.createElement('a')

  link.href = text
  link.setAttribute('target', '_blank')
  document.body.appendChild(link)
  link.click()
}
