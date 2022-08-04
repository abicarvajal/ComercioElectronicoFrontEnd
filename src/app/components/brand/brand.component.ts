import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Brand } from 'src/app/models/brand';
import { BrandService } from '../../services/brand.service';
import { DialogComponent } from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  selectedBrand!: any;

  formulario!: FormGroup;
  
  constructor(private brandSrv: BrandService, private modalService: NgbModal, private fb: FormBuilder, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.brandSrv.getBrands().subscribe(response => 
      {
        this.brands = response;
      }
    )
    this.buildForm();
  }

  buildForm():void{
    this.formulario = this.fb.group({
      code: [{value:this.selectedBrand.code, disabled: true}, [Validators.required, Validators.maxLength(4)]],
      description: [this.selectedBrand.description,[Validators.required, Validators.pattern(/^[a-zA-Z0-0-\s]+$/)]]
    });
  }

  buildFormAdd():void{
    this.formulario = this.fb.group({
      code: [this.selectedBrand.code=null, [Validators.required, Validators.maxLength(4)]],
      description: [this.selectedBrand.description='',[Validators.required, Validators.pattern(/^[a-zA-Z0-0-\s]+$/)]]
    });
  }

  editBrand(code:string, content: any){
    this.brandSrv.getBrandById(code).subscribe(
      response=>{
        this.selectedBrand = response;
        console.log('Editando ' + code );
        this.buildForm();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      }
    )
    
  }

  updateBrand(content:any) {
    if(this.formulario.invalid) {
      return;
    }
    this.brandSrv.updateBrand(this.formulario.getRawValue()).subscribe(
      response => console.log(response)
    );
  }

  addBrand(content:any){
    this.buildFormAdd();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  addBrands(content:any){
    if(this.formulario.invalid) {
      return;
    }
    console.log(this.formulario.getRawValue())
    this.brandSrv.createBrand(this.formulario.getRawValue());
  }

  openDialog(code:string): void {
    let dialogRef = this.dialog.open(DialogComponent);
    let instance = dialogRef.componentInstance;
    instance.type = "Brand";
    instance.code = code;
    console.log('dialogRef',dialogRef);
  }

}
