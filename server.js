/* eslint-disable global-require */
/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');
const scraper = require('./scraper');

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0', // needed for Render deployment
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    console.log(`R: ${request} - H: ${h}`);
    return '404 NOT FOUND. TRY AGAIN';
  },
});

server.route({
  method: 'GET',
  path: '/ambito',
  handler: async () => {
    const result = await scraper.ambito();
    if (result) {
      return {
        status: true,
        servicio: 'ambito.com',
        respuesta: result,
      };
    }
    return {
      status: false,
      error: 'Ambito: Error con axios o algo',
    };
  },
});

server.route({
  method: 'GET',
  path: '/dolarito',
  handler: async () => {
    const result = await scraper.dolarito();
    if (result) {
      return {
        status: true,
        servicio: 'dolarito.ar',
        respuesta: result,
      };
    }
    return {
      status: false,
      error: 'Dolarito: Error con axios o algo',
    };
  },
});

server.route({
  method: 'GET',
  path: '/calculadoras',
  handler: async () => {
    const result = await scraper.calculadoras();
    if (result) {
      return {
        status: true,
        servicio: 'calculadoras',
        respuesta: result,
      };
    }
    return {
      status: false,
      error: 'Calculadoras: Error con axios o algo',
    };
  },
});

server.route({
  method: 'GET',
  path: '/dolarsanjuan',
  handler: async () => {
    const result = await scraper.dolarsanjuan();
    if (result) {
      return {
        status: true,
        servicio: 'dolarsanjuan.com',
        respuesta: result,
      };
    }
    return {
      status: false,
      error: 'DolarSanJuan: Error con axios o algo',
    };
  },
});

server.route({
  method: 'GET',
  path: '/dolarsi',
  handler: async () => {
    const result = await scraper.dolarsi();
    if (result) {
      return {
        status: true,
        servicio: 'dolarsi.com',
        respuesta: result,
      };
    }
    return {
      status: false,
      error: 'DolarSI: Error con axios o algo',
    };
  },
});

server.route({
  method: 'GET',
  path: '/cronista',
  handler: async () => {
    const result = await scraper.cronista();
    if (result) {
      return {
        status: true,
        servicio: 'cronista.com',
        respuesta: result,
      };
    }
    return {
      status: false,
      error: 'Cronista: Error con axios o algo',
    };
  },
});

server.route({
  method: 'GET',
  path: '/cronistacripto',
  handler: async () => {
    const result = await scraper.cronistacripto();
    if (result) {
      return {
        status: true,
        servicio: 'cronista.com Criptomonedas',
        respuesta: result,
      };
    }
    return {
      status: false,
      error: 'Cronista Crypto: Error con axios o algo',
    };
  },
});

server.route({
  method: 'GET',
  path: '/bluelytics',
  handler: async () => {
    const result = await scraper.bluelytics();
    if (result) {
      return {
        status: true,
        servicio: 'BlueLytics.com.ar',
        respuesta: result,
      };
    }
    return {
      status: false,
      error: 'Bluelytics: Error con axios o algo',
    };
  },
});

const init = async () => {
  await server.register([
    {
      plugin: require('@hapi/inert'),
      options: {},
    },
    {
      plugin: require('hapi-pino'),
      options: {
        prettyPrint: true,
        logEvents: ['response', 'onPostStart'],
      },
    }]);
  await server.start();
  console.log(`Servidor corriendo en: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
