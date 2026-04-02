import {test, expect} from "@playwright/test";

test.describe("playwright runner work rules", {tag: "@runner"},() => {
    test.describe("test playwright runner", () => {
        test.beforeAll(() => { console.log("before all")});
        test.beforeEach(() => { console.log("before each")});
        test.afterEach(() => { console.log("after each")});
        test.afterAll(() => { console.log("after all")});

        test("test 1", () => {console.log("test")});
        test("test 2", () => {console.log("test (failed)"); throw new Error("error "); });
        test("test 3", () => {
            console.log("-----------");
            console.log("test");
            // expect(true).toBe(false);
            //     throw new Error("musu throwintas erroras");
            //     console.log("kodas po error'o");
            try {
                throw new Error("musu throwintas erroras");
                console.log("kodas po error'o");
                // koks nors kodas kuris gali sufailinti
                // <...>
            } catch (error) {
                console.log(`modalo nebuvo skippinu paspaudima, error: ${error}`);
                throw error;
            } finally {
                // esantis kodas visada ivyks
                console.log("mano paskutinis zodis");
            }
            console.log("-----------");
        });
        test.skip("test 4", () => {console.log("test")});
        test("test 5", () => {console.log("test")});
    })

    test.describe("test playwright runner, when before each fails", () => {
        test.beforeAll(() => { console.log("before all")});
        test.beforeEach(() => { console.log("before each (fails)"); throw Error("error"); });
        test.afterEach(() => { console.log("after each")});
        test.afterAll(() => { console.log("after all")});

        test("test 1", () => {console.log("test")});
        test("test 2", () => {console.log("test")});
        test("test 3", () => {console.log("test")});
        test("test 4", () => {console.log("test")});
        test("test 5", () => {console.log("test")});
    });

    test.describe("test playwright runner, when before  all fails", () => {
        test.beforeAll(() => { console.log("before all (fails)"); throw Error("error"); });
        test.beforeEach(() => { console.log("before each")});
        test.afterEach(() => { console.log("after each")});
        test.afterAll(() => { console.log("after all")});

        test("test 1", () => {console.log("test")});
        test("test 2", () => {console.log("test")});
        test("test 3", () => {console.log("test")});
        test("test 4", () => {console.log("test")});
        test("test 5", () => {console.log("test")});
    });

    test.describe("test playwright runner, when after each fails", () => {
        test.beforeAll(() => { console.log("before all")});
        test.beforeEach(() => { console.log("before each")});
        test.afterEach(() => { console.log("after each (fails)"); throw Error("error"); });
        test.afterAll(() => { console.log("after all")});

        test("test 1", () => {console.log("test")});
        test("test 2", () => {console.log("test")});
        test("test 3", () => {console.log("test")});
        test("test 4", () => {console.log("test")});
        test("test 5", () => {console.log("test")});
    });

    test.describe("test playwright runner, when after all fails", () => {
        test.beforeAll(() => { console.log("before all")});
        test.beforeEach(() => { console.log("before each")});
        test.afterEach(() => { console.log("after each")});
        test.afterAll(() => { console.log("after all (fails)"); throw Error("error"); });

        test("test 1", () => {console.log("test")});
        test("test 2", () => {console.log("test")});
        test("test 3", () => {console.log("test")});
        test("test 4", () => {console.log("test")});
        test("test 5", () => {console.log("test")});
    });
});


