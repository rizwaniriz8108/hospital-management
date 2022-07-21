import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { map, Observable, startWith } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { PatientHealthDataService } from 'src/app/shared/Patient/patient-health-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vital-details',
  templateUrl: './vital-details.component.html',
  styleUrls: ['./vital-details.component.css']
})
export class VitalDetailsComponent implements OnInit {

  drugForm: any[] = ['Oral', 'Injection', 'Tablet', 'Powder', 'Cream', 'Capsule', 'Solution', 'Ointment', 'Syrup'];
  drugStrength: any[] = ['5ML', '10ML', '15ML', '20ML', '20MG', '50MG', '100MG', '500MG'];
  patientId: any = 1;
  patientVitalDetails: any;
  patientDiagnosticDetails: any;
  patientProcedureDetails: any;
  patientMedicationDetails: any;

  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
    height: new FormControl(),
    weight: new FormControl(),
    systolic: new FormControl(),
    diastolic: new FormControl(),
    temperature: new FormControl(),
    respirationRate: new FormControl(),
  });

  firstFormData() {
    this.patientVitalDetails = {                                   //concat
      height: this.firstFormGroup.get('height')?.value.toString().concat('CM'),
      weight: this.firstFormGroup.get('weight')?.value.toString().concat('KG'),
      bodyTemperature: this.firstFormGroup.get('temperature')?.value.toString().concat('F'),
      respiratoryRate: this.firstFormGroup.get('respirationRate')?.value.toString().concat('BPM'),
    }
    return this.patientVitalDetails;
  }


  secondFormGroup = this._formBuilder.group({
    //secondCtrl: ['', Validators.required],
    diagnosticCode: new FormControl(),
    diagnosticDescription: new FormControl(),
    isDescriptive: new FormControl(),
  });

  secondFormData() {
    this.patientDiagnosticDetails = {
      diagnosisCode: this.secondFormGroup.get('diagnosticCode')?.value,
      diagnosisDescription: this.secondFormGroup.get('diagnosticDescription')?.value,
      diagnosisIsDescriptive: this.secondFormGroup.get('isDescriptive')?.value,
    }
    return Array.of(this.patientDiagnosticDetails);
  }


  thirdFormGroup = this._formBuilder.group({
    //thirdCtrl: ['', Validators.required],
    procedureCode: new FormControl(),
    procedureDescription: new FormControl(),
    procedureIsDescriptive: new FormControl(),
  });

  thirdForm() {
    this.patientProcedureDetails = {
      procedureCode: this.thirdFormGroup.get('procedureCode')?.value,
      procedureDescription: this.thirdFormGroup.get('procedureDescription')?.value,
      procedureIsDescriptive: this.thirdFormGroup.get('procedureIsDescriptive')?.value,
    }
    return Array.of(this.patientProcedureDetails);
  }

  forthFormGroup = this._formBuilder.group({
    //secondCtrl: ['', Validators.required],
    drugId: new FormControl(),
    drugName: new FormControl(),
    drugGenericName: new FormControl(),
    drugBrandName: new FormControl(),
  });

  formDrugStrength: any;
  setDrugStrength(event: any) {
    this.formDrugStrength = event.value;
  }
  formDrugForm: any;
  setDrugForm(event: any) {
    this.formDrugForm = event.value;
  }


  forthForm() {
    this.patientMedicationDetails = {
      drugId: this.forthFormGroup.get('drugId')?.value,
      drugName: this.forthFormGroup.get('drugName')?.value,
      drugGenericName: this.forthFormGroup.get('drugGenericName')?.value,
      drugBrandName: this.forthFormGroup.get('drugBrandName')?.value,
      drugForm: this.formDrugStrength.toString(),
      drugStrength: this.formDrugForm.toString(),
    }
    return Array.of(this.patientMedicationDetails);
  }



  collectAndSendDataToBackend() {
    //First service call for vital data
    this.patientHealth.savePatientVitalDetails(this.firstFormData(), this.patientId).subscribe({
      next: (response) => {
        this.toast.success({ detail: response.message, summary: "", duration: 2000 });
      },
      error: (e) => {
        this.toast.error({ detail: e.message, summary: "Please try again", duration: 2000 });
      }
    })

    //Second service call fro Diagnostic data
    this.patientHealth.savePatientDiagnosticDetails(this.secondFormData(), this.patientId).subscribe({
      next: (response) => {
        this.toast.success({ detail: response.message, summary: "", duration: 2000});
      },
      error: (e) => {
        this.toast.error({ detail: e.message, summary: "Please try again", duration: 2000 });
      }
    })

    //Third service call patient procedure 
    this.patientHealth.savePatientProcedureDetails(this.thirdForm(), this.patientId).subscribe({
      next: (response) => {
        this.toast.success({ detail: response.message, summary: "", duration: 2000});
      },
      error: (e) => {
        this.toast.error({ detail: e.message, summary: "Please try again", duration: 2000 });
      }
    })

    //Forth service call for medication details
    this.patientHealth.savePatientMedicationDetails(this.forthForm(), this.patientId).subscribe({
      next: (response) => {
        this.toast.success({ detail: response.message, summary: "", duration: 2000 });
        this.route.navigate(['physician/display-user']);
      },
      error: (e) => {
        this.toast.error({ detail: e.message, summary: "Please try again", duration: 2000 });
      }
    })
  }

  constructor(private _formBuilder: FormBuilder, private patientHealth: PatientHealthDataService,
    private toast: NgToastService, private authService: AuthenticationService, 
    private _Activatedroute:ActivatedRoute, private route : Router) { }


  myControl = new FormControl('');
  options: string[] = ['0016070', '0016071', '0016072', '0016073', '0016074', '0016075', '0016076', '0016077', '0016078', '001607A', '001607B'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.authService.userRole.next("ROLE_Physician");
    this._Activatedroute.params.subscribe(params => { 
      this.patientId = params['patientId'];   });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
