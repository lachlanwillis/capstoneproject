import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { StatisticsComponent } from "./statistics.component";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { StatDataService } from "./stat-data.service";

const routes: Routes = [
  {
    path: "",
    component: StatisticsComponent
  }
];

@NgModule({
  imports: [CommonModule, ChartsModule, RouterModule.forChild(routes)],
  declarations: [StatisticsComponent],
  providers: [StatDataService]
})
export class StatisticsModule {}
