const moment = require('moment');

module.exports.config = {
  name: "autosetname",
  eventType: ["log:subscribe"],
  version: "1.0.3",
  credits: "D-Jukie || Time By Cthinh",
  description: "Tự động set biệt danh thành viên mới"
};

module.exports.run = async function({ api, event, Users }) {
  const { threadID } = event;
  var memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId)
  for (let idUser of memJoin) {
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"]
    const pathData = join("SystemData","data","autosetname.json");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: [] };
    if (thisThread.nameUser.length == 0) return 
    if (thisThread.nameUser.length != 0) {  
      var setName = thisThread.nameUser[0] 
      await new Promise(resolve => setTimeout(resolve, 1000));
      var namee1 = await api.getUserInfo(idUser)
      var namee = namee1[idUser].name
      var joinDate = moment(event.logMessageData.timestamp).format('DD-MM-YYYY HH:mm:ss');
      api.changeNickname(`${setName} ${namee} || ${joinDate}`, threadID, idUser);
    } 
  }	
  return api.sendMessage(`[ 𝐌𝐎𝐃𝐄 ] - Đã set biệt danh tạm thời cho thành viên mới`, threadID, event.messageID)
}