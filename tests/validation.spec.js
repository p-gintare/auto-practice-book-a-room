import { test, expect } from '@playwright/test'
import dayjs from "dayjs";

// {"roomid":1,"firstname":"","lastname":"","depositpaid":false,"bookingdates":{"checkin":"2026-03-01","checkout":"2026-03-04"},"email":"","phone":""}

const defaultPayload = {
    firstname:"Name",
    lastname:"Surnameas",
    email:"test@test.org",
    phone:"+3706444555598",
    roomid:1,
    depositpaid:false,
    bookingdates:{checkin:"2026-03-01",checkout:"2026-03-04"}
}

test.describe("Validation tests", () => {
    [
        {
            name: "Missing firstname",
            payload: {
                ...defaultPayload,
                firstname:"",
                },
            expectedErrorMessage: ["Firstname should not be blank", "size must be between 3 and 18"],
        },
        {
            name: "Firstname is too short",
            payload: {
                ...defaultPayload,
                firstname: "Na",
            },
            expectedErrorMessage: ["size must be between 3 and 18"]
        },
        {
            name: "Firstname is too long",
            payload: {
                ...defaultPayload,
                firstname:"a".repeat(19),
                },
            expectedErrorMessage: ["size must be between 3 and 18"]
        },
        {
            name: "Email is wrong type",
            payload: {
                ...defaultPayload,
                email:"Na".repeat(5),
            },
            expectedErrorMessage: ["must be a well-formed email address"]
        },

    ].forEach(testCase => {
        test(`${testCase.name} error message is: ${testCase.expectedErrorMessage} with payload: ${testCase.payload}`, async({ page}) => {
           // https://automationintesting.online/reservation/1?checkin=2026-03-27&checkout=2026-03-28
            const today = dayjs(new Date());
            const tomorrow = dayjs(new Date()).add(1, 'day');
            await page.goto(`https://automationintesting.online/reservation/1?checkin=${today.format("YYYY-MM-DD")}&checkout=${tomorrow.format("YYYY-MM-DD")}`);
            // await page.goto("/");
            //
            // const linkBookNow = page.locator("#rooms").getByRole("link", {name: "Book now"});
            // await linkBookNow.first().scrollIntoViewIfNeeded();
            // await linkBookNow.first().click();
            //
            const buttonDoReservation = page.locator("#doReservation");
            await buttonDoReservation.scrollIntoViewIfNeeded();
            await buttonDoReservation.click();

            const inputFirstname = page.locator("[name = 'firstname']");
            await inputFirstname.fill(testCase.payload.firstname);

            const inputLastname = page.locator("[name = 'lastname']");
            await inputLastname.fill(testCase.payload.lastname);

            const inputEmail = page.locator("[name = 'email']");
            await inputEmail.fill(testCase.payload.email);

            const inputPhone = page.locator("[name = 'phone']");
            await inputPhone.fill(testCase.payload.phone);

            const buttonReserveNow = page.getByRole("button", {name: "Reserve Now"});
            await buttonReserveNow.click();

            const divMustBetweenAndNot = page.locator(".alert li");
            await expect(divMustBetweenAndNot).toHaveText(testCase.expectedErrorMessage);
        });
    });
[{
    name: "Missing email address", payload: {...defaultPayload, bookingdates: { checkin: dayjs(new Date()), checkout: dayjs(new Date())}}, expectedErrorMessage: ["address should not be empty"]
}
].forEach(testCase => {
    test(`[API] ${testCase.name}`, async ({request}) => {
        const response = await request.post("https://automationintesting.online/api/booking", {
            data: testCase.payload,
        });

        expect(response.status()).toBe(400);
        await response.json();
        // patikrinti error zinutes
    });
})

});