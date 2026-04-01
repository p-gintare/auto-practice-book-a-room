import {test} from "@playwright/test"

export class HomePage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
       await test.step("Go to the home page", async () => {
            await this.page.goto("/");
        });
    }
}