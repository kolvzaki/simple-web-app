export const ROLE_FORM_RULES = {
    name:[
        {
            required: true,
            message: 'Role Name Required'
        },
    ],
    description:[
        {
            max: 50,
            message: 'Description length limits 50'
        }
    ]
}

export const PERMISSION_FORM_RULES = {
    name:[
        {
            required: true,
            message: 'Permission Name Required'
        }
    ],
    description:[
        {
            max: 50,
            message: 'Description length limits 50'
        }
    ]
}

export const MENU_ITEM_FORM_RULES = {
    name: [
        {
            required: true,
            message: 'Menu name required'
        }
    ]
}