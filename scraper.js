/* eslint-disable eqeqeq */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
const cheerio = require('cheerio');
const axios = require('axios').default;
const moment = require('moment');

const bluelytics = async () => {
  const url2Get = 'https://api.bluelytics.com.ar/v2/latest';
  let datosFinal = [];
  try {
    await axios
      .get(url2Get)
      .then((resp) => {
        datosFinal = resp.data;
      })
      .catch(() => {
        datosFinal = [];
      });
    const retorno = [];
    const fecha = moment(datosFinal.last_update).format('DD/MM/YYYY, H:mm:ss');

    retorno.push({
      cotizacion: {
        titulo: 'Dolar Oficial',
        empresas: [
          {
            nombre: 'bluelytics.com.ar',
            variacion: '',
            venta: datosFinal.oficial.value_sell,
            compra: datosFinal.oficial.value_buy,
            fecha,
          },
        ],
      },
    });
    retorno.push({
      cotizacion: {
        titulo: 'Dolar Blue',
        empresas: [
          {
            nombre: 'bluelytics.com.ar',
            variacion: '',
            venta: datosFinal.blue.value_sell,
            compra: datosFinal.blue.value_buy,
            fecha,
          },
        ],
      },
    });
    retorno.push({
      cotizacion: {
        titulo: 'Euro Oficial',
        empresas: [
          {
            nombre: 'bluelytics.com.ar',
            variacion: '',
            venta: datosFinal.oficial_euro.value_sell,
            compra: datosFinal.oficial_euro.value_buy,
            fecha,
          },
        ],
      },
    });
    retorno.push({
      cotizacion: {
        titulo: 'Euro Blue',
        empresas: [
          {
            nombre: 'bluelytics.com.ar',
            variacion: '',
            venta: datosFinal.blue_euro.value_sell,
            compra: datosFinal.blue_euro.value_buy,
            fecha,
          },
        ],
      },
    });
    return retorno;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// https://criptoya.com/api/dolar
const criptoya = async () => {
  const url2Get = 'https://criptoya.com/api/dolar';
  let datosFinal = [];
  try {
    await axios
      .get(url2Get)
      .then((resp) => {
        datosFinal = resp.data;
      })
      .catch(() => {
        datosFinal = [];
      });
    const retorno = [];

    retorno.push({
      cotizacion: {
        titulo: 'Dolar Oficial',
        empresas: [
          {
            nombre: 'criptoya.com.ar',
            variacion: datosFinal.oficial.variation,
            venta: datosFinal.oficial.price,
            compra: datosFinal.oficial.price,
            fecha: moment.unix(datosFinal.oficial.timestamp).format('DD/MM/YYYY, H:mm:ss'),
          },
        ],
      },
    });

    retorno.push({
      cotizacion: {
        titulo: 'Dolar Tarjeta',
        empresas: [
          {
            nombre: 'criptoya.com.ar',
            variacion: datosFinal.tarjeta.variation,
            venta: datosFinal.tarjeta.price,
            compra: datosFinal.tarjeta.price,
            fecha: moment.unix(datosFinal.tarjeta.timestamp).format('DD/MM/YYYY, H:mm:ss'),
          },
        ],
      },
    });

    retorno.push({
      cotizacion: {
        titulo: 'Dolar Blue',
        empresas: [
          {
            nombre: 'criptoya.com.ar',
            variacion: datosFinal.blue.variation,
            venta: datosFinal.blue.ask,
            compra: datosFinal.blue.bid,
            fecha: moment.unix(datosFinal.blue.timestamp).format('DD/MM/YYYY, H:mm:ss'),
          },
        ],
      },
    });

    retorno.push({
      cotizacion: {
        titulo: 'Dolar MEP AL30 24H',
        empresas: [
          {
            nombre: 'criptoya.com.ar',
            variacion: datosFinal.mep.al30['24hs'].variation,
            venta: datosFinal.mep.al30['24hs'].price,
            compra: datosFinal.mep.al30['24hs'].price,
            fecha: moment.unix(datosFinal.mep.al30['24hs'].timestamp).format('DD/MM/YYYY, H:mm:ss'),
          },
        ],
      },
    });

    retorno.push({
      cotizacion: {
        titulo: 'Dolar MEP AL30 CI',
        empresas: [
          {
            nombre: 'criptoya.com.ar',
            variacion: datosFinal.mep.al30.ci.variation,
            venta: datosFinal.mep.al30.ci.price,
            compra: datosFinal.mep.al30.ci.price,
            fecha: moment.unix(datosFinal.mep.al30.ci.timestamp).format('DD/MM/YYYY, H:mm:ss'),
          },
        ],
      },
    });

    retorno.push({
      cotizacion: {
        titulo: 'Dolar MEP GD30 24H',
        empresas: [
          {
            nombre: 'criptoya.com.ar',
            variacion: datosFinal.mep.gd30['24hs'].variation,
            venta: datosFinal.mep.gd30['24hs'].price,
            compra: datosFinal.mep.gd30['24hs'].price,
            fecha: moment.unix(datosFinal.mep.gd30['24hs'].timestamp).format('DD/MM/YYYY, H:mm:ss'),
          },
        ],
      },
    });

    retorno.push({
      cotizacion: {
        titulo: 'Dolar MEP GD30 CI',
        empresas: [
          {
            nombre: 'criptoya.com.ar',
            variacion: datosFinal.mep.gd30.ci.variation,
            venta: datosFinal.mep.gd30.ci.price,
            compra: datosFinal.mep.gd30.ci.price,
            fecha: moment.unix(datosFinal.mep.gd30.ci.timestamp).format('DD/MM/YYYY, H:mm:ss'),
          },
        ],
      },
    });

    retorno.push({
      cotizacion: {
        titulo: 'Crypto - USDT',
        empresas: [
          {
            nombre: 'criptoya.com.ar',
            variacion: datosFinal.cripto.usdt.variation,
            venta: datosFinal.cripto.usdt.ask,
            compra: datosFinal.cripto.usdt.bid,
            fecha: moment.unix(datosFinal.cripto.usdt.timestamp).format('DD/MM/YYYY, H:mm:ss'),
          },
        ],
      },
    });

    retorno.push({
      cotizacion: {
        titulo: 'Crypto - USDC',
        empresas: [
          {
            nombre: 'criptoya.com.ar',
            variacion: datosFinal.cripto.usdc.variation,
            venta: datosFinal.cripto.usdc.ask,
            compra: datosFinal.cripto.usdc.bid,
            fecha: moment.unix(datosFinal.cripto.usdc.timestamp).format('DD/MM/YYYY, H:mm:ss'),
          },
        ],
      },
    });

    return retorno;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const dolarsanjuan = async () => {
  const url2Get = 'https://dolarsanjuan.com';
  try {
    const response = await axios.get(url2Get);
    const $ = cheerio.load(response.data);
    const resp = [];
    $('.sub').each(function (i) {
      resp[i] = {
        cotizacion: {
          titulo: $(this)
            .find('.divisa-name')
            .text()
            .trim()
            .replace(/(\r\n|\n|\r|\t)/gm, ''),
          empresas: [
            {
              nombre: 'dolarsanjuan.com',
              variacion: '',
              compra: $(this).find('.sub-in').first().find('.precioC')
                .text(),
              venta: $(this).find('.sub-in').last().find('.precioC')
                .text(),
              fecha: $(this)
                .find('.actualiz')
                .text()
                .replace(/(\r\n|\n|\r|\t)/gm, ''),
            },
          ],
        },
      };
    });
    return resp;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const invertironline = async () => {
  const url2Get = 'https://iol.invertironline.com/mercado/cotizaciones/argentina/monedas';
  try {
    const response = await axios.get(url2Get);
    const $ = cheerio.load(response.data);

    const retorno = [];

    const sel = 'table#cotizaciones tr';
    $(sel).each(function (i) {
      if (i > 0) {
        const tmpTD = [];
        $(this).find('td').each(function () {
          tmpTD.push($(this).text().trim());
        });
        console.log(`tmpTD: ${tmpTD}`);
        retorno.push({
          cotizacion: {
            titulo: tmpTD[0].replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g, ''),
            empresas: [
              {
                nombre: 'InvertirOnline.com',
                variacion: tmpTD[4],
                compra: parseFloat(tmpTD[1]).toFixed(2),
                venta: parseFloat(tmpTD[2]).toFixed(2),
                fecha: tmpTD[3],
              },
            ],
          },
        });
      }
    });
    return retorno;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const ambito = async () => {
  const arreUrls = [];
  arreUrls.push({
    titulo: 'Dólar Oficial',
    url: 'https://mercados.ambito.com//dolar/oficial/variacion',
  });
  arreUrls.push({
    titulo: 'Dólar Nación',
    url: 'https://mercados.ambito.com/dolarnacion/variacion',
  });
  arreUrls.push({
    titulo: 'Dólar Blue',
    url: 'https://mercados.ambito.com//euro/informal/variacion',
  });
  arreUrls.push({
    titulo: 'Dólar Turista',
    url: 'https://mercados.ambito.com//dolarturista/variacion',
  });
  arreUrls.push({
    titulo: 'Dólar Qatar',
    url: 'https://mercados.ambito.com//dolarqatar/variacion',
  });
  arreUrls.push({
    titulo: 'Dólar Crypto',
    url: 'https://mercados.ambito.com//dolarcripto/variacion',
  });
  arreUrls.push({
    titulo: 'Euro Oficial',
    url: 'https://mercados.ambito.com//euro/variacion',
  });
  arreUrls.push({
    titulo: 'Euro Blue',
    url: 'https://mercados.ambito.com//euro/informal/variacion',
  });

  // https://mercados.ambito.com//dolar/oficial/variacion
  // https://mercados.ambito.com//euro/informal/variacion
  // https://mercados.ambito.com//dolarqatar/variacion
  // https://mercados.ambito.com//dolar/mayorista/variacion
  // https://mercados.ambito.com//dolarahorro/variacion
  // https://mercados.ambito.com//dolardelujo/variacion
  // https://mercados.ambito.com//dolarturista/variacion
  // https://mercados.ambito.com//dolarcripto/variacion
  // https://mercados.ambito.com//euro//variacion
  // https://mercados.ambito.com/dolar/informal/variacion
  // https://mercados.ambito.com/dolarnacion/variacion

  try {
    const retorno = [];
    for (let item in arreUrls) {
      try {
        let titulo = arreUrls[item].titulo;
        let url2Get = arreUrls[item].url;
        await axios.get(url2Get).then((resp) => {
          retorno.push({
            cotizacion: {
              titulo: titulo,
              empresas: [
                {
                  nombre: "ambito.com",
                  variacion: resp.data.variacion,
                  venta: resp.data.venta,
                  compra: resp.data.compra,
                  fecha: resp.data.fecha,
                },
              ],
            },
          });
        });
      } catch (error) {}
    }
    return retorno;
  } catch (error) {
    console.log('Error en ambito: ', error);
    return false;
  }
};

// let elem = $('*[data-indice="/dolarturista"]').html();
const cronista = async () => {
  const url2Get = 'https://www.cronista.com/MercadosOnline/dolar.html';
  try {
    const response = await axios.get(url2Get, {
      responseType: 'arraybuffer',
      responseEncoding: 'binary',
    });

    const $ = cheerio.load(response.data.toString('latin1'), {
      decodeEntities: false,
    });
    const retorno = [];

    $('td.name').each((index, element) => {
      const name = $(element).find('a').text().trim();
      const buyValue = $(element)
        .siblings('.buy')
        .find('.buy-value')
        .clone()
        .children('.currency')
        .remove()
        .end()
        .text()
        .trim();
      const sellValue = $(element)
        .siblings('.sell')
        .find('.sell-value')
        .clone()
        .children('.currency')
        .remove()
        .end()
        .text()
        .trim();
      const percentage = $(element)
        .siblings('.percentage')
        .find('.arrow')
        .next()
        .text()
        .trim();
      const date = $(element)
        .siblings('.date')
        .clone()
        .children('span')
        .remove()
        .end()
        .text()
        .trim()
        .replace('Actualizado: ', '');
      retorno.push({
        cotizacion: {
          titulo: name,
          empresas: [
            {
              nombre: name,
              variacion: percentage,
              venta: sellValue,
              compra: buyValue,
              fecha: date,
            },
          ],
        },
      });
    });
    return retorno;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const cronistacripto = async () => {
  const url2Get = 'https://www.cronista.com/bitcoin/';
  try {
    // const response = await axios.get(url2Get);
    // const $ = cheerio.load(response.data.toString('latin1'), {
    //   decodeEntities: false,
    // });
    // const fecha = $('#market-scrll-2').find('.date').first().text();
    // const retorno = [];

    const response = await axios.get(url2Get, {
      responseType: 'arraybuffer',
      responseEncoding: 'binary',
    });
    const $ = cheerio.load(response.data.toString('latin1'), {
      decodeEntities: false,
    });
    const retorno = [];

    $('#market-scrll-2 tr').each((index, element) => {
      retorno.push({
        cotizacion: {
          titulo: $(element).find('.name a').text().trim(),
          empresas: [{
            nombre: 'Cronista Cripto',
            variacion: $(element).find('.percentage span:not(.arrow)').text().trim(),
            compra: $(element).find('.sell-value').text().trim(),
            venta: $(element).find('.sell-value').text().trim(),
            fecha: $(element).find('.date').text().trim(),
          }],
        },
      });
    });

    /*
    retorno.push({
      cotizacion: {
        titulo: 'Bitcoin Pesos',
        empresas: [
          {
            nombre: 'Bitso',
            variacion: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)',
              )
              .find('span.percentage.col span:not(.arrow)')
              .first()
              .text(),
            compra: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)',
              )
              .find('.buy-value')
              .first()
              .text(),
            venta: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)',
              )
              .find('.sell')
              .first()
              .text(),
            fecha,
          },
          {
            nombre: 'LetsBit',
            variacion: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)',
              )
              .find('span.percentage.col span:not(.arrow)')
              .first()
              .text(),
            compra: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)',
              )
              .find('.buy-value')
              .first()
              .text(),
            venta: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)',
              )
              .find('.sell')
              .first()
              .text(),
            fecha,
          },
          {
            nombre: 'LemonCash',
            variacion: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)',
              )
              .find('span.percentage.col span:not(.arrow)')
              .first()
              .text(),
            compra: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)',
              )
              .find('.buy-value')
              .first()
              .text(),
            venta: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)',
              )
              .find('.sell')
              .first()
              .text(),
            fecha,
          },
          {
            nombre: 'Ripio',
            variacion: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)',
              )
              .find('span.percentage.col span:not(.arrow)')
              .first()
              .text(),
            compra: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)',
              )
              .find('.buy-value')
              .first()
              .text(),
            venta: $(
              "div.piece.tabs.standard div.piecetitle:contains('Bitcoin')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)',
              )
              .find('.sell')
              .first()
              .text(),
            fecha,
          },
        ],
      },
    });

    retorno.push({
      cotizacion: {
        titulo: 'Ethereum Pesos',
        empresas: [
          {
            nombre: 'Bitso',
            variacion: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)',
              )
              .find('span.percentage.col span:not(.arrow)')
              .first()
              .text(),
            compra: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)',
              )
              .find('.buy-value')
              .first()
              .text(),
            venta: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)',
              )
              .find('.sell')
              .first()
              .text(),
            fecha: fecha,
          },
          {
            nombre: 'LetsBit',
            variacion: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)',
              )
              .find('span.percentage.col span:not(.arrow)')
              .first()
              .text(),
            compra: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)',
              )
              .find('.buy-value')
              .first()
              .text(),
            venta: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)',
              )
              .find('.sell')
              .first()
              .text(),
            fecha,
          },
          {
            nombre: 'LemonCash',
            variacion: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)',
              )
              .find('span.percentage.col span:not(.arrow)')
              .first()
              .text(),
            compra: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)',
              )
              .find('.buy-value')
              .first()
              .text(),
            venta: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)',
              )
              .find('.sell')
              .first()
              .text(),
            fecha,
          },
          {
            nombre: 'Ripio',
            variacion: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)',
              )
              .find('span.percentage.col span:not(.arrow)')
              .first()
              .text(),
            compra: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)',
              )
              .find('.buy-value')
              .first()
              .text(),
            venta: $(
              "div.piece.tabs.standard div.piecetitle:contains('Ethereum')",
            )
              .closest('.piece.tabs.standard')
              .find(
                'div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)',
              )
              .find('.sell')
              .first()
              .text(),
            fecha,
          },
        ],
      },
    });
    */
    return retorno;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  dolarsanjuan,
  criptoya,
  cronista,
  cronistacripto,
  bluelytics,
  ambito,
  invertironline,
};
