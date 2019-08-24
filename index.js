
const express = require('express');
const app = express();

// body to json
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


app.get('/', (req, res) => {
    res.send('Simple REST API');
});

app.get('/sample-nodejs', (req, res) => {
    res.send('Sample Node.js Application!!');
});

const courses = [
    { id: 1, name: 'computer science'},
    { id: 2, name: 'information technology'},
    { id: 3, name: 'business intelligence'},
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses/create', (req, res) => {
    console.log(req.body.name)
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

