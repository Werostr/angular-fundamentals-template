import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  // Add your code here
  transform(date: Date | string): string {
    if (typeof date === "string") {
      const [day, month, year] = date.split("/").map(Number);
      date = new Date(year, month - 1, day);
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }
}
