import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTooltipDirective } from './tooltip.directive';

describe('NgxTooltipDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `<span
    class="test-span"
    [ngxTooltip]="tooltip"
    placement="right"
    [styleClass]="styleClass"
    tooltipId="test-id"
    >Hover Me!</span
  >`,
  standalone: true,
  imports: [NgxTooltipDirective],
})
class TestComponent {
  @Input()
  tooltip = 'Test-Tooltip';

  @Input()
  styleClass = 'test-class';
}
