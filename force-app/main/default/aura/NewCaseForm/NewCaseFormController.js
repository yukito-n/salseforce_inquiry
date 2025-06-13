({
    handleSuccess : function(component, event, helper) {
        var payload = event.getParams().response;
        helper.showToast('成功', 'ケースが作成されました: ' + payload.id, 'success');
    }
})
