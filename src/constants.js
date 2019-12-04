import { AppConfig } from "blockstack"

export const appConfig = new AppConfig(["store_write", "publish_data"])

export const baseBlockstackApi = "https://core.blockstack.org/v1/"

export const algorithmWeigth = 3

export const socialWeigth = 3

export const constantWeigths = ["name", "bio", "image"]

export const placeholderImg = "./img/placeholder.png"

export const historySize = 50

export const DApps =
 [
   {

     url: "/",
     name: "Search",
     description: "Decentralized search",
     icon: "./img/daoed-search.png"
   }
 ]

export const defaultSettings = {
  theme: "light",
  saveSearch: false,
  saveTheme: false
}

export const daoedPrefixer = "daoed."
