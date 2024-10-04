import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { RegisterDTO } from 'src/app/DTOs/Profile/registerDTO';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent {
  @ViewChild('adminForm') adminForm!: NgForm;
  constructor(private api: MainServicesService, private notification: ToastrService, public load: NgxSpinnerService
    , public dialogRef: MatDialogRef<CreateAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterDTO
  ) { }

  file: File | undefined;
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
      console.log(this.file)
    }
  }
  registerObj: RegisterDTO = new RegisterDTO()


  onReset() {
    this.registerObj = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: new Date(),
      phone: '',
      imagePath: ''
    };
  }


  Register() {
    if (this.file == undefined) {
      this.load.show()
      this.api.register(this.registerObj).subscribe(res => {
        this.load.hide()
        this.dialogRef.close(true)
        this.notification.success('New Admin Has Been Created')
      }, err => {
        this.load.hide()
        this.dialogRef.close(false)
        this.notification.warning('New Admin Has Been Failed')
      })
    } else {
      this.load.show()
      this.api.uploadFile(this.file).subscribe(res => {
        this.registerObj.imagePath = res;
        this.api.register(this.registerObj).subscribe(res => {
          this.load.hide()
          this.dialogRef.close(true)
          this.notification.success('New Admin Has Been Created')
        }, err => {
          this.load.hide()
          this.dialogRef.close(false)
          this.notification.warning('New Admin Has Been Failed')
        })
      }, error => {
        return;
      });
    }

  }



}
