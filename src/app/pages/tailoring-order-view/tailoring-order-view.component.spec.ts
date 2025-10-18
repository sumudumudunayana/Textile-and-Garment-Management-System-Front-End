import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailoringOrderViewComponent } from './tailoring-order-view.component';

describe('TailoringOrderViewComponent', () => {
  let component: TailoringOrderViewComponent;
  let fixture: ComponentFixture<TailoringOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailoringOrderViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailoringOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
