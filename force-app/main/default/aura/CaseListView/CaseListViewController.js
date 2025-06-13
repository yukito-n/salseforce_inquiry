({
    init : function(component, event, helper) {
        var actions = [
            { label: '参照', name: 'view' },
            { label: '編集', name: 'edit' },
            { label: '削除', name: 'delete' }
        ];
        component.set('v.columns', [
            {label: '件名', fieldName: 'Subject', type: 'text'},
            {label: '状況', fieldName: 'Status', type: 'text'},
            {label: '優先度', fieldName: 'Priority', type: 'text'},
            {label: '所有者', fieldName: 'OwnerName', type: 'text'},
            {type: 'action', typeAttributes: { rowActions: actions } }
        ]);
        helper.loadCases(component);
    },

    openModal : function(component, event, helper) {
        component.set('v.isModalOpen', true);
    },

    closeModal : function(component, event, helper) {
        component.set('v.isModalOpen', false);
    },

    handleCaseCreated : function(component, event, helper) {
        component.set('v.isModalOpen', false);
        helper.loadCases(component);
    },

    handleRowAction : function(component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'view':
                helper.navigateToRecord(row.Id);
                break;
            case 'edit':
                helper.editRecord(row.Id);
                break;
            case 'delete':
                helper.deleteRecord(component, row.Id);
                break;
        }
    }
})
