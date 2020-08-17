   ///////////////////////////////
  // vHost Manager V1.0.0      //
 // (C) ZenJB (Ivan Teixeira) //
///////////////////////////////

//List of the hosts and the app of those hosts
const appList = [];

/**
 * Add a host into our server
 * hostname => hostname from the webpage (Example mywebsite.org)
 * appLocation => Location of the JavaScript file containing the server to be used
 */
exports.addHost = (hostname, appLocation) => {
    var host                = new Object();
    var server              = require(appLocation);
    host["hostname"]        = hostname;
    host["app"]             = new server(hostname).app;
    appList.push(host);

};

/**
 * Remove a host from our server
 * hostname => hostname from the webpage (Example mywebsite.org)
 */
exports.removeHost = (hostname) => {
    appList.forEach(host => {
        if(host["hostname"] === hostname)
        {
            appList.splice(appList.indexOf(host), 1);
        }
    });
};

/**
 * Get a certain's host app
 * hostname => hostname from the webpage (Example mywebsite.org)
 */
exports.getHost = (hostname) => {
    appList.forEach(host => {
        if(host["hostname"] === hostname)
            return host;
    });
    return null;
};

/**
 * Check if a certain host exists
 * hostname => hostname from the webpage (Example mywebsite.org)
 */
exports.hostExists = (hostname) => {
    let resp = false;
    appList.forEach(host => {
        if(host["hostname"] === hostname)
            resp = true;
    });
    return resp;
};

/**
 * Get all virtual hosts in the master server
 */
exports.getHostList = () => {
    let allHosts = [];
    appList.forEach(host => {
        allHosts.push(host["hostname"]);
    });
    return allHosts;
};

/**
 * Middleware. Must be included in the master server in order for the virtual host to work
 */
exports.middleware = () => (req, res, next) => {
    //Get the requested host
    const requestedHost = req.headers.host.split(':')[0];

    //Show the host and the requested url in the console
    console.log(`[${requestedHost}] ${req.url}`);

    for(var hostID = 0; hostID < appList.length; hostID++)
    {
        if(appList[hostID].hostname === requestedHost)
            return appList[hostID].app(req,res,next);
    }
    next();
};