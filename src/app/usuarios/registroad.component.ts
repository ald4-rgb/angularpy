import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario'
import {UsuariosadService} from './usuariosad.service'
import {Router,ActivatedRoute} from '@angular/router'
import swal from  'sweetalert2' 

@Component({
  selector: 'app-registroad',
  templateUrl: './registroad.component.html',
  
})
export class RegistroadComponent implements OnInit {

  constructor(public usuariosadService:UsuariosadService, 
    public router: Router,public activatedRoute:ActivatedRoute) { }

  public usuarioad: Usuario = new Usuario();

  public titulo:string = "Crear Administradores"

  public  errores:string[];


  ngOnInit(): void {
  }

  public create(): void{
    console.log(this.usuarioad);
    this.usuariosadService.create(this.usuarioad).
    subscribe( usuarioad => { 
     this.router.navigate(['/clientes'])
      swal.fire('Nuevo Admin' , `Ha sido creado con exito  ${usuarioad.nombre} `,'success')
      },
      err =>{
        this.errores = err.error.errors as string[]
        console.error('Código del error desde back end:'+ err.status);
        console.error(err.error.errors);
      }     
      )
    
  }
}
