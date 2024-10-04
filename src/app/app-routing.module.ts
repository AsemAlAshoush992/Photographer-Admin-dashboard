import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateAdminComponent } from './pages/create-admin/create-admin.component';
import { UpdateAdminComponent } from './pages/update-admin/update-admin.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { CreateBlogComponent } from './pages/create-blog/create-blog.component';
import { UpdateBlogComponent } from './pages/update-blog/update-blog.component';
import { ManageBlogsComponent } from './pages/manage-blogs/manage-blogs.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { ManageCategoriesComponent } from './pages/manage-categories/manage-categories.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { CreatePrivateGalleryComponent } from './pages/create-private-gallery/create-private-gallery.component';
import { UpdatePrivateGalleryComponent } from './pages/update-private-gallery/update-private-gallery.component';
import { ManagePrivateGalleriesComponent } from './pages/manage-private-galleries/manage-private-galleries.component';
import { CreatePublicGalleryComponent } from './pages/create-public-gallery/create-public-gallery.component';
import { UpdatePublicGalleryComponent } from './pages/update-public-gallery/update-public-gallery.component';
import { ManagePublicGalleriesComponent } from './pages/manage-public-galleries/manage-public-galleries.component';
import { CreateServiceComponent } from './pages/create-service/create-service.component';
import { UpdateServiceComponent } from './pages/update-service/update-service.component';
import { ManageServicesComponent } from './pages/manage-services/manage-services.component';
import { ManageTechnicalSupportComponent } from './pages/manage-technical-support/manage-technical-support.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ErrorComponent } from './pages/error/error.component';
import { ManageOrdersComponent } from './pages/manage-orders/manage-orders.component';
import { ManageContactRequestComponent } from './pages/manage-contact-request/manage-contact-request.component';
import { MyBlogsComponent } from './pages/my-blogs/my-blogs.component';
import { MainGuardGuard } from './guards/main-guard.guard';
import { ManageCommentsComponent } from './pages/manage-comments/manage-comments.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'create-admin',
    component: CreateAdminComponent
  },
  {
    path: 'update-admin',
    component: UpdateAdminComponent
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent, canActivate: [MainGuardGuard]
  },
  {
    path: 'create-blog',
    component: CreateBlogComponent
  },
  {
    path: 'update-blog',
    component: UpdateBlogComponent
  },
  {
    path: 'manage-blog',
    component: ManageBlogsComponent, canActivate: [MainGuardGuard]
  },
  {
    path: 'manage-my-blog',
    component: MyBlogsComponent, canActivate: [MainGuardGuard]
  },
  {
    path: 'create-category',
    component: CreateCategoryComponent
  },
  {
    path: 'manage-category',
    component: ManageCategoriesComponent, canActivate: [MainGuardGuard]
  },
  {
    path: 'update-category',
    component: UpdateCategoryComponent
  },
  {
    path: 'create-private-gallery',
    component: CreatePrivateGalleryComponent
  },
  {
    path: 'update-private-gallery',
    component: UpdatePrivateGalleryComponent
  },
  {
    path: 'manage-private-gallery',
    component: ManagePrivateGalleriesComponent, canActivate: [MainGuardGuard]
  },
  {
    path: 'create-Public-gallery',
    component: CreatePublicGalleryComponent
  },
  {
    path: 'update-Public-gallery',
    component: UpdatePublicGalleryComponent
  },
  {
    path: 'manage-Public-gallery',
    component: ManagePublicGalleriesComponent, canActivate: [MainGuardGuard]
  },
  {
    path: 'create-service',
    component: CreateServiceComponent
  },
  {
    path: 'update-service',
    component: UpdateServiceComponent
  },
  {
    path: 'manage-services',
    component: ManageServicesComponent, canActivate: [MainGuardGuard]
  },
  {
    path: 'manage-technical-support',
    component: ManageTechnicalSupportComponent, canActivate: [MainGuardGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent, canActivate: [MainGuardGuard]
  },
  {
    path: 'manage-orders',
    component: ManageOrdersComponent, canActivate: [MainGuardGuard]
  },
  {
    path: 'manage-contact-request',
    component: ManageContactRequestComponent, canActivate: [MainGuardGuard]
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent
  },
  {
    path: 'manage-comments',
    component: ManageCommentsComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
