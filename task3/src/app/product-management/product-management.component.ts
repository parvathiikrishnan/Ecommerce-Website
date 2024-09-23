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
  isModalOpenDelete=false
  userForm:FormGroup;
  isEditing=false;
  selectedID=null;
  deletedID=null;
  first_category;
 

  constructor(private RequestService: RequestAPIService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCategories();
    this.userForm = this.fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  loadCategories(){
    this.RequestService.getCategories().subscribe(res => {
      this.categories = res;
      this.first_category = this.categories[0]
      //getting the first category details loaded on the website
      this.RequestService.getProducts(this.first_category).subscribe(res => {
        this.products=res;
        console.log("products" , this.products)
      });
    });
  }

   
  isInvalid(){
    if(this.userForm.invalid){
      console.log("Invalid")
      console.log("title" , this.userForm.value.title)
      console.log("desc" , this.userForm.value.description)
      console.log("price" , this.userForm.value.price)
      console.log("category" , this.userForm.value.category)
      console.log("UserFORM" , this.userForm)
      return true
    }
    else{
      return false
    }
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
      price: data.price,
      category: data.category,
      image: data.image
    })
  }

  ShowDeleteModal(id){
    // console.log(id);
    console.log("trying to show the delete modal")
    this.isModalOpenDelete = true;
    this.deletedID = id;
    // this.confirmDelete(id);
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
        description: this.userForm.value.description,
        price: this.userForm.value.price,
        category: this.userForm.value.category,
        
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
    console.log("HERE")
    if(this.userForm.valid){
      console.log("validated")
      let params = {
        title: this.userForm.value.title,
        description: this.userForm.value.description,
        price: this.userForm.value.price,
        category: this.userForm.value.category,
        
      }

      this.RequestService.createProduct(params).subscribe(response => {
        this.products.push(response)
        console.log(response);
      });

      error => {
        console.error('Error creating product:', error)
        alert('An error occurred while creating the product. Please try again.');
      }
      this.isModalOpen=false
    }
  }

  confirmDelete(){
    console.log("Here", this.deletedID)
    this.isModalOpenDelete=false;
    this.RequestService.deleteProduct(this.deletedID).subscribe(response => {
      // Filter out the user with the matching userID
      this.products = this.products.filter(user => user.id !== this.deletedID);
      console.log('User deleted:', response);
    });
  }

  cancelDelete(){
    this.isModalOpenDelete = false;
  }

  //Converting to string from base64 to render image
  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64String = reader.result as string;
      this.userForm.patchValue({ image: base64String }); //assigning the imgSrc to the converted value
    };
  
    // Start reading the file
    reader.readAsDataURL(file);
  }

}
