# Dataverse 2026 Test Coverage Tracker

Legend:
  [X]  Implemented in a spec file
  [O]  Out of scope (noted bug, infeasible, or intentionally skipped)
  [ ]  Not yet implemented

---

## ROOT DATAVERSE

### Look & Feel

| #  | Item                                        | Status | Spec File                  |
|----|---------------------------------------------|--------|----------------------------|
|  1 | Header (logos, links render properly)       |  [X]   | `01-preflight.spec.ts`     |
|  2 | Footer (copyright, privacy policy, links)   |  [X]   | `01-preflight.spec.ts`     |

### Contact Email

| #  | Item                                        | Status | Spec File                  |
|----|---------------------------------------------|--------|----------------------------|
|  3 | UNC Dataverse Support contact email         |  [O]   | —                          |

---

## ACCOUNT CREATION + MANAGEMENT

### Account Access

| #  | Item                                        | Status | Spec File                  |
|----|---------------------------------------------|--------|----------------------------|
|  4 | Log In (UNC ONYEN / Shibboleth)             |  [X]   | `auth.setup.ts`            |
|  5 | Your Institution (Shibboleth)               |  [X]   | `auth.setup.ts`            |
|  6 | ORCID Sandbox login                         |  [O]   | —                                  |
|  7 | Username/Email login (tester account)       |  [X]   | `auth.setup.ts`            |

### Account Management

| #  | Item                                        | Status | Spec File                          |
|----|---------------------------------------------|--------|------------------------------------|
|  8 | My Data tab                                 |  [X]   | `02-account-management.spec.ts`    |
|  9 | Notifications tab                           |  [X]   | `02-account-management.spec.ts`    |
| 10 | Account Information tab                     |  [X]   | `02-account-management.spec.ts`    |
| 11 | API Token (create / recreate)               |  [X]   | `02-account-management.spec.ts`    |

---

## DATAVERSE MANAGEMENT

### Dataverse Creation

| #  | Item                                        | Status | Spec File                          |
|----|---------------------------------------------|--------|------------------------------------|
| 12 | New Dataverse                               |  [X]   | `03-create-dataverse.spec.ts`      |

### General Information

| #  | Item                                        | Status | Spec File                          |
|----|---------------------------------------------|--------|------------------------------------|
| 13 | Metadata Fields: Inherited                  |  [X]   | `03-create-dataverse.spec.ts`      |
| 14 | Metadata Fields: Non-Inherited              |  [X]   | `03-create-dataverse.spec.ts`      |
| 15 | Browse/Search Facets: Inherited             |  [X]   | `03-create-dataverse.spec.ts`      |
| 16 | Browse/Search Facets: Non-Inherited         |  [X]   | `03-create-dataverse.spec.ts`      |
| 17 | Dataverse Contact Email                     |  [ ]   | —                                  |

### Dataverse Publication

| #  | Item                                        | Status | Spec File                          |
|----|---------------------------------------------|--------|------------------------------------|
| 18 | Publish Dataverse                           |  [X]   | `04-publish-dataverse.spec.ts`     |

### Theme + Widgets

| #  | Item                                        | Status | Spec File                          |
|----|---------------------------------------------|--------|------------------------------------|
| 19 | Brand Logo upload                           |  [X]   | `05-theme-widgets.spec.ts`         |
| 20 | Header Appearance (tagline, URL, colors)    |  [X]   | `05-theme-widgets.spec.ts`         |
| 21 | Remove image / re-upload thumbnail          |  [X]   | `06-theme-widgets-edit.spec.ts`    |

### Collection Thumbnail

| #  | Item                                        | Status | Spec File                          |
|----|---------------------------------------------|--------|------------------------------------|
| 22 | Set Collection Thumbnail                    |  [X]   | `06-theme-widgets-edit.spec.ts`    |
| 23 | Modify Collection Thumbnail                 |  [X]   | `06-theme-widgets-edit.spec.ts`    |
| 24 | Remove Collection Thumbnail                 |  [X]   | `06-theme-widgets-edit.spec.ts`    |

### Permissions (Dataverse-level)

| #  | Item                                        | Status | Spec File                               |
|----|---------------------------------------------|--------|-----------------------------------------|
| 25 | Edit Access settings                        |  [X]   | `10-assign-user-group-roles.spec.ts`    |
| 26 | Assign Roles to Users/Groups                |  [X]   | `10-assign-user-group-roles.spec.ts`    |
| 27 | Remove Assigned Role                        |  [X]   | `10-assign-user-group-roles.spec.ts`    |

