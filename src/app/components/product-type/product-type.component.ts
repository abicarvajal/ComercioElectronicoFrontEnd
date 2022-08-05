import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductTypeDto } from '../../models/productType';
import { ProductTypeService } from '../../services/product-type.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {
  productTypes: ProductTypeDto[]=[]
  formulario!: FormGroup;
  selectedProductType!: any;

  constructor(private productTypeSrv: ProductTypeService,public dialog: MatDialog, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.productTypeSrv.getProductTypes().subscribe(response => 
      {
        this.productTypes = response;
      }
    )
  }

  buildForm():void{
    this.formulario = this.fb.group({
      code: [{value:this.selectedProductType.code, disabled: true}, [Validators.required, Validators.maxLength(4)]],
      description: [this.selectedProductType.description,[Validators.required, Validators.pattern(/^[a-zA-Z0-0-\s]+$/)]]
    });
  }

  buildFormAdd():void{
    this.formulario = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(4)]],
      description: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-0-\s]+$/)]]
    });
  }

  editProducType(code: string, content: any){
    this.productTypeSrv.getProductTypeById(code).subscribe(
      response=>{
        this.selectedProductType = response;
        console.log('Editando ' + code );
        this.buildForm();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      }
    )
  }

  openDialog(code:string): void {
    let dialogRef = this.dialog.open(DialogComponent);
    let instance = dialogRef.componentInstance;
    instance.type = "Product Type";
    instance.code = code;
    console.log('dialogRef',dialogRef);
  }

  addProductType(){
    if(this.formulario.invalid) {
      return;
    }
    console.log(this.formulario.getRawValue())
    this.productTypeSrv.createProductType(this.formulario.getRawValue());
  }

  openAddModal(content:any){
    this.buildFormAdd();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  updateProductType(){
    if(this.formulario.invalid) {
      return;
    }
    this.productTypeSrv.updateProductType(this.formulario.getRawValue()).subscribe(
      response => console.log(response)
    );
  }

}
