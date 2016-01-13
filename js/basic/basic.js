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
    LoadingDiv.setAttribute('class', 'Loading');
    //设置优先级别
    LoadingDiv.style.zIndex = 2000;
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

//显示警告框。遮罩层+对话框信息  没有关闭按钮
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

//显示正确错误的信息 只有背景+文字
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
    ShowMsgDialog.style.zIndex = '2000';
    ShowMsgDialog.setAttribute('class', 'ShowMsgDialog');
    document.body.appendChild(ShowMsgDialog);
}

//设置上下滑动
function SlideToggle(name, slidedowntime, gaptime, slideuptime) {
    $(name).slideDown(slidedowntime);
    setTimeout(function () {
        $(name).slideUp(slideuptime);
    }, gaptime);
}

//此处name没有必要加'.'
function RemoveDialog(name) {
    document.getElementsByClassName(name)[0].parentNode.removeChild(document.getElementsByClassName(name)[0]);
}

/*显示邮箱  密码  昵称 */
function Email_Pass_Name(TitleHint, EmailHint, PasswordHint, NickNameHint, BtnHint, avaliable, BtnClass) {
    //设置遮罩层
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

    //设置弹出对话框
    var SimpleDialog = document.createElement('div');
    SimpleDialog.style.position = 'absolute';
    SimpleDialog.style.width = '400px';
    SimpleDialog.style.height = '360px';
    SimpleDialog.style.display = avaliable;
    SimpleDialog.style.top = (ClientHeight - 350) / 2 + 'px';
    SimpleDialog.style.left = (ClientWidth - 400) / 2 + 'px';
    SimpleDialog.style.borderRadius = '3px';
    SimpleDialog.style.background = "#fff";
    SimpleDialog.style.zIndex = 1000;
    SimpleDialog.setAttribute('class', 'SimpleDialog');
    SimpleDialog.style.color = '#23527C';
    SimpleDialog.style.fontSize = '2em';
    SimpleDialog.style.textAlign = 'center';
    SimpleDialog.setAttribute('class', 'SimpleDialog');
    document.body.appendChild(SimpleDialog);

    var Title = document.createElement('div');
    Title.style.position = 'absolute';
    Title.style.height = '60px';
    Title.style.lineHeight = '60px';
    Title.style.display = 'flex';
    Title.style.background = '#e0e0e0';
    Title.style.fontSize = '.7em';
    Title.style.borderRadius = '3px';
    Title.setAttribute('class', 'Title');
    SimpleDialog.appendChild(Title);

    var TitleIcon = document.createElement('i');
    TitleIcon.style.position = 'absolute';
    TitleIcon.style.left = '360px';
    TitleIcon.style.top = '2px';
    //TitleIcon.style.color = 'block';
    TitleIcon.style.cursor = 'pointer';
    TitleIcon.style.height = '34px';
    TitleIcon.style.lineHeight = '34px';
    TitleIcon.style.width = '40px';
    TitleIcon.style.zIndex = '1000';
    TitleIcon.setAttribute('class', 'glyphicon glyphicon-remove-sign TitleIcon');
    Title.appendChild(TitleIcon);

    var TitleMsg = document.createElement('span');
    TitleMsg.style.position = 'absolute';
    TitleMsg.style.height = '60px';
    TitleMsg.style.lineHeight = '60px';
    TitleMsg.style.width = '400px';
    TitleMsg.innerHTML = TitleHint + '<hr/>';
    TitleMsg.style.fontSize = '1.3em';
    TitleMsg.getElementsByTagName('hr')[0].style.margin = '0';
    Title.appendChild(TitleMsg);


    var Email = document.createElement('div');
    Email.style.position = 'absolute';
    //Email.style.widths = '400px';
    Email.style.height = '34px';
    Email.style.lineHeight = '100px';
    Email.style.display = 'flex';
    Email.style.background = '#e0e0e0';
    Email.style.fontSize = '.7em';
    Email.style.borderRadius = '3px';
    Email.style.margin = '80px 0 0 70px';
    Email.setAttribute('class', 'Email');
    SimpleDialog.appendChild(Email);

    var EmailIcon = document.createElement('i');
    EmailIcon.style.height = '34px';
    EmailIcon.style.lineHeight = '34px';
    EmailIcon.style.width = '40px';
    EmailIcon.setAttribute('class', 'glyphicon glyphicon-envelope EmailIcon');
    Email.appendChild(EmailIcon);

    var EmailInput = document.createElement('input');
    EmailInput.style.display = avaliable;
    EmailInput.style.height = '34px';
    EmailInput.style.lineHeight = '34px';
    EmailInput.style.width = '220px';
    EmailInput.style.border = '1px solid #23537C';
    EmailInput.style.borderLeft = 'none';
    EmailInput.style.borderRadius = '3px';
    EmailInput.style.borderBottomLeftRadius = '0';
    EmailInput.style.borderTopLeftRadius = '0';
    EmailInput.style.padding = '0 0 0 10px';
    EmailInput.style.fontFamily = 'Arial,sans-serif';
    EmailInput.style.fontSize = '.85em';
    EmailInput.setAttribute('class', 'EmailInput');
    EmailInput.setAttribute('placeholder', EmailHint);
    Email.appendChild(EmailInput);

    //Password
    var Password = document.createElement('div');
    Password.style.position = 'absolute';
    Password.style.height = '34px';
    Password.style.lineHeight = '100px';
    Password.style.display = 'flex';
    Password.style.background = '#e0e0e0';
    Password.style.fontSize = '.7em';
    Password.style.borderRadius = '3px';
    Password.style.margin = '150px 0 0 70px';
    Password.setAttribute('class', 'Password');
    SimpleDialog.appendChild(Password);

    var PasswordIcon = document.createElement('i');
    PasswordIcon.style.height = '34px';
    PasswordIcon.style.lineHeight = '34px';
    PasswordIcon.style.width = '40px';
    PasswordIcon.setAttribute('class', 'glyphicon glyphicon-lock PasswordIcon');
    Password.appendChild(PasswordIcon);

    var PasswordInput = document.createElement('input');
    PasswordInput.style.display = avaliable;
    PasswordInput.style.height = '34px';
    PasswordInput.style.lineHeight = '34px';
    PasswordInput.style.width = '220px';
    PasswordInput.style.border = '1px solid #23537C';
    PasswordInput.style.borderLeft = 'none';
    PasswordInput.style.borderRadius = '3px';
    PasswordInput.style.borderBottomLeftRadius = '0';
    PasswordInput.style.borderTopLeftRadius = '0';
    PasswordInput.style.padding = '0 0 0 10px';
    PasswordInput.style.fontSize = '.85em';
    PasswordInput.setAttribute('type', 'password');
    PasswordInput.setAttribute('class', 'PasswordInput');
    PasswordInput.setAttribute('placeholder', PasswordHint);
    Password.appendChild(PasswordInput);


    var Nickname = document.createElement('div');
    Nickname.style.position = 'absolute';
    Nickname.style.height = '34px';
    Nickname.style.lineHeight = '100px';
    Nickname.style.display = 'flex';
    Nickname.style.background = '#e0e0e0';
    Nickname.style.fontSize = '.7em';
    Nickname.style.margin = '218px 0 0 70px';
    Nickname.style.borderRadius = '3px';
    Nickname.setAttribute('class', 'Nickname');
    SimpleDialog.appendChild(Nickname);

    var NicknameIcon = document.createElement('i');
    NicknameIcon.style.height = '34px';
    NicknameIcon.style.lineHeight = '34px';
    NicknameIcon.style.width = '40px';
    NicknameIcon.setAttribute('class', 'glyphicon glyphicon-user NicknameIcon');
    Nickname.appendChild(NicknameIcon);

    var NicknameInput = document.createElement('input');
    NicknameInput.style.display = avaliable;
    NicknameInput.style.height = '34px';
    NicknameInput.style.lineHeight = '34px';
    NicknameInput.style.width = '220px';
    NicknameInput.style.border = '1px solid #23537C';
    NicknameInput.style.borderLeft = 'none';
    NicknameInput.style.borderRadius = '3px';
    NicknameInput.style.borderBottomLeftRadius = '0';
    NicknameInput.style.borderTopLeftRadius = '0';
    NicknameInput.style.padding = '0 0 0 10px';
    NicknameInput.style.fontSize = '.85em';
    NicknameInput.setAttribute('class', 'NicknameInput');
    NicknameInput.setAttribute('placeholder', NickNameHint);
    Nickname.appendChild(NicknameInput);

    var SignUpBtn = document.createElement('div');
    SignUpBtn.style.position = 'absolute';
    SignUpBtn.style.cursor = 'pointer';
    SignUpBtn.style.width = '90px';
    SignUpBtn.style.height = '34px';
    SignUpBtn.style.lineHeight = '30px';
    SignUpBtn.style.display = avaliable;
    SignUpBtn.style.background = 'translate';
    SignUpBtn.style.border = '2px solid #23537C';
    SignUpBtn.style.borderRadius = '3px';
    SignUpBtn.style.fontSize = '.6em';
    SignUpBtn.innerHTML = BtnHint;
    SignUpBtn.style.marginTop = '290px';
    SignUpBtn.style.marginLeft = '155px';
    SignUpBtn.setAttribute('class', 'BtnSubmit' + ' ' + BtnClass);
    SimpleDialog.appendChild(SignUpBtn);

    TitleIcon.onclick = function () {
        Close();
    };

    InputChangeColor(EmailInput);
    InputChangeColor(PasswordInput);
    InputChangeColor(NicknameInput);
}

