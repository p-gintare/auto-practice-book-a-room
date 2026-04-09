
export class ReservationFormConfirmationCard {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.booking-card .card-title');
        this.dates = page.locator('.booking-card strong');
    }


}