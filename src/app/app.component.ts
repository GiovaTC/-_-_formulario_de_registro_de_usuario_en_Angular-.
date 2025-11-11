import { Component } from '@angular/core';
import { RegistroComponent } from './registro/registro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Registro de Usuario';
}
