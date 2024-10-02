import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  @Input() placeholder?: string = "Input text";
  @Output() search = new EventEmitter<string>();

  @ViewChild("searchForm") public searchForm!: NgForm;
  public searchText!: string;

  onSearch(value: string): void {
    if (this.searchForm.valid) {
      this.search.emit(value);
      this.searchForm.reset();
    }
  }
}
