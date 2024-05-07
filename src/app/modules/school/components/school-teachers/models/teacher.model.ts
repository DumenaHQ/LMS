export type TeacherModel = {
    readonly school_id?:       string;
    readonly createdAt?:       Date;
    readonly updatedAt?:       Date;
    readonly id?:              string;
    readonly fullname?:        string;
    readonly email?:           string;
    readonly isUserOnboarded?: boolean;
    readonly status?: string;
}
