## Links

- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/  
  if link is broken check https://jaktestowac.pl/lesson/pw1s01l01/

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`
- run tests that have @login tag in them 
  `npx playwright test --grep "@login"`

## Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```

## Visual Studio Code

- Preview: for README.md
- Autosave: in File -> Auto Save
- Timeline: file contex menu
- Formating: editor -> contex menu -> format document
- Alt + Shift + down Arrow - make a copy of line of code
- Alt + Arrow button - move line up or down

## Prettier

- install Prettier
  `npm install --save-dev --save-exact prettier`
  -configure Prettier
  - exlude files in `.prettierignore`
    ```
    package-lock.json
    playwright-report
    ```
  - set rules in `prettierrc.json`
    ```
    {
        "singleQuote": true,
        "endOfLine": "auto"
    }
    ```
- run Prettier
  `npx prettier --write .`

## Playwright snippets

- test:

```javascript
test("test description", async ({ page }) => {});
```

- describe:

```javascript
test.describe("Group description", () => {});
```

- running one test: `test.only`

- repeateing tests
`npx playwright test --repeat-each=20`

-add retries to tests
`  test.describe.configure({ retries: 3});`

## Playwright mcp server snippets
- running  mcp server from terminal
`npx @playwright/mcp@latest --port 8931`
