import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HolaMundoComponent } from './hola-mundo/hola-mundo.component';
import { UserComponent } from './user/user.component';



import { DataService } from './data.service';
import { TablePointsComponent } from './table-points/table-points.component';
import { TableTiposComponent } from './table-tipos/table-tipos.component';
import { PointFormComponent } from './point-form/point-form.component'

@NgModule({
  declarations: [
    AppComponent,
    HolaMundoComponent,
    UserComponent,
    TablePointsComponent,
    TableTiposComponent,
    PointFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
