import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrivateGalleryComponent } from './update-private-gallery.component';

describe('UpdatePrivateGalleryComponent', () => {
  let component: UpdatePrivateGalleryComponent;
  let fixture: ComponentFixture<UpdatePrivateGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePrivateGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePrivateGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
