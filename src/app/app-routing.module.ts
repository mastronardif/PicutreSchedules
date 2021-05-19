import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { CourseComponent } from "./course/course.component";
import { ScheduleComponent } from "./component/schedule/schedule.component";
import { ListsquillsComponent } from "./component/listsquills/listsquills.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "listquills",
    component: ListsquillsComponent,
  },
  {
    path: 'schedules', component: ScheduleComponent,
    children: [
      { path: 'view/:id', component: ScheduleComponent },
      { path: 'edit/:id', component: ScheduleComponent },
      { path: 'new', component: ScheduleComponent },
      { path: 'delete/:id', component: ScheduleComponent },
    ]
  },
  // {
  //   path: "schedules_edit_child/:id",
  //   component: ScheduleComponent,
  // },
  // {
  //   path: "schedules/:id",
  //   component: ScheduleComponent,
  // },
  {
    path: "courses/:id",
    component: CourseComponent,
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
