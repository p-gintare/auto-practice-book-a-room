import {today, tomorrow} from "../dates.js";
import {faker} from "@faker-js/faker/locale/en";

export const defaultPayload = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number({style: "human"}),
    roomid: 1,
    depositpaid: false,
    bookingdates: {checkin: today, checkout: tomorrow }
}

export const firstnameIsMissing = {
    name: "Missing firstname",
    payload: {
        ...defaultPayload,
        firstname: ""
    },
    expectedErrorMessage: ["Firstname should not be blank", "size must be between 3 and 18"],
    status: 400
};

export const firstnameIsTooShort = {
    name: "Firstname is too short",
    payload: {
        ...defaultPayload,
        firstname: "Na",
    },
    expectedErrorMessage: ["size must be between 3 and 18"],
    status: 400
};

export const firstnameIsTooLong = {
    name: "Firstname is too long",
    payload: {
        ...defaultPayload,
        firstname: "a".repeat(19),
    },
    expectedErrorMessage: ["size must be between 3 and 18"],
    status: 400
};

export const emailIsWrongType = {
    name: "Email is wrong type",
    payload: {
        ...defaultPayload,
        email: "Na".repeat(5),
    },
    expectedErrorMessage: ["must be a well-formed email address"],
    status: 400
};

