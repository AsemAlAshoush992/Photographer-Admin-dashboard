import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePublicGalleriesComponent } from './manage-public-galleries.component';

describe('ManagePublicGalleriesComponent', () => {
  let component: ManagePublicGalleriesComponent;
  let fixture: ComponentFixture<ManagePublicGalleriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePublicGalleriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePublicGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
