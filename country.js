const countryName = new URLSearchParams(window.location.search).get("name");
const flagImage = document.querySelector(".countries-details img");
const countryNameH1 = document.querySelector(".details-text-container h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-leveldomain");
const currencies = document.querySelector(".curriences");
const languages = document.querySelector(".languages");
const borderCountriesContainer = document.querySelector(".border-countries");
const themeChanger = document.querySelector(".theme-changer");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    // console.log(country);

    flagImage.src = country.flags.svg;
    countryNameH1.innerText = country.name.common;
    // console.log(Object.values(country.name.nativeName)[0].common);
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;

    topLevelDomain.innerText = country.tld.join(", ");
    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }
    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry);
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            // console.log(borderCountryTag);
            borderCountriesContainer.append(borderCountryTag);
          });
      });
    }
  });

const getTheme = localStorage.getItem("PageTheme");

if (getTheme === "DARK") {
  document.body.classList.add("dark");
  themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i> Light mode`;
} else {
  document.body.classList.remove("dark");
  themeChanger.innerHTML = `<i class="fa-regular fa-moon"></i> Dark mode`;
}

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  if (isDark) {
    themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i> Light mode`;
    localStorage.setItem("PageTheme", "DARK");
  } else {
    themeChanger.innerHTML = `<i class="fa-regular fa-moon"></i> Dark mode`;
    localStorage.setItem("PageTheme", "LIGHT");
  }
});
