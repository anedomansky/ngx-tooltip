import { NgxTooltipDirective } from '@anedomansky/ngx-tooltip';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgxTooltipDirective],
})
export class AppComponent {}
