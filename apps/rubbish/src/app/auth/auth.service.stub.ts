import { AuthService } from './auth.service';
import { of } from 'rxjs/observable/of';

export class AuthStub {
    login = jasmine.createSpy('login').and.callThrough();
    signup = jasmine.createSpy('signup').and.callThrough();
    deleteUser = jasmine.createSpy('deleteUser').and.callThrough();
    logout = jasmine.createSpy('logout').and.callThrough();
    ping = jasmine.createSpy('ping').and.callThrough();
    isLoggedIn = jasmine.createSpy('isLoggedIn').and.callFake(() => of([true]));
    isAdmin = jasmine.createSpy('isAdmin').and.callFake(() => of([true]));
    loginChanged = jasmine.createSpy('loginChanged').and.callFake(() => of());
    getUsers = jasmine.createSpy('getUsers').and.returnValue(of());
    getCurrentUser = jasmine.createSpy('getCurrentUser').and.returnValue(of());
}

export const AUTH_SERVICE_STUB_PROVIDER = {
    useClass: AuthStub,
    provide: AuthService
}