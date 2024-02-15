// dark mode
const darkModeBtn = document.querySelector(".bx-moon");

darkModeBtn.addEventListener("click", () => {
  if (darkModeBtn.classList.contains("bx-moon")) {
    darkModeBtn.classList.replace("bx-moon", "bx-sun");
    document.documentElement.classList.add("dark");
    setLocalMode("Dark");
  } else {
    darkModeBtn.classList.replace("bx-sun", "bx-moon");
    document.documentElement.classList.remove("dark");
    setLocalMode("Light");
  }
});

const setLocalMode = (theme) => {
  localStorage.setItem("theme", JSON.stringify(theme));
};

window.addEventListener("load", () => {
  let getTheme = JSON.parse(localStorage.getItem("theme"));
  getTheme == "Dark"
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");

  // input focus
  searchInput.focus();
});

// current time
let months = [
  "blank",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const currTime = document.querySelector(".current-time");

setInterval(() => {
  let getTime = new Date();

  let currDate = getTime.getDate();
  let currMonth = months[getTime.getMonth() + 1];
  let currYear = getTime.getFullYear();
  let currHour = getTime.getHours();
  let currMin = getTime.getMinutes();

  if (currHour < 10) {
    currHour = "0" + currHour;
  }
  if (currMin < 10) {
    currMin = "0" + currMin;
  }
  // insert current time into the DOM
  currTime.innerHTML = `${currDate} ${currMonth} ${currYear} | ${currHour}:${currMin}`;
}, 1000);

// API info
let apiInfo = {
  apiKey: "05a84450c10a6bb5b3de61151b423340",
  apiCurrCall: "https://api.openweathermap.org/data/2.5/weather?q=",
  apiForecastCall: "https://api.openweathermap.org/data/2.5/forecast?q=",
};

// search input and button events
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".bx-search");

searchInput.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    fetchData();
    searchInput.value = "";
  }
});

searchBtn.addEventListener("click", () => {
  fetchData();
  searchInput.value = "";
});

// fetch data
const requestedLoc = document.querySelector(".requested-loc");

const fetchData = () => {
  searchValue = searchInput.value;

  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  fetch(
    `${apiInfo.apiCurrCall}${searchValue}&appid=${apiInfo.apiKey}&units=metric`
  )
    .then((res) => res.json())
    .then((res1) => {
      showCurrData(res1);
      // console.log(res1);
    })
    .catch((err) => {
      requestedLoc.innerHTML = "Invalid Loc!";
      requestedLoc.style.color = "#E78895";
      // console.log(err);
    });

  // https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
  fetch(
    `${apiInfo.apiForecastCall}${searchValue}&appid=${apiInfo.apiKey}&units=metric`
  )
    .then((res) => res.json())
    .then((res2) => {
      showForecastData(res2);
      // console.log(res2);
    })
    .catch((err) => {
      hideRightBox();
      // console.log(res2);
    });
};

// show current data
const currentTemp = document.querySelector(".current-temp");
const currentStatus = document.querySelector(".current-status");
const container = document.querySelector(".container");
const leftBox = document.querySelector(".left-box");
const rightBox = document.querySelector(".right-box");

const showCurrData = (data) => {
  requestedLoc.innerHTML = `${data.name}. ${data.sys.country}`;
  requestedLoc.style.color = "inherit";
  currentTemp.innerHTML = "";
  currentStatus.innerHTML = "";

  showRightBox();

  // current temperature
  currentTemp.insertAdjacentHTML(
    "beforeend",
    `<div class="text-9xl font-bold text-neutral-500 lg:text-8xl sm:text-7xl dark:text-slate-200 temp">${Math.floor(
      data.main.temp
    )}°C
  </div>
  <div class="text-neutral-400 ml-8 lg:text-sm sm:text-xs sm:ml-0 sm:mt-3 dark:text-slate-400">
      <div class="wind"><i class="bx bx-wind"></i> ${(
        data.wind.speed * 3.6
      ).toFixed(2)} km/h</div>
      <div class="humidity"><i class="bx bx-droplet"></i> ${
        data.main.humidity
      } %</div>
      <div class="min-max"><i class="fa-solid fa-temperature-three-quarters mr-0.5 ml-1"></i> ${Math.floor(
        data.main.temp_min
      )}°C / ${Math.floor(data.main.temp_min)}°C
      </div>
  </div>`
  );

  // current status
  currentStatus.insertAdjacentHTML(
    "beforeend",
    `<img src="./assests/img/${showWeatherCondition(
      data.weather[0].main
    )}.png" alt="Weather"
    class="h-12 w-12 rounded-lg p-1 mr-3 sm:mb-8 dark:bg-slate-700">
    <p
    class="text-neutral-700 text-5xl font-medium lg:text-3xl sm:text-xl sm:pb-8 dark:text-slate-300">
    ${data.weather[0].main}</p>`
  );
};

