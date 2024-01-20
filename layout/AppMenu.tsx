import AppSubMenu from './AppSubMenu';
import type { MenuModel } from '../types/types';

const AppMenu = () => {
    const adminModel: MenuModel[] = [
        {
            label: 'Dashboards',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Hospital',
                    icon: 'pi pi-fw pi-home',
                    to: '/admin/hosp-dashboard'
                },
                {
                    label: 'Specialist',
                    icon: 'pi pi-fw pi-home',
                    to: '/admin/spec-dashboard'
                },
                {
                    label: 'Patient',
                    icon: 'pi pi-fw pi-home',
                    to: '/admin/pati-dashboard'
                }
            ]
        },
        {
            label: 'Management',    
            icon: 'pi pi-th-large',
            items: [
                {
                    label: 'Client Management',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Hospital',
                            icon: 'pi pi-fw pi-home',
                            to: '/admin/clientManagement/hospitalManagement'
                        },
                        {
                            label: 'Doctor',
                            icon: 'pi pi-fw pi-users',
                            to: '/admin/clientManagement/doctorManagement'
                        },
                        {
                            label: 'Appointment',
                            icon: 'pi pi-fw pi-calendar',
                            to: '/apps/files'
                        },
                        {
                            label: 'Content',
                            icon: 'pi pi-fw pi-folder',
                            to: '/apps/files'
                        },
                        {
                            label: 'Symptom Checker',
                            icon: 'pi pi-fw pi-folder',
                            to: '/apps/files'
                        },
                        {
                            label: 'Feedback and Review',
                            icon: 'pi pi-fw pi-inbox',
                            to: '/apps/mail/inbox'
                        },
                        {
                            label: 'Rating',
                            icon: 'pi pi-fw pi-comment',
                            to: '/apps/mail/detail/1000'
                        },
                        {
                            label: 'Health Challenges and Rewards',
                            icon: 'pi pi-fw pi-check-square',
                            to: '/apps/tasklist'
                        }
                    ]
                },
                {
                    label: 'Messages',
                    icon: 'pi pi-fw pi-envelope',
                    to: '/admin/chat'
                }
            ]
        },
        {
            label: 'Administration',
            icon: 'pi pi-fw pi-star-fill',
            items: [
                    {
                        label: 'Metadata',
                        icon: 'pi pi-fw pi-check-square',
                        to: '/admin/administration/metadata'
                    },
                {
                    label: 'User Management',
                    icon: 'pi pi-fw pi-user',
                    to: "/admin/administration/userManagement"
                }

            ]
        }
    ];

    const specialistModel :MenuModel[] = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-fw pi-home',
                    to: '/specialist/dashboard'
                },
            ]
        },

    ]

    return <AppSubMenu model={adminModel} />;
};

export default AppMenu;
