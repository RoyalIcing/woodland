import { test, expect, printTree } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("https://stripe.com/");
});

test.describe("accessibility", () => {
  test("accessibility tree", async ({ page }) => {
    const tree = await page.accessibility.snapshot();
    if (tree) {
      printTree(tree);
    }
  });
});
