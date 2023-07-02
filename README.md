# BLOG - GOLDENOWL

BLOG - GOLDENOWL

## Prerequisite

### yarn

```bash
npm install -g yarn
```

**Note: -g is global install. If yarn is installed, skip this step**

### Installation

```bash
yarn
```

### Environment variables

**Create .env file:**

```
nano .env
```

**.env**

```
NODE_ENV=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_IMAGE_URL=
NEXT_PUBLIC_SITE_URL=
```

**Note:** Please ask another dev to get access to the env vars in these files.

### Run environment

**Development mode**

```bash
yarn dev
```

**Production mode**

```bash
yarn build
```

```bash
yarn start
```

### Storybook

**To run storybook**

```
yarn storybook
```

Storybook file must be in /`src`/`components`/`<component>`/`*.stories.tsx`

Storybook is a tool for UI development. It makes development faster and easier by isolating components.
Check the [document](https://storybook.js.org/docs/react/get-started/introduction) to get you started!

### Jest Test

**To run test for file**

```
yarn test <file>
```

**To run test coverage all file**

```
yarn test -- --coverage
```

**To run test coverage only components folder**

```
yarn test -u -- --coverage --watchAll=false --collectCoverageFrom="./src/components/**/*.js"
```

Test file must be in /src/`__tests__`

Test file must have extension .test.ts(x)

Check the [Jest document](https://jestjs.io/docs/getting-started) to get you started!

## Deployment

**Deployed on Vercel:**
Contact your team to join Vercel team. Then go to `Site setting/Build & deploy` to config stating and production deploy

**Staging:** Auto deploy & generate a different domain to test after PR

**Production:** [Production](https://blogowl.vercel.app//)

Cheers 🍺🍺
Happy coding!
