`use strict`;

const amount_input = document.querySelector(`#amount_input`);
const currency_type = document.querySelector(`#currency_type`);
const converted_input = document.querySelector(`#converted_input`);
const currency_to = document.querySelector(`#currency_to`);
const form = document.querySelector(`form`);
const form_container = document.querySelector(`.form_container`);
const from_display = document.querySelector(`.from_display`);
const to_display = document.querySelector(`.to_display`);
const amount_show = document.querySelector(`#show_amount`);
const showtime = document.querySelector(`.showtime`);
const display_currencies = document.querySelector(`.display_currencies`);

class Converter {
  constructor() {
    this._showApi();
    this._restCountry();

    form.addEventListener(`submit`, this._showValue.bind(this));
  }

  _showValue(e) {
    e.preventDefault();
    const from = +amount_input.value;
    const fromCurrency = currency_type.value;
    const tocurrency = currency_to.value;
    // const display = new value(from, to, fromCurrency, tocurrency);

    const host = "api.frankfurter.app";

    fetch(
      `https://${host}/latest?amount=${from}&from=${fromCurrency}&to=${tocurrency}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        //alert(`${from} GBP = ${data.rates.USD} USD`);
        from_display.textContent = `${data.amount} ${fromCurrency}`;
        // to_display.textContent = `${rates}`;
        for (const key in data.rates) {
          const amount = data.rates[key];
          to_display.textContent = `${amount} ${key}`;
        }
      });
    amount_input.value = ``;
  }
  _showApi() {
    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        for (const key in data.rates) {
          //console.log(data.rates[key]);
          // from countries
         

          //
          const html = `
        <option>${key}</option>

        `;
          currency_type.insertAdjacentHTML(`afterbegin`, html);

          const toHtml = `
          <option>${key}</option>

          `;
          currency_to.insertAdjacentHTML(`afterbegin`, toHtml);
        }
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();
        showtime.textContent = `Mid-market exchange rate at ${hours}:${
          minutes < 10 ? `0` : ``
        }${minutes}
        ${hours > 12 ? `PM` : `AM`} ⌚
        
        `;
      });
  }
  _restCountry() {
    fetch(`https://restcountries.com/v3.1/all
    `).then((response) => response.json()).then((data)=>{
      console.log(data);
      data.forEach(datas => {
        const name = datas.name.common;
        const flag = datas.flags.svg;
        for (const key in datas.currencies) {
          const currenciesName = datas.currencies[key].symbol;
         // console.log(currenciesName);
         const html = `
         <ul>
          <li><img src="${flag}" alt=""><span class="span">${name} </span><span>${currenciesName ? currenciesName : ``}</span></li>
        </ul>
         `
         display_currencies.insertAdjacentHTML(`afterbegin`,html)
         
        }

      });
    })
  }
}

const converter = new Converter();
