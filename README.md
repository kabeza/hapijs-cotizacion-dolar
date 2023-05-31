# API para Cotizaciones del dolar
Server en HapiJS que utiliza Cheerio para obtener cotizaciones del dolar, dolar blue, criptomonedas, etc. desde varios sitios

_Aplicación desarrollada con_
- HapiJS
- Cheerio
- Axios

## Endpoints

Una vez deployada en la url definitiva (recordar que es un server Node/Express) , los endpoints son:

/dolarsanjuan  
Obtiene datos de [https://dolarsanjuan.com/](https://dolarsanjuan.com/)

/dolarsi  
Obtiene datos de [https://dolarsi.com/](https://dolarsi.com/)

/cronista
Obtiene datos de [https://www.cronista.com/](https://www.cronista.com/)  
O me banearon el ip o le pusieron Ajax y la info la trae despues del document ready, ahi ya es otra historia

/cronistacripto
Obtiene datos de criptomonedas desde [https://www.cronista.com/](https://www.cronista.com/)  
O me banearon el ip o le pusieron Ajax y la info la trae despues del document ready, ahi ya es otra historia

/bluelytics  
Obtiene datos de [https://bluelytics.com.ar/](https://bluelytics.com.ar/)  

<hr/>

Actualmente se encuentra deployada en la siguiente url:  
https://apidolarcripto.onrender.com/  
** Tarda en cargar porque es un plan gratuito
