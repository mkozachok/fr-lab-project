import { Component, HostListener, AfterViewInit} from '@angular/core';
import {UploadService} from '../services/upload.service';
import { fabric } from 'fabric';
import { User } from '../models/user-model';
import { Upload } from '../models/upload-model';
import { Design } from '../models/design-model';
import { Order } from '../models/order-model';
import { Product } from '../models/product-model';
import { DesignService } from '../services/design.service';
import { OrderService } from '../services/order-page.service';
import { UserService } from '../services/user.service';
import { ProductsListService } from '../services/products-list.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import * as firebase from 'firebase';

@Component({
  moduleId: module.id,
  providers: [OrderService],
  selector: 'app-redactor-page',
  templateUrl: './redactor-page.component.html',
  styleUrls: ['./redactor-page.component.scss']
})


export class RedactorPageComponent {
  title = 'redactor';
  type = "tshirtm";
  items: FirebaseListObservable<any>;
  categories: FirebaseListObservable<any>;
  price: FirebaseListObservable<any>;
  user: User;
  templatePrice: number = 0;
  selectedDesignsPrices = [];
  designsPrice: number = 0;
  templateImg;

  constructor(private designService: DesignService,
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductsListService,
    private uploadService: UploadService,
    private router: Router
  ) {}

  ngOnInit() {

   let self = this;
   this.designService.getDesigns().subscribe(res => {this.items = res});
   this.designService.getDesignCategory().subscribe(res => {this.categories = res});
   this.designService.getPrice().subscribe(res => {this.price = res});
   this.userService.getUser().subscribe(res => {
     this.user = new User();
     this.user.firstName = res.displayName.split(' ')[0];
     this.user.lastName = res.displayName.split(' ')[1];
   });
 }
   boundingBox = new fabric.Rect({
     fill: "transparent",
     width: 235,
     height: 440,
     top:80,
     left: 225,
     hasBorders: true,
     hasControls: false,
     lockMovementX: true,
     lockMovementY: true,
     evented: false,
     stroke: "red",
     selectable: false,
     strokeDashArray: [5,10],
  });

  ngAfterViewInit(){
    let canvas = this.getCanvas();
    let boundingBox = this.boundingBox;

    canvas.on("object:moving", function(el) {
        let movingBox = canvas.getActiveObject();
        var top = movingBox.top;
        var bottom = top + movingBox.getHeight();
        var left = movingBox.left;
        var right = left + movingBox.getWidth();
        var topBound = boundingBox.top;
        var bottomBound = topBound + boundingBox.getHeight();
        var leftBound = boundingBox.left;
        var rightBound = leftBound + boundingBox.getWidth();
        // capping logic here
        movingBox.setLeft(Math.min(Math.max(left, leftBound), rightBound - movingBox.getWidth()));
        movingBox.setTop(Math.min(Math.max(top, topBound), bottomBound - movingBox.getHeight()));
    });
    this.boundingBox = boundingBox;
}

 categoryChoose(cat) {
   this.designService.categoryChoose(cat).subscribe(res => {
    this.items = res;
   });
   console.log(cat);
 }

  typeChoose(myType) {
    this.designService.typeChoose(myType).subscribe(res => {
      this.items = res;
    });
    console.log(myType);
  }


resizeCanvas() {
   let canvas = this.getCanvas();
   var canvasSizer = document.getElementById("redactor_area");
   var canvasScaleFactor = canvasSizer.offsetWidth/700;
   var width = canvasSizer.offsetWidth;
   var height = canvasSizer.offsetHeight;
   var ratio = canvas.getWidth() /canvas.getHeight();
      if((width/height)>ratio){
        width = height*ratio;
      } else {
        height = width / ratio;
      }
   var scale = width / canvas.getWidth();
   var zoom = canvas.getZoom();
   zoom *= scale;
   canvas.setDimensions({ width: width, height: height });
   canvas.setViewportTransform([zoom , 0, 0, zoom , 0, 0])
};

  selectTemplate(template){
    this.type = template.type;
    this.templatePrice = template.price;
    this.drawOnCanvas(template.url, true);
    this.getCanvas().add(this.boundingBox);

  }

  drawOnCanvas(src, isTemplate){
    let canvas = this.getCanvas();
    this.getImage(src).then((img)=>{
      if(isTemplate){
        canvas.remove(this.templateImg);
        this.templateImg = this.defineTemplateImage(img);
        canvas.sendToBack(this.templateImg);
        canvas.centerObject(this.templateImg);
      }else{
        let category = this.defineCategoryImage(img);
        canvas.add(category);
      }
    });
    this.resizeCanvas();
  }
getImage(src){
  return new Promise((resolve, reject)=>{
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function(){
      resolve(img);
    }
    img.onerror = function(){
      reject();
    }
    img.src = src;
  });
}

  defineTemplateImage(img){
    let image = new fabric.Image(img);
    image.set({
      width: 580,
      height:580,
    });
    image.selectable = false;
    image.evented=false;
    return image;
  }
  defineCategoryImage(img){
    let image = new fabric.Image(img);
    image.set({
      width:200,
      height:200,
      left: 240,
      top:200,
      id:this.selectedDesignsPrices.length
    });
    image.selectable = true;
    image.evented=true;
    return image;
  }

  getCanvas = function(){
    if(!this.templateCanvas){
      this.templateCanvas = new fabric.Canvas('img_product');
    }
    return this.templateCanvas;
  }
  getColors = function () {
    let type = this.type;
    var templates = this.templates.filter(function(template){
      return template.type == type;
    })
    return templates[0].goods;
  }
  setColor = function(goods){
    this.drawOnCanvas(goods.url, true);
  }

