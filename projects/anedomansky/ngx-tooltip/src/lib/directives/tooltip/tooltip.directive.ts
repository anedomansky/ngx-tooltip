import {
  ConnectedPosition,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SecurityContext,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NgxTooltipComponent } from '../../components/tooltip/tooltip.component';
import { IdHelperService } from '../../services/id-helper.service';

export type Placement = 'top' | 'right' | 'bottom' | 'left';

const bottom: ConnectedPosition = {
  originX: 'center',
  originY: 'bottom',
  overlayX: 'center',
  overlayY: 'top',
  panelClass: 'bottom-ngx-tooltip',
};

const left: ConnectedPosition = {
  originX: 'start',
  originY: 'center',
  overlayX: 'end',
  overlayY: 'center',
  panelClass: 'left-ngx-tooltip',
};

const right: ConnectedPosition = {
  originX: 'end',
  originY: 'center',
  overlayX: 'start',
  overlayY: 'center',
  panelClass: 'right-ngx-tooltip',
};

const top: ConnectedPosition = {
  originX: 'center',
  originY: 'top',
  overlayX: 'center',
  overlayY: 'bottom',
  panelClass: 'top-ngx-tooltip',
};

const prefersBottom: ConnectedPosition[] = [bottom, top, left, right];
const prefersLeft: ConnectedPosition[] = [left, right, top, bottom];
const prefersRight: ConnectedPosition[] = [right, left, top, bottom];
const prefersTop: ConnectedPosition[] = [top, bottom, left, right];

@Directive({
  selector: '[ngxTooltip]',
  standalone: true,
})
export class NgxTooltipDirective implements OnChanges, OnInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly sanitizer = inject(DomSanitizer);

  private readonly overlay = inject(Overlay);

  private readonly overlayPositionBuilder = inject(OverlayPositionBuilder);

  private readonly renderer = inject(Renderer2);

  private readonly idHelper = inject(IdHelperService);

  /**
   * Content to show inside the tooltip.
   */
  @Input()
  ngxTooltip?: string;

  /**
   * ID of the tooltip.
   */
  @Input()
  tooltipId = this.idHelper.getDefaultId('ngx-tooltip');

  /**
   * Space-separated CSS classes for the tooltip.
   */
  @Input()
  styleClass?: string;

  /**
   * Placement of the tooltip
   * @default 'top'
   */
  @Input()
  placement: Placement = 'top';

  private overlayRef: OverlayRef | null = null;

  private tooltipPortal: ComponentPortal<NgxTooltipComponent> | null = null;

  private tooltipRef: ComponentRef<NgxTooltipComponent> | null = null;

  @HostListener('mouseenter')
  show(): void {
    if (!this.ngxTooltip) {
      return;
    }

    if (!this.tooltipPortal) {
      this.tooltipPortal = new ComponentPortal(NgxTooltipComponent);
    }

    if (this.overlayRef && this.ngxTooltip) {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        'aria-describedby',
        this.tooltipId,
      );

      // show the tooltip
      this.tooltipRef = this.overlayRef.attach(this.tooltipPortal);

      this.tooltipRef.instance.id = this.tooltipId;
      this.tooltipRef.instance.styleClass = this.styleClass;
      this.tooltipRef.instance.tooltip =
        this.sanitizer.sanitize(SecurityContext.HTML, this.ngxTooltip) ?? '';
    }
  }

  @HostListener('mouseleave')
  hide(): void {
    this.renderer.removeAttribute(
      this.elementRef.nativeElement,
      'aria-describedby',
    );

    // hide the tooltip
    this.overlayRef?.detach();
  }

  private initOverlay(): void {
    let positions: ConnectedPosition[] = [];

    switch (this.placement) {
      case 'top':
        positions = prefersTop;
        break;
      case 'right':
        positions = prefersRight;
        break;
      case 'bottom':
        positions = prefersBottom;
        break;
      case 'left':
        positions = prefersLeft;
        break;
    }

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
  }

  ngOnInit(): void {
    this.initOverlay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { placement, insureTooltip } = changes;

    if (placement?.currentValue) {
      this.overlayRef?.dispose();
      this.initOverlay();
    }

    if (insureTooltip?.currentValue) {
      this.tooltipRef?.setInput(
        'tooltip',
        this.sanitizer.sanitize(
          SecurityContext.HTML,
          insureTooltip.currentValue,
        ) ?? '',
      );
    }
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }
}

// TODO: test behavior while scrolling
// TODO: test correct placement
// TODO: check font-family
// TODO: introduce CSS custom properties for all values?
