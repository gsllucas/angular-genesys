import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MenuOption } from '../../interface/menu.interface';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-menu-tile',
  templateUrl: './menu-tile.component.html',
  styleUrls: ['./menu-tile.component.scss'],
  // animations: [
  //   trigger('expansion', [
  //     state('collapsed', style({ height: '0', opacity: 0 })),
  //     state('expanded', style({ height: 'min-content', opacity: 1 })),
  //     transition('collapsed <=> expanded', [animate('120ms ease-in-out')]),
  //   ]),
  // ],
})
export class MenuTileComponent {
  @Input() option?: MenuOption;
  @Output() selectOption = new EventEmitter<MenuOption>();
  @ViewChild('a') a: any;

  ngOnInit() {}

  getExpansionSizeStyles() {
    if (this.option?.mode === 'expansion' && this.option?.expanded) {
      const height = 30;
      const maxHeight = !!this.option?.children
        ? this.option?.children?.length * height
        : 0;
      return {
        height: `${maxHeight}px`,
        opacity: 1,
        transition: '120ms ease-in-out',
      };
    }

    return {};
  }
}
