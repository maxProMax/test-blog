import { test as testBase } from '@playwright/test'
import { AuthFixture } from './AuthFixture'

export const test = testBase.extend<{ auth: AuthFixture }>({
  auth: async ({ page }, use) => {
    const authFixture = new AuthFixture(page)

    await use(authFixture)
  },
})
export { expect } from '@playwright/test'
