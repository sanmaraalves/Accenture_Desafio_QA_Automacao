import "cypress-file-upload";

Given("que eu acessei o site {string}", (url) => {
  cy.visit(url);
});

Given("eu escolhi a opção {string} na página inicial", (menuOption) => {
  cy.contains(menuOption).click();
});

Given("eu cliquei no submenu {string}", (submenu) => {
  cy.contains(submenu).click();
});

When("eu preencho o formulário com valores aleatórios", (dataTable) => {
  const data = dataTable.rowsHash();
  cy.get("#firstName").type(data["First Name"]);
  cy.get("#lastName").type(data["Last Name"]);
  cy.get("#userEmail").type(data["Email"]);
  cy.get(`input[name="gender"][value="${data["Gender"]}"]`).check({ force: true });
  cy.get("#userNumber").type(data["Mobile Number"]);
  
  // Data de nascimento
  cy.get("#dateOfBirthInput").click();
  cy.get(".react-datepicker__year-select").select("1990");
  cy.get(".react-datepicker__month-select").select("January");
  cy.get(".react-datepicker__day--001").first().click();

  
  // Assunto e hobbies
  cy.get(".subjects-auto-complete__value-container").type(data["Subject"] + "{enter}");
  cy.get('input[type="checkbox"][value="1"]').check({ force: true });
  // Seleciona o hobby

  // Endereço
  cy.get("#currentAddress").type(data["Address"]);
});

When("eu faço upload de um arquivo {string} no campo de upload", (filename) => {
  cy.get("#uploadPicture").attachFile(filename);
});

When("eu seleciono o estado {string} e a cidade {string}", (estado, cidade) => {
  // Abrir o dropdown de estado
  cy.get('#state > .css-yk16xz-control > .css-1hwfws3').click(); 
  
  // Selecionar o estado
  cy.get('.css-26l3qy-menu').contains(estado).click(); 
  
  // Abrir o dropdown de cidade
  cy.get('#city > .css-yk16xz-control > .css-1hwfws3').click();
  
  // Selecionar a cidade
  cy.get('.css-26l3qy-menu').contains(cidade).click();

  
});

When("eu submeto o formulário", () => {
  cy.get("#submit").click();
});

Then("eu vejo um popup de confirmação", () => {
  cy.get(".modal-content").should("be.visible");
});

Then("eu fecho o popup", () => {
  cy.get("#closeLargeModal").click({ force: true });
});

