import {test, expect} from '@playwright/test'
import {today, tomorrow} from "./../src/dates.js";
import {faker} from "@faker-js/faker/locale/en";
import {HomePage} from "../src/pages/home-page.js";


// const today = dayjs(new Date()).format("YYYY-MM-DD");
// const tomorrow = dayjs(new Date()).add(1, 'day').format("YYYY-MM-DD");

const defaultPayload = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number({style: "human"}),
    roomid: 1,
    depositpaid: false,
    bookingdates: {checkin: today, checkout: tomorrow}
}

// ka daro --grep package.json script skiltyje
//tag: ["@api", "@smoke", "@regression"].includes("@api")

const missingFirstName = {
    name: "Missing firstname",
    payload: {
        ...defaultPayload,
        firstname: "",
    },
    expectedErrorMessage: ["Firstname should not be blank", "size must be between 3 and 18"],
}

test.describe("Validation tests", () => {

    test.beforeEach(async ({page}) => {
        console.log("before each");
        await test.step("Click on first room", async () => {
            await page.goto("/");
            const linkBookNow = page.locator("#rooms").getByRole("link", {name: "Book now"});
            await linkBookNow.first().click();
        });

        await test.step("Click on reservation", async () => {
            const buttonDoReservation = page.locator("#doReservation");
            await buttonDoReservation.scrollIntoViewIfNeeded();
            await buttonDoReservation.click();
        });
    });

    test.afterEach(() => {
        console.log("after each");
    });

    [missingFirstName,
        {
            name: "Firstname is too short",
            payload: {
                ...defaultPayload,
                firstname: "Na",
            },
            expectedErrorMessage: ["size must be between 3 and 18"]
        },
        // {
        //     name: "Firstname is too long",
        //     payload: {
        //         ...defaultPayload,
        //         firstname: "a".repeat(19),
        //     },
        //     expectedErrorMessage: ["size must be between 3 and 18"]
        // },
        // {
        //     name: "Email is wrong type",
        //     payload: {
        //         ...defaultPayload,
        //         email: "Na".repeat(5),
        //     },
        //     expectedErrorMessage: ["must be a well-formed email address"]
        // },

    ].forEach(testCase => {
        test(`${testCase.name} error message is: ${testCase.expectedErrorMessage} with payload: ${testCase.payload}`, async ({page}) => {
            // https://automationintesting.online/reservation/1?checkin=2026-03-27&checkout=2026-03-28

            // await page.goto(`https://automationintesting.online/reservation/1?checkin=${today}&checkout=${tomorrow}`);
            console.log("test");
            const homePage = new HomePage(page);

            await test.step("Fill reservation form", async () => {

                await test.step(`Fill first name with: ${testCase.payload.firstname}`, async () => {
                    const inputFirstname = page.locator("[name = 'firstname']");
                    await inputFirstname.fill(testCase.payload.firstname);
                });

                const inputLastname = page.locator("[name = 'lastname']");
                await inputLastname.fill(testCase.payload.lastname);

                const inputEmail = page.locator("[name = 'email']");
                await inputEmail.fill(testCase.payload.email);

                const inputPhone = page.locator("[name = 'phone']");
                await inputPhone.fill(testCase.payload.phone);

                const buttonReserveNow = page.getByRole("button", {name: "Reserve Now"});
                await buttonReserveNow.click();
            });

            await test.step(`Expect booking returns error ${testCase.expectedErrorMessage.join(", ")}`, async () => {
                const actualErrorList = page.locator(".alert li");
                await expect(actualErrorList).toHaveCount(testCase.expectedErrorMessage.length);
                await expect(actualErrorList).toContainText(testCase.expectedErrorMessage);
            });

        });
    });
    [
        {
            name: "0 nights booking",
            payload: {
                ...defaultPayload,
                bookingdates: {checkin: today, checkout: today}
            },
            expectedErrorMessage: ["Failed to create booking"]
        },
        {
            name: "Checkout date is less than checkin date",
            payload: {
                ...defaultPayload,
                bookingdates: {checkin: tomorrow, checkout: today}
            },
            expectedErrorMessage: ["Failed to create booking"]
        },
        {
            name: "Cannot book for room with id -1",
            payload: {...defaultPayload, roomid: -1},
            expectedErrorMessage: ["must be greater than or equal to 1"],
            status: 400
        },
        {
            name: "Cannot book for non existing room",
            payload: {...defaultPayload, roomid: "aaa"},
            expectedErrorMessage: ["Failed to create booking"]
        },
        {
            name: "Missing firstname",
            payload: {
                ...defaultPayload,
                firstname: "",
            },
            expectedErrorMessage: ["Firstname should not be blank", "size must be between 3 and 18"],
            status: 400
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
                firstname: "a".repeat(19),
            },
            expectedErrorMessage: ["size must be between 3 and 18"]
        },
        {
            name: "Email is wrong type",
            payload: {
                ...defaultPayload,
                email: "Na".repeat(5),
            },
            expectedErrorMessage: ["must be a well-formed email address"]
        },
        {
            name: "Email is empty",
            payload: {
                ...defaultPayload,
                email: "",
            },
            expectedErrorMessage: ["must not be empty"]
        },
        {
            name: "Phone number is empty",
            payload: {...defaultPayload, phone: ""},
            expectedErrorMessage: ["must not be empty", "size must be between 11 and 21"]
        },
        {
            name: "Phone number is too long",
            payload: {...defaultPayload, phone: "1".repeat(22)},
            expectedErrorMessage: ["size must be between 11 and 21"]
        },
        {
            name: "Phone number is too short",
            payload: {...defaultPayload, phone: "1".repeat(10)},
            expectedErrorMessage: ["size must be between 11 and 21"]
        },
        {
            name: "Missing lastname",
            payload: {
                ...defaultPayload,
                lastname: "",
            },
            expectedErrorMessage: ["Lastname should not be blank", "size must be between 3 and 30"],
        },
        {
            name: "Lastname is too short",
            payload: {
                ...defaultPayload,
                lastname: "Na",
            },
            expectedErrorMessage: ["size must be between 3 and 30"]
        },
        {
            name: "Lastname is too long",
            payload: {
                ...defaultPayload,
                lastname: "a".repeat(31),
            },
            expectedErrorMessage: ["size must be between 3 and 30"]
        },
    ].forEach(testCase => {
        test.skip(`[API] ${testCase.name} error message is: ${testCase.expectedErrorMessage}`, {
            tag: ["@api", "@smoke", "@regression"],
            annotation: {
                type: "payload",
                description: `${JSON.stringify(testCase.payload, null, 2)}`,
            }
        }, async ({request}) => {

            const response = await test.step("[API POST] Book a room", async () => {
                return await request.post("https://automationintesting.online/api/booking", {
                    data: testCase.payload,
                });
            });

            expect(response.status()).toBe(testCase.status);
            // const expectedStatusCode = new RegExp("400|409")

            await test.step("Expect status code to be 400 or 409", async () => {
                expect(response.status().toString(), `Response: ${await response.text()}`).toMatch(/400|409/);
            });

            await test.step("Expect error message to match", async () => {
                const json = await response.json();
                const actualErrors = json.errors ?? [json.error];
                expect(actualErrors.sort().join(", ")).toBe(testCase.expectedErrorMessage.sort().join(", "));
            });
        });
    });
});

/** bug'ai:
 * - email be domeno
 * - galima sukurti bookinga i praeiti
 * - telefonas gali buti is raidziu
 **/