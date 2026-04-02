import {test, expect} from '@playwright/test'
import {today, tomorrow} from "./../src/dates.js";
import {HomePage} from "../src/pages/home-page.js";
import {
    emailIsWrongType,
    firstnameIsMissing,
    firstnameIsTooShort,
    firstnameIsTooLong
} from "../src/test-data/validation-test-data.js";
import {RoomPage} from "../src/pages/room-page.js";
import {defaultPayload} from "../src/test-data/validation-test-data.js";

// ka daro --grep package.json script skiltyje
//tag: ["@api", "@smoke", "@regression"].includes("@api")


    test.describe("Validation tests", () => {

        test.beforeEach(async ({page}) => {
            // https://automationintesting.online/reservation/1?checkin=2026-03-27&checkout=2026-03-28
            // await page.goto(`https://automationintesting.online/reservation/1?checkin=${today}&checkout=${tomorrow}`);
            const homePage = new HomePage(page);
            const roomPage = new RoomPage(page);

            await homePage.goto();
            await homePage.openRoom(0);
            await roomPage.clickReservation();
        });

        test.afterEach(() => {
        });

        [firstnameIsMissing].forEach(testCase => {
            test(`${testCase.name} error message is: ${testCase.expectedErrorMessage} with payload: ${testCase.payload}`, async ({page}) => {

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
                    await page.locator(".alert").scrollIntoViewIfNeeded();
                    await expect(actualErrorList).toHaveCount(testCase.expectedErrorMessage.length);

                    await expect(actualErrorList).toContainText(testCase.expectedErrorMessage);
                });

            });
        });

        [firstnameIsMissing, firstnameIsTooShort, firstnameIsTooLong, emailIsWrongType,
            {
                name: "0 nights booking",
                payload: {
                    ...defaultPayload,
                    bookingdates: {checkin: today, checkout: today}
                },
                expectedErrorMessage: ["Failed to create booking"],
                status: 409
            },
            {
                name: "Checkout date is less than checkin date",
                payload: {
                    ...defaultPayload,
                    bookingdates: {checkin: tomorrow, checkout: today}
                },
                expectedErrorMessage: ["Failed to create booking"],
                status: 409
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
                expectedErrorMessage: ["Failed to create booking"],
                status: 400
            },
            {
                name: "Email is empty",
                payload: {
                    ...defaultPayload,
                    email: "",
                },
                expectedErrorMessage: ["must not be empty"],
                status: 400
            },
            {
                name: "Phone number is empty",
                payload: {...defaultPayload, phone: ""},
                expectedErrorMessage: ["must not be empty", "size must be between 11 and 21"],
                status: 400
            },
            {
                name: "Phone number is too long",
                payload: {...defaultPayload, phone: "1".repeat(22)},
                expectedErrorMessage: ["size must be between 11 and 21"],
                status: 400
            },
            {
                name: "Phone number is too short",
                payload: {...defaultPayload, phone: "1".repeat(10)},
                expectedErrorMessage: ["size must be between 11 and 21"],
                status: 400
            },
            {
                name: "Missing lastname",
                payload: {
                    ...defaultPayload,
                    lastname: "",
                },
                expectedErrorMessage: ["Lastname should not be blank", "size must be between 3 and 30"],
                status: 400
            },
            {
                name: "Lastname is too short",
                payload: {
                    ...defaultPayload,
                    lastname: "Na",
                },
                expectedErrorMessage: ["size must be between 3 and 30"],
                status: 400
            },
            {
                name: "Lastname is too long",
                payload: {
                    ...defaultPayload,
                    lastname: "a".repeat(31),
                },
                expectedErrorMessage: ["size must be between 3 and 30"],
                status: 400
            },
        ].forEach(testCase => {
            test(`[API] ${testCase.name} error message is: ${testCase.expectedErrorMessage}`, {
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

                await test.step(`Expect status code is ${testCase.status}`, () => {
                    expect(response.status()).toBe(testCase.status);
                });

                // arba galima ir kitaip:
                // await test.step("Expect status code to be 400 or 409", async () => {
                //     expect(response.status().toString(), `Response: ${await response.text()}`).toMatch(/400|409/);
                // });

                await test.step("Expect error message to match", async () => {
                    let actualErrors;

                    try {
                        const json = await response.json();
                        actualErrors = json.errors ?? (json.error ? [json.error]: []);
                    } catch (e) {
                        actualErrors = [await response.text()];
                    }

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