({
    init : function(component, event, helper) {
        helper.loadCases(component);
    },

    handleDrag : function(component, event, helper) {
        event.dataTransfer.setData('text', event.target.dataset.id);
    },

    allowDrop : function(component, event, helper) {
        event.preventDefault();
    },

    handleDrop : function(component, event, helper) {
        event.preventDefault();
        var caseId = event.dataTransfer.getData('text');
        var newStatus = event.currentTarget.dataset.status;
        helper.updateCaseStatus(component, caseId, newStatus);
    }
})
