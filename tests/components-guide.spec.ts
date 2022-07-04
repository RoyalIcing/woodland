import { test, expect } from "@playwright/test";
import { printTree } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("https://components.guide/");
});

test.describe("accessibility", () => {
  test("accessibility tree", async ({ page }) => {
    const tree = await page.accessibility.snapshot();
    if (tree) {
      printTree(tree)
    }
  });
});
