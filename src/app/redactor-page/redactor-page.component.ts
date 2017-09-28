import { Component } from '@angular/core';
import mergeImages from 'merge-images';
import { UploadService } from '../services/upload.service';
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
  selectedTemplateImage = {};
  selectedCategory = {};
  name = "";
  resultImg = "";
  items: FirebaseListObservable<any>;
  categories: FirebaseListObservable<any>;
  price: FirebaseListObservable<any>;
  user: User;
  templatePrice: number = 0;
  selectedDesignsPrices = [];
  designsPrice: number = 0;
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(private designService: DesignService,
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductsListService,
    private uploadService: UploadService,
    private router: Router
  ) { 
  }

  //let x = 300, y = 100 ,w = 225, h = 300;
  clipTShirt(ctx) {
    ctx.save();
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.w, this.y);
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.lineTo(this.x, this.y);
    ctx.restore();
  }


  ngOnInit() {

    let self = this;
    this.designService.getDesigns().subscribe(res => { this.items = res });
    this.designService.getDesignCategory().subscribe(res => { this.categories = res });
    this.designService.getPrice().subscribe(res => { this.price = res });
    this.userService.getUser().subscribe(res => {
      this.user = new User();
      this.user.firstName = res.displayName.split(' ')[0];
      this.user.lastName = res.displayName.split(' ')[1];
    });
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

  resize = function () {
    let baseCanvas = this.getTemplateCanvas();
    let categoryCanvas = this.getCanvas();
    this.resizeCanvas(baseCanvas);
    this.resizeCanvas(categoryCanvas);
  }
  resizeCanvas = function (canvas) {

    var canvasSizer = document.getElementById("canvas");
    var canvasScaleFactor = canvasSizer.offsetWidth / 700;
    var width = canvasSizer.offsetWidth;
    var height = canvasSizer.offsetHeight;
    var ratio = canvas.getWidth() / canvas.getHeight();
    if ((width / height) > ratio) {
      width = height * ratio;
    } else {
      height = width / ratio;
    }
    var scale = width / canvas.getWidth();
    var zoom = canvas.getZoom();
    zoom *= scale;
    canvas.setDimensions({ width: width, height: height });
    canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0])
  };

  setCordsdependOnTemplate(template){
    switch(template.type){
      case 'tshirtm':
      this.x = 170;
      this.y = 100;
      this.w = 257;
      this.h = 435;
      break;
      case 'tankm':
      this.x = 175;
      this.y = 150;
      this.w = 260;
      this.h = 405;
      break;
      case 'sleevem':
      this.x = 200;
      this.y = 110;
      this.w = 227;
      this.h = 425;
      break;
      case 'cap':
      this.x = 180;
      this.y = 210;
      this.w = 270;
      this.h = 120;
      break;
      case 'mug':
      this.x = 40;
      this.y = 100;
      this.w = 350;
      this.h = 390;
      break;
      case 'body':
      this.x = 180;
      this.y = 120;
      this.w = 260;
      this.h = 350;
      break;
      case 'tshirtw':
      this.x = 190;
      this.y = 120;
      this.w = 235;
      this.h = 400;
      break;
      case 'tankw':
      this.x = 200;
      this.y = 150;
      this.w = 210;
      this.h = 410;
      break;
      case 'sleevew':
      this.x = 200;
      this.y = 120;
      this.w = 218;
      this.h = 400;
      break;
      default: 
      console.log('ooops');
      break;
    }
  }

  selectTemplate = function (template) {
    this.setCordsdependOnTemplate(template);
    console.log(template)
    this.type = template.type;
    this.selectedTemplateImage.src = template.url;
    this.templatePrice = template.price;
    this.drawTemplate();

  }


  drawTemplate = function () {
    let canvas = this.getTemplateCanvas();
    let context = canvas.getContext('2d');
    canvas.clear();
    let img = new Image();

    
    let self = this;

    img.onload = function () {
      let image = new fabric.Image(img);
      image.set({
        // width:img.width,
        // height:img.height
        width: 580,
        height: 580
      });
      canvas.add(image);
      context.strokeStyle = "#0000ff";
      context.lineWidth   = 1;
      context.strokeRect(self.x, self.y, self.w, self.h); 
    }
    img.src = self.selectedTemplateImage.src;
    this.resizeCanvas(canvas);
  }
  getTemplateCanvas = function () {
    if (!this.templateCanvas) {
      this.templateCanvas = new fabric.Canvas('img_product');
    }
    return this.templateCanvas;
  }
  getColors = function () {
    let type = this.type;
    var templates = this.templates.filter(function (template) {

      return template.type == type;
    })
    return templates[0].goods;
  }
  setColor = function (goods) {
    this.selectedTemplateImage.src = goods.url;
    this.drawTemplate();
  }

  selectCategory = function (category) {
    let self = this;
    let ojb = {
      x: this.x,
      y: this.y,
      h: this.h,
      w: this.w,
      left: 155,
      top: 180,
      id: self.selectedDesignsPrices.length,
      clipTo: self.clipTShirt
    }

    this.selectedCategory.src = category.url;
    this.selectedDesignsPrices.push(category.price);
    this.categoryName = category.name;
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = self.selectedCategory.src;
    img.onload = function () {
      var image = new fabric.Image(img);
      image.set(ojb);
      self.drawImg(image);
    }

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
    newProduct.price = this.designsPrice + this.templatePrice;
    return newProduct;
  }

  saveProduct = function (event) {
    let productKey: string;
    let self = this;

    mergeImages([this.getTemplateCanvas().toDataURL(),
    this.getCanvas().toDataURL()])
      .then(b64 => {

        // Upload b64 as image
        /// firebase.storage().ref('products/').child('/* name of img goes here */').putString(b64, 'data_url')
        //////////////////////
        let newProduct = this.createProduct(self, b64);
        this.productService.setProduct(newProduct).then(resolve => {
          productKey = resolve.key;
          this.userService.addToUsersGallery(this.userService.getUserId(), productKey).then(resolve => {

           this.router.navigate(['profile-page/my-gallery']);
          });
        });
      });
  }

  buy = function(event) {
    let productKey: string;
    let self = this;
    mergeImages([this.getTemplateCanvas().toDataURL(),
    this.getCanvas().toDataURL()])
      .then(b64 => {
        let newProduct = this.createProduct(self, b64);
        this.orderService.addItem(newProduct);
        this.router.navigate(['order-page']);
      });
  }

  drawImg = function (image) {
    let canvas = this.getCanvas();
    this.resizeCanvas(canvas);
    canvas.add(image);
  }

  handleImage = function (e) {
    this.selectedDesignsPrices.push(5);
    let self = this;
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
        image.set({
          left: 215,
          top: 200,
          id: self.selectedDesignsPrices.length
        });
        canvas.add(image);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  getCanvas = function () {
    if (!this.viewPortCanvas) {
      this.viewPortCanvas = new fabric.Canvas('viewport');
    }
    return this.viewPortCanvas;
  }

  removeImg = function () {
    let object = this.getCanvas().getActiveObject();
    this.selectedDesignsPrices[object.id - 1] = 0;
    this.getCanvas().remove(object);
  }

  addText = function () {
    this.selectedDesignsPrices.push(2);
    let self = this;
    let canvas = this.getCanvas();
    this.categoryName = "custom design";
    canvas.add(new fabric.IText('Your text', {
      left: 205,
      top: 220,
      fontFamily: 'arial',
      fill: '#333',
      fontSize: 40,
      id: self.selectedDesignsPrices.length
    }));
  }
  changeColor = function (element) {
    let object = this.getCanvas().getActiveObject();
    let canvas = this.getCanvas();
    canvas.getActiveObject().setFill(element.target.value);
    canvas.renderAll();
  }
  setFont = function (element) {
    let canvas = this.getCanvas();
    canvas.getActiveObject().setFontFamily(element.value);
    canvas.renderAll();
  }
  changeFontSize = function (element) {
    let canvas = this.getCanvas();
    canvas.getActiveObject().setFontSize(element.value);
    canvas.renderAll();
  }
  setFontOptions = function (element) {
    let canvas = this.getCanvas();
    let value = element.source.value;
    let checked = element.checked;
    switch (value) {
      case "bold":
        canvas.getActiveObject().set("fontWeight", checked ? 900 : 200);
        break;
      case "italic":
        canvas.getActiveObject().set("fontStyle", checked ? value : "");
        break;
      case "linethrough":
        canvas.getActiveObject().set("textDecoration", checked ? "line-through" : "");
        break;
    }
    canvas.renderAll();
    console.log(value);
  }
  templates = [
    {
      type: "tshirtm",
      url: "assets/images/templates/tshirtm.png",
      price: 6,
      goods: [
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
      type: "tankm",
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
