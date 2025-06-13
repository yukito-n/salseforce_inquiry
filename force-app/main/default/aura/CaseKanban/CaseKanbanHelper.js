({
    loadCases : function(component) {
        var action = component.get("c.getCases");
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                var cases = response.getReturnValue();
                var groups = [];
                var map = {};
                cases.forEach(function(c) {
                    if (!map[c.Status]) {
                        map[c.Status] = {status: c.Status, records: []};
                        groups.push(map[c.Status]);
                    }
                    map[c.Status].records.push(c);
                });
                component.set("v.groups", groups);
            }
        });
        $A.enqueueAction(action);
    },

    updateCaseStatus : function(component, caseId, status) {
        var action = component.get("c.updateStatus");
        action.setParams({ caseId: caseId, status: status });
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                this.loadCases(component);
                this.showToast('更新完了', 'ステータスを更新しました', 'success');
            } else {
                this.showToast('エラー', '更新できませんでした', 'error');
            }
        });
        $A.enqueueAction(action);
    },

    showToast : function(title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        if (toastEvent) {
            toastEvent.setParams({ title: title, message: message, type: type });
            toastEvent.fire();
        }
    }
})
