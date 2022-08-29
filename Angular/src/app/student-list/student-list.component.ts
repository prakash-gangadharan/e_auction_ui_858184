import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Product } from '../product';
import { Bids } from '../bids';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators} from '@angular/forms';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

 constructor(private productservice:StudentService) { }

  dtTrigger: Subject<any>= new Subject();

  students: Observable<Product[]>;
  bids: Observable<Bids[]>;
  selectedLevel;
  deleteMessage=false;
  studentlist:any;
  isupdated = true;
 
  productIdList: any = [];

  ngOnInit() {
    this.isupdated=true;
    this.populateProductIds();

    this.productservice.showBids('03d8c30e-753c-43c3-9349-db9eae8279fc').subscribe(data =>{
    this.students = data;
    console.log(this.students);
    this.bids = data.userBidsList;
    console.log(this.bids);
    this.dtTrigger.next();
    })

  }

  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });

  get f(){
    return this.form.controls;
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

  showBids() {
    console.log("StudentListComponent >> showBids >>");
    this.productservice.showBids(this.selectedLevel).subscribe(data =>{
    this.students = data;
    this.bids = data.userBidsList;
    console.log("selected product id is : " + this.selectedLevel);
    //alert(this.selectedLevel);
    this.dtTrigger.next();
    })
  }

}
