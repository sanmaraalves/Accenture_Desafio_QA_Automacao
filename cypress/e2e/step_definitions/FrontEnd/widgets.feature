Feature: Interagir com a Progress Bar no demoqa.com

  Scenario: Controlar a Progress Bar e validar seu comportamento
    Given Eu acesso o site "https://demoqa.com/"
    When Eu escolho a opção "Widgets" na página inicial
    And Eu clico no submenu "Progress Bar"
    And Eu clico no botão "Start"
    And Eu espero até que a barra de progresso atinja 25%
    Then O valor da progress bar deve ser menor ou igual a 25%
    Then O valor da progress bar deve estar entre 99% e 100%
    When Eu aperto "Start" novamente
    Then A progress bar deve ser resetada para 0%
