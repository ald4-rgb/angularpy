import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { PaginatorComponent } from './paginator/paginator.component';
import{ClienteService} from './clientes/cliente.service';
import {RouterModule, Routes} from '@angular/router';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import{FormsModule, ReactiveFormsModule} from '@angular/forms'
import{registerLocaleData }from '@angular/common';
import localES from '@angular/common/locales/es-MX';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import  {MatMomentDateModule} from '@angular/material-moment-adapter';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RegistroadComponent } from './usuarios/registroad.component';
import { RegistrousComponent } from './usuarios/registrous.component';

registerLocaleData(localES,'es-MX');
//definimos las rutas de cada componenete de nuestra aplicacion
/*a qui tenemos el arreglo para regiatrar las rutas crearemos una nueva entrada*/ 

//drfinimos las rutas de cada componenete de nuestra aplicacion
const routes: Routes = [

      //un phat vacio v a redirigirnos a clientes 
      {path: '',redirectTo:'/clientes',pathMatch: 'full'},
      
      {path: 'directivas',component: DirectivaComponent},
      //lo mapeamos a la ruta component
      {path:'clientes',component:ClientesComponent},
    
      {path:'clientes/page/:page',component:ClientesComponent},
    
      
      //con esto ya tenemos mapeada nuestra ruta el componente formulario
      /**tenemos la propiedad  canActivate y quie podemos registrar este guard
       *este es un arreglo pero podemos tener varios guard para esta ruta pero
       tambien aplicamos el EoleGuard  y lo que faltareia serian los parametros
       la data para indicar  que  esta ruta del formulario es para aministradores 
       y nadamas  data:{role:'ROLE_ADMIN'} -> le damos el nombre que les 
       queramos dar a estos parametros _ como nosta siempre MAYUSCULAS 
       */
      {path:'clientes/form',component:FormComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},

      {path:'clientes/form/:id',component:FormComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
      
      {path:'registroadmin',component:RegistroadComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},

      {path:'registrousers',component:RegistrousComponent},

      {path:'login',component:LoginComponent},

      {path:'facturas/:id', component:DetalleFacturaComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_USER'}},

      {path:'facturas/form/:clienteId', component:FacturasComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}}

      
     // {path:'clientes/ver/:id',component:DetalleComponent}
    ];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
      FooterComponent,
      DirectivaComponent,
      ClientesComponent,
      FormComponent,
      PaginatorComponent,
      DetalleComponent,
      LoginComponent,
      DetalleFacturaComponent,
      FacturasComponent,
      RegistroadComponent,
      RegistrousComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
   //importamos y con esto ya importamos nuestro modulo para trabajar con formularios
    FormsModule,
    //importamos las rutas y pasamos la constante 
   RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule, 
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule

  ],
  
  /**registramos el TokenIntrceptor */
  providers: [ClienteService, 
  {provide: LOCALE_ID, useValue: 'es-MX' },
  
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }