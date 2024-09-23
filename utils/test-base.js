import { test as baseTest } from '@playwright/test';

export const customTest =
  baseTest.extend <
  {
    testDataForOrder,
  } >
  {
    testDataForOrder: {
      email: 'caiquedpfc@gmail.com',
      password: '$7DHhQP@PhiK8N',
      productName: 'ZARA COAT 3',
    },
  };
