export enum ClockMode {
  Default = 0,
  AddHours = 1,
  AddMinutes = 2,
}

export const ClockModeLabels = new Map<number, string>([
  [ClockMode.Default, "Default mode"],
  [ClockMode.AddHours, "Increase hours mode"],
  [ClockMode.AddMinutes, "Increase minutes mode"],
]);
