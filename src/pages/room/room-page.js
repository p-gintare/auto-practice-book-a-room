import {BasicPage} from "../basic-page.js";
import {ReservationFormComponent} from "./reservation-form-component.js";
import {ReservationFormCalendar} from "./reservation-form-calendar.js";
import {ReservationFormConfirmationCard} from "./reservation-form-confirmation-card.js";

export class RoomPage extends BasicPage {
    constructor(page) {
        super(page, "reservation/1?checkin=2026-04-02&checkout=2026-04-03");

        this.reservationForm = {
            calendar: new ReservationFormCalendar(page),
            personalDetails: new ReservationFormComponent(page),
            confirmation: new ReservationFormConfirmationCard(page),
        }
    }

    async successfullyBookARoom(checkin, checkout, personalDetails) {
        await this.reservationForm.calendar.selectDates(checkin, checkout);
        await this.reservationForm.personalDetails.fillForm(personalDetails);
        await this.reservationForm.confirmation.expectBookingIsConfirmed(checkin, checkout);
    }


}