import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTechnicalSupportComponent } from './manage-technical-support.component';

describe('ManageTechnicalSupportComponent', () => {
  let component: ManageTechnicalSupportComponent;
  let fixture: ComponentFixture<ManageTechnicalSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTechnicalSupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTechnicalSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
