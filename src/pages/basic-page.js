import {test} from "@playwright/test";

export class BasicPage {
    constructor(page, url) {
        this.page = page;
        this.url = url;
    }

    async goto() {
        await test.step(`Go to the ${this.url} page`, async () => {
            await this.page.goto(this.url);
        });
    }
}