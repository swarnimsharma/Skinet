import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Iproduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/ProductType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(private shopservice: ShopService) {}
  products: Iproduct[];
  brands: IBrand[];
  types: IType[];
  brandIdSelected = 0;
  typeIdSelected = 0;

  ngOnInit(): void {
    this.getproducts();
    this.getBrands();
    this.getBrandType();
  }
  getproducts() {
    this.shopservice
      .getproducts(this.brandIdSelected, this.typeIdSelected)
      .subscribe(
        (response) => {
          this.products = response.data;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getBrands() {
    this.shopservice.getBrands().subscribe(
      response => {
        this.brands = [{id: 0, name: 'All'}, ...response];
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getBrandType() {
    this.shopservice.getBrandType().subscribe(
      (response) => {
        this.types = [{id: 0, name: 'All'}, ...response];
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getproducts();
  }
  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getproducts();
  }
}
