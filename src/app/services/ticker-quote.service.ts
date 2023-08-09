import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TickerQuoteRestResponse } from '../interfaces/ticker-quote';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TickerQuoteService {
  url = environment.brapi;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getTickersQuote(
    limit: number = 10,
    search: string = ''
  ): Observable<TickerQuoteRestResponse> {
    return this.http.get<TickerQuoteRestResponse>(
      `${this.url}/quote/list?limit=${limit}&search=${search}`,
      {
        headers: this.headers,
      }
    );
  }
}
