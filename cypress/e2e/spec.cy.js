
import React from 'react'
import Game from '../../src/Game'
//import TestWinner from '../support/TestWinner'


describe('spec.cy.js', () => {

  beforeEach(() => {

    cy.visit('http://localhost:3000');

    cy.contains('Next Player: X');

    cy.url().should('include', 'localhost');

  })

  it ('Winner: X', () => {

    const winnerX = [2, 4, 8, 7, 9]

    expect(cy.TestWinner(winnerX, "Winner: X")).eq(true);

  })


  it ('Winner: O', () => {


    const winnerO = [1, 2, 0, 5, 4, 8];

    expect(cy.TestWinner(winnerO, "Winner: O")).eq(null);

  })




})