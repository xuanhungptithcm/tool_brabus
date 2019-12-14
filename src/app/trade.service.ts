import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  constructor(private socket: Socket, private http: HttpClient) {}

  sendMessage(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
  listenMessage(eventName: string) {
    return this.socket.fromEvent(eventName);
  }
  getId(url: string): Observable<any> {
    return this.http.get(
      'https://brabus.io:8443/socket.io/?token=4282e03370de48d67878bfd467913edf.38432bc9b99872fdd341ecf67bca847e&account=D101386&authen=ca4896ec1bfa51c63e438bf9c52aedd6e83932bdd23c5ad47ff135c9778c3623&EIO=3&transport=polling&t=Mxpa4FF'
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      }),
    );
  }
}
