import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private contentSource = new BehaviorSubject<string[]>([]);
  content$ = this.contentSource.asObservable();
  dataJSON: string[] = [];

  private dataUrl = 'content.json';
  private contentKey = 'content';
  private dataJSONKey = 'JSON';

  constructor(private http: HttpClient) {
    const content = this.loadLocalStorageData(this.contentKey);
    const dataJSON = this.loadLocalStorageData(this.dataJSONKey);

    if (!content || !dataJSON) {
      this.loadData();
    } else {
      this.contentSource.next(content);
      this.dataJSON = dataJSON;
    }
  }

  private loadData() {
    this.http.get<any[]>(this.dataUrl).pipe(
      catchError(error => {
        console.error('Błąd podczas ładowania danych', error);
        return of([]);
      })
    ).subscribe(dataJSON => {
      this.dataJSON = dataJSON.map(item => item.text);
      this.saveLocalStorageData(this.dataJSONKey, this.dataJSON);
    });
  }

  editContent(newContent: string) {
    this.contentSource.next([newContent]);

    this.saveLocalStorageData(this.contentKey, [newContent]);
  }

  addContent(newContent: string) {
    const currentContent = this.contentSource.getValue();
    const nextContent = [...currentContent, newContent].sort((a, b) => a.localeCompare(b));
    this.contentSource.next(nextContent);

    this.saveLocalStorageData(this.contentKey, nextContent);
  }

  //LocalStorage
  saveLocalStorageData(key: string, data: any): void {
    const dataString = JSON.stringify(data);
    localStorage.setItem(key, dataString);
  }

  loadLocalStorageData(key: string): any {
    const dataString = localStorage.getItem(key);
    if (dataString) {
      return JSON.parse(dataString);
    }
    return null;
  }

  clearAllLocalStorageData(): void {
    localStorage.clear();
  }

}
