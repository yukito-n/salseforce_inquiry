# Salesforce Inquiry Management

This repository contains a sample Salesforce DX project that demonstrates basic Aura components for managing customer inquiries using the standard **Case** object. The components implement features such as a new case form, list view, detail editing, and a simple Kanban board.

## Components

- **NewCaseForm** - Create a new Case record using Lightning Data Service.
- **CaseListView** - Display a table of cases.
- **CaseDetail** - Edit Case fields inline on the detail page.
- **CaseKanban** - Visualize cases grouped by status.

The project is structured as a standard Salesforce DX project under `force-app/main/default`.

## Setup

### Salesforce DX Configuration

Follow these steps to set up a scratch org and deploy the source using the [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli). The commands below use the `sf` CLI.

1. **Authenticate with your Dev Hub** (only required once):
   ```bash
   sf org login web --set-default-dev-hub --alias DevHub
   ```
   This command opens a browser window where you log in to the org that you want
   to use as your Dev Hub.
2. **Create a scratch org** using the project configuration provided in
   `config/project-scratch-def.json`:
   ```bash
   sf org create scratch --definition-file config/project-scratch-def.json --set-default --alias ScratchOrg
   ```
   The `--set-default` flag sets this org as the default, and `--alias` assigns it the alias
   `ScratchOrg` for easy reference.
   If the command fails because of an invalid feature, edit `config/project-scratch-def.json`
   and adjust the `features` array (which is empty by default) to include only
   valid feature names.
3. **Push the source to the scratch org**:
   ```bash
   sf project deploy start --source-dir force-app --target-org ScratchOrg
   ```
4. **Assign permissions** if your project includes permission sets:
   ```bash
   sf org assign permset --name Inquiry_App --target-org ScratchOrg
   ```
5. **Open the scratch org** to verify the components:
   ```bash
   sf org open --target-org ScratchOrg
   ```

To deploy to a non-scratch org, replace `force:source:push` with
`force:source:deploy` (or the `sf project deploy start` command) and specify the target username or alias:

```bash
sf project deploy start --source-dir force-app --target-org MySandbox
```

### Object Configuration

1. **Case Fields**
   - Ensure the standard fields `Subject`, `Status`, `Priority`, `Origin`, `Type`, `AccountId`, and `ContactId` are on the page layout.
   - Create a custom field `SLA_Due_Date__c` (Date) to track due dates.
2. **Picklist Values**
   - `Status`: add values *New*, *In Progress*, *Resolved*, *Closed*.
   - `Priority`: use values *High*, *Medium*, *Low*.
3. **Record Types** (optional)
   - Create record types for different inquiry types such as *Product Bug*, *How-to Question*, etc.
4. **Page Layout**
   - Add the custom fields to the Case page layout.
   - Use Lightning App Builder to place the Aura components (NewCaseForm, CaseListView, CaseDetail, CaseKanban) on your pages.
5. **Assignment and Notifications**
   - Set up assignment rules or Flows to automatically assign new cases.
   - Configure email or in-app notifications for status changes and approaching SLA dates.

### Deployment Steps

After configuring your org, deploy the source. Replace `<your-org>` with the alias
or username of the org you want to deploy to (run `sf org list` to see available
orgs):

```bash
sf project deploy start --source-dir force-app --target-org <your-org>
```

Once deployed, open your Lightning app and verify that the components appear on the pages configured above.

### Post-Deployment Testing

After deployment, verify that each component behaves as expected in the target org:

1. **Create a Test Case**
   - Navigate to the page containing the `NewCaseForm` component.
   - Submit a new case and confirm that a success message appears.
   - Check that the record is created with the correct values.
2. **Validate List and Detail Views**
   - Open the `CaseListView` and ensure that the newly created case appears in the table with the correct fields.
   - Click a case to open the `CaseDetail` component and edit a field using inline editing. Save and confirm the toast notification.
3. **Check the Kanban Board**
   - Navigate to the `CaseKanban` component and verify that cases are grouped by status. Drag a card to a different column and refresh the list to confirm the status update.
4. **Run Apex Tests (if any)**
   - Execute `sf apex run test --target-org <your-org>` to run automated tests included in the project. Review the results for failures.

Document the results of these checks so that you can repeat them when deploying to additional environments.

### Migrating to Production

When you are ready to move the system to a production org, follow one of these approaches:

1. **Change Set Promotion**
   - In your sandbox, create an outbound change set that includes the metadata under `force-app/main/default`.
   - Upload the change set to production and validate the deployment. Fix any issues reported during validation, then deploy.
2. **Unlocked Package or Metadata API**
   - Create an unlocked package using the Salesforce CLI or package.xml with the Metadata API. Install the package in a staging sandbox first to confirm that all components deploy correctly before installing in production.

Always test in a full or partial copy sandbox before deploying to production to ensure that data-specific issues do not cause errors.

### When Salesforce DX Is Unavailable

If the Salesforce CLI is not an option, you can deploy the metadata using one of the following methods:

1. **Change Sets**
   - From Setup in your source org, create an outbound change set.
   - Add the components from `force-app/main/default` and upload the change set to your target org.
   - In the target org, open the inbound change set and deploy it.
   - This method is completely web-based but is manual and harder to automate.
2. **Metadata API / Ant Migration Tool**
   - Download the [Force.com Migration Tool](https://developer.salesforce.com/docs/atlas.en-us.develop.meta/develop/develop_ant.htm).
   - Configure `build.xml` to point to your org and run:
     ```bash
     ant deployCode
     ```
   - This provides a scripted deployment option without relying on Salesforce DX.

