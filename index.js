const path = require('path');
const express = require('express');
const es6Renderer = require('express-es6-template-engine');

const app = express()
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, './dist')));

app.get('/', (req, res) => res.render('index'));

app.listen(4200, () => {
    console.log('running!');
});
