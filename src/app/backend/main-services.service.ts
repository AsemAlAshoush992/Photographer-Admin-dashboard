import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../DTOs/loginDTO';
import { UserInfoDTO } from '../DTOs/Profile/userInfoDTO';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../DTOs/Profile/registerDTO';
import { PrivateGalleryDetailsForClientDTO } from '../DTOs/Gallery/privateGalleryDetailsForClientDTO';
import { CreateBlogDTO } from '../DTOs/Blogs/createBlogDTO';
import { UpdateBlogDTO } from '../DTOs/Blogs/updateBlogDTO';
import { CreatePublicGalleryDTO } from '../DTOs/Gallery/createPublicGalleryDTO';
import { UpdateGalleryDTO } from '../DTOs/Gallery/updateGalleryDTO';
import { CreateServiceDTO } from '../DTOs/Services/createServiceDTO';
import { UpdateServiceDTO } from '../DTOs/Services/updateServiceDTO';
import { CreateCategoryDTO } from '../DTOs/Categories/createCategoryDTO';
import { UpdateCategoryDTO } from '../DTOs/Categories/updateCategoryDTO';
import { SendFileForClientDTO } from '../DTOs/Gallery/sendFileForClientDTO';
import { CreatePrivateGalleryDTO } from '../DTOs/Gallery/createPrivateGalleryDTO';
import { BlogsDetailsDTO } from '../DTOs/Blogs/blogsDetailsDTO';
import { ContactRequestDetailsDTO } from '../DTOs/contacts/contactRequestDetailsDTO';
import { PrivateGalleryDetailsDTO } from '../DTOs/Gallery/privateGalleryDetailsDTO';
import { ServiceDetailsDTO } from '../DTOs/Services/serviceDetailsDTO';
import { CategoryDetailsDTO } from '../DTOs/Categories/categoryDetailsDTO';
import { OrderDetailsDTO } from '../DTOs/Orders/orderDetailsDTO';
import { UserDetailsDTO } from '../DTOs/Profile/userDetailsDTO';
import { ProblemDetailsDTO } from '../DTOs/Technical support/problemDetailsDTO';
import { BlogDetailsForUserDTO } from '../DTOs/Blogs/blogDetailsForUserDTO';
import { UpdateAdminDTO } from '../DTOs/Profile/updateAdminDTO';
import { ChangeStatusDTO } from '../DTOs/Orders/changeStatusDTO';
import { UpdateUserDTO } from '../DTOs/Profile/updateUserDTO';
import { UpdatePrivateGalleryDTO } from '../DTOs/Gallery/updatePrivateGalleryDTO';
import { Router } from '@angular/router';
import { CommentsDetailsDTO } from '../DTOs/comments/commentsDetailsDTO';
@Injectable({
  providedIn: 'root'
})
export class MainServicesService {
  private baseURL: string = 'https://localhost:44358';
  constructor(public http: HttpClient, public router: Router) { }

  login(input: LoginDTO) {
    return this.http.put(`${this.baseURL}/api/Guest/LoginAdminAccount`, input, {
      responseType: 'text'
    })
  }


  logout() {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.put(`${this.baseURL}/api/Guest/LogoutUserAcount`, {}, { headers, responseType: 'text' });
  }


