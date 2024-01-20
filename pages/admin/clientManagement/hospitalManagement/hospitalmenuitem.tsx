import { MenuItem } from 'primereact/menuitem';
import { useRouter } from 'next/router';

export const menuItems= () => {
    const router = useRouter();

    const user: MenuItem[] = [
        {
            label: 'Hospital Management ',
            items: [
                {
                    label: 'View/Manage Hospital',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../manageHospital?activeTab=0');
                    }
                },
            ]
        },
    ];

   

    return {
        user,
    };
};
