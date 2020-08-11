import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule} from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { GadgetTracerLogComponent} from './gadget-tracer-log.component';
import { RouterModule } from '@angular/router';
import { GadgetTracerLogService } from './gadget-tracer-log.service';
import { MatNativeDateModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GadgetSymptomConfigFormComponent} from "./gadget-symptom-config-form/gadget-symptom-config-form.component";
import { GadgetPopupDialogComponent} from "./gadget-popup-dialog/gadget-popup-dialog.component";
import { GadgetSymptomDeleteSelectDialogComponent } from './gadget-symptom-delete-select-dialog/gadget-symptom-delete-select-dialog.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'; 

@NgModule({
  imports:
    [
      CommonModule,
      MatMomentDateModule,
      FormsModule,
      ReactiveFormsModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatRadioModule,
      MatButtonModule,
      MatDividerModule,
      MatListModule,
      MatDialogModule,
      MatStepperModule,
      MatNativeDateModule,
      MatProgressBarModule,
      MatCheckboxModule,
      MatIconModule,
      MatSelectModule,
      MatDatepickerModule,
      MatSnackBarModule,
      MatTableModule,
      MatPaginatorModule,
      FlexLayoutModule,
      HttpClientModule,
      MatTooltipModule,
      RouterModule.forChild([
        {
          path: '', pathMatch: 'full', component: GadgetTracerLogComponent
        }
      ])
    ],
  declarations:
    [
      GadgetTracerLogComponent,GadgetSymptomConfigFormComponent,GadgetPopupDialogComponent,GadgetSymptomDeleteSelectDialogComponent

    ],
  providers:
    [{
      provide: 'gadget-tracer-log',
      useValue: GadgetTracerLogComponent
    },
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
    GadgetTracerLogService
  ],
  exports:
    [
      GadgetTracerLogComponent
    ],
  entryComponents: [
    GadgetTracerLogComponent,GadgetSymptomConfigFormComponent,GadgetPopupDialogComponent,GadgetSymptomDeleteSelectDialogComponent
  ]
})
export class GadgetTracerLogModule { }
