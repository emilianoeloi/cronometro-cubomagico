# Contribuindo

Obrigado por querer contribuir com o Cronômetro de Cubo Mágico Online! Este
guia cobre convenções de código, o processo de pull request e como reportar
problemas. Para instruções de configuração, build, testes e deploy, veja a
seção ["Desenvolvimento" do README](README.md#desenvolvimento) — esses passos
não são repetidos aqui.

## Convenções de código

- Componentes de classe do React 15 (`React.Component`), **sem hooks**, com
  métodos vinculados no construtor (`this.metodo = this.metodo.bind(this)`).
- Textos de interface (UI) em português (pt-BR), consistente com o restante
  do app.
- Cada componente fica em `src/<Nome>/index.jsx` (ex.:
  [src/Stopwatch/index.jsx](src/Stopwatch/index.jsx),
  [src/MyTimes/index.jsx](src/MyTimes/index.jsx)). A única exceção é
  [src/Footer.jsx](src/Footer.jsx), que fica direto na raiz de `src`.
- Testes são testes de snapshot com [Vitest](https://vitest.dev/) +
  `react-test-renderer`, em `src/__tests__/*-test.jsx`. Rode com
  `make test` e, após uma mudança intencional de render, atualize os
  snapshots com `make test-update`.
- [public/cubejs](public/cubejs) é uma biblioteca de terceiros vendorizada
  (cube.js) — essas convenções não se aplicam a ela; não ajuste seu estilo
  para combinar com o restante do `src`.

## Como abrir um Pull Request

- Nomeie a branch com um prefixo indicando o tipo de mudança seguido de uma
  descrição curta: `feature/<descricao-curta>` para novas funcionalidades ou
  `fix/<descricao-curta>` para correções de bugs.
- Antes de abrir o PR, rode `make test` localmente e garanta que os testes
  passam — não há CI que rode os testes automaticamente (o único workflow
  existente é o CodeQL, focado em varredura de segurança).
- Se a mudança alterar intencionalmente a renderização de algum componente,
  atualize os snapshots com `make test-update` e revise o diff gerado antes
  de commitar.

## Onde reportar bugs ou pedir funcionalidades

Use as [Issues do repositório no GitHub](https://github.com/emilianoeloi/cronometro-cubomagico/issues)
para reportar bugs ou pedir novas funcionalidades.
