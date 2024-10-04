import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { CreateCategoryDTO } from 'src/app/DTOs/Categories/createCategoryDTO';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  @ViewChild('categoryForm') categoryForm!: NgForm;
constructor(public dialogRef: MatDialogRef<CreateCategoryComponent>, 
  @Inject(MAT_DIALOG_DATA) public data: CreateCategoryDTO, public backend: MainServicesService,
  private notification: ToastrService, public load: NgxSpinnerService){}

  fileExists: boolean = false;
  fileTouched: boolean = false;
  category: CreateCategoryDTO = new CreateCategoryDTO
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

  CreateNewCategory() {
    if (this.file == undefined) {

    } else {
      this.load.show()
      this.backend.uploadFile(this.file).subscribe(res => {
        this.category.imagePath = res;
        this.load.hide()
        this.backend.CreateCategory(this.category).subscribe(res => {
          this.load.hide()
          this.notification.success('The category has been created')
          this.dialogRef.close(true)
        }, error => {
          this.load.hide()
          this.notification.warning('Category create faild')
          this.dialogRef.close(false)
        })
      }, error => {
        return;
      });
    }

  }
}
