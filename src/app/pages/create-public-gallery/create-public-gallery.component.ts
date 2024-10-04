import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { CreatePublicGalleryDTO } from 'src/app/DTOs/Gallery/createPublicGalleryDTO';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-public-gallery',
  templateUrl: './create-public-gallery.component.html',
  styleUrls: ['./create-public-gallery.component.css']
})
export class CreatePublicGalleryComponent {

  @ViewChild('publicgalleryForm') publicgalleryForm!: NgForm;
  constructor(public dialogRef: MatDialogRef<CreatePublicGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreatePublicGalleryDTO, public backend: MainServicesService,
    private notification: ToastrService, public load: NgxSpinnerService) { }

  fileExists: boolean = false;
  fileTouched: boolean = false;


  CreateFile: CreatePublicGalleryDTO = new CreatePublicGalleryDTO
  file: File | undefined;
  onFileSelected(event: any) {
    this.fileTouched = true;
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
      this.fileExists = true;
    } else {
      this.fileExists = false;
    }
  }

  CreatePublicGallery() {
    if (this.file == undefined || this.CreateFile.fileName == "") {
      return;
    } else {
      this.load.show()
      this.backend.uploadFile(this.file).subscribe(res => {
        this.CreateFile.path = res;
        this.backend.CreatePublicGallery(this.CreateFile).subscribe(res => {
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
