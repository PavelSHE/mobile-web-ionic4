import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxPagePage } from './box-page.page';

describe('BoxPagePage', () => {
  let component: BoxPagePage;
  let fixture: ComponentFixture<BoxPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
