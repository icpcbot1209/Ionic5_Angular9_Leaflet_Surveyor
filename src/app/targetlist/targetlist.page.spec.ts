import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TargetlistPage } from './targetlist.page';

describe('TargetlistPage', () => {
  let component: TargetlistPage;
  let fixture: ComponentFixture<TargetlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TargetlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
