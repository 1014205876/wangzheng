(function (win) {
    win.alert = function (name) {
        var iframe = document.createElement("IFRAME");
        iframe.style.display = "none";
        iframe.setAttribute("src", 'data:text/plain');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }
    win.confirm = function (message) {
        var iframe = document.createElement("IFRAME");
        iframe.style.display = "none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        var alertFrame = window.frames[0];
        var iwindow = alertFrame.window;
        if (iwindow == undefined) {
            iwindow = alertFrame.contentWindow;
        }
        var result = iwindow.confirm(message);
        iframe.parentNode.removeChild(iframe);
        return result;
    }
    setRem();
    win.onresize = function () {
        setRem();
    };
    function setRem() {
        var designW = 750;//iphone6标准的设计稿宽度
        var designR = 30;//根元素html的像素值
        var oHtml = document.querySelector('html');//获取html元素
        var winW = document.documentElement.clientWidth || document.body.clientWidth;
        oHtml.style.fontSize = parseInt(winW) / designW * designR + "px";
    };
})(window);