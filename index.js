
const express = require('express');
const app = express();

// request.body to json
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const courses = [
    { id: 1, name: 'computer science' },
    { id: 2, name: 'information technology' },
    { id: 3, name: 'business intelligence' },
];

app.get('/sample-nodejs', (req, res) => {
    res.send(courses);
});

app.post('/sample-nodejs/add-course', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    console.log(course)
    res.send(course);
});

