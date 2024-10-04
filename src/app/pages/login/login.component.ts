
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { LoginDTO } from 'src/app/DTOs/loginDTO';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
    '../../../assets/Login/css/style.css'
  ]
})
export class LoginComponent {

  passwordFieldType: string = 'password';

  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  constructor(private api: MainServicesService, private notification: ToastrService, private router: Router, private load: NgxSpinnerService) { }
  obj: LoginDTO = new LoginDTO()
  Login() {
    this.load.show()
    this.api.login(this.obj).subscribe(res => {
      localStorage.setItem("token", res)
      this.notification.success('Login success')
      this.router.navigate(['/profile'])
      this.load.hide()
    }, err => {
      this.notification.warning('Login failed you\'re not admin')
      this.load.hide()
    })
  }

  //angular life cycle hooks
  ngOnInit() {

  }
  //ngAfterviewInit(){}
  //ngOnDestroy(){}
}
