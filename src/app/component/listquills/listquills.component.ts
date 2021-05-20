import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../common/services/data.service';
import { Post } from '../../common/services/post.model';

@Component({
  selector: 'listsquills',
  templateUrl: './listquills.component.html',
  styleUrls: ['./listquills.component.scss']
})
export class ListquillsComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  id: string;
  private errorSub: Subscription;


  constructor(private route: ActivatedRoute, private postsService: DataService) { }

  ngOnInit(): void {

    let id = this.route.firstChild?.snapshot.params['id'];

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      //this.editMode = params['id'] != null;
      //this.initForm();
    });

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
