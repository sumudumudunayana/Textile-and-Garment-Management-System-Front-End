import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailoringOrderManageComponent } from './tailoring-order-manage.component';

describe('TailoringOrderManageComponent', () => {
  let component: TailoringOrderManageComponent;
  let fixture: ComponentFixture<TailoringOrderManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailoringOrderManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailoringOrderManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
