Feature: Verificação de novas janelas no site DemoQA

  Scenario: Abrir uma nova janela e validar o conteúdo
    Given que eu acessei o site "https://demoqa.com/"
    When Escolher a opção Alerts, Frame & Windows na página inicial
    And Clicar no submenu "Browser Windows"
    And Clicar no botão "New Window"
    Then Certificar-se que uma nova janela foi aberta
    And Validar que a mensagem "This is a sample page" está presente
    And Fechar a nova janela aberta

