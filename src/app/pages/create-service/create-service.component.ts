import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { CreateServiceDTO } from 'src/app/DTOs/Services/createServiceDTO';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent {
  @ViewChild('serviceForm') serviceForm!: NgForm;
  constructor(public dialogRef: MatDialogRef<CreateServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateServiceDTO, public backend: MainServicesService,
    private notification: ToastrService, public load: NgxSpinnerService) { }


  fileExists: boolean = false;
  fileTouched: boolean = false;

  fileExists1: boolean = false;
  fileTouched1: boolean = false;


  fileExists2: boolean = false;
  fileTouched2: boolean = false;


  fileExists3: boolean = false;
  fileTouched3: boolean = false;


  selectItem1: string = ''
  selectItem2: boolean = false
  selectItem3: number = 0
  service: CreateServiceDTO = new CreateServiceDTO
  file: File | undefined;


  onFileSelected(event: any) {
    this.fileTouched = true
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
      this.fileExists = true
    } else {
      this.fileExists = false
    }
  }


  DiscountType(event: any) {
    const value = (event.target as HTMLSelectElement).value
    this.fileTouched1 = true
    if (value) {
      this.selectItem1 = value
      this.fileExists1 = true
    }
    else {
      this.selectItem1 = ''
      this.fileExists1 = false
    }

  }

  IsHaveDiscount(event: any) {
    const value = (event.target as HTMLSelectElement).value
    this.fileTouched2 = true
    this.selectItem2 = value === "true" || value === "1";
    if (value) {
      this.fileExists2 = true
    } else {
      this.fileExists2 = false
    }
  }


  CategoryNumber(event: any) {
    const value = (event.target as HTMLSelectElement).value
    this.fileTouched3 = true
    if (value) {
      // Convert the value to a number
      this.fileExists3 = true
      this.selectItem3 = parseInt(value, 10);
    } else {
      this.fileExists3 = false
    }

  }


  CreateNewService() {
    if (this.file == undefined) {

    } else {
      this.load.show()
      this.backend.uploadFile(this.file).subscribe(res => {
        this.service.discountType = this.selectItem1
        this.service.isHaveDiscount = this.selectItem2
        this.service.categoryID = this.selectItem3
        this.service.imagePath = res;
        this.backend.CreateService(this.service).subscribe(res => {
          this.load.hide()
          this.notification.success('The service has been created')
          this.dialogRef.close(true)
        }, error => {
          this.load.hide()
          this.notification.warning('Service create faild')
          this.dialogRef.close(false)
        })
      }, error => {
        return;
      });
    }
  }
}