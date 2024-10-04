import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared-component/confirm-dialog/confirm-dialog.component';
import { ConfirmDialog } from 'src/app/DTOs/ConformDialog/confirmDialog';
import { MatTableDataSource } from '@angular/material/table';
import { BlogDetailsForUserDTO } from 'src/app/DTOs/Blogs/blogDetailsForUserDTO';
import { UpdateBlogComponent } from '../update-blog/update-blog.component';
import { CreateBlogComponent } from '../create-blog/create-blog.component';
@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class MyBlogsComponent {

  blogsArray: BlogDetailsForUserDTO[] = [];



  displayedColumns: string[] = ['id', 'title', 'article', 'blogDate', 'authorName', 'status', 'fileNumbers', 'filePaths', 'actions'];
  dataSource: MatTableDataSource<BlogDetailsForUserDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, public backend: MainServicesService, public spinner: NgxSpinnerService,
    public toastr: ToastrService, public router: Router) {
    this.dataSource = new MatTableDataSource
    this.sort = new MatSort
  }

  ngOnInit() {
    this.spinner.show()
    this.backend.GetAllBlogsForAdmin().subscribe(res => {
      this.spinner.hide()
      this.blogsArray = res
      this.dataSource.data = this.blogsArray
    }, err => {
      this.spinner.hide()
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  UpdateBlog(item: BlogDetailsForUserDTO) {
    const dialogres2 = this.dialog.open(UpdateBlogComponent, {
      width: '850px',
      height: '95vh',
      data: item
    });

    dialogres2.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {

      }
    });
  }


  DeleteBlog(blogId: number) {
    let info = new ConfirmDialog('Are you sure ?', 'Are you want to delete this Blog ?')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info

    });

    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show()
        this.backend.DeleteBlog(blogId).subscribe(res => {
          this.spinner.hide()
          this.toastr.success('The blog has been deleted')
          this.ngOnInit()
        }, err => {
          this.spinner.hide()
          this.toastr.warning('Faild to delete the blog')
        })
      } else {

      }
    });
  }



  CreateBlog() {
    const dialogres1 = this.dialog.open(CreateBlogComponent, {
      width: '850px',
      height: '95vh'
    });

    dialogres1.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {

      }
    });
  }


}
