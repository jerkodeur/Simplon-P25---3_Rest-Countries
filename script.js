const render = async () => {
  const countries = await fetch(
    "https://restcountries.com/v3.1/region/europe"
  ).then((response) => response.json());

  let formatCountriesList = "";

  countries.forEach((country) => {
    formatCountriesList += `<li>${country.name.official}</li>`;
  });

  document.querySelector("#countries").innerHTML = formatCountriesList;
};

render();
