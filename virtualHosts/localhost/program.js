class program {
    constructor(hostname){
        //#region Variables

        //Server hostname
        this.hostname = hostname;

        //#endregion

        //#region Dependencies

        //Web server class
        let web_server = require('./../../web_server');

        //#endregion

        //Create the web server
        this.server = new web_server(hostname, __dirname, false, false, '12345', '0');

        //Get the app from web server
        this.app = this.server.app;

        //#region Put your code here

        //Send hello world for all get requests to the path /
        this.app.get('/', (req,res) => {
            res.header(200).send(`Hello World from ${this.hostname}!`);
        });

        //Return 404 for the rest of the get requests
        this.app.get('*', (req,res) => {
            res.header(404).send(404);
        });

        //Return 404 for the rest of the post requests
        this.app.post('*', (req,res) => {
            res.header(404).send(404);
        });

        //#endregion
    }
}
module.exports = program;