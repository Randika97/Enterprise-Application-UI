import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GadgetSymptomConfigFormComponent } from './gadget-symptom-config-form.component';

describe('GadgetSymptomConfigFormComponent', () => {
  let component: GadgetSymptomConfigFormComponent;
  let fixture: ComponentFixture<GadgetSymptomConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GadgetSymptomConfigFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetSymptomConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
