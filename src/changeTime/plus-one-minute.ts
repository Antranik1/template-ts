import { ids } from "../model/ids";
import { Diagram } from "../watch/diagram";
import { ChangeTime } from "./change-time";

export class PlusOneMinuteChangeTime implements ChangeTime {
  changeTime(diagram: Diagram): void {
    console.log("Plus one minute");
    const clockMinutes = diagram.clockElement.querySelector(
      ids.clockMinutesId,
    )!.textContent;
    if (clockMinutes === "59") {
      diagram.addedHours = diagram.addedHours + 1;
    }
    diagram.addedMinutes = diagram.addedMinutes + 1;
  }
}
