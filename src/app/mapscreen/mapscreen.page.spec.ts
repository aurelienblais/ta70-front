import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapscreenPage} from './mapscreen.page';

describe('MapscreenPage', () => {
    let component: MapscreenPage;
    let fixture: ComponentFixture<MapscreenPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapscreenPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapscreenPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
