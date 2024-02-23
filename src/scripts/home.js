// Icon links
var carIconSrc = "../images/car.png";
var phoneIconSrc = "../images/charging.png";
var gasIconSrc = "../images/gas-station.png";
var treeIconSrc = "../images/plant.png";
var carbonIconSrc = "../images/carbon-capture.png";
var compostIconSrc = "../images/compostable.png";
var shareIconSrc = "../images/share.png";
var qrCodeSrc = "../images/qrcode.png";
var milesIMAGE = "../images/milesDrivenHolder.png";
var phoneIMAGE = "../images/phoneHolder.png";
var trashIMAGE = "../images/trashcanHolder.png";

window.onload = function () {
  document
    .getElementById("submit")
    .addEventListener("click", handleFormSubmission);

  // Live form validation.
  const inputField = document.getElementById("input-text");

  inputField.addEventListener("input", function (event) {
    const inputValue = event.target.value;
    const isValidInput = /^\d*\.?\d*$/.test(inputValue); // Regular expression to check for rational numbers

    if (!isValidInput) {
      inputField.value = inputField.value.substring(
        0,
        inputField.value.length - 1,
      ); // Clear the last inputted char if it was invalid.
    }
  });
};

function handleFormSubmission() {
  var content = document.getElementById("user-input-content");
  content.innerHTML = ""; // Clear the content div

  // Check bad inputs.
  if (
    document.getElementById("input-text").value.trim() == "" ||
    document.getElementById("measurement").value == "" ||
    document.getElementById("compost-type").value == ""
  ) {
    formValidation();
  } else {
    if (document.getElementById("form-validation-alert") != null) {
      document.getElementById("form-validation-alert").remove();
    }
    var input = document.getElementById("input-text");
    var unit = document.getElementById("measurement");
    var type = document.getElementById("compost-type");

    let kgCo2 = convertToKgCO2(input.value, unit.value).toFixed(2);
    let kgDesc = "kg of CO² saved";

    let tonsOfCo2 = kgCo2 / 1000;

    let milesDriven = convertToMilesDriven(tonsOfCo2).toFixed(2);
    let mdDesc = "You can drive " + milesDriven + " miles <br>or <br>San Jose to San Francisco " + (milesDriven/57.1).toFixed(2) + " times";

    let smartPhonesCharged = convertToSmartPhonesCharged(tonsOfCo2).toFixed(2);
    let spDesc = "phones charged";

    let trDesc = "Trash bags of waste recycled instead of landfilled";

    let gasPrice = 3.89;
    let gallonsOfGas = convertToGasConsumed(tonsOfCo2).toFixed(2);
    let gogDesc = "gallons of gas consumed <br> or <br> $" + (gallonsOfGas*gasPrice).toFixed(2) +" of regular gas at Shell";

    let treeSeedlingsGrown = convertToTreeSeedlingsGrown(tonsOfCo2).toFixed(2);
    let tsgDesc = "tree seedlings grown for 10 years";

    // Get the percentile of the user's composting
    let lbsComposted = kgCo2 / 0.1814;
    let galsComposted = lbsComposted / 6.18891540495;
    let map = {
      food: JSON.parse(localStorage.getItem("allFoodWasteComposted")),
      yard: JSON.parse(localStorage.getItem("allYardWasteComposted")),
      all: JSON.parse(localStorage.getItem("allWasteComposted")),
    };
    let description =
      "According to our data, you were in the top " +
      percentile(map[type.value], galsComposted).toFixed(2) +
      "% of composters in Santa Clara.";

    var container = document.createElement("div");
    container.classList.add(
      "p-8",
      "border",
      "border-gray-300",
      "rounded-3xl",
      `w-1/2`,
      `md:w-1/2`,
      "mx-auto",
      "mt-2",
      "shadow-md",
    );

    var transition = document.createElement("p");
    transition.classList.add(
      "font-heading",
      "mb-6",
      "mt-6",
      "text-3xl",
      "md:text-4xl",
      "font-bold",
      "tracking-tight",
      "max-w-full",
      "text-center"
    )

    transition.innerHTML += "What does " + kgCo2 + " kilograms of CO2 savings look like?"

    content.appendChild(
      createCO2StatsticContainer(
        kgCo2,
        percentile(map[type.value], galsComposted).toFixed(2),
        "4/5",
        "1/2",
      ),
    );

    content.appendChild(transition);
    
    var milesContainer = createStatsContainerElement(
      milesDriven,
      mdDesc,
      carIconSrc,
      "25px",
      "4/5",
      "1/2",
    );

    milesContainer.children[1].classList.remove("text-base"); //children[1] is desc object
    milesContainer.children[1].classList.add("text-lg");

    var icon = document.createElement("img");
    icon.classList.add(
      "w-full",
      "mb-3"
    );
    icon.src = milesIMAGE;
    icon.alt = "icon";

    const childToDelete = milesContainer.firstChild;

    // Check if the child element exists before attempting to remove it
    if (childToDelete) {
        // Remove the child element
        milesContainer.removeChild(childToDelete);
    }

    const firstExistingChild = milesContainer.firstChild;

    milesContainer.insertBefore(icon, firstExistingChild);
    
    content.appendChild(
        milesContainer,
      );

      content.appendChild(
        createThreeStatsRowContainer(
          gallonsOfGas,
          smartPhonesCharged,
          smartPhonesCharged,
          gogDesc,
          trDesc,
          spDesc,
          carIconSrc,
          phoneIconSrc,
          phoneIMAGE,
          "30px",
          "18px",
          "18px",
          "4/5",
          "1/2",
        ),
      );

    // desktop computer
    if (window.screen.width >= 768) {
      // content.appendChild(
      //   createTwoStatsRowContainer(
      //     milesDriven,
      //     smartPhonesCharged,
      //     mdDesc,
      //     spDesc,
      //     carIconSrc,
      //     phoneIconSrc,
      //     "30px",
      //     "18px",
      //     "4/5",
      //     "1/2",
      //   ),
      // );

      // content.appendChild(
      //   createTwoStatsRowContainer(
      //     gallonsOfGas,
      //     treeSeedlingsGrown,
      //     gogDesc,
      //     tsgDesc,
      //     gasIconSrc,
      //     treeIconSrc,
      //     "18px",
      //     "17px",
      //     "4/5",
      //     "1/2",
      //   ),
      // );
    } // mobile
    else {
      content.appendChild(
        createStatsContainerElement(
          milesDriven,
          mdDesc,
          carIconSrc,
          "25px",
          "4/5",
          "1/2",
        ),
      );
      content.appendChild(
        createStatsContainerElement(
          smartPhonesCharged,
          spDesc,
          phoneIconSrc,
          "25px",
          "4/5",
          "1/2",
        ),
      );
      content.appendChild(
        createStatsContainerElement(
          gallonsOfGas,
          gogDesc,
          gasIconSrc,
          "25px",
          "4/5",
          "1/2",
        ),
      );
      content.appendChild(
        createStatsContainerElement(
          treeSeedlingsGrown,
          tsgDesc,
          treeIconSrc,
          "25px",
          "4/5",
          "1/2",
        ),
      );
    }
  }
  const openModalButtons = document.querySelectorAll('[data-modal-target]');
  const closeModalButtons = document.querySelectorAll('[data-close-button]');
  const overlay = document.getElementById('overlay');

  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)
    })
  });

  overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal)
    })
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
  });
}

