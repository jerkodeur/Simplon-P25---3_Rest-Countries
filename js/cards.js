const render = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/region/europe?fields=name,capital,maps,flags"
  ).then((datas) => datas.json());

  let countriesCards = "";
  response.forEach((country) => {
    countriesCards += `
        <div class="col">
            <div class="card h-100">
                <a href="${country.maps.googleMaps}" target="_blank" rel="noopener">
                    <img src="${country.flags.png}" class="card-img-top" alt="${country.name.official} flag">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${country.name.official}</h5>
                    <h6 class="card-text">${country.capital[0]}</h6>
                </div>
            </div>
        </div>
    `;
  });

  document.querySelector("#countries").innerHTML = countriesCards;
};

window.addEventListener("load", render());
