import React, { useState } from 'react';
import { useNotifications } from '../../../hooks/useNotifications';
import Dropdown from '../../common/Dropdown/Dropdown';
import styles from './NotificationBell.module.css';

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      markAsRead(notification.id);
    }
  };

  const trigger = (
    <div className={styles.bell}>
      🔔
      {unreadCount > 0 && (
        <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>
      )}
    </div>
  );

  return (
    <Dropdown trigger={trigger} position="bottom-right">
      <div className={styles.dropdown}>
        <div className={styles.header}>
          <h4>Notifications</h4>
          {unreadCount > 0 && (
            <button className={styles.markAll} onClick={markAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>

        <div className={styles.list}>
          {notifications.length === 0 ? (
            <div className={styles.empty}>No notifications</div>
          ) : (
            notifications.slice(0, 5).map(notification => (
              <div
                key={notification.id}
                className={`${styles.item} ${!notification.is_read ? styles.unread : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className={styles.title}>{notification.title}</div>
                <div className={styles.message}>{notification.message}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </Dropdown>
  );
};

export default NotificationBell;
