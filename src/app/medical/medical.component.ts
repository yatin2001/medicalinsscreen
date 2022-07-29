import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from './api-service.service';


@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.css']
})
export class MedicalComponent implements OnInit {

  medicalForm:any;
  requestPayLoad: any = {};
  medicalhistory=true;
  name = 'screen6';  
    
  productForm: FormGroup;  
     
  
  constructor(private fb:FormBuilder,
    private http: HttpClient,
    private ApiService: ApiServiceService,
    private router: Router
  ) {
    this.productForm = this.fb.group({  
      name: '',  
      quantities: this.fb.array([]) ,  
    }); 
  }

    // base url to which request has to be send
    submitted: any = false;
    emp_id: any = 0;

  ngOnInit(){

    this.medicalForm=new FormGroup({
      firstName: new FormControl('',[Validators.pattern("[A-Za-z]{1,32}"),Validators.required]),
      middlename: new FormControl(''),
      last: new FormControl('',[Validators.pattern("[A-Za-z]{1,32}"),Validators.required]),
      Dob: new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required, Validators.pattern("[0-9]{0,2}")]),
      gender: new FormControl('',[Validators.required]),
      relationship: new FormControl('',[Validators.pattern("[A-Za-z]{1,32}"),Validators.required]),
      premium: new FormControl('',[Validators.required, Validators.pattern("[0-9]{0,2}")]),
      date: new FormControl('',[Validators.required]),
      idnumber: new FormControl('',[Validators.required]),
      idtype: new FormControl('',[Validators.required]),
      isHaveMedicalHistory:new FormControl(),
      medicalHistoryDetails:new FormControl({ value: null, disabled: true}),
      insuranceWaiverType:new FormControl(','),


    });
    
  }
public toggle(e:any)
{if(e.target.value=="true")
this.medicalForm.controls.medicalj.enable();  
}
  
public savemedical()
{
  console.log(this.medicalForm.value);
  
this.requestPayLoad={
empId:5,
isHaveMedicalHistory:this.medicalForm.get('isHaveMedicalHistory')?.value,
medicalHistoryDetails:this.medicalForm.get('medicalHistoryDetails')?.value,
insuranceWaiverType:this.medicalForm.get('insuranceWaiverType')?.value,
member_details:[
  {
  memberName:this.medicalForm.get('firstName')?.value,
  memberDob:this.medicalForm.get('Dob')?.value,
  memberAge:this.medicalForm.get('age')?.value,
  memberRelation:this.medicalForm.get('relationship')?.value,
  memberIdType:this.medicalForm.get('idtype')?.value,
  memberIdNumber:this.medicalForm.get('idnumber')?.value,
  }
]
}
console.log(this.requestPayLoad);
this.ApiService.savePersonalDetails(
  this.requestPayLoad
);

//add members table functions 
}
quantities() : FormArray {  
  return this.productForm.get("quantities") as FormArray  
}  
   
newQuantity(): FormGroup {  
  return this.fb.group({  
    FirstName: '',  
    LastName: '',  
    IdType:'',
    DOB:'',
    Age:'',
    Gender:'',
    Relationship:'',
    Premium:'',
    IdNumber:''
  })  
}  
   
addQuantity() {  
  this.quantities().push(this.newQuantity());  
}  
   
removeQuantity(i:number) {  
  this.quantities().removeAt(i);  
}  
   
onSubmit() {  
  console.log(this.productForm.value);  
}  

}
