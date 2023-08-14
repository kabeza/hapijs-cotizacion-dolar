"use strict";

const Hapi = require("@hapi/hapi");
const scraper = require("./scraper");

const server = Hapi.server({
  port: 3000,
  host: "0.0.0.0" // needed for Render deployment
});

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "404 NOT FOUND. TRY AGAIN";
    }
  });

  server.route({
    method: "GET",
    path: "/ambito",
    handler: async (request, h) => {
        const result = await scraper.ambito();
        if (result) {
            return {
                status: true,
                servicio: "ambito.com",
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

const init = async () => {

  await server.register([
    {
      plugin: require("@hapi/inert"),
      options: {}
    },
    {
      plugin: require("hapi-pino"),
      options: {
        prettyPrint: true,
        logEvents: ["response", "onPostStart"]
      }
    }]);

  await server.start();
  console.log(`Servidor corriendo en: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
