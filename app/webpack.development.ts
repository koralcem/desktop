import * as common from './webpack.common'

import * as webpack from 'webpack'
import * as merge from 'webpack-merge'

const config: webpack.Configuration = {
  devtool: 'source-map',
}

const mainConfig = merge({}, common.main, config)
const askPassConfig = merge({}, common.askPass, config)
const cliConfig = merge({}, common.cli, config)
const highlighterConfig = merge({}, common.highlighter, config)

const rendererConfig = merge({}, common.renderer, config, {
  entry: {
    renderer: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      (common.renderer.entry as webpack.Entry).renderer as string,
    ],
  },
  output: {
    publicPath: 'http://localhost:3000/build/',
  },
  module: {
    rules: [
      // This will cause the compiled CSS (and sourceMap) to be
      // embedded within the compiled javascript bundle and added
      // as a blob:// uri at runtime.
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})

const crashConfig = merge({}, common.crash, config, {
  module: {
    rules: [
      // This will cause the compiled CSS (and sourceMap) to be
      // embedded within the compiled javascript bundle and added
      // as a blob:// uri at runtime.
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      },
    ],
  },
})

export = [
  mainConfig,
  rendererConfig,
  askPassConfig,
  crashConfig,
  cliConfig,
  highlighterConfig,
]
