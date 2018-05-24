import browserSync from "browser-sync";
import webpack from "webpack";
import config from "../webpack.config.dev";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import historyApiFallback from "connect-history-api-fallback";

const bundler = webpack(config);

browserSync({
    port: 8080,
    ui: {
        port: 8081
    },
    server: {
        baseDir: "src",
        middleware: [
            historyApiFallback(),
            webpackDevMiddleware(bundler, {
                // Dev middleware can't access config, so we provide publicPath
                publicPath: config.output.publicPath,
        
                // These settings suppress noisy webpack output so only errors are displayed to the console.
                noInfo: true,
                quiet: false,
                stats: {
                    assets: false,
                    colors: true,
                    version: false,
                    hash: false,
                    timings: false,
                    chunks: false,
                    chunkModules: false
                },
        
                // for other settings see
                // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
            }),
            webpackHotMiddleware(bundler)                    
        ]
    },

    files: [
        "src/*.html"
    ]
});