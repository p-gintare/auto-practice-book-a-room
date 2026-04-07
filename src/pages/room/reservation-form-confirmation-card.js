
export class ReservationFormConfirmationCard {
    constructor(page) {
        this.page = page;
        this.title = page.locator();
        this.dates = page.locator();
    }
}