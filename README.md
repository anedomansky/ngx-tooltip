# Ngx-tooltip

[![npm version](https://badge.fury.io/js/@anedomansky%2Fngx-tooltip.svg)](https://badge.fury.io/js/@anedomansky%2Fngx-tooltip)

An Angular directive for displaying tooltips.

## Features

- display text-based and HTML-based tooltips
- customize the tooltip with your own CSS
- supports automatic placement (default)
- uses [Angular CDK Overlay](https://v16.material.angular.io/cdk/overlay/overview)
- automatically sanatizes the provided tooltip content

## Dependencies

| ngx-tooltip | Angular |
| ----------- | ------- |
| current     | 16      |

## Installation

```cli
npm install @anedomansky/ngx-tooltip
```

## Setup

You'll have to include the ngx-tooltip styles in your `angular.json` file:

```json
"prefix": "app",
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
      ...,
      "styles": [
        "node_modules/@anedomansky/ngx-tooltip/styles/index.scss",
        ...
      ],
    },
```

## Usage

In order to use the tooltip directive, you just have to import in your component:

`app.component.ts`:

```ts
import { NgxTooltipDirective } from "@anedomansky/ngx-tooltip";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [NgxTooltipDirective],
})
export class AppComponent {
  tooltip = "My tooltip content";
}
```

`app.component.html`:

```html
<button type="button" (click)="doSomething()" [ngxTooltip]="tooltip" placement="top" [tooltipId]="tooltipId" [styleClass]="styleClass">Hover me!</button>
```

## Customization

You can alter the tooltip's styles. To do so, please add your styles to a global stylesheet:

`styles.scss`:

```scss
.cdk-overlay-pane .ngx-tooltip {
  background-color: #fff;
  border: 2px dotted #000;
}
```
