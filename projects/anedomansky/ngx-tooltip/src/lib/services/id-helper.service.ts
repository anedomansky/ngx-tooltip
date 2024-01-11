import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdHelperService {
  private componentCounter: number;

  constructor() {
    this.componentCounter = 0;
  }

  /**
   * Creates a continuously incremented default id for the specified component name.
   * @param componentName
   * @returns
   */
  getDefaultId(componentName: string): string {
    const defaultId = `${componentName}-${this.componentCounter}`;
    this.componentCounter += 1;

    return defaultId;
  }
}
