import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { TickerIndicatorsPreviewComponent } from './components/ticker-indicators-preview/ticker-indicators-preview.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DividerComponent } from 'src/app/shared/components/divider/divider.component';
import { TickerQuoteService } from 'src/app/services/ticker-quote.service';
import { ButtonModule } from 'primeng/button';
import { ToolbarOptionPreviewComponent } from './components/toolbar-option-preview/toolbar-option-preview.component';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    HeaderComponent,
    TickerIndicatorsPreviewComponent,
    ToolbarOptionPreviewComponent,
  ],
  imports: [
    CommonModule,
    DividerComponent,
    InputTextModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ButtonModule,
    CarouselModule,
  ],
  exports: [
    HeaderComponent,
    TickerIndicatorsPreviewComponent,
    ToolbarOptionPreviewComponent,
  ],
  providers: [TickerQuoteService],
})
export class HeaderModule {}
