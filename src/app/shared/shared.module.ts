import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialTypePipe } from './pipes/credential-type.pipe';
import { ResponsiveMenuDirective } from './directives/responsive-menu.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CredentialTypePipe, ResponsiveMenuDirective]
})
export class SharedModule { }
