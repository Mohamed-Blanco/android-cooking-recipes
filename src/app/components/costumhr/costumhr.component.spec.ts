import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumhrComponent } from './costumhr.component';

describe('CostumhrComponent', () => {
  let component: CostumhrComponent;
  let fixture: ComponentFixture<CostumhrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostumhrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
