import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-block-third',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block-third.component.html',
  styleUrl: './block-third.component.scss'
})
export class BlockThirdComponent {
  content: string[] = [];

  constructor(private stateService: StateService) {
    this.stateService.content$.subscribe(updatedContent => {
      this.content = updatedContent;
    });
  }

}
