export class Role {
    id?: any;
    roleName: string;
    permissions: Permissions
}

export class Permissions {
    // create: boolean;
    // read: boolean;
    update: boolean;
    createCategory: boolean;
    remove: boolean;
}