import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiDetailPage } from './poi-detail.page';

describe('PoiDetailPage', () => {
  let component: PoiDetailPage;
  let fixture: ComponentFixture<PoiDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
