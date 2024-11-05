const express = require('express');
const path = require('path');

/** FEEDBACK: Great job!  */

const app = express()
const PORT = 8080;
const pathToDistFolder = path.join(__dirname, '../vite-project/dist');
const serverStatic = express.static(pathToDistFolder);

const logRoutes = (req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next(); // Passes the request to the next middleware/controller
};

app.use(logRoutes)
app.use(serverStatic);

const serveHello = (req, res, next) => {
    const name = req.query.name || "stranger";
    res.send(`Hello, ${name}!`);
};

const serveAbout = (req, res, next) => {
    res.send('<h1>about<h1>');
}

const serveIntroduction = (req, res, next) => {
    const name = req.query.name || "Adrian"
    res.send(`<h1>Hello my name ${name} and I am a fellow at the marcy lab school.`)
}

const serveData = (req, res, next) => {
    const data = [{ name: 'adrian' }, { name: 'chris' }, { name: 'ryan' }];
    res.send(data);
}

app.get('/api/hello', serveHello)
app.get('/api/about', serveAbout)
app.get('/api/intro', serveIntroduction)
app.get('/api/data', serveData);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});