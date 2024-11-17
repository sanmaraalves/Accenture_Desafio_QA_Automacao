Given('Acessar o site {string}', (url) => {
  cy.visit(url);
});

When('Escolher a opção {string} na página inicial', (option) => {
  cy.contains(option).click();
});

When('Clicar no submenu {string}', (submenu) => {
  cy.contains(submenu).click();
});

When('Criar um novo registro', () => {
  // Clica no botão para adicionar um novo registro
  cy.get('#addNewRecordButton').click();
  
  // Preenche os campos do formulário
  cy.get('#firstName').type('User8');
  cy.get('#lastName').type('Last8');
  cy.get('#userEmail').type('user8@example.com');
  cy.get('#age').type('28');
  cy.get('#salary').type('8000');
  cy.get('#department').type('IT');
  
  // Submete o formulário
  cy.get('#submit').click();
});

When('Editar o novo registro criado', () => {
  
  
  cy.get('.rt-tr-group')  
  .should('be.visible');  
  cy.get('#edit-record-4').click({ force: true });          // Clica no botão de editar
  // Espera que o campo de primeiro nome seja visível e edita
  cy.get('#firstName', { timeout: 10000 }).should('be.visible').clear().type('UpdatedUser8');
  cy.get('#lastName').clear().type('UpdatedLast8');  // Atualiza o sobrenome

  // Submete a edição
  cy.get('#submit').click();  
});

When('Deletar o novo registro criado', () => {
  // Clica no botão de excluir do registro editado
  cy.get('.rt-tr-group')  // Se o campo estiver dentro de um modal
  .should('be.visible'); 
  cy.get('#delete-record-4').click({ force: true });     
});

When('Criar 12 novos registros dinamicamente', () => {
  for (let i = 1; i <= 12; i++) {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(`User${i}`);
    cy.get('#lastName').type(`Last${i}`);
    cy.get('#userEmail').type(`user${i}@example.com`);
    cy.get('#age').type('28');
    cy.get('#salary').type('8000');
    cy.get('#department').type('IT');
    cy.get('#submit').click();
  }
});

When('Deletar todos os registros criados', () => {
  // Deleta os 12 registros criados
  cy.get('.rt-tr-group')  
  .should('be.visible'); 
  cy.get('#delete-record-4').click({ force: true });
  cy.get('#delete-record-5').click({ force: true });
  cy.get('#delete-record-6').click({ force: true });
  cy.get('#delete-record-7').click({ force: true });
  cy.get('#delete-record-8').click({ force: true });
  cy.get('#delete-record-9').click({ force: true });
  cy.get('#delete-record-10').click({ force: true });
  cy.get('#delete-record-11').click({ force: true });
  cy.get('#delete-record-12').click({ force: true });
  cy.get('#delete-record-13').click({ force: true });
  cy.get('#delete-record-14').click({ force: true });
  cy.get('#delete-record-15').click({ force: true });

  
});

Then('A tabela deve estar vazia', () => {
  
  cy.get('.rt-tbody').should('not.contain', 'User8');
  cy.get('.rt-tbody').should('not.contain', 'UpdatedUser8');
});
