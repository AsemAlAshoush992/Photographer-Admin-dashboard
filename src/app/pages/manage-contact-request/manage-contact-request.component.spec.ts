import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContactRequestComponent } from './manage-contact-request.component';

describe('ManageContactRequestComponent', () => {
  let component: ManageContactRequestComponent;
  let fixture: ComponentFixture<ManageContactRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageContactRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageContactRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
