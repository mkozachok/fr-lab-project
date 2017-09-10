import { Component } from '@angular/core';



@Component({
  moduleId: module.id,
  selector: 'app-redactor-page',
  templateUrl: './redactor-page.component.html',
  styleUrls: ['./redactor-page.component.scss']
})



export class RedactorPageComponent{
 	title = 'redactor';
  type = "tshirtm";
  selectedProductImage = "";
  selectProduct = function(product){
    this.type = product.type;
    this.selectedProductImage = product.url;
  }
  getColors = function(){
    let type = this.type;
    var typeArr = this.products.filter(function(item){
      return type.length==0?true:item.type == type;
    })
    return typeArr;
  }
  setColor = function(product){
    this.selectedProductImage = product.url;
  }
   product_types = [
      {
        type: "tshirtm",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/812/views/1/appearances/1?width=450&height=450&mediaType=webp"
      },
      {
        type:"tankm",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/916/views/1/appearances/1?width=400&height=400&mediaType=webp"
      },
      {
        type: "sleevem",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/875/views/1/appearances/1?width=400&height=400&mediaType=webp"
      },
      {
        type: "cap",
        url: "https://image.spreadshirtmedia.com/image-server/v1/productTypes/129/views/1/appearances/1?width=350&height=350&mediaType=webp"
      },
      {
        type: "mug",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/31/views/1/appearances/1?width=400&height=400&mediaType=webp"
      },
      {
        type: "body",
        url: "https://image.spreadshirtmedia.com/image-server/v1/productTypes/401/views/1/appearances/1?width=350&height=350&mediaType=webp"
      },
      {
        type: "tshirtw",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/813/views/1/appearances/1?width=400&height=400&mediaType=webp"
      },
      {
        type: "tankw",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/917/views/1/appearances/1?width=400&height=400&mediaType=webp"
      },
      {
        type: "sleevew",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/876/views/1/appearances/1?width=400&height=400&mediaType=webp"
      }
  ];

private  products = [
      {
        color: "#ffffff",
        type: "tshirtm",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/812/views/1/appearances/1?width=450&height=450&mediaType=webp"
      },
      {
        color: "#fff500",
        type: "tshirtm",
        url: "https://image.spreadshirtmedia.com/image-server/v1/productTypes/210/views/1/appearances/7?width=450&height=450&mediaType=webp"
      },
      {
        color: "#000000",
        type: "tshirtm",
        url: "https://image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/1/appearances/2?width=450&height=450&mediaType=webp"
      },
      {
        color: "#2244aa",
        type: "tshirtm",
        url: "http://image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/1/appearances/317?width=450&height=450&mediaType=webp"
      },
      {
        color: "#b91816",
        type: "tshirtm",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/812/views/1/appearances/366?width=450&height=450&mediaType=webp"
      },
      {
        color: "#cccccc",
        type: "tshirtm",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/812/views/1/appearances/231?width=450&height=450&mediaType=webp"
      },
      {
        color: "#664b2f",
        type: "tshirtm",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/812/views/1/appearances/387?width=450&height=450&mediaType=webp"
      },
      {
        color: "#008a47",
        type: "tshirtm",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/812/views/1/appearances/92?width=450&height=450&mediaType=webp"
      },
      {
        color: "#0ac7df",
        type: "tshirtm",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/210/views/1/appearances/706?width=450&height=450&mediaType=webp"
      },
      {
        color: "#fb4e81",
        type: "tshirtm",
        url: "https://www.spreadshirt.com/image-server/v1/productTypes/210/views/1/appearances/591?width=450&height=450&mediaType=webp"
      }
  ]
}
