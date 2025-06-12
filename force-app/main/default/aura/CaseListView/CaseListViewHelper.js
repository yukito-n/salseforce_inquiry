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
    }
})
