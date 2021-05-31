import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Quill, Tag } from "./models/tag.model";

@Injectable({
  providedIn: "root",
})

export class TagService {
  constructor(private firestore: AngularFirestore) {}

  createQuill(quill: Quill) {
    return this.firestore.collection("quills").add(quill);
  }

  deleteQuill(id: string) {
    console.log(`deleteQuill(${id})`);
    this.firestore.doc("quills/" + id).delete();
  }

  async updateQuill(id: string, quill: Quill): Promise<void> {
    //delete policy.id;
    //this.firestore.doc('policies/' + policy.id).update(policy);
  //   try {
  //     await this.firestore.doc("quills/" + id).update(quill);
  //     // Processing succeed
  //     return;
  //   }  catch (error) {

  //     // Process your error here
  //     console.log(error);

  // }
    this.firestore.doc("quills/" + id).update(quill);
  }

  getNewQuillTemplateID(): string {
    return "0000";
  }

  getQuill(id: string): Observable<any> {
    var docRef = this.firestore.collection("quills").doc(id); //"jaEycvJtEMfFCtV6I4l73");

    //   docRef.get().toPromise().then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });
    return docRef.get();

    // let query = this.firestore.collection('quills').ref.where('id', '==', 'aEycvJtEMfFCtV6I4l73');
    // query.get().then(querySnapshot => {
    //   querySnapshot.forEach(documentSnapshot => {
    //     console.log(`Found document at ${documentSnapshot.ref.path}`);
    //   });
    // });

    // return this.firestore.doc('quills/' + id).get();
  }

  getQuills() {
    return this.firestore.collection("quills").snapshotChanges();
  }
}