function formValidation() {
  var alert =
    document.getElementById("form-validation-alert") != null
      ? document.getElementById("form-validation-alert")
      : document.createElement("div");
  alert.id = "form-validation-alert";
  var error = "";
  // handle different combinations of empty fields
  let prevError = false;
  let errMsgDetails = "";
  if (document.getElementById("input-text").value.trim() == "") {
    prevError = true;
    errMsgDetails += "quantity";
  }
  if (document.getElementById("measurement").value == "") {
    errMsgDetails += prevError ? "/unit" : "unit";
    prevError = true;
  }
  if (document.getElementById("compost-type").value == "") {
    errMsgDetails += prevError ? "/type" : "type";
    prevError = true;
  }
  error = "Please enter a valid " + errMsgDetails + " for composting.";
  alert.innerHTML =
    `<div class="w-4/5 md:w-[40%] mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">Uh-oh! That's not how much you composted!</strong>
    <span class="block sm:inline">` +
    error +
    `</span>
  </div>`;
  document.getElementById("form").appendChild(alert);
}

function createCharts(
  totalFoodCompost,
  totalYardCompost,
  histogramLabels,
  histogramData,
  histogramStep,
  totalCO2Saved,
  averageCompostPerUser,
) {
  // Reformat data.
  if (totalCO2Saved > 1000) {
    totalCO2Saved = (totalCO2Saved / 1000).toFixed(2) + "K";
  } else totalCO2Saved = totalCO2Saved.toFixed(2);
  document.getElementById("pie-chart").ariaLabel =
    "Pie chart showing the amount of food waste composted compared to yard waste composted in gallons, where the total food waste composted was " +
    totalFoodCompost +
    " gallons and the total yard waste composted was " +
    totalYardCompost +
    " gallons.";

  document.getElementById("bar-chart").ariaLabel =
    "Histogram showing ranges of total food waste composted versus percentage of users who composted within that range, where the first range was between ";
  for (let i = 0; i < histogramLabels.length; i++) {
    document.getElementById("bar-chart").ariaLabel +=
      histogramLabels[i] -
      histogramStep / 2 +
      " and " +
      (histogramLabels[i] + histogramStep / 2) +
      " gallons, and the percentage of users who composted within that range was " +
      histogramData[i] +
      " percent, " +
      " the next range was between ";
  }

  const pieChartElement = document.getElementById("pie-chart").getContext("2d");
  new Chart(pieChartElement, {
    type: "pie",
    data: {
      labels: ["Food Waste (gallons)", "Yard Waste (gallons)"],
      datasets: [
        {
          labels: [],
          data: [totalFoodCompost, totalYardCompost],
          borderWidth: 2,
          borderColor: "#b8b8b8",
          backgroundColor: ["#fdbd10", "#3aa8e4"],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Total Food Waste vs Total Yard Waste",
        },
      },
      responsive: true,
      aspectRatio: 1,
      maintainAspectRatio: true,
    },
  });

  let mappedHistogramData = histogramData.map((k, i) => ({
    x: histogramLabels[i],
    y: k,
  }));

  const histogram = document.getElementById("bar-chart").getContext("2d");
  new Chart(histogram, {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Percentage of Users",
          data: mappedHistogramData,
          backgroundColor: "#3aa8e4",
          borderColor: "#0371ad",
          borderWidth: 1,
          barPercentage: 1,
          categoryPercentage: 1,
          borderRadius: 5,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          offset: false,
          grid: {
            offset: false,
          },
          ticks: {
            stepSize: histogramStep,
          },
          title: {
            display: true,
            text: "Weekly Compost (gallons)",
            font: {
              size: 14,
            },
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Percentage of Users",
            font: {
              size: 14,
            },
          },
        },
      },
      responsive: true,
      aspectRatio:
        window.innerWidth <= 900 ? (window.innerWidth < 530 ? 0.8 : 1) : 1.9, // Adjust the aspect ratio for mobile/tablet/desktop
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Weekly Compost Per User Distribution",
        },

        tooltip: {
          callbacks: {
            title: (items) => {
              if (!items.length) {
                return "";
              }
              const item = items[0];
              const x = item.parsed.x;
              const min = x - histogramStep / 2;
              const max = x + histogramStep / 2;
              return `Weekly Compost: ${min} - ${max} gallons`;
            },
          },
        },
      },
    },
  });
  const stats = document.getElementById("statistics-container");
  let bigStatsContainer = document.createElement("div");

  // This stats container template provided by Dipti Narayan via https://tailwindflex.com/@dipti/stats-section
  bigStatsContainer.innerHTML = `<div class="mt-10 pb-3">
      <div class="relative">
        <div class="absolute inset-0 h-1/2"></div>
        <div class="md:max-w-[75%] tablet:max-w-xl relative mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mx-auto md:max-w-[75%] tablet:max-w-xl">
            <dl class="rounded-lg border-[1px] border-gray-100 bg-white shadow-lg sm:grid sm:grid-cols-2">
              <div
                class="flex flex-col border-b border-gray-200 p-6 text-center sm:border-0 sm:border-r"
              >
                <dt
                  class="order-2 mt-2 text-lg font-medium leading-6 text-gray-700"
                  id="item-1"
                >
                  total kg CO² saved
                </dt>
                <dd
                  class="order-1 text-5xl font-extrabold leading-none text-anr-off-blue"
                  aria-describedby="item-1"
                >
                  ${totalCO2Saved}
                </dd>
              </div>
              <div
                class="flex flex-col border-b border-t border-gray-200 p-6 text-center sm:border-0 sm:border-l sm:border-r"
              >
                <dt
                  class="order-2 mt-2 text-lg font-medium leading-6 text-gray-700"
                >
                average gallons compost per survey respondent 
                </dt>
                <dd
                  class="order-1 text-5xl font-extrabold leading-none text-anr-off-blue"
                >
                ${averageCompostPerUser}
                </dd>
              </div>
              
            </dl>
          </div>
        </div>
      </div>
    </div>
    `;
  stats.after(bigStatsContainer);
}

