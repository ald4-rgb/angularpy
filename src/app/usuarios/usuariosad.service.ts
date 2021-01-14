import { Injectable } from '@angular/core';
import {Usuario} from './usuario'
import  { Observable,throwError } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import{map,catchError,tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({providedIn: 'root'})

export class UsuariosadService {
  private urlEndPoint:string = 'http://localhost:8080/api/registroad';

  constructor(public http: HttpClient, public router:Router) { }

  create(usuarioad: Usuario):Observable<Usuario>{

    return  this.http.post(this.urlEndPoint, usuarioad).
    pipe( 
      map((response:any) => response.usuarioad as Usuario ),
      catchError(e => {

        if(e.status == 400){
        
          return throwError(e);
        }
        
        if(e.error.mensaje){
        
          console.error(e.error.mensaje);
         
        }
          return throwError(e);
      
        })
      );

  }

}
