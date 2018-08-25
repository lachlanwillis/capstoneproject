import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatOption } from '@angular/material';
import { HttpClient } from '@angular/common/http';

export interface States {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  
  states: States[] = [
    { value: 'act', viewValue: 'Australian Capital Territory' },
    { value: 'nsw', viewValue: 'New South Wales' },
    { value: 'nt', viewValue: 'Northern Territory' },
    { value: 'qld', viewValue: 'Queensland' },
    { value: 'sa', viewValue: 'South Australia' },
    { value: 'tas', viewValue: 'Tasmania' },
    { value: 'vic', viewValue: 'Victoria' },
    { value: 'wa', viewValue: 'Western Australia' },
  ]


  leaderboardDisplayColumns = ['name', 'points'];
  leaderboardData = [];
  leaderboardSource = new MatTableDataSource<Element>(this.leaderboardData);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor() { }

  ngOnInit() {
  }

}
