import { Component, Input } from '@angular/core';
import { Stock } from 'src/app/interfaces/ticker-quote';
import { Ticker } from 'src/app/shared/interfaces/ticker';

@Component({
  selector: 'app-ticker-indicators-preview',
  templateUrl: './ticker-indicators-preview.component.html',
  styleUrls: ['./ticker-indicators-preview.component.scss'],
})
export class TickerIndicatorsPreviewComponent {
  @Input() suggestedTickerPreview?: Stock;
  @Input() previewVisibility = false;

  valuationIndicators = [
    { indicator: 'P/L', value: 3.99 },
    { indicator: 'Dividendo', value: 6.99 },
    { indicator: 'P/VP', value: 1.5 },
    { indicator: 'VPA', value: 12.99 },
  ];

  constructor() {}

  ngOnChanges() {
    if (this.suggestedTickerPreview) {
      const positiveCloseDay = !this.suggestedTickerPreview.change
        .toString()
        .includes('-');
      const closeDay = positiveCloseDay ? 'positive' : 'negative';
      this.suggestedTickerPreview.closeDay = closeDay;
    }
  }
}
