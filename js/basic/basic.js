/**
 * Created by zero on 2015/12/22.
 */
var ClientHeight = document.documentElement.clientHeight;
var ClientWidth = document.documentElement.clientWidth;

//设置显示Loading和隐藏Loading   Loading的位置；
function Loading(top, right, bottom, left, avaliable) {
    var LoadingDiv = document.createElement('div');
    LoadingDiv.style.display = avaliable;
    LoadingDiv.style.position = 'absolute';
    LoadingDiv.style.top = top + 'px';
    LoadingDiv.style.right = right + 'px';
    LoadingDiv.style.bottom = bottom + 'px';
    LoadingDiv.style.left = left + 'px';
    LoadingDiv.style.opacity = 0.8;
    LoadingDiv.style.background = '#23537C';
    //设置ID
    LoadingDiv.setAttribute('id', 'Loading');
    //设置优先级别
    LoadingDiv.style.zIndex = 1000;
    document.body.appendChild(LoadingDiv);

    var Circle = document.createElement('div');
    Circle.style.position = 'absolute';
    //Circle.style.background = '#23537c';
    Circle.style.top = (ClientHeight - 200) / 2 + 'px';
    Circle.style.left = (ClientWidth - 200) / 2 + 'px';
    Circle.style.height = '200px';
    Circle.style.width = '200px';
    Circle.style.borderRadius = '100px';
    Circle.style.color = 'white';
    Circle.style.textAlign = 'center';
    Circle.style.paddingTop = '80px';
    Circle.style.font = '2em sans-serif';

    var count = 1;
    var Loading = 'Loading...';

    function ChangeColor() {
        var Show = Loading.substr(0, count);
        Circle.innerHTML = Show;
        count++;
        if (count > Loading.length)
            count = 0;
    }

    window.setInterval(ChangeColor, 250);
    LoadingDiv.appendChild(Circle);
}

function SimpleDialog(title, content, btnmsg, avaliable) {
    var Masked = document.createElement('div');
    Masked.style.display = avaliable;
    Masked.style.position = 'absolute';
    Masked.style.width = ClientWidth + 'px';
    Masked.style.height = ClientHeight + 'px';
    Masked.style.top = 0;
    Masked.style.left = 0;
    Masked.style.opacity = 0.8;
    Masked.style.background = '#e0e0e0';
    Masked.style.zIndex = 1000;
    Masked.setAttribute('class', 'Masked');
    document.body.appendChild(Masked);

    var SimpleDialog = document.createElement('div');
    SimpleDialog.style.position = 'absolute';
    SimpleDialog.style.width = '400px';
    SimpleDialog.style.height = '260px';
    SimpleDialog.style.display = avaliable;
    SimpleDialog.style.top = (ClientHeight - 300) / 2 + 'px';
    SimpleDialog.style.left = (ClientWidth - 400) / 2 + 'px';
    SimpleDialog.style.borderRadius = '3px';
    SimpleDialog.style.background = "#fff";
    SimpleDialog.style.zIndex = 1000;
    SimpleDialog.setAttribute('class', 'SimpleDialog');
    document.body.appendChild(SimpleDialog);

    var DialogTitle = document.createElement('div');
    DialogTitle.style.position = 'absolute';
    DialogTitle.style.width = '400px';
    DialogTitle.style.height = '140px';
    DialogTitle.style.display = avaliable;
    DialogTitle.style.borderRadius = '3px';
    DialogTitle.style.background = "#fff";
    DialogTitle.style.zIndex = 1000;
    DialogTitle.innerHTML = title + '<br/>' + '<br/>' + '<br/>' + content;
    DialogTitle.style.textAlign = 'center';
    DialogTitle.style.paddingTop = '50px';
    DialogTitle.style.font = '1.4em Arial';
    DialogTitle.style.fontWeight = 'bold';
    DialogTitle.setAttribute('class', 'DialogTitle');
    SimpleDialog.appendChild(DialogTitle);

    var DialogBtn = document.createElement('div');
    DialogBtn.style.position = 'absolute';
    DialogBtn.style.top = '180px';
    DialogBtn.style.left = '120px';
    DialogBtn.style.width = '160px';
    DialogBtn.style.height = '40px';
    DialogBtn.style.display = avaliable;
    DialogBtn.style.borderRadius = '3px';
    //DialogBtn.style.background = "green";
    DialogBtn.style.border = '2px solid green';
    DialogBtn.style.zIndex = 1000;
    DialogBtn.innerHTML = btnmsg;
    DialogBtn.style.textAlign = 'center';
    DialogBtn.style.font = '1em Arial';
    DialogBtn.style.fontWeight = 'bold';
    //DialogBtn.style.color = 'white';
    DialogBtn.style.paddingTop = '10px';
    DialogBtn.setAttribute('class', 'DialogBtn');
    SimpleDialog.appendChild(DialogBtn);

}

function ShowMsgDialog(top, right, bottom, left, avaliable, Msg, background) {
    var ShowMsgDialog = document.createElement('div');
    ShowMsgDialog.style.display = avaliable;
    ShowMsgDialog.style.position = 'absolute';
    ShowMsgDialog.style.top = top + 'px';
    ShowMsgDialog.style.right = right + 'px';
    ShowMsgDialog.style.bottom = bottom + 'px';
    ShowMsgDialog.style.left = left + 'px';
    ShowMsgDialog.style.height = '80px';
    ShowMsgDialog.style.width = '500px';
    ShowMsgDialog.style.background = background;
    ShowMsgDialog.innerHTML = Msg;
    ShowMsgDialog.style.color = 'white';
    ShowMsgDialog.style.font = '2em sans-serif';
    ShowMsgDialog.style.textAlign = 'center';
    ShowMsgDialog.style.borderRadius = '3px';
    ShowMsgDialog.style.paddingTop = '20px';
    ShowMsgDialog.setAttribute('class', 'ShowMsgDialog');
    document.body.appendChild(ShowMsgDialog);
}

function SlideToggle(name, slidedowntime, gaptime, slideuptime) {
    $(name).slideDown(slidedowntime);
    setTimeout(function () {
        $(name).slideUp(slideuptime);
    }, gaptime);
}