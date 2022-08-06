import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { ProductDto } from '../../models/product';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductTypeDto } from '../../models/productType';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { Router } from '@angular/router';
import { IsFocusableConfig } from '@angular/cdk/a11y';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: ProductDto[] = [];
  selectedProduct!: any;
  productTypes: ProductTypeDto[] =[];
  brands: Brand[]=[];
  formulario!: FormGroup;

  constructor(private productSrv: ProductService, private brandSrv: BrandService, private productTypeSrv:ProductTypeService, private modalService: NgbModal, private fb: FormBuilder, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.productSrv.getProducts().subscribe(response => 
      {
        this.products = response;
      }
    )
    this.productTypeSrv.getProductTypes().subscribe(response=>{
      this.productTypes = response;
    })
    this.brandSrv.getBrands().subscribe(response=>{
      this.brands = response;
    })
  }

  buildForm(){
    this.formulario = this.fb.group({
      name: [this.selectedProduct.name, [Validators.required, Validators.maxLength(250)]],
      description: [this.selectedProduct.description,[Validators.required, Validators.pattern(/^[a-zA-Z0-0-\s]+$/)]],
      price: [this.selectedProduct.price,[Validators.required]],
      productyTypeId: [this.selectedProduct.productyTypeId,],
      brandId: [this.selectedProduct.brandId,],
      stock: [this.selectedProduct.stock,[Validators.required,Validators.min(1)]]
    });
  }

  buildFormAdd(){
    this.formulario = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
      description: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-0-\s]+$/)]],
      price: ['',[Validators.required,Validators.min(0)]],
      productyTypeId: ['',Validators.required],
      brandId: ['',Validators.required],
      stock: ['',[Validators.required, Validators.min(1)]]
    });
  }

  editProduct(code:string, content:any){
    this.productSrv.getProductById(code).subscribe(
      response=>{
        this.selectedProduct = response;
        console.log('Editando ' + code , response);
        this.buildForm();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      }
    )
  }

  openDialog(code:string): void {
    let dialogRef = this.dialog.open(DialogComponent);
    let instance = dialogRef.componentInstance;
    instance.type = "Product";
    instance.code = code;
  }

  openModalAdd(content:any){
    this.buildFormAdd();
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.closed.subscribe(response => {
      this.router.navigateByUrl('');
    })
  }

  addProduct(){
    if(this.formulario.invalid) {
      return;
    }
    console.log(this.formulario.getRawValue())
    this.productSrv.createProduct(this.formulario.getRawValue());
  }

  updateProduct(){
    console.log("en el update", this.formulario.getRawValue(), this.selectedProduct.id);
    if(this.formulario.invalid) {
      return;
    }
    this.productSrv.updateProduct(this.formulario.getRawValue(),this.selectedProduct.id).subscribe(
      response => console.log(response)
    );
  }

}
