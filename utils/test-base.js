const { test } = require('@playwright/test');

exports.customTest = test.extend({
  testDataForOrder: {
    email: 'caiquedpfc@gmail.com',
    password: '$7DHhQP@PhiK8N',
    productName: 'ZARA COAT 3',
  },
});
