import { Component } from '@angular/core';
import mergeImages from 'merge-images';
import $  from "jquery";
import { fabric } from 'fabric';


@Component({
  moduleId: module.id,
  selector: 'app-redactor-page',
  templateUrl: './redactor-page.component.html',
  styleUrls: ['./redactor-page.component.scss']
})



export class RedactorPageComponent{
 	title = 'redactor';
  type = "tshirtm";
  selectedProductImage = {};
  selectedCategory = {};
  name = "";
  resultImg = "";
  selectProduct = function(product){
    this.type = product.type;
    this.selectedProductImage.src = product.url;
    this.drawProduct();

  }
  drawProduct = function(){
    let canvas = this.getProductCanvas();
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
    img.src = self.selectedProductImage.src;
  }
  getProductCanvas = function(){
    if(!this.productCanvas){
      this.productCanvas = new fabric.Canvas('img_product');
    }
    return this.productCanvas;
  }
  getColors = function(){
    let type = this.type;
    var typeArr = this.products.filter(function(item){
      return type.length==0?true:item.type == type;
    })
    return typeArr;
  }
  setColor = function(product){
    this.selectedProductImage.src = product.url;
    this.drawProduct();
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
          top: 200
      });
      self.drawImg(image);

    }
    img.src = self.selectedCategory.src;
  }
  merge = function(event){
    mergeImages([this.getProductCanvas().toDataURL(),
     this.getCanvas().toDataURL()])
      .then(b64 => this.resultImg = b64);
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
   product_types = [
      {
        type: "tshirtm",
        url: "assets/images/products/tshirtm.png"
      },
      {
        type:"tankm",
        url: "assets/images/products/tankm.png"
      },
      {
        type: "sleevem",
        url: "assets/images/products/sleevem.png"
      },
      {
        type: "cap",
        url: "assets/images/products/cap.png"
      },
      {
        type: "mug",
        url: "assets/images/products/mug.png"
      },
      {
        type: "body",
        url: "assets/images/products/body.png"
      },
      {
        type: "tshirtw",
        url: "assets/images/products/tshirtw.png"
      },
      {
        type: "tankw",
        url: "assets/images/products/tankw.png"
      },
      {
        type: "sleevew",
        url: "assets/images/products/sleevew.png"
      }
  ];

private  products = [
      {
        color: "#ffffff",
        type: "tshirtm",
        url: "assets/images/products/tshirtm.png"
      },
      {
        color: "#fff500",
        type: "tshirtm",
        url: "assets/images/products/tshirtm_yellow.png"
      },
      {
        color: "#000000",
        type: "tshirtm",
        url: "assets/images/products/tshirtm_black.png"
      },
      {
        color: "#2244aa",
        type: "tshirtm",
        url: "assets/images/products/tshirtm_darkblue.png"
      },
      {
        color: "#b91816",
        type: "tshirtm",
        url: "assets/images/products/tshirtm_red.png"
      },
      {
        color: "#cccccc",
        type: "tshirtm",
        url: "assets/images/products/tshirtm_grey.png"
      },
      {
        color: "#664b2f",
        type: "tshirtm",
        url: "assets/images/products/tshirtm_brown.png"
      },
      {
        color: "#008a47",
        type: "tshirtm",
        url: "assets/images/products/tshirtm_green.png"
      },
      {
        color: "#0ac7df",
        type: "tshirtm",
        url: "assets/images/products/tshirtm_blue.png"
      },
      {
        color: "#fb4e81",
        type: "tshirtm",
        url: "assets/images/products/tshirtm_pink.png"
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
