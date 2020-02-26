import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BorangComponent } from './borang/borang.component';
import { JadualComponent } from './jadual/jadual.component';
import { LeretComponent } from './leret/leret.component';
import { PemukaComponent } from './pemuka/pemuka.component';
import { PokokComponent } from './pokok/pokok.component';


const routes: Routes = [
  { path: 'borang', component: BorangComponent },
  { path: 'leret', component: LeretComponent },
  { path: 'pemuka', component: PemukaComponent },
  { path: 'pokok', component: PokokComponent },
  { path: 'jadual', component: JadualComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
