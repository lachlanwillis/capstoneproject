import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatOption } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

const NUM_IMAGES = 100;

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
  postcodeText: any;
  
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

  leaderboardStateData = [];
  leaderboardStateSource = new MatTableDataSource<Element>(this.leaderboardStateData);

  leaderboardPostcodeData = [];
  leaderboardPostcodeSource = new MatTableDataSource<Element>(this.leaderboardPostcodeData);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.fetchNational();
  }
  // Getting National Leaderboard
  fetchNational() {
    this.getNationalLeaderboard().subscribe((ladder: any[]) => {
      this.leaderboardSource = new MatTableDataSource<any>(ladder.filter(x => !!x.name))
    });
  }

  // Getting State Leaderboard
  fetchState(event: any) {
    const state = event.value;
    this.getStateLeaderboard(state).subscribe((ladder: any[]) =>
      this.leaderboardStateSource = new MatTableDataSource<any>(ladder.filter(x => !!x.name))
    );
  }

  // Getting Postcode Leaderboard
  fetchPostcode() {
    const postcode = this.postcodeText;
    this.getPostCodeLeaderboard(postcode).subscribe((ladder: any[]) =>
      this.leaderboardPostcodeSource = new MatTableDataSource<any>(ladder.filter(x => !!x.name))
    );
  }



  getPostCodeLeaderboard(postcode: string) {
    return this.http.get<any[]>(`/api/leaderboard/${postcode}/${NUM_IMAGES}`).pipe(take(1));
  }

  getStateLeaderboard(state: string) {
    return this.http.get<any[]>(`/api/leaderboard/${state}/${NUM_IMAGES}`).pipe(take(1));
    
  }

  getNationalLeaderboard() {
    return this.http.get<any[]>(`/api/leaderboard/all/${NUM_IMAGES}`).pipe(take(1));
  }



}