  getUserInformation(): Observable<UserInfoDTO> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.get<UserInfoDTO>(`${this.baseURL}/api/Client/GetPersonalInformationByUserID`, { headers });
  }

  UpdatePersonalInformation(input: UpdateUserDTO): Observable<any> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.put(`${this.baseURL}/api/Client/UpdatePersonalInformationForUserAcount`, input,
      { headers, responseType: 'text' }
    )
  }



  DeletePersonalInformation(userId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/DeleteUserAccount/{ID}`, null)
  }

  register(input: RegisterDTO) {
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewAdmin`, input, {
      responseType: 'text'
    })
  }


  getAllPrivateGallerywithoutOredrsByUser(): Observable<PrivateGalleryDetailsForClientDTO[]> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.get<PrivateGalleryDetailsForClientDTO[]>(`${this.baseURL}/api/Client/GetAllPrivateGalleriesByUserIdWithoutOrders`, { headers });
  }

  CreatePrivateGallery(input: CreatePrivateGalleryDTO): Observable<any> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.post(`${this.baseURL}/api/Client/UploadPrivateGalleryFiles`, input,
      { headers, responseType: 'text' })
  }
  UpdatePrivateGallery(input: UpdatePrivateGalleryDTO): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Client/UpdatePrivateGalleryFile`, input,
      { responseType: 'text' })
  }

  DeletePrivateGallery(galleryId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Client/DeletePrivateGalleryFile/${galleryId}`, null, {
      responseType: 'text'
    })
  }

  SendFilesForClient(input: SendFileForClientDTO): Observable<any> {
    return this.http.post(`${this.baseURL}/api/Admin/SendPrivateGalleryFiles`, input, {
      responseType: 'text'})
  }


  GetAllBlogsForAdmin(): Observable<BlogDetailsForUserDTO[]> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.get<BlogDetailsForUserDTO[]>(`${this.baseURL}/api/Client/GetAllBlogsByUserID`,{headers})
  }

  GetAllBlogs(): Observable<BlogDetailsForUserDTO[]> {
    return this.http.get<BlogDetailsForUserDTO[]>(`${this.baseURL}/api/Admin/GetAllBlogsForAdmin`)
  }

  CreateBlog(input: CreateBlogDTO): Observable<any> {
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewBlog`, input,
      { responseType: 'text' })
  }
  UpdateBlog(input: UpdateBlogDTO): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Client/UpdateBlogForSpecificUser`, input, {
      responseType: 'text'
    })
  }
  DeleteBlog(blogId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/DeleteSpecificBlog/${blogId}`, null, {
      responseType: 'text'
    })
  }
  ConfirmBlog(blogId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/ConfirmUserBlogAndPublish/${blogId}`, null, {
      responseType: 'text'
    })
  }
  CancelBlog(blogId: number): Observable<any>{
    return this.http.put(`${this.baseURL}/api/Admin/CancelUserBlog/${blogId}`, null, {
      responseType: 'text'
    })
  }


  GetAllContactRequests(): Observable<ContactRequestDetailsDTO[]> {
    return this.http.get<ContactRequestDetailsDTO[]>(`${this.baseURL}/api/Admin/GetAllContactRequestsForAdmin`)
  }
  DeleteContactRequest(contactId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/DeleteSpecificContactRequest/${contactId}`, null, {
      responseType: 'text'})
  }


  GetAllPublicGalleries(): Observable<PrivateGalleryDetailsDTO[]> {
    return this.http.get<PrivateGalleryDetailsDTO[]>(`${this.baseURL}/api/Admin/GetAllPublicGalleries`)
  }

  CreatePublicGallery(input: CreatePublicGalleryDTO): Observable<any> {
    return this.http.post(`${this.baseURL}/api/Admin/UploadPublicGalleryFiles`, input,
      { responseType: 'text' })
  }
  UpdatePublicGallery(input: UpdateGalleryDTO): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/UpdateGalleryData`, input, {
      responseType: 'text'})
  }
  DeletePublicGallery(galleryId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/DeleteSpecificGallery/${galleryId}`, null, {
      responseType: 'text'
    })
  }


  GetAllServices(): Observable<ServiceDetailsDTO[]> {
    return this.http.get<ServiceDetailsDTO[]>(`${this.baseURL}/api/Admin/GetAllServicesDetailsForAdmin`)
  }

  CreateService(input: CreateServiceDTO): Observable<any> {
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewService`, input, {
      responseType: 'text'})
  }

  UpdateService(input: UpdateServiceDTO): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/UpdateServiceData`, input, {
      responseType: 'text'})
  }

  DeleteService(serviceId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/DeleteSpecificService/${serviceId}`, null, {
      responseType: 'text'
    })
  }


  GetAllCategories(): Observable<CategoryDetailsDTO[]> {
    return this.http.get<CategoryDetailsDTO[]>(`${this.baseURL}/api/Admin/GetAllCategoriesForAdmin`)
  }
  CreateCategory(input: CreateCategoryDTO): Observable<any> {
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewCategory`, input, {
      responseType: 'text'})
  }
  UpdateCategory(input: UpdateCategoryDTO): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/UpdateCategoryData`, input, {
      responseType: 'text'})
  }
  DeleteCategory(categoryId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/DeleteSpecificCategory/${categoryId}`, null, {
      responseType: 'text'
    })
  }


  GetAllOrders(): Observable<OrderDetailsDTO[]> {
    return this.http.get<OrderDetailsDTO[]>(`${this.baseURL}/api/Admin/GetAllOrdersDetailsForAdmin`)
  }
  DeleteOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/DeleteSpecificOrder/${orderId}`, null, {
      responseType: 'text'
    })
  }

  ChangeStatusOrder(input: ChangeStatusDTO): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/ChangeOrderStatus`, input, {
      responseType: 'text'
    })
  }

  GetAllUsers(): Observable<UserDetailsDTO[]> {
    return this.http.get<UserDetailsDTO[]>(`${this.baseURL}/api/Admin/GetAllUsersForAdmin`)
  }
  DeleteUserAccount(clientId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/DeleteUserAccount/${clientId}`, null
      , { responseType: 'text' })
  }

  DeleteUser(clientId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/DeleteUser/${clientId}`, null
      , { responseType: 'text' })
  }

  GetAllTechnicalSupport(): Observable<ProblemDetailsDTO[]> {
    return this.http.get<ProblemDetailsDTO[]>(`${this.baseURL}/api/Admin/GetAllProblemsDetailsForAdmin`)
  }

  DeleteTechnicalSupport(technicalId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/DeleteSpecificProblem/${technicalId}`, null, {
      responseType: 'text'
    })
  }

  GetAllComments(): Observable<CommentsDetailsDTO[]> {
    return this.http.get<CommentsDetailsDTO[]>(`${this.baseURL}/api/Admin/GetAllCommentsDetails`)
  }

  DeleteComment(commentId: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Admin/DeleteSpecificComment/${commentId}`, null, {
      responseType: 'text'
    })
  }

  DownloadFile(input : string | undefined): Observable<any>{
    return this.http.get(`${this.baseURL}/api/Files/GetFiles/${input}`,{
      responseType: 'blob'
    })
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseURL}/api/Files/UploadImageAndGetURL`, formData, { responseType: 'text' });
  }


  uploadFiles(files: File[]): Observable<any[]> {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name); // تأكد من استخدام 'files' بدلاً من 'file'
    });
  
    return this.http.post<any[]>(`${this.baseURL}/api/Files/UploadImagesAndGetURLs`, formData);
  }

  isLoggedIn(): boolean {
    // هذا الجزء يمكن أن يعتمد على فحص توكن JWT أو أي مؤشر آخر لتسجيل الدخول
    return !!localStorage.getItem('token');  // تحقق من وجود توكن للمستخدم
  }

}
