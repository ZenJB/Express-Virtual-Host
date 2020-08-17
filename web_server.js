/**
 * Simple Web Server Class
 * (C) ZenJB (Ivan Teixeira)
 */
class web_server {
  constructor(hostname, appPath, useStaticFiles, useDB, cookiePrivateKey, cookieMaximumTime) {
    //#region Variables

    //Name of the host
    this.hostname = hostname;
    
    //Location of the app from Express (from the host not from master server)
    this.appPath = appPath;

    //Check if database is required for the project
    this.useDB = useDB;

    //Server's cookie private key
    this.cookiePrivateKey = cookiePrivateKey;

    //Maximum time a cookie is valid
    this.cookieMaximumTime = cookieMaximumTime;

    //#endregion

    //#region Dependencies

    //Express
    let express = require('express');
    //Cookie session for Express

    let session = require('express-session');

    //Express server's protection
    let helmet = require('helmet');

    //Database
    if(useDB)
      this.db = require('better-sqlite3')(`${appPath}/database.db`);
    
    //#endregion

    //Create the app from express
    this.app = express();

    //x-powered-by must be disabled for security reasons
    this.app.disable('x-powered-by');

    //Use helmet middleware in express
    this.app.use(helmet());

    //Defições dos Cookies
    this.app.use(session({
      name: 'session',
      keys: [this.cookiePrivateKey],
      cookie: { secure: true,
                httpOnly: true,
                domain: this.hostname,
                path: 'foo/bar',
                expires: this.cookieMaximumTime
              }
      })
    );
    //Servir os ficheiros HTML
    if(useStaticFiles) this.app.use(express.static(`${appPath}/html`));

    this.app.use(express.urlencoded({extended: false}));
  }
}
module.exports = web_server;