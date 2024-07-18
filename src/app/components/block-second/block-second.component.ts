import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-block-second',
  standalone: true,
  imports: [],
  templateUrl: './block-second.component.html',
  styleUrl: './block-second.component.scss'
})
export class BlockSecondComponent {

  constructor(private stateService: StateService) {
  }

  replaceContent() {
    this.stateService.updateContent('replace');
  }

  appendContent() {
    this.stateService.updateContent('append');
  }

}
