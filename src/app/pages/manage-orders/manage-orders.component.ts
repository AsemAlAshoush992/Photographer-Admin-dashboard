import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { OrderDetailsDTO } from 'src/app/DTOs/Orders/orderDetailsDTO';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/DTOs/ConformDialog/confirmDialog';
import { ConfirmDialogComponent } from 'src/app/shared-component/confirm-dialog/confirm-dialog.component';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ChangeStatusComponent } from '../change-status/change-status.component';
import { ChangeStatusDTO } from 'src/app/DTOs/Orders/changeStatusDTO';
import { SendFilesComponent } from '../send-files/send-files.component';
@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ManageOrdersComponent {

  orderDetailsArray: OrderDetailsDTO[] = [];
  displayedColumns: string[] = ['id', 'orderDate', 'title', 'note', 'status', 'paymentMethod', 'userID', 'serviceID', 'isDeleted', 'action'];
  dataSource: MatTableDataSource<OrderDetailsDTO>;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private api: MainServicesService, public load:NgxSpinnerService,
    public toastr: ToastrService){
    this.dataSource = new MatTableDataSource()
    this.sort = new MatSort()
  }

  ngOnInit() {
    this.load.show()
    this.api.GetAllOrders().subscribe(res =>{
      this.load.hide()
      this.orderDetailsArray = res
      this.dataSource.data = this.orderDetailsArray
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
  ChangeStatusOrder(item : OrderDetailsDTO){
    const dialogres = this.dialog.open(ChangeStatusComponent, {
      width: '550px',
      data: item
    });

    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {

      }

    });
  }

  DeleteOrder(orderId: number){
    let info = new ConfirmDialog('Are You Sure','Are You Want To Delete this Order')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });

    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.load.show()
        this.api.DeleteOrder(orderId).subscribe(res => {
          this.load.hide()
          this.ngOnInit()
          this.toastr.success('The Order has been deleted')
        }, err => {
          this.load.hide()
          this.toastr.warning('Delete failed')
        })
      } else {

      }

    });
  }


  SendFile(){
    const dialogres1 = this.dialog.open(SendFilesComponent, {
      width: '750px'
    });

    dialogres1.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {

      }

    });
  }
}
