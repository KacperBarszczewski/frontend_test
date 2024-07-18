import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage.service';
import { StateService } from '../../services/state.service';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private localStorageService: LocalStorageService) {
  }

  onChangeNameClick() {
    this.localStorageService.changeName("Kacper Barszczewski");
  }

  onRemoveDataClick() {
    console.log('All data removed from local storage');
    this.localStorageService.clearAllLocalStorageData();
    window.location.reload();
  }

}
