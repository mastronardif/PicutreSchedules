import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: "paste-image-from-clipboard",
  host:{
      "(window:paste)": "handlePaste( $event )"
  },
  templateUrl: "./paste-image-from-clipboard.component.html",
  styleUrls: ["./paste-image-from-clipboard.component.scss"],
})
export class PasteImageFromClipboardComponent implements OnInit {
  public imageUrls: SafeUrl[];
  private lastObjectUrl: string;
  private sanitizer: DomSanitizer;

  constructor(sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;

    this.imageUrls = [];
    this.lastObjectUrl = "";
  }

  ngOnInit(): void {}

  // I handle the paste event on the Window (see host bindings).
  public handlePaste(event: ClipboardEvent): void {
    var pastedImage = this.getPastedImage(event);

    if (!pastedImage) {
      return;
    }

    // When we create Object URLs, the browser will keep them in memory until the
    // document is unloaded or until the URL is explicitly released. Since we are
    // going to create a new URL every time the user pastes an image into the app (in
    // this particular demo), we need to be sure to release the previous Object URL
    // before we create the new one.
    // --
    // NOTE: One the Image is rendered in the DOM, releasing the Object URL will not
    // affect the rendering.
    if (this.lastObjectUrl) {
      URL.revokeObjectURL(this.lastObjectUrl);
    }

    // At this point, the "pastedImage" is a File object, which is a specialized type
    // of "Blob". We can now generate a "blob:" URL using the given File.
    this.lastObjectUrl = URL.createObjectURL(pastedImage);

    // By default, Angular WILL NOT TRUST this "blob:" style URLs. However, since we
    // know these are going to be expected, we can use the DOM Sanitizer to bypass
    // the security checks on these images.
    // --
    // NOTE: The sanitizer doesn't return Strings - it returns SafeUrls.
    this.imageUrls.unshift(
      this.sanitizer.bypassSecurityTrustUrl(this.lastObjectUrl)
    );
  }

  // I return the first Image File from the given paste event (or null).
  private getPastedImage(event: ClipboardEvent): File | null {
    this.PasteFromClipboardComponent22(event);
    // NOTE: I am not very familiar with the Paste Event. As such, I am probably
    // being more cautious here than I need to be. However, in an abundance of
    // caution, I am checking each part of the targeted object path.
    if (
      event.clipboardData &&
      event.clipboardData.files &&
      event.clipboardData.files.length &&
      this.isImageFile(event.clipboardData.files[0])
    ) {
      return event.clipboardData.files[0];
    }

    return null;
  }

  // I determine if the given File is an Image (according do its Mime-Type).
  private isImageFile(file: File): boolean {
    return file.type.search(/^image\//i) === 0;
  }

  //////////////////////////////
  //////////////////////////////
  private PasteFromClipboardComponent22(event: ClipboardEvent) {

    //@ViewChild('imgRenderer') imgRenderer: ElementRef;

   if (1==1) { //onPaste(event: any) {
      const items = event.clipboardData.items;
      let blob = null;

      //for (const item of items) {
      for (let ii = 0; ii < items.length; ii++) {
        const item = items[ii];

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
          //this.imgRenderer.nativeElement.src = evt.target.result;
        };
        reader.readAsDataURL(blob);
      }
    }
  }
}
