import {Component, OnInit} from '@angular/core';
import {Cliente} from "../models/cliente";
import {ClienteService} from "../cliente.service";
import {NgForOf} from "@angular/common";
import {AuthService} from "../auth.service";
import {Router, RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [
    NgForOf,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css'
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadClientes();
  }

  private loadClientes() {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  editCliente(cnpj: string): void {
    this.router.navigate(['editar-cliente', cnpj])
  }

  deleteCliente(cnpj: string): void {
    if (confirm('Tem certeza que deseja apagar este cliente?')) {
      this.clienteService.deleteCliente(cnpj).subscribe(() => {
        this.loadClientes();
      });
    }
  }
}
