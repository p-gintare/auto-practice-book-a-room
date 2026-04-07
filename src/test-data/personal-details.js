import {faker} from "@faker-js/faker"

export const personalDetails = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number({style: "human"}),
}