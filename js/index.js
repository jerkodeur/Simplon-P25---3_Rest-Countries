const render = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/region/europe?fields=name"
  ).then((datas) => datas.json());

  let nameOfCountries = "";
  response.forEach((countryName) => {
    nameOfCountries += `<li>${countryName.name.official}</li>`;
  });

  document.querySelector("#countries").innerHTML = nameOfCountries;
};

window.addEventListener("load", render());
