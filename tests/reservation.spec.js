import {expect, test} from "@playwright/test";
import {HomePage} from "../src/pages/home-page.js";
import {RoomPage} from "../src/pages/room/room-page.js";
import {personalDetails} from "../src/test-data/personal-details.js";
import dayjs from "dayjs";
import {DATE_FORMAT} from "../src/utils/date-utils.js";

test("User can book a room for a week", {annotation: {type: 'issue', description: 'url to bug'}}, async ({page}) => {
    const homePage = new HomePage(page);
    const roomPage = new RoomPage(page);

    await homePage.goto();
    await homePage.openFirstRoom();

    const checkin = dayjs().add(1, 'days');
    const checkout = dayjs().add(3, 'days');


    await roomPage.reservationForm.calendar.selectDates(checkin.get('date').toString().padStart(2, "0"), checkout.get('date').toString().padStart(2, "0"));
    await roomPage.reservationForm.calendar.clickReservation();
    await roomPage.reservationForm.personalDetails.fillForm(personalDetails);
    await expect(roomPage.reservationForm.confirmation.title).toHaveText("Booking Confirmed");
    await expect(roomPage.reservationForm.confirmation.dates).toHaveText(`${checkin.format(DATE_FORMAT)} - ${checkout.format(DATE_FORMAT)}`);

    // await page.waitForTimeout(1_000);
    // const buttonLink = page.getByRole("button", {name: "12"});
    // const buttonLink2 = page.getByRole("button", {name: "17"});
    // const parentRow = buttonLink.locator("../../..");
    // const selectedDateElement = parentRow.locator(".rbc-event-content", {hasText: "Selected"})
    // // await buttonLink.dragTo(buttonLink2);
    // // await buttonLink.click();
    // await buttonLink.hover();
    // await page.mouse.down();
    // //
    // // // await page.waitForTimeout(3_000);
    // // await new Promise(resolve => setTimeout(resolve, 300));
    // const box = await buttonLink2.boundingBox();
    // await page.mouse.move(box.x, box.y);
    // await buttonLink2.hover();
    // // await buttonLink2.hover();
    // await page.mouse.up();
    // // await page.waitForTimeout(3_000);
    // await expect(selectedDateElement).toBeEnabled({timeout: 2_000});
});