import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./users.module.css";
import { getRolesOperation, getUsersOperation } from "../../api/operations";
import { setUsersAction } from "../../api/action";
import { ROLE } from "../../constants";
import { Error } from "../../components";
import { UpdateUsers } from "./update-users";

export const Users = () => {
  const [roles, setRoles] = useState([]);
  const [errorFromServer, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([getUsersOperation(), getRolesOperation()]).then(
      ([loadedUsers, loadedRoles]) => {
        dispatch(setUsersAction(loadedUsers));
        setRoles(loadedRoles);
      }
    );
  }, [dispatch]);

  const users = useSelector((state) => state.users.users);
  return (
    <Error arrayAccess={[ROLE.ADMIN]} error={errorFromServer}>
      <div className={styles.container}>
        <h2 className={styles.h2}>Пользователи</h2>
        <div className={styles.tableRow}>
          {users.map((user) => (
            <UpdateUsers
              key={user.id}
              id={user.id}
              login={user.login}
              roleId={user.roleId}
              roles={roles}
            />
          ))}
        </div>
      </div>
    </Error>
  );
};
