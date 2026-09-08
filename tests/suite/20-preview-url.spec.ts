import { test, expect } from "@playwright/test";
const process = (globalThis as any).process;

/**
 * @tags @standard
 *
 * Standard Suite — Test #20
 * Creates an unpublished dataset, generates a General Preview URL, navigates
 * to it and verifies the preview banner, then disables the URL.
 */

test(
  "Standard: Preview URL (create, verify, disable)",
  { tag: ["@standard"] },
  async ({ page }) => {
    const suffix = Date.now().toString(36);

    // ── Step 1: Homepage → create a fresh unpublished dataset ────────────────
    await page.goto(process.env.ROOT_DATAVERSE ?? "/");
    await page.waitForLoadState("domcontentloaded");

    await page.getByRole("button", { name: "Add Data" }).click();
    await page.getByRole("link", { name: "New Dataset" }).click();
    await page.waitForLoadState("domcontentloaded");

    await page.locator('[id$=":0:inputText"]').first().fill(`Preview URL Test Dataset ${suffix}`);
    await page.locator('[id$=":0:description"]').first().fill("Dataset for Preview URL regression test.");
    await page.locator(".ui-selectcheckboxmenu-multiple-container").first().click();
    await page.locator(".ui-selectcheckboxmenu-items-wrapper").first().getByText("Chemistry").click();
    await page.locator(".ui-selectcheckboxmenu-multiple-container").first().click();

    await page
      .locator('[id="datasetForm:fileUpload_input"]')
      .setInputFiles([
        "tests/suite/test-data/sample-dataset-file.txt",
        "tests/suite/test-data/sample-dataset-file-2.txt",
      ]);
    await page.waitForTimeout(3000);

    await page.getByRole("button", { name: "Save Dataset" }).click();
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByText("This dataset has been created.")).toBeVisible();

    // ── Step 2: Edit Dataset → Preview URL ───────────────────────────────────
    await page.locator('[id="editDataSet"]').click();
    await page.locator('[id="datasetForm:privateUrl"]').click();

    // ── Step 3: Create General Preview URL ───────────────────────────────────
    // The Preview URL panel is a PrimeFaces dialog — wait for the button to
    // appear rather than a full page load
    await page.getByRole("button", { name: "Create General Preview URL" }).click();
    await page.waitForTimeout(2000);

    // ── Step 4: Read the preview URL from the highlighted text span ──────────
    const urlSpan = page.locator("div.highlight p span");
    await expect(urlSpan).toBeVisible({ timeout: 10000 });
    const previewUrl = (await urlSpan.innerText()).trim();
    console.log(`Preview URL: ${previewUrl}`);
    expect(previewUrl).toContain("previewurl.xhtml");
    expect(previewUrl).toContain("token=");

    // ── Step 5: Navigate to the preview URL and verify the banner ────────────
    await page.goto(previewUrl);
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("#messagePanel").getByText("Unpublished Dataset Preview URL")).toBeVisible();
    await expect(page.getByText("Privately share this draft dataset before it is published")).toBeVisible();

    // ── Step 6: Navigate back to the dataset page, then disable the Preview URL
    await page.goBack();
    await page.waitForLoadState("domcontentloaded");

    // Re-open the Preview URL panel via Edit Dataset dropdown
    await page.locator('[id="editDataSet"]').click();
    await page.locator('[id="datasetForm:privateUrl"]').click();
    await page.waitForTimeout(1500);

    await page.getByRole("button", { name: "Disable General Preview URL" }).click();
    await page.waitForTimeout(1500);

    // Confirmation popup — must explicitly confirm the disable
    await page.getByRole("button", { name: "Yes, Disable General Preview URL" }).click();
    await page.waitForTimeout(2000);

    // Verify the success message — panel closes after disable so this is
    // the definitive confirmation the URL was disabled
    await expect(
      page.getByText("You have successfully disabled the Preview URL for this unpublished dataset."),
    ).toBeVisible({ timeout: 10000 });
  },
);
