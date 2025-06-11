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

1. Authenticate with your org:
   ```bash
   sfdx auth:web:login
   ```
2. Push the source to a scratch org (or deploy to another org):
   ```bash
   sfdx force:source:push
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
