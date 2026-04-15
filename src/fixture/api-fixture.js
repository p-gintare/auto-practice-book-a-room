import { test as base } from "@playwright/test"
import {getRoomInformation} from "../api/room-api.js";

export const test = base.extend({
    getRoomInfo: async ({}, use) => {
        const response = await getRoomInformation( 1);
        await use(response);
    }
})

export { expect } from '@playwright/test';