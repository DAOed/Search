import { getUserBasic, saveFile } from "@lib/blockstack"
import { historySize } from "@constants"

import ZeitUI from "@zeit-ui/vue"

export default {
  async userData ({ commit }, payload) {
    let newData = await getUserBasic(payload.username)
    commit("userData", { ...payload, ...newData })
  },
  addHistory ({ commit, state }, payload) {
    let history = state.history
    if (history.length >= historySize) {
      history.slice(historySize - 1)
    }

    history.push(payload)
    if (state.settings.saveSearch) {
      saveFile("history", history)
    }
    commit("history", history)
  },
  setHistory ({ commit, state }, payload) {
    let auto = payload.find((item) => item.auto)
    payload = payload.filter((item) => !item.auto)

    if (state.settings.saveSearch && !auto) {
      saveFile("history", payload)
    }
    commit("history", payload)
  },
  theme ({ commit, state }, payload = {}) {
    const { mode, auto } = payload
    if (auto) {
      if (mode === "dark") {
        ZeitUI.theme.enableDark()
      } else {
        ZeitUI.theme.enableLight()
      }
      commit("theme", mode)
    } else {
      let theme
      if (state.theme === "light") {
        ZeitUI.theme.enableDark()
        theme = "dark"
      } else {
        ZeitUI.theme.enableLight()
        theme = "light"
      }
      commit("theme", theme)

      if (state.settings.saveTheme) {
        saveFile("settings", { ...state.settings, theme })
      }
    }
  },
  settings ({ commit, state }, payload) {
    let auto = payload.auto
    delete payload.auto

    if (!auto) saveFile("settings", { ...state.settings, ...payload })
    commit("settings", payload)
  }
}
