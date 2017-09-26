import * as webpack from 'webpack'
import * as path from 'path'
import * as angularExternals from 'webpack-angular-externals'
import * as rxjsExternals from 'webpack-rxjs-externals'

export default {
  entry: {
    'index.umd': './src/ia-comp-sidebar.component.ts',
    'index.umd.min': './src/ia-comp-sidebar.component.ts',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'ticktock'
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ]
  },
  externals: [
    angularExternals(),
    rxjsExternals()
  ],
  devtool: 'eval-source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'tsconfig.json'
        }
      }, {
        loader: 'angular2-template-loader'
      }],
      exclude: [
        /node_modules/,
        /\.(spec|e2e)\.ts$/
      ]
    }, {
      test: /\.json$/,
      use: 'json-loader'
    }, {
      test: /\.css$/,
      use: ['to-string-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: ['to-string-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.html$/,
      use: 'raw-loader'
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: ['url-loader']
    }]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(__dirname, 'src')
    ),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: true
    })
  ]
}
