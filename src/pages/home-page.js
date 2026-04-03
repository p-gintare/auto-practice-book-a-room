import {test} from "@playwright/test"
import {BasicPage} from "./basic-page.js";

export class HomePage extends BasicPage {
    constructor(page) {
        super(page, "/");
        this.buttonBookNow = this.page.locator("#rooms").getByRole("link", {name: "Book now"});
    }

    async openFirstRoom() {
        await this.openRoom(0);
    }

    async openRoom(index) {
        const indexCorrection = index + 1;
        await test.step(`Click on ${indexCorrection}${indexCorrection === 1 ? "st": indexCorrection === 2 ? "nd": "th"} room`, async () => {
            await this.buttonBookNow.nth(index).click();
        });
    }
}