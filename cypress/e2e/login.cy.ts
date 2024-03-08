describe('로그인', () => {
  beforeEach(() => {
    // check baseurl "cypress.config.ts"
    cy.visit('/login');
  });

  it('이메일 제대로 입력 안 했을 때 로그인 실패 확인', () => {
    // 이메일 입력 안 했을 때
    cy.get('#\\:r1\\:-form-item').clear();
    cy.get('.inline-flex').click();
    cy.url().should('include', '/login');

    // 이메일 형식이 아닐 때
    cy.get('#\\:r1\\:-form-item').type('dfsdfsd');
    cy.get('.inline-flex').click();

    cy.url().should('include', '/login');
  });

  it('비밀번호 제대로 입력 안 했을 때 로그인 실패 확인', () => {
    cy.get('#\\:r1\\:-form-item').clear();
    cy.get('#\\:r1\\:-form-item').type('asd@asd.com');

    // 비밀번호 입력 안 했을 때
    cy.get('#\\:r3\\:-form-item').clear();
    cy.get('.inline-flex').click();
    cy.url().should('include', '/login');

    // 비밀번호 50자 초과일 때
    cy.get('#\\:r3\\:-form-item').type('asd'.repeat(50));
    cy.get('.inline-flex').click();
    cy.url().should('include', '/login');
  });

  it('로그인 성공', () => {
    cy.get('#\\:r1\\:-form-item').clear();
    cy.get('#\\:r1\\:-form-item').type('dfsdfsdfasdf@asdasd.com');
    cy.get('#\\:r3\\:-form-item').clear();
    cy.get('#\\:r3\\:-form-item').type('asdasdasd');
    cy.get('.inline-flex').click();

    cy.url().should('not.include', '/login');
  });
});
