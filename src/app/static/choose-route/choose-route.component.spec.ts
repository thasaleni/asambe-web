import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRouteComponent } from './choose-route.component';

describe('ChooseRouteComponent', () => {
  let component: ChooseRouteComponent;
  let fixture: ComponentFixture<ChooseRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseRouteComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
