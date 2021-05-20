import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss']
})
export class QuillComponent implements OnInit {
  scheduleId: string;
  id: string;
  editMode: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //let iii = this.route.snapshot.paramMap.get('id');
    let id = this.route.firstChild?.snapshot.params['id'];

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      //this.editMode = params['id'] != null;
      //this.initForm();
    });

    console.log(`\t this.route.firstChild?.snapshot.url[0].path = ${this.route.firstChild?.snapshot.url[0].path}`)

    this.editMode = (this.route.firstChild?.snapshot.url[0].path == 'edit') ? 'EDIT' : null;
    //this.mode = this.route.snapshot.url[0].path == 'schedules_edit_child' ? 'EDIT' : null; // schedules_edit_child FM fix this route child stuff.
    //this.courseId = this.route.snapshot.params["id"];
    this.scheduleId = id; //;this.route.snapshot.params["id"];

    //// this.schedule$ = this.store.selectScheduleById(this.scheduleId);

    // const initialLessons$ = this.loadLessons();

    // this.lessons$ = concat(initialLessons$);
  }

}
