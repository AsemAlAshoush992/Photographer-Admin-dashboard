import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrivateGalleryComponent } from './create-private-gallery.component';

describe('CreatePrivateGalleryComponent', () => {
  let component: CreatePrivateGalleryComponent;
  let fixture: ComponentFixture<CreatePrivateGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePrivateGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePrivateGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
