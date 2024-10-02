import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  // Add your code here
  transform(duration: number): string {
    if (duration < 0 || duration === null) return "00:00 hours";

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const hoursString = hours.toString().padStart(2, "0");
    const minutesString = minutes.toString().padStart(2, "0");

    return `${hoursString}:${minutesString} ${hours > 1 ? "hours" : "hour"}`;
  }
}
