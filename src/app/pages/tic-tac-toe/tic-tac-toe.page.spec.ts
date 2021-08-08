import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToePage } from './tic-tac-toe.page';

describe('TicTacToePage', () => {
  let component: TicTacToePage;
  let fixture: ComponentFixture<TicTacToePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicTacToePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
