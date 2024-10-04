import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePrivateGalleriesComponent } from './manage-private-galleries.component';

describe('ManagePrivateGalleriesComponent', () => {
  let component: ManagePrivateGalleriesComponent;
  let fixture: ComponentFixture<ManagePrivateGalleriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePrivateGalleriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePrivateGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
