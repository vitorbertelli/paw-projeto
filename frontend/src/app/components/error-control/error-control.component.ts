import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-control',
  standalone: true,
  imports: [],
  templateUrl: './error-control.component.html',
  styleUrl: './error-control.component.css'
})
export class ErrorControlComponent {
  @Input() hasError: boolean = false;
  @Input() errorMsg: string = "";
}
