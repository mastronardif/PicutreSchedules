import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
//import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { SchedulesCardListComponent } from './component/schedules-card-list/schedules-card-list.component';
import {CourseComponent } from "./course/course.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { ScheduleComponent } from './component/schedule/schedule.component';
import { SafePipe } from './common/pipes/safe.pipe';
import { PasteImageFromClipboardComponent } from './component/paste-image-from-clipboard/paste-image-from-clipboard.component';
import { PasteFromClipboardComponent22 } from './component/paste-image-from-clipboard22';
import { QuillModule } from 'ngx-quill';
import { ListquillsComponent } from './component/listquills/listquills.component';
import { QuillComponent } from './component/listquills/quill/quill.component';
//import { MyErrorHandler } from './common/myerrorhandler';
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { TeststuffComponent } from './component/teststuff/teststuff.component';
import { SearchComponent } from './component/search/search.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        CourseComponent,
        //CoursesCardListComponent,
        SchedulesCardListComponent,
        CourseDialogComponent,
        ScheduleComponent,
        SafePipe,
        PasteImageFromClipboardComponent,
        PasteFromClipboardComponent22,
        ListquillsComponent,
        QuillComponent,
        TeststuffComponent,
        SearchComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase, 'crud'),
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        AppRoutingModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        CoreModule,
        SharedModule
    ],
    providers: [
     // {provide: ErrorHandler, useClass: MyErrorHandler}
    ],
    bootstrap: [AppComponent],
    entryComponents: [CourseDialogComponent]
})
export class AppModule {
}
