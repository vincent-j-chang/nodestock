// Stock Market Portfolio App by Vincent Chang

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path')
const request = require('request')
const bodyParser = require('body-parser');



// use the default port in their settings OR use 5000
const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API KEY pk_662c636e819146319df2e6cd25f0e9e7
// create call_api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_662c636e819146319df2e6cd25f0e9e7',
    {json: true}, (err, res, body) => {
    
    if (err) {return console.log(err);}
    if (res.statusCode === 200){
        //console.log(body);
        finishedAPI(body);
        };
    });

};


// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Set handlebar index GET routes
// "/" means the homepage
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
            stock: doneAPI
        });
    }, "fb");   
});

// Set handlebar index POST routes
// "/" means the homepage
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
        //posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
            
        });
    }, req.body.stock_ticker);   
});


// create about page route
app.get('/about.html', function (req, res) {
    res.render('about')
});

// Set static folder to create a path and route
// include the path variable at the top        
app.use(express.static(path.join(__dirname, 'public')));

// app refers the variable = express() at the top
// '=> creates a message
app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
