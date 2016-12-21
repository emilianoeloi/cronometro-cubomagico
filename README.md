# Cronômetro de Cubo Mágico Online

Esse projeto tem como objetivo a implementação de um cronômetro para medir a velocidade do cubista leva para montar seu cubo, bem como armazenar para que ele tenha um histórico e manter um hanking dos melhores tempos.

## Desenvolvimento

É preciso ter uma conta no Firebase (https://console.firebase.google.com).

1) Crie um projeto Web.

2) Crie um arquivo `Config.js` dentro da pasta `src` no formato a seguir com sua chave de acesso ao firebase.
```javascript
const config = {
  apiKey: "{sua_chave_aqui}",
  authDomain: "{nome_do_seu_app_web}.firebaseapp.com",
  databaseURL: "https://{nome_do_seu_app_web}.firebaseio.com",
  storageBucket: "{nome_do_seu_app_web}.appspot.com",
  messagingSenderId: "{message_sender_id}"
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
