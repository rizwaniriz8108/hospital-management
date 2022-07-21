import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { AllergyDataFetchService } from 'src/app/shared/Patient/allergy-data-fetch.service';
import { PatientExtraDataService } from 'src/app/shared/Patient/patient-extra-data.service';

@Component({
  selector: 'app-extra-detail',
  templateUrl: './extra-detail.component.html',
  styleUrls: ['./extra-detail.component.css']
})
export class ExtraDetailComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private patientExtraDataService:PatientExtraDataService,
     private toast: NgToastService, private allergyDataService:AllergyDataFetchService, 
     private route : Router, private authService : AuthenticationService) {

  }

  isEditable = false;

  ngOnInit(): void {
    this.authService.userRole.next("ROLE_Patient");
  }

  toppings = new FormControl('');
  relationship = new FormControl('');
  toppingList: string[] = ['English', 'Chinesh', 'Spanish', 'Hindi', 'Portuguese', 'Russian'];
  states: string[] = ['Father','Mother','Sibling','Spouse','Friend' ];
   patientDetails : any;
   emergencyContactDetails : any;
   allergyDetails : any;

   allergyType: any[]= [];
   selectedAllergyType:any;
   allergyName: string[] = [];
   selectedAllergyName:any;
   allergenSource: string[] = [];
   selectedAllergenSource:any;
   allergyIsoform: string[] = [];
   selectedAllergyIsoform:any;
   allergycode:any;
   
   getAllergyNameByType(event:any){
    this.selectedAllergyType = event.value;
    
    this.allergyDataService.fetchAllergyNameFromDatabase(this.selectedAllergyType).subscribe({
      next : (response) => {
        this.allergyName = response;
       
      },
      error : (e) => {
        this.toast.error({
          detail : "Something went wrong" , summary : "" , duration : 2000
        })
      }
    })
   }

   getAllergySource(event:any){
    this.selectedAllergyName = event.value;
    
    this.allergyDataService.getAllergySourceByTypeAndName(this.selectedAllergyType,this.selectedAllergyName).subscribe({
      next : (response) => {
        this.allergenSource = response;
        
      },
      error : (e) => {
        this.toast.error({
          detail : "Something went wrong" , summary : "" , duration : 2000
        })
      }
    })
   }

   getAllergyIsoform(event:any){
    this.selectedAllergenSource = event.value;
    this.allergyDataService.getAllergyIsoformByTypeAndNameAndDescription(this.selectedAllergyType,this.selectedAllergyName,this.selectedAllergenSource).subscribe({
      next : (response) => {
        this.allergyIsoform = response;
      },
      error : (e) => {
        this.toast.error({
          detail : "Something went wrong" , summary : "" , duration : 2000
        })
      }
    })
   }
   getAllergyId(event:any){
    this.selectedAllergyIsoform = event.value;
    this.allergyDataService.getAllergyIdByTypeAndNameAndDescriptionAndIsoform(this.selectedAllergyType,this.selectedAllergyName,this.selectedAllergenSource,this.selectedAllergyIsoform).subscribe({
      next : (response) => {
        this.allergycode = response;  
      },
      error : (e) => {
        this.toast.error({
          detail : "Something went wrong" , summary : "" , duration : 2000
        })
      }
    })

   }


  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
    race : new FormControl(),
    ethnicity : new FormControl(),
    languagesKnown : new FormControl(),
    address : new FormControl(),
  });

  secondFormGroup = this._formBuilder.group({
   // secondCtrl: ['', Validators.required],
   efname : new FormControl(),
   elname : new FormControl(),
   erelationship : new FormControl(),
   eemail : new FormControl('', [Validators.required, Validators.email]),
   econtact : new FormControl(),
   ehomeaddress : new FormControl(),
  });
 

  firstFormGroupAddress :string ="" ;
  formContol1Data(){
    // this.firstFormGroupAddress  ="" ;
    //   this.firstFormGroupAddress = this.firstFormGroup.get('address')?.value;
  }

  emergencyContactDetailsMethod(){
    this.emergencyContactDetails = {
      firstName : this.secondFormGroup.get('efname')?.value,
      lastName : this.secondFormGroup.get('elname')?.value,
      relationship : this.relationship.value.toString(),
      emailAddress : this.secondFormGroup.get('eemail')?.value,
      contactNumber : this.secondFormGroup.get('econtact')?.value,
      address : this.secondFormGroup.get('ehomeaddress')?.value,
    }   
    return Array.of(this.emergencyContactDetails);
  }

  copyAddress(event:any){
    if(event.checked){
      this.firstFormGroupAddress = this.firstFormGroup.get('address')?.value;
    }else{
      this.firstFormGroupAddress = "";
    }
  }

  thirdFormGroup = this._formBuilder.group({
    //thirdCtrl: ['', Validators.required],
    allergyCode: new FormControl(),
  });

  

  allegyDetailsMethod(){
    this.allergyDetails = {
      allergyId :  this.allergycode.toString(),
      allergyType : this.selectedAllergyType,
      allergyName : this.selectedAllergyName,
      allergyDescription : this.selectedAllergenSource.toString(),
      allergyClinicalInfo : this.selectedAllergyIsoform,
    }
    return Array.of(this.allergyDetails);
  }


  patientDetailsMethod(){
     this.patientDetails = {
      race : this.firstFormGroup.get('race')?.value,
      ethnicity : this.firstFormGroup.get('ethnicity')?.value,
      languagesKnown : this.toppings.value.toString(), 
      homeAddress : this.firstFormGroup.get('address')?.value,
      
      emergencyContactInfo : this.emergencyContactDetailsMethod(),
      isAllergic : true,
      allergicTo : this.allegyDetailsMethod()
    }
    return this.patientDetails;
  }

  collectAllData(){
    console.log( this.patientExtraDataService.savePatientExtraDetails(this.patientDetailsMethod()));
    this.patientExtraDataService.savePatientExtraDetails(this.patientDetailsMethod()).subscribe({
      next : (response) => {
        this.toast.success({ detail : response.message , summary : "" , duration : 2000});
        //Write the code to clear all form fields and also check that after successful signup which page should be dispal
        //this.registerForm.controls.
        this.route.navigate(['patient/dashboard'])
      },
      error: (e) => {
        this.toast.error({ detail: e.message, summary: "Please try again", duration: 2000});
      }
    })
  }



  loadAllergyTypeDataFromBackend()
  {
     this.allergyDataService.fetchAllergyTypeFromDatabase().subscribe({
      next : (response) => {
        this.allergyType = response;
        
      },
      error : (e) => {
        this.toast.error({
          detail : "Something went wrong" , summary : "" , duration : 2000
        })
      }
    })

  }

}
