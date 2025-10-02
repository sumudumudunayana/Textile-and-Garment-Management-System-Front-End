import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyMadeOrderComponent } from './ready-made-order.component';

describe('ReadyMadeOrderComponent', () => {
  let component: ReadyMadeOrderComponent;
  let fixture: ComponentFixture<ReadyMadeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyMadeOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyMadeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
