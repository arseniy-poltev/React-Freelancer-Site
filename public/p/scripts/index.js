function loadScript(filename,callback){
    var fileref=document.createElement('script');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", filename);
    fileref.onload = callback;
    if (typeof fileref!="undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }
}

loadScript('scripts/initHelpCrunch.js');

loadScript('scripts/initHotjar.js');

loadScript('scripts/initAdroll.js');

loadScript('https://www.googletagmanager.com/gtag/js?id=UA-144720137-1');

loadScript('scripts/settingGtags.js');