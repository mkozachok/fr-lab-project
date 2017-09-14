import { Component } from '@angular/core';
import mergeImages from 'merge-images';
import $  from "jquery";


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
  }
  selectCategory = function(category){
    this.selectedCategory.src = category.url;
    this.categoryName = category.name;
  }
  test = function(event){
    mergeImages([this.selectedProductImage,
     this.selectedCategory,])
      .then(b64 => this.resultImg = b64);
  }
  onDragBegin = function($event){
    //TODO
  }
  onDragEnd = function(element){
    let coords = $(element).position();
    this.selectedCategory.x =  coords.left;
    this.selectedCategory.y = coords.top;
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
