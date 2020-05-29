import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Iproduct } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Iproduct;
  constructor(
    private shopservice: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.loadproduct();
  }
  loadproduct() {
    this.shopservice
      .getProduct(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (response) => {
          this.product = response;
          this.bcService.set('@productDetails', this.product.name);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
