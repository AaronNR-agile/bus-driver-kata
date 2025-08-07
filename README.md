typescript-seed
===============

An auto-updating, opinionated TypeScript seed project. All killer, no filler.

[![CI Status](https://github.com/agiledigital-labs/typescript-seed/actions/workflows/node.js.yml/badge.svg)](https://github.com/agiledigital-labs/typescript-seed/actions/workflows/node.js.yml)

What's in the box?
==================

* TypeScript, with all [strictness](https://www.typescriptlang.org/tsconfig#strict) compiler options enabled
* [ESLint](https://eslint.org/docs/latest/), with an opinionated set of plugins and rules pre-configured for safety courtesy of [eslint-config-agile-digital](https://github.com/agiledigital-labs/eslint-config-agile-digital)
* [Prettier](https://prettier.io/docs/en/index.html)
* [type-coverage](https://github.com/plantain-00/type-coverage), in [strict mode](https://github.com/plantain-00/type-coverage#strict-mode) with 100% type coverage enforced (do try to keep this as high as you can)
* Unit tests via [Jest](https://jestjs.io/docs/getting-started), with 100% [test coverage](https://jestjs.io/docs/next/configuration#coveragethreshold-object) enforced (do try to keep this as high as you can)
* An example property based test using [fast-check](https://github.com/dubzzz/fast-check).
* Mutation testing via [Stryker](https://stryker-mutator.io/), with 100% mutation score (do try to keep this as high as you can)
* A [Husky](https://github.com/typicode/husky) pre-commit hook that runs all of the above

Getting started
===============

1. Make sure you have [NVM](https://github.com/nvm-sh/nvm#install--update-script) installed.
2. Create a new repo using this template (big green "use this template" button).
3. Clone that repo.
4. Then run the following:

```sh
# make sure the right version of node is being used
# tip: it might be worth automating this (https://github.com/nvm-sh/nvm#bash)
nvm use
# install dependencies
npm install
# compile
npm run build
# run the compiled code
node dist/index.js
```

Some notes on coverage scores
=============================

The three coverage scores enforced by this seed start life at 100% (type coverage, test coverage, mutation score). It can be counterproductive to target 100% in practice. Doing so can encourage us to write poor quality tests or spend an inordinate amount of time that could be better spent elsewhere (for example, on e2e tests). You and your team will work out what threshold to enforce for these three scores based on the context of a specific project. It might be 70 or 80 or 90 but hopefully won't be 20. In keeping with the priciple of [shift left](https://devopedia.org/shift-left), it's more important to have a very high type coverage score than it is to have a very high unit test coverage score. The compiler is earlier in the process (to the left of) the unit tests.

IDE Notes
============

If you are using VSCode, it should automatically recommend you some important plugins for this package (e.g. eslint)
If not, check the .vscode/extensions.json because they will greatly improve your workflow.

Some notes on security
======================

* We enforce the lockfile by using `npm ci`, _not_ `npm install` (see https://snyk.io/blog/ten-npm-security-best-practices/)
* We use `--ignore-scripts` to minimize the attack surface (see https://snyk.io/blog/ten-npm-security-best-practices/)
* We use `npm audit` to detect known vulnerabilities in our dependencies (point 9 from the OWASP Top 10)
* We set `"private": true` in package.json to prevent accidental publishing
* We keep our type coverage, test coverage and mutation scores as high as practical to help ensure our code is bulletproof
* We use [Renovate](https://github.com/renovatebot/renovate) to keep dependencies up-to-date
* We use static analysis services ([DeepCode](https://www.deepcode.ai/) and [Snyk](https://app.snyk.io)) to detect insecure or suspicious coding patterns in our own code.

If you intend to use this seed in a context where those services (GitHub Actions, Dependabot, DeepCode, Snyk, etc) are not available, we encourage you to find a way to achieve the same security goals in your context. This might involve on-prem services like Jenkins, SonarQube and Renovate.
