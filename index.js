const express = require('express');
const axios = require('axios');

const app = express()

app.use(express.static('build'))

// https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY

//axios.get('https://context.tampere.fiware.cityvision.cloud/v2/entities?limit=800&offset=0&type=Streetlight%2CStreetlightControlCabinet%2CAmbientLightSensor%2CWasteContainer',
// { 'headers': { "FIWARE-Service": "tampere" } })


app.use('/tre', function (req, res, next) {
    axios.get('https://context.tampere.fiware.cityvision.cloud/v2/entities?limit=800&offset=0&type=Streetlight%2CStreetlightControlCabinet%2CAmbientLightSensor%2CWasteContainer',
            { 'headers': { "FIWARE-Service": "tampere" } })
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            //res.end(response.data);
            res.end(response.data+"");
            console.log('ok:', response.data);            
        })
        .catch(error => {
            res.status(500).send('[HT0001] Error in get data : '+error);
            console.log('[HT0001] Error in get data : ', error);
        });
    //console.log('Request Type:', req.method)

    //next()
    //res.end('completed');
})


app.listen(3000, () => console.log('Server running on port 3000'))
