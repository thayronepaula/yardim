import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

const BASE_URL = 'http://localhost:3331';

@Injectable({
  providedIn: 'root',
})
export class Json2csvService {
  private httpClient = inject(HttpClient);

  constructor() {}

  convert({ json }: { json: any }) {
    return this.httpClient.post<any>(`${BASE_URL}/convert`, { json }, {}).pipe(
      map((result: any) => {
        console.log(`🚀  result:`, result);
        return result;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }
}
