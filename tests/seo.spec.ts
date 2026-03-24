import { test, expect } from '@playwright/test'

test('hast title' /**
 *
 * @param {import('@playwright/test').Page} param0
 */, async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Blog')
})