// function createInfoContainerElement(
//   description,
//   mobileWidth = "4/5",
//   desktopWidth = "3/12",
// ) {
//   var display = document.createElement("div");
//   display.innerHTML = description;
//   display.classList.add(
//     "bg-green-100",
//     "border-l-4",
//     "border-green-500",
//     "text-green-700",
//     "rounded",
//     "p-4",
//     "mt-4",
//     `md:w-${desktopWidth}`,
//     `w-${mobileWidth}`,
//     "mx-auto",
//   );

//   var info = document.createElement("p");
//   info.classList.add("font-bold", "text-center");
//   display.appendChild(info);

//   return display;
// }

function createStatsContainerElement(
  statistic,
  description,
  iconSrc,
  iconSize = "30px",
  width = "4/5",
  desktopWidth = "3/12",
) {
  // Rewrite statistic with a K if over 1000
  if (statistic > 1000) {
    statistic = (statistic / 1000).toFixed(2) + "K";
  }

  var container = document.createElement("div");
  container.classList.add(
    "p-8",
    "border",
    "border-gray-300",
    "rounded-3xl",
    `w-${width}`,
    `md:w-${desktopWidth}`,
    "mx-auto",
    "mt-2",
    "shadow-md",
  );

  var stat = document.createElement("p");
  stat.classList.add(
    "font-heading",
    "mb-6",
    "text-3xl",
    "md:text-5xl",
    "text-anr-off-blue",
    "font-black",
    "tracking-tight",
    "max-w-full",
    "text-center"
  );
  stat.innerHTML = statistic;

  var desc = document.createElement("p");
  desc.classList.add(
    "font-heading",
    "mb-2",
    "text-base",
    "text-gray-700",
    "font-bold",
    "text-center"
  );

  // var icon = document.createElement("img");
  // icon.classList.add("inline");
  // icon.src = iconSrc;
  // icon.style.height = iconSize;
  // icon.alt = "icon";

  // desc.appendChild(icon);
  desc.innerHTML += description;

  container.appendChild(stat);
  container.appendChild(desc);
  let desc3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Nunc consequat interdum varius sit amet mattis vulputate enim nulla. Quam elementum pulvinar etiam non quam. Pretium viverra suspendisse potenti nullam ac. Vitae congue eu consequat ac felis. Commodo elit at imperdiet dui accumsan sit amet nulla. Ultricies integer quis auctor elit sed vulputate mi sit. Venenatis a condimentum vitae sapien pellentesque habitant. Eget gravida cum sociis natoque penatibus et magnis. Volutpat consequat mauris nunc congue nisi vitae suscipit. Arcu cursus vitae congue mauris rhoncus aenean. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Hendrerit dolor magna eget est lorem ipsum. Mattis nunc sed blandit libero volutpat sed cras ornare arcu. Non nisi est sit amet facilisis. In hendrerit gravida rutrum quisque non tellus. Pellentesque eu tincidunt tortor aliquam nulla. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras.";
  container.appendChild(
    popup("test", desc3),
  );

  return container;
}

