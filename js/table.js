const render = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/region/europe?fields=name,capital,area,population"
  ).then((datas) => datas.json());

  let countries = "";
  response.forEach((country) => {
    const area = new Intl.NumberFormat("en").format(country.area);
    const population = new Intl.NumberFormat("en").format(country.population);

    countries += `
      <tr>
        <td class="text-nowrap fw-bold">${country.name.official}</td>
        <td class="text-end">${area}</td>
        <td class="text-end">${population}</td>
        <td class="text-nowrap">${country.capital[0]}</td>
      </tr>
    `;
  });

  document.querySelector("#countries").innerHTML = countries;
};
window.addEventListener("load", render());
