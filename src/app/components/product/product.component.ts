import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { ProductDto } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  brands: ProductDto[] = [];
  selectedProduct!: any;

  formulario!: FormGroup;
  constructor(private productSrv: ProductService, private modalService: NgbModal, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productSrv.getProducts().subscribe(response =>{
       console.log(response)
    })
  }

}
