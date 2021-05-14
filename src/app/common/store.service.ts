import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { BehaviorSubject, observable, Observable, scheduled, Subject, timer } from "rxjs";
import { Course } from "../model/course";
import { ScheduleRootObject } from './services/schedule.model';
import {
  delayWhen,
  filter,
  map,
  retryWhen,
  shareReplay,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { createHttpObservable } from "./util";
import { fromPromise } from "rxjs/internal-compatibility";
import { DataService } from "./services/data.service";
import * as moment from "moment";

@Injectable({
  providedIn: 'root',
})
export class Store {
  private subject = new BehaviorSubject<Course[]>([]);
  private scheduleSubject = new BehaviorSubject<ScheduleRootObject[]>([]);
  //constructor(private http33: HttpClient) {}
  constructor(private http: HttpClient, private dataService: DataService) {
  }

  courses$: Observable<Course[]> = this.subject.asObservable();
  //private http: HttpClient;
  //schedules$: Observable<ScheduleRootObject[]> = this.scheduleSubject.asObservable();
  schedules$: Observable<ScheduleRootObject[]> = this.dataService.fetchSchedules();

  init() {
    // const http$ = createHttpObservable("/api/courses");

    // http$
    //   .pipe(
    //     tap(() => console.log("HTTP request executed")),
    //     map((res) => Object.values(res["payload"]))
    //   )
    //   .subscribe((courses) => this.subject.next(courses));

    //const url = 'https://localhost:44315/api/Values';
    //const url = "https://api.publicapis.org/entries";
    // const url = 'http://www.joeschedule.com/cgi/ngfop/myphp22.php';

    // const http22$ = createHttpObservable(url);
    // http22$.subscribe((res) => console.log(res));

    // //this.http.get(url).subscribe(res => console.log(res));
    // //responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
    // //const url22 = "http://www.joeschedule.com/cgi/ngfop/myphp.php";
    // const url22 = 'http://www.joeschedule.com/cgi/ngfop/myphp22.php';

    // let httpHeaders = new HttpHeaders()
    //   //.set("Content-Type", "application/json")
    //   //.set("Content-Type", "application/text")
    //   .set("Cache-Control", "no-cache");

    // let options = {
    //   headers: httpHeaders,
    // };
    // const oss$ = this.http33.get(url22, {responseType: 'text'});
    // oss$.subscribe((res) => {
    //   console.log("XXXXXXXXXXXXXXXxx");
    //   console.log(res);
    // });
  }

  selectSchedules() {
    //return this.filterByCategory("BEGINNER");
    return this.schedules$.pipe(
      map((courses) => courses.filter((course) => course.data.row.length > 1)));
  }

  selectBeginnerCourses() {
    return this.filterByCategory("BEGINNER");
  }

  selectAdvancedCourses() {
    return this.filterByCategory("ADVANCED");
  }

  selectCourseById(courseId: number) {
    return this.courses$.pipe(
      map((courses) => courses.find((course) => course.id == courseId)),
      filter((course) => !!course)
    );
  }

  selectScheduleById(courseId: string) {
    console.log(courseId);
    return this.schedules$.pipe(
      map((courses) => courses.find((course) => course.id == courseId)),
      filter((course) => !!course)
    );
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map((courses) => courses.filter((course) => course.category == category))
    );
  }

  saveSchedule(schedule: ScheduleRootObject) {

    console.log('saving '+schedule);


    //const format1 = "YYYY-MM-DD HH:mm:ss"
    //var date1 = new Date();

    //const dateTime1 = moment(date1).format(format1);

    //schedule.data.description= dateTime1+ schedule.data.description;
    schedule.data.description= schedule.data.description;
    console.log(schedule);

    this.dataService.createAndStoreSchedule(schedule, 'content');
    //this.dataService.createAndStorePostSchedule(schedule.data.description, 'content');
  }


  saveCourse(courseId: number, changes): Observable<any> {
    const courses = this.subject.getValue();

    const courseIndex = courses.findIndex((course) => course.id == courseId);

    const newCourses = courses.slice(0);

    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...changes,
    };

    this.subject.next(newCourses);

    return fromPromise(
      fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        body: JSON.stringify(changes),
        headers: {
          "content-type": "application/json",
        },
      })
    );
  }
}
function responseType(url22: string, responseType: any, arg2: string) {
  throw new Error("Function not implemented.");
}

