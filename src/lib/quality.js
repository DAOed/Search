
import { schema } from "@lib/schema"

export const build = function (data) {
  data = data.map(schema)
  return quality(data)
}

export const filter = (data, type, config) => {
  // console.log(data, type, config)

  if (type === "quality") {
    // checks are : name, bio, avatar, connected account
    let checks = config.map((check) => check.toLowerCase())

    let newData = data.map((d) => {
      let profile = d.profile

      if ((checks.indexOf("name") > -1) && !profile.name) return null
      if ((checks.indexOf("bio") > -1) && !profile.description) return null
      if ((checks.indexOf("avatar") > -1) && (!profile.image || !profile.image.find((img) => img.name === "avatar"))) return null
      if ((checks.indexOf("accounts") > -1) && (!profile.account || !profile.account.length)) return null

      return d
    })

    return newData.filter(Boolean)
  }
}

export const quality = function (data) {
  return data.sort(function (item1, item2) {
    let img1 = item1.profile.avatar || ""
    let img2 = item2.profile.avatar || ""

    let name1 = item1.profile.name || ""
    let name2 = item2.profile.name || ""

    let bio1 = item1.profile.description || ""
    let bio2 = item2.profile.description || ""

    // sort by avatar
    if (img1.length < img2.length) return 1
    if (img1.length > img2.length) return -1

    // sort by name
    if (name1.length < name2.length) return 1
    if (name1.length > name2.length) return -1

    // sort by description
    if (bio1.length < bio2.length) return 1
    if (bio1.length > bio2.length) return -1
  })
}
