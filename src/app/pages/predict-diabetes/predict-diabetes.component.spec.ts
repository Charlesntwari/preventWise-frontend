import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictDiabetesComponent } from './predict-diabetes.component';

describe('PredictDiabetesComponent', () => {
  let component: PredictDiabetesComponent;
  let fixture: ComponentFixture<PredictDiabetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictDiabetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictDiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
