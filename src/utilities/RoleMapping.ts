interface RoleData {
    standing: string | null;
    position: string | null;
}

const roleMappings: Record<string, RoleData> = {
    student: {
        standing: "Student",
        position: null,
    },
    adviser: {
        standing: null,
        position: "Official",
    },
    chairperson: {
        standing: null,
        position: "Chairperson",
    },
    dean: {
        standing: null,
        position: "Dean",
    },
    admin: {
        standing: null,
        position: "Admin",
    },
};

export { roleMappings };