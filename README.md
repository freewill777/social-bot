# Social Bot

## About

This script allows one to automate surfing some social networks

This bot was developed with the [Playwright](https://github.com/microsoft/playwright) automation framework.

You can find the documentation for Playwright [here](https://playwright.dev/docs/intro).

## How to Use

### Setup

Recommended editor is [VS Code](https://code.visualstudio.com/), but you can use whatever editor you would like. Just make sure you have ready access to the file structure and a terminal to run the application with.

After cloning the repo into a directory of your choice, first run:

```bash
npm install
```

Next, you have two options: you can run the bot in headed mode with:

```bash
npx playwright test --headed
```

Which will run the test with the browser letting you visually see it running. Or, you can run it in debug mode:

```bash
npx playwright test --debug
```

Debug mode is recommended because it lets you not only see the bot running in the browser, but also gives you a visual of the code as it's running through the [Playwright Inspector](https://playwright.dev/docs/debug). It also lets you pause and step through the code as well.

Finally, after the bot has successfully logged in once, you can comment out this code `globalSetup: require.resolve('./global-setup'),` in the playwright.config.ts file. This will disable the global-setup.ts file so the bot doesn't log in each time.

Now, whenever the bot is run it will go straight to your logged in LinkedIn profile and to your search url. If, after a week or so, you find yourself logged out of LinkedIn when you run the bot, just uncomment that line of code in the playwright config file and run it again so it can store your authentication info in storageState.json.
