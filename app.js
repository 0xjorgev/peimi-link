const express = require('express');
const app = express();

// Define the AASA JSON structure
const appleAppSiteAssociation = {
    applinks: {
        details: [
            {
                appID: ["698PA5CB65.io.dynamiteapps.paimi","7G2PMCVCH6.io.dynamiteapps.paimi"],
                components: [
                    {
                        "#": "no_universal_links",
                        "exclude": true,
                        "comment": "Matches any URL whose fragment equals no_universal_links and instructs the system not to open it as a universal link"
                    },
                    {
                        "/": "/p2p/*",
                        "comment": "Matches any URL whose path starts with /p2p/ "
                    }
                ]
            }
        ]
    }
};

// Middleware to set correct Content-Type
const setJSONHeader = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache' );
    next();
};

// Serve AASA at both paths
app.get('/.well-known/apple-app-site-association', setJSONHeader, (req, res) => {
    res.send(appleAppSiteAssociation);
});

app.get('/apple-app-site-association', setJSONHeader, (req, res) => {
    res.send(appleAppSiteAssociation);
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on:${PORT}`);
});