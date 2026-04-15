import {mergeTests} from "@playwright/test";
import {test as pageFixtures} from "./page-fixture.js"
import {test as apiFixtures} from "./api-fixture.js"


export const test = mergeTests(pageFixtures, apiFixtures);

export { expect } from '@playwright/test';