import { Component, OnInit } from '@angular/core';
import { StatDataService } from './stat-data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  pieChartData$ = new BehaviorSubject<number[]>([]);
  pieChartLabels$ = new BehaviorSubject<string[]>([]);

  stateStats$ = new BehaviorSubject<{ [key: string]: number }>({});

  constructor(
    private readonly stats: StatDataService
  ) { }

  ngOnInit() {
    this.stats.getDistStats()
      .subscribe(x => {
        console.log(Object.keys(x));
        this.pieChartLabels$.next(Object.keys(x));
        this.pieChartData$.next(Object.keys(x).map(a => x[a]));
      });


    this.stats.getStateRankings().subscribe(this.stateStats$);
  
  }

  sumList(list: number[]): number {
    return list.reduce((acc, a) => acc + a, 0);
  }

  findBestRankedState(states: { [k: string]: number }): { name: string, points: number } {
    return Object.keys(states)
      .reduce((acc, a) => 
        (acc.points < states[a]) ? { name: a, points: states[a] } : acc
      , { name: Object.keys(states)[0], points: states[Object.keys(states)[0]] });
  }

}
