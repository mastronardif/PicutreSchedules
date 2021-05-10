import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ScheduleRootObject } from "../../common/services/schedule.model";
import { Store } from "../../common/store.service";
import { createHttpObservable } from "../../common/util";
import { CourseDialogComponent } from "../../course-dialog/course-dialog.component";
import { Course } from "../../model/course";
import { Lesson } from "../../model/lesson";

@Component({
  selector: "schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"],
})
export class ScheduleComponent implements OnInit {
  id: string;
  editMode: string;

  //courseId: number;
  scheduleId: string;

  course$: Observable<Course>;
  schedule$: Observable<ScheduleRootObject>;

  lessons$: Observable<Lesson[]>;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    let iii = this.route.snapshot.paramMap.get('id');
    let id = this.route.firstChild?.snapshot.params['id'];

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      //this.editMode = params['id'] != null;
      //this.initForm();
    });

    console.log(`\t this.route.firstChild?.snapshot.url[0].path = ${this.route.firstChild?.snapshot.url[0].path}`)

    this.editMode = (this.route.firstChild?.snapshot.url[0].path == 'edit') ? 'EDIT' : null;
    //this.mode = this.route.snapshot.url[0].path == 'schedules_edit_child' ? 'EDIT' : null; // schedules_edit_child FM fix this route child stuff.
    //this.courseId = this.route.snapshot.params["id"];
    this.scheduleId = id; //;this.route.snapshot.params["id"];

    this.schedule$ = this.store.selectScheduleById(this.scheduleId);

    // const initialLessons$ = this.loadLessons();

    // this.lessons$ = concat(initialLessons$);
  }

  add(schedule: ScheduleRootObject) {
    console.log(`add(${schedule})`);
    console.log(schedule);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = schedule;
    //debugger;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
  }

  // loadLessons(search = ""): Observable<Lesson[]> {
  //   return createHttpObservable(
  //     `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
  //   ).pipe(map((res) => res["payload"]));
  // }
}
