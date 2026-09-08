import { test, expect } from "@playwright/test";
const process = (globalThis as any).process;

/**
 * @tags @standard
 *
 * Standard Suite — Accessibility Scans
 * Translated from QDR `test_accessibility.py` (Dataverse-side subset, ~10 scans).
 *
 * Injects axe-core via CDN (no extra dependencies) and runs scans on key pages.
 * Critical/serious violations fail the test; moderate/minor are logged only.
 *
 * Scanned pages:
 *   1. Root / homepage
 *   2. Search results
 *   3. Dataset view (draft)
 *   4. Dataset metadata edit panel
 *   5. Account — My Data tab
 *   6. Account — Notifications tab
 *   7. Account — Account Information tab
 *   8. Account — API Token tab
 *   9. Dataset permissions page
 *   10. New Dataset form
 *
 * Selector reference: secure_docs/SELECTOR_MAP.md
 */

const AXE_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.1/axe.min.js";

async function runAxe(page: any): Promise<{ violations: any[] }> {
  const loaded = await page.evaluate(
    () => typeof (window as any).axe !== "undefined",
  );
  if (!loaded) {
    await page.addScriptTag({ url: AXE_CDN });
    await page.waitForFunction(
      () => typeof (window as any).axe !== "undefined",
      { timeout: 15000 },
    );
  }
  return page.evaluate(async () => {
    const axe = (window as any).axe;
    const res = await axe.run(document);
    return {
      violations: res.violations.map((v: any) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length,
      })),
    };
  });
}

function assertNoBlockingViolations(violations: any[], pageLabel: string) {
  const blocking = violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
  const nonBlocking = violations.filter(
    (v) => v.impact !== "critical" && v.impact !== "serious",
  );
  if (nonBlocking.length > 0) {
    console.log(
      `[a11y] ${pageLabel}: ${nonBlocking.length} moderate/minor (not blocking): ` +
        nonBlocking.map((v: any) => v.id).join(", "),
    );
  }
  if (blocking.length > 0) {
    const detail = blocking
      .map(
        (v: any) =>
          `\n  [${v.impact}] ${v.id}: ${v.description} (${v.nodes} node(s))`,
      )
      .join("");
    throw new Error(
      `[a11y] ${pageLabel}: ${blocking.length} critical/serious violation(s):${detail}`,
    );
  }
}

const a11ySuffix = Date.now().toString(36);
let sharedDatasetUrl = process.env.A11Y_DATASET_URL ?? "";

