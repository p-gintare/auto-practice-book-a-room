// @ts-check
import { test, expect } from '@playwright/test';

// data driven arba parametrized testai.
// Playwright dokumentacija: https://playwright.dev/docs/test-parameterize
// sukurs tiek testu kiek yra duomenu, siuo atveju 3
[
    { name: 'Alice', expected: 'Hello, Alice!' },
    { name: 'Bob', expected: 'Hello, Bob!' },
    { name: 'Charlie', expected: 'Hello, Charlie!' },
].forEach(({ name, expected }) => {
    // You can also do it with test.describe() or with multiple tests as long the test name is unique.
    test(`testing with ${name}`, async ({ page }) => {
        await page.goto(`https://example.com/greet?name=${name}`);
        await expect(page.getByRole('heading')).toHaveText(expected);
    });
});


test('greetings', async ({ page }) => {
    const testCases =[
        { name: 'Alice', expected: 'Hello, Alice!' },
        { name: 'Bob', expected: 'Hello, Bob!' },
        { name: 'Charlie', expected: 'Hello, Charlie!' },
    ];
// ne geriausias variantas jei kazkas failins kiti case neprasisuks
    for (const testCase of testCases) {
        await page.goto(`https://example.com/greet?name=${testCase.name}`);
        // await page.locator('.klase').click();
        await expect(page.getByRole('heading')).toHaveText(testCase.name);
    }
})
