import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxTooltipComponent {
  /**
   * ID of the tooltip.
   */
  @Input()
  id?: string;

  /**
   * Space-separated CSS classes for the tooltip.
   */
  @Input()
  styleClass?: string;

  /**
   * Content to show inside the tooltip.
   */
  @Input()
  tooltip?: string;
}
