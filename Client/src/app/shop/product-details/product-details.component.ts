import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Iproduct } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Iproduct;
  constructor(private shopservice: ShopService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadproduct();
  }
  loadproduct() {
    this.shopservice.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response) => {
        this.product = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
