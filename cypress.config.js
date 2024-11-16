const cucumber = require('cypress-cucumber-preprocessor').default
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
                
       },
      })
      on('file:preprocessor', cucumber())
    
      // implement node event listeners here
      //on('file:preprocessor', cucumber())
   
  return config;
},
    
        // Ajuste o padrão para localizar seus testes
        specPattern: [
          'cypress/e2e/step_definitions/**/*.feature',   // Arquivos de BDD/Feature
          'cypress/e2e/**/*.cy.js',                       // Arquivos de testes Cypress (.cy.js)
          'cypress/e2e/api-tests/**/*.cy.js'              // Arquivos de testes de API
        ],

     baseUrl: "https://demoqa.com",
    
  },
});
