import { Component, HostListener, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
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
import { MdDialog } from '@angular/material';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

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
  templateTypes: FirebaseListObservable<any>;
  user: User;
  templatePrice: number = 0;
  selectedDesignsPrices = [];
  designsPrice: number = 0;
  templateImg;
  myGoods: Array<any> = [];
  templateSizeQuantites = [];
  showSize: boolean = false;
  boundingBox = new fabric.Rect({
    fill: "transparent",
    width: 235,
    height: 440,
    top: 80,
    left: 225,
    hasBorders: true,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    evented: false,
    stroke: "red",
    selectable: false,
    strokeDashArray: [5, 10]
  });
  disableCategory = true;

  @ViewChild('category') tab;
  isDisabled = true;
  totalQuantity: number = 0;

  constructor(private designService: DesignService,
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductsListService,
    private uploadService: UploadService,

    private router: Router,
    public dialog: MdDialog,
    public myElement: ElementRef,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.designService.getDesigns().subscribe(res => { this.items = res });
    this.designService.getDesignCategory().subscribe(res => { this.categories = res });
    this.designService.getPrice().subscribe(res => { this.price = res });
    this.userService.getUser().subscribe(res => {
      this.user = new User();
      this.user.firstName = res.displayName.split(' ')[0];
      this.user.lastName = res.displayName.split(' ')[1];
    });
    this.designService.getTemplateTypes().subscribe(res => { this.templateTypes = res });
  }



  ngAfterContentInit() {
    let canvas = this.getCanvas();
    let boundingBox = this.setBoundingBox();

    canvas.on("object:moving", function (el) {
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

    this.designService.getTemplateTypes().subscribe(res => { this.templateTypes = res });
    canvas.on("object:scaling", (event) => {
      let el = event.target;

      if ((el.scaleX > 1) && (el.width * el.scaleX > this.boundingBox.getWidth())) {
        el.setWidth(this.boundingBox.getWidth());
        el.setScaleX(1);
        el.setLeft(this.boundingBox.left);
      }
      if ((el.scaleY > 1) && (el.height * el.scaleY > this.boundingBox.getHeight())) {
        el.setHeight(this.boundingBox.getHeight());
        el.setScaleY(1);
        el.setTop(this.boundingBox.top);
      }

      // need to make different func and apply here this code
      el.left = el.left < this.boundingBox.left ? boundingBox.left : el.left;
      el.top = el.top < this.boundingBox.top ? this.boundingBox.top : el.top;
      if ((el.left + el.width * el.scaleX) > (this.boundingBox.left + this.boundingBox.getWidth())) {
        el.left = (this.boundingBox.left + this.boundingBox.getWidth()) - el.width * el.scaleX;
      }
      if ((el.top + el.height * el.scaleY) > (this.boundingBox.top + this.boundingBox.getHeight())) {
        el.top = (this.boundingBox.top + this.boundingBox.getHeight()) - el.height * el.scaleY;
      }
    })

    this.designService.getTemplateTypes().subscribe(res => { this.templateTypes = res });
    this.boundingBox = boundingBox;


      this.resizeCanvas();
  }

  categoryChoose(cat) {
    this.designService.categoryChoose(cat).subscribe(res => {
      this.items = res;
    });
  }

  typeChoose(myType) {
    this.designService.typeChoose(myType).subscribe(res => {
      this.items = res;
    });
  }
  //this.setCordsdependOnTemplate(template);
  resizeCanvas() {
    let canvas = this.getCanvas();
    var canvasSizer = document.getElementById("redactor_area");
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

  setBoundingBox() {
    let boundingBox = this.boundingBox;
    switch (this.type) {
      case "men's T-shirt":
        boundingBox.width = 235;
        boundingBox.height = 440;
        boundingBox.top = 80;
        boundingBox.left = 225;
        break;
      case "men's shirt":
        boundingBox.width = 250;
        boundingBox.height = 360;
        boundingBox.top = 140;
        boundingBox.left = 225;
        break;
      case "men's sweater":
        boundingBox.width = 215;
        boundingBox.height = 400;
        boundingBox.top = 100;
        boundingBox.left = 245;
        break;
      case "cap":
        boundingBox.width = 270;
        boundingBox.height = 200;
        boundingBox.top = 180;
        boundingBox.left = 220;
        break;
      case "cup":
        boundingBox.width = 325;
        boundingBox.height = 390;
        boundingBox.top = 100;
        boundingBox.left = 110;
        break;
      case "body":
        boundingBox.width = 240;
        boundingBox.height = 350;
        boundingBox.top = 100;
        boundingBox.left = 230;
        break;
      case "women's T-shirt":
        boundingBox.width = 220;
        boundingBox.height = 420;
        boundingBox.top = 100;
        boundingBox.left = 240;
        break;
      case "women's shirt":
        boundingBox.width = 210;
        boundingBox.height = 380;
        boundingBox.top = 140;
        boundingBox.left = 245;
        break;
      case "women's sweater":
        boundingBox.width = 210;
        boundingBox.height = 420;
        boundingBox.top = 100;
        boundingBox.left = 245;
        break;
    }
    return boundingBox;
  }

  selectTemplate(template) {
    this.disableCategory = false;
    if (this.isDisabled) {
      this.tab.selectedIndex = 1;
    }
    this.isDisabled = false;
    this.type = template.type;
    this.templateSizeQuantites.length = 0;
    this.templateTypes.forEach(el => {
      if (el.type === this.type) {
        el.size.forEach(el => {
          this.templateSizeQuantites.push({size: el, quantity: 0});
        })
      }
    });
    this.templatePrice = template.price;
    this.myGoods = template.goods;
    this.drawOnCanvas(template.url, true);
    this.getCanvas().remove(this.boundingBox);
    this.getCanvas().add(this.setBoundingBox());

  }

  drawOnCanvas(src, isTemplate) {
    let canvas = this.getCanvas();
    this.getImage(src).then((img) => {
      if (isTemplate) {
        canvas.remove(this.templateImg);
        this.templateImg = this.defineTemplateImage(img);

        canvas.add(this.templateImg);
        canvas.sendToBack(this.templateImg);
        canvas.renderAll();
      } else {
        let category = this.defineCategoryImage(img);
        canvas.add(category);
      }
    });

  }
  getImage(src) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        resolve(img);
      }
      img.onerror = function () {
        reject();
      }
      img.src = src;
    });
  }

  defineTemplateImage(img) {
    let image = new fabric.Image(img);
    image.set({
      width: 580,
      height: 580,
      left: 60,
      top: 0,
    });
    image.selectable = false;
    image.evented = false;
    return image;
  }
  defineCategoryImage(img) {
    let image = new fabric.Image(img);
    image.set({
      width: 150,
      height: 150,
      left: 270,
      top: 200,
      borderColor: 'red',
      cornerColor: 'green',
      hasRotatingPoint: false,
      id: this.selectedDesignsPrices.length
    });
    image.selectable = true;
    image.evented = true;
    image.lockRotation = true;
    return image;
  }

  getCanvas = function () {
    if (!this.templateCanvas) {
      this.templateCanvas = new fabric.Canvas('img_product');
    }
    return this.templateCanvas;
  }


  setColor = function (goods) {
    this.drawOnCanvas(goods.url, true);
  }


  selectCategory = function (category) {
    if (category.price === 'free') {
      this.selectedDesignsPrices.push(0);
    } else {
      const priceNumber = parseFloat(category.price);
      this.selectedDesignsPrices.push(priceNumber);
    }
    this.categoryName = category.category;
    this.drawOnCanvas(category.url, false);
  }

  createProduct(redactor, b64) {
    let newProduct = new Product();
    newProduct.name = redactor.type;
    newProduct.type = redactor.type;
    if (redactor.categoryName) {
      newProduct.category = redactor.categoryName;
    } else {
      newProduct.category = 'no';
    }
    newProduct.svg = b64;
    newProduct.owner = redactor.user.firstName + " " + redactor.user.lastName;
    // newProduct.price = Math.floor(Math.random() * (20 - 5) + 5);
    newProduct.price = this.getProductPrice();
    return newProduct;
  }

  getProductPrice() {
    this.designsPrice = this.selectedDesignsPrices.reduce((a, b) => a + b, 0);
    const rightNumber = this.designsPrice + this.templatePrice;
    return parseFloat(rightNumber.toFixed(2));
  }

  saveProduct = function (event) {
    let productKey: string;
    let self = this;
    this.getCanvas().remove(this.boundingBox);
    let resultProductImg = this.getCanvas().toDataURL('png');
    let uploadTask = firebase.storage().ref('products/').child(Math.random().toString(36).substring(2, 15) + '.png').putString(resultProductImg, 'data_url')
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      null,
      null,
      () => {
        let newProduct = this.createProduct(self, uploadTask.snapshot.downloadURL);
        this.productService.setProduct(newProduct).then(resolve => {
          productKey = resolve.key;
          this.userService.addToUsersGallery(this.userService.getUserId(), productKey).then(resolve => {
            this.router.navigate(['profile-page/my-gallery']);
          });
        });
      })
  }

  buy = function (sizePanel) {
    this.showSize = true;
    this.templateSizeQuantites.forEach(el => {
      this.totalQuantity += el.quantity;
    });
    if (!this.totalQuantity) {
      let config = new MdSnackBarConfig();
      config.extraClasses = ['success-snackbar'];
      config.duration = 1500;
      this.snackBar.open(`Please, choose a size`, 'required', config);
      this.tab.selectedIndex = 1;
    } else {
      this.templateSizeQuantites.forEach(el => {
        if (el.quantity !== 0) {
          let productKey: string;
          let self = this;
          this.getCanvas().remove(this.boundingBox);
          let resultProductImg = this.getCanvas().toDataURL();
          let newProduct = this.createProduct(self, resultProductImg);
          this.productService.setSize(newProduct, el.size);
          this.orderService.addItem(newProduct, 'no', el.quantity);
        }
      });
      localStorage.setItem("cart-items", JSON.stringify(this.orderService.getAll()));
      this.router.navigate(['order-page']);
    }
  }

  loadImageHandler = function (e) {
    this.selectedDesignsPrices.push(5);
    let ojb = {
      width: 200,
      height: 200,
      left: 240,
      top: 200,
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
  keyBoardInput = function (event: KeyboardEvent) {
    if (event.keyCode == 8 && this.getCanvas().getActiveObject()) {
      this.removeImg();
    }
  }
  removeImg = function () {
    let object = this.getCanvas().getActiveObject();
    this.selectedDesignsPrices[object.id - 1] = 0;
    this.getCanvas().remove(object);
  }

  addText = function () {
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
  }

  addButtonClick(size) {
    return size.quantity++;
  }

  subtractButtonClick(size) {
    if (size.quantity > 0) {
      return size.quantity--;
    }
  }
}
