const cheerio = require("cheerio");
const axios = require("axios").default;
const moment = require("moment");

const bluelytics = async () => {
  const url2Get = "https://api.bluelytics.com.ar/v2/latest";
  try {
    var datosFinal = [];
    await axios
      .get(url2Get)
      .then((resp) => {
        datosFinal = resp.data;
      })
      .catch((err) => {
        datosFinal = [];
      });

    var retorno = [];

    var fecha = moment(datosFinal.last_update).format("DD/MM/YYYY, H:mm:ss");

    retorno.push({
      cotizacion: {
        titulo: "Dolar Oficial",
        empresas: [
          {
            nombre: "bluelytics.com.ar",
            variacion: "",
            venta: datosFinal.oficial.value_sell,
            compra: datosFinal.oficial.value_buy,
            fecha: fecha,
          },
        ],
      },
    });
    retorno.push({
      cotizacion: {
        titulo: "Dolar Blue",
        empresas: [
          {
            nombre: "bluelytics.com.ar",
            variacion: "",
            venta: datosFinal.blue.value_sell,
            compra: datosFinal.blue.value_buy,
            fecha: fecha,
          },
        ],
      },
    });
    retorno.push({
      cotizacion: {
        titulo: "Euro Oficial",
        empresas: [
          {
            nombre: "bluelytics.com.ar",
            variacion: "",
            venta: datosFinal.oficial_euro.value_sell,
            compra: datosFinal.oficial_euro.value_buy,
            fecha: fecha,
          },
        ],
      },
    });
    retorno.push({
      cotizacion: {
        titulo: "Euro Blue",
        empresas: [
          {
            nombre: "bluelytics.com.ar",
            variacion: "",
            venta: datosFinal.blue_euro.value_sell,
            compra: datosFinal.blue_euro.value_buy,
            fecha: fecha,
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
  const url2Get = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
  try {
    var datosFinal = [];
    await axios
      .get(url2Get)
      .then((resp) => {
        datosFinal = resp.data;
      })
      .catch((err) => {
        datosFinal = [];
      });

    var retorno = [];

    datosFinal.map((item) => {
      retorno.push({
        cotizacion: {
          titulo: item.casa.nombre,
          empresas: [
            {
              nombre: "dolarsi.com",
              variacion: item.casa.variacion,
              venta: item.casa.venta,
              compra: item.casa.compra,
              fecha: "",
            },
          ],
        },
      });
    });

    return retorno;
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};

const dolarsanjuan = async () => {
  const url2Get = "https://dolarsanjuan.com";
  try {
    const response = await axios.get(url2Get);
    const $ = cheerio.load(response.data);
    const resp = [];

    $(".sub").each(function (i, e) {
      resp[i] = {
        cotizacion: {
          titulo: $(this)
            .find(".divisa-name")
            .text()
            .trim()
            .replace(/(\r\n|\n|\r|\t)/gm, ""),
          empresas: [
            {
              nombre: "dolarsanjuan.com",
              variacion: "",
              compra: $(this).find(".sub-in").first().find(".precioC").text(),
              venta: $(this).find(".sub-in").last().find(".precioC").text(),
              fecha: $(this)
                .find(".actualiz")
                .text()
                .replace(/(\r\n|\n|\r|\t)/gm, ""),
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

// let elem = $('*[data-indice="/dolarturista"]').html();
const cronista = async () => {
  const url2Get = "https://www.cronista.com/MercadosOnline/dolar.html";

  try {
    const response = await axios.get(url2Get, {
      responseType: "arraybuffer",
      responseEncoding: "binary",
    });

    const $ = cheerio.load(response.data.toString("latin1"), {
      decodeEntities: false,
    });
    const retorno = [];

    $("ul#market-scrll-2 li").each(function (i, e) {
      let valorNombre = $(this).find(".name").text();

      retorno.push({
        cotizacion: {
          titulo: valorNombre,
          empresas: [
            {
              nombre: "cronista.com",
              variacion: $(this).find(".percentage > span").last().text(),
              venta: $(this).find(".sell-value").contents().eq(1).text(),
              compra: $(this).find(".buy-value").contents().eq(1).text(),
              fecha: $(this).find(".date").text(),
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
        const response = await axios.get(url2Get);
        const $ = cheerio.load(response.data);
        const fecha = $('#market-scrll-2').find('.date').first().text();
        const retorno = [];

        // retorno.push({
        //     cotizacion: {
        //         titulo: "Bitcoin u$s",
        //         empresa: {
        //             "Bitso": {                    
        //                 variacion: $('section.piece.marketsList.standard.markets > ul li:not(.list-title)').find('.percentage.col span:not(.arrow)').first().text(),
        //                 compra: $('section.piece.marketsList.standard.markets ul.list > li:not(.list-title)').find('.buy-value').first().text(),
        //                 venta: $('section.piece.marketsList.standard.markets ul.list > li:not(.list-title)').find('.sell').first().text(),
        //                 fecha: fecha,
        //             }
        //         }
        //     },
        // });

        retorno.push({
            cotizacion: {
                titulo: "Bitcoin Dolares",
                empresas: [{
                    nombre: "Bitso",
                    variacion: $('section.piece.marketsList.standard.markets > ul li:not(.list-title)').find('.percentage.col span:not(.arrow)').first().text(),
                    compra: $('section.piece.marketsList.standard.markets ul.list > li:not(.list-title)').find('.buy-value').first().text(),
                    venta: $('section.piece.marketsList.standard.markets ul.list > li:not(.list-title)').find('.sell').first().text(),
                    fecha: fecha,
                }]
            },
        });

        retorno.push({
            cotizacion: {
                titulo: "Bitcoin Pesos",
                empresas: [
                    {
                        nombre: "Bitso",                        
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    {
                        nombre: "LetsBit",
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    {
                        nombre: "LemonCash",
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    {
                        nombre: "Ripio",
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    
                ]
            },
        });
        
        retorno.push({
            cotizacion: {
                titulo: "Ethereum Pesos",
                empresas: [
                    {
                        nombre: "Bitso",
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    {
                        nombre: "LetsBit",
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    {
                        nombre: "LemonCash",
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    {
                        nombre: "Ripio",
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                ]
            },
        });

        /*

        retorno.push({
            cotizacion: {
                titulo: "Bitcoin $",
                empresa: {
                    "Bitso": {
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    "LetsBit": {
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    "Lemon Cash": {
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    "Ripio": {
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Bitcoin')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                }
            },
        });

        retorno.push({
            cotizacion: {
                titulo: "Ethereum $",
                empresa: {
                    "Bitso": {
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(2)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    "LetsBit": {
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(3)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    "LemonCash": {
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(4)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                    "Ripio": {
                        variacion: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('span.percentage.col span:not(.arrow)').first().text(),
                        compra: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('.buy-value').first().text(),
                        venta: $("div.piece.tabs.standard div.piecetitle:contains('Ethereum')")
                            .closest('.piece.tabs.standard')
                            .find('div.panels div.panel.selected section.piece.marketsList ul li:nth-child(5)')
                            .find('.sell').first().text(),
                        fecha: fecha,
                    },
                }
            },
        });
        */

        return retorno;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    dolarsanjuan,
    cronista,
    cronistacripto,
    bluelytics,
    dolarsi
};