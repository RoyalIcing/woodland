import { test, expect, printTree } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("https://components.guide/");
});

test.describe("accessibility", () => {
  test("accessibility tree", async ({ page }) => {
    const tree = await page.accessibility.snapshot();
    if (tree) {
      printTree(tree);
    }
    expect(JSON.stringify(tree, null, 2)).toMatchSnapshot(
      "accessibility-tree.json"
    );
  });

  test("has primary nav", async ({ queries: { getByRole } }) => {
    await getByRole('navigation', { name: 'Primary' });
  });
});
