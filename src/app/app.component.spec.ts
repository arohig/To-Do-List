import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My To Do List');
  });

  it('should have correct number of items in each filter', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('5 items'); // 5 total items initially

    let todoButton = compiled.querySelector(('.btn-wrapper .btn-menu:nth-child(2)'));
    if (todoButton) todoButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(compiled.querySelector('h2')?.textContent).toContain('3 items'); // 3 todo items initially

    todoButton = compiled.querySelector(('.btn-wrapper .btn-menu:nth-child(3)'));
    if (todoButton) todoButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(compiled.querySelector('h2')?.textContent).toContain('2 items'); // 2 done items initially
  });

  it('should have correct number of items after adding task', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    app.addItem('Watch a history video');
    fixture.detectChanges();
    expect(compiled.querySelector('h2')?.textContent).toContain('6 items'); // 6 total items

    let todoButton = compiled.querySelector(('.btn-wrapper .btn-menu:nth-child(2)'));
    if (todoButton) todoButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(compiled.querySelector('h2')?.textContent).toContain('4 items'); // 4 todo items

    todoButton = compiled.querySelector(('.btn-wrapper .btn-menu:nth-child(3)'));
    if (todoButton) todoButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(compiled.querySelector('h2')?.textContent).toContain('2 items'); // 2 done items
  });

  it('should have correct number of items after removing task', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const item = app.items.find(((item) => item.description === "Start a project" && item.done === true));
    if (item) {
      app.remove(item);
    }

    fixture.detectChanges();
    expect(compiled.querySelector('h2')?.textContent).toContain('4 items'); // 4 total items
    expect(app.items.at(0)?.description).toBe('Exercise');

    let todoButton = compiled.querySelector(('.btn-wrapper .btn-menu:nth-child(2)'));
    if (todoButton) todoButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(compiled.querySelector('h2')?.textContent).toContain('3 items'); // 3 todo items
    expect(app.items.at(0)?.description).toBe('Exercise');

    todoButton = compiled.querySelector(('.btn-wrapper .btn-menu:nth-child(3)'));
    if (todoButton) todoButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(compiled.querySelector('h2')?.textContent).toContain('1 item'); // 1 done item
    expect(app.items.at(0)?.description).toBe('Read a book');
  });
});
