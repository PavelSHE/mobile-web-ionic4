import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Observable } from 'rxjs';
import { AngularFireAuth } from "angularfire2/auth";
import { Chart } from "chart.js";
import * as moment from 'moment';

@Component({
  selector: 'app-box-page',
  templateUrl: './box-page.page.html',
  styleUrls: ['./box-page.page.scss'],
})
export class BoxPagePage implements OnInit {
  id: string;
  data: Observable<any[]>;
  ref: AngularFireList<any>;
  itemRef: AngularFireObject<any>;
  dataPath: string;
  graphDataLimit : number;

  @ViewChild("valueBarsCanvasT") valueBarsCanvas;
  ValueBarChart: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private alertCtrl: AlertController, private route: ActivatedRoute, public navCtrl: NavController) { 
    this.graphDataLimit = 6;
  }

  chartData = null;
  chartDataT = null;
  chartDataH = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.dataPath = "/logs/" + btoa(data.email).replace(/=/g, "-") + "/" + this.id;
        //this.ref = this.db.list(this.dataPath ,ref => ref.orderByKey().limitToLast(4));
        this.itemRef = this.db.object(this.dataPath);
        this.itemRef.snapshotChanges().subscribe(action => {
          //console.log(action.type, action.key , action.payload.val());
          if (this.chartData) {
            this.updateChart(action.payload.val());
          } else {
            this.createChart(action.payload.val());
          }
        });
        // this.ref.valueChanges().subscribe(result => {
        //   console.log(result);
        //   this.ref.valueChanges().subscribe(result => {
        //     if (this.chartData) {
        //       this.updateChart(result);
        //     } else {
        //       this.createChart(result);
        //     }
        //   });
        // });
      } else {
        //to do data guards
        this.navCtrl.navigateForward("login");
      }
    });
  }

  createChart(data) {
    this.chartData = data;
    console.log("graph raw data", this.chartData);
    const chartData = this.arrangeDataForChart(this.graphDataLimit);
    this.ValueBarChart = new Chart(this.valueBarsCanvas.nativeElement, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        hoverMode: "index",
        stacked: false,
        title: {
          display: true,
          text: ""
        },
        scales: {
          yAxes: [
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "left",
              id: "y-axis-1"
            },
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "right",
              id: "y-axis-2",

              // grid line settings
              gridLines: {
                drawOnChartArea: false // only want the grid lines for one axis to show up
              }
            }
          ]
        }
      }
    });
  }

  updateChart(data) {
    this.chartData = data;
    console.log("new graph raw data", this.chartData);
    const chartData = this.arrangeDataForChart(this.graphDataLimit);
    this.ValueBarChart.data = chartData;
    this.ValueBarChart.data.datasets.forEach((dataset) => {
      dataset.data = chartData;
    });
    this.ValueBarChart.update();
  }

  arrangeDataForChart(limit) {
    console.log("prep");
    let lineCharData = {
      labels: [],
      datasets: [
        {
          label: "Temperature",
          backgroundColor: "#f4bf42",
          fill: false,
          data: [],
          yAxisID: "y-axis-1"
        },
        {
          label: "Humidity",
          backgroundColor: "#41a0f4",
          fill: false,
          data: [],
          yAxisID: "y-axis-2"
        }
      ]
    };
    if (!this.chartData){
      return lineCharData;
    }
    for (const [key, value] of Object.entries(this.chartData)) {
      //console.log(key, value["t"] ,value["h"]);
      lineCharData.labels.push(moment.unix(+key).format('HH:mm'));
      lineCharData.datasets[0].data.push(Math.ceil(+value["t"]));
      lineCharData.datasets[1].data.push(Math.ceil(+value["h"]));
    }

    // for (let item of this.chartData) {
    //   console.log(item);
    //   // lineCharData.labels.push(moment.unix(item.d).format('hh:mm'));
    //   // lineCharData.datasets[0].data.push(Math.ceil(+item.t));
    //   // lineCharData.datasets[1].data.push(Math.ceil(+item.h));
    // }
    lineCharData.labels = lineCharData.labels.slice(Math.max(lineCharData.labels.length - limit, 1))
    lineCharData.datasets[0].data = lineCharData.datasets[0].data.slice(Math.max(lineCharData.labels.length - limit, 1))
    lineCharData.datasets[1].data = lineCharData.datasets[1].data.slice(Math.max(lineCharData.labels.length - limit, 1))
    console.log(lineCharData);
    return lineCharData;
  }

  navButton(){
    console.log("go back");
  }
}