function createTwoStatsRowContainer(
  stat1,
  stat2,
  desc1,
  desc2,
  icon1,
  icon2,
  icon1Sz = "30px",
  icon2Sz = "30px",
  mobileWidth = "4/5",
  desktopWidth = "3/12",
) {
  var container = document.createElement("div");
  container.classList.add(
    "flex",
    `w-${mobileWidth}`,
    `md:w-${desktopWidth}`,
    "mx-auto",
  );

  var statCont1 = createStatsContainerElement(stat1, desc1, icon1, icon1Sz);
  statCont1.classList.remove("md:w-3/12");
  statCont1.classList.add("mr-1", "md:w-1/2");
  var statCont2 = createStatsContainerElement(stat2, desc2, icon2, icon2Sz);
  statCont2.classList.remove("md:w-3/12");
  statCont2.classList.add("ml-1", "md:w-1/2");

  container.appendChild(statCont1);
  container.appendChild(statCont2);

  return container;
}

function convertToKgCO2(input, unit) {
  if (unit == "kilograms") {
    // Convert from kg to lbs.
    input *= 2.20462;
  }
  if (unit == "gallons") {
    // Convert from gallons to lbs.
    input *= 6.18891540495;
  }
  if (unit == "liters") {
    // Convert from liters to lbs.
    input *= 1.63493925492;
  }

  // Convert from lbs to kg CO2 saved.
  const KgCO2SavedPerPound = 0.1814;
  return input * KgCO2SavedPerPound;
}

