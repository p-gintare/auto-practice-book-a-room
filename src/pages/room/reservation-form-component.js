import {test} from "@playwright/test";

export class ReservationFormComponent {
    constructor(page) {
        this.page = page;
        this.buttonDoReservation = this.page.locator("#doReservation");
        this.inputFirstname = this.page.locator("[name = 'firstname']");
        this.inputLastname = this.page.locator("[name = 'lastname']");
        this.inputPhone = page.locator("[name = 'phone']");
        this.inputEmail = page.locator("[name = 'email']");
        this.buttonReserveNow = page.getByRole("button", {name: "Reserve Now"});
    }

    async clickCalendarReservation() {
        await test.step("Click on calendar reservation", async () => {
            await this.buttonDoReservation.scrollIntoViewIfNeeded();
            await this.buttonDoReservation.click();
        });
    }

    async fillForm({firstname, lastname, phone, email}) {
        await test.step("Fill a form of reservation", async () => {
            await this.fillFirstname(firstname);
            await this.fillLastname(lastname);
            await this.fillPhone(phone);
            await this.fillEmail(email);
            await this.clickReservationButton();
        })
    }

    async fillFirstname(firstname) {
        await test.step(`Fill first name with: ${firstname}`, async () => {
            await this.inputFirstname.fill(firstname);
        });
    }

    async fillLastname(lastname) {
        await test.step(`Fill last name with: ${lastname}`, async () => {
            await this.inputLastname.fill(lastname);
        });
    }

    async fillPhone(phone) {
        await test.step(`Fill a phone with ${phone}`, async () => {
            await this.inputPhone.fill(phone);
        })
    }

    async fillEmail(email) {
        await test.step(`Fill a email with ${email}`, async () => {
            await this.inputEmail.fill(email);
        });
    }

    async clickReservationButton() {
        await test.step("Click on reservation button", async () => {
            await this.buttonReserveNow.click();
        });
    }

}