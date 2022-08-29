import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Product } from '../product';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators} from '@angular/forms';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

 constructor(private productservice:StudentService) { }

  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  students: Observable<Product[]>;
  student : Product=new Product();
  deleteMessage=false;
  studentlist:any;
  isupdated = false;    
 
  productIdList: any = ['03d8c30e-753c-43c3-9349-db9eae8279fc'];

  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };

    this.populateProductIds();

    this.productservice.showBids('03d8c30e-753c-43c3-9349-db9eae8279fc').subscribe(data =>{
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

  fetchProductIds() {
    this.populateProductIds();
  }

  populateProductIds(){
    let someArray = [];
    this.productservice.getProductList().subscribe(data =>{
    console.log("StudentListComponent >> getProductList");
    for (var _i = 0; _i < data.length; _i++) {
             someArray.push(data[_i].productId);
         }
    this.productIdList = someArray;
    console.log(this.productIdList);
    this.dtTrigger.next();
    })
  }

  showBids(e) {
    console.log("showBids");
    this.productservice.showBids('03d8c30e-753c-43c3-9349-db9eae8279fc').subscribe(data =>{
    this.students = data;
    console.log(data.userBidsList);
    this.dtTrigger.next();
    })
  }


}
