import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IStudentUpcomingExam } from './../../models/exam-models';

@Component({
  selector: 'ru-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  upcomingExamsColumns = [
    'date',
    'subject',
    'professor',
    'duration',
    'actions'
  ];
  upcomingExams: MatTableDataSource<IStudentUpcomingExam>;
  upcomingExamsData: IStudentUpcomingExam[];

  pastExamsColumns = ['date', 'subject', 'professor'];
  pastExams: MatTableDataSource<IStudentUpcomingExam>;
  pastExamsData: IStudentUpcomingExam[];

  constructor() {}

  ngOnInit() {
    this.upcomingExamsData = [
      {
        date: new Date('04/01/2018'),
        duration: 2,
        room: '203b',
        subject: 'Informatics',
        professor: 'Plamenka Hristova'
      },
      {
        date: new Date('04/21/2018'),
        duration: 4,
        room: '405a',
        subject: 'Mathematics',
        professor: 'Stepan Terzian'
      },
      {
        date: new Date('04/28/2018'),
        duration: 3,
        room: '503',
        subject: 'Intro to Programming',
        professor: 'Vurban Iliev'
      }
    ];

    this.upcomingExams = new MatTableDataSource(this.upcomingExamsData);

    this.pastExamsData = [
      {
        date: new Date('04/01/2018'),
        duration: 2,
        room: '203b',
        subject: 'Informatics',
        professor: 'Plamenka Hristova'
      },
      {
        date: new Date('04/21/2018'),
        duration: 4,
        room: '405a',
        subject: 'Mathematics',
        professor: 'Stepan Terzian'
      },
      {
        date: new Date('04/28/2018'),
        duration: 3,
        room: '503',
        subject: 'Intro to Programming',
        professor: 'Vurban Iliev'
      }
    ];

    this.pastExams = new MatTableDataSource(this.pastExamsData);
  }
}
