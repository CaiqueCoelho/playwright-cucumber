const {
  Before,
  After,
  BeforeStep,
  AfterStep,
  Status,
} = require('@cucumber/cucumber');
const POManager = require('../../Pages/POManager');
const playwright = require('@playwright/test');

Before({ tags: '@Regression' }, async function () {
  console.log('I will execute before every scenario tagged with @Regression');
});

Before(async function () {
  console.log('I am first to execute');
  //const browser = await playwright.chromium.launch();
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

BeforeStep(async function () {
  console.log('Ill execute before every step');
});

AfterStep(async function ({ result }) {
  console.log('I will execute after every step');
  if (result.status === Status.FAILED) {
    console.log('Step failed. Taking Screenshot');
    const screenshot = await this.page.screenshot({
      path: `/screeenshots/failed-test.png`,
    });
    this.attach(screenshot, 'image/png');
  } else {
    console.log('Step passed. No Screenshot taken');
  }
});

After(async function () {
  console.log('I am last to execute');
});
