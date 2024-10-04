import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { UpdateGalleryDTO } from 'src/app/DTOs/Gallery/updateGalleryDTO';
import { UpdatePrivateGalleryDTO } from 'src/app/DTOs/Gallery/updatePrivateGalleryDTO';

@Component({
  selector: 'app-update-private-gallery',
  templateUrl: './update-private-gallery.component.html',
  styleUrls: ['./update-private-gallery.component.css']
})
export class UpdatePrivateGalleryComponent {
  constructor(public dialogRef: MatDialogRef<UpdatePrivateGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateGalleryDTO, public backend: MainServicesService,
    public spinner: NgxSpinnerService, public toastr: ToastrService) { }

  file: File | undefined;
  editFile: UpdatePrivateGalleryDTO = new UpdatePrivateGalleryDTO()

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
    }
  }  

  updateFile(){
    this.spinner.show()
    if (this.file == undefined) {
      this.spinner.hide()
      this.dialogRef.close()
      return;
    }else{
      this.backend.uploadFile(this.file).subscribe(res => {
        this.editFile.path = res;
        this.editFile.id = this.data.id
        this.backend.UpdatePrivateGallery(this.editFile).subscribe(res => {
          this.spinner.hide()
          this.toastr.success('The file has been updated')
          this.dialogRef.close(true)
        }, err => {
          this.spinner.hide()
          this.toastr.warning('File update failed')
          this.dialogRef.close(false)
        })
      }, error => {
        return;
      });
    }
  }
}
