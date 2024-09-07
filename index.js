const semver = require('semver');
const main = require('./utils/main.js');
const { spawn: s } = require("child_process");
const path = require('path');
const express = require('express');
const l = require("./utils/log");
const chalkercli = require('chalkercli');
const app = express();
const CFonts = require('cfonts');
const port = process.env.PORT || 2006;


app.get('/', function(req, res) {
res.sendFile(path.join(__dirname, '/index.html'));
 });
app.listen(port);
console.log('Máy chủ bắt đầu tại lúc http://localhost:' + port);


const sr = (m) => {
    l('🔄 ĐANG KHỞI ĐỘNG BOT',"⟦ STARTING ⟧⪼ ")
    const c = s("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });
    c.on("close", async (e) => {
        if (e == 1) return sr("🔄 BOT ĐANG KHỞI ĐỘNG LẠI!!!");
        else if (String(e).startsWith("2")) {
            await new P
                romise((r) => setTimeout(r, parseInt(e.replace('2', '')) * 1000));
              sr("🤖 BOT ĐÃ ĐƯỢC KÍCH HOẠT, VUI LÒNG CHỜ MỘT CHÚT!!!");
        }
    });
    c.on("error", (error) => l("Đã xảy ra lỗi: " + JSON.stringify(error), "[ Khởi động ]"));
};
const rainbow2 = chalkercli.rainbow('━━━━━━━━━━━━━━━━━━━━━[ INFO FILE ]━━━━━━━━━━━━━━━━━━━━━━');
rainbow2.render();

CFonts.say('BLACK GOKU', {
    font: 'slick',
    align: 'center',
    gradient: ['red', 'magenta']
})
sr();
