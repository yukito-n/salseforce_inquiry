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
    }
})
