import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [NavBarComponent, TestErrorComponent, SectionHeaderComponent, PageNotFoundComponent],
  imports: [CommonModule, RouterModule, BreadcrumbModule],
  exports: [NavBarComponent, SectionHeaderComponent],
})
export class CoreModule {}
