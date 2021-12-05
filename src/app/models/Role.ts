export class Role {
    role: string;
    permissions: Permissions
}

export class Permissions {
    create: boolean;
    read: boolean;
    update: boolean;
    remove: boolean;
}