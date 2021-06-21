import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchNotifications,
    selectAllNotifications
} from "../features/notifications/notificationsSlice";

export const Navbar = () => {
    const dispatch = useDispatch()
    const notifications = useSelector(selectAllNotifications)
    const numUnreadNotifications = notifications.filter(num => !num.read).length

    const fetchNewNotifications = () => {
        dispatch(fetchNotifications())
    }

    let unreadNotificationsBadge

    if (numUnreadNotifications > 0) {
        unreadNotificationsBadge = (
            <span className={'badge'}>{ numUnreadNotifications }</span>
        )
    }

    return (
        <nav>
            <section>
                <h1>Jibber Jabber Forum</h1>
                <h3>(redux example)</h3>

                <div className="navContent">
                    <div className="navLinks">
                        <Link to={'/'}>Posts</Link>
                        <Link to={'/new-post'}>New Post</Link>
                        <Link to={'/users'}>Users Page</Link>
                        <Link to={'/notifications'}>
                            Notifications { unreadNotificationsBadge }
                        </Link>
                        <Link to={'#'} onClick={fetchNewNotifications}>
                            Refresh Notifications
                        </Link>
                    </div>
                    {/*<button className={'button'} onClick={fetchNewNotifications}>*/}
                    {/*    Refresh Notifications*/}
                    {/*</button>*/}
                </div>
            </section>
        </nav>
    )
}
