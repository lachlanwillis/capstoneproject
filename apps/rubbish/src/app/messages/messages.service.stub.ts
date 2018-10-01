import { of } from "rxjs";
import { MessagesService } from "./messages.service";

export class MessagesServiceStub {
    getMyMessages = jasmine.createSpy('getMyMessages').and.returnValue(of());
    clearMessage = jasmine.createSpy('clearMessage').and.returnValue(of());
    messageUser = jasmine.createSpy('messageUser').and.returnValue(of());
}

export const MESSAGES_SERVICE_STUB_PROVIDER = {
    provide: MessagesService,
    useClass: MessagesServiceStub
}