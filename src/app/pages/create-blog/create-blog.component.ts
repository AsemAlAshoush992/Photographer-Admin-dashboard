import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { CreateBlogDTO } from 'src/app/DTOs/Blogs/createBlogDTO';


@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {
  constructor(public dialogRef: MatDialogRef<CreateBlogComponent>,
    public spinner: NgxSpinnerService, public toastr: ToastrService, public backend: MainServicesService,) { }

  fileExists: boolean = false;
  fileTouched: boolean = false;

  files: File[] = [];
  createBlogobj: CreateBlogDTO = new CreateBlogDTO()


  onFileSelected(event: any) {
    this.fileTouched = true;
    if (event.target.files && event.target.files.length > 0) {
      this.files = Array.from(event.target.files); // حفظ الملفات المختارة في المصفوفة
      this.fileExists = true;
    } else {
      this.fileExists = false;
    }
  }



  createnewBlog() {
    if (this.files.length > 0) {
      this.spinner.show()
      this.backend.uploadFiles(this.files).subscribe(res1 => {
        this.createBlogobj.filePath = res1
        this.backend.CreateBlog(this.createBlogobj).subscribe(res => {
          this.spinner.hide()
          this.dialogRef.close(true)
          this.toastr.success('The blog has been created')
        }, err => {
          this.spinner.hide()
          this.dialogRef.close(false)
          this.toastr.warning('Blog create failed')
        })

      }, err => {
        this.spinner.hide()
        this.dialogRef.close(false)
      })
    }else {
      this.spinner.hide()
      this.toastr.warning('The image not found')
    }
  }
}
