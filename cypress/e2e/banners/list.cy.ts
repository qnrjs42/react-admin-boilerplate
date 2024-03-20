import { cyLogin } from '../../support/commands';

describe('로그인', () => {
  beforeEach(() => {
    cyLogin();

    cy.visit('/admin/banners/all-list/1');
  });

  it('sidebar widget active', () => {
    // 배너 관리 active
    cy.get('[data-test-id="sidebar-배너 관리"]').should('have.class', 'bg-primary');
    cy.get('[data-test-id="sidebar-배너 전체 리스트"]').should('have.class', 'bg-primary');
  });

  it('content widget exist', () => {
    cy.get('[data-test-id="content-배너 전체 리스트"]').should('exist');
  });

  it('table search exist', () => {
    cy.get('[data-test-id="table-total"]').should('exist');

    cy.get('[data-test-id="table-search"]').type('1');
    cy.get('[data-test-id="table-search-submit"]').click();

    cy.url().should('include', '?search=1');
  });

  it('table list exist', () => {
    cy.get('[data-test-id="table-image-item"]').should('exist');
    cy.get('[data-test-id="table-text-item"]').should('exist');
    cy.get('[data-test-id="table-external-link-item"]').should('exist');
    cy.get('[data-test-id="table-toggle-show-button"]').should('exist');
    cy.get('[data-test-id="table-delete-button"]').should('exist');
  });

  it('table toggle show event', () => {
    cy.get('[data-test-id="table-toggle-show-button"]').then(items => {
      if (items.length < 1) return;

      if (items[0].textContent === '노출') {
        items[0].click();

        cy.wait(2000).then(() => {
          expect(items[0].textContent).to.equal('중지');
        });
      } else {
        items[0].click();
        cy.wait(2000).then(() => {
          expect(items[0].textContent).to.equal('노출');
        });
      }
    });
  });

  it('table delete event', () => {
    cy.get('[data-test-id="table-delete-button"]').then(items => {
      if (items.length < 1) return;

      items[1].click();

      cy.get('[data-test-id="delete-button"]').click();

      cy.wait(2000).then(() => {
        cy.get('[data-test-id="table-text-item"]').should('have.length', items.length - 1);
      });
    });
  });

  it('table click item event', () => {
    cy.get('[data-test-id="table-text-item"]').then(items => {
      if (items.length < 1) return;

      items[0].click();

      cy.get('[data-test-id="content-배너 상세"]').should('exist');
    });
  });

  it('create button click event', () => {
    cy.get('[data-test-id="create-banner-button"]').click();

    cy.get('[data-test-id="content-배너 등록"]').should('exist');
  });
});
