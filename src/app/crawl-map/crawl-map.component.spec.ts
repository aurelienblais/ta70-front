import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlMapComponent } from './crawl-map.component';

describe('CrawlMapComponent', () => {
  let component: CrawlMapComponent;
  let fixture: ComponentFixture<CrawlMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlMapComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
