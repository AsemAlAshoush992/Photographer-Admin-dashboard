import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { CategoryDetailsDTO } from 'src/app/DTOs/Categories/categoryDetailsDTO';
import { UpdateCategoryDTO } from 'src/app/DTOs/Categories/updateCategoryDTO';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  constructor(public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryDetailsDTO, public backend: MainServicesService,
    private notification: ToastrService, public load: NgxSpinnerService) { }


  updateCategory: UpdateCategoryDTO = new UpdateCategoryDTO
  file: File | undefined;
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
    }
  }

  UpdateCategory() {
    if (this.file == undefined) {
      this.load.show()
      if (typeof this.data.imagePath === 'string') {
        const indexOfSlash = this.data.imagePath.indexOf('/F');
        this.updateCategory.imagePath = this.data.imagePath.substring(indexOfSlash + 1);
        this.updateCategory.id = this.data.id
        this.updateCategory.title = this.data.title
        this.updateCategory.description = this.data.description
        this.backend.UpdateCategory(this.updateCategory).subscribe(res => {
          this.load.hide()
          this.notification.success('The category has been updated')
          this.dialogRef.close(true)
        }, error => {
          this.load.hide()
          this.notification.warning('Category updated faild')
          this.dialogRef.close(false)
        })
      }
    } else {
      this.load.show()
      this.updateCategory.id = this.data.id
      this.updateCategory.title = this.data.title
      this.updateCategory.description = this.data.description
      this.backend.uploadFile(this.file).subscribe(res => {
        this.updateCategory.imagePath = res;
        this.load.hide()
        this.backend.UpdateCategory(this.updateCategory).subscribe(res => {
          this.load.hide()
          this.notification.success('The category has been updated')
          this.dialogRef.close(true)
        }, error => {
          this.load.hide()
          this.notification.warning('Category updated faild')
          this.dialogRef.close(false)
        })
      }, error => {
        return;
      });
    }
  }
}
