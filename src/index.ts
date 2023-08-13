import "./index.css";
import { getTimeZones } from "./model/timezones";
import { Diagram } from "./watch/diagram";
import { watchTemplate } from "./watch/watch-template";

document.addEventListener("DOMContentLoaded", () => {
  const defaultId = "clockDefault";
  const defaultElement = document.getElementById(defaultId);
  defaultElement.innerHTML = watchTemplate(defaultId);
  populateTimeZonesSelect();
  const defaulAddedTime = 0;
  const allClocksElement = document.getElementById("allClocks");
  const addClockButton = document.getElementById("addClockButton");

  const diagramInstances: Diagram[] = [];
  setInterval(() => {
    for (const instance of diagramInstances) {
      instance.updateClock();
    }
  }, 1000);

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

      setClock(newClockId, diffTime, diagramInstances);
      clockIndex++;
    });
  }
  setClock(defaultId, defaulAddedTime, diagramInstances);
});

function setClock(
  clockId: string,
  addedTime: number,
  diagramInstances: Diagram[],
) {
  const watchContentElement = document.getElementById(clockId);
  watchContentElement.innerHTML = watchTemplate(clockId + "animation");

  const diagram = new Diagram(addedTime, 0, clockId);
  diagramInstances.push(diagram);
  diagram.initClock();

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

  const rotate = watchContentElement.querySelector("#rotate");
  if (rotate) {
    rotate.addEventListener("click", () => {
      diagram.activateRotation();
    });
  }

  const flip = watchContentElement.querySelector("#flip");
  if (flip) {
    flip.addEventListener("click", () => {
      diagram.activateFlip();
    });
  }

  const multiply = watchContentElement.querySelector("#multiply");
  if (multiply) {
    multiply.addEventListener("click", () => {
      diagram.multiply();
    });
  }

  const translate = watchContentElement.querySelector("#translate");
  if (translate) {
    translate.addEventListener("click", () => {
      diagram.activateTranslation();
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
