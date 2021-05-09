import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Post } from './post.model';
import { ScheduleRootObject } from './schedule.model';

const urlFirebase:string = 'https://ng-complete-guide-8f48f-default-rtdb.firebaseio.com';
//const urlFirebaseSchedules = 'https://ng-complete-guide-8f48f-default-rtdb.firebaseio.com/schedules';
@Injectable({
  providedIn: 'root'
})

export class DataService {

  //private REST_API_SERVER = "http://localhost:3000";
  private REST_API_SERVER = "https://localhost:44315/api/products?str=ZZXZXZXZXZXZXZXZXZXZ";
  private REST_API_SERVER22 = 'https://ng-complete-guide-8f48f-default-rtdb.firebaseio.com/schedules';
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    //var data = [{left: "lll", right: "rrr"}];
    //return of(data);
    return this.httpClient.get(this.REST_API_SERVER);
  }

  // Fm add fetchSchedules

  // getSchedules() {
  //   const http$ = createHttpObservable("/api/courses");
  //   return http$
  //   .pipe(
  //     tap(() => console.log("HTTP request executed")),
  //     map((res) => Object.values(res["payload"]))
  //   )
  // }

  fetchSchedules() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.httpClient
      .get<{ [key: string]: ScheduleRootObject }>(
        //'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
        `${urlFirebase}/schedules.json`,
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
          responseType: 'json'
        }
      )
      .pipe(
        map(responseData => {
          const scheduleArray: ScheduleRootObject[] = [];
          for (const key in responseData) {
            //console.log(responseData);
            if (responseData.hasOwnProperty(key)) {
              scheduleArray.push({ ...responseData[key], id: key });
            }
          }
          return scheduleArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.httpClient
      .get<{ [key: string]: Post }>(
        //'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
        `${urlFirebase}/posts.json`,
        //`${this.REST_API_SERVER22}.json`,
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
          responseType: 'json'
        }
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }
}
