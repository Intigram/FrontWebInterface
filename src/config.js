
const config = {
  "lol_images": {
    "red": {
      "FIRE_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/3/3f/Infernal_Dragon_buff.png',
      "EARTH_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/9/9e/Mountain_Dragon_buff.png',
      "WATER_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/c/c6/Ocean_Dragon_buff.png',
      "AIR_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/a/ab/Cloud_Dragon_buff.png',
      "HEXTECH_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/1/1e/Hextech_Dragon_buff.png',
      "CHEMTECH_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/9/99/Chemtech_Dragon_buff.png',
      "ELDER_DRAGON": 'https://raw.githubusercontent.com/ceasar0865/CS/373b06e844ecb958d6aac531014efcaa55454832/elder-dragon.svg',
      "BARON_NASHOR": 'https://upload.wikimedia.org/wikipedia/commons/0/00/Nashor-icon.svg',
      "RIFTHERALD": 'https://raw.githubusercontent.com/ceasar0865/CS/373b06e844ecb958d6aac531014efcaa55454832/herald-icon.svg',
      "TOWER_BUILDING": 'https://img.icons8.com/ios-filled/50/FA5252/tower.png',
      "INHIBITOR_BUILDING": 'https://img.icons8.com/ios-glyphs/30/FA5252/deltohedron.png'
    },
    "blue": {
      "FIRE_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/3/3f/Infernal_Dragon_buff.png',
      "EARTH_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/9/9e/Mountain_Dragon_buff.png',
      "WATER_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/c/c6/Ocean_Dragon_buff.png',
      "AIR_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/a/ab/Cloud_Dragon_buff.png',
      "HEXTECH_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/1/1e/Hextech_Dragon_buff.png',
      "CHEMTECH_DRAGON": 'https://static.wikia.nocookie.net/leagueoflegends/images/9/99/Chemtech_Dragon_buff.png',
      "ELDER_DRAGON": 'https://raw.githubusercontent.com/ceasar0865/CS/373b06e844ecb958d6aac531014efcaa55454832/elder-dragon.svg',
      "BARON_NASHOR": 'https://upload.wikimedia.org/wikipedia/commons/0/00/Nashor-icon.svg',
      "RIFTHERALD": 'https://raw.githubusercontent.com/ceasar0865/CS/373b06e844ecb958d6aac531014efcaa55454832/herald-icon.svg',
      "TOWER_BUILDING": 'https://img.icons8.com/ios-filled/50/228BE6/tower.png',
      "INHIBITOR_BUILDING": 'https://img.icons8.com/ios-glyphs/30/228BE6/deltohedron.png'
    }
  },
  "regionOptions" : [
    {"short":"BR1", "long":"americas"}, 
    {"short":"EUW1", "long":"europe"},  {"short":"EUN1", "long":"europe"}, 
    {"short":"JP1", "long":"asia"},     {"short":"KR", "long":"asia"}, 
    {"short":"LA1", "long":"americas"}, {"short":"LA2", "long":"americas"}, 
    {"short":"NA1", "long":"americas"}, {"short":"OC1", "long":"sea"}, 
    {"short":"PH2", "long":"sea"},     {"short":"RU", "long":"europe"},
    {"short":"SG2", "long":"sea"},     {"short":"TH2", "long":"sea"},
    {"short":"TR1", "long":"europe"},   {"short":"TW2", "long":"sea"}, 
    {"short":"VN2","long":"sea"}
  ],
  "regionDict" : {
    "BR1":"americas", 
    "EUW1":"europe",  "EUN1":"europe", 
    "JP1":"asia",     "KR":"asia", 
    "LA1":"americas", "LA2":"americas", 
    "NA1":"americas", "OC1":"sea", 
    "PH2":"sea",     "RU":"europe",
    "SG2":"asia",     "TH2":"sea",
    "TR1":"europe",   "TW2":"sea", 
    "VN2":"sea"
  },
  "my_api": process.env.REACT_APP_HOST_IP_ADDRESS,
  "api_key": process.env.REACT_APP_API_KEY
}
export default config