import { Component, Input, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';
import { CreateCartItemDto, CreateOrderDto } from '../../models/dtos/createOrderDto';
import { ItemOrderDto } from 'src/app/models/dtos/itemOrderDto';
import { DeliveryMethodDto } from '../../models/dtos/deliveryMethodDto';
import { DeliveryMethodService } from '../../services/delivery-method.service';
import { OrderService } from '../../services/order.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  products: ProductDto[] = [];
  cartItems: CreateCartItemDto[]= [];
  items: ItemOrderDto[]=[] ;
  deliveries: DeliveryMethodDto[]=[];

  cartItemOrder!: CreateOrderDto ;

  stateOfBuy: boolean = false;
  currentDialog = null;

  form!: FormGroup;

  constructor(private productSrv:ProductService, private deliverySrv:DeliveryMethodService, private orderSrv: OrderService, private modalService: NgbModal, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productSrv.getProducts().subscribe(response=>{
      this.products = response;
    })
    this.deliverySrv.getDeliveryMethod().subscribe(response=>{
      this.deliveries = response;
    })
    this.buildForm();
  }

  buildForm():void{
    this.form = this.fb.group({
      quantity:['',[Validators.required,Validators.min(1)]]
    });
  }

  add(productId:string, quantity:string){
    if(this.form.invalid){
      return;
    }
    let elements = this.items.length + 1;

    const first = this.cartItems.find((obj) => {
      return obj.productId === productId;
    })

    if(first){
      console.log(first);
      const modifiedObj = {"code": first.code,"productId": first.productId,"quantity": first.quantity + parseInt(quantity)};
      const result = this.cartItems.map((item) => item.productId === modifiedObj.productId ? modifiedObj : item);
      this.cartItems = result;

      this.productSrv.getProductById(productId).subscribe(
        response=>{
          const modifiedItem = {productId: response.id, code:`00${elements}`, name:response.name, quantity:first.quantity+parseInt(quantity), price:response.price};
          const resultItem = this.items.map((item)=> item.productId === modifiedItem.productId ?modifiedItem:item )
          this.items = resultItem;
        }
      )
      
    }
    else{
      this.cartItems.push({code: `00${elements}`,productId:productId, quantity:+quantity})
  
      this.productSrv.getProductById(productId).subscribe(
        response=>{
          this.items.push({productId: response.id,code:`00${elements}`,name:response.name,quantity:+quantity, price: response.price});
        }
      )
    }

    
  }

  buy(){
    let code = this.makeid(6);
    this.cartItemOrder = {code:code,deliveryMethodId:'001',itemsToCart:this.cartItems}
    if(this.orderSrv.createOrder(this.cartItemOrder)){
      this.open();
    }
  }

  makeid(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.purchaseStatus = 'Purchase Done!';

    modalRef.closed.subscribe(response => {
      this.router.navigateByUrl('');
    })
  }

}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p>{{purchaseStatus}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" href="/" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() purchaseStatus='';

  constructor(public activeModal: NgbActiveModal) {}
}