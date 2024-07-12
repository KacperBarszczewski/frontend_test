import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BlockFirstComponent } from '../../components/block-first/block-first.component';
import { BlockSecondComponent } from '../../components/block-second/block-second.component';
import { BlockThirdComponent } from '../../components/block-third/block-third.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,BlockFirstComponent,BlockSecondComponent,BlockThirdComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
