import { MenuItem } from 'primereact/menuitem';
import { useRouter } from 'next/router';

export const menuItems= () => {
    const router = useRouter();

    const report: MenuItem[] = [
        {
            label: 'Report List',
            items: [
                {
                    label: 'List of Hospitals',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../hospital?activeTab=0');
                    }
                },
                {
                    label: 'List of Specialist',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../hospital?activeTab=1');
                    }
                },
                {
                    label: 'List of Patients',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        router.push('../hospital?activeTab=1');
                    }
                },
            ]
        },
    ];

   

    return {
        report,
    };
};
