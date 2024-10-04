import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CategoryDetailsDTO } from 'src/app/DTOs/Categories/categoryDetailsDTO';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/DTOs/ConformDialog/confirmDialog';
import { ConfirmDialogComponent } from 'src/app/shared-component/confirm-dialog/confirm-dialog.component';
import { UpdateCategoryDTO } from 'src/app/DTOs/Categories/updateCategoryDTO';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css',
    '../../../assets/css/sb-admin-2.min.css',
    '../../../assets/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ManageCategoriesComponent {

  categoryDetailsArray: CategoryDetailsDTO[] = [];

  displayedColumns: string[] = ['id', 'title', 'description', 'imagePath', 'isDeleted', 'action'];
  dataSource: MatTableDataSource<CategoryDetailsDTO>;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private api: MainServicesService, public load: NgxSpinnerService,
    public toastr: ToastrService) {
    this.dataSource = new MatTableDataSource()
    this.sort = new MatSort()
  }
  ngOnInit() {
    this.load.show()
    this.api.GetAllCategories().subscribe(res => {
      this.load.hide()
      this.categoryDetailsArray = res
      this.dataSource.data = this.categoryDetailsArray
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
  CreateCategory() {
    const dialogres1 = this.dialog.open(CreateCategoryComponent, {
      width: '850px',
    });

    dialogres1.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit()
      } else {

      }
    });
  }
  EditCategory(item: CategoryDetailsDTO) {
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

  DeleteCategory(categoryId: number) {
    let info = new ConfirmDialog('Are You Sure', 'Are You Want To Delete this Category')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });

    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.load.show()
        this.api.DeleteCategory(categoryId).subscribe(res => {
          this.load.hide()
          this.ngOnInit()
          this.toastr.success('The category has been deleted')
        }, err => {
          this.load.hide()
          this.toastr.warning('Delete failed')
        })
      } else {

      }
    });
  }
}
