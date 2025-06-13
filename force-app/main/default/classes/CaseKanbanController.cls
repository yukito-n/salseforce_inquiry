public with sharing class CaseKanbanController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases() {
        return [SELECT Id, Subject, Status FROM Case LIMIT 200];
    }

    @AuraEnabled
    public static void updateStatus(Id caseId, String status) {
        Case c = [SELECT Id, Status FROM Case WHERE Id = :caseId LIMIT 1];
        c.Status = status;
        update c;
    }
}
