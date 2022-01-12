const render = async () => {
  const response = await request(
    "https://restcountries.com/v3.1/region/europe?fields=name,cca2"
  );

  const nameOfCountries = await response.reduce((acc, curr, index) => {
    const selected = curr.name.common === "France" ? "selected" : "";
    acc += `<option ${selected} data-code=${curr.cca2} value=${index}>${curr.name.official}</option>`;
    return acc;
  }, "");

  document.querySelector("#countryList").innerHTML = await nameOfCountries;

  updateMap();
};

const request = (endpoint) => fetch(endpoint).then((datas) => datas.json());

const updateMap = async () => {
  const countryList = document.querySelector("#countryList");
  const code = countryList.options[countryList.value].dataset.code;

  const response = await request(
    `https://restcountries.com/v3.1/alpha?codes=${code}&fields=capitalInfo`
  );

  const [lat, long] = await response[0].capitalInfo.latlng;

  const map = document.querySelector("#map");
  map.src =
    await `https://www.google.com/maps/embed/v1/view?key=AIzaSyBgv-jGQXDVSbmK_NS0K5_XeJy4RoGzX9M&center=${lat},${long}&zoom=10&language=en`;
};

window.addEventListener("load", render);

document.querySelector("#countryList").addEventListener("change", updateMap);
