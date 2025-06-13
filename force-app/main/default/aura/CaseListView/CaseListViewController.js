({
    init : function(component, event, helper) {
        component.set('v.columns', [
            {label: '件名', fieldName: 'Subject', type: 'text'},
            {label: '状況', fieldName: 'Status', type: 'text'},
            {label: '優先度', fieldName: 'Priority', type: 'text'},
            {label: '所有者', fieldName: 'OwnerName', type: 'text'}
        ]);
        helper.loadCases(component);
    }
})
