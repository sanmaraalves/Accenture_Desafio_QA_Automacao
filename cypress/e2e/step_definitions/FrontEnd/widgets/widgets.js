
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Acessar o site
Given('Eu acesso o site {string}', (url) => {
  cy.visit(url);
});

//  Escolher a opção "Widgets" na página inicial
When('Eu escolho a opção {string} na página inicial', (menu) => {
  cy.contains(menu).click().wait(5000);
});

//  Clicar no submenu "Progress Bar"
When('Eu clico no submenu {string}', (submenu) => {
  cy.contains(submenu).click();
});

// Clicar no botão "Start"
When('Eu clico no botão {string}', (button) => {
  cy.get('#startStopButton').click(); // O ID do botão Start é "startStopButton"
});

//  Esperar até que a barra de progresso atinja 25%
When('Eu clico no botão Start para iniciar a barra de progresso', () => {
  // Clica no botão Start para iniciar a barra de progresso
  cy.get('#startButton').click(); // Verifique o ID ou a classe correta do botão
  cy.get('.progress-bar', { timeout: 20000 })  // Aguarda até que a barra de progresso esteja visível
    .should('exist');  // Garante que o elemento existe na página
});

When('Eu espero até que a barra de progresso atinja 25%', () => {
  cy.get('.progress-bar', { timeout: 20000 })
    .should('exist')  // Garante que o elemento existe
    .then(($el) => {
      // Primeiro tenta obter o valor de aria-valuenow
      let progressValue = $el.attr('aria-valuenow');  // Pode ser 0 ou algum outro valor

      // Se o atributo aria-valuenow não existir ou estiver vazio, tentamos o estilo width
      if (!progressValue) {
        const widthStyle = $el.css('width');  // Obtém o estilo de largura (como "50%" ou "200px")
        
        // Se a largura estiver em porcentagem ("50%"), converte para número
        if (widthStyle.includes('%')) {
          progressValue = parseInt(widthStyle);  // Converte de "50%" para número (50)
        }
        // Se a largura estiver em pixels ("100px"), também converte para número
        else if (widthStyle.includes('px')) {
          progressValue = parseInt(widthStyle);  // Converte de "100px" para número (100)
        }
      }

      // Certifica que o valor de progressValue seja um número
      progressValue = Number(progressValue);  // Garantir que seja tratado como número

      // Se progressValue ainda não for um número válido, lançamos erro
      if (isNaN(progressValue)) {
        throw new Error('O valor do progresso não é um número válido');
      }

      cy.log(`Progress Value: ${progressValue}`);  // Log do valor

      // Agora podemos comparar com 26, pois progressValue é um número
      expect(progressValue).to.be.lessThan(26);  // Verifica se o valor de progresso é menor que 26%
    });
});


// Validar que o valor da progress bar é menor ou igual a 25%
Then('O valor da progress bar deve ser menor ou igual a 25%', () => {
  // Clica no botão Start
  cy.get('#startStopButton', { timeout: 10000 })
    .should('be.visible')  // Garante que o botão está visível
    .click();  // Clica no botão Start/Stop

  // Espera até que a barra de progresso tenha avançado até 25% (aproximadamente)
  cy.get('.progress-bar', { timeout: 20000 })
    .should('be.visible')  // Garante que o elemento está visível
    .then(($el) => {
      // Acessa as dimensões do elemento usando getBoundingClientRect()
      const rect = $el[0].getBoundingClientRect();
      const progressWidthPx = rect.width; // Largura da barra de progresso

      // Acessando o contêiner da barra de progresso
      const parentRect = $el.parent()[0].getBoundingClientRect();
      const parentWidthPx = parentRect.width; // Largura do contêiner pai

      // Calculando a porcentagem de progresso
      const progressPercentage = (progressWidthPx / parentWidthPx) * 100;

      // Log para depuração
      cy.log(`Progress Width: ${progressWidthPx}px`);
      cy.log(`Parent Width: ${parentWidthPx}px`);
      cy.log(`Progress Percentage: ${progressPercentage}%`);

      // Verifica se o progresso é menor que 25%
      expect(progressPercentage).to.be.lessThan(26);  // Verifica se o valor de progresso é menor que 25%
    });

  // Aguarda um tempo para garantir que a progressão tenha avançado
  cy.wait(1000);
});

Then('O valor da progress bar deve estar entre 99% e 100%', () => {
  // Clica no botão Start
  cy.get('#startStopButton')
    .should('be.visible')
    .click();

  // Espera até que a barra de progresso tenha avançado (ajuste o timeout conforme necessário)
  cy.get('.progress-bar', { timeout: 30000 }) // Aumentando o timeout
    .should('be.visible')
    .then(($el) => {
      // Obtém o valor do atributo aria-valuenow ou a largura da barra, se necessário
      const progressValue = parseFloat($el.attr('aria-valuenow'));  // Supondo que aria-valuenow seja usado

      // Log para depuração
      cy.log(`Progress Value (aria-valuenow): ${progressValue}`);

      // Verifica se o valor de progresso é válido
      expect(progressValue).to.be.a('number').and.to.be.greaterThan(0);  // Assegura que o valor é válido

      // Converte para porcentagem, se necessário
      const progressPercentage = progressValue * 100;  // Converte de [0, 1] para [0%, 100%]

      // Log para verificar o valor percentual
      cy.log(`Progress Percentage: ${progressPercentage}%`);

      // Verifica se o valor está entre 99% e 100%
      expect(progressPercentage).to.be.greaterThan(99);  // Verifica se o progresso é maior que 99%
      expect(progressPercentage).to.be.lessThan(101);   // Verifica se o progresso é menor que 101%
      
    });
});

// Aperta "Start" novamente para continuar o progresso até 100%
When('Eu aperto "Start" novamente', () => {
  cy.get('#startStopButton').click();
  cy.wait(500); // Aguarda meio segundo para garantir que o estado tenha mudado
});

Then('A progress bar deve ser resetada para 0%', () => {
  cy.get('.progress-bar', { timeout: 20000 })
    .should('be.visible')
    .then(($el) => {
      // Obtém a largura da barra de progresso
      const progressWidth = parseFloat($el.css('width'));
      cy.log(`Progress Width: ${progressWidth}px`);

      // Verifica se a largura é pequena o suficiente para ser considerada 'resetada'
      expect(progressWidth).to.be.below(10);  // Permitimos um valor abaixo de 10px, o que significa que está perto de 0%
    });
});















