import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private selectedOptionSource = new BehaviorSubject<string | null>(null);
  selectedOption$ = this.selectedOptionSource.asObservable();

  content: string[] = [];
  content$: Observable<string[]> = new BehaviorSubject<string[]>(this.content);

  constructor(private localStorageService: LocalStorageService) {
    this.content$ = this.localStorageService.content$;
    this.localStorageService.content$.subscribe(updatedContent => {
      this.content = updatedContent;
    });
  }

  setSelectedOption(option: string) {
    this.selectedOptionSource.next(option);
  }

  updateContent(action: 'replace' | 'append') {
    const currentContent = this.content;
    const newContent = this.getContent(this.selectedOptionSource.getValue() ?? '');

    if (newContent === null)
      return;

    if (action === 'replace') {
      this.localStorageService.editContent(newContent);
    } else if (action === 'append' && !currentContent.includes(newContent)) {
      this.localStorageService.addContent(newContent);
    } else {
      alert('Treść już istnieje.');
    }
  }

  getContent(option: string): string | null {
    if (option === 'first') {
      return this.getSelectContent(0);
    } else if (option === 'second') {
      return this.getSelectContent(1);
    } else if (option === 'random') {
      return this.getRandomContent();
    } else {
      alert('Nie zaznaczono opcji');
      return null;
    }
  }

  private getSelectContent(index: number): string | null {
    if (this.localStorageService.dataJSON.length < index) {
      alert('Za mało danych');
      return null;
    }
    return this.localStorageService.dataJSON[index];
  }

  private getRandomContent(): string | null {
    let currentData = this.localStorageService.dataJSON.filter((item) => !this.content.includes(item));
    if (currentData.length === 0) {
      alert('Brak nowych treści');
      return null;
    }
    const randomIndex = Math.floor(Math.random() * currentData.length);
    return currentData[randomIndex];
  }

}

