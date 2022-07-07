import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInboxComponent } from './main-inbox.component';

describe('MainInboxComponent', () => {
  let component: MainInboxComponent;
  let fixture: ComponentFixture<MainInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
