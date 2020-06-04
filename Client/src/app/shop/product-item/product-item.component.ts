import { Component, OnInit, Input } from '@angular/core';
import { Iproduct } from 'src/app/shared/models/product';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
@Input() product: Iproduct;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }
addItemToBasket()
{
  this.basketService.addItemToBasket(this.product);
}
}
