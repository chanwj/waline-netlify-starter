const http = require('http');
const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify',
  async postSave(comment) {
    // do what ever you want after save comment
  },
  // 通过QQ号或者QQ邮箱获取QQ头像
  async avatarUrl(comment) {
    const regqq = new RegExp('^[1-9][0-9]{4,11}$');
    const regqqmail = new RegExp('(\\d+)@qq\\.com$', 'i');
    const mail = comment.mail;
    const nick = comment.nick;
    if (regqq.test(nick)) {
      return 'https://q1.qlogo.cn/headimg_dl?dst_uin=' + nick + '&spec=4';  
    }
    if (regqqmail.test(mail)) {
      const qq = mail.replace(/@qq\.com/i, '').toLowerCase();  
      if (regqq.test(qq)) {
        return 'https://q1.qlogo.cn/headimg_dl?dst_uin=' + qq + '&spec=4';
      }
    }
  },
});

module.exports.handler = serverless(http.createServer(app));
