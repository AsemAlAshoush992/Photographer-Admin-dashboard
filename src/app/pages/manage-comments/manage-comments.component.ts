import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/DTOs/ConformDialog/confirmDialog';
import { ConfirmDialogComponent } from 'src/app/shared-component/confirm-dialog/confirm-dialog.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommentsDetailsDTO } from 'src/app/DTOs/comments/commentsDetailsDTO';
@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ManageCommentsComponent {

  commentDetailsArray: CommentsDetailsDTO[] = [];
  displayedColumns: string[] = ['id', 'authorName', 'content', 'commentDate', 'isDeleted', 'action'];
  dataSource: MatTableDataSource<CommentsDetailsDTO>;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private api: MainServicesService, public load: NgxSpinnerService,
    public toastr: ToastrService) {
    this.dataSource = new MatTableDataSource()
    this.sort = new MatSort()
  }
  ngOnInit() {
    this.load.show()
    this.api.GetAllComments().subscribe(res => {
      this.load.hide()
      this.commentDetailsArray = res
      this.dataSource.data = this.commentDetailsArray
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

  EditCategory(item: CommentsDetailsDTO) {
    const dialogres2 = this.dialog.open(UpdateCategoryComponent, {
      width: '850px',
      data: item
    });

    dialogres2.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {

      }
    });
  }

  DeleteComment(commentId: number) {
    let info = new ConfirmDialog('Are You Sure', 'Are You Want To Delete this comment')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });

    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.load.show()
        this.api.DeleteComment(commentId).subscribe(res => {
          this.load.hide()
          this.ngOnInit()
          this.toastr.success('The comment has been deleted')
        }, err => {
          this.load.hide()
          this.toastr.warning('Delete failed')
        })
      } else {

      }
    });
  }
}
