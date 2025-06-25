const http = require('http');
const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify',
  async postSave(comment) {
    // do what ever you want after save comment
  },
  secureDomains: 'https://meow.jumaoo.top',
  mailSubject: '{{parent.nick | safe}}，you got reply for the comment on MEOW',
  mailSubjectAdmin: 'New comment on MEOW',
  mailTemplate: '<div style="border-radius:10px 10px 10px 10px;font-size:13px;color:#555;width:666px;margin:50px auto;border:1px solid #eee;max-width:100%;background:#fff repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow:0 1px 5px rgb(0 0 0 / 15%)"><div style="background:#49bdad;color:#fff;border-radius:10px 10px 0 0;background-image:-moz-linear-gradient(0deg,#43c6b8,#ffd1f4);background-image:-webkit-linear-gradient(0deg,#43c6b8,#ffd1f4);height:66px"><p style="font-size:15px;word-break:break-all;padding:23px 32px;margin:0;background-color:hsla(0,0%,100%,.4);border-radius:10px 10px 0 0">您在<a style="text-decoration:none;color:#12addb" href="{{site.url}}" target="_blank">🐱MEOW</a>上的留言有新回复啦！</p></div><div style="margin:20px auto;width:90%"><p>😊Hi，<strong>{{parent.nick | safe}}</strong>，您曾发表评论：</p><div style="background:#f5f5f5;margin:20px 0;padding:15px;border-radius:5px;font-size:14px"><p>{{parent.comment | safe}}</p></div><p><strong>{{self.nick}}</strong> 给您的回复如下：</p><div style="background:#f5f5f5;margin:20px 0;padding:15px;border-radius:5px;font-size:14px"><p>{{self.comment | safe}}</p></div><p>您可以点击<a style="text-decoration:none;color:#12addb" target="_blank" href="{{site.postUrl}}">查看回复的完整內容</a> ，欢迎再次光临<a style="text-decoration:none;color:#12addb" href="https://catoi.cn/" target="_blank">🐱MEOW</a>。</p><div style="color:#8c8c8c;font-size:10px;width:100%;text-align:center;word-wrap:break-word"><p style="padding:20px">Meow，一款简洁可爱的响应式 Hexo 主题</p></div></div></div>',
  mailTemplateAdmin: '<div style="border-radius:10px 10px 10px 10px;font-size:13px;color:#555;width:666px;margin:50px auto;border:1px solid #eee;max-width:100%;background:#fff repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow:0 1px 5px rgb(0 0 0 / 15%)"><div style="background:#49bdad;color:#fff;border-radius:10px 10px 0 0;background-image:-moz-linear-gradient(0deg,#43c6b8,#ffd1f4);background-image:-webkit-linear-gradient(0deg,#43c6b8,#ffd1f4);height:66px"><p style="font-size:15px;word-break:break-all;padding:23px 32px;margin:0;background-color:hsla(0,0%,100%,.4);border-radius:10px 10px 0 0">您的网站 <a style="text-decoration:none;color:#12addb" href="{{site.url}}" target="_blank">🐱MEOW</a> 有新评论啦！</p></div><div style="margin:20px auto;width:90%"><p><strong>{{self.nick}}</strong> 给您的评论如下：</p><div style="background:#f5f5f5;margin:20px 0;padding:15px;border-radius:5px;font-size:14px"><p>{{self.comment | safe}}</p></div><p>您可以点击<a style="text-decoration:none;color:#12addb" href="{{site.postUrl}}" target="_blank">查看回复的完整內容</a></p><div style="color:#8c8c8c;font-size:10px;width:100%;text-align:center;word-wrap:break-word"><p style="padding:20px">Meow，一款简洁可爱的响应式 Hexo 主题</p></div></div></div>',
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
