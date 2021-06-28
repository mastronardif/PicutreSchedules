import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { QueryTag } from './common/services/models/tag.model';
import {Store} from './common/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  queryTag$: Observable<QueryTag>;

  constructor(private store:Store) {  }

  ngOnInit() {
    this.store.init();
    this.queryTag$ = this.store.selectQueryWhere();
  }
}
