import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSalesRepComponent } from './dashboard-sales-rep.component';

describe('DashboardSalesRepComponent', () => {
  let component: DashboardSalesRepComponent;
  let fixture: ComponentFixture<DashboardSalesRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSalesRepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSalesRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
