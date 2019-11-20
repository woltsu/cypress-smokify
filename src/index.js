const browserify = require('@cypress/browserify-preprocessor')
const smokify = require('./smokify')

module.exports = config => {
  const transform = [...browserify.defaultOptions.browserifyOptions.transform]
  if (config.env.smokify) transform.push(smokify(config.env.smokify))
  const options = {
    ...browserify.defaultOptions,
    browserifyOptions: {
      ...browserify.defaultOptions.browserifyOptions,
      transform
    }
  }

  return browserify(options)
}
