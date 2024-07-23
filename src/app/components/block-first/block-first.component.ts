import { Component } from '@angular/core';
import { OptionType, StateService, OptionTypeOrNull } from '../../services/state.service';

@Component({
  selector: 'app-block-first',
  standalone: true,
  imports: [],
  templateUrl: './block-first.component.html',
  styleUrl: './block-first.component.scss'
})
export class BlockFirstComponent {
  OptionType = OptionType;
  selectedOption: OptionTypeOrNull = null;

  constructor(private stateService: StateService) { }

  setOption(option: OptionTypeOrNull) {
    this.selectedOption = option;
    this.stateService.setSelectedOption(option);
  }

}
