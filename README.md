[![Build Status](https://travis-ci.org/emilianoeloi/cronometro-cubomagico.svg?branch=master)](https://travis-ci.org/emilianoeloi/cronometro-cubomagico)

# Cronômetro de Cubo Mágico Online

![2.0.0](public/2.0.0.png)

Esse projeto tem como objetivo a implementação de um cronômetro para medir a velocidade do cubista leva para montar seu cubo, bem como armazenar para que ele tenha um histórico e manter um hanking dos melhores tempos.

## Desenvolvimento

Feito com [Create React App](https://github.com/facebookincubator/create-react-app).

É preciso ter uma conta no Firebase (https://console.firebase.google.com).

1) Crie um projeto Web.

2) Crie um arquivo `Config.js` dentro da pasta `src` no formato a seguir com sua chave de acesso ao firebase e para o Google Analytics.
```javascript
const config = {
  apiKey: '{sua_chave_aqui}',
  authDomain: '{nome_do_seu_app_web}.firebaseapp.com',
  databaseURL: 'https://{nome_do_seu_app_web}.firebaseio.com',
  storageBucket: '{nome_do_seu_app_web}.appspot.com',
  messagingSenderId: '{message_sender_id}',
  gaUA: '{UA do google analytics}'
};

export { config };
```

3) Execute o setup

```bash
make setup
```

4) Rode o projeto

```bash
make run
```

5) Faça deploy para seu projeto do firebase

```bash
make deploy
```

## Outros cronômetros

http://www.cubetimer.com/

https://cstimer.net/

https://www.qqtimer.net/

https://www.cubemania.org/puzzles/3x3x3/timer

http://cinoto.com.br/website/index.php/prisma1

http://cct.cubing.net/

## Referências

cube.js -- JavaScript library for modeling and solving the 3x3x3 Rubik's Cube - https://github.com/ldez/cubejs Acessando em 24/08/2021
