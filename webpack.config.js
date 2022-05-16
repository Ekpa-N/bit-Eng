const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: "/",
    },
    devServer: {
        port: 4040,
        static: path.resolve(__dirname, './dist'),
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ]
            },
        ]
    }
}