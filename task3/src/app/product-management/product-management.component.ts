import { Component, OnInit } from '@angular/core';
import { RequestAPIService } from '../request-api.service';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  categories: any[] = [];
  products:any[] =[];
  constructor(private RequestService: RequestAPIService) { }

  ngOnInit(): void {
    this.loadCategories();
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

  

}
