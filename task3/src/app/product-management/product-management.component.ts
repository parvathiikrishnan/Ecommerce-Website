import { Component, OnInit } from '@angular/core';
import { RequestAPIService } from '../request-api.service';
import {Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  categories: any[] = [];
  products:any[] =[];
  isModalOpen=false;
  userForm:FormGroup;
  isEditing=false;
  selectedID=null;

  constructor(private RequestService: RequestAPIService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCategories();
    this.userForm = this.fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
    });
  }

  loadCategories(){
    this.RequestService.getCategories().subscribe(res => {
      console.log("response" , res)
      this.categories = res;
      console.log("categories" , this.categories)
    });
  }

  showProducts(category){
    console.log(category)
    this.RequestService.getProducts(category).subscribe(res => {
      this.products=res;
      console.log("products" , this.products)
    });
  }

  showAddModal(){
    this.isModalOpen=true;
    this.isEditing=false;
    this.selectedID=null;
    this.userForm.reset();
  }

  showEditModal(data){
    this.isModalOpen=true;
    this.isEditing=true;
    this.selectedID = data.id;
    this.userForm.patchValue({
      title: data.title,
      description: data.description,
    })
  }

  closeModal(){
    this.isModalOpen=false;
    this.userForm.reset();
    this.selectedID=null;
  }

  editProduct(){

  }

  addProduct(){

  }
  

}
