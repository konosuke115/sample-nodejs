// express
const express = require('express');
const app = express();

// request base
var request = require('request');
var async = require('async');

// request.body to json
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


// hostnames = service names
var hostnames = ["apple", "strawberry", "kiwi", "pear", "pineapple", "banana", "grape", "peach"]

// GET ver query
app.get('/fruits', async (req, res) => {

    //console.log("start");

    headers = await get_forward_headers(req);

    var times;
    if (!req.query.times) {
        res.send('no times query');
    } else {
        times = Number(req.query.times) - 1;
    }

    var count;
    if (req.query.count) {
        count = Number(req.query.count) + 1;
        console.log(count);
    } else {
        count = 1
        console.log(count);
    }

    if (req.query.times > 1) {

        options = {
            url: 'http://' + choose_at_random(hostnames) + ":" + port + '/fruits',
            //url: 'http://localhost:' + port + '/fruits',
            qs: { "times": times, "count": count }
        }

        // http get request
        request.get(options, function (error, response, body) {
            console.log(count + ": " + req.hostname);
            res.send(count + ": " + req.hostname + "\n" + body);
        })

    } else {

        console.log(req.hostname);
        res.send(count + ": " + req.hostname)
    }

});

/*
// GET ver params
app.get('/fruits/:times', (req, res) => {

    if (req.params.times > 0) {
        // request options
        times = req.params.times - 1;
        var options = {
            url: 'http://' + choose_at_random(hostnames) + '/fruits/' + times,
        }
        // http post request 
        request.get(options, function (error, response, body) {
            console.log(req.hostname);
            res.send(req.hostname + "\n" + body);
        })
    } else {
        console.log(req.hostname);
        res.send(req.hostname)
    }
});
*/

/*
// Post 
app.post('/fruits', (req, res) => {

    if (req.body.times > 1) {
        // request options
        var options = {
            url: 'http://' + choose_at_random(req.body.fruits) + '/fruits',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "times": req.body.times - 1,
                "hostname": req.body.fruits
            })
        }
        // http post request 
        request.post(options, function (error, response, body) {
            console.log(req.hostname + " -> " + body);
            res.send(req.hostname + " -> " + body);
        })
    } else {
        console.log(req.hostname);
        res.send(req.hostname)
    }

});
*/


async function get_forward_headers(req) {

    incoming_headers = ['x-request-id',
        'x-b3-traceid',
        'x-b3-spanid',
        'x-b3-parentspanid',
        'x-b3-sampled',
        'x-b3-flags',
        'x-ot-span-context',
        'x-datadog-trace-id',
        'x-datadog-parent-id',
        'x-datadog-sampled'
    ];

    var headers = {};
    async.each(incoming_headers, (item, callback) => {

        if (req.is(item)) {
            headers[item] = req.get(item);
            callback();
        } else {
            console.log("no header : " + item);
            callback();
        }

    });

    console.log(headers);
    return headers;
}


/**
 * 配列の値からランダムで1つ選択して返す
 * @param arr arrayData (required) 選択する配列の内容
 * @return str
 */
function choose_at_random(arrayData) {
    var arrayIndex = Math.floor(Math.random() * arrayData.length);
    return arrayData[arrayIndex];
}