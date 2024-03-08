import css from "./FriendListItem.module.css"
import clsx from "clsx"

export const FriendListItem = ({ friend: { name, avatar, isOnline }, }) => {
    
    const onlineClass = clsx (
        isOnline ? css.online : css.offline
    );
    
    return (
        <>
            <div className={css.card}>
                <img
                    src={avatar}
                    alt="User avatar"
                    className={css.avatar}
                />
                <p className={css.name}>{name}</p>
                <p className={onlineClass}>{isOnline ? 'Online' : 'Offline'}</p>
            </div>
        </>
    );
};