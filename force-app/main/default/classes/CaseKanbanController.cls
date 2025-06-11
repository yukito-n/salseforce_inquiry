public with sharing class CaseKanbanController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases() {
        return [SELECT Id, Subject, Status FROM Case LIMIT 200];
    }
}
