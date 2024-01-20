import { MenuItem } from 'primereact/menuitem';
import { useRouter } from 'next/router';

export const menuItems = () => {
    const router = useRouter();

    const hospital: MenuItem[] = [
        {
            label: 'Hospital',
            items: [
                {
                    label: 'Add/Manage Hospital',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../hospital?activeTab=0');
                    }
                },
                {
                    label: 'Add/Manage facility',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../hospital?activeTab=1');
                    }
                },
                {
                    label: 'Add/Manage services',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../hospital?activeTab=2');
                    }
                }
            ]
        }
    ];

    const location: MenuItem[] = [
        {
            label: 'Location',
            items: [
                {
                    label: 'Add/Manage Nationality',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../location?activeTab=0');
                    }
                },
                {
                    label: 'Add/Manage State/Province',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../location?activeTab=1');
                    }
                }
            ]
        }
    ];

    const specialist: MenuItem[] = [
        {
            label: 'Specialties',
            items: [
                {
                    label: 'Add/Manage Specialist',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../specialist?activeTab=0');
                    }
                },
                {
                    label: 'Add/Manage Languages Spoken',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../specialist?activeTab=1');
                    }
                },
                {
                    label: 'Add/Manage Gender',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../specialist?activeTab=2');
                    }
                }
            ]
        }
    ];

    const symptoms: MenuItem[] = [
        {
            label: 'Symptoms',
            items: [
                {
                    label: 'Add/Manage Symptoms',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../symptoms?activeTab=0');
                    }
                }
            ]
        }
    ];

    const specialty: MenuItem[] = [
        {
            label: 'Speciality',
            items: [
                {
                    label: 'Add/Manage Speciality',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../specialty?activeTab=0');
                    }
                }
            ]
        }
    ];

    return {
        hospital,
        location,
        specialist,
        symptoms,
        specialty
    };
};
