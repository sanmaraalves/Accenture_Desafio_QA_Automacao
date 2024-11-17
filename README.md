# Accenture Desafio QA
Este projeto é uma solução de automação de testes desenvolvida com o Cypress e suporte para a escrita de testes em BDD utilizando o Cucumber. Ele foi projetado para testar uma aplicação baseada na URL base "https://demoqa.com".

# Dependências Principais
Cypress: Framework para automação de testes de ponta a ponta.
Cucumber: Integrado ao Cypress para suporte a testes baseados em BDD (Behavior-Driven Development).

# Outras Dependências:
@4tw/cypress-drag-drop: Extensão do Cypress para suporte a ações de arrastar e soltar.
cypress-file-upload: Plugin para upload de arquivos.
cypress-real-events: Extensão para simular eventos reais do navegador.

# Estrutura de Arquivos
![image](https://github.com/user-attachments/assets/edc0a107-5e1b-4010-b790-f912114a53fc)



## Executando os Testes

Para executar os testes de API (backend) ou o teste com elementos visuais (front), ambos podem ser rodados nos dois modos: interativo ou em modo headless.

### Modo Interativo

Este comando abre a interface do Cypress, onde você pode selecionar e visualizar a execução dos testes.

```bash
npx cypress open
```

### Modo Headless

Este comando executa todos os testes automaticamente no terminal, gerando relatórios que podem ser revisados posteriormente.

```bash
npx cypress run
```
