import { Component, OnInit } from '@angular/core';
import { RequestAPIService } from '../request-api.service';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})

export class ProductManagementComponent implements OnInit {
  //Defining the variables required
  categories: any[] = [];
  products:any[] =[];
  isModalOpen=false;
  isModalOpenDelete=false
  userForm:FormGroup;
  isEditing=false;
  selectedID=null;
  deletedID=null;
  first_category;
  loading = false;
  paginatedProducts: any[] = [];
  totalPages: number = 1;
  currentPage: number = 1;
  productsPerPage: number = 5;
  maxImageSize = 60000;

  //Constructor uses Request Service and Form Builder
  constructor(private RequestService: RequestAPIService, private fb: FormBuilder) { }

  //On opening the application we load the following
  ngOnInit(): void {
    this.loadCategories();
    this.userForm = this.fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: ['']
    });
  }

  //Showing the categories as well as electronics
  loadCategories(){
    this.loading = true;
    this.RequestService.getCategories().subscribe(res => {
      this.categories = res;
      this.first_category = this.categories[0]
      this.showProducts(this.first_category) //do not make the API call again
    });
  }

  //Checking if file is invalid
  isInvalid(){
    if(this.userForm.invalid){
      return true
    }
    else{
      return false
    }
  }

  //Showing the available categories
  showProducts(category){
    this.currentPage= 1;
    
    this.loading=true;
    console.log(category)
    this.RequestService.getProducts(category).subscribe(res => {
      this.products=res;
      console.log("products" , this.products)
      this.updatePagination();
      this.loading=false;
    },
    err => {
      console.error(err);
      this.loading = false; });
  }

  updatePagination(){
    this.totalPages = Math.ceil(this.products.length / this.productsPerPage);
    this.paginatedProducts = this.products.slice(
      (this.currentPage - 1) * this.productsPerPage,
      this.currentPage * this.productsPerPage
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  //Showing the Add modal 
  showAddModal(){
    this.isModalOpen=true;
    this.isEditing=false;
    this.selectedID=null;
    this.userForm.reset();
  }

  //Showing the Edit modal and assigning states
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

  //Showing the Delete modal to get confirmation
  ShowDeleteModal(id){
    this.isModalOpenDelete = true;
    this.deletedID = id;
  }

  //Closing the modals
  closeModal(){
    this.isModalOpen=false;
    this.userForm.reset();
    this.selectedID=null;
  }

  //Editing the Product
  editProduct(){
    if(this.selectedID && this.userForm.valid){
      let params = {
        title: this.userForm.value.title,
        description: this.userForm.value.description,
        price: this.userForm.value.price,
        category: this.userForm.value.category,
        image: this.userForm.value.image
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

  //Adding the Product
  addProduct(){
    if(this.userForm.valid){
      let params = {
        title: this.userForm.value.title,
        description: this.userForm.value.description,
        price: this.userForm.value.price,
        category: this.userForm.value.category,
        image: this.userForm.value.image
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

  //Deleting the product when confirmed
  confirmDelete(){
    this.isModalOpenDelete=false;
    this.RequestService.deleteProduct(this.deletedID).subscribe(response => {
      // Filter out the user with the matching userID
      this.products = this.products.filter(user => user.id !== this.deletedID);
      console.log('User deleted:', response);
    });
  }

  //Cancelling the delete operation
  cancelDelete(){
    this.isModalOpenDelete = false;
  }

  //Converting to string from base64 to render image
  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    if(this.fileSizeChecker){
      reader.onloadend = () => {
        const base64String = reader.result as string;
        this.userForm.patchValue({ image: base64String }); //assigning the imgSrc to the converted value
      };
    
      // Start reading the file
      reader.readAsDataURL(file);
    }
  }

  fileSizeChecker(file){
    if(file.size < this.maxImageSize){
      return true;
    }
    else{
      Swal.fire({
        title: 'Error!',
        text: 'Image size is too big',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
    }
  }
 
}
