import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyMadeOrder } from './ready-made-order';

describe('ReadyMadeOrder', () => {
  let component: ReadyMadeOrder;
  let fixture: ComponentFixture<ReadyMadeOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyMadeOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyMadeOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
