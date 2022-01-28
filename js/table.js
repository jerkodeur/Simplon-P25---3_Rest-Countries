const render = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/region/europe?fields=name,capital,area,population,cca2"
  ).then((datas) => datas.json());

  let countries = "";
  const intl = new Intl.NumberFormat("en");

  response.forEach((country) => {
    countries += `
      <tr>
        <td class="text-nowrap fw-bold">${country.name.official}</td>
        <td class="text-end">${intl.format(country.area)}</td>
        <td class="text-end">${intl.format(country.population)}</td>
        <td class="text-nowrap"><a href="./geolocation.html?cca2=${
          country.cca2
        }">${country.capital[0]}</a></td>
      </tr>
    `;
  });

  document.querySelector("#countries").innerHTML = countries;
};
window.addEventListener("load", render());
