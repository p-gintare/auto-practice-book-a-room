import { test as base } from "@playwright/test"
import {HomePage} from "../pages/home-page.js";
import {RoomPage} from "../pages/room/room-page.js";


export const test = base.extend({
    homePage: async ({ page }, use) => {
        // Set up the fixture. aka Before each
        const homePage = new HomePage(page);
        await homePage.goto();
        // Use the fixture value in the test.
        await use(homePage);

        // Clean up the fixture. aka afterEach

    },
    roomPage: async ({page, homePage}, use) => {
        const roomPage = new RoomPage(page);
        await homePage.openFirstRoom();

        await use(roomPage);
    }
});

export { expect } from '@playwright/test';