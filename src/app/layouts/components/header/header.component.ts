import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { Stock } from 'src/app/interfaces/ticker-quote';
import { TickerQuoteService } from 'src/app/services/ticker-quote.service';
import { ToolbarOption } from '../../interfaces/header.interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  highlights = [
    { label: 'Criptomoedas', value: '23,913' },
    { label: 'Trocas', value: '621' },
    { label: 'Cap. de Mercado', value: '$1,189,465,343,645' },
    { label: 'Vol 24h', value: '$33,846,826,254' },
    { label: 'Dominância', value: 'BTC: 47.1% ETH: 19.3%' },
  ];

  economyMarketIndicators = [
    { label: 'Dólar', value: 'R$4,80' },
    { label: 'IPCA', value: '4,14%' },
    { label: 'SELIC', value: '13,75%' },
  ];

  toolbarOptions: Array<ToolbarOption> = [
    {
      label: 'Mercado',
      icon: 'finance',
      description: 'Altas e baixas do mercado',
      hovered: false,
    },
    {
      label: 'Gráficos',
      icon: 'star',
      description: 'Veja os destaques do mercado nos últimos dias.',
      hovered: false,
    },
    {
      label: 'Calendário',
      icon: 'data_usage',
      description: 'Veja os destaques do mercado nos últimos dias.',
      hovered: false,
    },
    {
      label: 'Rankings',
      icon: 'data_usage',
      description: 'Veja os destaques do mercado nos últimos dias.',
      hovered: false,
    },
  ];

  searchInput = new FormControl('');
  subject = new Subject();
  openSuggestions = false;
  outOfSuggestionsSafeArea = true;
  loadingSuggestions = false;
  suggestedTickerPreviewVisibility = false;
  suggestedTickerPreview?: Stock = {
    logo: 'https://s3-symbol-logo.tradingview.com/vale--big.svg',
    stock: 'VALE3',
    name: 'VALE S.A',
    close: 72.8,
    sector: 'Minérios',
    change: 0,
    volume: 0,
    market_cap: 0,
    closeDay: 'positive',
  };

  // fakeSuggestionsTickers = new Array(10);
  fakeSuggestionsTickers = [
    {
      image: 'https://s3-symbol-logo.tradingview.com/vale--big.svg',
      ticker: 'VALE3',
      company: 'VALE S.A',
      quotation: 'R$72,80',
    },
    {
      image: 'https://s3-symbol-logo.tradingview.com/itausa--big.svg',
      ticker: 'ITSA4',
      company: 'ITAUSA PN',
      quotation: 'R$9.9',
    },
    {
      image: 'https://s3-symbol-logo.tradingview.com/jbs-s-a--big.svg',
      ticker: 'JBSS3',
      company: 'JBS',
      quotation: 'R$17,93',
    },
    {
      image: 'https://s3-symbol-logo.tradingview.com/csn-mineracao--big.svg',
      ticker: 'CMIN3',
      company: 'CMIN Mineração',
      quotation: 'R$4,42',
    },
    {
      image:
        'https://s3-symbol-logo.tradingview.com/magaz-luiza-on-nm--big.svg',
      ticker: 'MGLU3',
      company: 'MAGAZINE LUIZA',
      quotation: 'R$3,07',
    },
    {
      image: 'https://s3-symbol-logo.tradingview.com/cemig--big.svg',
      ticker: 'CMIG4',
      company: 'CEMIG PN',
      quotation: 'R$12,67',
    },
    {
      image: 'https://s3-symbol-logo.tradingview.com/vale--big.svg',
      ticker: 'VALE3',
      company: 'VALE S.A',
      quotation: 'R$72,80',
    },
  ];

  filteredSuggestionsBySeachInput: any = [];

  tickerSuggestionsBySearch: Stock[] = [
    {
      logo: 'https://s3-symbol-logo.tradingview.com/vale--big.svg',
      stock: 'VALE3',
      name: 'VALE S.A',
      close: 72.8,
      sector: 'Minérios',
      change: 0,
      volume: 0,
      market_cap: 0,
      closeDay: 'positive',
    },
    {
      logo: 'https://s3-symbol-logo.tradingview.com/vale--big.svg',
      stock: 'VALE3',
      name: 'VALE S.A',
      close: 72.8,
      sector: 'Minérios',
      change: 0,
      volume: 0,
      market_cap: 0,
      closeDay: 'negative',
    },
  ];
  limit = 10;

  constructor(private tickerQuoteService: TickerQuoteService) {}

  ngOnInit() {
    this.onSearchInputChanges();
    // this.getSuggestions();f
    this.filteredSuggestionsBySeachInput = this.fakeSuggestionsTickers;
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }

  @HostListener('window:click', ['$event'])
  closeTickerSuggestionsOnWindowTap() {
    if (this.openSuggestions && this.outOfSuggestionsSafeArea)
      this.openSuggestions = false;
  }

  getSuggestions(limit: number = 10, search: string = '') {
    this.tickerQuoteService
      .getTickersQuote(limit, search)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.tickerSuggestionsBySearch = response.stocks;
        },
        error: (_) => (this.tickerSuggestionsBySearch = []),
      });
  }

  setAutocompleteSuggestions() {
    this.openSuggestions = true;
  }

  onSearchInputChanges() {
    this.searchInput.valueChanges
      .pipe(debounceTime(350), takeUntil(this.subject))
      .subscribe((search) => {
        if (search !== null) this.getSuggestions(this.limit, search);
      });
  }

  setSuggestionsSafeArea(isSafe: boolean) {
    this.outOfSuggestionsSafeArea = !isSafe;
  }

  toggleSuggestedTickerIndicatorsPreview(
    show: boolean,
    suggestedTicker: Stock
  ) {
    this.suggestedTickerPreviewVisibility = show;
    this.suggestedTickerPreview = suggestedTicker;
  }

  onScrollSuggestions(event: any) {
    const { offsetHeight, scrollTop, scrollHeight } = event.target;
    if (offsetHeight + scrollTop - 2 >= scrollHeight) {
      this.limit += 10;
      this.getSuggestions(this.limit, this.searchInput.value ?? '');
    }
  }

  handleToolbarOptionPreview(toolbarOption: ToolbarOption, show: boolean) {
    const index = this.toolbarOptions.findIndex(
      (element) => element.label === toolbarOption.label
    );
    this.toolbarOptions[index].hovered = index !== -1 && show;
    console.log();
  }
}
