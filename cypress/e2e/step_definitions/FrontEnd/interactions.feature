Feature: Ordenação de elementos com drag and drop

  Scenario: Ordenar elementos de forma crescente usando drag and drop
    Given Eu acesso o site "https://demoqa.com/"
    When Eu escolho a opção "Interactions" na página inicial
    And Eu clico no submenu "Sortable"
    And Eu ordeno os elementos na ordem crescente usando drag and drop
    Then Os elementos devem estar na ordem crescente
