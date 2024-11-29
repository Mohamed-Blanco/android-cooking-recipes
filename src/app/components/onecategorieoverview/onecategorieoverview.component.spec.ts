import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnecategorieoverviewComponent } from './onecategorieoverview.component';

describe('OnecategorieoverviewComponent', () => {
  let component: OnecategorieoverviewComponent;
  let fixture: ComponentFixture<OnecategorieoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnecategorieoverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnecategorieoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
