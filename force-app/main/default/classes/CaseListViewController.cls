public with sharing class CaseListViewController {
    @AuraEnabled(cacheable=true)
    public static List<CaseWrapper> getCases() {
        List<Case> cases = [SELECT Id, Subject, Status, Priority, Owner.Name FROM Case LIMIT 50];
        List<CaseWrapper> results = new List<CaseWrapper>();
        for (Case c : cases) {
            results.add(new CaseWrapper(c));
        }
        return results;
    }

    public class CaseWrapper {
        @AuraEnabled public Id Id;
        @AuraEnabled public String Subject;
        @AuraEnabled public String Status;
        @AuraEnabled public String Priority;
        @AuraEnabled public String OwnerName;

        public CaseWrapper(Case c) {
            Id = c.Id;
            Subject = c.Subject;
            Status = c.Status;
            Priority = c.Priority;
            OwnerName = c.Owner.Name;
        }
    }

    @AuraEnabled
    public static void deleteCase(Id caseId) {
        Case c = [SELECT Id FROM Case WHERE Id = :caseId LIMIT 1];
        delete c;
    }
}
