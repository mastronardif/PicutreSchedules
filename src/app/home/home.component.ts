import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
//import { DataService } from '../common/services/data.service';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {Store} from '../common/store.service';
import { Post } from '../common/services/post.model';
import { ScheduleRootObject } from '../common/services/schedule.model'

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;
    schedules$: Observable<ScheduleRootObject[]>;

    private loadedSchedules: ScheduleRootObject[] = [];
    //loadedPosts: Post[] = [];
   // constructor(private store:Store, private dataService: DataService) {

    constructor(private store:Store) {
    }

    ngOnInit() {

        const courses$ = this.store.courses$;

        this.beginnerCourses$ = this.store.selectBeginnerCourses();

        this.advancedCourses$ = this.store.selectAdvancedCourses();
        this.schedules$ = this.store.selectSchedules();

        // this.dataService.fetchSchedules().subscribe(
        //   (data) => {
        //     //this.isFetching = false;
        //     this.loadedSchedules = data;
        //     console.log(`loadedSchedules\n ${(this.loadedSchedules)}`);
        //     console.log(this.loadedSchedules);
        //   },
        //   (error) => {
        //     //this.isFetching = false;
        //     //this.error = error.message;
        //   }
        // );

        // this.dataService.fetchPosts().subscribe(
        //   (posts) => {
        //     //this.isFetching = false;
        //     this.loadedPosts = posts;
        //     console.log(this.loadedPosts);
        //   },
        //   (error) => {
        //     //this.isFetching = false;
        //     //this.error = error.message;
        //   }
        // );

    }

}
