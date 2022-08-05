import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  formulario!: FormGroup;
  constructor(private fb: FormBuilder, private modalService: NgbModal, private loginSrv: LoginService, private router: Router) { }

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
    if(this.loginSrv.getToken(this.formulario.getRawValue())!=''){
      this.router.navigateByUrl('/');
    }
  }
}
