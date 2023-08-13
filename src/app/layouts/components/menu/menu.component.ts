import { Component } from '@angular/core';
import { MenuOption } from './interface/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  options: Array<MenuOption> = [
    {
      icon: 'analytics',
      label: 'Painel',
      activated: true,
      mode: 'expansion',
      expanded: false,
      children: [
        { label: 'Carteira' },
        { label: 'Dividendos' },
        { label: 'Gráficos' },
      ],
    },
    {
      icon: 'multiline_chart',
      label: 'Mercados',
      activated: false,
      mode: 'static',
    },
    {
      icon: 'calendar_today',
      label: 'Calendário',
      activated: false,
      mode: 'static',
    },
    {
      icon: 'trophy',
      label: 'Rankings',
      activated: false,
      mode: 'static',
    },
  ];

  constructor() {}

  selectOption(option: MenuOption) {
    const index = this.options.findIndex(
      (element) => element.label === option.label
    );
    if (index !== -1) {
      this.options.map((element) => (element.activated = false));
      this.options[index].activated = true;
      const isExpansion =
        option?.expanded !== null && this.options[index].mode === 'expansion';
      if (isExpansion) this.toggleExpandedState(index);
    }
  }

  toggleExpandedState = (index: number) =>
    (this.options[index].expanded = !this.options[index].expanded);
}
