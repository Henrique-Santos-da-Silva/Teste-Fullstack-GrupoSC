import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  onSubmit() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      response => {
        this.router.navigate(['/lista-clientes']);
      },
      error => {
        this.errorMessage = 'Usuário ou senha incorretos';
      }
    );
  }
}