function convertToMilesDriven(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.00039;
}

function convertToSmartPhonesCharged(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.00000822;
}

function convertToGasConsumed(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.008887;
}

function convertToTreeSeedlingsGrown(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.06;
}

function convertToAcresOfForest(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.84;
}

function percentile(arr, value) {
  //remove empty values from array
  arr = arr.filter((x) => x !== null && x !== "");
  const currentIndex = 0;
  const totalCount = arr.reduce((count, currentValue) => {
    if (currentValue < value) {
      return count + 1; // add 1 to `count`
    } else if (currentValue === value) {
      return count + 0.5; // add 0.5 to `count`
    }
    return count + 0;
  }, currentIndex);
  return (totalCount * 100) / arr.length;
}

// Load data and create charts using Google Sheets API

const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

function handleClientLoad() {
  gapi.load("client", initClient);
}

function initClient() {
  try {
    gapi.client
      .init({
        apiKey: "AIzaSyAalwjvT0D5TWInJchaijnw6L7iap6nCJ0",
        discoveryDocs: DISCOVERY_DOCS,
      })
      .then(function () {
        loadSheets();
      });
  } catch (e) {
    console.log(e);
  }
}

function loadSheets() {
  const spreadsheetId = "1QKrr4FgZQi-TJFIzq1uSpM4lPKgcVWxCohREJAllrD8";
  const sheetName = "QuialtrixRawData";

  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId,
      range: sheetName,
    })
    .then(
      function (response) {
        const values = response.result.values;
        totalFoodCompost = values[1][3];
        totalYardCompost = values[1][4];

        // Used for calculating percentiles.
        allFoodWasteComposted = values
          .slice(1)
          .map((row) => parseFloat(row[1]));

        allYardWasteComposted = values
          .slice(1)
          .map((row) => parseFloat(row[2]));

        // For the total, total[i] = allFoodWasteComposted[i] + allYardWasteComposted[i]
        allWasteComposted = allFoodWasteComposted.map(
          (value, index) => value + allYardWasteComposted[index],
        );

        localStorage.setItem(
          "allWasteComposted",
          JSON.stringify(allWasteComposted),
        );
        localStorage.setItem(
          "allFoodWasteComposted",
          JSON.stringify(allFoodWasteComposted),
        );
        localStorage.setItem(
          "allYardWasteComposted",
          JSON.stringify(allYardWasteComposted),
        );

        let maxTotalCompost = 0;
        let averageTotalCompostPerUser = 0;
        let totalUsers = 0;
        for (var i = 1; i < values.length; i++) {
          if (
            !values[i][1] ||
            !values[i][2] ||
            values[i][1].trim() == "" ||
            values[i][2].trim() == ""
          )
            continue;
          totalUsers++;
          averageTotalCompostPerUser += parseFloat(values[i][1]);
          averageTotalCompostPerUser += parseFloat(values[i][2]);
          if (
            maxTotalCompost <
            parseFloat(values[i][1]) + parseFloat(values[i][2])
          ) {
            maxTotalCompost =
              parseFloat(values[i][1]) + parseFloat(values[i][2]);
          }
        }
        // Round maxTotalCompost to nearest integer divisible by 8.
        maxTotalCompost = Math.ceil(maxTotalCompost / 8) * 8;
        // Create labels for a histogram, starting at 0, ending at maxTotalCompost, with 8 bins.
        let histogramLabels = [];
        for (
          var i = maxTotalCompost / 8;
          i <= maxTotalCompost;
          i += maxTotalCompost / 8
        ) {
          histogramLabels.push(i - maxTotalCompost / 16);
        }

        let histogramStep = maxTotalCompost / 8;
        // Create data for the histogram: the percentage of users who composted between each bin.
        let histogramData = [];
        for (var i = 0; i < histogramLabels.length; i++) {
          histogramData.push(
            (
              percentile(
                allWasteComposted,
                histogramLabels[i] + histogramStep / 2,
              ) -
              percentile(
                allWasteComposted,
                histogramLabels[i] - histogramStep / 2,
              )
            ).toFixed(2),
          );
        }

        let totalCO2Saved = convertToKgCO2(
          averageTotalCompostPerUser,
          "gallons",
        );
        averageTotalCompostPerUser = (
          averageTotalCompostPerUser / totalUsers
        ).toFixed(2);
        createCharts(
          totalFoodCompost,
          totalYardCompost,
          histogramLabels,
          histogramData,
          histogramStep,
          totalCO2Saved,
          averageTotalCompostPerUser,
        );
      },
      function (response) {
        console.error(
          "Error loading sheet data:",
          response.result.error.message,
        );
      },
    );
}

