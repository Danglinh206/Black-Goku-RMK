const fs = require('fs');
const moment = require('moment-timezone');
module.exports.config = {
    name: "tagadmin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "hi<@shibaSama>",
    description: "Tag",
    commandCategory: "Admin",
    usages: "[msg]",
    cooldowns: 5
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
                       }

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads, args }) {
let uid = event.senderID;
var msg = [`ljkj`];
    const { threadID, messageID, body } = event;
    switch (handleReply.type) {
        case "tagadmin": {
            let name = await Users.getNameUser(handleReply.author);
            api.sendMessage({body: `[ ADMIN FEEDBACK ]\n\n💬 Note: ${body}\n👤 Admin: ${name || "Người dùng facebook"}\n⏰ Time: ${moment().tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY-HH:mm:ss")}\nReply (phản hồi) tin nhắn này để trả lời Admin`, attachment: await downLoad(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, __dirname+'/cache/12345.jpg')}, handleReply.threadID, (err, info) => {
                if(err) console.log(err)
                else {
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: "reply",
                        messageID: info.messageID,
                        messID: messageID,
                        threadID
                    })
                }
            }, handleReply.messID);
            break;
        }
        case "reply": {
            let name = await Users.getNameUser(event.senderID);
            api.sendMessage({body: `[ USER FEEDBACK ]\n\n💬 Note: ${body}\n👤 Name: ${name || "Người dùng facebook"}\n🏘️ Box: ${(await Threads.getInfo(threadID)).threadName || "Unknow"}\n⏰ Time: ${moment().tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY-HH:mm:ss")}\nReply (phản hồi) tin nhắn này để trả lời người tag`, attachment: await downLoad(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, __dirname+'/cache/12345.jpg')},handleReply.threadID, (err, info) => {
                if(err) console.log(err)
                else {
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: "tagadmin",
                        messageID: info.messageID,
                        messID: messageID,
                        threadID
                    })
                }
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.handleEvent = async ({ api, event, Users, Threads, args }) => {
    const { threadID, messageID, body, mentions, senderID } = event;
    let path = __dirname + "/cache/data/tagadmin.json";
    if(!fs.existsSync(path)) fs.writeFileSync(path, "{}");
    let data = JSON.parse(fs.readFileSync(path));
    if(!data[threadID]) data[threadID] = true;
    if(!mentions || !data[threadID]) return;
    let mentionsKey = Object.keys(mentions);
    let allAdmin = global.config.ADMINBOT;
    mentionsKey.forEach(async (each) => {
        if(each == api.getCurrentUserID()) return;
        if(allAdmin.includes(each)) {
            let userName = await Users.getNameUser(senderID);
            let threadName = await Threads.getInfo(threadID).threadName;
            api.sendMessage({body:`👤 User: ${userName}\n🏘️ Box: ${(await Threads.getInfo(threadID)).threadName || "Unknow"}\n💬 Note: ${body}\n⏰ Time: ${moment().tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY-HH:mm:ss")}\nReply (phản hồi) tin nhắn này để trả lời người tag`, attachment: await downLoad(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, __dirname+'/cache/12345.jpg')},each, (err, info) => {
                if(err) console.log(err)
                else {
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: "tagadmin",
                        messageID: info.messageID,
                        messID: messageID,
                        author: each,
                        threadID
                    })
                }
            })
        }
    })
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
}

module.exports.run = async ({ api, event, args }) => {
const fs = require("fs");
    const { threadID } = event;
    let path = __dirname + "/data/tagadmin.json";
    if(!fs.existsSync(path)) fs.writeFileSync(path, "{}");
    let data = JSON.parse(fs.readFileSync(path));
    if(!data[threadID]) data[threadID] = true;
    if(args[0] == "off") data[threadID] = false;
    else if(args[0] == "on") data[threadID] = true;
    else return api.sendMessage(`❎ Vui lòng chọn tagadmin on/off`, event.threadID, event.messageID);
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
    return api.sendMessage(`✅ Tag Admin đã được ${data[threadID] ? "bật" : "tắt"}`, event.threadID, event.messageID);
};

async function downLoad(a, b) {
    await (require('image-downloader')).image({
        url: a, dest: b
    });
    return (require('fs-extra')).createReadStream(b);
};