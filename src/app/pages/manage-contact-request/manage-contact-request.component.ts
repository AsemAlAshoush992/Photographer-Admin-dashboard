import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ContactRequestDetailsDTO } from 'src/app/DTOs/contacts/contactRequestDetailsDTO';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/DTOs/ConformDialog/confirmDialog';
import { ConfirmDialogComponent } from 'src/app/shared-component/confirm-dialog/confirm-dialog.component';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-contact-request',
  templateUrl: './manage-contact-request.component.html',
  styleUrls: ['./manage-contact-request.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ManageContactRequestComponent {

  contactRequestDetailsArray: ContactRequestDetailsDTO[] = [];
  displayedColumns: string[] = ['id', 'clientName', 'email', 'phone', 'description', 'purpose', 'budget', 'userID', 'isDeleted', 'action'];
  dataSource: MatTableDataSource<ContactRequestDetailsDTO>;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private api: MainServicesService, public load:NgxSpinnerService,
    public toastr: ToastrService){
    this.dataSource = new MatTableDataSource()
    this.sort = new MatSort()
  }

  ngOnInit(){
    this.load.show()
    this.api.GetAllContactRequests().subscribe(res =>{
      this.load.hide()
      this.contactRequestDetailsArray = res
      this.dataSource.data = this.contactRequestDetailsArray
    }, err =>{
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
  EditRequest(){

  }
  DeleteRequest(requestId: number){
    let info = new ConfirmDialog('Are You Sure','Are You Want To Delete this Request')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });

    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.load.show()
        this.api.DeleteContactRequest(requestId).subscribe(res => {
          this.load.hide()
          this.ngOnInit()
          this.toastr.success('The contact Request has been deleted')
        }, err => {
          this.load.hide()
          this.toastr.warning('Delete failed')
        })
      } else {

      }

    });
  }
}
