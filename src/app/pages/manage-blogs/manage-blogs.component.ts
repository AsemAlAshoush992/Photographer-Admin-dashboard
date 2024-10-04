import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BlogsDetailsDTO } from 'src/app/DTOs/Blogs/blogsDetailsDTO';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared-component/confirm-dialog/confirm-dialog.component';
import { ConfirmDialog } from 'src/app/DTOs/ConformDialog/confirmDialog';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BlogDetailsForUserDTO } from 'src/app/DTOs/Blogs/blogDetailsForUserDTO';
@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ManageBlogsComponent {

  blogDetailsArray: BlogDetailsForUserDTO[] = [];
  displayedColumns: string[] = ['id', 'title', 'article', 'blogDate', 'status', 'authorName', 'BlogAttachments', 'action'];
  displayedColumns2: string[] = ['id', 'title', 'article', 'blogDate', 'authorName', 'images', 'action'];

  dataSource: MatTableDataSource<BlogDetailsForUserDTO>;
  dataSource2: MatTableDataSource<BlogDetailsForUserDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private api: MainServicesService, public load: NgxSpinnerService,
    public toastr: ToastrService) {
    this.dataSource = new MatTableDataSource()
    this.dataSource2 = new MatTableDataSource()
    this.sort = new MatSort()
  }

  ngOnInit() {
    this.load.show()
    this.api.GetAllBlogs().subscribe(res => {
      this.load.hide()
      this.blogDetailsArray = res
      this.dataSource.data = this.blogDetailsArray
    }, err => {
      this.load.hide()
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

  AproveBlog(blogId: number) {
    let info = new ConfirmDialog('Are You Sure', 'Are You Want To Approve this Blog')
    const dialogres1 = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });

    dialogres1.afterClosed().subscribe(result => {
      if (result) {
        this.load.show()
        this.api.ConfirmBlog(blogId).subscribe(res => {
          this.load.hide()
          this.ngOnInit()
          this.toastr.success('The blog has been approved')
        }, err => {
          this.load.hide()
          this.toastr.warning('Approve failed')
        })
      } else {

      }
    });
  }

  CancelBlog(blogId: number){
    let info = new ConfirmDialog('Are You Sure', 'Are You Want To Cancel this Blog')
    const dialogres1 = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });

    dialogres1.afterClosed().subscribe(result => {
      if (result) {
        this.load.show()
        this.api.CancelBlog(blogId).subscribe(res => {
          this.load.hide()
          this.ngOnInit()
          this.toastr.success('The blog has been canceled')
        }, err => {
          this.load.hide()
          this.toastr.warning('Cancel failed')
        })
      } else {

      }
    });
  }


  DeleteBlog(blogId: number) {
    let info = new ConfirmDialog('Are You Sure', 'Are You Want To Delete this Blog')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });

    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.load.show()
        this.api.DeleteBlog(blogId).subscribe(res => {
          this.load.hide()
          this.ngOnInit()
          this.toastr.success('The blog has been deleted')
        }, err => {
          this.load.hide()
          this.toastr.warning('Delete failed')
        })
      } else {

      }
    });
  }
}
