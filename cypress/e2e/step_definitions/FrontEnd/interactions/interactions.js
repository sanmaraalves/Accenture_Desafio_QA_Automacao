// Importação do pacote necessário para drag and drop
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import 'cypress-real-events'; // Para suportar drag and drop
import '@4tw/cypress-drag-drop';


Given('Eu acesso o site {string}', (url) => {
  cy.visit(url);
  cy.get('body').should('be.visible'); // Garantir que o corpo da página foi carregado
});

When('Eu escolho a opção {string} na página inicial', (option) => {
  cy.contains(option).click(); // Clica na opção "Interactions"
 // cy.url().should('include', '/interactions'); // Verifica que a URL está correta
});

When('Eu clico no submenu {string}', (submenu) => {
  cy.contains(submenu).click();
  cy.url().should('include', 'sortable'); // Verifica que o submenu foi carregado corretamente
});

When('Eu ordeno os elementos na ordem crescente usando drag and drop', () => {
  cy.wait(2000);  // Aguarda o carregamento de qualquer recurso necessário

  // Verifica que o elemento de destino demo-tabpane-list está visível
  cy.get('.tab-content', { timeout: 20000 })  // Aumenta o tempo de espera para garantir que o elemento seja encontrado
    .should('exist')  // Verfica que o elemento existe
    .and('be.visible')  // Verifica que o elemento está visível
    .scrollIntoView({ duration: 500 })  // Rola até o elemento, se necessário, para garantir que ele esteja visível
    .then((targetElement) => {
      cy.log('Elemento tab-content encontrado:', targetElement);  // Log para depuração

      // Agora você pode realizar o drag-and-drop com o item
      cy.get('.list-group-item.list-group-item-action').first()
        .drag(targetElement, { force: true });  // Realiza o drag-and-drop para o alvo encontrado
    })
    .then(() => {
      cy.log('Drag-and-drop concluído!');
    });

  // Captura de falhas com logs personalizados
  cy.on('fail', (err) => {
    cy.log('Erro detectado durante o teste:', err.message);
    throw err;  // Lança o erro novamente para falhar o teste
  });
});

Then('Os elementos devem estar na ordem crescente', () => {
  // Verifica se os elementos estão na ordem correta após o drag and drop
  cy.get('.tab-content')
    .find('li')
    .should(($items) => {
      const texts = $items.map((i, el) => el.innerText).get();
      const sortedTexts = [...texts].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
      expect(texts).to.deep.equal(sortedTexts);
    });
});
