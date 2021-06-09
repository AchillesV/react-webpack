const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { webpack } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
/* const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all') */
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const path = require('path')

module.exports = {
  entry: ["./src/index.js"],
  output: {
    //输出目录
    path: path.join(__dirname, "../dist"),
    // 输出文件名
    filename: "bundle.js",
    publicPath: '', //cdn资源地址

  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      "@": path.join(__dirname, "../src"),
      pages: path.join(__dirname, "../src/page"),
      router: path.join(__dirname, "../src/router")
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            //loader: "babel-loader",
            loader: "happypack/loader?id=busongBabel"
          }
        ]
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          //MiniCssExtractPlugin.loader,    // 样式分离
          "style-loader",  // 创建style标签，将css添加进去
          "css-loader",  // 编译css
          "sass-loader"  // 编译scss
        ]
      },
      {
        test: /\.less$/,
        use: [
          //MiniCssExtractPlugin.loader,    // 样式分离
          "style-loader",  // 创建style标签，将css添加进去
          "css-loader",  // 编译css
          "less-loader"  // 编译scss
        ]
      },
/*       {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }, */
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: "url-loader",
          options: {
            outputPath: 'images',  // 图片的输出路径
            limit: 10*1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),  // 用于清除打包后的旧版本文件
    new HtmlWebpackPlugin({
      filename: 'index.html',  // 最终创建的文件名
      template: path.join(__dirname, '..','src/template.html')  //指定模板路径
    }),
    //new webpack.HotModuleReplacementPlugin(), // 热更新
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    //暴露全局变量
    //new webpack.ProvidePlugin({ $: 'jquery' }),
    //指定环境，定义环境变量
/*     new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify('http://localhost:9000')
      }
    }), */
    // 清除无用的css， css tree shaking
/*     new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
        path.resolve(__dirname, './src/*.js')
      ])
    }), */
/*     new AddAssetHtmlWebpackPlugin({
    filepath: path.resolve(__dirname, '../dll/jquery.dll.js') // 对应的 dll 文件路径
    }),
    new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, '..', 'dll/jquery-manifest.json')
    }), */
    new HappyPack({
      // 用唯一的标识符id，来代表当前的HappyPack是用来处理一类特定的文件
      id:'busongBabel',
      // 如何处理.js文件，用法和Loader配置中一样
      loaders:[{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      threadPool: happyThreadPool,
      verbose: true, // 输出日志
    }),
  ],
  performance: false, // 关闭性能提示
/*   devServer: {
    hot: true,
    contentBase: path.join(__dirname, "./dist"),
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: true, // 该选项的作用是所有的404都连接到index.html
    proxy: {
      //代理到后端的服务地址，会代理所有以api开头的请求
      "/api": "http://localhost:3000"

    }
  },
  optimization: {
    splitChunks: {
      chunks: "all",  // js代码按需加载，公共代码抽离
    },
    usedExports: true,
  } */
}