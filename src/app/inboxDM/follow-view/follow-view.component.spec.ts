import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowViewComponent } from './follow-view.component';

describe('FollowViewComponent', () => {
  let component: FollowViewComponent;
  let fixture: ComponentFixture<FollowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
