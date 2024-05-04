import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { Item } from "../item";
import { AppComponent } from '../app.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let appComponent: AppComponent;
  let appFixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent],
      providers: [{ provide: AppComponent }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    appFixture = TestBed.createComponent(AppComponent);
    appComponent = appFixture.componentInstance;
    component.item = appComponent.items[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save correct description', () => {
    const item: Item = { description: 'Cook food', done: true };
    component.item = item;

    component.saveItem('Have lunch');
 
    expect(component.item.description).toBe('Have lunch');
  });

  it('should display correct text', () => {
    const itemElement: HTMLElement = fixture.nativeElement;
    expect(itemElement.textContent).toContain("Start a project");
  });

  it('should set editable to false initially', () => {
    expect(component.editable).toBeFalse();
  });

  it('should edit item', () => {
    const itemElement = fixture.nativeElement as HTMLElement;
    let editButton = itemElement.querySelector('.btn');
    if (editButton) {
      expect(editButton.innerHTML).toContain("Edit");
      editButton.dispatchEvent(new Event('click'));
      fixture.detectChanges();
    }

    let inputText = itemElement.querySelector('label');
    if (inputText) {
      inputText.textContent = "Bake cookies";
      if (inputText) inputText.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(inputText.textContent).toContain("Bake cookies");

      let saveButton = itemElement.querySelector(('button.btn.btn-save'));
      if (saveButton) saveButton.dispatchEvent(new Event('click'));
    }
    fixture.detectChanges();
    expect(itemElement.textContent).toContain("Bake cookies");
  });
});
