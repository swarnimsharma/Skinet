import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iproduct } from './models/product';
import { Ipagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Client';
  products: Iproduct[];
  constructor(private http: HttpClient){ }
  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe((response: Ipagination) =>
    {
      this.products = response.data;
      console.log(response);
    } , error => {
      console.log(error);
    });
  }

}
