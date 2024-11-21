import { getRoles } from "../fetch"

export const getRolesOperation = async () => {
const roles = await getRoles()
  return roles
}

