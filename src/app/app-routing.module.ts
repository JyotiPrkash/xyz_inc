import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { RouteGuard } from './route.guard';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'gallery', component: GalleryComponent , canActivate: [RouteGuard]},
    { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