function createCO2StatsticContainer(
  stat1, //co2
  stat2, //percentile
  mobileWidth = "4/5",
  desktopWidth = "3/12",
) {
  var container = document.createElement("div");
  container.classList.add(
    "flex",
    `w-${mobileWidth}`,
    `md:w-${desktopWidth}`,
    "mx-auto",
  );

  let desc1 = "Your CO2 savings:";
  let desc2 = "You are in the " + stat2 +" percentile. According to our data, the average composter in Santa Clara County is "
  + "blah blah blah. This is a combination of blah blah blah pounds in yard waste, blah blha blah pounds in food waste."
  var statCont1 = createCO2Element(stat1, desc1);
  statCont1.classList.remove("md:w-3/12","w-4/5"); 
  statCont1.classList.add("mr-1","md:w-1/8", "w-1/3");
  var statCont2 = createStatisticsDescription(stat2, desc2);
  statCont2.classList.remove("md:w-3/12","w-4/5");
  statCont2.classList.add("ml-1","md:w-1/8","max-w-full", "w-2/3");

  container.appendChild(statCont1);
  container.appendChild(statCont2);

  return container;
}

function createCO2Element(
  statistic,
  description,
  // iconSrc,
  // iconSize = "30px",
  width = "4/5",
  desktopWidth = "3/12",
) {
  // Rewrite statistic with a K if over 1000
  if (statistic > 1000) {
    statistic = (statistic / 1000).toFixed(2) + "K";
  }

  var container = document.createElement("div");
  container.classList.add(
    "p-8",
    "border",
    "border-gray-300",
    "rounded-3xl",
    `w-${width}`,
    `md:w-${desktopWidth}`,
    "mx-auto",
    "mt-2",
    "shadow-md",
  );

  var stat = document.createElement("p"); //stat
  stat.classList.add(
    "font-heading",
    "mb-6",
    "text-3xl",
    "md:text-4xl",
    "text-anr-off-blue",
    "font-black",
    "tracking-tight",
    "max-w-full",
    "text-center"
  );
  stat.innerHTML = statistic + " kg";

  var desc = document.createElement("p"); //your co2 saving
  desc.classList.add(
    "font-heading",
    "mb-2",
    "text-lg",
    "text-gray-700",
    "font-bold",
    "text-center"
  );

  desc.innerHTML += description;
  container.appendChild(desc);
  container.appendChild(stat);
  let desc3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac felis donec et odio. Nunc consequat interdum varius sit amet mattis vulputate enim nulla. Quam elementum pulvinar etiam non quam. Pretium viverra suspendisse potenti nullam ac. Vitae congue eu consequat ac felis. Commodo elit at imperdiet dui accumsan sit amet nulla. Ultricies integer quis auctor elit sed vulputate mi sit. Venenatis a condimentum vitae sapien pellentesque habitant. Eget gravida cum sociis natoque penatibus et magnis. Volutpat consequat mauris nunc congue nisi vitae suscipit. Arcu cursus vitae congue mauris rhoncus aenean. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Hendrerit dolor magna eget est lorem ipsum. Mattis nunc sed blandit libero volutpat sed cras ornare arcu. Non nisi est sit amet facilisis. In hendrerit gravida rutrum quisque non tellus. Pellentesque eu tincidunt tortor aliquam nulla. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras.";
  container.appendChild(
    popup("test", desc3),
  );
  
  return container;
}

