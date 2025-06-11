({
    init : function(component, event, helper) {
        component.set('v.columns', [
            {label: 'Subject', fieldName: 'Subject', type: 'text'},
            {label: 'Status', fieldName: 'Status', type: 'text'},
            {label: 'Priority', fieldName: 'Priority', type: 'text'},
            {label: 'Owner', fieldName: 'OwnerName', type: 'text'}
        ]);
        helper.loadCases(component);
    }
})
