import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  endpoint = 'http://localhost:3000/rooms/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpclient: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getRooms(): Observable<Room[]> {
    return this.httpclient.get<Room[]>(this.endpoint + 'rooms');
  }

  getRoomByNumber(roomNumber: number): Observable<Room> {
    return this.httpclient.get<Room>(this.endpoint + 'rooms/' + roomNumber);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
