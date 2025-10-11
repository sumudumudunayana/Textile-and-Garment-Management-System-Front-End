import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailoringOrderComponent } from './tailoring-order.component';

describe('TailoringOrderComponent', () => {
  let component: TailoringOrderComponent;
  let fixture: ComponentFixture<TailoringOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailoringOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailoringOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
