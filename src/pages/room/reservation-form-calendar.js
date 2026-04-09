import {expect, test} from "@playwright/test";
import {formatDay} from "../../utils/date-utils.js";

export class ReservationFormCalendar {
    constructor(page) {
        this.page = page;
        this.buttonDoReservation = this.page.locator("#doReservation");
        this.bookingCardElement = this.page.locator(".booking-card");
        this.calendarDayElement = (date) => this.page.getByRole("button", {name: formatDay(date)}).last();
        this.weekRow = (childElement) => childElement.locator("../../..");
        this.selectedDatesElement = (childElement) => this.weekRow(childElement).locator(".rbc-event-content", {hasText: "Selected"});
    }

    async clickReservation() {
        await test.step("Click on calendar reservation", async () => {
            await this.buttonDoReservation.scrollIntoViewIfNeeded();
            await this.buttonDoReservation.click();
        });
    }

    async selectDates(checkin, checkout) {
        await this.bookingCardElement.scrollIntoViewIfNeeded();

        const dayFrom = this.calendarDayElement(checkin);
        const dayTo = this.calendarDayElement(checkout)

        await dayFrom.hover();
        await this.page.mouse.down();

        const box = await dayTo.boundingBox();
        await this.page.mouse.move(box.x, box.y);
        await dayTo.hover();
        await this.page.mouse.up();
        await expect(this.selectedDatesElement(dayFrom)).toBeVisible({timeout: 2_000});
    }
}