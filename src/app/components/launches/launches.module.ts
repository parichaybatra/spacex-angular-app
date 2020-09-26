import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchesRoutingModule } from './launches-routing.module';
import { LaunchesComponent } from './launches.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListingComponent } from './listing/listing.component';
import { ProgramService } from '../../common/services/program.service';
import {
  LazyLoadImageModule,
  LAZYLOAD_IMAGE_HOOKS,
  ScrollHooks,
} from 'ng-lazyload-image';

@NgModule({
  declarations: [LaunchesComponent, SidebarComponent, ListingComponent],
  imports: [CommonModule, LaunchesRoutingModule, LazyLoadImageModule],
  providers: [
    ProgramService,
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
  ],
})
export class LaunchesModule {}
