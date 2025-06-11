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

Follow these steps to set up a scratch org and push the source code. This assumes
that the [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli) (or the
new `sf` command line) is installed on your machine.

1. **Authenticate with your Dev Hub** (only required once):
   ```bash
   sfdx auth:web:login -d -a DevHub
   ```
   This command opens a browser window where you log in to the org that you want
   to use as your Dev Hub.
2. **Create a scratch org** using the project configuration provided in
   `config/project-scratch-def.json`:
   ```bash
   sfdx force:org:create -s -f config/project-scratch-def.json -a ScratchOrg
   ```
   The `-s` flag sets this org as the default, and `-a` assigns it the alias
   `ScratchOrg` for easy reference.
3. **Push the source to the scratch org**:
   ```bash
   sfdx force:source:push -u ScratchOrg
   # or with the new CLI
   sf project deploy start --source-dir force-app --target-org ScratchOrg
   ```
4. **Assign permissions** if your project includes permission sets:
   ```bash
   sfdx force:user:permset:assign -n Inquiry_App -u ScratchOrg
   ```
5. **Open the scratch org** to verify the components:
   ```bash
   sfdx force:org:open -u ScratchOrg
   ```

To deploy to a non-scratch org, replace `force:source:push` with
`force:source:deploy` (or the `sf project deploy start` command) and specify the target username or alias:

```bash
# using the legacy sfdx CLI
sfdx force:source:deploy -p force-app -u MySandbox
# or using the new sf CLI
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

After configuring your org, deploy the source:

```bash
sfdx force:source:deploy -p force-app
```

Once deployed, open your Lightning app and verify that the components appear on the pages configured above.

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

