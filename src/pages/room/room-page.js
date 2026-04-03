import {BasicPage} from "../basic-page.js";
import {ReservationFormComponent} from "./reservation-form-component.js";

export class RoomPage extends BasicPage{
    constructor(page) {
        super(page, "reservation/1?checkin=2026-04-02&checkout=2026-04-03");

        this.reservationForm = new ReservationFormComponent(page)
    }


}