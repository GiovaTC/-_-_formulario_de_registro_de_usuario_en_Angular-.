# -_-_formulario_de_registro_de_usuario_en_Angular-.  .
# 🧾 Formulario de Registro de Usuario en Angular :.

<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/1b63d3fb-8063-497d-a861-3a14cf291b60" />  

Formulario de **registro de usuario completo** en Angular, usando **Reactive Forms**, con validaciones (campos obligatorios, formato de email y coincidencia de contraseñas).

---

## 📁 Estructura del componente

```
src/
├─ app/
│  ├─ app.module.ts
│  ├─ registro/
│  │  ├─ registro.component.ts
│  │  ├─ registro.component.html
│  │  └─ registro.component.css
│  └─ app.component.html
```

---

## 🧩 1. `app.module.ts`

Asegúrate de importar `ReactiveFormsModule`.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## 🧠 2. `registro.component.ts`

Lógica del formulario, validaciones y manejo del envío.

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required]
    }, { validators: this.passwordsIguales });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registroForm.controls;
  }

  passwordsIguales(group: AbstractControl) {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { noCoincide: true };
  }

  onSubmit() {
    this.enviado = true;
    if (this.registroForm.invalid) return;

    console.log('Formulario válido:', this.registroForm.value);
    alert('✅ Registro exitoso');
    this.registroForm.reset();
    this.enviado = false;
  }
}
```

---

## 🎨 3. `registro.component.html`

Formulario con mensajes de error dinámicos.

```html
<div class="container">
  <h2>Registro de Usuario</h2>

  <form [formGroup]="registroForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label>Nombre completo</label>
      <input type="text" formControlName="nombre" placeholder="Ingrese su nombre">
      <div *ngIf="enviado && f['nombre'].errors" class="error">
        <span *ngIf="f['nombre'].errors['required']">El nombre es obligatorio.</span>
        <span *ngIf="f['nombre'].errors['minlength']">Mínimo 3 caracteres.</span>
      </div>
    </div>

    <div class="form-group">
      <label>Usuario</label>
      <input type="text" formControlName="usuario" placeholder="Nombre de usuario">
      <div *ngIf="enviado && f['usuario'].errors" class="error">
        <span *ngIf="f['usuario'].errors['required']">El usuario es obligatorio.</span>
        <span *ngIf="f['usuario'].errors['minlength']">Mínimo 4 caracteres.</span>
      </div>
    </div>

    <div class="form-group">
      <label>Correo electrónico</label>
      <input type="email" formControlName="email" placeholder="ejemplo@email.com">
      <div *ngIf="enviado && f['email'].errors" class="error">
        <span *ngIf="f['email'].errors['required']">El email es obligatorio.</span>
        <span *ngIf="f['email'].errors['email']">Formato inválido.</span>
      </div>
    </div>

    <div class="form-group">
      <label>Contraseña</label>
      <input type="password" formControlName="contrasena" placeholder="********">
      <div *ngIf="enviado && f['contrasena'].errors" class="error">
        <span *ngIf="f['contrasena'].errors['required']">La contraseña es obligatoria.</span>
        <span *ngIf="f['contrasena'].errors['minlength']">Mínimo 6 caracteres.</span>
      </div>
    </div>

    <div class="form-group">
      <label>Confirmar contraseña</label>
      <input type="password" formControlName="confirmarContrasena" placeholder="********">
      <div *ngIf="enviado && (f['confirmarContrasena'].errors || registroForm.errors?.['noCoincide'])" class="error">
        <span *ngIf="f['confirmarContrasena'].errors?.['required']">Debe confirmar la contraseña.</span>
        <span *ngIf="registroForm.errors?.['noCoincide']">Las contraseñas no coinciden.</span>
      </div>
    </div>

    <button type="submit">Registrar</button>
  </form>
</div>
```

---

## 💅 4. `registro.component.css`

Estilo moderno y simple.

```css
.container {
  max-width: 400px;
  margin: 40px auto;
  padding: 25px;
  background: #f4f6f9;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.error {
  color: #d9534f;
  font-size: 0.9em;
  margin-top: 4px;
}
```

---

## 🧠 5. `app.component.html`

Para mostrar el formulario principal:

```html
<app-registro></app-registro>
```

---

## 🚀 Ejecución del proyecto

1. Instala Angular CLI si no lo tienes:
   ```bash
   npm install -g @angular/cli
   ```

2. Crea un nuevo proyecto e incluye el componente:
   ```bash
   ng new registro-usuario
   cd registro-usuario
   ng g c registro
   ```

3. Copia los códigos anteriores en sus respectivos archivos.

4. Ejecuta el proyecto:
   ```bash
   ng serve
   ```

5. Abre en tu navegador:  
   👉 `http://localhost:4200/`

---

## 🧩 Tecnologías usadas
- **Angular 17+**
- **TypeScript**
- **Reactive Forms**
- **HTML5 / CSS3**

---

## 💡 Resultado esperado

Un formulario moderno, validado y funcional para registrar usuarios, mostrando mensajes de error dinámicos y verificando que las contraseñas coincidan.

---

✳️ **Autor:** *Generado por GPT-5 para un entorno Angular profesional.* : .
