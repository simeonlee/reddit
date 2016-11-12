const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = (app, express) => {

  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, '../../', 'dist')));

  // The '/scripts' endpoint below serves up 'node_modules' buried in the
  // root directory which is inaccessible by index.html from /client
  app.use('/scripts', express.static(__dirname + '/../../node_modules'));

  // Enable React-Hot-Loader in development using webpack middleware
  if (process.env.NODE_ENV === 'development') {

    // Packages required for React-Hot-Loader as follows:
    const webpack = require('webpack');
    const config = require('../../webpack.config.js');
    const compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      hot: true,
      publicPath: config.output.publicPath,
      stats: {
        'colors': true,
        'chunks': false, // Reduces junk seen in terminal;
        'errors-only': true
      }
    }));
    app.use(require('webpack-hot-middleware')(compiler));

  }

}