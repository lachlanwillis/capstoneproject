import {NgModule} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

let materialModules: any[] = [
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
]

@NgModule({
  imports: materialModules,
  exports: materialModules
})

export class MaterialModule {}