function createStatisticsDescription(
  statistic, //percentile stat
  description,
  // iconSrc,
  // iconSize = "30px",
  width = "4/5",
  desktopWidth = "3/12",
){
  var container = document.createElement("div");
  container.classList.add(
    "p-8",
    "border",
    "border-gray-300",
    "rounded-3xl",
    `w-${width}`,
    `md:w-${desktopWidth}`,
    "mx-auto",
    "mt-2",
    "shadow-md",
  );

  var header = document.createElement("h3");
  header.classList.add(
    "font-heading",
    "mb-2",
    "text-3xl",
    "md:text-4xl",
    "font-bold",
    "text-anr-off-blue",
    "font-black",
    "text-center"
  );
  header.innerHTML += "Statistics";

  var desc = document.createElement("p");
  desc.classList.add(
    "font-heading",
    "mb-2",
    "text-lg",
    "text-gray-700",
    "font-bold",
    "text-center"
  );

  desc.innerHTML += description;
  
  container.appendChild(header);
  container.appendChild(desc);
  let desc3 = "bfskf sof psodf sdoiwpe  foipoid  e w  fs dofispfi spps fisofis fpsoifposfod fodfispdgurn gnkdjf v poisd f uiwnf  s efdfjsfj sf s g dfeufi d";
  var popUp = popup("text", desc3);
  container.appendChild(popUp);

  return container;
}

