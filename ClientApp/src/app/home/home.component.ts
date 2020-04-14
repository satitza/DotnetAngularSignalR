import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignalRService} from "./services/signal-r.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
    SignalRService
  ]
})
export class HomeComponent implements OnInit {

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public colors: any[] = [{backgroundColor: '#5491DA'}, {backgroundColor: '#E74C3C'}, {backgroundColor: '#E5E7E9'}];

  constructor(private http: HttpClient, private signalRService: SignalRService) {
  }

  ngOnInit(): void {
    this.signalRService.addListenerForGetChartData();
    this.startRequestToHub();
  }

  chartClicked($event: { event?: MouseEvent; active?: {}[] }) {

  }

  startRequestToHub() {
    this.http.get('/api/chart').subscribe(response => {
      console.log(response);
    });
  }

}
