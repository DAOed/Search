
import { lookupProfile, UserSession, AppConfig } from "blockstack"

import { baseBlockstackApi, appDomain, appScopes } from "@constants"
import { filer } from "./helpers"

const appConfig = new AppConfig(appScopes, appDomain)
export const userSession = new UserSession({ appConfig })

export const getUser = async (account, apiBase = baseBlockstackApi + "names") => {
  try {
    let data = await lookupProfile(account.toLowerCase().trim(), apiBase)
    return data
  } catch (err) {
    console.log(err)
    return {}
  }
}

export const searchAccount = async (account, apiBase = baseBlockstackApi) => {
  try {
    let data = await fetch(`${apiBase}search?query=${account.toLowerCase().trim()}`)
    return data.json()
  } catch (err) {
    console.log(err)
    return []
  }
}

export const getUserBasic = async (account, apiBase = baseBlockstackApi) => {
  try {
    let data = await fetch(`${apiBase}users/${account.toLowerCase().trim()}`)
    return data.json()
  } catch (err) {
    console.log(err)
    return {}
  }
}

export const saveFile = async (name, data, options = { encrypt: true }) => {
  try {
    return userSession.putFile(filer(name), JSON.stringify(data), options)
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getFile = async (name, options = { decrypt: true }) => {
  try {
    return userSession.getFile(filer(name), options)
  } catch (err) {
    console.log(err)
    return null
  }
}
