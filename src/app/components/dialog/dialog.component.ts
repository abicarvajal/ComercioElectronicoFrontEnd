import { Component, Input, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  @Input() type: string = '';
  @Input() code: string = '';
  
  constructor(private brandSrv: BrandService) { }

  ngOnInit(): void {
  }

  delete(){
    console.log("Entra a borrar");
    switch(this.type){
      case 'Brand':
        this.brandSrv.deleteBrand(this.code).subscribe(
          response => console.log(response)
        );
        break;
      default:
        console.log("No se puede borrar");
    }

  }
}
