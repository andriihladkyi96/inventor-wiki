import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangesMessageComponent } from './changes-message.component';

describe('ChangesMessageComponent', () => {
  let component: ChangesMessageComponent;
  let fixture: ComponentFixture<ChangesMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangesMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangesMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
