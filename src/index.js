~function() {
  const d3 = require('d3')
  const config = require('./config')

  function display() {
    d3.select('body')
      .append('div')
      .text(this.responseText)
  }

  var req = new XMLHttpRequest()
  req.addEventListener('load', display)
  req.open('GET', config.dataUrl)
  req.send()
}()
