import {Injectable} from '@angular/core';
import * as signalR from "@aspnet/signalr";
import {ChartModel} from "../../../share/ChartModel";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  hubConnection: any;

  data: ChartModel[];

  constructor(private http: HttpClient) {

  }

  addListenerForGetChartData() {

    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('/chart').build(); // build connection
    this.hubConnection.start().then(() => {
      console.log('Hub connection started ...');
      if (this.hubConnection.state) {
        this.hubConnection.on('transferchartdata', (response) => {
          this.data = response;
          console.log(this.data);
        });
      } else {
        console.warn('Cannot add listener. connection state is ' + this.hubConnection.state);
      }
    }).catch(err => {
      console.log('Cannot connect to hub. ' + err);
    });
  }
}
