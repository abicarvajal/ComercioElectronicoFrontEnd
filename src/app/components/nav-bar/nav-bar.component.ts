import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  formulario!: FormGroup;
  constructor(private fb: FormBuilder, private modalService: NgbModal, private loginSrv: LoginService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  login(content:any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  buildForm():void{
    this.formulario = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.required]]
    });
  }

  tryLogin(content:any){
    if(this.formulario.invalid) {
      return;
    }
    console.log(this.formulario.getRawValue());
    this.loginSrv.getToken(this.formulario.getRawValue());
  }
}
