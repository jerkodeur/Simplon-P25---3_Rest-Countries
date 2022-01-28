const render = async () => {
  const currentUrl = window.location.search;
  const cca2 = new URLSearchParams(currentUrl).get("cca2") ?? "FR";

  const europeeanCountries = await getApiData(
    "https://restcountries.com/v3.1/region/europe?fields=name,cca2"
  );

  let nameOfCountries = "";

  europeeanCountries.forEach((country) => {
    nameOfCountries += `<option value="${country.cca2}">${country.name.official}</option>`;
  });

  const el = document.querySelector("#countryList");
  el.innerHTML = nameOfCountries;
  el.value = cca2;

  updateMap();
};

const getApiData = (endpoint) => fetch(endpoint).then((datas) => datas.json());

const updateMap = async () => {
  const ISO2Code = document.querySelector("#countryList").value;

  const capitalGeoLocation = await getApiData(
    `https://restcountries.com/v3.1/alpha?codes=${ISO2Code}&fields=capitalInfo`
  );

  const [lat, long] = capitalGeoLocation[0].capitalInfo.latlng;

  document.querySelector(
    "#map"
  ).src = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBgv-jGQXDVSbmK_NS0K5_XeJy4RoGzX9M&center=${lat},${long}&zoom=10&language=en`;
};

window.addEventListener("load", render);

document.querySelector("#countryList").addEventListener("change", updateMap);
