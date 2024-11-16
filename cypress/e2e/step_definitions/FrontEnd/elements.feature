Feature: Gerenciamento de registros em Web Tables

  Scenario: Acessar o site e realizar ações em Web Tables
    Given Acessar o site "https://demoqa.com/"
    When Escolher a opção "Elements" na página inicial
    And Clicar no submenu "Web Tables"
    And Criar um novo registro
    And Editar o novo registro criado
    And Deletar o novo registro criado

  Scenario: Criar e Deletar 12 novos registros
    Given Acessar o site "https://demoqa.com/"
    When Escolher a opção "Elements" na página inicial
    And Clicar no submenu "Web Tables"
    And Criar 12 novos registros dinamicamente
    And Deletar todos os registros criados

