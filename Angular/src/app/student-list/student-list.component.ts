import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators} from '@angular/forms';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

 constructor(private studentservice:StudentService) { }

  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  students: Observable<Student[]>;
  student : Student=new Student();
  deleteMessage=false;
  studentlist:any;
  isupdated = false;    
 
  websiteList: any = ['03d8c30e-753c-43c3-9349-db9eae8279fc',
  '355be3bf-2154-489a-bdd0-0ecb80e8d4e3',
  '2ee00d11-c3b8-4539-bedf-ee2335b1f902'];

  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
     let someArray = [];
    this.studentservice.getProductList().subscribe(data =>{
    console.log("getProductList");
    for (var _i = 0; _i < data.length; _i++) {
             someArray.push(data[_i].productId);
         }
    this.websiteList = someArray;
    console.log(this.websiteList);
    this.dtTrigger.next();
    })

    this.studentservice.getProductDetails().subscribe(data =>{
    this.students =data;
    console.log(this.students);
    this.dtTrigger.next();
    })

  }


  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
  }
  changeWebsite(e) {
    console.log("changeWebsite");
  }

  showBids(e) {
    console.log("showBids");
    this.studentservice.showBids('03d8c30e-753c-43c3-9349-db9eae8279fc').subscribe(data =>{
    this.students =data;
    console.log(this.students);
    this.dtTrigger.next();
    })
  }




}
