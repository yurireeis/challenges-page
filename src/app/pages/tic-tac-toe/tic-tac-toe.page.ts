import { Component } from '@angular/core';
import { Col } from './interfaces/tic-tac-toe';
import { intersection } from 'lodash';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Condition } from './enums/condition';
import { slideInAnimation } from 'src/app/animations/slide';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.page.html',
  styleUrls: ['./tic-tac-toe.page.scss'],
  animations: [slideInAnimation]
})
export class TicTacToePage {
  gameStatus = new Subject();
  playerOneWins = false;
  playerTwoWins = false;
  tieGame = false;
  gameEnded = false;
  isPlayerOne = true;
  playerOneAttempts: string[] = [];
  playerTwoAttempts: string[] = [];
  hasAWinner = false;
  winConditions: string[][] = [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'b2', 'c3'],
    ['a3', 'b2', 'c1']
  ];
  currentCondition: Col[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.resetConditions();
    this.gameStatus.pipe(
      filter(result => result != Condition.ON_PROGRESS)
    ).subscribe(result => {
      if (result === Condition.TIE) {
        this.tieGame = true;
      } else {
        if (this.isPlayerOne) {
          this.playerOneWins = true;
        } else {
          this.playerTwoWins = true;
        }
      }

      this.gameEnded = true;
    });
  }

  squareSelected(y: number, x: number) {
    const selectedColumn = this.currentCondition[y];
    const selectedSquare = selectedColumn.values[x];

    if (selectedSquare.isSelected || this.gameEnded) { return; }

    let result = Condition.ON_PROGRESS;

    selectedSquare.isSelected = true;
    selectedSquare.marquee = this.isPlayerOne ? 'X' : 'O';
    selectedSquare.color = this.isPlayerOne ? 'blue' : 'red';
    const coordinate = selectedColumn.name+selectedSquare.value;
    this.isPlayerOne ? this.playerOneAttempts.push(coordinate) : this.playerTwoAttempts.push(coordinate);
    let currentPlayerAttempts = this.isPlayerOne ? this.playerOneAttempts : this.playerTwoAttempts;

    const hasThreeOrMoreAttempts = currentPlayerAttempts.length > 2;

    if (hasThreeOrMoreAttempts) {
      currentPlayerAttempts = currentPlayerAttempts.sort();
      result = this.checkVictoryCondition(currentPlayerAttempts);
    }

    const hasEnoughAttempts = (this.playerOneAttempts.length + this.playerTwoAttempts.length) < 9;

    if (!hasEnoughAttempts) { result = Condition.TIE; }

    const gameInProgress = result === Condition.ON_PROGRESS;

    if (gameInProgress) { this.switchPlayer(); }

    this.gameStatus.next(result);
  }

  checkVictoryCondition(currentAttempts: string[]): Condition {
    const winCondition = this.winConditions.find(condition => {
      const matches = intersection(currentAttempts, condition);
      return matches.length >= 3;
    });

    const hasWinCondition = Boolean(winCondition);

    if (hasWinCondition) { return Condition.WINNER; }

    return Condition.ON_PROGRESS;
  }

  switchPlayer() { this.isPlayerOne = !this.isPlayerOne; }

  resetConditions() {
    this.isPlayerOne = true;
    this.playerOneWins = false;
    this.playerTwoWins = false;
    this.tieGame = false;
    this.currentCondition = this.getStartingCondition();
    this.playerOneAttempts = [];
    this.playerTwoAttempts = [];
    this.gameStatus.next('onprogress');
    this.gameEnded = false;
  }

  getStartingCondition(): Col[] {
    return [
      {
        name: 'a',
        values: [
          {
            value: 1,
            isSelected: false,
            marquee: '',
            color: ''
          },
          {
            value: 2,
            isSelected: false,
            marquee: '',
            color: ''
          },
          {
            value: 3,
            isSelected: false,
            marquee: '',
            color: ''
          }
        ]
      },
      {
        name: 'b',
        values: [
          {
            value: 1,
            isSelected: false,
            marquee: '',
            color: ''
          },
          {
            value: 2,
            isSelected: false,
            marquee: '',
            color: ''
          },
          {
            value: 3,
            isSelected: false,
            marquee: '',
            color: ''
          }
        ]
      },
      {
        name: 'c',
        values: [
          {
            value: 1,
            isSelected: false,
            marquee: '',
            color: ''
          },
          {
            value: 2,
            isSelected: false,
            marquee: '',
            color: ''
          },
          {
            value: 3,
            isSelected: false,
            marquee: '',
            color: ''
          }
        ]
      },
    ];
  }

  backToChallenges() {
    this.router.navigate(['']);
  }
}
