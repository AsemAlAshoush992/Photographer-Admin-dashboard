import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { ServiceDetailsDTO } from 'src/app/DTOs/Services/serviceDetailsDTO';
import { UpdateServiceDTO } from 'src/app/DTOs/Services/updateServiceDTO';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent {
  constructor(public dialogRef: MatDialogRef<UpdateServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceDetailsDTO, public backend: MainServicesService,
    private notification: ToastrService, public load: NgxSpinnerService) { }



  selectItem1: string = ''
  selectItem2: Boolean = false
  selectItem3: number = 0
  updateService: UpdateServiceDTO = new UpdateServiceDTO
  file: File | undefined;


  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
    }
  }


  DiscountType(event: any) {
    const value = (event.target as HTMLSelectElement).value
    if (value) {
      this.selectItem1 = value
    }
    else {
      this.selectItem1 = 'Percent'
    }

  }

  IsHaveDiscount(event: any) {
    const value = (event.target as HTMLSelectElement).value
    this.selectItem2 = value === "true" || value === "1";
  }


  CategoryNumber(event: any) {
    const value = (event.target as HTMLSelectElement).value
    if (value) {
      // Convert the value to a number
      this.selectItem3 = parseInt(value, 10); // convert to decimal system by 10 number
    }

  }


  UpdateService() {
    if (this.file == undefined) {
      this.load.show()
      if (typeof this.data.imagePath === 'string') {
        const indexOfSlash = this.data.imagePath.indexOf('/F');
        this.updateService.imagePath = this.data.imagePath.substring(indexOfSlash + 1);
        this.updateService.id = this.data.id
        this.updateService.name = this.data.name
        this.updateService.description = this.data.description
        const value2 = this.data.price
        if (value2) {
          this.updateService.price = parseInt(value2, 10)
        }
        this.updateService.quantity = this.data.quantity
        this.updateService.disacountAmount = this.data.disacountAmount
        this.updateService.discountType = this.selectItem1 || this.data.discountType;
        this.updateService.categoryID = this.selectItem3 || this.data.categoryID;
        if (this.selectItem2 == undefined) {
          this.updateService.isHaveDiscount = this.data.isHaveDiscount
        } else {
          this.updateService.isHaveDiscount = this.selectItem2
        }

        this.backend.UpdateService(this.updateService).subscribe(res => {
          this.load.hide()
          this.notification.success('The service has been updated')
          this.dialogRef.close(true)
        }, error => {
          this.load.hide()
          this.notification.warning('Service updated faild')
          this.dialogRef.close(false)
        })
      }
    } else {
      this.load.show()
      this.updateService.id = this.data.id
      this.updateService.name = this.data.name
      this.updateService.description = this.data.description
      const value2 = this.data.price
      if (value2) {
        this.updateService.price = parseInt(value2, 10)
      }
      this.updateService.quantity = this.data.quantity
      this.updateService.disacountAmount = this.data.disacountAmount
      //logic assign slectTtem Or discountType
      this.updateService.discountType = this.selectItem1 || this.data.discountType;
      this.updateService.categoryID = this.selectItem3 || this.data.categoryID;
      if (this.selectItem2 == undefined) {
        this.updateService.isHaveDiscount = this.data.isHaveDiscount
      } else {
        this.updateService.isHaveDiscount = this.selectItem2
      }
      this.backend.uploadFile(this.file).subscribe(res => {
        this.updateService.imagePath = res;
        this.load.hide()
        this.backend.UpdateService(this.updateService).subscribe(res => {
          this.load.hide()
          this.notification.success('The service has been updated')
          this.dialogRef.close(true)
        }, error => {
          this.load.hide()
          this.notification.warning('Service updated faild')
          this.dialogRef.close(false)
        })
      }, error => {
        return;
      });
    }
  }
}
