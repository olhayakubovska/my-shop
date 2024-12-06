import { addSession, deleteSession, getSession } from "./fetch";

export const sessions = {
  create(user) {
    const hash = Math.random().toFixed(50);

    addSession(hash, user);

    return hash;
  },

  async remove(userSession) {
    const sessionArray = await getSession(userSession);
    const session = sessionArray[0];
    if (!session) {
      return;
    }
    console.log(session,"sessionSeesOP")
    deleteSession(session.id);
  },
  async access(hash, accessRoles) {
    const dbSessionArray = await getSession(hash);
    const dbSession = dbSessionArray[0];

    return !!dbSession?.user && accessRoles.includes(dbSession.user.roleId);
  },
};
