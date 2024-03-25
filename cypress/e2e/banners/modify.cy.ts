import { cyLogin } from '../../support/commands';

describe('배너 등록', () => {
  beforeEach(() => {
    cyLogin();

    cy.visit('/admin/banner/all-list/1');
  });

  it('리스트에서 접근', () => {
    cy.get(':nth-child(1) > [data-test-id="table-text-item"]').click();
    cy.get('#\\:r67\\:-form-item').click();
    cy.get('#\\:r69\\:-form-item').click();
    cy.get('#\\:r69\\:-form-item').clear();
    cy.get('#\\:r69\\:-form-item').type('배너1222');
    cy.get('#\\:r6b\\:-form-item').clear();
    cy.get('#\\:r6b\\:-form-item').type('https://www.google.com');

    cy.get('input[type=file]').attachFile('upload-image.jpg');

    cy.get('.justify-end > .bg-primary').click();

    cy.url().should('include', 'all-list');
  });
});
