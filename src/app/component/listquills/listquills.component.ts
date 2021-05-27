import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../common/services/data.service';
import { Quill } from '../../common/services/models/tag.model';
import { Post } from '../../common/services/post.model';
import { TagService } from '../../common/services/tag.service';

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


  constructor(private route: ActivatedRoute, private postsService: DataService, private tagService: TagService) { }

  ngOnInit(): void {

    let id = this.route.firstChild?.snapshot.params['id'];

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      //this.editMode = params['id'] != null;
      //this.initForm();
    });

    //
    this.errorSub = this.tagService.getQuills().subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.tagService.getQuills().subscribe(data=>{
      console.log('ddd');
      console.log(data);
      //  this.loadedPosts = posts;
      this.loadedPosts = data.map((dd) => {
        const myVar1 = dd.payload.doc.data() as Quill;

        return {
          data: dd.payload.doc.data(),
          idDoc: dd.payload.doc.id,
          ...myVar1,
        } as Quill;
      });
      console.log('eeeeeeeeeee fuck = ');
      console.log(this.loadedPosts);
    });

    //

    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        ////this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );

  }


}
