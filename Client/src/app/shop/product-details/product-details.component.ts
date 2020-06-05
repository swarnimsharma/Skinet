import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Iproduct } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Iproduct;
  quantity = 1;
  constructor(
    private shopservice: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
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
  addItemToBasket(){
    this.basketService.addItemToBasket(this.product , this.quantity);
  }
  incrementItemQuantity()
  {
      this.quantity++;

  }
  decrementItemQuantity()
  {
    if (this.quantity > 1)
    {
      this.quantity--;
    }

  }
}
