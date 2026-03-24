import { Page } from '@playwright/test'

export class AuthFixture {
  constructor(public readonly page: Page) {
    this.page = page
  }

  async signUpAndLogin() {
    const page = this.page
    const testUser = 'test' + Date.now()
    await page.goto('/signup')
    await page.getByRole('textbox', { name: 'Username:' }).fill(testUser)
    await page.getByRole('textbox', { name: 'Password:' }).fill(testUser)
    await page.getByRole('button', { name: 'Sign Up' }).click()
    await page.waitForURL('**/')
    await page.getByRole('link', { name: 'Log in' }).click()
    await page.getByRole('textbox', { name: 'Username:' }).fill(testUser)
    await page.getByRole('textbox', { name: 'Password:' }).fill(testUser)
    await page.getByRole('button', { name: 'Login' }).click()
    await page.waitForURL('**/')

    return testUser
  }
}
