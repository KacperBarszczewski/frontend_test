import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @ViewChild('footer') footer!: ElementRef;
  @ViewChild('buttonText') buttonText!: ElementRef;

  toggleActiveClass() {
    this.footer.nativeElement.classList.toggle('active');
    this.buttonText.nativeElement.textContent = this.footer.nativeElement.classList.contains('active') ? 'UKRYJ' : 'POKAŻ';
  }

}
