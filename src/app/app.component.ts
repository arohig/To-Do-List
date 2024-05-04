import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Item } from "./item";
import { ItemComponent } from "./item/item.component";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, ItemComponent],
})
export class AppComponent {
  componentTitle = "My To Do List";

  filter: "all" | "active" | "done" = "all";

  allItems = [
    { description: "Start a project", done: true },
    { description: "Exercise", done: false },
    { description: "Respond to emails", done: false },
    { description: "Read a book", done: true },
    { description: "Attend a workshop", done: false }
  ];

  // add item to the top of the list
  addItem(description: string) {
    if (!description) return;
  
    this.allItems.unshift({
      description,
      done: false
    });
  }

  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }  

  // retrieve items from allItems depending on the filter
  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done
    );
  }
}
