var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config()

var indexRouter = require('./app/index');
const db = require("./app/db/Conection")

var app = express();

db.connection.sync()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);

// Error 404, para cuando una ruta no esta definida
app.use((req, res, next) => {
	res.status(404).json({
		title: "Not Found",
		message: "La ruta que esta intentando acceder no existe.",
		status: 404
	})
	return;
});

// error handler
app.use(function (err, req, res, next) {
    let message = process.env.MODE === 'DEVELOPMENT' ? err.message :  "Fallo al ejecutar la peticion, puede intentarlo mas tarde";

    console.log( process.env.MODE )
	res.status(err.status || 500).json({
        title: "Error al procesar el recurso",
        message: message
    })
});

module.exports = app;
