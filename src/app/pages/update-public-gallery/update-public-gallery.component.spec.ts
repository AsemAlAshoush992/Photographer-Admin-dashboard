import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePublicGalleryComponent } from './update-public-gallery.component';

describe('UpdatePublicGalleryComponent', () => {
  let component: UpdatePublicGalleryComponent;
  let fixture: ComponentFixture<UpdatePublicGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePublicGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePublicGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
