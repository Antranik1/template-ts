import "./index.css";
import { getTimeZones } from "./model/timezones";
import { Diagram } from "./watch/diagram";

fetch("src/watch/watch.html")
  .then((response) => response.text())
  .then((data) => {
    populateTimeZonesSelect();

    const defaultMode = 0;
    const defaulAddedTime = 0;
    const allClocksElement = document.getElementById("allClocks");
    const addClockButton = document.getElementById("addClockButton");
    const intervalId: NodeJS.Timeout | null = null;
    let clockIndex = 1;
    if (addClockButton && allClocksElement) {
      addClockButton.addEventListener("click", () => {
        const selectedtimeZone = getSelectedTimeZone();
        console.log("Selected time zone : " + selectedtimeZone);

        const newClock = document.createElement("div");
        const newClockId = `clock${clockIndex}`;
        newClock.id = newClockId;

        const titleElement = document.createElement("h1");
        titleElement.textContent = selectedtimeZone;
        allClocksElement.appendChild(titleElement);
        allClocksElement.appendChild(newClock);

        const diffTime = getTimeDifferenceInHours(selectedtimeZone);

        setClock(data, newClockId, defaultMode, diffTime, intervalId);
        clockIndex++;
      });
    }

    const defaultId = "clockDefault";
    setClock(data, defaultId, defaultMode, defaulAddedTime, intervalId);
  })
  .catch((error) =>
    console.error("Erreur lors du chargement de watch.html", error),
  );

function setClock(
  data: string,
  clockId: string,
  defaultMode: number,
  addedTime: number,
  intervalId: NodeJS.Timeout | null,
) {
  const watchContentElement = document.getElementById(clockId);
  if (watchContentElement) {
    watchContentElement.innerHTML = data;
  }

  const diagram = new Diagram(defaultMode, addedTime, 0, clockId);
  diagram.initClock();
  if (intervalId === null) {
    setInterval(diagram.updateClock, 1000);
  }

  const mode = watchContentElement.querySelector("#mode");
  if (mode) {
    mode.addEventListener("click", () => {
      diagram.changeMode();
    });
  }

  const increase = watchContentElement.querySelector("#increase");
  if (increase) {
    increase.addEventListener("click", () => {
      diagram.addTime();
    });
  }

  const light = watchContentElement.querySelector("#light");
  if (light) {
    light.addEventListener("click", () => {
      diagram.turnTheLight();
    });
  }

  const reset = watchContentElement.querySelector("#reset");
  if (reset) {
    reset.addEventListener("click", () => {
      diagram.resetClock();
    });
  }

  const changeAmPm = watchContentElement.querySelector("#changeAmPm");
  if (changeAmPm) {
    changeAmPm.addEventListener("click", () => {
      diagram.changeAmPm();
    });
  }
}

function getSelectedTimeZone(): string {
  const selectElement = document.getElementById(
    "timezones",
  ) as HTMLSelectElement;
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const selectedTimeZone = selectedOption.value;
  return selectedTimeZone;
}

function populateTimeZonesSelect() {
  const selectElement = document.getElementById(
    "timezones",
  ) as HTMLSelectElement;

  getTimeZones().forEach((timeZone) => {
    const optionElement = document.createElement("option");
    optionElement.textContent = timeZone;
    optionElement.value = timeZone;
    selectElement.appendChild(optionElement);
  });
}

function getTimeDifferenceInHours(timeZone: string): number {
  const dateDefault = new Date();
  const options = { timeZone: timeZone };
  const dateOtherString = new Date().toLocaleString("en-US", options);
  const dateOther = new Date(dateOtherString);

  const diff = Math.round((dateOther.getTime() - dateDefault.getTime()) / 36e5);

  return diff;
}
