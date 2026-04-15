import {formatDate} from "../../utils/date-utils.js";
import {expect} from "@playwright/test";

export class ReservationFormConfirmationCard {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.booking-card .card-title');
        this.dates = page.locator('.booking-card strong');
    }

    async isBookingConfirmed(confirmationText, checkin, checkout) {
        return (await this.title.text) === confirmationText && (await this.dates.text) === `${formatDate(checkin)} - ${formatDate(checkout)}`;
    }

    async expectBookingIsConfirmed(confirmationText, checkin, checkout) {
        await expect(this.title).toHaveText(confirmationText);
        await expect(this.dates).toHaveText(`${formatDate(checkin)} - ${formatDate(checkout.add(1, 'day'))}`);
    }
}