import { Component } from '@angular/core';
import mergeImages from 'merge-images';
import $  from "jquery";
import { fabric } from 'fabric';
import { User } from '../models/user-model';
import { Design } from '../models/design-model';
import { Order } from '../models/order-model';
import { Product } from '../models/product-model';
import { DesignService } from '../services/design.service';
import { MakeOrderService } from '../services/make-order.service';
import { UserService } from '../services/user.service';
import { ProductsListService } from '../services/products-list.service';
import {FirebaseListObservable } from 'angularfire2/database';

@Component({
  moduleId: module.id,
  providers: [MakeOrderService],
  selector: 'app-redactor-page',
  templateUrl: './redactor-page.component.html',
  styleUrls: ['./redactor-page.component.scss']
})



export class RedactorPageComponent{
 	title = 'redactor';
  type = "tshirtm";
  selectedTemplateImage = {};
  selectedCategory = {};
  name = "";
  resultImg = "";
  items: FirebaseListObservable<any>;
  user = {};

  constructor(private designService: DesignService, private userService: UserService, private orderService: MakeOrderService, private productService: ProductsListService){}
  ngOnInit() {
   this.items = this.designService.getDesigns();
   this.userService.getUser().subscribe(res => this.user = res);
 }
  selectTemplate = function(template){
    this.type = template.type;
    this.selectedTemplateImage.src = template.url;
    this.drawTemplate();

  }
  drawTemplate = function(){
    let canvas = this.getTemplateCanvas();
    canvas.clear();
    let img = new Image();

    let self = this;

    img.onload = function(){
      var image = new fabric.Image(img);
      image.set({
        width:600,
        height:600
      });
      canvas.add(image);
    }
    img.src = self.selectedTemplateImage.src;
  }
  getTemplateCanvas = function(){
    if(!this.templateCanvas){
      this.templateCanvas = new fabric.Canvas('img_product');
    }
    return this.templateCanvas;
  }
  getColors = function(){
    let type = this.type;
    var templates = this.templates.filter(function(template){

      return template.type == type;
    })
    return templates[0].goods;
  }
  setColor = function(goods){
    this.selectedTemplateImage.src = goods.url;
    this.drawTemplate();
  }
  selectCategory = function(category){
    this.selectedCategory.src = category.url;
    this.categoryName = category.name;
    let img = new Image();
    let self = this;
    img.onload = function(){

      var image = new fabric.Image(img);
      image.set({
          left: 170,
          top: 200,
      });
      self.drawImg(image);

    }
    img.src = self.selectedCategory.src;
  }
  saveProduct = function(event){
    let self = this;
    mergeImages([this.getTemplateCanvas().toDataURL(),
     this.getCanvas().toDataURL()])
      .then(b64 =>{
        // this.resultImg = b64
        let newProduct = new Product();
        newProduct.svg = b64;

        newProduct.category = self.categoryName;
        newProduct.type = self.type;
        newProduct.price = Math.floor(Math.random() * (20 - 5) + 5);
        console.log(newProduct);
        this.productService.setProduct(newProduct);
        // let order = new Order(null, newProduct, 1);
        // self.orderService.setOrder(self.userService.getUserId(), [order], null, Math.floor(Math.random() * (20 - 5) + 5));


      } );

  }

  drawImg = function(image){
    let canvas = this.getCanvas();
    canvas.add(image);
  }

  handleImage = function(e){
    let canvas = this.getCanvas();
    var reader:any,
    target: EventTarget;
    reader = new FileReader();
    reader.onload = function (event) {
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            var image = new fabric.Image(imgObj);
            image.set({
                left: 215,
                top: 200
            });
            canvas.add(image);
  }
}
reader.readAsDataURL(e.target.files[0]);
}

getCanvas = function(){
  if(!this.viewPortCanvas){
    this.viewPortCanvas = new fabric.Canvas('viewport');
  }
  return this.viewPortCanvas;
}

removeImg = function(){
  console.log("remove");
  let object = this.getCanvas().getActiveObject();
	if (!object){
		alert('Please select the element to remove');
		return '';
	}
	this.getCanvas().remove(object);
}
// getDesignList = function(){
//   this.designService.getDesigns().forEach(tt => console.log(tt));
//   return this.designService.getDesigns();
//   // return [];
// }
   templates = [
      {
        type: "tshirtm",
        url: "assets/images/templates/tshirtm.png",
          goods:[
          {
            color: "#ffffff",
            url: "assets/images/templates/tshirtm.png"
          },
          {
            color: "#fff500",
            url: "assets/images/templates/tshirtm_yellow.png"
          },
          {
            color: "#000000",
            url: "assets/images/templates/tshirtm_black.png"
          },
          {
            color: "#2244aa",
            type: "tshirtm",
            url: "assets/images/templates/tshirtm_darkblue.png"
          },
          {
            color: "#b91816",
            url: "assets/images/templates/tshirtm_red.png"
          },
          {
            color: "#cccccc",
            url: "assets/images/templates/tshirtm_grey.png"
          },
          {
            color: "#664b2f",
            url: "assets/images/templates/tshirtm_brown.png"
          },
          {
            color: "#008a47",
            url: "assets/images/templates/tshirtm_green.png"
          },
          {
            color: "#0ac7df",
            url: "assets/images/templates/tshirtm_blue.png"
          },
          {
            color: "#fb4e81",
            url: "assets/images/templates/tshirtm_pink.png"
          }
        ]
      },
      {
        type:"tankm",
        url: "assets/images/templates/tankm.png"
      },
      {
        type: "sleevem",
        url: "assets/images/templates/sleevem.png"
      },
      {
        type: "cap",
        url: "assets/images/templates/cap.png"
      },
      {
        type: "mug",
        url: "assets/images/templates/mug.png"
      },
      {
        type: "body",
        url: "assets/images/templates/body.png"
      },
      {
        type: "tshirtw",
        url: "assets/images/templates/tshirtw.png"
      },
      {
        type: "tankw",
        url: "assets/images/templates/tankw.png"
      },
      {
        type: "sleevew",
        url: "assets/images/templates/sleevew.png"
      }
  ];


  category = [
    {
      name:'animal1',
      url: 'assets/images/categories/animal1.png'
    },
    {
      name:'animal2',
      url: 'assets/images/categories/animal2.png'
    },
    {
      name:'animal3',
      url: 'assets/images/categories/animal3.png'
    },
    {
      name:'animal4',
      url: 'assets/images/categories/animal4.png'
    },
    {
      name:'animal5',
      url: 'assets/images/categories/animal5.png'
    },
    {
      name:'animal6',
      url: 'assets/images/categories/animal6.png'
    }
  ];
}
