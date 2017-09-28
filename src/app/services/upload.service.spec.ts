import { UserService } from './user.service';

/* 
describe('UserService', () => {
  let service: UserService;

  it('getValue should return real value by way of the real MyService', () => {
    service = new UserService();
    expect(service.getValue()).toBe('real value');
  });

  it('getValue should return stubbed value from a MyService spy', () => {
    const myService = new MyService();
    const stubValue = 'stub value';
    const spy = spyOn(myService, 'getValue').and.returnValue(stubValue);
    service = new DependentService(myService);

    expect(service.getValue()).toBe(stubValue, 'service returned stub value');
    expect(spy.calls.count()).toBe(1, 'stubbed method was called once');
    expect(spy.calls.mostRecent().returnValue).toBe(stubValue);
  });
}); */
