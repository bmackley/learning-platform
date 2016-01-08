module.exports = {
    entry: {
        'angular2': [
            './www/node_modules/rxjs',
            './www/node_modules/reflect-metadata',
            './www/node_modules/angular2/core',
            './www/node_modules/angular2/router',
            './www/node_modules/angular2/http',
            './www/node_modules/angular2/common'
        ],
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
