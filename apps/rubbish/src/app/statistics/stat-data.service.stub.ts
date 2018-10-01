import { of } from "rxjs";
import { StatDataService } from "./stat-data.service";

export class StatDataServiceStub {
  getDistStats = jasmine.createSpy("getDistStats").and.returnValue(of({ rubbish: 10 }));
  getStateRankings = jasmine
    .createSpy("getStateRankings")
    .and.returnValue(of({ qld: 10 }));
}

export const STAT_DATA_SERVICE_STUB_PROVIDER = {
    provide: StatDataService,
    useClass: StatDataServiceStub
}
