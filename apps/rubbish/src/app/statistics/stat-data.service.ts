import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, forkJoin } from "rxjs";
import { mergeMap, map } from "rxjs/operators";

@Injectable()
export class StatDataService {
  getDistStats(): Observable<{ [key: string]: number }> {
    return this.http.get<any>("/api/stats/dist");
  }

  getUserStats(): Observable<{ users: number }> {
    return this.http.get<any>('/api/stats/users');
  }

  getStateRankings(): Observable<{ [key: string]: number }> {
    return of(["NSW", "TAS", "SA", "WA", "VIC", "QLD", "ACT", "NT"]).pipe(
      mergeMap(q =>
        forkJoin(
          ...q.map(x =>
            this.http
              .get<any[]>("/api/leaderboard/" + x)
              .pipe(
                map(y => ({ [x]: y.reduce((acc, a) => acc + a.points, 0) }))
              )
          )
        )
      ),
      map(x => x.reduce((acc, a) => ({ ...acc, ...a }), {}))
    );
  }

  constructor(private readonly http: HttpClient) {}
}
