import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlsViewPage } from './crawls-view.page';

describe('CrawlsViewPage', () => {
  let component: CrawlsViewPage;
  let fixture: ComponentFixture<CrawlsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlsViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
