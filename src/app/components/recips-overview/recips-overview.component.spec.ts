import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipsOverviewComponent } from './recips-overview.component';

describe('RecipsOverviewComponent', () => {
  let component: RecipsOverviewComponent;
  let fixture: ComponentFixture<RecipsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
