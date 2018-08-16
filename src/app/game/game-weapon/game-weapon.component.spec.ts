import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWeaponComponent } from './game-weapon.component';

describe('GameComponent', () => {
  let component: GameWeaponComponent;
  let fixture: ComponentFixture<GameWeaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameWeaponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
