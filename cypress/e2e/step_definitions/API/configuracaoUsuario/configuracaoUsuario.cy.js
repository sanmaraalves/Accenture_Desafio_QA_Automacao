describe("Desafio QA - API Parte 1 - Configuração do Usuário", () => {
  const username = `Usuario${Math.random().toString(20).substring(2, 10)}`;
  const password = "Teste@123";

 it("Criar um usuário", () => {
    cy.request({
      method: "POST",
      url: "/Account/v1/User",
      body: { userName: username, password: password },
      log: false,
    }).then((response) => {
      expect(response.body).to.have.property("userID");
      expect(response.status).to.eq(201);
      Cypress.env("userId", response.body.userID);
      cy.task("log", `Usuário: ${username}`);
      cy.task("log", `Número de Identificação: ${response.body.userID}`);
    });
  });

  it("Gerar um token de acesso", () => {
    cy.request({
      method: "POST",
      url: "/Account/v1/GenerateToken",
      body: { userName: username, password: password },
      log: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      Cypress.env("token", response.body.token);
      cy.task("log", `Token de acesso: ${response.body.token}`);
    });
  });

  it("Confirmar se o usuário criado está autorizado", () => {
    cy.request({
      method: "POST",
      url: "/Account/v1/Authorized",
      body: { userName: username, password: password },
      log: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.true;
      cy.task("log", `Usuário autorizado: ${username}`);
    });
  });

  it("Listar os livros disponíveis", () => {
    cy.request({
      method: "GET",
      url: "/BookStore/v1/Books",
      log: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("books");
      const livros = response.body.books;
      cy.task("log", "Livros disponíveis:");
      livros.forEach((livro) => {
        cy.task("log", `- ${livro.title} (ISBN: ${livro.isbn})`);
      });
      Cypress.env("books", livros);
    });
  });

  it("Alugar dois livros de livre escolha", () => {
    const token = Cypress.env("token");
    const usuario = Cypress.env("userId");
    const livros = Cypress.env("books");
    const livrosEscolhidos = Cypress._.sampleSize(livros, 2);
    Cypress.env("selectedBooks", livrosEscolhidos);

    cy.task("log", "Detalhes dos livros selecionados para aluguel:");
    livrosEscolhidos.forEach((livro) => {
      cy.task("log", `Título: ${livro.title}`);
      cy.task("log", `Descrição: ${livro.description}`);
      cy.task("log", `Autor: ${livro.author}`);
      cy.task("log", `ISBN: ${livro.isbn}`);
      cy.task("log", `Publicação: ${livro.publish_date}`);
      cy.task("log", `Website: ${livro.website}`);
      cy.task("log", `Editora: ${livro.publisher}`);
      cy.task("log", `Páginas: ${livro.pages}`);
    });

    livrosEscolhidos.forEach((livro) => {
      cy.request({
        method: "POST",
        url: "/BookStore/v1/Books",
        headers: { Authorization: `Bearer ${token}` },
        body: { userId: usuario, collectionOfIsbns: [{ isbn: livro.isbn }] },
        log: false,
      }).then((response) => {
        expect(response.status).to.eq(201);
        cy.task("log", `Livro alugado com sucesso: ISBN ${livro.isbn}`);
      });
    });
  });

  it("Listar os detalhes do usuário com os livros escolhidos", () => {
    const token = Cypress.env("token");
    const userId = Cypress.env("userId");

    cy.request({
      method: "GET",
      url: `/Account/v1/User/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
      log: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("books");

      cy.task("log", "Informações do Usuário:");
      cy.task("log", `ID do Usuário: ${response.body.userId}`);
      cy.task("log", `Nome de Usuário: ${response.body.username}`);

      const livrosEscolhidos = Cypress.env("selectedBooks");
      const livroAlugadoIsbns = livrosEscolhidos.map((livro) => livro.isbn);
      expect(response.body.books.map(livro => livro.isbn)).to.include.members(livroAlugadoIsbns);

      cy.task("log", "Livros Alugados:");
      response.body.books.forEach((livro) => {
        cy.task("log", `Título: ${livro.title}`);
        cy.task("log", `Descrição: ${livro.description}`);
        cy.task("log", `Autor: ${livro.author}`);
        cy.task("log", `ISBN: ${livro.isbn}`);
        cy.task("log", `Publicação: ${livro.publish_date}`);
        cy.task("log", `Website: ${livro.website}`);
        cy.task("log", `Editora: ${livro.publisher}`);
        cy.task("log", `Páginas: ${livro.pages}`);
       
       
      });
    });
  });
});
