import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarathonViewPage } from './barathon-view.page';

describe('BarathonViewPage', () => {
  let component: BarathonViewPage;
  let fixture: ComponentFixture<BarathonViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarathonViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarathonViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
