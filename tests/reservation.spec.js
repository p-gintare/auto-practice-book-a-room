import {expect, test} from "../src/fixture/merged-fixture.js";
import {personalDetails} from "../src/test-data/personal-details.js";
import {formatDate, getNextAvailableWeek, nextWeek} from "../src/utils/date-utils.js";
import dayjs from "dayjs";

test("User can book a room for a week", {annotation: {type: 'issue', description: 'url to bug'}}, async ({ roomPage }) => {
    await roomPage.reservationForm.calendar.selectDates(dayjs("2026-06-14"), dayjs("2026-06-20"));
    await roomPage.reservationForm.calendar.clickReservation();
    await roomPage.reservationForm.personalDetails.fillForm(personalDetails);
    // expect tipas 1
    // expect(await roomPage.reservationForm.confirmation.isBookingConfirmed("Booking Confirmed", nextWeek.start, nextWeek.end)).toBe(true);
    // expect tipas 2
    await expect(roomPage.reservationForm.confirmation.title).toHaveText("Booking Confirmed");
    await expect(roomPage.reservationForm.confirmation.dates).toHaveText(`${formatDate(nextWeek.start)} - ${formatDate(nextWeek.end.add(1, 'day'))}`);
    // expect tipas 3
    await roomPage.reservationForm.confirmation.expectBookingIsConfirmed("Booking Confirmed", nextWeek.start, nextWeek.end)
});

test("Book next available week", async ({roomPage, getRoomInfo}) => {
    // const url = page.url();
    // const roomId = url.split("?")[0].split("/").pop();
    const availableWeek = await getNextAvailableWeek(getRoomInfo);

    await roomPage.successfullyBookARoom(availableWeek.start, availableWeek.end, personalDetails);

    // await roomPage.reservationForm.calendar.selectDates(availableWeek.start, availableWeek.end);
    // await roomPage.reservationForm.calendar.clickReservation();
    // await roomPage.reservationForm.personalDetails.fillForm(personalDetails);
    // await roomPage.reservationForm.confirmation.expectBookingIsConfirmed("Booking Confirmed", availableWeek.start, availableWeek.end);
});