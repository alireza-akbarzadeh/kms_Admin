import React from "react";
import {Iconify} from "../index";

const BreadcrumbDetail = (path) => {
    let id = null
    if (path.split('/').length === 2) {
        id = '/' + path.split('/')[1]
    } else if (path.split('/').length === 3) {
        id = '/' + path.split('/')[2]
    }
    const getIcon = (name) => <Iconify icon={name} sx={{mr: 1.3}} width={18} height={18}/>;

    const data = {
        teams: [
            {
                // title: t('teams'),
                title: 'teams',
                link: '/teams',
                icon: getIcon(""),
                active: false
            }
        ],
        notification: [
            {
                // title: t('teams'),
                title: 'messages',
                link: '/notification',
                icon: getIcon(""),
                active: false
            }
        ],
        users: [
            {
                title: 'users',
                link: '/users',
                icon: getIcon(""),
                active: false
            }
        ],
    }
    data['vacations' + id] = [
        {
            title: 'Vacations',
            link: '/vacation',
            icon: getIcon(""),
            active: true
        },
        {
            title: 'user',
            link: '/vacations' + id,
            icon: getIcon(""),
            active: false
        }
    ]

    if (data[path] === undefined && path !== 'dashboard') {
        return [
            {
                title: '_',
                link: '_',
                icon: getIcon("fa6-regular:circle-question"),
                active: false
            }
        ]
    } else {
        return data[path]
    }
}
export default BreadcrumbDetail;