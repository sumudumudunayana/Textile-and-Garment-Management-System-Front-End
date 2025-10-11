import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailoringOrderAddComponent } from './tailoring-order-add.component';

describe('TailoringOrderAddComponent', () => {
  let component: TailoringOrderAddComponent;
  let fixture: ComponentFixture<TailoringOrderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailoringOrderAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailoringOrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
