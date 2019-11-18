const through = require('through')
const falafel = require('falafel')

const skippedify = node => node.update('it.skip' + node.source().substr(2))

const isIt = node => {
  return node.type === 'CallExpression' && node.callee && node.callee.type === 'Identifier' && node.callee.name === 'it'
}

const process = (source, percentage = 0.5) => {
  const itNodes = []

  const nodes = falafel(source, node => {
    if (isIt(node)) itNodes.push(node)
  })

  itNodes
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(percentage * itNodes.length))
    .forEach(skippedify)

  return nodes.toString()
}

module.exports = percentage => () => {
  let data = ''
  return through(
    buf => (data += buf),
    function() {
      this.queue(process(data, percentage))
      this.emit('end')
    }
  )
}