test.describe.serial("Accessibility Scans", () => {

  test.beforeAll(async ({ browser }) => {
    if (sharedDatasetUrl) return;
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(process.env.ROOT_DATAVERSE ?? "/");
    await page.getByRole("button", { name: "Add Data" }).click();
    await page.getByRole("link", { name: "New Dataset" }).click();
    await page.waitForLoadState("domcontentloaded");
    await page.locator('[id$=":0:inputText"]').first()
      .fill(`A11y Test Dataset ${a11ySuffix}`);
    await page.locator('[id$=":0:description"]').first()
      .fill("Dataset for accessibility scans.");
    await page.locator(".ui-selectcheckboxmenu-multiple-container").first().click();
    await page.locator(".ui-selectcheckboxmenu-items-wrapper").first()
      .getByText("Other").click();
    await page.locator(".ui-selectcheckboxmenu-multiple-container").first().click();
    await page.getByRole("button", { name: "Save Dataset" }).click();
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByText("This dataset has been created."))
      .toBeVisible({ timeout: 30000 });
    sharedDatasetUrl = page.url();
    await context.close();
  });

  test.afterAll(async ({ browser }) => {
    if (!sharedDatasetUrl || process.env.A11Y_DATASET_URL) return;
    try {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(sharedDatasetUrl);
      await page.waitForLoadState("domcontentloaded");
      await page.locator("#editDataSet").click();
      await page.locator("#datasetForm\\:deleteDataset").click();
      await page.locator("#datasetForm\\:deleteConfirmation")
        .getByRole("button", { name: "Continue" }).click();
      await context.close();
    } catch {
      console.warn("a11y afterAll: could not delete test dataset:", sharedDatasetUrl);
    }
  });

  // Scan 1: Root homepage
  test("a11y: Root homepage", { tag: ["@standard"] }, async ({ page }) => {
    await page.goto(process.env.ROOT_DATAVERSE ?? "/");
    await page.waitForLoadState("domcontentloaded");
    const { violations } = await runAxe(page);
    assertNoBlockingViolations(violations, "Root homepage");
  });

  // Scan 2: Search results
  test("a11y: Search results page", { tag: ["@standard"] }, async ({ page }) => {
    await page.goto(process.env.ROOT_DATAVERSE ?? "/");
    await page.waitForLoadState("domcontentloaded");
    const searchInput = page.getByPlaceholder(/Search/i).first();
    if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await searchInput.fill("test");
      await page.keyboard.press("Enter");
      await page.waitForLoadState("domcontentloaded");
    }
    const { violations } = await runAxe(page);
    assertNoBlockingViolations(violations, "Search results");
  });

  // Scan 3: Dataset view page
  test("a11y: Dataset view page", { tag: ["@standard"] }, async ({ page }) => {
    if (!sharedDatasetUrl) { console.log("Info: No dataset URL."); return; }
    await page.goto(sharedDatasetUrl);
    await page.waitForLoadState("domcontentloaded");
    const { violations } = await runAxe(page);
    assertNoBlockingViolations(violations, "Dataset view");
  });

  // Scan 4: Dataset metadata edit panel
  test("a11y: Dataset metadata edit panel", { tag: ["@standard"] }, async ({ page }) => {
    if (!sharedDatasetUrl) { console.log("Info: No dataset URL."); return; }
    await page.goto(sharedDatasetUrl);
    await page.waitForLoadState("domcontentloaded");
    await page.locator("#editDataSet").click();
    const metadataLink = page.locator("#datasetForm\\:editMetadata");
    if (await metadataLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await metadataLink.click();
      await page.waitForTimeout(2000);
    }
    const { violations } = await runAxe(page);
    assertNoBlockingViolations(violations, "Dataset metadata edit");
  });

  // Scan 5: Account — My Data tab
  test("a11y: Account My Data tab", { tag: ["@standard"] }, async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/dataverseuser.xhtml?selectTab=myDataTab`);
    await page.waitForLoadState("domcontentloaded");
    const { violations } = await runAxe(page);
    assertNoBlockingViolations(violations, "Account — My Data");
  });

  // Scan 6: Account — Notifications tab
  test("a11y: Account Notifications tab", { tag: ["@standard"] }, async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/dataverseuser.xhtml?selectTab=notifications`);
    await page.waitForLoadState("domcontentloaded");
    const { violations } = await runAxe(page);
    assertNoBlockingViolations(violations, "Account — Notifications");
  });

  // Scan 7: Account — Account Information tab
  test("a11y: Account Information tab", { tag: ["@standard"] }, async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/dataverseuser.xhtml?selectTab=accountInfo`);
    await page.waitForLoadState("domcontentloaded");
    const { violations } = await runAxe(page);
    assertNoBlockingViolations(violations, "Account — Info");
  });

  // Scan 8: Account — API Token tab
  test("a11y: Account API Token tab", { tag: ["@standard"] }, async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/dataverseuser.xhtml?selectTab=apiTokenTab`);
    await page.waitForLoadState("domcontentloaded");
    const { violations } = await runAxe(page);
    assertNoBlockingViolations(violations, "Account — API Token");
  });

  // Scan 9: Dataset permissions page
  test("a11y: Dataset permissions page", { tag: ["@standard"] }, async ({ page }) => {
    if (!sharedDatasetUrl) { console.log("Info: No dataset URL."); return; }
    await page.goto(sharedDatasetUrl);
    await page.waitForLoadState("domcontentloaded");
    await page.locator("#editDataSet").click();
    await page
      .locator("li.dropdown-submenu a", { hasText: "Permissions" })
      .first()
      .hover();
    await page.locator("#datasetForm\\:manageDatasetPermissions").click();
    await page.waitForURL(/permissions-manage\.xhtml/, { timeout: 15000 });
    await expect(page.locator("#rolesPermissionsForm\\:userGroupsAdd"))
      .toBeVisible({ timeout: 10000 });
    const { violations } = await runAxe(page);
    assertNoBlockingViolations(violations, "Dataset permissions");
  });

  // Scan 10: New Dataset form
  test("a11y: New Dataset form", { tag: ["@standard"] }, async ({ page }) => {
    await page.goto(process.env.ROOT_DATAVERSE ?? "/");
    await page.waitForLoadState("domcontentloaded");
    await page.getByRole("button", { name: "Add Data" }).click();
    await page.getByRole("link", { name: "New Dataset" }).click();
    await page.waitForLoadState("domcontentloaded");
    const { violations } = await runAxe(page);
    assertNoBlockingViolations(violations, "New Dataset form");
  });
});

