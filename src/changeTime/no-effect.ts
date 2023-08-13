import { Diagram } from "../watch/diagram";
import { ChangeTime } from "./change-time";

export class NoEffectChangeTime implements ChangeTime {
  changeTime(diagram: Diagram): void {
    console.log("No effect");
  }
}
