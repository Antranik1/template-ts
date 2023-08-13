import { Diagram } from "../watch/diagram";

export interface ChangeTime {
  changeTime(diagram: Diagram): void;
}
