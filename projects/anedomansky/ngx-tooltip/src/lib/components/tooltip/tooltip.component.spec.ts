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

  it('should show styleClass', () => {
    fixture.componentRef.setInput('styleClass', 'test');
    fixture.detectChanges();

    const container = element.getElementsByClassName('ngx-tooltip')[0];

    expect(container).toBeTruthy();
    expect(container.classList.contains('test')).toBeTruthy();
  });

  it('should show id', () => {
    fixture.componentRef.setInput('id', 'test');
    fixture.detectChanges();

    const span = element.querySelector('span');

    expect(span?.id).toBe('test');
  });

  it('should show tooltip', () => {
    fixture.componentRef.setInput('tooltip', 'test');
    fixture.detectChanges();

    const span = element.querySelector('span');

    expect(span).toBeTruthy();
    expect(span?.childNodes.length).toBe(1);
    expect(span?.innerHTML).toBe('test');
  });
});
