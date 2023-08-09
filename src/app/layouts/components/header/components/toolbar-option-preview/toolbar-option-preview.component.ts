import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ToolbarOption } from 'src/app/layouts/interfaces/header.interfaces';

@Component({
  selector: 'app-toolbar-option-preview',
  templateUrl: './toolbar-option-preview.component.html',
  styleUrls: ['./toolbar-option-preview.component.scss'],
  animations: [
    trigger('topdown', [
      state('end', style({ 'margin-top': '-12px', opacity: 0 })),
      state('start', style({ 'margin-top': '0px', opacity: 1 })),
      transition('start => end', [animate('200ms')]),
    ]),
  ],
})
export class ToolbarOptionPreviewComponent implements OnInit {
  @Input() option?: ToolbarOption;

  marketIndicatorsCloseDay = [
    {
      ticker: 'VALE3',
      quotation: 'R$69,99',
      closeDayVariation: '0,55%',
      image: 'https://s3-symbol-logo.tradingview.com/vale--big.svg',
    },
    {
      ticker: 'VALE3',
      quotation: 'R$69,99',
      closeDayVariation: '0,55%',
      image: 'https://s3-symbol-logo.tradingview.com/vale--big.svg',
    },
    {
      ticker: 'VALE3',
      quotation: 'R$69,99',
      closeDayVariation: '0,55%',
      image: 'https://s3-symbol-logo.tradingview.com/vale--big.svg',
    },
    {
      ticker: 'VALE3',
      quotation: 'R$69,99',
      closeDayVariation: '0,55%',
      image: 'https://s3-symbol-logo.tradingview.com/vale--big.svg',
    },
  ];

  ngOnInit(): void {}
}
