({
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
