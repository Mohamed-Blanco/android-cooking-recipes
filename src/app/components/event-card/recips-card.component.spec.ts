import { ComponentFixture, TestBed } from '@angular/core/testing';

import { recipesCardComponent } from './recips-card.component';

describe('recipesCardComponent', () => {
  let component: recipesCardComponent;
  let fixture: ComponentFixture<recipesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [recipesCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(recipesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
