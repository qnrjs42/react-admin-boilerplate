import { cyLogin } from '../../support/commands';

describe('배너 등록', () => {
  beforeEach(() => {
    cyLogin();

    cy.visit('/admin/banner/create');
  });

  it('sidebar widget active', () => {
    // 배너 관리 active
    cy.get('[data-test-id="sidebar-배너 관리"]').should('have.class', 'bg-primary');
  });

  it('content widget exist', () => {
    cy.get('[data-test-id="content-배너 등록"]').should('exist');
  });

  it('정상 등록', () => {
    cy.visit('/admin/banner/all-list/1');
    cy.visit('/admin/banner/create');

    cy.get('#\\:r5\\:-form-item').click();
    cy.get('#\\:r7\\:-form-item').clear();
    cy.get('#\\:r7\\:-form-item').type('배너 테스트');
    cy.get('#\\:r9\\:-form-item').clear();
    cy.get('#\\:r9\\:-form-item').type('https://www.naver.com');
    cy.get('input[type=file]').attachFile('upload-image.jpg');
    cy.get('.justify-end > .inline-flex').click();

    cy.url().should('not.include', '/admin/banner/create');
  });
});
