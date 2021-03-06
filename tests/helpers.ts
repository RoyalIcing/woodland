import type { Page } from "@playwright/test";
import { test as baseTest } from "@playwright/test";
import {
  fixtures,
  type TestingLibraryFixtures,
} from "@playwright-testing-library/test/fixture";
export { within } from "@playwright-testing-library/test";

export const test = baseTest.extend<TestingLibraryFixtures>(fixtures);
export const { expect } = test;

export function printTree(node: AccessibilityNode, level = 0) {
  const prefix =
    level === 0
      ? ""
      : level === 1
      ? "┣ "
      : Array(level - 1)
          .fill("┃")
          .join("") + " ├ ";

  if (node.role) {
    // console.log(`${prefix}${node.role}: ${JSON.stringify(node.name)} ${typeof node.value === 'string' ? JSON.stringify(node.value) : ''}`)
    console.log(
      `${prefix}${node.role.padEnd(10, " ")} ${node.name} ${
        typeof node.value === "string" ? JSON.stringify(node.value) : ""
      }`
    );
  }

  if (node.children) {
    for (const child of node.children) {
      printTree(child, level + 1);
    }
  }
}

type AccessibilityNode = NonNullable<
  Awaited<ReturnType<Page["accessibility"]["snapshot"]>>
>;
