import {expect, test} from "@playwright/test";

export class ReservationFormCalendar {
    constructor(page) {
        this.page = page;
        this.buttonDoReservation = this.page.locator("#doReservation");
    }

    async clickReservation() {
        await test.step("Click on calendar reservation", async () => {
            await this.buttonDoReservation.scrollIntoViewIfNeeded();
            await this.buttonDoReservation.click();
        });
    }

    async selectDates(from, to) {
        const buttonLink = this.page.getByRole("button", {name: from});
        const buttonLink2 = this.page.getByRole("button", {name: to});
        const parentRow = buttonLink.locator("../../..");
        const selectedDateElement = parentRow.locator(".rbc-event-content", {hasText: "Selected"})
        await buttonLink.hover();
        await this.page.mouse.down();
        //
        // // await page.waitForTimeout(3_000);
        // await new Promise(resolve => setTimeout(resolve, 300));
        const box = await buttonLink2.boundingBox();
        await this.page.mouse.move(box.x, box.y);
        await buttonLink2.hover();
        await this.page.mouse.up();
        await expect(selectedDateElement).toBeEnabled({timeout: 2_000});
    }
}