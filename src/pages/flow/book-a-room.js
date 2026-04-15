import {HomePage} from "../home-page.js";
import {RoomPage} from "../room/room-page.js";

export class BookARoomFlow {
    constructor(page) { this.page = page; }

    async successfullyBookARoom(checkin, checkout, personalDetails) {
        const homePage = new HomePage(page);
        const roomPage = new RoomPage(page);

        await homePage.goto();
        await homePage.openFirstRoom();
        await roomPage.successfullyBookARoom(checkin, checkout, personalDetails);
    }
}