function Close() {
    RemoveDialog('Masked');
    RemoveDialog('SimpleDialog');
}
//鼠标移入输入框，移出输入框
function InputChangeColor(name) {
    name.onfocus = function () {
        name.style.border = 'none';
        name.style.boxShadow = '2px 1px 2px 3px lightblue';
    };

    name.onblur = function () {
        name.style.boxShadow = 'none';
        name.style.border = '1px solid #23537C';
        name.style.borderLeft = 'none';
        name.style.borderRadius = '3px';
        name.style.borderBottomLeftRadius = '0';
        name.style.borderTopLeftRadius = '0';
    }
}

function ShowConfirmDialog(top, right, bottom, left, avaliable, Title, Msg, CancleBtn, ConfirmBtn, background) {
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

    var ShowConfirmDialog = document.createElement('div');
    ShowConfirmDialog.style.position = 'absolute';
    ShowConfirmDialog.style.width = '400px';
    ShowConfirmDialog.style.height = '260px';
    ShowConfirmDialog.style.display = avaliable;
    ShowConfirmDialog.style.top = (ClientHeight - 260) / 2 + 'px';
    ShowConfirmDialog.style.left = (ClientWidth - 400) / 2 + 'px';
    ShowConfirmDialog.style.borderRadius = '3px';
    ShowConfirmDialog.style.background = background;
    ShowConfirmDialog.style.zIndex = 2000;
    ShowConfirmDialog.setAttribute('class', 'ShowConfirmDialog');
    ShowConfirmDialog.innerHTML = Title + '<hr/>';
    ShowConfirmDialog.style.fontSize = '1.4em';
    ShowConfirmDialog.style.fontWeight = 'bold';
    ShowConfirmDialog.style.textAlign = 'center';
    ShowConfirmDialog.style.padding = '20px 0 0 0';
    document.body.appendChild(ShowConfirmDialog);


    var ShowConfirmMsg = document.createElement('div');
    ShowConfirmMsg.style.position = 'absolute';
    ShowConfirmMsg.style.width = '400px';
    ShowConfirmMsg.style.display = avaliable;
    ShowConfirmMsg.setAttribute('class', 'ShowConfirmDialog');
    ShowConfirmMsg.innerHTML = Msg;
    ShowConfirmMsg.style.fontSize = '.8em';
    ShowConfirmMsg.style.textAlign = 'center';
    ShowConfirmMsg.style.fontWeight = 'normal';
    ShowConfirmDialog.appendChild(ShowConfirmMsg);

    var Cancle = document.createElement('button');
    Cancle.style.position = 'absolute';
    Cancle.style.top = '180px';
    Cancle.style.left = '80px';
    Cancle.style.fontSize = '18px';
    Cancle.setAttribute('class', 'BtnSubmit Cancel');
    Cancle.innerHTML = CancleBtn;
    ShowConfirmDialog.appendChild(Cancle);

    var Confirm = document.createElement('button');
    Confirm.style.position = 'absolute';
    Confirm.style.top = '180px';
    Confirm.style.left = '250px';
    Confirm.style.fontSize = '18px';
    Confirm.setAttribute('class', 'BtnSubmit Confirm');
    Confirm.innerHTML = ConfirmBtn;
    ShowConfirmDialog.appendChild(Confirm);
}

var wait = 10;
function TimeDisabled(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.value = "Invite";
        wait = 10;
    } else {
        o.setAttribute("disabled", 'disabled');
        o.value = "wait " + wait + " s";
        wait--;
        setTimeout(function () {
                TimeDisabled(o)
            },
            1000);
    }
}