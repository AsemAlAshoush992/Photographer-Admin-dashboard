import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { PrivateGalleryDetailsDTO } from 'src/app/DTOs/Gallery/privateGalleryDetailsDTO';
import { UpdateGalleryDTO } from 'src/app/DTOs/Gallery/updateGalleryDTO';

@Component({
  selector: 'app-update-public-gallery',
  templateUrl: './update-public-gallery.component.html',
  styleUrls: ['./update-public-gallery.component.css']
})
export class UpdatePublicGalleryComponent {
  constructor(public dialogRef: MatDialogRef<UpdatePublicGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrivateGalleryDetailsDTO, public backend: MainServicesService,
    public spinner: NgxSpinnerService, public toastr: ToastrService) { }

  file: File | undefined;
  editFile: UpdateGalleryDTO = new UpdateGalleryDTO()

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
    }
  }

  updateFile() {

    this.spinner.show()
    if (this.file == undefined) {
      if (typeof this.data.path === 'string') {
        const indexOfSlash = this.data.path.indexOf('/F');
        this.editFile.path = this.data.path.substring(indexOfSlash + 1);
        this.editFile.id = this.data.id
        this.editFile.fileName = this.data.fileName
        this.backend.UpdatePublicGallery(this.editFile).subscribe(res => {
          this.spinner.hide()
          this.toastr.success('The file has been updated')
          this.dialogRef.close(true)
        }, err => {
          this.spinner.hide()
          this.toastr.warning('File update failed')
          this.dialogRef.close(false)
        })
      }
    } else {
      this.backend.uploadFile(this.file).subscribe(res => {
        this.editFile.path = res;
        this.editFile.id = this.data.id
        this.editFile.fileName = this.data.fileName
        this.backend.UpdatePublicGallery(this.editFile).subscribe(res => {
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

