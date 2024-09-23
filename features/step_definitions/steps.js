const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
// const POManager = require('../../Pages/POManager');
// const playwright = require('@playwright/test');

Given(
  'a login to Ecommerce aplication with {string} and {string}',
  { timeout: 100 * 1000 },
  async function (email, password) {
    this.email = email;
    const loginPage = this.poManager.getLoginPage();
    this.dashboardPage = this.poManager.getDashboardPage();

    await loginPage.goTo();
    await loginPage.doLogin(email, password);

    await this.page.waitForURL(/dashboard/);
  }
);

When('Add {string} to Cart', async function (product) {
  const productIndexToBuy = await this.dashboardPage.searchProduct(product);
  await this.dashboardPage.addProductToCart(productIndexToBuy);
});

Then('Verify {string} is displayed in the Cart', async function (product) {
  this.dashboardPage.goToCart();

  this.cartPage = this.poManager.getCartPage();
  await this.cartPage.cartProducts.first().waitFor();

  await this.cartPage.checkIfProductIsInCart(product);
});

When('Enter valid details and Place the Order', async function () {
  await this.cartPage.goToCheckout();
  await this.cartPage.doCheckout('Bra', 'Brazil', this.email);

  await expect(this.page.locator('.hero-primary')).toHaveText(
    ' Thankyou for the order. '
  );
});

Then('Verify order is present in the Order History page', async function () {
  let orderId = await this.page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent();
  orderId = orderId.replaceAll('|', '').trim();
  console.log('orderId:', orderId);

  await this.page.locator('button[routerlink*="myorders"]').click();
  await expect(this.page).toHaveURL(/myorders/);

  await this.page.locator('tbody').waitFor();
  await this.page.locator(`text=${orderId}`).waitFor();
  await expect(this.page.locator(`text=${orderId}`)).toBeVisible();
  await this.page
    .locator(`text=${orderId}`)
    .locator('..')
    .locator('button')
    .first()
    .click();
  await expect(this.page).toHaveURL(/order-details/);
  const orderIdDetailsPage = await this.page.locator('.col-text').textContent();
  expect(orderIdDetailsPage).toContain(orderId);
});

Then('Verify Error message is displayed', async function () {
  // Assert the status code is 400
  expect(this.loginResponse.status()).toBe(400);
});

Given(
  'a login to Ecommerce2 aplication with {string} and {string}',
  { timeout: 100 * 1000 },
  async function (email, password) {
    this.email = email;
    const loginPage = this.poManager.getLoginPage();
    this.dashboardPage = this.poManager.getDashboardPage();

    await loginPage.goTo();
    const [response] = await Promise.all([
      this.page.waitForResponse('**/api/ecom/auth/login'),
      // Navigate to a page that triggers the API request
      await loginPage.doLogin(email, password),
    ]);

    this.loginResponse = response;
  }
);
