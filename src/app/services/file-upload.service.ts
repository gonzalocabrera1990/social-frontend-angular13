import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { }

    uploadProfileImage(file:any){
      const auth_token = localStorage.getItem('JWT');
      const id_token = localStorage.getItem('CREDS');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
      // Create form data
      const formData = new FormData(); 
      // Store form name as "file" with file data
      formData.append('image', file, file.name);
            
      // Make http post request over api
      // with formData as req
      return this.http.post<any>(baseURL + `imagen/profile-image-post/change/${id_token}`, formData, {
        headers: headers
      })
      .pipe(map(res => {
        return res
      }),
      catchError(error => this.processHTTPMsgService.handleError(error)));
      
    }
    uploadImageWall(file:any){
      const auth_token = localStorage.getItem('JWT');
      const id_token = localStorage.getItem('ID');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
      // Create form data
      const formData = new FormData(); 
      // Store form name as "file" with file data
      formData.append('image', file, file.name);
            
      // Make http post request over api
      // with formData as req
      return this.http.post<any>(baseURL + `imagen/imageswall/${id_token}`, formData, {
        headers: headers
      })
      .pipe(map(res => {
        return res
      }),
      catchError(error => this.processHTTPMsgService.handleError(error)));
      
    }
    uploadStory(file:any, duration:any){
      const auth_token = localStorage.getItem('JWT');
      const id_token = localStorage.getItem('ID');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
      // Create form data
      const formData = new FormData(); 
      // Store form name as "file" with file data
      formData.append('image', file, file.name);
      formData.append('duration', duration);
      // Make http post request over api
      // with formData as req
      return this.http.post<any>(baseURL + `imagen/story-post/${id_token}`, formData, {
        headers: headers
      })
      .pipe(map(res => {
        return res
      }),
      catchError(error => this.processHTTPMsgService.handleError(error)));
      
    }

    storiesView(userID:string, image:string){
      const auth_token = localStorage.getItem('JWT');
      const id_token = localStorage.getItem('ID');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
      return this.http.post<any>(baseURL + `imagen/story-view/${userID}/${image}`,{
        headers: headers
      })
      .pipe(map(res => {
        return res
      }),
      catchError(error => this.processHTTPMsgService.handleError(error)));
      
    };

    removePhotograph (imgId:any) {
      const auth_token = localStorage.getItem('JWT');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
      return this.http.post<any>(baseURL + `imagen/removeimage`, imgId,{
        headers: headers
      })
      .pipe(map(res => {
        return res
      }),
      catchError(error => this.processHTTPMsgService.handleError(error)));
    }
    
    removeVideo (imgId:any) {
      const auth_token = localStorage.getItem('JWT');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      })
      return this.http.post<any>(baseURL + `imagen/removevideo`, imgId,{
        headers: headers
      })
      .pipe(map(res => {
        return res
      }),
      catchError(error => this.processHTTPMsgService.handleError(error)));
    }
}
