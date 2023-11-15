import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeTaskComponent} from "./components/home-task/home-task.component";

const routes: Routes = [
  { path: '', component: HomeTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
