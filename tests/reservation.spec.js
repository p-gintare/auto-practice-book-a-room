import {expect, test} from "@playwright/test";
import {HomePage} from "../src/pages/home-page.js";
import {RoomPage} from "../src/pages/room/room-page.js";
import {personalDetails} from "../src/test-data/personal-details.js";
import {formatDate, getNextAvailableWeek, nextWeek} from "../src/utils/date-utils.js";
import {getRoomInformation} from "../src/api/room-api.js";

test("User can book a room for a week", {annotation: {type: 'issue', description: 'url to bug'}}, async ({page}) => {
    const homePage = new HomePage(page);
    const roomPage = new RoomPage(page);

    await homePage.goto();
    await homePage.openFirstRoom();

    await roomPage.reservationForm.calendar.selectDates(nextWeek.start, nextWeek.end);
    await roomPage.reservationForm.calendar.clickReservation();
    await roomPage.reservationForm.personalDetails.fillForm(personalDetails);
    // expect tipas 1
    expect(await roomPage.reservationForm.confirmation.isBookingConfirmed("Booking Confirmed", nextWeek.start, nextWeek.end)).toBe(true);
    // expect tipas 2
    await expect(roomPage.reservationForm.confirmation.title).toHaveText("Booking Confirmed");
    await expect(roomPage.reservationForm.confirmation.dates).toHaveText(`${formatDate(nextWeek.start)} - ${formatDate(nextWeek.end)}`);
    // expect tipas 3
    await roomPage.reservationForm.confirmation.expectBookingIsConfirmed("Booking Confirmed", nextWeek.start, nextWeek.end)
});

test("Book next available week", async ({page}) => {
    const homePage = new HomePage(page);
    const roomPage = new RoomPage(page);

    await homePage.goto();
    await homePage.openRoom(2);
    const url = page.url();
    const roomId = url.split("?")[0].split("/").pop();
    const roomInformation = await getRoomInformation(roomId);
    const availableWeek = await getNextAvailableWeek(roomInformation);

    await roomPage.reservationForm.calendar.selectDates(availableWeek.start, availableWeek.end);
    await roomPage.reservationForm.calendar.clickReservation();
    await roomPage.reservationForm.personalDetails.fillForm(personalDetails);
    await roomPage.reservationForm.confirmation.expectBookingIsConfirmed("Booking Confirmed", availableWeek.start, availableWeek.end);
});