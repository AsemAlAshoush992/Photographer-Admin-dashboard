import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublicGalleryComponent } from './create-public-gallery.component';

describe('CreatePublicGalleryComponent', () => {
  let component: CreatePublicGalleryComponent;
  let fixture: ComponentFixture<CreatePublicGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePublicGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePublicGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
