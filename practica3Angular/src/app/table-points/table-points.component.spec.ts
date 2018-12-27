import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePointsComponent } from './table-points.component';

describe('TablePointsComponent', () => {
  let component: TablePointsComponent;
  let fixture: ComponentFixture<TablePointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
