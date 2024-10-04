import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { UpdateUserDTO } from 'src/app/DTOs/Profile/updateUserDTO';
import { UserInfoDTO } from 'src/app/DTOs/Profile/userInfoDTO';


@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent {
  constructor(public dialogRef: MatDialogRef<UpdateAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfoDTO, public backend: MainServicesService,
    public spinner: NgxSpinnerService, public toastr: ToastrService, private router: Router) { }

  file: File | undefined;
  editUserAcount: UpdateUserDTO = new UpdateUserDTO()


  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
    }
  }


  updateUserAcount() {
    this.spinner.show()
    if (this.file == undefined) {
      if (typeof this.data.imagePath === 'string') {
        const indexOfSlash = this.data.imagePath.indexOf('/F');
        this.editUserAcount.imagePath = this.data.imagePath.substring(indexOfSlash + 1);
        if (this.data.fullName) {
          const nameParts = this.data.fullName.split(' ');
          this.editUserAcount.firstName = nameParts[0] || ''
          this.editUserAcount.lastName = nameParts[1] || ''
          this.editUserAcount.password = this.data.password
          this.editUserAcount.birthDate = this.data.birthDate
          this.editUserAcount.phone = this.data.phone
          this.backend.UpdatePersonalInformation(this.editUserAcount).subscribe(res => {
            this.spinner.hide()
            this.dialogRef.close(true)
            this.toastr.success('The Profile has been updated')
          }, err => {
            this.spinner.hide()
            this.toastr.warning('Profile update failed')
            this.dialogRef.close(false)
          })
        }
      }
    } else {
      this.spinner.show()
      this.backend.uploadFile(this.file).subscribe(res => {
        this.editUserAcount.imagePath = res;
        if (this.data.fullName) {
          const nameParts = this.data.fullName.split(' ');
          this.editUserAcount.firstName = nameParts[0] || ''
          this.editUserAcount.lastName = nameParts[1] || ''
          this.editUserAcount.password = this.data.password
          this.editUserAcount.birthDate = this.data.birthDate
          this.editUserAcount.phone = this.data.phone
          this.backend.UpdatePersonalInformation(this.editUserAcount).subscribe(res => {
            this.spinner.hide()
            this.dialogRef.close(true)
            this.toastr.success('The Profile has been updated')
          }, err => {
            this.spinner.hide()
            this.toastr.warning('Profile update failed')
            this.dialogRef.close(false)
          })
        }
      }, error => {
        return;
      });

    }

  }
}
