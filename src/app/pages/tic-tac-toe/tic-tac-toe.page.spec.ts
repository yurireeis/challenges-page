import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Condition } from './enums/condition';
import { TicTacToeModule } from './tic-tac-toe.module';

import { TicTacToePage } from './tic-tac-toe.page';

describe('TicTacToePage', () => {
  let component: TicTacToePage;
  let fixture: ComponentFixture<TicTacToePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TicTacToePage]
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

  const victoryCombinations = [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'b2', 'c3'],
    ['a3', 'b2', 'c1'],
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['a1', 'c1', 'c2', 'c3'],
    ['a2', 'a1', 'b1', 'c1'],
    ['a3', 'a2', 'b2', 'c2'],
    ['c1', 'a3', 'b3', 'c3'],
    ['c2', 'a1', 'b2', 'c3'],
    ['c3', 'a3', 'b2', 'c1']
  ];

  victoryCombinations.forEach(combination => {
    it('should give winner condition', () => {
      var result = component.checkVictoryCondition(combination);
      expect(result).toEqual(Condition.WINNER);
    });
  });

  const onprogressCombinations = [
    ['a1', 'a2', 'b3'],
    ['b1', 'b2', 'c3'],
    ['c1', 'c2', 'a3'],
    ['a1', 'b1', 'c2'],
    ['a2', 'b2', 'c3'],
    ['a3', 'b3', 'c1'],
    ['a1', 'b2', 'c2'],
    ['a3', 'b2', 'a1'],
    ['a1', 'a2', 'b3'],
    ['b1', 'b2', 'c3'],
    ['a1', 'c1', 'c2', 'b3'],
    ['a2', 'a1', 'b1', 'c3'],
    ['a3', 'a2', 'b2', 'c3'],
    ['c1', 'a3', 'b3', 'c2'],
    ['c2', 'a1', 'b2', 'a3'],
    ['c3', 'a3', 'b2', 'c2']
  ];

  onprogressCombinations.forEach(combination => {
    it('should give onprogress condition', () => {
      var result = component.checkVictoryCondition(combination);
      expect(result).toEqual(Condition.ON_PROGRESS);
    });
  });

  it('should give victory to player one (cross player)', () => {
    component.resetConditions();
    component.squareSelected(0, 0);
    component.squareSelected(0, 1);
    component.squareSelected(1, 0);
    component.squareSelected(1, 1);
    component.squareSelected(2, 0);
    spyOn(component.gameStatus, 'subscribe').and.callThrough();
    expect(component.isPlayerOne).toBeTruthy();
  });

  it('should give victory to player two (circle player)', () => {
    component.resetConditions();
    component.squareSelected(0, 0);
    component.squareSelected(0, 1);
    component.squareSelected(1, 0);
    component.squareSelected(1, 1);
    component.squareSelected(0, 2);
    component.squareSelected(2, 1);
    spyOn(component.gameStatus, 'subscribe').and.callThrough();
    expect(component.isPlayerOne).toBeFalsy();
  });

  it('should give tie (draw game)', () => {
    component.resetConditions();
    component.squareSelected(0, 0);
    component.squareSelected(0, 1);
    component.squareSelected(0, 2);
    component.squareSelected(1, 2);
    component.squareSelected(2, 2);
    component.squareSelected(2, 1);
    component.squareSelected(2, 0);
    component.squareSelected(1, 0);
    component.squareSelected(1, 1);
    spyOn(component.gameStatus, 'subscribe').and.callThrough();
    expect(component.tieGame).toBeTruthy();
  });

  it('should not pass the turn if select the same square (must be player two yet)', () => {
    component.resetConditions();
    component.squareSelected(0, 0);
    component.squareSelected(0, 0);
    expect(component.isPlayerOne).toBeFalsy();
  });

  it('should pass the turn if select another square (must be cross player)', () => {
    component.resetConditions();
    component.squareSelected(0, 0);
    component.squareSelected(0, 1);
    expect(component.isPlayerOne).toBeTruthy();
  });

  it('should finish the game after a tie condition is achieved', () => {
    component.resetConditions();
    component.squareSelected(0, 0);
    component.squareSelected(0, 1);
    component.squareSelected(0, 2);
    component.squareSelected(1, 2);
    component.squareSelected(2, 2);
    component.squareSelected(2, 1);
    component.squareSelected(2, 0);
    component.squareSelected(1, 0);
    component.squareSelected(1, 1);
    spyOn(component.gameStatus, 'subscribe').and.callThrough();
    expect(component.gameEnded).toBeTruthy();
  });

  it('should finish the game after a player wins (cross player)', () => {
    component.resetConditions();
    component.squareSelected(0, 0);
    component.squareSelected(0, 1);
    component.squareSelected(1, 0);
    component.squareSelected(1, 1);
    component.squareSelected(2, 0);
    spyOn(component.gameStatus, 'subscribe').and.callThrough();
    expect(component.gameEnded).toBeTruthy();
  });

  it('should not let more selections after a winner condition is achieved (cross player)', () => {
    component.resetConditions();
    component.squareSelected(0, 0);
    component.squareSelected(0, 1);
    component.squareSelected(1, 0);
    component.squareSelected(1, 1);
    component.squareSelected(2, 0);
    component.squareSelected(2, 1);
    spyOn(component.gameStatus, 'subscribe').and.callThrough();
    expect(component.isPlayerOne).toBeTruthy();
  });
});
