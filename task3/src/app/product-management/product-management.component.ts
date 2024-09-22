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
    console.log(data)
    this.isModalOpen=true;
    this.isEditing=true;
    this.selectedID = data.id;
    console.log("selected id", this.selectedID)
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
    if(this.selectedID && this.userForm.valid){
      let params = {
        title: this.userForm.value.title,
        description: this.userForm.value.description
      };

      this.RequestService.updateProduct(this.selectedID,params).subscribe(
        (response) => {
          const index = this.products.findIndex(user => user.id === this.selectedID);
          if (index !== -1) {
            this.products[index] = { ...response }; // Update user in the list
            this.userForm.reset(); // Reset the form
            this.selectedID = null;
            this.isModalOpen=false
          }
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );

    }
  }

  addProduct(){
    if(this.userForm.valid){
      let params = {
        title: this.userForm.value.title,
        description: this.userForm.value.description
      }

      this.RequestService.createProduct(params).subscribe(response => {
        this.products.push(response)
        console.log(response);
      });

      error => {
        // Error callback
        console.error('Error creating product:', error)
        alert('An error occurred while creating the product. Please try again.');
      }
      this.isModalOpen=false
    }
  }

  deleteProduct(id){
    console.log(id);
    this.RequestService.deleteProduct(id).subscribe(response => {
      // Filter out the user with the matching userID
      this.products = this.products.filter(user => user.id !== id);
      console.log('User deleted:', response);
    });
  }
  


}
