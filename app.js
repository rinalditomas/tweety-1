const express = require( 'express' );
const morgan = require('morgan'); //middleware application logger
const nunjucks = require( 'nunjucks' );

const app = express(); // crea una instancia de una aplicación de express

// Configurando Nunjucks
app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views'); // apunta a nunjucks al directorio correcto para los templates


/****** MIDDLEWARES ******/
// Middleware static: serve images, CSS files, and JavaScript files in a directory named public
app.use(express.static('./public'))

/////***** Logger Middleware *****////
var fs = require('fs')
var path = require('path') //The path module provides utilities for working with file and directory paths.

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// createWriteStream: create a write stream (in append mode) into 'access.log'
// The path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
// __dirname: The directory name of the current module
// flags: 'a' - Open file for appending. The file is created if it does not exist.

app.use(morgan('combined', { stream: accessLogStream }))
// Logger Middleware: this middleware will log all request in the Apache combined format to STDOUT
// - stream : Output stream for writing log lines, defaults to process.stdout.
// - combined: Standard Apache combined log output.
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"

/////***** Logger Middleware *****////

/****** MIDDLEWARES ******/

let tweetsDeEjemplo = [
    { id: 1, name: "juan", content: "este es un tweeettt de juan" },
    { id: 2, name: "carlos", content: "este es un tweeettt de carlos" },
    { id: 3, name: "pepe", content: "este es un tweeettt de pepe" },
];

app.get('/', function (req, res) {
    res.render( 'index', { tweets: tweetsDeEjemplo });
});

app.listen(3000, function(){
    console.log('Estas escuhando en el puerto 3000')
});



