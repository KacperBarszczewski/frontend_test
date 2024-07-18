import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  name = '';

  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.name$.subscribe(updatedName => {
      this.name = updatedName;
    });
  }

}
