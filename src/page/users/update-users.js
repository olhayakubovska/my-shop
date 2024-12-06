import styles from "./users.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ACTION_TYPE,
  onOpenModal,
  removeUserAsync,
  setUser,
  setUsersAction,
  updateRoleAsync,
} from "../../api/action";
import { getUsersOperation } from "../../api/operations";

export const UpdateUsers = ({ id, roles, login, roleId }) => {
  const [newRole, setNewRole] = useState(roleId);
  const [errorFromServer, setError] = useState("");
  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();
  const userSession = useSelector((state) => state.user.session);

  const onRoleChange = ({ target }) => {
    setNewRole(Number(target.value));
  };

  const unsavedRole = newRole !== roleId;

  const saveNewRole = (userId, newUserRole) => {
    dispatch(
      onOpenModal({
        text: "Сохранить изменения в роли?",
        onConfirm: async () => {
          try {
            const { err, res } = dispatch(
              await updateRoleAsync(userId, newUserRole, userSession)
            );
            dispatch(setUser(res));
            setError(err);
          } catch (error) {
            console.error("Ошибка при обновлении роли пользователя:", error);
            setError("Ошибка при обновлении роли пользователя");
          }

          const loadedUsers = await getUsersOperation();
          dispatch(setUsersAction(loadedUsers));
          dispatch({ type: ACTION_TYPE.CLOSE_MODAL });
          setFlag(!flag);
        },
        onCancel: () => dispatch({ type: ACTION_TYPE.CLOSE_MODAL }),
      })
    );
  };

  const removeUser = (userId) => {
    dispatch(
      onOpenModal({
        text: "Удалить пользователя?",
        onConfirm: async () => {
          dispatch(removeUserAsync(userId));
          dispatch({ type: ACTION_TYPE.CLOSE_MODAL });
          const loadedUsers = await getUsersOperation();
          dispatch(setUsersAction(loadedUsers));
        },
        onCancel: () => dispatch({ type: ACTION_TYPE.CLOSE_MODAL }),
      })
    );
  };

  return (
    <div>
      <div key={id} className={styles.column}>
        <div className={styles.login}>{login}</div>

        <select
          className={styles.selectRoles}
          value={newRole}
          onChange={onRoleChange}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        <button
          className={unsavedRole ? styles.btnUnsaved : styles.btn}
          onClick={() => saveNewRole(id, newRole)}
        >
          Save
        </button>

        <button onClick={() => removeUser(id)} className={styles.btn}>
          Remove
        </button>
      </div>
    </div>
  );
};
