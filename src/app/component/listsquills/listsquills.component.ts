import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../common/services/data.service';
import { Post } from '../../common/services/post.model';

@Component({
  selector: 'listsquills',
  templateUrl: './listsquills.component.html',
  styleUrls: ['./listsquills.component.scss']
})
export class ListsquillsComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;


  constructor(private postsService: DataService) { }

  ngOnInit(): void {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );

  }


}
