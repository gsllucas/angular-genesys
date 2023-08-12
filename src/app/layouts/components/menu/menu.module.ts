import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuTileComponent } from './components/menu-tile/menu-tile.component';
import { UserAvatarModule } from 'src/app/shared/components/user-avatar/user-avatar.module';
import { DividerComponent } from '../../../shared/components/divider/divider.component';

@NgModule({
  declarations: [MenuComponent, MenuTileComponent],
  exports: [MenuComponent, MenuTileComponent],
  imports: [CommonModule, UserAvatarModule, DividerComponent],
})
export class MenuModule {}
