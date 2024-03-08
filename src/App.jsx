
import { Profile } from "./components/Profile/Profile"
import { FriendList } from "./components/FriendList/FriendList"
import { TransactionHistory } from "./components/TransactionHistory/TransactionHistory"
import userData from "./data/userData.json"
import friends from "./data/friends.json"
import transactions from "./data/transactions.json"

export const App = () => {
  return (
    <>
      <Profile
        name={userData.username}
        tag={userData.tag}
        location={userData.location}
        image={userData.avatar}
        stats={userData.stats}
      />
      <hr />
      <FriendList friends={friends} />
      <hr />
      <TransactionHistory items={transactions} />
    </>
  )
}