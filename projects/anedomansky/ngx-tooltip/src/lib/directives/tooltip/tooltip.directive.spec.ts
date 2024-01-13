import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTooltipDirective } from './tooltip.directive';

@Component({
  template: `<button
    type="button"
    class="test-button"
    (click)="updateTooltip()"
    [ngxTooltip]="tooltip"
    placement="right"
    [styleClass]="styleClass"
    tooltipId="test-id"
  >
    Hover Me!
  </button>`,
  standalone: true,
  imports: [NgxTooltipDirective],
})
class TestComponent {
  @Input()
  tooltip = 'Test-Tooltip';

  @Input()
  styleClass = 'test-class';

  updateTooltip(): void {
    this.tooltip = 'test';
  }
}

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

  it('should render tooltip and hide it again', () => {
    const button = element.getElementsByClassName('test-button')[0];

    button.dispatchEvent(new Event('mouseenter'));

    expect(button.getAttribute('aria-describedby')).toBe('test-id');
    expect(
      document.getElementsByClassName('right-ngx-tooltip')[0],
    ).toBeTruthy();
    expect(document.getElementById('test-id')).toBeTruthy();

    button.dispatchEvent(new Event('mouseleave'));

    expect(button.getAttribute('aria-describedby')).toBeFalsy();
    expect(document.getElementsByClassName('right-ngx-tooltip')[0]).toBeFalsy();
    expect(document.getElementById('test-id')).toBeFalsy();
  });

  it('should update tooltip', () => {
    const button = element.getElementsByClassName(
      'test-button',
    )[0] as HTMLButtonElement;

    button.dispatchEvent(new Event('mouseenter'));

    expect(document.getElementById('test-id')).toBeTruthy();
    expect(document.getElementById('test-id')?.innerHTML).toBe('Test-Tooltip');

    component.tooltip = 'test';
    fixture.detectChanges();

    expect(document.getElementById('test-id')?.innerHTML).toBe('test');
  });
});
