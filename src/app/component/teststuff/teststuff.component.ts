import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'teststuff',
  templateUrl: './teststuff.component.html',
  styleUrls: ['./teststuff.component.scss']
})
export class TeststuffComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  localError() {
    throw Error("The app component has thrown an error!");
  }

  failingRequest() {
    this.http.get("https://httpstat.us/404?sleep=2000").toPromise();
  }

  successfulRequest() {
    this.http.get("https://httpstat.us/200?sleep=2000").toPromise();
  }

}
