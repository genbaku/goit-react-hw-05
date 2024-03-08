import { FriendListItem } from "../FriendListItem/FriendListItem";
import css from "./FriendsList.module.css"
export const FriendList = ( { friends } ) => {
    return (
        <>
            <ul className={css.list}>
                {friends.map((friend) => (
                    <li key={friend.id}>
                        <FriendListItem friend={friend}/>
                    </li>
                ))}
            </ul>
        </>
    );
};