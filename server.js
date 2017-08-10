// steps to setup this server:
// 1. create "root" folder for the entire project...
// 2. create server.js file in root of directory...  i.e. the "entry point" for the server
// 3. create "public" folder to contain the website files... i.e. what the client has access to
// 4. git init...  create repository (creates .git folder)
// 5. create .gitignore file
// 6. npm init... create node project (answer prompts as needed... to create package.json info file)
// 7. npm install express
// 8. npm install body-parser
// 9. npm install request
// 10. start nodemon to run server...  listening on port 8080
// 11. when ready to push... do a git add -> git commit (i.e. this will prevent node_modules from ever being included in the git repo)... etc...

// https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-07-20&end_date=2017-07-27&api_key=Cix4VND0FLpGOpiijzv4N4peW53CLDEkoQgn4Zw6


var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var fs = require('fs')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// middleware static file server from public folder
app.use(express.static('./public'))

// create container array for any dangerous asteroids which meet the date picked on the home page's form
var dangerousAsteroids = []

// when client gets /, send our home page (index.html) which has a form asking for a date...
app.get('/', function(req,res){
  res.sendFile('/index.html', {root: './public'})
})

// this will send the date requested to nasa and receive the data from nasa on that chosen date
app.post('/nasa_api', function(req,res){
  // console.log('sending data to nasa');
  console.log(req.body);
  request.get('https://api.nasa.gov/neo/rest/v1/feed?start_date='+req.body.date+'&end_date='+req.body.date+'&api_key=Cix4VND0FLpGOpiijzv4N4peW53CLDEkoQgn4Zw6', function(error, response, body){
    // console.log(response)
    res.status(200).send(body);
  })
  // res.status(200).send("success");  // this is sort of like a return statement...
})



// set up which port the app object runs on
app.listen(8080)
