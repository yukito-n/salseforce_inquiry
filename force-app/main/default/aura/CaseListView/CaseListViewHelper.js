({
    loadCases : function(component) {
        var action = component.get("c.getCases");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.cases", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    navigateToRecord : function(recordId) {
        var navEvt = $A.get("e.force:navigateToSObject");
        if (navEvt) {
            navEvt.setParams({
                "recordId": recordId,
                "slideDevName": "detail"
            });
            navEvt.fire();
        }
    },

    editRecord : function(recordId) {
        var editEvt = $A.get("e.force:editRecord");
        if (editEvt) {
            editEvt.setParams({
                "recordId": recordId
            });
            editEvt.fire();
        }
    },

    deleteRecord : function(component, recordId) {
        var confirmDelete = confirm('削除してもよろしいですか？');
        if (!confirmDelete) return;
        var action = component.get("c.deleteCase");
        action.setParams({ caseId: recordId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                this.showToast('削除完了', 'ケースを削除しました', 'success');
                this.loadCases(component);
            } else {
                this.showToast('エラー', '削除できませんでした', 'error');
            }
        });
        $A.enqueueAction(action);
    },

    showToast : function(title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        if (toastEvent) {
            toastEvent.setParams({
                "title": title,
                "message": message,
                "type": type
            });
            toastEvent.fire();
        }
    }
})
