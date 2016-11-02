import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RatePartialService {
  constructor(private http: Http) {}

  getRating(id: number, type: string): Observable<any> {
    let rating = { id, type };
    return this.http.post(`api/rate/view`, { rating }).map(res => res.json());
  }

  getMultipleRatings(ids: number[], type: string): Observable<any> {
    let rating = { ids, type };
    return this.http.post(`api/rate/list`, { rating }).map(res => res.json());
  }

  setRating(id: number, type: string, method: string): Observable<any> {
    let rating = { id, type, method };
    return this.http.post(`api/rate/rate`, { rating }).map(res => res.json());
  }

  getUserIcon(user: any): string {
    if(user) {
      return user.vote ? 'for' : 'against';
    }
    else {
      return 'none';
    }
  }

  getRatingSum(ratings: any[]): string {
    let sum = ratings.reduce((sum, rating) => {
      return sum + (rating.vote ? 1 : -1);
    }, 0);
    return `${sum > 0 ? '+' : ''}${sum}`;
  }
}
