function initHelpCrunch () {
    window.HelpCrunch('init', 'kukharets', {
        applicationId: 1,
        applicationSecret: 'RdxuuTjM+4kCMzGGpCZChpezDLVNPAFOoemnCcUGn2iclux0usT7zMOspf5MBWxpOOSmnZDLecz2lrDHCxrnJg=='
    });
    window.HelpCrunch('showChatWidget');
    window.showChatWidget = function (){};
    window.HideChatWidget = function (){return window.HelpCrunch('hideChatWidget')};
};

window.HelpCrunch=function(){window.HelpCrunch.q.push(arguments)};
window.HelpCrunch.q=[];

var s=document.createElement('script');
s.async=1;
s.type='text/javascript';
s.src='https://widget.helpcrunch.com/';
(document.body||document.head).appendChild(s);
s.id = "hc-script";
s.onload = () => {
    initHelpCrunch()
};