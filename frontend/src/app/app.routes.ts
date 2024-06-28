import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ClientesListComponent} from "./clientes-list/clientes-list.component";
import {ClienteCadastroComponent} from "./cliente-cadastro/cliente-cadastro.component";

export const routes: Routes = [
  { path: '', redirectTo: () => {
     return  '/login'
    }, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'lista-clientes', component: ClientesListComponent},
  {path: 'lista-clientes/:cnpj', component: ClientesListComponent},
  {path: 'cadastro-cliente', component: ClienteCadastroComponent},
  {path: 'editar-cliente/:cnpj', component: ClienteCadastroComponent},
];

