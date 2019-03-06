import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs';
import { AngularFireAuth } from "angularfire2/auth";
//import { Chart } from "chart.js";

@Component({
  selector: 'app-box-page',
  templateUrl: './box-page.page.html',
  styleUrls: ['./box-page.page.scss'],
})
export class BoxPagePage implements OnInit {
  id: string;
  data: Observable<any[]>;
  ref: AngularFireList<any>;
  dataPath: string;

  @ViewChild("valueBarsCanvasT") valueBarsCanvas;
  ValueBarChart: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private alertCtrl: AlertController,private route: ActivatedRoute) { }

  chartData = null;
  chartDataT = null;
  chartDataH = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.afAuth.authState.subscribe(data =>{
      if (data && data.email && data.uid) {
        this.dataPath = "/logs/" + btoa(data.email).replace(/=/g, "-") +  "/" + this.id;
        this.ref = this.db.list(this.dataPath);  //,ref => ref.orderByKey().limitToLast(6));
        this.ref.valueChanges().subscribe(result => {
          console.log(result);
          this.ref.valueChanges().subscribe(result => {
            if (this.chartData) {
              this.updateChart(result);
            } else {
              this.createChart(result);
            }
          });
        })
      }else{
        //to do data guards
      }
    });
  }

  createChart(data) {
    this.chartData = data;
    console.log("graph raw data", this.chartData);
    // const chartData = this.arrangeDataForChart();
    // this.ValueBarChart = new Chart(this.valueBarsCanvas.nativeElement, {
    //   type: "line",
    //   data: chartData,
    //   options: {
    //     responsive: true,
    //     hoverMode: "index",
    //     stacked: false,
    //     title: {
    //       display: true,
    //       text: ""
    //     },
    //     scales: {
    //       yAxes: [
    //         {
    //           type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
    //           display: true,
    //           position: "left",
    //           id: "y-axis-1"
    //         },
    //         {
    //           type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
    //           display: true,
    //           position: "right",
    //           id: "y-axis-2",

    //           // grid line settings
    //           gridLines: {
    //             drawOnChartArea: false // only want the grid lines for one axis to show up
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });
  }

  updateChart(data) {
    this.chartData = data;
    console.log("graph raw data", this.chartData);
    // const chartData = this.arrangeDataForChart();
    // this.ValueBarChart.data = chartData;
    // // this.ValueBarChart.data.datasets.forEach((dataset) => {
    // //   dataset.data = chartData;
    // // });
    // this.ValueBarChart.update();
  }

}
