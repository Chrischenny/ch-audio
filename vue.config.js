module.exports={
    pages: {
        index: {
          entry: 'examples/main.js',
          template: 'public/index.html',
          filename: 'index.html'
        }
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
                .add('/packages').add('/examples')
                .end()
            .use('babel')
                .loader('babel-loader')
                .tap(options => {return options})
            .end();

        config.module
            .rule('images')
                .use('url-loader')
                    .loader('url-loader')
                    .tap(options=>Object.assign(options,{limit:120000}))
    },
    
    
}