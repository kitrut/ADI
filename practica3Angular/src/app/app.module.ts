import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule,Route} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { DataService } from './data.service';
import { TablePointsComponent } from './table-points/table-points.component';
import { TableTiposComponent } from './table-tipos/table-tipos.component';
import { PointFormComponent } from './point-form/point-form.component';
import { MapaComponent } from './mapa/mapa.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';

const routes:Route[] = [
  {path: '',component:PrincipalComponent},
  {path: 'creator',component:PointFormComponent},
  {path: 'table1',component:TablePointsComponent},
  {path: 'table2',component:TableTiposComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TablePointsComponent,
    TableTiposComponent,
    PointFormComponent,
    MapaComponent,
    LoginComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
