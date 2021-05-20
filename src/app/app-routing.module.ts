import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { CourseComponent } from "./course/course.component";
import { ScheduleComponent } from "./component/schedule/schedule.component";
import { ListquillsComponent } from "./component/listquills/listquills.component";
import { QuillComponent } from "./component/quill/quill.component";


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
    component: ListquillsComponent,
  },
  {
    path: 'quills', component: QuillComponent,
    children: [
      { path: 'view/:id', component: QuillComponent },
      { path: 'edit/:id', component: QuillComponent },
      { path: 'new', component: QuillComponent },
    ]
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
  imports: [RouterModule.forRoot(routes/*, { enableTracing: true }*/)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
