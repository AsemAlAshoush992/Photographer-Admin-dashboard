import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UserDetailsDTO } from 'src/app/DTOs/Profile/userDetailsDTO';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/DTOs/ConformDialog/confirmDialog';
import { ConfirmDialogComponent } from 'src/app/shared-component/confirm-dialog/confirm-dialog.component';
import { UpdateAdminDTO } from 'src/app/DTOs/Profile/updateAdminDTO';
import { CreateAdminComponent } from '../create-admin/create-admin.component';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ManageUsersComponent {

  userDetailsArray: UserDetailsDTO[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'birthDate',
    'imagePath', 'phone', 'userType', 'isDeleted', 'action'];
  dataSource: MatTableDataSource<UserDetailsDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private api: MainServicesService, public load: NgxSpinnerService,
    public toastr: ToastrService) {
    this.dataSource = new MatTableDataSource()
    this.sort = new MatSort()
  }

  ngOnInit() {
    this.load.show()
    this.api.GetAllUsers().subscribe(res => {
      this.load.hide()
      this.userDetailsArray = res
      this.dataSource.data = this.userDetailsArray
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

  CreateAdmin() {
    const dialogres1 = this.dialog.open(CreateAdminComponent, {
      width: '80vw',
      height: '80vh'
    });

    dialogres1.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {

      }
    });

  }

  DeleteClient(clientId: number) {
    let info = new ConfirmDialog('Are You Sure', 'Are You Want To Delete this User')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });
    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.load.show()
        this.api.DeleteUser(clientId).subscribe(res => {
          this.load.hide()
          this.ngOnInit()
          this.toastr.success('The Client has been deleted')
        }, err => {
          this.load.hide()
          this.toastr.warning('Delete failed')
        })
      } else {

      }
    });
  }
  EditClient(item: UpdateAdminDTO) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '750px',
      data: item
    });
  }
}
