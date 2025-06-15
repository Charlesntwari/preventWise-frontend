import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictHeartComponent } from './predict-heart.component';

describe('PredictHeartComponent', () => {
  let component: PredictHeartComponent;
  let fixture: ComponentFixture<PredictHeartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictHeartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictHeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
