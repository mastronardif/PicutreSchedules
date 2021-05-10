import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import { ScheduleRootObject } from "../common/services/schedule.model";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent, noop, scheduled} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Store} from '../common/store.service';
import { CardPosition } from '../common/services/cardposition.model';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course: Course;
    schedule: ScheduleRootObject;
    cp: CardPosition;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        @Inject(MAT_DIALOG_DATA) schedule:ScheduleRootObject,
        @Inject(MAT_DIALOG_DATA) card:CardPosition,
        private store:Store) {

        this.course = course;
        this.schedule = card.schedule ; //schedule;
        this.cp = card;

        this.form = fb.group({
            //description: [course.description, Validators.required],
            description: [card.schedule.data.row[this.cp.position]?.name, Validators.required],
           // category: [course.category, Validators.required],
            // releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

        //
        console.log('course-dialog');
        console.log(this.schedule);
    }

    ngAfterViewInit() {

    }

    save() {
      console.log(`card= t${this.cp}`);
      console.log(this.form.value);

      this.store.saveSchedule(this.schedule);
    //     this.store.saveCourse(this.course.id, this.form.value)
    //         .subscribe(
    //             () => this.close(),
    //             err => console.log("Error saving course", err)
    //         );
    }




    close() {
      console.log(this.form.value);
      this.dialogRef.close();
    }


}
