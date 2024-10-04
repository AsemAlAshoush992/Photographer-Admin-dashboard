import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './base-component/app.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageBlogsComponent } from './pages/manage-blogs/manage-blogs.component';
import { ManageContactRequestComponent } from './pages/manage-contact-request/manage-contact-request.component';
import { ManageCategoriesComponent } from './pages/manage-categories/manage-categories.component';
import { ManageOrdersComponent } from './pages/manage-orders/manage-orders.component';
import { ManageTechnicalSupportComponent } from './pages/manage-technical-support/manage-technical-support.component';
import { ManagePrivateGalleriesComponent } from './pages/manage-private-galleries/manage-private-galleries.component';
import { ManagePublicGalleriesComponent } from './pages/manage-public-galleries/manage-public-galleries.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ManageServicesComponent } from './pages/manage-services/manage-services.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ErrorComponent } from './pages/error/error.component';
import { CreateBlogComponent } from './pages/create-blog/create-blog.component';
import { UpdateBlogComponent } from './pages/update-blog/update-blog.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { CreatePublicGalleryComponent } from './pages/create-public-gallery/create-public-gallery.component';
import { UpdatePublicGalleryComponent } from './pages/update-public-gallery/update-public-gallery.component';
import { CreateAdminComponent } from './pages/create-admin/create-admin.component';
import { UpdateAdminComponent } from './pages/update-admin/update-admin.component';
import { CreateServiceComponent } from './pages/create-service/create-service.component';
import { UpdateServiceComponent } from './pages/update-service/update-service.component';
import { CreatePrivateGalleryComponent } from './pages/create-private-gallery/create-private-gallery.component';
import { UpdatePrivateGalleryComponent } from './pages/update-private-gallery/update-private-gallery.component';
import { SendFilesComponent } from './pages/send-files/send-files.component';
import { NavComponent } from './shared-component/nav/nav.component';
import { FooterComponent } from './shared-component/footer/footer.component';
import { ConfirmDialogComponent } from './shared-component/confirm-dialog/confirm-dialog.component';
import { SideBarComponent } from './shared-component/side-bar/side-bar.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { ChangeStatusComponent } from './pages/change-status/change-status.component';
import { MyBlogsComponent } from './pages/my-blogs/my-blogs.component';
import { ManageCommentsComponent } from './pages/manage-comments/manage-comments.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManageBlogsComponent,
    ManageContactRequestComponent,
    ManageCategoriesComponent,
    ManageOrdersComponent,
    ManageTechnicalSupportComponent,
    ManagePrivateGalleriesComponent,
    ManagePublicGalleriesComponent,
    ManageUsersComponent,
    ManageServicesComponent,
    ResetPasswordComponent,
    ProfileComponent,
    ErrorComponent,
    CreateBlogComponent,
    UpdateBlogComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    CreatePublicGalleryComponent,
    UpdatePublicGalleryComponent,
    CreateAdminComponent,
    UpdateAdminComponent,
    CreateServiceComponent,
    UpdateServiceComponent,
    CreatePrivateGalleryComponent,
    UpdatePrivateGalleryComponent,
    SendFilesComponent,
    NavComponent,
    FooterComponent,
    ConfirmDialogComponent,
    SideBarComponent,
    ChangeStatusComponent,
    MyBlogsComponent,
    ManageCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
