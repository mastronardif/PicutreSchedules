//import { viewClassName } from "@angular/compiler";
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from "ngx-quill";
import {Store} from '../common/store.service';
//import { QuillEditorBase } from "ngx-quill";
import {
  concat,
  fromEvent,
  interval,
  noop,
  observable,
  Observable,
  of,
  timer,
  merge,
  Subject,
  BehaviorSubject,
  AsyncSubject,
  ReplaySubject,
  Observer,
} from "rxjs";
//import { delayWhen, filter, map, take, timeout } from "rxjs/operators";
import { DataService } from "../common/services/data.service";
import { Post } from "../common/services/post.model";
//import { createHttpObservable } from "../common/util";
import { PasteFromClipboardComponent22 } from "../component/paste-image-from-clipboard22";
//
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
//import jsPDF from 'jspdf';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
//import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas';
//import domtoimage from 'dom-to-image-more';
import { QueryTag } from "../common/services/models/tag.model";
import { ScheduleRootObject } from "../common/services/schedule.model";
import { switchMap } from "rxjs/operators";
//
@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  //@ViewChild('pdfTable') pdfTable: ElementRef;

  @ViewChild('alterEgo') alterEgo: ElementRef;
  alterEgo2='';
  @ViewChild('fuck') fu: QuillEditorComponent;
  //ed:QuillEditorComponent;

  @ViewChild(PasteFromClipboardComponent22) fuck: PasteFromClipboardComponent22;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  blured = false
  focused = false
  content = '';
  loadedPosts: Post[] = [];
  imagePath = '';

  //subject = new BehaviorSubject(Tag);
  schedules$: Observable<ScheduleRootObject[]>;
  queryTag$: Observable<QueryTag>;


  constructor(private dataService: DataService, private store:Store) {
  }

  onContextMenu(event: MouseEvent, item: Item) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
  onContextMenuAction1(item: Item) {
    alert(`Click on Action 1 Paste event for ${item.name}`);

    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    const cb = document.getElementById("checkbox");
    const cancelled = !cb.dispatchEvent(event);

    if (cancelled) {
      // A handler called preventDefault.
      alert("cancelled");
    } else {
      // None of the handlers called preventDefault.
      alert("not cancelled");
    }
  }

  onContextMenuAction2(item: Item) {
    alert(`Click on Action 2 for ${item.name}`);
  }

  ngOnInit() {
    //
    this.queryTag$ = this.store.selectQueryWhere();
    this.queryTag$.subscribe(value => {
      console.log("\t QQQQ Subscription got", value);
      console.log("\t QQQQ Subscription where", value.whereClause);
    });
    //

    this.schedules$ = this.store.selectSchedules();
    this.schedules$.subscribe(value => {
      console.log("\t ZZZZZZZz Subscription got", value);
    });

    var node = document.getElementById('my-node');
    console.log('about.component: ngOnInit()')
    console.log(this);
    // const subject = new Rx.BehaviorSubject();
    var bobo;
    this.imagePath = bobo;

    htmlToImage.toPng(document.getElementById('my-node'))
    .then((dataUrl) => {
      this.imagePath=dataUrl;
      console.log(dataUrl);
      //node.innerHTML=dataUrl;
    })
  // .then(function (dataUrl) {
  //  console.log(dataUrl);
  //  console.log(node)
  //  node.innerHTML=dataUrl;
  // })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });

  }

  downloadImage(){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });
  }


  detectFiles($event) {
    console.log("detectFiles");
  }

  ///////////////// quil stuff
  saveQuil() {
    console.log('\t saveQuil()');
//console.log(this.content);
    this.dataService.createAndStorePostSchedule('schedule.data.description', this.content);
    // console.log(`alterEgo = ${this.alterEgo}`);
    // console.log(this.alterEgo.nativeElement.value);
    // console.log('this.fu')
    // console.log(this.fu.content);
  }

testObs() {
// Create a new Observable that will deliver the above sequence
const sequence = new Observable(sequenceSubscriber);

// execute the Observable and print the result of each notification
sequence.subscribe({
  next(num) { console.log(num); },
  complete() { console.log('Finished sequence'); }
});

  ////////////
  console.log('switched');
  const switched = of(1, 2, 3).pipe(switchMap((x: number) => of(x, x * 2, x * 3)));
  switched.subscribe(x => console.log(x));

}

  getQuil() {
    console.log('\t getQuil()');
    this.dataService.fetchPosts
        this.dataService.fetchPosts().subscribe(
          (posts) => {
            //this.isFetching = false;
            this.loadedPosts = posts;
            console.log(this.loadedPosts);
            console.log(this.loadedPosts[7].title);
        //console.log(this.loadedPosts[7].content);
            this.content = this.loadedPosts[7].content;
          },
          (error) => {
            //this.isFetching = false;
            //this.error = error.message;
          }
        );

    console.log(this.content);
    this.content = '';

  }

  created(event) {
    // tslint:disable-next-line:no-console
    console.log("\t editor-created", event);
  }


  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }
  ////////////////////
}
// This function runs when subscribe() is called
function sequenceSubscriber(observer: Observer<number>) {
  // synchronously deliver 1, 2, and 3, then complete
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();

  // unsubscribe function doesn't need to do anything in this
  // because values are delivered synchronously
  return {unsubscribe() {}};
}
export interface Item {
  id: number;
  name: string;
}
