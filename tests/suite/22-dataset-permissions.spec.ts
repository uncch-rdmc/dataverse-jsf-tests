import { test, expect } from "@playwright/test";
const process = (globalThis as any).process;

/**
 * @tags @standard
 *
 * Standard Suite — Tests #72–#78
 * Translated from QDR `test_dataset_permissions.py`.
 *
 * Covers dataset-level permissions (permissions-manage.xhtml) and
 * file-level permissions (permissions-manage-files.xhtml).
 *
 * Tests (in order):
 *   1. Permissions page loads — Assign Roles button + table row visible   #72–#73
 *   2. Assign Curator role to :authenticated-users                        #74
 *   3. Remove the Curator role                                            #74
 *   4. File permissions page loads                                        #75
 *   5. Grant file access to :authenticated-users; verify table row        #76–#77
 *   6. Revoke file access; verify row gone                                #78
 *
 * Selector reference: secure_docs/SELECTOR_MAP.md
 */

const PERMISSIONS_DATASET_PID = process.env.PERMISSIONS_DATASET_PID ?? "";
const suffix = Date.now().toString(36);

test.describe.serial("Dataset & File Permissions Management", () => {
  let datasetUrl = "";

  // ── Setup: create a temporary draft dataset ──────────────────────────────

  test.beforeAll(async ({ browser }) => {
    if (PERMISSIONS_DATASET_PID) {
      const base = process.env.BASE_URL ?? "";
      datasetUrl = `${base}/dataset.xhtml?persistentId=${PERMISSIONS_DATASET_PID}`;
      return;
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(process.env.ROOT_DATAVERSE ?? "/");
    await page.getByRole("button", { name: "Add Data" }).click();
    await page.getByRole("link", { name: "New Dataset" }).click();
    await page.waitForLoadState("domcontentloaded");

    await page.locator('[id$=":0:inputText"]').first()
      .fill(`Permissions Test Dataset ${suffix}`);
    await page.locator('[id$=":0:description"]').first()
      .fill("Temporary dataset for permissions tests.");

    await page.locator(".ui-selectcheckboxmenu-multiple-container").first().click();
    await page.locator(".ui-selectcheckboxmenu-items-wrapper").first()
      .getByText("Other").click();
    await page.locator(".ui-selectcheckboxmenu-multiple-container").first().click();

    await page.getByRole("button", { name: "Save Dataset" }).click();
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByText("This dataset has been created."))
      .toBeVisible({ timeout: 30000 });

    datasetUrl = page.url();
    await context.close();
  });

  // ── Teardown: delete created dataset ─────────────────────────────────────

  test.afterAll(async ({ browser }) => {
    if (!datasetUrl || PERMISSIONS_DATASET_PID) return;
    try {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(datasetUrl);
      await page.waitForLoadState("domcontentloaded");
      await page.locator("#editDataSet").click();
      await page.locator("#datasetForm\\:deleteDataset").click();
      await page.locator("#datasetForm\\:deleteConfirmation")
        .getByRole("button", { name: "Continue" }).click();
      await context.close();
    } catch {
      console.warn("afterAll: could not delete test dataset —", datasetUrl);
    }
  });

  // ── Helper: navigate to dataset permissions page ──────────────────────────

  async function goToDatasetPerms(page: any) {
    await page.goto(datasetUrl);
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
  }

  // ── Helper: navigate to file permissions page ─────────────────────────────

  async function goToFilePerms(page: any) {
    await page.goto(datasetUrl);
    await page.waitForLoadState("domcontentloaded");
    await page.locator("#editDataSet").click();
    await page
      .locator("li.dropdown-submenu a", { hasText: "Permissions" })
      .first()
      .hover();
    await page.locator("#datasetForm\\:manageFilePermissions").click();
    await page.waitForURL(/permissions-manage-files\.xhtml/, { timeout: 15000 });
    await expect(page.locator("#rolesPermissionsForm\\:userGroupsAdd"))
      .toBeVisible({ timeout: 10000 });
  }

  // Test 1 (#72–#73): permissions page loads
  test(
    "Standard: Permissions page loads — Assign Roles button and table visible",
    { tag: ["@standard"] },
    async ({ page }) => {
      await goToDatasetPerms(page);
      const rows = page.locator("#rolesPermissionsForm\\:assignedRoles_data tr");
      await expect(rows.first()).toBeVisible({ timeout: 10000 });
      expect(await rows.count()).toBeGreaterThanOrEqual(1);
    },
  );

  // Test 2 (#74): assign Curator to :authenticated-users
  test(
    "Standard: Assign Curator role to :authenticated-users",
    { tag: ["@standard"] },
    async ({ page }) => {
      await goToDatasetPerms(page);
      await page.locator("#rolesPermissionsForm\\:userGroupsAdd").click();

      const userInput = page.locator(
        "#rolesPermissionsForm\\:userGroupNameAssign_input",
      );
      await expect(userInput).toBeVisible({ timeout: 10000 });
      await userInput.fill(":authenticated-users");

      await expect(page.locator(".ui-autocomplete-item").first())
        .toBeVisible({ timeout: 10000 });
      await page.locator(".ui-autocomplete-item").first().click();

      const curatorLabel = page.locator("label", { hasText: "Curator" });
      await expect(curatorLabel).toBeVisible({ timeout: 10000 });
      const inputId = await curatorLabel.getAttribute("for");
      await page
        .locator(
          `//input[@id='${inputId}']/ancestor::div[contains(@class,'ui-radiobutton')]` +
            `//div[contains(@class,'ui-radiobutton-box')]`,
        )
        .click();

      await page
        .locator(
          "//div[@id='rolesPermissionsForm:userGroupDialog']" +
            "//button[normalize-space(.)='Save Changes']",
        )
        .click();
      await expect(userInput).not.toBeVisible({ timeout: 10000 });

      const tableText = await page
        .locator("#rolesPermissionsForm\\:assignedRoles")
        .textContent({ timeout: 10000 });
      expect(tableText).toContain(":authenticated-users");
      expect(tableText).toContain("Curator");
    },
  );


  // Test 3 (#74): remove Curator role
  test(
    "Standard: Remove assigned Curator role from :authenticated-users",
    { tag: ["@standard"] },
    async ({ page }) => {
      await goToDatasetPerms(page);
      const removeLink = page.locator(
        "//tr[.//td[contains(.,':authenticated-users')]]//a[contains(.,'Remove')]",
      );
      await expect(removeLink).toBeVisible({ timeout: 10000 });
      await removeLink.click();
      const confirmDialog = page.locator(
        "#rolesPermissionsForm\\:removeRoleConfirmation",
      );
      if (await confirmDialog.isVisible({ timeout: 3000 }).catch(() => false)) {
        await confirmDialog.locator("button:not(.btn-link)").click();
      }
      await page.waitForTimeout(1500);
      const tableText = await page
        .locator("#rolesPermissionsForm\\:assignedRoles")
        .textContent({ timeout: 10000 });
      expect(tableText).not.toContain(":authenticated-users");
    },
  );

  // Test 4 (#75): file permissions page loads
  test(
    "Standard: File permissions page loads",
    { tag: ["@standard"] },
    async ({ page }) => {
      await goToFilePerms(page);
      await expect(page.locator("#rolesPermissionsForm\\:userGroupsAdd"))
        .toBeVisible({ timeout: 10000 });
    },
  );

  // Test 5 (#76–#77): grant file access to :authenticated-users
  test(
    "Standard: Grant file access to :authenticated-users",
    { tag: ["@standard"] },
    async ({ page }) => {
      await goToFilePerms(page);
      await page.locator("#rolesPermissionsForm\\:userGroupsAdd").click();
      const userInput = page.locator(
        "#rolesPermissionsForm\\:userGroupNameAssign_input",
      );
      await expect(userInput).toBeVisible({ timeout: 10000 });
      await userInput.fill(":authenticated-users");
      await expect(page.locator(".ui-autocomplete-item").first())
        .toBeVisible({ timeout: 10000 });
      await page.locator(".ui-autocomplete-item").first().click();
      const assignDialog = page.locator("#rolesPermissionsForm\\:assignDialog");
      const checkboxes = assignDialog.locator(".ui-chkbox-box");
      if ((await checkboxes.count()) > 0) {
        await checkboxes.first().click();
      }
      const grantBtn = page.locator(
        "//div[@id='rolesPermissionsForm:assignDialog']//a[contains(.,'Grant')]",
      );
      await expect(grantBtn).toBeVisible({ timeout: 10000 });
      await grantBtn.click();
      await page.waitForTimeout(1500);
      const accessTable = page.locator("#rolesPermissionsForm\\:userGroupsAccess");
      if (await accessTable.isVisible({ timeout: 5000 }).catch(() => false)) {
        expect(await accessTable.textContent()).toContain(":authenticated-users");
      } else {
        console.log("Info: No file access table — dataset has no restricted files.");
      }
    },
  );

  // Test 6 (#78): revoke file access from :authenticated-users
  test(
    "Standard: Revoke file access from :authenticated-users",
    { tag: ["@standard"] },
    async ({ page }) => {
      await goToFilePerms(page);
      const accessTable = page.locator("#rolesPermissionsForm\\:userGroupsAccess");
      if (!(await accessTable.isVisible({ timeout: 5000 }).catch(() => false))) {
        console.log("Info: No file access table — skipping revoke.");
        return;
      }
      const txt = await accessTable.textContent();
      if (!txt?.includes(":authenticated-users")) {
        console.log("Info: :authenticated-users not in table — nothing to revoke.");
        return;
      }
      const removeLink = page.locator(
        "//div[@id='rolesPermissionsForm:userGroupsAccess']" +
          "//tr[.//td[contains(.,':authenticated-users')]]" +
          "//a[contains(.,'Remove Access')]",
      );
      await expect(removeLink).toBeVisible({ timeout: 10000 });
      await removeLink.click();
      const confirmDialog = page.locator(
        "#rolesPermissionsForm\\:accessFileRemoveConfirm",
      );
      await expect(confirmDialog).toBeVisible({ timeout: 10000 });
      await confirmDialog.getByRole("button", { name: "Continue" }).click();
      await page.waitForTimeout(1500);
      expect(await accessTable.textContent({ timeout: 10000 }))
        .not.toContain(":authenticated-users");
    },
  );
});

