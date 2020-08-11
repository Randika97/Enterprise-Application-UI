import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GadgetSymptomDeleteSelectDialogComponent } from './gadget-symptom-delete-select-dialog.component';

describe('GadgetSymptomDeleteSelectDialogComponent', () => {
  let component: GadgetSymptomDeleteSelectDialogComponent;
  let fixture: ComponentFixture<GadgetSymptomDeleteSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GadgetSymptomDeleteSelectDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetSymptomDeleteSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
