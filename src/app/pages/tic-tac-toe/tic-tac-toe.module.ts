import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToePage } from './tic-tac-toe.page';
import { TicTacToeRoutingModule } from './tic-tac-toe-routing.module';



@NgModule({
  declarations: [TicTacToePage],
  imports: [
    CommonModule,
    TicTacToeRoutingModule
  ]
})
export class TicTacToeModule { }