### Dataset Templates

| #  | Item                                        | Status | Spec File                                    |
|----|---------------------------------------------|--------|----------------------------------------------|
| 28 | Create Dataset Template                     |  [X]   | `11-create-edit-metadata-template.spec.ts`   |
| 29 | Make Default Template                       |  [X]   | `11-create-edit-metadata-template.spec.ts`   |
| 30 | Clone Template                              |  [X]   | `11-create-edit-metadata-template.spec.ts`   |

### Guestbook

| #  | Item                                        | Status | Spec File                  |
|----|---------------------------------------------|--------|----------------------------|
| 31 | Create Dataset Guestbook                    |  [X]   | `07-guestbook.spec.ts`     |
| 32 | Download Guestbook Data                     |  [X]   | `07-guestbook.spec.ts`     |

---

## DATASET + FILE MANAGEMENT

### Dataset Creation

| #  | Item                                                  | Status | Spec File                        |
|----|-------------------------------------------------------|--------|----------------------------------|
| 33 | New Dataset                                           |  [X]   | `13-dataset-actions.spec.ts`     |
| 34 | Citation Metadata                                     |  [X]   | `13-dataset-actions.spec.ts`     |
| 35 | Production Location Metadata (multiple locations)     |  [X]   | `13-dataset-actions.spec.ts`     |
| 36 | Related Publication Metadata (Relation Type field)    |  [X]   | `13-dataset-actions.spec.ts`     |
| 37 | Author Metadata (trailing comma)                      |  [X]   | `13-dataset-actions.spec.ts`     |
| 38 | Metadata Blocks (turned on at Dataverse level)        |  [X]   | `13-dataset-actions.spec.ts`     |

### File Upload

| #  | Item                                        | Status | Spec File |
|----|---------------------------------------------|--------|-----------|
| 39 | Upload .dta file                            |  [X]   | `19-file-upload-tabular.spec.ts`    |
| 40 | Upload .RData file                          |  [X]   | `19-file-upload-tabular.spec.ts`    |
| 41 | Upload .sav file                            |  [X]   | `19-file-upload-tabular.spec.ts`    |
| 42 | Upload .xlsx file                           |  [X]   | `19-file-upload-tabular.spec.ts`    |
| 43 | Upload .csv file                            |  [X]   | `18-file-upload-formats.spec.ts`    |
| 44 | Upload .zip file                            |  [X]   | `18-file-upload-formats.spec.ts`    |
| 45 | Upload .pdf file                            |  [X]   | `18-file-upload-formats.spec.ts`    |
| 46 | Upload .R file                              |  [X]   | `18-file-upload-formats.spec.ts`    |
| 47 | Upload ro-crate-metadata.json               |  [X]   | `18-file-upload-formats.spec.ts`    |

### Dataset Metadata

| #  | Item                                        | Status | Spec File                        |
|----|---------------------------------------------|--------|----------------------------------|
| 48 | Edit Dataset Metadata                       |  [X]   | `13-dataset-actions.spec.ts`     |
| 49 | Edit File Metadata                          |  [X]   | `13-dataset-actions.spec.ts`     |


### Replace File

| #  | Item                                        | Status | Spec File                        |
|----|---------------------------------------------|--------|----------------------------------|
| 50 | Replace .R file                             |  [ ]   | —                                |
| 51 | Replace .csv file                           |  [ ]   | —                                |
| 52 | Replace .dta file                           |  [ ]   | —                                |
| 53 | Replace .xlsx (geo) file                    |  [ ]   | —                                |
| 54 | Replace .RData file                         |  [ ]   | —                                |
| 55 | Replace .sav file                           |  [ ]   | —                                |
| 56 | Replace .xlsx file                          |  [ ]   | —                                |
| 57 | Replace .pdf file                           |  [ ]   | —                                |
| 58 | Replace double .zip file                    |  [ ]   | —                                |
| 59 | Replace geo .zip file                       |  [ ]   | —                                |
| 60 | Replace .zip file                           |  [ ]   | —                                |

### File Restrictions

