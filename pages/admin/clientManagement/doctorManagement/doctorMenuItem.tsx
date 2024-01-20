import { MenuItem } from 'primereact/menuitem';
import { useRouter } from 'next/router';

export const menuItems= () => {
    const router = useRouter();

    const user: MenuItem[] = [
        {
            label: 'Doctor Management ',
            items: [
                {
                    label: 'View/Manage Doctor',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../manageDoctor?activeTab=0');
                    }
                },
            ]
        },
    ];

    const approve: MenuItem[] = [
        {
            label: 'Doctor Verification',
            items: [
                {
                    label: 'View/Manage Approval',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../doctor-verification?activeTab=0');
                    }
                },
            ]
        },
    ];

   

    return {
        user,
        approve
    };
};
