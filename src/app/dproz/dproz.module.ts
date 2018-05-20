import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DprozMainComponent } from './dproz-main/dproz-main.component';
import { DprozHomeModule } from '../dproz-home/dproz-home.module';
import { DprozAuthenticationModule } from '../dproz-authentication/dproz-authentication.module';
import { RouterModule } from '@angular/router';
import { DprozProfileModule } from '../dproz-profile/dproz-profile.module';

@NgModule({
  imports: [
    CommonModule,
    DprozHomeModule,
    DprozProfileModule,
    DprozAuthenticationModule,
    RouterModule
  ],
  declarations: [DprozMainComponent]
})
export class DprozModule { }
