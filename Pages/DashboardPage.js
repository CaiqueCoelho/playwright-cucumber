const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cartButton = page.locator('[routerlink*="cart"]');
  }

  async searchProduct(productName) {
    await this.productsText.first().waitFor();

    const titles = await this.productsText.allTextContents();
    console.log(titles);

    await expect(this.productsText.first()).toContainText(productName);

    const productsCount = await this.products.count();
    console.log(productsCount);
    let productIndexToBuy;
    for (let productIndex = 0; productIndex < productsCount; productIndex++) {
      if (
        (await this.products.nth(productIndex).locator('b').textContent()) ===
        productName
      ) {
        console.log('We find the product');
        productIndexToBuy = productIndex;
        // addProductToCart(productIndexToBuy);
        break;
      } else {
        console.log("We didn't find the product");
      }
    }

    return productIndexToBuy;
  }

  async addProductToCart(productIndexToBuy) {
    await this.products
      .nth(productIndexToBuy)
      .locator('text= Add To Cart')
      .click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
}

module.exports = DashboardPage;