function createThreeStatsRowContainer(
  stat1,
  stat2,
  stat3,
  desc1,
  desc2,
  desc3,
  icon1,
  icon2,
  icon3,
  icon1Sz = "30px",
  icon2Sz = "30px",
  icon3Sz = "30px",
  mobileWidth = "4/5",
  desktopWidth = "3/12",
) {
    var container = document.createElement("div");
    container.classList.add(
      "flex",
      `w-${mobileWidth}`,
      `md:w-${desktopWidth}`,
      "mx-auto",
    );

    var statCont1 = createVerticleContainer(stat1, stat2, desc1, desc2, icon1, icon2, icon1Sz, icon2Sz);
    statCont1.classList.remove("md:w-3/12");
    statCont1.classList.add("mr-1", "md:w-1/2");
    var statCont2 = createStatsContainerElement(stat3, desc3, icon3, icon3Sz);
    statCont2.classList.remove("md:w-3/12");
    statCont2.classList.add("ml-1", "md:w-1/2");
    statCont2.children[1].classList.remove("text-base");
    statCont2.children[1].classList.add("text-xl");

    var icon = document.createElement("img");
    icon.classList.add(
      "w-full",
      "mb-3"
    );
    icon.src = icon3;
    icon.alt = "icon";

    statCont2.insertBefore(icon, statCont2.firstChild);

    container.appendChild(statCont1);
    container.appendChild(statCont2)

    return container;
}

function createVerticleContainer(
  stat1,
  stat2,
  desc1,
  desc2,
  icon1,
  icon2,
  icon1Sz = "30px",
  icon2Sz = "30px",
  mobileWidth = "4/5",
  desktopWidth = "3/12",
) {
    var container = document.createElement("div");
    container.classList.add(
      `w-${mobileWidth}`,
      `md:w-${desktopWidth}`,
      "mx-auto",
      "flex",
      "flex-col"
    );

    var statCont1 = createStatsContainerElement(stat1, desc1, icon1, icon1Sz);
    statCont1.classList.remove("md:w-3/12", "mx-auto");
    statCont1.classList.add("w-full","h-equal");
    var statCont2 = createStatsContainerElement(stat2, desc2, icon2, icon2Sz);
    statCont2.classList.remove("md:w-3/12","mx-auto");
    statCont2.classList.add("w-full", "h-equal");
    
    var icon = document.createElement("img");
    icon.classList.add(
      "w-3/4",
      "mb-3",
      "mx-auto"
    );
    icon.src = trashIMAGE;
    icon.alt = "icon";

    statCont2.insertBefore(icon, statCont2.firstChild);

    container.appendChild(statCont1);
    container.appendChild(statCont2);

    return container;
}

function popup(
  title,
  desc
){
  var container = document.createElement("div"); //contains modal and overlay
  container.classList.add("text-center");

  var moreInfo = document.createElement("button");
  moreInfo.setAttribute("data-modal-target", "#modal");
  moreInfo.classList.add('text-base', 'font-bold');
  moreInfo.innerHTML = "Learn More";
  container.append(moreInfo);

  var modal = document.createElement("div");
  modal.setAttribute("id", "modal");
  modal.classList.add(
    "modal",
  );

  var modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  var modalTitle = document.createElement("p");
  modalTitle.classList.add(
    'text-xl',
    'font-black'
  )
  modalTitle.innerHTML = title;

  var closeButton = document.createElement("button");
  closeButton.setAttribute("data-close-button", "close-button");
  closeButton.classList.add(
    'text-xl',
    'font-black'
  )
  closeButton.innerHTML = "&times;"

  var modalBody = document.createElement("div");
  modalBody.classList.add(
    'p-4'
    )
  modalBody.innerHTML = desc;

  var overlay = document.createElement("div");
  overlay.setAttribute("id", "overlay");
  
  // overlay.classList.add(
  //   'overlay',
  // )

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);
  modal.appendChild(modalHeader);
  modal.appendChild(modalBody);
  container.appendChild(moreInfo);
  container.appendChild(modal);
  container.appendChild(overlay);
  
  return container;
}

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}