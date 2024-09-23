const CartPage = require('./CartPage');
const DashboardPage = require('./DashboardPage');
const LoginPage = require('./LoginPage');

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.cartPage = new CartPage(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }
}

module.exports = POManager;
