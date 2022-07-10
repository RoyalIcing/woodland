import { test, within, printTree } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("https://developer.mozilla.org/en-US/");
});

test.describe("accessibility", () => {
  test("accessibility tree", async ({ page }) => {
    const tree = await page.accessibility.snapshot();
    if (tree) {
      printTree(tree);
    }
  });
});

test.describe("landmarks", () => {
  test("has main nav", async ({ queries: { getByRole } }) => {
    await getByRole('navigation', { name: 'Main menu' });
  });

  test("has main landmark", async ({ queries: { getByRole } }) => {
    await getByRole('main');
  });

  test("has banner landmark", async ({ queries: { getByRole } }) => {
    await getByRole('banner');
  });

  test("has search form inside banner", async ({ queries: { getByRole } }) => {
    const banner = await getByRole('banner');
    const withinBanner =  within(banner);
    await withinBanner.getByRole('search');
  });
});
