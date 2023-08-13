import { format } from "../model/format";
import { ids } from "../model/ids";
import { Diagram } from "../watch/diagram";
import { ChangeTime } from "./change-time";

export class PlusOneHourChangeTime implements ChangeTime {
  changeTime(diagram: Diagram): void {
    console.log("Plus one hour");
    diagram.addedHours = diagram.addedHours + 1;
    if (diagram.format !== format.hFormat) {
      const clockHour = Number(
        diagram.clockElement.querySelector(ids.clockHourId)!.textContent,
      );
      const ampm = diagram.clockElement.querySelector(ids.ampmId)!.textContent;
      if (clockHour === 11 && ampm === format.pmFormat) {
        diagram.clockElement.querySelector(ids.ampmId)!.textContent =
          format.amFormat;
      } else if (clockHour === 12 && ampm === format.amFormat) {
        diagram.clockElement.querySelector(ids.ampmId)!.textContent =
          format.pmFormat;
      }
    }
  }
}
