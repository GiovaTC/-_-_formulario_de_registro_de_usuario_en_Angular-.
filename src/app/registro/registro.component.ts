import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  registroForm: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        usuario: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmarContrasena: ['', Validators.required],
      },
      { Validators: this.passwordsIguales }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registroForm.controls;
  }

  passwordsIguales(group: AbstractControl) {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { noCoincide: true };
  }

  onsubmit() {
    this.enviado = true;
    if (this.registroForm.invalid) return;

    console.log('Formulario válido:', this.registroForm.value);
    alert('✅ Registro exitoso');
    this.registroForm.reset();
    this.enviado = false;
  }
}
