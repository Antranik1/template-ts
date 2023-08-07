"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
var timezones_1 = require("./model/timezones");
var diagram_1 = require("./watch/diagram");
fetch("src/watch/watch.html")
    .then(function (response) { return response.text(); })
    .then(function (data) {
    populateTimeZonesSelect();
    var defaultMode = 0;
    var defaulAddedTime = 0;
    var allClocksElement = document.getElementById("allClocks");
    var addClockButton = document.getElementById("addClockButton");
    var intervalId = null;
    var clockIndex = 1;
    if (addClockButton && allClocksElement) {
        addClockButton.addEventListener("click", function () {
            var selectedtimeZone = getSelectedTimeZone();
            console.log("Selected time zone : " + selectedtimeZone);
            var newClock = document.createElement("div");
            var newClockId = "clock".concat(clockIndex);
            newClock.id = newClockId;
            var titleElement = document.createElement("h1");
            titleElement.textContent = selectedtimeZone;
            allClocksElement.appendChild(titleElement);
            allClocksElement.appendChild(newClock);
            var diffTime = getTimeDifferenceInHours(selectedtimeZone);
            setClock(data, newClockId, defaultMode, diffTime, intervalId);
            clockIndex++;
        });
    }
    var defaultId = "clockDefault";
    setClock(data, defaultId, defaultMode, defaulAddedTime, intervalId);
})
    .catch(function (error) {
    return console.error("Erreur lors du chargement de watch.html", error);
});
function setClock(data, clockId, defaultMode, addedTime, intervalId) {
    var watchContentElement = document.getElementById(clockId);
    if (watchContentElement) {
        watchContentElement.innerHTML = data.replace(/\${clockId}/g, clockId + "animation");
    }
    var diagram = new diagram_1.Diagram(defaultMode, addedTime, 0, clockId);
    diagram.initClock();
    if (intervalId === null) {
        setInterval(diagram.updateClock, 1000);
    }
    var mode = watchContentElement.querySelector("#mode");
    if (mode) {
        mode.addEventListener("click", function () {
            diagram.changeMode();
        });
    }
    var increase = watchContentElement.querySelector("#increase");
    if (increase) {
        increase.addEventListener("click", function () {
            diagram.addTime();
        });
    }
    var light = watchContentElement.querySelector("#light");
    if (light) {
        light.addEventListener("click", function () {
            diagram.turnTheLight();
        });
    }
    var reset = watchContentElement.querySelector("#reset");
    if (reset) {
        reset.addEventListener("click", function () {
            diagram.resetClock();
        });
    }
    var changeAmPm = watchContentElement.querySelector("#changeAmPm");
    if (changeAmPm) {
        changeAmPm.addEventListener("click", function () {
            diagram.changeAmPm();
        });
    }
    var rotate = watchContentElement.querySelector("#rotate");
    if (rotate) {
        rotate.addEventListener("click", function () {
            diagram.activateRotation();
        });
    }
    var flip = watchContentElement.querySelector("#flip");
    if (flip) {
        flip.addEventListener("click", function () {
            diagram.activateFlip();
        });
    }
    var multiply = watchContentElement.querySelector("#multiply");
    if (multiply) {
        multiply.addEventListener("click", function () {
            diagram.multiply();
        });
    }
    var translate = watchContentElement.querySelector("#translate");
    if (translate) {
        translate.addEventListener("click", function () {
            diagram.activateTranslation();
        });
    }
}
function getSelectedTimeZone() {
    var selectElement = document.getElementById("timezones");
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedTimeZone = selectedOption.value;
    return selectedTimeZone;
}
function populateTimeZonesSelect() {
    var selectElement = document.getElementById("timezones");
    (0, timezones_1.getTimeZones)().forEach(function (timeZone) {
        var optionElement = document.createElement("option");
        optionElement.textContent = timeZone;
        optionElement.value = timeZone;
        selectElement.appendChild(optionElement);
    });
}
function getTimeDifferenceInHours(timeZone) {
    var dateDefault = new Date();
    var options = { timeZone: timeZone };
    var dateOtherString = new Date().toLocaleString("en-US", options);
    var dateOther = new Date(dateOtherString);
    var diff = Math.round((dateOther.getTime() - dateDefault.getTime()) / 36e5);
    return diff;
}
