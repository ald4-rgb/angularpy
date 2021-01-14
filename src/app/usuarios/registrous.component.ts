import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {Usuario} from './usuario'
import{UsuariosService} from'./usuarios.service'
import {Router,ActivatedRoute} from '@angular/router'
import swal from  'sweetalert2' 
@Component({
  selector: 'app-registrous',
  templateUrl: './registrous.component.html'
})
export class RegistrousComponent implements OnInit {

  constructor(public usuariosService:UsuariosService,
    public router: Router,public activatedRoute:ActivatedRoute) { }

    public usuario: Usuario = new Usuario();

    public titulo:string = "Crear Administradores"
  
    public  errores:string[];

  ngOnInit(): void {
    
  }

  public create(): void{
    console.log(this.usuario);
    this.usuariosService.create(this.usuario).
    subscribe( usuario => { 
      this.router.navigate(['/clientes'])
      swal.fire('Nuevo Usuario con role user' , `Ha sido creado con exito  ${usuario.nombre} `,'success')
      },
      err =>{
        this.errores = err.error.errors as string[]
        console.error('Código del error desde back end:'+ err.status);
        console.error(err.error.errors);
      }     
      )
    
  }

}
