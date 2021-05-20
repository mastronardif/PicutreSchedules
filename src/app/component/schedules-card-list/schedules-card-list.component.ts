import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { ScheduleRootObject} from "../../common/services/schedule.model";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
//import {CourseDialogComponent} from "../course-dialog/course-dialog.component";

@Component({
    selector: 'schedules-card-list',
    templateUrl: './schedules-card-list.component.html',
    styleUrls: ['./schedules-card-list.component.css']
})
export class SchedulesCardListComponent implements OnInit {

    @Input()
    courses: ScheduleRootObject[];

    constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    }

    ngOnInit() {

    }

    // onViewSchedule(id: string) {
    //   console.log('\t onViewSchedule '+ id + ' '+ this.route);
    //   this.router.navigate(['fuck/view', id]);
    // }

    // onEditSchedule(id: string) {
    //   console.log('\t onEditSchedule '+ id + ' '+ this.route);
    //   this.router.navigate(['fuck/edit', id]);
    // }

    // editCourse(course:Course) {

    //     const dialogConfig = new MatDialogConfig();

    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;

    //     dialogConfig.data = course;

    //     const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    // }

}









