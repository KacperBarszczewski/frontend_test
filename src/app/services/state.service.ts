import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StateService {

  private selectedOptionSource = new BehaviorSubject<string | null>(null);
  selectedOption$ = this.selectedOptionSource.asObservable();
  private contentSource = new BehaviorSubject<string[]>([]);
  content$ = this.contentSource.asObservable();

  private data: string[] = [];
  private dataUrl = 'content.json';

  constructor(private http: HttpClient) {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>(this.dataUrl).pipe(
      catchError(error => {
        console.error('Błąd podczas ładowania danych', error);
        return of([]);
      })
    ).subscribe(data=> {
      this.data = data.map(item => item.text);
    });
  }

  setSelectedOption(option: string) {
    this.selectedOptionSource.next(option);
  }

  updateContent(action: 'replace' | 'append') {
    const currentContent = this.contentSource.getValue();
    const newContent = this.getContent(this.selectedOptionSource.getValue() ?? '');

    if (newContent === null)
      return;

    if (action === 'replace') {
      this.contentSource.next([newContent]);
    } else if (action === 'append' && !currentContent.includes(newContent)) {
      this.contentSource.next([...currentContent, newContent].sort((a, b) => a.localeCompare(b)));
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

  private getSelectContent(index: number): string | null{
    if (this.data.length === index) {
      alert('Za mało danych');
      return null;
    }
    return this.data[index];
  }

  private getRandomContent(): string | null {
    let currentData = this.data.filter((item) => !this.contentSource.getValue().includes(item));
    if (currentData.length === 0) {
      alert('Brak nowych treści');
      return null;
    }
    const randomIndex = Math.floor(Math.random() * currentData.length);
    return currentData[randomIndex];
  }

}

