import { Component, OnInit } from '@angular/core';
import { HomepageComponent } from '../../homepage/homepage.component';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';
import { ProductsListService } from '../../services/products-list.service';
import { Subscription } from "rxjs";
import { Product } from '../../models/product-model';
import { OrderService } from '../../order-page/order-page.service';

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.scss'],
  providers: [OrderService]
})
export class MyGalleryComponent implements OnInit {
	usersProducts: Observable<Array<any>>;
	productIds: Array<string>;

	constructor(private userService: UserService, private productService: ProductsListService) { }

	ngOnInit() {
		this.userService.getUsersGallery(this.userService.getUserId()).subscribe(gallery => {
			this.productIds = gallery.map(i => {return i.productKey});
			this.productService.getProducts().subscribe(products => {
				this.usersProducts = this.productService.getProductsByIds(this.productIds, products);
			});
		});
	}

}
