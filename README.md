# POS Lite Dashboard Automation Project

This project is a Playwright-based automation framework for testing the POS Lite Dashboard application. The framework follows the Page Object Model (POM) design pattern for better maintainability and readability.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup](#setup)
3. [How to Use](#how-to-use)
4. [Writing Test](#writing-tests)
5. [Contributors](#contributors)



## Project Structure

```plaintext
medusa/
├── src
│   ├── base
│   │   ├── objects
│   │   │   └── Element.ts
│   │   ├── utils
│   │   │   ├── base-locator.ts
│   │   │   ├── base-page.ts
│   │   │   ├── base-scenario.ts
│   │   │   └── extensions.ts
│   ├── configs
│   │   └── urls.ts
│   └── modules
│       └── project
│           └── project
│               ├── features
│               │   ├── component
│               │   │   ├── component.locator.ts
│               │   │   ├── component.page.ts
│               │   │   └── component.scenario.ts
│               │   ├── login.locator.ts
│               │   ├── login.page.ts
│               │   └── login.scenario.ts
│               ├── base-project-base.ts
│               └── project-pages.ts
├── tests
│    └── project
│        ├── tc-modules
│        │    └── tc-subModules
│        │        └── testcase.spec.ts
│        └── injection.ts
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md

```

## Setup

### Prerequisites

1. **Node.js v.20.15.0**: Ensure you have Node.js v20.15.0 installed. You can download it from [Node.js](https://nodejs.org/).
2. **Node Version Manage (Optional)**: If you working on multiple project with different node version, you should install nvm (Node Version Manager) so you can change your node version whenever you need. [download here](https://github.com/coreybutler/nvm-windows/releases) 

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://gitlab.esb.co.id/esb/esb-poslite/medusa.git
   cd automation-project
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3.  Install Playwright:
    ```bash
    npm install @playwright/test
    ```
4.  Install dotenv:
    ```bash
    npm install dotenv
    ```

### Verify installation:

1. Verify Node.js Installation:
    ```bash
    node --version
    npm --version
    ```

1. Verify Node.js Installation:
    ```bash
    ping google.com -t
    ```
   
2. Verify Playwright Installation:
    ```bash
   npx playwright --version
    ```
3. Verify dotenv Installation
   ```bash
   npm list dotenv
   ```
## How to Use

### Environment Setup
Configure Environment Variables:

- Create a .env file in the root directory of the project.
- Add necessary environment variables. Example:

```bash
BASE_URL=https://dev7.esb.co.id
```
### Running Tests

**Execute All Tests**

- To run all tests, use the following command:

```bash
    npx playwright test
```

- **Run specific Test Case**

```bash
    npx playwright test test/{your_test_path}/your_test.spec.ts
```

- **Run specific Tests**
<br> Each test inside your_test.spec.ts has green play button "<img src="docs%2Fassets%2Fgreen-play-button.png" alt="Play Button" width="15" height="15">".
you can tap on that icon to run specific test. ***notes:*** becasuse some test using caching to cache authorization, you should run 1st test on ***your_test.spec.ts***.
![test-run-button.png](docs%2Fassets%2Ftest-run-button.png)


- **Headless mode**

  Playwright can run tests in headless mode by changing the headless option in `playwright.config.ts` to `true`.
```typescript

headless: true

```

- **Choosing browser to run the test**

  You can configure the browser to run with your test by setting it in the `projects` section in `playwright.config.ts`.
```typescript
projects: [
    {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
    },
    
]
```

## Writing Tests

Before writing a test case, create a new folder in `src/modules/` for your locator, page object, and scenario file.

1.  **Locator file**

    This is where you define the locators for elements on the page. Locators are used to find elements during the test execution.


- Locator file Example:
```typescript
   
    import  BaseLocator from "../../base/base-locator";
     
    export default class LoginLocator extends BaseLocator {
    static inputUsername: string = '#email';
    static inputPassword: string = '#password';
    static loginButton: string = `//button`;

    static suggestConfirmEmail: string = '.suggest-confirm-email';
    static suggestRegister: string = '.suggest-register';

    static resetPasswordHeadline = ".headline";
    static resetPasswordSubHeadline = ".subheadline";
    static inputResetPassword: string = '#email';
    static buttonResetPasswordBack: string = `[type=button]`;
    static buttonResetPasswordSubmit: string = `[type=submit]`;
}   

```
**Notes**: Always import from `src/base/base-locator` to your locator file.

2. **Page object file**

    This is where you define the interactions and behaviors for the page. The page object file uses the locators to perform actions and verifications.


- **Page object file example:** 

```typescript
import BasePage from "../../base/base-page";
import LoginLocator from "./login.locator";
import Urls from "../../configs/urls";
import Element from "../../base/objects/Element";
import LoginScenario from "./login.scenario";


export default class LoginPage extends BasePosLitePage implements LoginScenario {
    pageUrl = (): string => Urls.login;

    shouldHave(): Element[] {
        return [
            Element.of(LoginLocator.inputUsername, ''),
            Element.of(LoginLocator.inputPassword, ''),
            Element.ofButton("Masuk", false),
            Element.ofSelector(LoginLocator.suggestConfirmEmail),
            Element.ofSelector(LoginLocator.suggestRegister),
            Element.ofText("Cek email untuk verifikasi atau "),
            Element.ofText("Kirim ulang link verifikasi"),
            Element.ofText("Belum punya akun? "),
            Element.ofText("Daftar Sekarang"),
            Element.ofText("Lupa Kata Sandi?"),
        ];
    }

    private email = process.env.USEREMAIL;
    private emailWrong = "wrongEmail";
    private emailEmpty = "";
    private password = process.env.PASSWORD;
    private passwordEmpty = "";

    

    async performLogin(): Promise<void> {
        await this.clear(LoginLocator.inputUsername);
        await this.clear(LoginLocator.inputPassword);
        await this.expectDisabled(LoginLocator.loginButton);

        await this.fill(LoginLocator.inputUsername, this.email);
        await this.fill(LoginLocator.inputPassword, this.password);
        await this.expectEnabled(LoginLocator.loginButton);
        await this.click(LoginLocator.loginButton);
    }
}
```

3.  Scenario File
    
    This is where you define the scenarios for the tests. A scenario file is an interface that outlines the various actions and checks that can be performed on the page

 
- Scenario file example:

```typescript
import BaseScenario from "../../base/base-scenario";

export default interface LoginScenario extends BaseScenario {
    performWrongLogin(): Promise<void>;

    performLogin(): Promise<void>;

    performForgetPassword(): Promise<void>;
}
```
4.  Writing Test Case File

After your modules file is ready, create your test case file in `src/tests`

-   Test case file example:

```typescript
import {expect, test} from "@playwright/test";
import LoginPage from "../src/modules/login/login.page";
import Urls from "../src/configs/urls";
import DashboardLocator from "../src/modules/dashboard/dashboard.locator";

test('User can log in and see the "Later" button on the dashboard', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performWrongLogin();
    await loginPage.performLogin();

    // Wait for the dashboard page is loaded
    await page.waitForURL(`${process.env.BASE_URL}${Urls.dashboard}`);

    // Verify "Nanti Saja" button
    const buttonLater = await page.waitForSelector(DashboardLocator.buttonLater);
    expect(buttonLater).toBeTruthy();
});

```

4.  List pages and component inside {your-project-path}/{your-project}-pages.ts

After your modules file is ready, create your test case file in `src/tests`

-   Test case file example:

```typescript
export type OmsPages = {
    synchronizeData: SynchronizeDataScenario
    sideNavBar: SideNavBarScenario
    nameOfPagesOrComponentsYouJustCreated:ScenarioOfPagesOrComponentsYouJustCreated
    tools: ToolsScenario
    troubleshoot: TroubleshootScenario
};
```

## Contributors

 - Kornelius Sendy - Author
 - Ryan Witsqo Mustashim - Maintainer

## Additional Resources

 - [Playwright Documentation](https://playwright.dev/docs/intro)
 - [Playwright Cheatsheet](https://docs.google.com/document/d/1qkXQ6Wv2fUtXhMHXO0k9pasoJhVpe9NQeaO4pr-7NJA/edit#heading=h.5mwq0u2pv3sb)
 - [PLD Smoke Test Document](https://docs.google.com/spreadsheets/d/1e8_urpllkjTeMUHNu6St2ybag0xCDwSjtgGwr_Idefs/edit)




