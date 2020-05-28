import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Iproduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/ProductType';
import { ShopParams } from '../shared/models/shopParams';

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
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price:Low to High', value: 'priceAsc' },
    { name: 'High to Low', value: 'priceDesc' },
  ];

  ngOnInit(): void {
    this.getproducts();
    this.getBrands();
    this.getBrandType();
  }
  getproducts() {
    this.shopservice.getproducts(this.shopParams).subscribe(
      (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this.shopservice.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
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
        this.types = [{ id: 0, name: 'All' }, ...response];
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getproducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getproducts();
  }
  onSortSelected(sort: string) {
    console.log(sort);
    this.shopParams.sort = sort;
    this.getproducts();
  }
  onPageChanged(event: any) {
    console.log(event);
    this.shopParams.pageNumber = event;
    this.getproducts();
  }
}
