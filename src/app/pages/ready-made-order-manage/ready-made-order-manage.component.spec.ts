import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyMadeOrderManageComponent } from './ready-made-order-manage.component';

describe('ReadyMadeOrderManageComponent', () => {
  let component: ReadyMadeOrderManageComponent;
  let fixture: ComponentFixture<ReadyMadeOrderManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyMadeOrderManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyMadeOrderManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
