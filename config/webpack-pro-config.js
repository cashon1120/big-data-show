class WebpackProConfig {
  apply(compiler) {
    console.log('自定义插件')
    compiler.plugin('emit', (compilation, callback) => {
      compilation.chunks.forEach(chunk => {
        chunk.files.forEach(filename => {
          let source = compilation.assets[filename].source()
          source = source.replace(/console.log\(\w+\)/g, '')
          compilation.assets[filename]={
            source: () => source,
            size: () => source.lengtht
          }
        })
      })
      callback()
    })
  };
}

module.exports = WebpackProConfig