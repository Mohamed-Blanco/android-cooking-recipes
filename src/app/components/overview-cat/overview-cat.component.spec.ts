import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCatComponent } from './overview-cat.component';

describe('OverviewCatComponent', () => {
  let component: OverviewCatComponent;
  let fixture: ComponentFixture<OverviewCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
