import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LeretComponent } from './leret.component';

describe('LeretComponent', () => {
  let component: LeretComponent;
  let fixture: ComponentFixture<LeretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeretComponent ],
      imports: [
        NoopAnimationsModule,
        DragDropModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
