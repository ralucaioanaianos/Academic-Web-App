import {Component, OnInit, ViewChild} from '@angular/core';
import { LOGO_WIDTH, PAGE_PADDING, CONTENT_PADDING } from 'src/app/constants/sizes';
import {ApisService} from "../../../apis/apis.service";
import {TeacherStatistics} from "../../../entities/teacherStatistics";
import {DropdownComponent} from "../../dropdown/dropdown.component";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, CategoryScale, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, PieController, PieControllerChartOptions, ArcElement, Legend, PieAnimationOptions, PieControllerDatasetOptions, PieDataPoint} from 'chart.js'
Chart.register(CategoryScale, LineElement, LineController, PointElement, LinearScale, Title, PieController, LineController, LinearScale, ArcElement, Legend)
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  logoWidth = LOGO_WIDTH
  pagePadding = PAGE_PADDING
  contentPadding = CONTENT_PADDING

  teacherOptions: any = [];
  courseOptions: any = [];
  nameOfTPropertyToShow: string = "name";
  idTProperty: string = "name";
  nameOfCPropertyToShow: string = "course";
  idCProperty: string = "course";

  grade: number[] = [];
  frequency: number[]  = [];
  numberOfStudents: number[] = [];
  chartExists: boolean = false;

  disableButtons: boolean = false;

  @ViewChild('teacherDd ') teacherDd!: DropdownComponent;
  @ViewChild('courseDd ') courseDd!: DropdownComponent;


  chart : any = [];
  chart2: any = [];

  constructor(private apisService: ApisService) { }

  ngOnInit(): void {
    this.apisService.getTeacherStatistics()
      .subscribe( (result: TeacherStatistics[]) => {
        let array: any = [];
        result.forEach((value, index) => {
          let obj = {"id": index, "name": value.fullName, "courses":value.courseStatisticsList}
          array.push(obj)
        });
        this.teacherOptions = array
        });
  }

  onTeacherOptionChanged(){
    let obj = this.teacherDd.getSelectedObject()[0];
    this.courseOptions = [];
    obj.courses.forEach((value: any, index: any) => {
      let courseObj = {"id": index, "course": value.courseName, "marks": value.marks, "passedStudents": value.passedStudents,
        "failedStudents": value.failedStudents};
      this.courseOptions.push(courseObj);
    })

  }

  onClickShowChart(){
    if (this.chartExists){
      this.grade = [];
      this.frequency = [];
      this.numberOfStudents = [];
      this.chart.destroy();
      this.chart2.destroy();
    }
    let objTeacher = this.teacherDd.getSelectedObject()[0];
    let objCourse = this.courseDd.getSelectedObject()[0];
    objCourse.marks.forEach((value: any, index: any) => {
      this.grade.push(value);
      this.frequency.push(index);
    })
    this.numberOfStudents.push(objCourse.passedStudents);
    this.numberOfStudents.push(objCourse.failedStudents);
    console.log(this.numberOfStudents)
    this.chartExists = true;
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.frequency,
        datasets: [
          {
            data: this.grade,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      },
    });
    this.chart2 =  new Chart('canvas2', {
      type: "pie",
      data: {
        datasets: [
          {
            data: this.numberOfStudents,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)'
            ],
            datalabels: {
              formatter: function (value, context) {
                // @ts-ignore
                return context.chart.data[
                  context.dataIndex
                  ];
              },
            }
          }
          ],
        labels: ['Passed', 'Failed'],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },

        },
      }
    });
  }
}
