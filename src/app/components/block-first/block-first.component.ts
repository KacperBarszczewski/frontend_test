import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-block-first',
  standalone: true,
  imports: [],
  templateUrl: './block-first.component.html',
  styleUrl: './block-first.component.scss'
})
export class BlockFirstComponent {
  selectedOption: string | null = null;

  constructor(private stateService: StateService) {}

  setOption(option: string) {
    this.selectedOption = option;
    this.stateService.setSelectedOption(option);
  }

}