// show forecast data
const daysContainer = document.querySelector(".days-container");

const showForecastData = (data) => {
  daysContainer.innerHTML = "";

  // days container
  data.list.forEach((item) => {
    daysContainer.insertAdjacentHTML(
      "beforeend",
      `<div
      class="flex justify-between items-center bg-white rounded-xl border-white border-2 py-2 px-3 mb-4 hover:border-neutral-200 lg:text-sm dark:bg-slate-900 dark:border-slate-900 dark:hover:border-slate-800">
      <div class="h-16 w-16 rounded-lg bg-zinc-100 p-1 dark:bg-slate-700">
          <img src="./assests/img/${showWeatherCondition(
            item.weather[0].main
          )}.png" alt="Weather">
      </div>
      <div class="flex justify-center items-center sm:block dark:text-slate-300">
          <div class="border-r pr-6 pl-2 md:border-none">
              <p>${item.dt_txt.substring(8, 10)} ${
        months[item.dt_txt.substring(5, 7).slice(1, 2)]
      }, ${item.dt_txt.substring(11, 13)}:${item.dt_txt.substring(14, 16)}</p>
              <p>${item.weather[0].main}</p>
          </div>
          <div class="pl-8 sm:flex sm:pl-2">
              <p>${Math.floor(item.main.temp_min)}°C</p>
              <p class="hidden sm:inline-block"> / </p>
              <p>${Math.floor(item.main.temp_max)}°C</p>
          </div>
      </div>
    </div>`
    );
  });
};

// show weather condition
const showWeatherCondition = (condition) => {
  let weatherCondition;

  switch (condition) {
    case "Thunderstorm":
      weatherCondition = "Thunderstorm";
      break;
    case "Snow":
      weatherCondition = "Snow";
      break;
    case "Rain":
      weatherCondition = "Rain";
      break;
    case "Drizzle":
      weatherCondition = "Drizzle";
      break;
    case "Clouds":
      weatherCondition = "Clouds";
      break;
    case "Clear":
      weatherCondition = "Clear";
      break;
    default:
      weatherCondition = "Atmosphere";
      break;
  }

  return weatherCondition;
};

// responsive style when the right box is either shown or hidden
const showRightBox = () => {
  container.classList.replace("w-6/12", "w-11/12");
  container.classList.replace("h-96", "h-[36rem]");
  container.classList.remove("lg:w-8/12");
  leftBox.classList.replace("w-full", "w-8/12");
  leftBox.classList.replace("rounded-3xl", "rounded-l-3xl");
  leftBox.classList.add("lg:w-7/12", "md:rounded-none", "md:rounded-t-3xl");
  rightBox.style.display = "flex";
};
const hideRightBox = () => {
  container.classList.replace("w-11/12", "w-6/12");
  container.classList.replace("h-[36rem]", "h-96");
  container.classList.add("lg:w-8/12");
  leftBox.classList.replace("w-8/12", "w-full");
  leftBox.classList.replace("rounded-l-3xl", "rounded-3xl");
  leftBox.classList.remove("lg:w-7/12", "md:rounded-none", "md:rounded-t-3xl");
  rightBox.style.display = "none";
  currentTemp.innerHTML = "";
  currentStatus.innerHTML = "";
};
