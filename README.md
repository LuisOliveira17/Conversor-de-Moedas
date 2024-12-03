# Conversor de Moedas

Conversor de moedas feito para a disciplina de PAM (Programação de Apps Mobile).

## Descrição do Aplicativo

O **Conversor de Moedas** é um aplicativo móvel desenvolvido em **React Native** que permite aos usuários converter valores em Reais (BRL) para várias outras moedas, como Dólar Americano (USD), Euro (EUR), Libra Esterlina (GBP), entre outras. O aplicativo busca as taxas de câmbio em tempo real, garantindo que os usuários tenham acesso às informações mais atualizadas.

## Funcionalidades

- Conversão de valores em Reais para múltiplas moedas.
- Interface amigável e intuitiva.
- Seleção de diferentes moedas para conversão.
- Exibição da lista de valores convertidos em todas as moedas disponíveis.

## Uso do Aplicativo

1. Na tela inicial, insira o valor em Reais (R$) no campo de entrada.
2. Selecione a moeda desejada a partir do seletor.
3. O valor convertido aparecerá automaticamente.
4. Para ver a lista de conversões para todas as moedas disponíveis, clique no botão "Ver Conversões".

## Requisitos

Instalar as dependências do projeto com:
npm install

### Versões Utilizadas

- **React Native**: `0.70.0`
- **Expo**: `48.0.0`
- **React**: `18.0.0`
- **React Navigation**: `6.0.0`
- **Axios**: `0.27.0`
- **React Native Picker**: `2.4.0`
- **React Native Elements**: `3.4.2`

## Descrição da API Utilizada

### API de Taxas de Câmbio: ExchangeRate-API

O **Conversor de Moedas** utiliza a **ExchangeRate-API** para fornecer conversões de moeda em tempo real. Esta API permite que o aplicativo acesse informações atualizadas sobre as taxas de câmbio entre diferentes moedas, garantindo que os usuários tenham acesso a dados precisos e confiáveis.

### Como a API Funciona

- **Requisições HTTP**: O aplicativo faz requisições HTTP para a ExchangeRate-API usando a biblioteca **Axios**. As requisições são feitas em formato JSON, que é um padrão comum para comunicação entre aplicações web.

- **Endpoint**: O endpoint da API fornece as taxas de câmbio em relação ao Real (BRL) e outras moedas. Por exemplo, uma requisição para um endpoint como `https://api.exchangerate-api.com/v4/latest/BRL` retornaria as taxas de câmbio mais recentes em relação ao Real.

- **Dados Retornados**: A resposta da API contém um objeto JSON com as seguintes informações:
  
  - **Base**: A moeda base para a qual as taxas são fornecidas (neste caso, BRL).
  - **Rates**: Um objeto contendo as taxas de câmbio para várias moedas, onde cada chave é o código da moeda e o valor é a taxa de câmbio correspondente.

Processamento dos Dados: Após receber os dados da API, o aplicativo processa as taxas de câmbio e realiza a conversão do valor inserido pelo usuário. Isso é feito multiplicando o valor em Reais pela taxa de câmbio da moeda selecionada.

Atualização em Tempo Real: O aplicativo pode ser configurado para atualizar as taxas de câmbio em intervalos regulares ou sempre que o usuário abrir o aplicativo, garantindo que as informações estejam sempre atualizadas.

### Passo a Passo de uso:
1- Entrar no aplicativo e logar com sua conta google:
![Passo 1](https://github.com/user-attachments/assets/a96fa256-efcc-4d85-ba8d-ade3d9497348)

2- Na tela principal, ecolher a função desejada:
![Passo 2](https://github.com/user-attachments/assets/e58d7caf-4e5d-4073-a8ab-f70e53b12f93)

3-Escolher a moeda desejada:

![Passo 3](https://github.com/user-attachments/assets/aaf0db11-a9ce-4428-84ed-fc58fc7b9653)

4-Visualizar a cambiação da moeda desejada:
![Passo 4](https://github.com/user-attachments/assets/c968b45d-640d-4c5c-a968-d60d6278af6a)

5-Visualização de cambiação de demais moedas por meio da lista:

![Passo 5](https://github.com/user-attachments/assets/06861f45-06ea-45f3-b3cc-fdf9f4024f6c)

## Considerações Finais

O **Conversor de Moedas** é um aplicativo prático e eficiente que atende à necessidade de realizar conversões de moeda de forma rápida e precisa. Com uma interface amigável e acesso a dados em tempo real, ele se destaca como uma ferramenta confiável para viajantes e qualquer pessoa que lide com diferentes moedas.

## Desenvolvedor

**Luis Gustavo Barbosa Oliveira**  
Estudante do 3º (terceiro ano) do curso Desenvolvimento de Sistemas.

## Instituição

**Etec Euro Albino de Souza**  
Mogi Guaçu


