module.exports = {
    entry: {
        'angular2': [
            './node_modules/rxjs',
            './node_modules/reflect-metadata',
            './node_modules/angular2/core',
            './node_modules/angular2/router',
            './node_modules/angular2/http',
            './node_modules/angular2/common',
            './node_modules/angular2/bundles/angular2-polyfills.js'
        ],
        'babel-polyfill': './node_modules/babel-polyfill/dist/polyfill.min.js',
        'redux': './node_modules/redux/dist/redux.min.js',
        'app': './www/boot.ts'
    },
    output: {
        path: './www/dist',
        filename: '[name].dist.js'
    },
    /*resolve: {
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
    },*/
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'babel-loader?presets[]=es2015,presets[]=stage-3!ts',
                exclude: [ /node_modules/ ]
            }
        ]
    }
};
