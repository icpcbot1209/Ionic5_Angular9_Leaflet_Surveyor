import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CameraViewPage } from './camera-view.page';

describe('CameraViewPage', () => {
  let component: CameraViewPage;
  let fixture: ComponentFixture<CameraViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
