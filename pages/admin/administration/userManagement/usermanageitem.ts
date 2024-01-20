import { MenuItem } from 'primereact/menuitem';
import { useRouter } from 'next/router';

export const menuItems= () => {
    const router = useRouter();

    const user: MenuItem[] = [
        {
            label: 'Users and Groups',
            items: [
                {
                    label: 'Add/Manage App',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../user?activeTab=0');
                    }
                },
                {
                    label: 'Add/Manage Users',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../user?activeTab=1');
                    }
                },
            ]
        },
        {
            label: 'Roles',
            items: [
                {
                    label: 'Add/Manage Roles',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../user?activeTab=2');
                    }
                },
            ]
        },
        {
            label: 'User Permission',
            items: [
                {
                    label: 'Add/Manage Permission',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../user?activeTab=3');
                    }
                },
            ]
        }
    ];

    const report: MenuItem[] = [
        {
            label: 'Reports Module',
            items: [
                {
                    label: 'View Reports',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../report');
                    }
                },
                {
                    label: 'View Analytics',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../hospital?activeTab=1');
                    }
                },
            ]
        },
    ];

    const configure: MenuItem[] = [
        {
            label: 'Configurations',
            items: [
                {
                    label: 'Manage/View System Configuration',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../hospital?activeTab=0');
                    }
                },
                {
                    label: 'Manage/View Settings',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../hospital?activeTab=1');
                    }
                },
            ]
        },
    ];

   

    return {
        user,
        report,
        configure
    };
};
