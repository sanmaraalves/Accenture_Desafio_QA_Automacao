// Importar dependências do Cypress
const { Given, When, Then } = require("cypress-cucumber-preprocessor/steps");

// Passo 1: Acessar o site
Given("que eu acessei o site {string}", (url) => {
  cy.visit(url);
});

// Passo 2: Escolher a opção "Alerts, Frame & Windows" na página inicial
When('Escolher a opção Alerts, Frame & Windows na página inicial', () => {
  cy.contains('Alerts, Frame & Windows').click(); // Clica na opção
});

// Passo 3: Clicar no submenu "Browser Windows"
When('Clicar no submenu "Browser Windows"', () => {
  cy.contains('Browser Windows').click(); // Clica no submenu
});

// Passo 4: Clicar no botão "New Window"
When('Clicar no botão "New Window"', () => {
  cy.contains('New Window').click(); // Clica no botão "New Window"
});

// Passo 5: Certificar-se que uma nova janela foi aberta
Then('Certificar-se que uma nova janela foi aberta', () => {
  // Substitui a função window.open para interceptar quando for chamada
  cy.window().then((win) => {
    const openStub = cy.stub(win, 'open').callsFake(() => {
      return null; // Não faz nada com a chamada, só intercepta a função
    });

    // Executa a ação que deve abrir a nova janela
    cy.contains('New Window').click();

    // Verifica se a função window.open foi chamada
    cy.wrap(openStub).should('be.called');
  });
});


// Passo 6: Validar que a mensagem "This is a sample page" está presente
Then('Validar que a mensagem "This is a sample page" está presente', () => {
  // Espera um pouco mais para garantir que a nova página ou aba foi carregada
  cy.wait(5000); // Ajuste o tempo de espera conforme necessário
  
  // Verifica se o corpo da página contém o texto esperado
  cy.get('body').title('This is a sample page');
});


// Passo 7: Fechar a nova janela aberta   
Then('Fechar a nova janela aberta', () => {
  cy.window().then((win) => {
    // Fechar a nova janela
    win.close();
  });
});
