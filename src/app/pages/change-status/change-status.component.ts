import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { ChangeStatusDTO } from 'src/app/DTOs/Orders/changeStatusDTO';
import { OrderDetailsDTO } from 'src/app/DTOs/Orders/orderDetailsDTO';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent {
  selectItem: string = ""
  input: ChangeStatusDTO = new ChangeStatusDTO()
  constructor(public dialogRef: MatDialogRef<ChangeStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailsDTO, public load: NgxSpinnerService,
    public toastr: ToastrService, private api: MainServicesService) { }


    onStatusChange(event : any){
      if((event.target as HTMLSelectElement).value){
        this.selectItem = (event.target as HTMLSelectElement).value
      }
        
    }

  ChangeStatus() {
    if (this.selectItem == undefined || this.selectItem == '') {
      this.toastr.warning('status is required')
      return;
    }else{
      this.input.orderId = this.data.id;
      this.input.status = this.selectItem;
      this.load.show()
      this.api.ChangeStatusOrder(this.input).subscribe(res =>{
        this.load.hide()
        this.toastr.success('The order has been status changed')
        this.dialogRef.close(true)
      }, err =>{
        this.load.hide()
        this.toastr.warning('Change faild')
        this.dialogRef.close(false)
      })
    }

    

  }
}
