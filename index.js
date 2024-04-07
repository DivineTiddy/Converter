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
const display_list = document.querySelector(`.display_list`);
const Search_btn = document.querySelector(`.Search_btn`);
const search_input = document.querySelector(`#search_input`);
const toggle = document.querySelector(`.toggle`);
const for_mobile = document.querySelector(`.for_mobile`);
const close_toggle = document.querySelector(`.close_toggle`);
const animate_scroll = document.querySelector(`.animate_scroll`);
const card = document.querySelector(`.card`);
const read_content = document.querySelector(`.read_content`);
const animate_scroll_read_content = document.querySelector(`.animate_scroll_read_content`)

class Converter {
  constructor() {
    this._animatereadcontent()
    this._animatescroll();
    this._showApi();
    this._restCountry();
    this._toggle();
    this._close_toggle();

    form.addEventListener(`submit`, this._showValue.bind(this));
  }
  _close_toggle() {
    close_toggle.addEventListener(`click`, function () {
      for_mobile.classList.remove(`for_mobile_active`);
    });
  }
  _toggle() {
    toggle.addEventListener(`click`, function () {
      for_mobile.classList.toggle(`for_mobile_active`);
    });
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
    Search_btn.addEventListener(`click`, function (e) {
      e.preventDefault();
      const search =
        String(search_input.value[0]).toUpperCase() +
        String(search_input.value).slice(1);
      fetch(`https://restcountries.com/v3.1/name/${search}
      `)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((datas) => {
            const region = datas.region;
            const name = datas.name.common;
            const flag = datas.flags.svg;
            const maps = datas.maps.googleMaps;
            // map

            //
            for (const key in datas.currencies) {
              const currenciesName = datas.currencies[key].symbol;
              // console.log(currenciesName);
              const html = `
              <ul>
              <li>
                <span>
                <img src=${flag}>
                ${name}
                </span>
                <span>Region 🌍:
                  ${region}
                </span>
                <span>currencies :
                  ${currenciesName}
                </span>
              </li>
            </ul>
            
      
          `;
              display_list.insertAdjacentHTML(`afterbegin`, html);
            }
          });
        });
    });
  }
  // _restCountryTwo(){
  //   const tocurrency = currency_to.value;
  //   fetch(`https://restcountries.com/v3.1/currency/${tocurrency}

  //   `).then((response) => response.json()).then((data)=>{
  //     console.log(data);
  //     data.forEach(datas => {
  //       const name = datas.name.common;
  //       const flag = datas.flags.svg;
  //       for (const key in datas.currencies) {
  //         const currenciesName = datas.currencies[key].symbol;
  //        // console.log(currenciesName);
  //       const html = `

  //       `
  //       top_currency_two.insertAdjacentHTML(`afterbegin`,html)

  //       }

  //     });
  //   })

  // }
  _animatescroll() {
    window.addEventListener(`scroll`, this._animateFuction);
  }
  _animateFuction() {
    const x = window.innerHeight / 5 * 4;
      const getTop = animate_scroll.getBoundingClientRect().top;
      if (x > getTop) {
        card.classList.add(`card_active`)
        read_content.classList.add(`read_content_active`)
      } else {
       // card.classList.remove(`card_active`)
      }
  }
  _animatereadcontent() {
    window.addEventListener(`scroll`, this._animateFuctionreadcontent);
  }
  _animateFuctionreadcontent() {
    const x = window.innerHeight / 5 * 4;
      const getTop = animate_scroll_read_content.getBoundingClientRect().top;
      if (x > getTop) {
        read_content.classList.add(`read_content_active`)
      } else {
       // card.classList.remove(`card_active`)
      }
  }
}

const converter = new Converter();
