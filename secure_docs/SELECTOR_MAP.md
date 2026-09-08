# Dataverse JSF/PrimeFaces Selector Map

Derived from QDR Selenium page objects — confirmed against Dataverse v6.9-qdr
(same JSF/PrimeFaces codebase as this project's target).  Use this as the
authoritative reference when writing Playwright specs.

---

## Dataset Page (`dataset.xhtml`)

### Page identification
| Element | Selector |
|---|---|
| Title heading | `h1#title` |
| Draft badge | `.label.draft` |
| In Review badge | `.label.inreview` |
| Published badge | `.label.published`, `span.label.label-default` |

### Edit dropdown
| Element | Selector |
|---|---|
| Edit Dataset trigger | `#editDataSet` |
| Files (Upload) link | `a[href*='editdatafiles']` |
| Metadata link (AJAX) | `#datasetForm:editMetadata` |
| Terms link (AJAX) | `#datasetForm:editTerms` |
| Thumbnails link | `a[href*='dataset-widgets']` |
| Delete link | `#datasetForm:deleteDataset` |
| Permissions → Data Project | `#datasetForm:manageDatasetPermissions` |
| Permissions → File | `#datasetForm:manageFilePermissions` |
| Permissions submenu trigger | XPath: `//li[contains(@class,'dropdown-submenu')]//a[normalize-space(.)='Permissions']` |
| Private/Preview URL | `#datasetForm:privateUrl` |

### Metadata inline edit
| Element | Selector |
|---|---|
| Save Changes | `#datasetForm\\:saveTop` |
| Cancel | `#datasetForm\\:cancelTop` |
| Description textarea | `textarea[placeholder*='What type of data']` |
| Title input | `input[placeholder='Enter title...']` |

### Terms inline edit
| Element | Selector |
|---|---|
| Save | `#datasetForm\\:saveTopTOA` |
| License select | `#datasetForm\\:tabView\\:licenses_input` |
| License options | `CC0 1.0`, `CC BY 4.0`, `CC BY-SA 4.0`, `Custom Dataset Terms` |

### Curation workflow
| Element | Selector |
|---|---|
| Submit for Review | `a.btn-publish:not(.dropdown-toggle)` |
| Submit for Review dialog | `#datasetForm\\:inreview` |
| Submit Continue | `#datasetForm\\:inreview button:not(.btn-link)` |
| Publish/Return toggle | `a.btn-publish.dropdown-toggle` |
| Publish item (in dropdown) | XPath: `//ul[contains(@class,'dropdown-menu')]//a[normalize-space(.)='Publish']` |
| Return to Author item | XPath: `//ul[contains(@class,'dropdown-menu')]//a[normalize-space(.)='Return to Author']` |
| Publish dialog | `#datasetForm\\:publishDataset` |
| Publish Continue | `#datasetForm\\:releaseDatasetButton` |
| Return to Author dialog | `#datasetForm\\:sendBackToContributor` |
| Return reason textarea | `#datasetForm\\:returnReason` |
| Return Continue | `#datasetForm\\:sendBackToContributor button:not(.btn-link)` |
| Curation Status dropdown | XPath: `//button[contains(@class,'dropdown-toggle') and contains(.,'Curation Status')]` |

### File access (dataset page)
| Element | Selector |
|---|---|
| Request Access button | `.btn.btn-default.btn-request` |
| Download/access trigger | `.btn-access-file` |
| Public status | `.col-file-action .text-success` |
| Restricted status | `.col-file-action .text-danger` |
| Request Access popup | `#datasetForm\\:accessSignUpLogIn` |

### File table (published/draft view)
| Element | Selector |
|---|---|
| File table | `#datasetForm\\:tabView\\:filesTable` |
| File table rows | `#datasetForm\\:tabView\\:filesTable_data tr` |
| Restrict checkbox per file | `input[id*=':restrict']` inside file row |

### Success banner
| Element | Selector |
|---|---|
| Any success message | `.alert.alert-success` |

---

## New Dataset Form (`newDatasetPage.xhtml`)

| Element | Selector |
|---|---|
| Title input | `[id$=':0:inputText']` first |
| Description textarea | `[id$=':0:description']` first |
| Subject menu trigger | `.ui-selectcheckboxmenu-multiple-container` first |
| Subject items panel | `.ui-selectcheckboxmenu-items-wrapper` |
| File upload input | `#datasetForm\\:fileUpload_input` |
| Save Dataset | button `Save Dataset` |
| Files staging table | `#datasetForm\\:filesTable` |
| Staged filename cell | `#datasetForm\\:filesTable\\:0\\:fileName` |

---

## Permissions — Dataset Level (`permissions-manage.xhtml`)

| Element | Selector |
|---|---|
| Assign Roles button | `#rolesPermissionsForm\\:userGroupsAdd` |
| Assign Role dialog | `#rolesPermissionsForm\\:userGroupDialog` |
| User/Group input | `#rolesPermissionsForm\\:userGroupNameAssign_input` |
| Autocomplete suggestion | `.ui-autocomplete-item` first |
| Role radio label | XPath: `//label[normalize-space(.)='{role}']` |
| Role radio box | XPath: `//input[@id='{id}']/ancestor::div[contains(@class,'ui-radiobutton')]//div[contains(@class,'ui-radiobutton-box')]` |
| Save Changes (dialog-scoped) | XPath: `//div[@id='rolesPermissionsForm:userGroupDialog']//button[normalize-space(.)='Save Changes']` |
| Permissions table rows | `#rolesPermissionsForm\\:assignedRoles_data tr` |
| Remove role link (per row) | XPath: `//tr[.//td[contains(.,'{id}')]]//a[contains(.,'Remove')]` |

---

## Permissions — File Level (`permissions-manage-files.xhtml`)

| Element | Selector |
|---|---|
| Grant Access button | `#rolesPermissionsForm\\:userGroupsAdd` |
| Grant File Access dialog | `#rolesPermissionsForm\\:assignDialog` |
| User/Group input | `#rolesPermissionsForm\\:userGroupNameAssign_input` |
| Autocomplete suggestion | `.ui-autocomplete-item` first |
| File checkboxes in dialog | `.ui-chkbox-box` inside dialog (index 0 = select-all header) |
| Grant button | XPath: `//div[@id='rolesPermissionsForm:assignDialog']//a[contains(.,'Grant')]` |
| Access table container | `#rolesPermissionsForm\\:userGroupsAccess` |
| Remove Access per row | XPath: `//div[@id='rolesPermissionsForm:userGroupsAccess']//tr[.//td[contains(.,'{id}')]]//a[contains(.,'Remove Access')]` |
| Remove confirm dialog | `#rolesPermissionsForm\\:accessFileRemoveConfirm` |
| Remove confirm Continue | button `Continue` inside confirm dialog |

---

## Account Page (`dataverseuser.xhtml`)

| Tab | URL param |
|---|---|
| My Data | `?selectTab=myDataTab` |
| Notifications | `?selectTab=notifications` |
| Account Information | `?selectTab=accountInfo` |
| API Token | `?selectTab=apiTokenTab` |

| Element | Selector |
|---|---|
| API Token display | `#apiToken` |
| Recreate Token | XPath: `//button[normalize-space(.)='Recreate Token']` |
| Dataset links (My Data) | `a[href*='dataset.xhtml']` |

---

## Notes on PrimeFaces Quirks

- **Hover-to-reveal submenus**: The Edit dropdown's "Permissions" item is a nested
  dropdown-submenu. Must `hover()` the "Permissions" link to reveal child links.
- **PrimeFaces autocomplete**: After typing, must wait for `.ui-autocomplete-item` and
  click it — pressing Enter is unreliable.
- **PrimeFaces radiobutton**: Click `.ui-radiobutton-box` (the visual box), NOT the hidden
  `<input type="radio">` or the `<label>`.
- **AJAX save vs redirect save**: Terms save (`saveTopTOA`) is AJAX — page stays, success
  banner appears. Metadata save (`saveTop`) does a full redirect.
- **waitForLoadState hangs on AJAX panels**: After Edit dropdown AJAX panels, use
  `waitForTimeout(1500)` + check for the panel ID instead of `waitForLoadState('networkidle')`.
- **Built-in groups**: Use `:authenticated-users` for "anyone with an account".
  Individual users: `@username`.

