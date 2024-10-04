import { Component } from '@angular/core';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserInfoDTO } from 'src/app/DTOs/Profile/userInfoDTO';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class NavComponent {

  userInformation: UserInfoDTO | undefined;

 constructor(private backend: MainServicesService, private notification:ToastrService, private router:Router, private load: NgxSpinnerService){}
  Logout() {
    this.load.show()
    this.backend.logout().subscribe(
      res => {
        this.notification.success('Logout success')
        localStorage.removeItem('token');
        // إعادة التوجيه إلى صفحة تسجيل الدخول أو الصفحة الرئيسية
        this.router.navigate(['']);
        this.load.hide()
      },
      err => {
        this.notification.warning('Logout failed')
      }
    );
  }


  ngOnInit(){
    this.backend.getUserInformation().subscribe(
      (res: UserInfoDTO) => { // Directly handle the object
          this.userInformation = res;
      },
      err => {
        
      }
    );
  }


}
