// Stock Market Portfolio App by Vincent Chang

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path')


const PORT = process.env.PORT || 5000;
// use the default port in their settings OR use 5000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// Set Handlebars Middleware

app.get('/', function (req, res) {
    res.render('home', {
        stuff: "This is stuff.."
    });
});
// Set handlebar routes
// "/" means the homepage

app.use(express.static(path.join(__dirname, 'public')));
// Set static folder to create a path and route
// include the path variable at the top                   


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
// app refers the variable = express() at the top
// '=> creates a message