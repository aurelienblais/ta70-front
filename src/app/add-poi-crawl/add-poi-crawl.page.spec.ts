import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoiCrawlPage } from './add-poi-crawl.page';

describe('AddPoiCrawlPage', () => {
  let component: AddPoiCrawlPage;
  let fixture: ComponentFixture<AddPoiCrawlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPoiCrawlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPoiCrawlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
