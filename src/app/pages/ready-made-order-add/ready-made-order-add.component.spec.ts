import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyMadeOrderAddComponent } from './ready-made-order-add.component';

describe('ReadyMadeOrderAddComponent', () => {
  let component: ReadyMadeOrderAddComponent;
  let fixture: ComponentFixture<ReadyMadeOrderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyMadeOrderAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyMadeOrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
