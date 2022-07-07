import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewResponsiveComponent } from './image-view-responsive.component';

describe('ImageViewResponsiveComponent', () => {
  let component: ImageViewResponsiveComponent;
  let fixture: ComponentFixture<ImageViewResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageViewResponsiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