  selectCategory = function(category){
    if ( category.price === 'free') {
      this.selectedDesignsPrices.push(0);
    } else {
      this.selectedDesignsPrices.push(category.price);
    }
    this.categoryName = category.name;
    this.drawOnCanvas(category.url, false);
  }

  createProduct(redactor, b64) {
    this.designsPrice = this.selectedDesignsPrices.reduce((a, b) => a + b, 0);
    let newProduct = new Product();
    newProduct.name = redactor.type;
    newProduct.type = redactor.type;
    newProduct.category = redactor.categoryName;
    newProduct.svg = b64;
    newProduct.owner = redactor.user.firstName + " " + redactor.user.lastName;
    // newProduct.price = Math.floor(Math.random() * (20 - 5) + 5);
    newProduct.price = this.getProductPrice();
    return newProduct;
  }

  getProductPrice() {
    this.designsPrice = this.selectedDesignsPrices.reduce((a, b) => a + b, 0);
    return this.designsPrice + this.templatePrice;
  }

  saveProduct = function (event) {
    let productKey: string;
    let self = this;
    this.getCanvas().remove(this.boundingBox);
    let resultProductImg = this.getCanvas().toDataURL();
    firebase.storage().ref('products/').child(Math.random().toString(36).substring(2, 15) + '.png').putString(resultProductImg, 'data_url');
    let newProduct = this.createProduct(self, resultProductImg);
    this.productService.setProduct(newProduct).then(resolve => {
        productKey = resolve.key;
        this.userService.addToUsersGallery(this.userService.getUserId(), productKey).then(resolve => {
              this.router.navigate(['profile-page/my-gallery']);
        });
    });
  }

  buy = function(event) {
    let productKey: string;
    let self = this;
    this.getCanvas().remove(this.boundingBox);
    let resultProductImg = this.getCanvas().toDataURL();
    let newProduct = this.createProduct(self, resultProductImg);
    this.orderService.addItem(newProduct, '');
    this.router.navigate(['order-page']);
  }

  loadImageHandler = function(e){
    this.selectedDesignsPrices.push(5);
    let ojb = {
      width:200,
      height:200,
      left: 240,
      top:200,
      id: this.selectedDesignsPrices.length
    };
    let canvas = this.getCanvas();
    this.categoryName = "custom design";
    var reader: any,
    target: EventTarget;
    reader = new FileReader();
    reader.onload = function (event) {
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            var image = new fabric.Image(imgObj);
            image.set(ojb);
            canvas.add(image);
  }
}
reader.readAsDataURL(e.target.files[0]);
}

@HostListener('window:keydown', ['$event'])
keyBoardInput = function(event: KeyboardEvent){
  if(event.keyCode == 8 && this.getCanvas().getActiveObject()){
    this.removeImg();
  }
}
removeImg = function(){
  let object = this.getCanvas().getActiveObject();
  this.selectedDesignsPrices[object.id - 1] = 0;
	this.getCanvas().remove(object);
}

addText = function(){
  this.selectedDesignsPrices.push(2);
  let self = this;
  this.categoryName = "custom design";
  let canvas = this.getCanvas();
  canvas.add(new fabric.IText('Your text', {
      left: 250,
      top: 110,
      fontFamily: 'arial',
      fill: '#333',
      fontSize: 40,
      id: self.selectedDesignsPrices.length,
/*       clipTo: self.clipTShirt */
    }));
  }
  changeColor = function(element){
  let object = this.getCanvas().getActiveObject();
  let canvas = this.getCanvas();
  canvas.getActiveObject().setFill(element.target.value);
  canvas.renderAll();
 }
 setFont = function(element){
  let canvas = this.getCanvas();
  canvas.getActiveObject().setFontFamily(element.value);
  canvas.renderAll();
}
changeFontSize = function(element){
  let canvas = this.getCanvas();
  canvas.getActiveObject().setFontSize(element.value);
  canvas.renderAll();
}
setFontOptions = function(element){
  let canvas = this.getCanvas();
  let value = element.source.value;
  let checked = element.checked;
  switch(value){
    case "bold" :
      canvas.getActiveObject().set("fontWeight", checked?900:200);
    break;
    case "italic" :
      canvas.getActiveObject().set("fontStyle", checked?value:"");
    break;
    case "linethrough" :
      canvas.getActiveObject().set("textDecoration", checked?"line-through":"");
    break; 
  }
  canvas.renderAll();
}

   templates = [
      {
        type: "tshirtm",
        url: "assets/images/templates/tshirtm.png",
        price: 6,
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
        url: "assets/images/templates/tankm.png",
        price: 8
      },
      {
        type: "sleevem",
        url: "assets/images/templates/sleevem.png",
        price: 8

    },
    {
      type: "cap",
      url: "assets/images/templates/cap.png",
      price: 10
    },
    {
      type: "mug",
      url: "assets/images/templates/mug.png",
      price: 16
    },
    {
      type: "body",
      url: "assets/images/templates/body.png",
      price: 5
    },
    {
      type: "tshirtw",
      url: "assets/images/templates/tshirtw.png",
      price: 5
    },
    {
      type: "tankw",
      url: "assets/images/templates/tankw.png",
      price: 6
    },
    {
      type: "sleevew",
      url: "assets/images/templates/sleevew.png",
      price: 7
    }
  ];
}
