import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { PrivateGalleryDetailsDTO } from 'src/app/DTOs/Gallery/privateGalleryDetailsDTO';
import { PrivateGalleryDetailsForClientDTO } from 'src/app/DTOs/Gallery/privateGalleryDetailsForClientDTO';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/DTOs/ConformDialog/confirmDialog';
import { ConfirmDialogComponent } from 'src/app/shared-component/confirm-dialog/confirm-dialog.component';
import { UpdateGalleryDTO } from 'src/app/DTOs/Gallery/updateGalleryDTO';
import { UpdatePrivateGalleryComponent } from '../update-private-gallery/update-private-gallery.component';
import { CreatePrivateGalleryComponent } from '../create-private-gallery/create-private-gallery.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-private-galleries',
  templateUrl: './manage-private-galleries.component.html',
  styleUrls: ['./manage-private-galleries.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ManagePrivateGalleriesComponent {

  privateGallery: PrivateGalleryDetailsForClientDTO[] = []
  privateGalleryImages : PrivateGalleryDetailsForClientDTO [] = []
  privateGalleryVideos : PrivateGalleryDetailsForClientDTO [] = []

  displayedColumns: string[] = ['id', 'path', 'fileName', 'fileType', 'action'];
  file: string = ''
  dataSource: MatTableDataSource<PrivateGalleryDetailsForClientDTO>;
  constructor(public api: MainServicesService, public dialog: MatDialog, public load: NgxSpinnerService,
    public toastr: ToastrService) {
    this.dataSource = new MatTableDataSource()
    this.sort = new MatSort()
  }


  ngOnInit() {
    this.load.show()
    this.api.getAllPrivateGallerywithoutOredrsByUser().subscribe(res => {
      this.load.hide()
      this.privateGallery = res
      this.privateGalleryImages = res.filter(m => m.fileType == 'Image')
      this.privateGalleryVideos = res.filter(m => m.fileType == 'Video')
      this.dataSource.data = this.privateGallery
    }, err => {
      this.load.hide()
      this.toastr.warning('The photos and videos not found')
    })

  }


  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.sort = new MatSort()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  CreatePrivateGallery() {
    const dialogres2 = this.dialog.open(CreatePrivateGalleryComponent, {
      width: '750px',
    });

    dialogres2.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {
      }
    });

  }



  DownloadImage(item: string | undefined) {
    this.load.show()
    if (typeof item === 'string') {
      const indexOfSlash = item.indexOf('s/');
      this.file = item.substring(indexOfSlash + 2);
    }
    this.api.DownloadFile(this.file).subscribe(res => {
      this.load.hide()
      this.toastr.success('The image Has Been Downloaded')
      const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image.jpg';  // قم بتغيير الاسم والامتداد حسب الملف الخاص بك
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }, err => {
      this.load.hide()
      this.toastr.warning('download Has Been Failed')
    })
  }


  DownloadVideo(item: string | undefined) {
    this.load.show()
    if (typeof item === 'string') {
      const indexOfSlash = item.indexOf('s/');
      this.file = item.substring(indexOfSlash + 2);
    }
    this.api.DownloadFile(this.file).subscribe(res => {
      this.load.hide()
      this.toastr.success('The image Has Been Downloaded')
      const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Video.mp4';  // قم بتغيير الاسم والامتداد حسب الملف الخاص بك
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }, err => {
      this.load.hide()
      this.toastr.warning('download Has Been Failed')
    })
  }

  EditPrivateGallery(item: UpdateGalleryDTO) {
    const dialogres1 = this.dialog.open(UpdatePrivateGalleryComponent, {
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

  DeletePrivateGallery(privateId: number) {
    let info = new ConfirmDialog('Are You Sure', 'Are You Want To Delete this File')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });

    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.load.show()
        this.api.DeletePrivateGallery(privateId).subscribe(res => {
          this.load.hide()
          this.ngOnInit()
          this.toastr.success('The private gallery has been deleted')
        }, err => {
          this.load.hide()
          this.toastr.warning('Delete failed')
        })
      } else {

      }

    });
  }
}