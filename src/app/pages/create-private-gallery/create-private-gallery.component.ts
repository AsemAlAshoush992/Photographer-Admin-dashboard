import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { CreatePrivateGalleryDTO } from 'src/app/DTOs/Gallery/createPrivateGalleryDTO';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-private-gallery',
  templateUrl: './create-private-gallery.component.html',
  styleUrls: ['./create-private-gallery.component.css']
})
export class CreatePrivateGalleryComponent {
  @ViewChild('privategalleryForm') privategalleryForm!: NgForm;
  constructor(public dialogRef: MatDialogRef<CreatePrivateGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreatePrivateGalleryDTO, public backend: MainServicesService,
    private notification: ToastrService, public load: NgxSpinnerService) { }

  fileExists: boolean = false;
  fileTouched: boolean = false;

  fileName: CreatePrivateGalleryDTO = new CreatePrivateGalleryDTO
  file: File | undefined;
  onFileSelected(event: any) {
    this.fileTouched = true;
    if (event.target.files && event.target.files[0]) {
      this.fileExists = true;
      this.file = event.target.files[0]
    }else{
      this.fileExists = false;
    }
  }



  CreatePrivateGallery() {
    if (this.file == undefined) {

    } else {
      this.load.show()
      this.backend.uploadFile(this.file).subscribe(res => {
        this.fileName.path = res;
        this.load.hide()
        this.backend.CreatePrivateGallery(this.fileName).subscribe(res => {
          this.load.hide()
          this.notification.success('The file has been created')
          this.dialogRef.close(true)
        }, error => {
          this.load.hide()
          this.notification.warning(' file create faild')
          this.dialogRef.close(false)
        })
      }, error => {
        return;
      });
    }

  }

}
