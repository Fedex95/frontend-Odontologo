import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';

export const MainPage = () => {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'Gestionar Pacientes',
            icon: 'pi pi-users',
            items: [
                {
                    label: 'Registrar Paciente',
                    icon: 'pi pi-user-plus',
                    template: itemRenderer
                },
                {
                    label: 'Actualizar Paciente',
                    icon: 'pi pi-user-edit',
                    template: itemRenderer
                },
                {
                    label: 'Eliminar Paciente',
                    icon: 'pi pi-user-minus',
                    template: itemRenderer
                },
                {
                    label: 'Visualizar Paciente',
                    icon: 'pi pi-address-book',
                    template: itemRenderer
                }
            ]
        },
        {
            label: 'Ficha Tecnica',
            icon: 'pi pi-table',
            items: [
                {
                    label: 'Registrar Ficha',
                    icon: 'pi pi-user-plus',
                    template: itemRenderer
                },
                {
                    label: 'Visualizar Ficha',
                    icon: 'pi pi-user-edit',
                    template: itemRenderer
                },
            ]
        },
        {
            label: 'Odontograma',
            icon: 'pi pi-desktop',
            template: itemRenderer
        }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );


    return (
        <>
            <div className="card">
                <Menubar model={items} start={start} end={end} />
            </div>
        </>
    )
}