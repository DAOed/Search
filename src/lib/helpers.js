import { historySize, daoedPrefixer } from "@constants"

export const addHistory = (value, array) => {
  let len = array.length
  if (len < historySize) {
    array.push(value)
    return array
  } else {
    array.splice(len - 1)
    array.push(value)
    return array
  }
}

export const filer = name => `${daoedPrefixer}${name}`

const defaultColors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]

export const initialsAvatar = (name, colors = defaultColors) => {
  name = name.replace(/\s+/g, " ").trim()

  let nameSplit = name.split(" ")
  let initials

  if (nameSplit.length >= 2) {
    initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0)
  } else {
    name = name.split(".")[0]
    initials = name.charAt(0) + name.charAt(name.length - 1)
  }

  initials = initials.toUpperCase()

  const charCodes = initials
    .split("")
    .map(char => char.charCodeAt(0))
    .join("")

  let color = colors[parseInt(charCodes, 10) % colors.length]

  return {
    content: initials,
    style: {
      backgroundColor: color,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "30px"
    }
  }
}
