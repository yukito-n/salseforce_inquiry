({
    loadCases : function(component) {
        var action = component.get("c.getCases");
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                var cases = response.getReturnValue();
                var statuses = [];
                var map = {};
                cases.forEach(function(c) {
                    if (!map[c.Status]) {
                        map[c.Status] = [];
                        statuses.push(c.Status);
                    }
                    map[c.Status].push(c);
                });
                component.set("v.statuses", statuses);
                component.set("v.casesByStatus", map);
            }
        });
        $A.enqueueAction(action);
    }
})
