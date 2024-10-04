import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateBlogDTO } from 'src/app/DTOs/Blogs/updateBlogDTO';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { BlogDetailsForUserDTO } from 'src/app/DTOs/Blogs/blogDetailsForUserDTO';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent {
  file: File | undefined;
  fileNumber: number = 0;
  editBlog: UpdateBlogDTO = new UpdateBlogDTO()
  constructor(public dialogRef: MatDialogRef<UpdateBlogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BlogDetailsForUserDTO, public backend: MainServicesService,
    public spinner: NgxSpinnerService, public toastr: ToastrService) { }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
    }
  }


  updateBlog() {

    if (this.file != undefined) {
      this.spinner.show()
      this.editBlog.id = this.data.id
      this.editBlog.article = this.data.article
      this.editBlog.title = this.data.title
      this.editBlog.attachementId = this.fileNumber
      this.backend.uploadFile(this.file).subscribe(res => {
        this.editBlog.path = res;
        this.backend.UpdateBlog(this.editBlog).subscribe(res => {
          this.spinner.hide()
          this.toastr.success('The blog has been updated')
          this.dialogRef.close(true)
        }, err => {
          this.spinner.hide()
          this.toastr.warning('Blog update failed')
          this.dialogRef.close(false)
        })
      }, err => {
        this.spinner.hide()
      })
    } else {
      this.spinner.show()
      this.editBlog.id = this.data.id
      this.editBlog.article = this.data.article
      this.editBlog.title = this.data.title
      this.backend.UpdateBlog(this.editBlog).subscribe(res => {
        this.spinner.hide()
        this.toastr.success('The blog has been updated')
        this.dialogRef.close(true)
      }, err => {
        this.spinner.hide()
        this.toastr.warning('Blog update failed')
        this.dialogRef.close(false)
      })
    }

  }
}