| #  | Item                                        | Status | Spec File |
|----|---------------------------------------------|--------|-----------|
| 61 | Restrict File                               |  [ ]   | —         |
| 62 | Unrestrict File                             |  [ ]   | —         |
| 63 | Embargo                                     |  [ ]   | —         |

### Multiple Licenses and Custom Terms of Use and Access

| #  | Item                                               | Status | Spec File |
|----|----------------------------------------------------|--------|-----------|
| 64 | CC0 License                                        |  [ ]   | —         |
| 65 | CC-BY License                                      |  [ ]   | —         |
| 66 | MIT License                                        |  [ ]   | —         |
| 67 | GPLv3 License                                      |  [ ]   | —         |
| 68 | Custom Terms                                       |  [ ]   | —         |
| 69 | Restricted Files + Custom Terms                    |  [ ]   | —         |
| 70 | No License and No Terms of Use (should be blocked) |  [ ]   | —         |

### Access Permissions

| #  | Item                                        | Status | Spec File |
|----|---------------------------------------------|--------|-----------|
| 71 | Request File Access                         |  [X]   | `24-file-access-control.spec.ts`      |
| 72 | Permissions (Dataset-level)                 |  [X]   | `22-dataset-permissions.spec.ts`      |
| 73 | Assign Roles to Users/Groups (Dataset)      |  [X]   | `22-dataset-permissions.spec.ts`      |
| 74 | Remove Assigned Role (Dataset)              |  [X]   | `22-dataset-permissions.spec.ts`      |
| 75 | Permissions (File-level)                    |  [X]   | `22-dataset-permissions.spec.ts`      |
| 76 | Grant Access to Users/Groups (File)         |  [X]   | `22-dataset-permissions.spec.ts`      |
| 77 | Assign Access (File)                        |  [X]   | `22-dataset-permissions.spec.ts`      |
| 78 | Remove Access (File)                        |  [X]   | `22-dataset-permissions.spec.ts`      |

### Submission and Publication

| #  | Item                                        | Status | Spec File                        |
|----|---------------------------------------------|--------|----------------------------------|
| 79 | Submit for Review                           |  [X]   | `23-dataset-curation-workflow.spec.ts` |
| 80 | Return to Author (with note)                |  [X]   | `23-dataset-curation-workflow.spec.ts` |
| 81 | Private URL (create and delete)             |  [X]   | `20-preview-url.spec.ts`         |
| 82 | Publish Dataset                             |  [X]   | `13-dataset-actions.spec.ts`     |

### Link and Unlink Datasets

| #  | Item                                        | Status | Spec File |
|----|---------------------------------------------|--------|-----------|
| 83 | Link Datasets                               |  [ ]   | —         |
| 84 | Unlink Datasets                             |  [ ]   | —         |

### Dataset Versions

| #  | Item                                              | Status | Spec File                                   |
|----|---------------------------------------------------|--------|---------------------------------------------|
| 85 | Version Information                               |  [X]   | `16-view-dataset-version-history.spec.ts`   |
| 86 | Version Differences (View Differences button)     |  [ ]   | —                                           |
| 87 | Update Version by Editing Terms (Superuser)       |  [ ]   | —                                           |
| 88 | Previous Versions                                 |  [X]   | `16-view-dataset-version-history.spec.ts`   |

---

## FINDING AND USING DATA

### Navigation

| #  | Item                                                  | Status | Spec File                              |
|----|-------------------------------------------------------|--------|----------------------------------------|
| 89 | Browse                                                |  [X]   | `14-browse-dataset-records.spec.ts`    |
| 90 | Sort                                                  |  [X]   | `14-browse-dataset-records.spec.ts`    |
| 91 | Facets                                                |  [ ]   | —                                      |
| 92 | Facets - Datasets & Files only (License + Restricted) |  [ ]   | —                                      |
| 93 | Featured Dataverses                                   |  [ ]   | —                                      |
| 94 | Search Box                                            |  [X]   | `15-search-dataset-records.spec.ts`    |
| 95 | Advanced Search                                       |  [X]   | `15-search-dataset-records.spec.ts`    |

### Look & Feel

| #  | Item                                        | Status | Spec File |
|----|---------------------------------------------|--------|-----------|
| 96 | Dataverse View (logos, thumbnails, text)    |  [ ]   | —         |
| 97 | Dataset View (logos, thumbnails, text)      |  [ ]   | —         |
| 98 | Sort Files by Newest to Oldest              |  [ ]   | —         |

