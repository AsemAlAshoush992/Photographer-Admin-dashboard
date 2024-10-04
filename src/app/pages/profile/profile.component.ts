import { Component } from '@angular/core';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserInfoDTO } from 'src/app/DTOs/Profile/userInfoDTO';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/DTOs/ConformDialog/confirmDialog';
import { ConfirmDialogComponent } from 'src/app/shared-component/confirm-dialog/confirm-dialog.component';
import { UpdateAdminDTO } from 'src/app/DTOs/Profile/updateAdminDTO';
import { UpdateAdminComponent } from '../update-admin/update-admin.component';
import { CreateAdminComponent } from '../create-admin/create-admin.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ProfileComponent {

  userInformation: UserInfoDTO | undefined;

  constructor(private backend: MainServicesService, private toastr:ToastrService, private router:Router, private spinner: NgxSpinnerService,
  public dialog: MatDialog
  ){}


  ngOnInit(){
    this.spinner.show()
    this.backend.getUserInformation().subscribe(
      (res: UserInfoDTO) => { // Directly handle the object
          this.userInformation = res;
          this.spinner.hide()
      },
      err => {
        this.spinner.hide()
        this.toastr.warning('faild to load user information')
      }
    );
  }


  EditUser(item: UserInfoDTO | undefined) {
    const dialogres = this.dialog.open(UpdateAdminComponent, {
    width: '1000px',
    data: item
  });


  dialogres.afterClosed().subscribe(result => {
    if(result){
      window.location.reload();
    }else{
      
    }
  });
}

}
