const express = require('express');
const axios = require('axios');

const app = express()

app.use(express.static('build'))

// https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY

//axios.get('https://context.tampere.fiware.cityvision.cloud/v2/entities?limit=800&offset=0&type=Streetlight%2CStreetlightControlCabinet%2CAmbientLightSensor%2CWasteContainer',
// { 'headers': { "FIWARE-Service": "tampere" } })

//https://sthdata.tampere.fiware.cityvision.cloud/v2/entities/KV-0128-263?attrs=illuminanceLevel%2CactivePower&fromDate=1561986246958&toDate=156259104695


app.use('/tre', function (req, res, next) {
    axios.get('https://sthdata.tampere.fiware.cityvision.cloud/v2/entities/KV-0121-314?attrs=illuminanceLevel%2CactivePower&fromDate=1561986246958&toDate=156259104695',
            { 'headers': { "FIWARE-Service": "tampere" } })
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            //res.end(response.data);
            res.end(JSON.stringify(response.data));
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
