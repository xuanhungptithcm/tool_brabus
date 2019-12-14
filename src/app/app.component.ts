import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  TemplateRef,
  ElementRef
} from '@angular/core';
import { TradeService } from './trade.service';
import * as uuid from 'uuid';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { config } from './config';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren('table') table: QueryList<ElementRef>;
  title = 'client';
  id = 'f9643e';
  data: any;
  listLeader: any[] = [];
  listMemberInRoom: any[] = [];
  dataUser: any;
  dataTrade: any[] = [];
  _botsocket;
  listOrder: any[] = [];
  listBuy = 1;
  tongBUY = 0;
  tongSELL = 0;
  loopGetData: any;
  check = 0;
  timeOutGetData;
  constructor(private tradeService: TradeService, private socket: Socket) {
    // this.tradeService.sendMessage('join', {
    //   account_id: 'N6OORYsB4ZAnDutRAP_2',
    //   currency: 'BTCUSD'
    // })

    this.tradeService.listenMessage('pie-chart-result').subscribe(data => {
      // console.log(data);
      this.listOrder = data as any;
      this.table.forEach(td => {
        // console.log(td);
        if (this.check === 0) {
          if (td.nativeElement.cells[2].innerText === 'Buy') {
            this.tongBUY += parseInt(td.nativeElement.cells[3].textContent, 0);
          } else {
            this.tongSELL += parseInt(td.nativeElement.cells[3].textContent, 0);
          }
          console.log(this.tongSELL, this.tongBUY);
        }
      });
    });
    this.tradeService.listenMessage('thread').subscribe(data => {
      console.log(data);

      if (data['currentSecond'] >= 29 && data['currentSecond'] <= 59) {
        if (data['currentSecond'] === 59) {
          this.tongBUY = 0;
          this.tongSELL = 0;
        }
        this.check = 1;
      } else {
        this.check = 0;
      }
    });

    // this.socket.on('pie-chart-result', (data) => {
    //   console.log(data);

    // })
  }
  ngOnInit() {
    this.tradeService.getId('').subscribe(data => {
      console.log(data);
      let text = data['text'];
      text = text.substring(text.indexOf('{'));
      text = JSON.parse(text);
      console.log(text);
      const socketIoConfig: SocketIoConfig = {
        url: config.url,
        options: {
          query: config.queryConnect
        }
      };
      let socket = new Socket(socketIoConfig);
      // this._botsocket = io['connect'](config.url, {
      //   query: config.queryConnect
      // });
      this.tradeService.sendMessage('join', {
        account_id: text['sid'],
        currency: 'BTCUSD'
      });
      // socket['on']('connect', function(_0x29e106) {
      //   socket['emit']('join', {
      //     account_id: text['sid'],
      //     currency: 'BTCUSD'
      //   });
      // });
      // socket['on']('pie-chart-result', function(data) {
      //   console.log(this.listBuy);
      //   console.log(data);
      //   // if (this.listBuy.length === 0) {
      //   //   this.listBuy = data;
      //   //   console.log(this.listBuy);
      //   // }
      // });
      // this._botsocket['on']('thread', function(data) {
      //   console.log(data.data);
      //   // analyticCandle(data);
      // });
      // _botsocket = io['connect'](config.url, {
      //   query: config.queryConnect
      // });
      // _botsocket['on']('connect', function(_0x29e106) {
      //   _botsocket['emit']('join', {
      //     account_id: account_id,
      //     currency: 'BTCUSD'
      //   });
      // });
      // _botsocket['on']('thread', function(data) {
      //   console.log(data.data);
      //   analyticCandle(data);
      // });
      // _botsocket['on']('pie-chart-result', function(data) {
      //   // console.log(data);
      // });
    });
    // this.tradeService.sendMessage('authentication', {
    //   user: 'XuanHung',
    //   isLeader: false
    // });
    // this.tradeService.listenMessage('authentication').subscribe(data => {
    //   console.log(data);
    // });
    // this.tradeService.listenMessage('member-in-room').subscribe(data => {
    //   console.log(data);
    //   this.listMemberInRoom = data as any;
    // });
    // this.tradeService.listenMessage('listLeader').subscribe(data => {
    //   console.log('listLeader', data);
    //   this.listLeader = data as any[];
    // });
    // this.tradeService.listenMessage('lenh-trade').subscribe(data => {
    //   console.log(data);
    //   this.dataTrade.push(data);
    // });
  }
  joinRoom(leader: any) {
    this.tradeService.sendMessage('join-room', {
      leaderId: leader.id
    });
  }
  connectSocket(idUser: string) {
    this.id = idUser;
  }
}
