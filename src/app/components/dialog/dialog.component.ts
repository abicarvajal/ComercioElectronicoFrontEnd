import { Component, Input, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ProductTypeService } from '../../services/product-type.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  @Input() type: string = '';
  @Input() code: string = '';
  
  constructor(private brandSrv: BrandService, private productSrv: ProductService, private productTypeSrv: ProductTypeService, private router: Router) { }

  ngOnInit(): void {
  }

  delete(){
    switch(this.type){
      case 'Brand':
        this.brandSrv.deleteBrand(this.code).subscribe(
          response => {
            if(response){
              this.router.navigateByUrl('/brand');
              console.log(response)
            }
          }
        );
        break;
      case 'Product':      
        this.productSrv.deleteProduct(this.code).subscribe(
          response => {
            if(response){
              this.router.navigateByUrl('/product');
              console.log(response)
            }
          }
        );
        break;
      case 'Product Type':      
        this.productTypeSrv.deleteProductType(this.code).subscribe(
          response => {
            if(response){
              this.router.navigateByUrl('/product-type');
              console.log(response)
            }
          }
        );
        break;
      default:
        console.log("No se puede borrar");
    }

  }
}
