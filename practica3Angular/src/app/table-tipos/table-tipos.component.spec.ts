import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTiposComponent } from './table-tipos.component';

describe('TableTiposComponent', () => {
  let component: TableTiposComponent;
  let fixture: ComponentFixture<TableTiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
