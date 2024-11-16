Feature: Preenchimento do formulário no Demo QA

  Scenario: Acessar o formulário e preencher com valores aleatórios
    Given que eu acessei o site "https://demoqa.com/"
    And eu escolhi a opção "Forms" na página inicial
    And eu cliquei no submenu "Practice Form"
    When eu preencho o formulário com valores aleatórios
      | Campo           | Valor               |
      | First Name      | John                |
      | Last Name       | Doe                 |
      | Email           | johndoe@example.com |
      | Gender          | Male                |
      | Mobile Number   | 1234567890          |
      | Date of Birth   | 01 January 1990     |
      | Subject         | Maths               |
      | Hobby           | Sports              |
      | Address         | 123 Main St, City, Country |
    And eu faço upload de um arquivo "exemplo.txt" no campo de upload
    And eu seleciono o estado "NCR" e a cidade "Delhi"
    And eu submeto o formulário
    Then eu vejo um popup de confirmação
    And eu fecho o popup
