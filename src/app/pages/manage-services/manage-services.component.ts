import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ServiceDetailsDTO } from 'src/app/DTOs/Services/serviceDetailsDTO';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/DTOs/ConformDialog/confirmDialog';
import { ConfirmDialogComponent } from 'src/app/shared-component/confirm-dialog/confirm-dialog.component';
import { UpdateServiceDTO } from 'src/app/DTOs/Services/updateServiceDTO';
import { UpdateServiceComponent } from '../update-service/update-service.component';
import { CreateServiceComponent } from '../create-service/create-service.component';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ManageServicesComponent {

  serviceDetailsArray: ServiceDetailsDTO[] = [];

  displayedColumns: string[] = ['id', 'name', 'description', 'imagePath', 'price', 'quantity', 'isHaveDiscount', 'disacountAmount'
    ,'discountType', 'categoryID', 'isDeleted', 'action'];

  dataSource: MatTableDataSource<ServiceDetailsDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private api: MainServicesService, public load:NgxSpinnerService,
    public toastr: ToastrService){
    this.dataSource = new MatTableDataSource()
    this.sort = new MatSort()
  }

  ngOnInit(){
    this.load.show()
    this.api.GetAllServices().subscribe(res =>{
      this.load.hide()
      this.serviceDetailsArray = res
      this.dataSource.data = this.serviceDetailsArray
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

  CreateService(){
    const dialogres1 = this.dialog.open(CreateServiceComponent, {
      width: '850px',
      height: '80vh'

    });

    dialogres1.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {

      }
    });
  }

  EditService(item : ServiceDetailsDTO){
    const dialogres2 =  this.dialog.open(UpdateServiceComponent, {
      width: '850px',
      height: '80vh',
      data: item
    });

    dialogres2.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {

      }
    });
  }
  DeleteService(serviceId : number){
    let info = new ConfirmDialog('Are You Sure','Are You Want To Delete this Service')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });

    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.load.show()
        this.api.DeleteService(serviceId).subscribe(res => {
          this.load.hide()
          this.ngOnInit()
          this.toastr.success('The service has been deleted')
        }, err => {
          this.load.hide()
          this.toastr.warning('Delete failed')
        })
      } else {

      }
    });
  }
}
