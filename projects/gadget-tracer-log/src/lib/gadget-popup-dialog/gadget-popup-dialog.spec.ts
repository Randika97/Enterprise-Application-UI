import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GadgetPopupDialogComponent } from './gadget-popup-dialog.component';

describe('GadgetPopupDialogComponent', () => {
  let component: GadgetPopupDialogComponent;
  let fixture: ComponentFixture<GadgetPopupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GadgetPopupDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetPopupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
