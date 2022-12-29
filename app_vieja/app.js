//
// Hapi, Cheerio and Axios example to scrap some website
// to get data
//
require('dotenv').config();

'use strict'

const Hapi = require('@hapi/hapi');
const scraper = require("./scraper");

// const config = require('./config.js');

// console.log(`NODE_ENV=${config.NODE_ENV}`);
// console.log(`HOST=${config.HOST}`);
// console.log(`PORT=${config.PORT}`);

const PORT = process.env.PORT || 3000

const server = new Hapi.Server({
    debug: {
        request: ['error']
    },
    host: process.env.HOST,
    port: PORT
})

async function launchIt () {
    
    await server.register({
        plugin: require('hapi-dev-errors'),
        options: {
            showErrors: process.env.NODE_ENV !== 'production'
        }
    })

    server.route({
        method: "GET",
        path: "/",
        handler: async (request, h) => {
            return {"Hello":"Welcome"}
        }
    });

    server.route({
        method: "GET",
        path: "/dolarsanjuan",
        handler: async (request, h) => {
            const result = await scraper.dolarsanjuan();
            if (result) {
                return {
                    status: true,
                    servicio: "dolarsanjuan.com",
                    respuesta: result
                };
            }
            else {
                return {
                    status: false,
                    error: "Error con axios o algo"
                };
            }
            
        }
    });

    server.route({
        method: "GET",
        path: "/dolarsi",
        handler: async (request, h) => {
            const result = await scraper.dolarsi();
            if (result) {
                return {
                    status: true,
                    servicio: "dolarsi.com",
                    respuesta: result
                };
            }
            else {
                return {
                    status: false,
                    error: "Error con axios o algo"
                };
            }
            
        }
    });

    server.route({
        method: "GET",
        path: "/cronista",
        handler: async (request, h) => {
            const result = await scraper.cronista();
            if (result) {            
                return {
                    status: true,
                    servicio: "cronista.com",
                    respuesta: result
                };
            }
            else {
                return {
                    status: false,
                    error: "Error con axios o algo"
                };
            }
            
        }
    });

    server.route({
        method: "GET",
        path: "/cronistacripto",
        handler: async (request, h) => {
            const result = await scraper.cronistacripto();
            if (result) {
                return {
                    status: true,
                    servicio: "cronista.com Criptomonedas",
                    respuesta: result
                };
            }
            else {
                return {
                    status: false,
                    error: "Error con axios o algo"
                };
            }
            
        }
    });

    server.route({
        method: "GET",
        path: "/bluelytics",
        handler: async (request, h) => {
            const result = await scraper.bluelytics();
            if (result) {
                return {
                    status: true,
                    servicio: "BlueLytics.com.ar",
                    respuesta: result
                };
            }
            else {
                return {
                    status: false,
                    error: "Error con axios o algo"
                };
            }
            
        }
    });

    await server.start()
    console.log('Server ejecutando en: ' + server.info.uri);
}

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

launchIt().catch((err) => {
    console.log(err)
    process.exit(1)
});