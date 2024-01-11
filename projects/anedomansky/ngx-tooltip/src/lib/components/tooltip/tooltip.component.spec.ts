import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTooltipComponent } from './tooltip.component';

describe('NgxTooltipComponent', () => {
  let component: NgxTooltipComponent;
  let fixture: ComponentFixture<NgxTooltipComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxTooltipComponent],
    });
    fixture = TestBed.createComponent(NgxTooltipComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