### Citation

| #   | Item                                         | Status | Spec File |
|-----|----------------------------------------------|--------|-----------|
|  99 | DOI present on dataset                       |  [X]   | `21-dataset-citation-download.spec.ts` |
| 100 | Dataset Citation Download (multiple formats) |  [X]   | `21-dataset-citation-download.spec.ts` |

### File Download

| #   | Item                              | Status | Spec File                             |
|-----|-----------------------------------|--------|---------------------------------------|
| 101 | Single File Download              |  [ ]   | —                                     |
| 102 | .dta - Original File              |  [ ]   | —                                     |
| 103 | .dta - Data File Citation         |  [ ]   | —                                     |
| 104 | .RData - Original File            |  [ ]   | —                                     |
| 105 | .RData - Tab-Delimited            |  [ ]   | —                                     |
| 106 | .RData - RData                    |  [ ]   | —                                     |
| 107 | .RData - Variable Metadata        |  [ ]   | —                                     |
| 108 | .RData - Data Subset              |  [ ]   | —                                     |
| 109 | .RData - Data File Citation       |  [ ]   | —                                     |
| 110 | .sav - Original File              |  [ ]   | —                                     |
| 111 | .sav - Tab-Delimited              |  [ ]   | —                                     |
| 112 | .sav - RData                      |  [ ]   | —                                     |
| 113 | .sav - Variable Metadata          |  [ ]   | —                                     |
| 114 | .sav - Data Subset                |  [ ]   | —                                     |
| 115 | .sav - Data File Citation         |  [ ]   | —                                     |
| 116 | .xlsx - Original File             |  [ ]   | —                                     |
| 117 | .xlsx - Tab-Delimited             |  [ ]   | —                                     |
| 118 | .xlsx - RData                     |  [ ]   | —                                     |
| 119 | .xlsx - Variable Metadata         |  [ ]   | —                                     |
| 120 | .xlsx - Data Subset               |  [ ]   | —                                     |
| 121 | .xlsx - Data File Citation        |  [ ]   | —                                     |
| 122 | .csv - Original File              |  [ ]   | —                                     |
| 123 | .csv - Tab-Delimited              |  [ ]   | —                                     |
| 124 | .csv - RData                      |  [ ]   | —                                     |
| 125 | .csv - Variable Metadata          |  [ ]   | —                                     |
| 126 | .csv - Data Subset                |  [ ]   | —                                     |
| 127 | .csv - Data File Citation         |  [ ]   | —                                     |
| 128 | .zip download                     |  [ ]   | —                                     |
| 129 | .pdf download                     |  [ ]   | —                                     |
| 130 | .R download                       |  [ ]   | —                                     |
| 131 | ro-crate-metadata.json download   |  [ ]   | —                                     |
| 132 | Multiple File Download            |  [X]   | `17-download-dataset-files.spec.ts`   |
| 133 | All Files Download                |  [X]   | `17-download-dataset-files.spec.ts`   |

### Data Exploration

| #   | Item                              | Status | Spec File |
|-----|-----------------------------------|--------|-----------|
| 134 | Data Explorer (tabular data)      |  [ ]   | —         |
| 135 | File Previewer (text documents)   |  [ ]   | —         |

---

## Summary

| Status               | Count |
|----------------------|-------|
| [X]  Implemented     |   73  |
| [O]  Out of scope    |    2  |
| [ ]  Not yet impl.   |   60  |
| **Total**            | **135** |

### New specs added in qdr-translation branch

| Spec File | Coverage Items | Notes |
|---|---|---|
| `22-dataset-permissions.spec.ts` | #72–#78 | Dataset + file permissions, translated from QDR `test_dataset_permissions.py` |
| `23-dataset-curation-workflow.spec.ts` | #79–#80, #82 | Submit/Return/Publish workflow, translated from QDR `test_dataset_workflow.py` |
| `24-file-access-control.spec.ts` | #71 | Public/restricted file access (anon + auth), translated from QDR `test_file_access.py` |
| `25-accessibility.spec.ts` | (bonus — 10 axe scans) | Dataverse-side subset of QDR `test_accessibility.py`, no extra dependencies |
| `secure_docs/SELECTOR_MAP.md` | — | Ported selector cheat-sheet from QDR `dataset_page.py` + `permissions_page.py` |
