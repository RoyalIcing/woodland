import { test, expect, type Page } from "@playwright/test";

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

function printTree(node: AccessibilityNode, prefix = '') {
  if (node.role) {
    console.log(`${prefix}${node.role}: ${JSON.stringify(node.name)} ${typeof node.value === 'string' ? JSON.stringify(node.value) : ''}`)
  }
  
  if (node.children) {
    for (const child of node.children) {
      printTree(child, '- ' + prefix)
    }
  }
}

type AccessibilityNode = NonNullable<Awaited<ReturnType<Page["accessibility"]["snapshot"]>>>
