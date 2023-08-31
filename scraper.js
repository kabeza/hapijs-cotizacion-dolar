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

const dolarsi = async () => {
  const url2Get = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
  let datosFinal = [];
  const retorno = [];
  try {
    await axios
      .get(url2Get)
      .then((resp) => {
        datosFinal = resp.data;
      })
      .catch(() => {
        datosFinal = [];
      });
    datosFinal.map((item) => {
      retorno.push({
        cotizacion: {
          titulo: item.casa.nombre,
          empresas: [
            {
              nombre: 'dolarsi.com',
              variacion: item.casa.variacion,
              venta: item.casa.venta,
              compra: item.casa.compra,
              fecha: '',
            },
          ],
        },
      });
    });
    return retorno;
  } catch (error) {
    console.log('Error', error);
    return false;
  }
};

const dolarsanjuan = async () => {
  const url2Get = 'https://dolarsanjuan.com';
  try {
    const response = await axios.get(url2Get);
    const $ = cheerio.load(response.data);
    const resp = [];
    $('.sub').each(function (i, e) {
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

const calculadoras = async () => {
  const url2Get = 'https://calculadoras.com.ar/pro';
  try {
    const response = await axios.get(url2Get);
    const $ = cheerio.load(response.data);

    let jsonString = $('#app').attr('data-page');
    let parsedJson = JSON.parse(jsonString);
    // console.log(`Parse: ${JSON.stringify(parsedJson.props.tickers)}`);

    const retorno = [];
    for (let item in parsedJson.props.tickers) {
      // console.log(`Item: ${item}`);
      // console.log(`Items: ${JSON.stringify(parsedJson.props.tickers[item])}`);
      retorno.push({
        cotizacion: {
          titulo: "calculadoras.com.ar",
          empresas: [
            {
              nombre: parsedJson.props.tickers[item].name,
              variacion: '',
              venta: parsedJson.props.tickers[item].ticker.sell,
              compra: parsedJson.props.tickers[item].ticker.buy,
              fecha: parsedJson.props.tickers[item].last_update_at,
            },
          ],
        },
      });
    }

    return retorno;
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

    const sel = "table#cotizaciones tr";
    $(sel).each(function (i, e) {
      if (i > 0) {
        let tmpTD = [];
        $(this).find("td").each(function (j, f) {
          tmpTD.push($(this).text().trim());
        });
        console.log(`tmpTD: ${tmpTD}`);
        retorno.push({
          cotizacion: {
            titulo: "InvertirOnline",
            empresas: [
              {
                nombre: tmpTD[0].replace(/(\r\n|\n|\r)/gm, "").replace(/ +(?= )/g,''),
                variacion: tmpTD[4],
                compra: tmpTD[1],
                venta: tmpTD[2],
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

    $('ul#market-scrll-2 li').each(function (i, e) {
      const valorNombre = $(this).find('.name').text();
      retorno.push({
        cotizacion: {
          titulo: valorNombre,
          empresas: [
            {
              nombre: 'cronista.com',
              variacion: $(this).find('.percentage > span').last()
                .text(),
              venta: $(this).find('.sell-value').contents().eq(1)
                .text(),
              compra: $(this).find('.buy-value').contents().eq(1)
                .text(),
              fecha: $(this).find('.date').text(),
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

const ambito = async () => {
  const arreUrls = [];
  arreUrls.push({
    titulo: 'Dólar Oficial',
    url: 'https://mercados.ambito.com//dolar/oficial/variacion'
  });
  arreUrls.push({
    titulo: 'Dólar Nación',
    url: 'https://mercados.ambito.com/dolarnacion/variacion'
  });
  arreUrls.push({
    titulo: 'Dólar Blue',
    url: 'https://mercados.ambito.com//euro/informal/variacion'
  });
  arreUrls.push({
    titulo: 'Dólar Turista',
    url: 'https://mercados.ambito.com//dolarturista/variacion'
  });
  arreUrls.push({
    titulo: 'Dólar Qatar',
    url: 'https://mercados.ambito.com//dolarqatar/variacion'
  });
  arreUrls.push({
    titulo: 'Dólar Crypto',
    url: 'https://mercados.ambito.com//dolarcripto/variacion'
  });
  arreUrls.push({
    titulo: 'Euro Oficial',
    url: 'https://mercados.ambito.com//euro/variacion'
  });
  arreUrls.push({
    titulo: 'Euro Blue',
    url: 'https://mercados.ambito.com//euro/informal/variacion'
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

const cronistacripto = async () => {
  const url2Get = 'https://www.cronista.com/bitcoin/';
  try {
    const response = await axios.get(url2Get);
    const $ = cheerio.load(response.data);
    const fecha = $('#market-scrll-2').find('.date').first().text();
    const retorno = [];

    retorno.push({
      cotizacion: {
        titulo: 'Bitcoin Dolares',
        empresas: [{
          nombre: 'Bitso',
          variacion: $('section.piece.marketsList.standard.markets > ul li:not(.list-title)').find('.percentage.col span:not(.arrow)').first().text(),
          compra: $('section.piece.marketsList.standard.markets ul.list > li:not(.list-title)').find('.buy-value').first().text(),
          venta: $('section.piece.marketsList.standard.markets ul.list > li:not(.list-title)').find('.sell').first().text(),
          fecha,
        }],
      },
    });

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
    return retorno;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  dolarsanjuan,
  cronista,
  cronistacripto,
  bluelytics,
  ambito,
  dolarsi,
  calculadoras,
  invertironline
};
