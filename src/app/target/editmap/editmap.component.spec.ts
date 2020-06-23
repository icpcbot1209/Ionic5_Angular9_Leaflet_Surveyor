import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditmapComponent } from './editmap.component';

describe('EditmapComponent', () => {
  let component: EditmapComponent;
  let fixture: ComponentFixture<EditmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
