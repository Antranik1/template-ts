export class Diagram {
  constructor(
    private mode: number,
    private addedHours: number,
    private addedMinutes: number,
    private clockId: string,
  ) {}

  private oneDay24 = 24;
  private ampmDay = 12;
  private oneMinute = 60;
  private initDate: Date;
  private addedSeconds = 0;
  private clockElement: HTMLElement;
  private initOffset = 0;
  private format = "24h";
  private actualFormat = "";

  public initClock = () => {
    this.initDate = new Date();
    this.clockElement = document.getElementById(this.clockId);
    this.initOffset = this.initOffset + this.addedHours;
  };

  public updateClock = () => {
    const hours = this.initDate.getHours().toString();
    const clockHour = this.clockElement.querySelector("#clockHour")!;

    if (this.format === "24h") {
      const newHour = (Number(hours) + this.addedHours) % this.oneDay24;
      clockHour.textContent = newHour.toString();
    } else {
      const newHour = (Number(hours) + this.addedHours) % this.ampmDay;
      clockHour.textContent = newHour.toString();
    }

    const minutes = this.initDate.getMinutes().toString();
    const clockMinutes = this.clockElement.querySelector("#clockMinutes")!;
    const newMinutes = (Number(minutes) + this.addedMinutes) % this.oneMinute;
    clockMinutes.textContent = newMinutes.toString();

    this.addedSeconds = this.addedSeconds + 1;
    const seconds = this.initDate.getSeconds().toString();
    const clockSeconds = this.clockElement.querySelector("#clockSeconds")!;
    const newSeconds = (Number(seconds) + this.addedSeconds) % this.oneMinute;

    if (newSeconds === 59) {
      this.addedMinutes = this.addedMinutes + 1;
    }
    if (newMinutes === 59 && newSeconds === 59) {
      this.addedHours = this.addedHours + 1;
    }
    clockSeconds.textContent = newSeconds.toString();
  };

  public getMode(): number {
    return this.mode;
  }

  public changeMode() {
    this.mode < 2 ? (this.mode = this.mode + 1) : (this.mode = 0);
    console.log("Mode : " + this.getMode());
  }

  public addTime() {
    if (this.mode === 0) {
      console.log("No effect");
      return;
    }
    if (this.mode === 1) {
      console.log("Plus one hour");
      this.addedHours = this.addedHours + 1;
      if (this.format !== "24h") {
        const clockHour = Number(
          this.clockElement.querySelector("#clockHour")!.textContent,
        );
        const ampm = this.clockElement.querySelector("#amPm")!.textContent;
        if (clockHour === 11 && ampm === "PM") {
          this.clockElement.querySelector("#amPm")!.textContent = "AM";
        } else if (clockHour === 12 && ampm === "AM") {
          this.clockElement.querySelector("#amPm")!.textContent = "PM";
        }
      }
      return;
    }
    if (this.mode === 2) {
      console.log("Plus one minute");
      const clockMinutes =
        this.clockElement.querySelector("#clockMinutes")!.textContent;
      if (clockMinutes === "59") {
        this.addedHours = this.addedHours + 1;
      }
      this.addedMinutes = this.addedMinutes + 1;
      return;
    }
  }

  public turnTheLight() {
    const lightElement = this.clockElement.querySelector("#dial");

    if (lightElement.classList.contains("day")) {
      lightElement.classList.remove("day");
      lightElement.classList.add("night");
    } else {
      lightElement.classList.remove("night");
      lightElement.classList.add("day");
    }
  }

  public resetClock() {
    this.addedHours = this.initOffset;
    this.addedMinutes = 0;
    this.addedSeconds = 0;
    this.clockElement.querySelector("#amPm")!.textContent = this.actualFormat;
  }

  public changeAmPm() {
    if (this.format === "24h") {
      let clockHours = Number(
        this.clockElement.querySelector("#clockHour")!.textContent,
      );
      let ampm = "AM";

      if (clockHours >= 12) {
        ampm = "PM";
        clockHours %= 12;
      }
      if (clockHours === 0) {
        clockHours = 12;
      }
      this.clockElement.querySelector("#amPm")!.textContent = ampm;
      this.actualFormat = ampm;
      this.clockElement.querySelector("#clockHour")!.textContent =
        clockHours.toString();
      this.format = "AM/PM";
    } else {
      let clockHours = Number(
        this.clockElement.querySelector("#clockHour")!.textContent,
      );
      const ampm = this.clockElement.querySelector("#amPm")!.textContent;

      if (ampm === "PM" && clockHours < 12) {
        clockHours += 12;
      }

      if (ampm === "AM" && clockHours === 12) {
        clockHours = 0;
      }
      this.clockElement.querySelector("#clockHour")!.textContent =
        clockHours.toString();
      this.clockElement.querySelector("#amPm")!.textContent = "";
      this.actualFormat = "";
      this.format = "24h";
    }
  }
}
