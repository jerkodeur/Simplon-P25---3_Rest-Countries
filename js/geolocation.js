const render = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/region/europe?fields=name,capitalInfo"
  ).then((datas) => datas.json());

  const nameOfCountries = response.reduce((acc, curr, index) => {
    const selected = curr.name.common === "France" ? "selected" : "";
    const [lat, long] = curr.capitalInfo.latlng;

    acc += `<option ${selected} data-lat=${lat} data-long=${long} value=${index}>${curr.name.official}</option>`;
    return acc;
  }, "");

  document.querySelector("#countryList").innerHTML = nameOfCountries;

  updateMap();
};

const updateMap = () => {
  const countryList = document.querySelector("#countryList");
  const { lat, long } = countryList.options[countryList.value].dataset;

  const map = document.querySelector("#map");
  map.src = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBgv-jGQXDVSbmK_NS0K5_XeJy4RoGzX9M&center=${lat},${long}&zoom=10&language=en`;
};

window.addEventListener("load", render);

document.querySelector("#countryList").addEventListener("change", updateMap);
