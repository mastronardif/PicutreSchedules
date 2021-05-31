import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { DataService } from "../../../common/services/data.service";
import { Post } from "../../../common/services/post.model";
import { Quill, Tag } from "../../../common/services/models/tag.model";
import { TagService } from "../../../common/services/tag.service";
@Component({
  selector: "quill",
  templateUrl: "./quill.component.html",
  styleUrls: ["./quill.component.scss"],
})
export class QuillComponent implements OnInit {
  scheduleId: string;
  id: string;
  editMode: string;
  content = "";
  title = "";
  idd = "";
  thePost = {} as Post;
  loadedPosts: Post[] = [];

  profileForm = this.fb.group({
    description: [""],
    fuck22: [""],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataService: DataService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    //let iii = this.route.snapshot.paramMap.get('id');
    this.id = this.route.firstChild?.snapshot.params["id"];

    // this.route.params.subscribe((params: Params) => {
    //   this.id = params["id"];
    //   //this.editMode = params['id'] != null;
    //   //this.initForm();
    // });

    console.log(
      `\t this.route.firstChild?.snapshot.url[0].path = ${this.route.firstChild?.snapshot.url[0].path}`
    );
    //this.editMode = this.route.firstChild?.snapshot.url[0].path == "edit" ? "EDIT" : null;
    this.editMode = this.getMode(this.route);
    //const pii = this.route.snapshot.routeConfig.path;

    console.log(`path part= ${this.route.firstChild?.snapshot.url[0].path}`);
    //this.mode = this.route.snapshot.url[0].path == 'schedules_edit_child' ? 'EDIT' : null; // schedules_edit_child FM fix this route child stuff.
    //this.courseId = this.route.snapshot.params["id"];
    //this.scheduleId = id; //;this.route.snapshot.params["id"];

    //// this.schedule$ = this.store.selectScheduleById(this.scheduleId);
    ////this.getQuil(id);

    if (this.editMode === 'NEW') {
      this.id = this.tagService.getNewQuillTemplateID();
    }

    this.getQuill22(this.id); //"aEycvJtEMfFCtV6I4l73"); //'aEycvJtEMfFCtV6I4l73');

    // const initialLessons$ = this.loadLessons();

    // this.lessons$ = concat(initialLessons$);
  }

  // saveQuil() {
  //   console.log("\t saveQuil()");
  //   console.log(this.content);

  //   console.log(this.profileForm.get("description").value);
  //   console.log(this.profileForm.get("fuck22").value);
  //   let desc = this.profileForm.get("description").value;
  //   let data = this.profileForm.get("fuck22").value;
  //   this.dataService.createAndStorePostSchedule(desc, data);
  // }

  // deleteQuill(id: string) {
  //   console.log(`deleteQuill(${id})`);
  //   //this.firestore.doc('policies/' + policyId).delete();
  // }
  createQuill() {
    let desc = this.profileForm.get("description").value;
    let data = this.profileForm.get("fuck22").value;
    const quill: Quill = { title: desc, content: data, id: "tbd" };

    this.tagService.createQuill(quill);
  }

  updateQuil(policy: Tag) {
    let desc = this.profileForm.get("description").value;
    let data = this.profileForm.get("fuck22").value  || '';
    const quill: Quill = {
      title: desc,
      content: data,
      id: this.id,
    };

    this.tagService.updateQuill(this.id, quill);
  }

  getQuill22(id: string) {
    console.log("\t getQuill22()");

    this.tagService
      .getQuill(id)
      .toPromise()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.content = doc.data().content;
          this.title = doc.data().title;
          //this.idd = doc.data().id;

          // set form values
          this.profileForm.patchValue({ description: this.title });
          this.profileForm.patchValue({ fuck22: this.content });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  getQuil(id: string) {
    console.log("\t getQuil()");
    this.dataService.fetchPosts;
    this.dataService.fetchPosts().subscribe(
      (posts) => {
        //this.isFetching = false;
        this.loadedPosts = posts;
        console.log(this.loadedPosts);
        console.log(this.loadedPosts[id].title);
        //console.log(this.loadedPosts[7].content);
        this.content = this.loadedPosts[id].content;
        this.title = this.loadedPosts[id].title;
        this.idd = this.loadedPosts[id].id;

        // set form values
        this.profileForm.patchValue({ description: this.title });
        this.profileForm.patchValue({ fuck22: this.content });
      },
      (error) => {
        //this.isFetching = false;
        //this.error = error.message;
      }
    );

    console.log(this.content);
    ////this.content = '';
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  //getMode(part: string): string {
  getMode(route: ActivatedRoute): string {
    let retVal: string = '';

    const part = route.firstChild?.snapshot.url[0].path;
    if (this.route.snapshot.routeConfig.path === 'newquil')
      return "NEW"

    switch (part) {
      case "edit": {
        retVal = "EDIT";
        break;
      }
      // case "new": {
      //   retVal = "NEW";
      //   break;
      // }
      default:
        {
          retVal = "VIEW";
          break;
        }
    }
    return retVal;
  }
}
function getQuil() {
  throw new Error("Function not implemented.");
}
