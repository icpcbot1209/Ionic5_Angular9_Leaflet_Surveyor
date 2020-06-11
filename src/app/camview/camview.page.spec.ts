import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CamviewPage } from './camview.page';

describe('CamviewPage', () => {
  let component: CamviewPage;
  let fixture: ComponentFixture<CamviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CamviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
