import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { PrivateGalleryDetailsDTO } from 'src/app/DTOs/Gallery/privateGalleryDetailsDTO';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/DTOs/ConformDialog/confirmDialog';
import { ConfirmDialogComponent } from 'src/app/shared-component/confirm-dialog/confirm-dialog.component';
import { UpdateGalleryDTO } from 'src/app/DTOs/Gallery/updateGalleryDTO';
import { UpdatePublicGalleryComponent } from '../update-public-gallery/update-public-gallery.component';
import { CreatePublicGalleryComponent } from '../create-public-gallery/create-public-gallery.component';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-public-galleries',
  templateUrl: './manage-public-galleries.component.html',
  styleUrls: ['./manage-public-galleries.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ManagePublicGalleriesComponent {

  privateGalleryDetailsArray: PrivateGalleryDetailsDTO[] = [];
  displayedColumns: string[] = ['id', 'path', 'fileName', 'fileType', 'isPrivate', 'orderID', 'isDeleted', 'action'];
  dataSource: MatTableDataSource<PrivateGalleryDetailsDTO>;
  dataSource2: MatTableDataSource<PrivateGalleryDetailsDTO>;
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
    this.api.GetAllPublicGalleries().subscribe(res => {
      this.load.hide()
      this.privateGalleryDetailsArray = res
      this.dataSource.data = this.privateGalleryDetailsArray.filter(m => m.fileType == 'Image');
      this.dataSource2.data = this.privateGalleryDetailsArray.filter(m => m.fileType == 'Video');
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

  CreatePublicGallery() {
    const dialogres1 = this.dialog.open(CreatePublicGalleryComponent, {
      width: '750px',
    });

    dialogres1.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {

      }
    });
  }

  EditPublicGallery(item: PrivateGalleryDetailsDTO) {
    const dialogres1 = this.dialog.open(UpdatePublicGalleryComponent, {
      width: '750px',
      data: item
    });

    dialogres1.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {

      }
    });
  }
  DeletePublicGallery(publicId: number) {
    let info = new ConfirmDialog('Are You Sure', 'Are You Want To Delete this File')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });
    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.load.show()
        this.api.DeletePublicGallery(publicId).subscribe(res => {
          this.load.hide()
          this.ngOnInit()
          this.toastr.success('The public gallery has been deleted')
        }, err => {
          this.load.hide()
          this.toastr.warning('Delete failed')
        })
      } else {

      }

    });
  }
}
