import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { DataService } from "../../common/services/data.service";
import { QueryTag, Quill } from "../../common/services/models/tag.model";
import { Post } from "../../common/services/post.model";
import { TagService } from "../../common/services/tag.service";
import { Store } from "../../common/store.service";

@Component({
  selector: "listsquills",
  templateUrl: "./listquills.component.html",
  styleUrls: ["./listquills.component.scss"],
})
export class ListquillsComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  id: string;
  html: SafeHtml;
  whereCaluse: QueryTag;
  private errorSub: Subscription;
  queryTag$: Observable<QueryTag>;

  constructor(
    private store:Store,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private postsService: DataService,
    private tagService: TagService
  ) {this.queryTag$ = this.store.selectQueryWhere();
  }

  ngOnInit(): void {
    console.log("\t  listquills: ngOnInit()");

    this.queryTag$.subscribe(value => {
      this.whereCaluse = value;
      console.log("\t QQQQ Subscription got whereCaluse= ", this.whereCaluse);
      console.log("\t QQQQ Subscription where", value.whereClause);
    });

    const template = `
    <div id="div1">
  <div id="div2">
    <p>KKKKKKKK<strong>KKKK</strong>KKKKKKKKKK</p><p><img src="https://www.bing.com/th?id=ABT14B96B0DCD48D0DF50B43EDF924A99CF6192C6745D3F1444A51D450555D6A24A&amp;w=120&amp;h=120&amp;c=1&amp;rs=1&amp;qlt=80&amp;o=6&amp;pid=SANGAM"> <img src="https://www.bing.com/th?id=ABT14B96B0DCD48D0DF50B43EDF924A99CF6192C6745D3F1444A51D450555D6A24A&amp;w=120&amp;h=120&amp;c=1&amp;rs=1&amp;qlt=80&amp;o=6&amp;pid=SANGAM"> <img src="https://www.bing.com/th?id=ABT14B96B0DCD48D0DF50B43EDF924A99CF6192C6745D3F1444A51D450555D6A24A&amp;w=120&amp;h=120&amp;c=1&amp;rs=1&amp;qlt=80&amp;o=6&amp;pid=SANGAM"></p><p><br></p><p><img src="https://m.media-amazon.com/images/M/MV5BMTUwMGM2ZmYtZGEyZC00OWQyLWI2Y2QtMTdjYzMxZGJmNjhjXkEyXkFqcGdeQXVyNjU2ODM5MjU@._V1_UX182_CR0,0,182,268_AL_.jpg" alt="True Detective Poster"></p>
    </div>
</div>
    `;

    this.html = this.sanitizer.bypassSecurityTrustHtml(template);

    let id = this.route.firstChild?.snapshot.params["id"];

    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      //this.editMode = params['id'] != null;
      //this.initForm();
    });

    //
    // this.errorSu22 = this.tagService.error.subscribe((errorMessage) => {
    //   this.error = errorMessage;
    // });
    //getQuillsWhere() getQuills {
      //
    this.tagService.getQuillsWhere(this.whereCaluse).subscribe((data) => {
      console.log("ddd");
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
      console.log("eeeeeeeeeee fuck = ");
      console.log(this.loadedPosts);
    });

    //

    this.errorSub = this.postsService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        ////this.loadedPosts = posts;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  deleteQuill(id: string) {
    // cheesy for now!
    if (this.tagService.getNewQuillTemplateID() === id) {
      return;
    }
    console.log(`deleteQuill(${id})`);
    this.tagService.deleteQuill(id);
  }

  makeStrip(src: Post) {
    //console.log('makeStrip');
    const template = `
  //   <div id="div1">
  //   <div id="div2">
  //     <section class="content" [innerHTML]="${src.content}"></section>
  //   </div>
  // </div>
  //   `;

  //   this.html = this.sanitizer.bypassSecurityTrustHtml(template);

    return src.title;
  }
}
