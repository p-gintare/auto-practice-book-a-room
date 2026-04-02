import {BasicPage} from "./basic-page.js";
import {test} from "@playwright/test";

export class RoomPage extends BasicPage{
    constructor(page) {
        super(page, "reservation/1?checkin=2026-04-02&checkout=2026-04-03");
        this.buttonDoReservation = this.page.locator("#doReservation");
    }

    async clickReservation() {
        await test.step("Click on reservation", async () => {
            await this.buttonDoReservation.scrollIntoViewIfNeeded();
            await this.buttonDoReservation.click();
        });
    }
}