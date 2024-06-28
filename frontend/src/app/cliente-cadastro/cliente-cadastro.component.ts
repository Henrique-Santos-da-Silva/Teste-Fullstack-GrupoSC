import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Cliente} from "../models/cliente";
import {ClienteService} from "../cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cliente-cadastro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './cliente-cadastro.component.html',
  styleUrl: './cliente-cadastro.component.css'
})
export class ClienteCadastroComponent implements OnInit {

  // @ts-ignore
  clienteForm: FormGroup;

  cliente = {} as Cliente;
  isEditMode = false;

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const cnpj = this.route.snapshot.params['cnpj'];

    this.initializeForm();

    if (cnpj) {
      this.isEditMode = true;
      this.clienteService.getCliente(cnpj).subscribe(cliente => {
        this.clienteForm.patchValue(cliente);
        this.clienteForm.get('cnpj')?.disable();
      });
    }
  }

  initializeForm(): void {
    this.clienteForm = this.fb.group({
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      razaoSocial: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      status: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const cliente: Cliente = this.clienteForm.getRawValue();
      if (this.isEditMode) {
        this.clienteService.updateCliente(cliente.cnpj, cliente).subscribe(() => {
            this.router.navigate(['/lista-clientes']);
          },
          error => console.log('Cliente Error', error));
      } else {
        this.clienteService.createCliente(cliente).subscribe(() => {
            this.router.navigate(['/lista-clientes']);
          },
          error => console.log('Cliente Error', error));
      }
    }
  }
}
