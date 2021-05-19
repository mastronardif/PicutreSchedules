/* Click by div'container' or any element inside in browser and ctrl+v to paste image. */
/* Pls copy any image in clipboard before :) */

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'paste-image-from-clipboard22',
  template: /*html*/`
    <div class="container" (paste)="onPaste($event)">
      <h1>22</h1>
      <input type="text" placeholder="Paste Image here! Cheesy for now!" id="lname" name="lname"><br/>
      <img #imgRenderer />
    </div>
  `
})
export class PasteFromClipboardComponent22 {

  @ViewChild('imgRenderer') imgRenderer: ElementRef;

  onPaste(event: any) {
    const items = event.clipboardData.items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }

    // load image if there is a pasted image
    if (blob !== null) {

      const fileFromBlob: File = new File([blob], 'your-filename.jpg');

      const reader = new FileReader();
      reader.onload = (evt: any) => {
        console.log(evt.target.result); // data url!
        this.imgRenderer.nativeElement.src = evt.target.result;
      };
      reader.readAsDataURL(blob);
    }
  }
}
