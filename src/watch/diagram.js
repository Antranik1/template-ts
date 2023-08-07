"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagram = void 0;
var Diagram = /** @class */ (function () {
    function Diagram(mode, addedHours, addedMinutes, clockId) {
        var _this = this;
        this.mode = mode;
        this.addedHours = addedHours;
        this.addedMinutes = addedMinutes;
        this.clockId = clockId;
        this.oneDay24 = 24;
        this.ampmDay = 12;
        this.oneMinute = 60;
        this.addedSeconds = 0;
        this.initOffset = 0;
        this.format = "24h";
        this.actualFormat = "";
        // animation
        this.rotationAngle = 0;
        this.isRotation = false;
        this.isFlip = false;
        this.flip = -1;
        this.multiplyTarget = 0;
        this.isTranslating = false;
        this.translationX = 0;
        this.initClock = function () {
            _this.initDate = new Date();
            _this.clockElement = document.getElementById(_this.clockId);
            console.log(_this.clockId);
            _this.initOffset = _this.initOffset + _this.addedHours;
        };
        this.updateClock = function () {
            var hours = _this.initDate.getHours().toString();
            var clockHour = _this.clockElement.querySelector("#clockHour");
            if (_this.format === "24h") {
                var newHour = (Number(hours) + _this.addedHours) % _this.oneDay24;
                clockHour.textContent = newHour.toString();
            }
            else {
                var newHour = (Number(hours) + _this.addedHours) % _this.ampmDay;
                clockHour.textContent = newHour.toString();
            }
            var minutes = _this.initDate.getMinutes().toString();
            var clockMinutes = _this.clockElement.querySelector("#clockMinutes");
            var newMinutes = (Number(minutes) + _this.addedMinutes) % _this.oneMinute;
            clockMinutes.textContent = newMinutes.toString();
            _this.addedSeconds = _this.addedSeconds + 1;
            var seconds = _this.initDate.getSeconds().toString();
            var clockSeconds = _this.clockElement.querySelector("#clockSeconds");
            var newSeconds = (Number(seconds) + _this.addedSeconds) % _this.oneMinute;
            if (newSeconds === 59) {
                _this.addedMinutes = _this.addedMinutes + 1;
            }
            if (newMinutes === 59 && newSeconds === 59) {
                _this.addedHours = _this.addedHours + 1;
            }
            clockSeconds.textContent = newSeconds.toString();
            var idToUse = "#" + _this.clockId + "animation";
            var watchElement = document.querySelector(idToUse);
            if (_this.isRotation) {
                _this.rotationAngle = _this.rotationAngle + 10;
                watchElement.style.transform = "rotate(".concat(_this.rotationAngle, "deg)");
                for (var index = 0; index < _this.multiplyTarget; index++) {
                    var newIdToUse = "#" + _this.clockId + "Clone" + index;
                    var watchElement_1 = document.querySelector(newIdToUse);
                    _this.rotationAngle = _this.rotationAngle + 10;
                    watchElement_1.style.transform = "rotate(".concat(_this.rotationAngle, "deg)");
                }
            }
            if (_this.isFlip) {
                _this.flip = _this.flip * -1;
                var flipX = "scaleX(" + _this.flip + ")";
                watchElement.style.transform = flipX;
                watchElement.style.transition = "transform 0.3s ease-in-out";
                for (var index = 0; index < _this.multiplyTarget; index++) {
                    var newIdToUse = "#" + _this.clockId + "Clone" + index;
                    var watchElement_2 = document.querySelector(newIdToUse);
                    _this.flip = _this.flip * -1;
                    var flipY = "scaleY(" + _this.flip + ")";
                    watchElement_2.style.transform = flipY;
                    watchElement_2.style.transition = "transform 0.3s ease-in-out";
                }
            }
            if (_this.isTranslating) {
                var distanceX = 50;
                _this.translationX += distanceX;
                watchElement.style.transform = "translateX(".concat(_this.translationX, "px)");
                console.log("this.multiplyTarget : " + _this.multiplyTarget);
                for (var index = 0; index < _this.multiplyTarget; index++) {
                    var newIdToUse = "#" + _this.clockId + "Clone" + index;
                    console.log("newIdToUse : " + newIdToUse);
                    var watchElementClone = document.querySelector(newIdToUse);
                    var cloneDistanceX = 30;
                    var cloneTranslationX = index * cloneDistanceX;
                    watchElementClone.style.transform = "translateX(".concat(cloneTranslationX, "px)");
                }
            }
        };
    }
    Diagram.prototype.getMode = function () {
        return this.mode;
    };
    Diagram.prototype.changeMode = function () {
        this.mode < 2 ? (this.mode = this.mode + 1) : (this.mode = 0);
        console.log("Mode : " + this.getMode());
    };
    Diagram.prototype.addTime = function () {
        if (this.mode === 0) {
            console.log("No effect");
            return;
        }
        if (this.mode === 1) {
            console.log("Plus one hour");
            this.addedHours = this.addedHours + 1;
            if (this.format !== "24h") {
                var clockHour = Number(this.clockElement.querySelector("#clockHour").textContent);
                var ampm = this.clockElement.querySelector("#amPm").textContent;
                if (clockHour === 11 && ampm === "PM") {
                    this.clockElement.querySelector("#amPm").textContent = "AM";
                }
                else if (clockHour === 12 && ampm === "AM") {
                    this.clockElement.querySelector("#amPm").textContent = "PM";
                }
            }
            return;
        }
        if (this.mode === 2) {
            console.log("Plus one minute");
            var clockMinutes = this.clockElement.querySelector("#clockMinutes").textContent;
            if (clockMinutes === "59") {
                this.addedHours = this.addedHours + 1;
            }
            this.addedMinutes = this.addedMinutes + 1;
            return;
        }
    };
    Diagram.prototype.turnTheLight = function () {
        var lightElement = this.clockElement.querySelector("#dial");
        if (lightElement.classList.contains("day")) {
            lightElement.classList.remove("day");
            lightElement.classList.add("night");
        }
        else {
            lightElement.classList.remove("night");
            lightElement.classList.add("day");
        }
    };
    Diagram.prototype.resetClock = function () {
        this.addedHours = this.initOffset;
        this.addedMinutes = 0;
        this.addedSeconds = 0;
        this.clockElement.querySelector("#amPm").textContent = this.actualFormat;
    };
    Diagram.prototype.changeAmPm = function () {
        if (this.format === "24h") {
            var clockHours = Number(this.clockElement.querySelector("#clockHour").textContent);
            var ampm = "AM";
            if (clockHours >= 12) {
                ampm = "PM";
                clockHours %= 12;
            }
            if (clockHours === 0) {
                clockHours = 12;
            }
            this.clockElement.querySelector("#amPm").textContent = ampm;
            this.actualFormat = ampm;
            this.clockElement.querySelector("#clockHour").textContent =
                clockHours.toString();
            this.format = "AM/PM";
        }
        else {
            var clockHours = Number(this.clockElement.querySelector("#clockHour").textContent);
            var ampm = this.clockElement.querySelector("#amPm").textContent;
            if (ampm === "PM" && clockHours < 12) {
                clockHours += 12;
            }
            if (ampm === "AM" && clockHours === 12) {
                clockHours = 0;
            }
            this.clockElement.querySelector("#clockHour").textContent =
                clockHours.toString();
            this.clockElement.querySelector("#amPm").textContent = "";
            this.actualFormat = "";
            this.format = "24h";
        }
    };
    Diagram.prototype.activateRotation = function () {
        this.isRotation = !this.isRotation;
        console.log("Rotate = " + this.isRotation);
    };
    Diagram.prototype.activateFlip = function () {
        this.isFlip = !this.isFlip;
        console.log("Flip = " + this.isFlip);
    };
    Diagram.prototype.multiply = function () {
        var idToUse = "#" + this.clockId + "animation";
        var watchElement = document.querySelector(idToUse);
        this.multiplyTarget = this.multiplyTarget + 1;
        console.log(this.multiplyTarget);
        for (var i = 0; i < this.multiplyTarget; i++) {
            var clone = watchElement.cloneNode(true);
            clone.id = "".concat(this.clockId, "Clone").concat(i);
            clone.style.position = "absolute";
            var distance = 100 * Math.floor(Math.random() * (this.multiplyTarget + 1));
            var randomPosition = Math.floor(Math.random() * 9);
            if (randomPosition === 1) {
                clone.style.transform = "translate(".concat(distance * i, "px, ").concat(distance * i, "px)");
            }
            else if (randomPosition === 2) {
                clone.style.transform = "translate(".concat(distance * -i, "px, ").concat(distance * i, "px)");
            }
            else if (randomPosition === 3) {
                clone.style.transform = "translate(".concat(distance * i, "px, ").concat(distance * -i, "px)");
            }
            else if (randomPosition === 4) {
                clone.style.transform = "translate(".concat(distance * -i, "px, ").concat(distance * -i, "px)");
            }
            else if (randomPosition === 5) {
                clone.style.transform = "translate(".concat(distance * i, "px, 0px)");
            }
            else if (randomPosition === 6) {
                clone.style.transform = "translate(".concat(distance * -i, "px, 0px)");
            }
            else if (randomPosition === 7) {
                clone.style.transform = "translate(0px, ".concat(distance * -i, "px)");
            }
            else if (randomPosition === 8) {
                clone.style.transform = "translate(0px, ".concat(distance * -i, "px)");
            }
            console.log(clone);
            watchElement.parentElement.appendChild(clone);
        }
    };
    Diagram.prototype.activateTranslation = function () {
        this.isTranslating = !this.isTranslating;
    };
    return Diagram;
}());
exports.Diagram = Diagram;
