
import React from 'react'
import Game from '../../src/Game'
import '@percy/cypress'

describe('spec.cy.js', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.contains('Next Player: X');
    cy.url().should('include', 'localhost');
  })

  it ('Winner: X', () => {
    const winnerX = [2, 4, 8, 7, 5];
    expect(cy.TestWinner(winnerX, "Winner: X")).not.equal(null);
    cy.percySnapshot();
  })


  it ('Winner: O', () => {
    const winnerO = [1, 2, 0, 4, 6, 8, 7, 6, 8];
    //    const winnerO = [1, 2, 0, 5, 4, 7, 6, 8];
    expect(cy.TestWinner(winnerO, "Winner: O")).not.equal(null);
    cy.percySnapshot();
  })


  it ('Draw', () => {
    const draw = [1, 5, 7, 4, 3, 6, 2, 0, 8];
    expect(cy.TestWinner(draw, "Draw")).not.equal(null);
    cy.percySnapshot();
  })

  it ('Toggle Move History Order', () => {
    const toggle = [1, 2, 0, 5];
    cy.TestWinner(toggle, "Next Player: X");
    cy.get('button[type=submit]').should('have.text', 'Toggle Move History Order').click();
    cy.percySnapshot();
  })


})