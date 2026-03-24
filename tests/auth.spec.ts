import { test, expect } from '@playwright/test'

test('sign up and login', async ({ page }) => {
  const testUser = 'test' + Date.now()
  await page.goto('/')
  await page.getByRole('link', { name: 'Sign Up' }).click()
  await page.getByRole('textbox', { name: 'Username:' }).fill(testUser)
  await page.getByRole('textbox', { name: 'Password:' }).fill(testUser)
  await page.getByRole('button', { name: 'Sign Up' }).click()
  await page.waitForURL('**/')
  await page.getByRole('link', { name: 'Log in' }).click()
  await page.getByRole('textbox', { name: 'Username:' }).fill(testUser)
  await page.getByRole('textbox', { name: 'Password:' }).fill(testUser)
  await page.getByRole('button', { name: 'Login' }).click()
  await page.waitForURL('**/')

  await expect(page.locator('nav')).toContainText('Logged in as ' + testUser)
})
