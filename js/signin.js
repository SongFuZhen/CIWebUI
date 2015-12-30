/**
 * Created by zero on 2015/12/22.
 */

window.onload = function () {
    var Welcome = document.getElementsByClassName('Welcome')[0];
    Welcome.style.top = (ClientHeight - 400) / 2 + 'px';
    Welcome.style.left = (ClientWidth - 900) / 2 + 'px';
};

function SignIn() {
    var SignInDiv = document.getElementsByClassName('SignIn');
    var Email = SignInDiv[0].getElementsByTagName('input')[0].value.trim();
    var Password = SignInDiv[0].getElementsByTagName('input')[1].value.trim();
    var url = 'user_sessions';
    var LoadHref = 'Html/MyKPI.html';
    AjaxSignIn(url, 'POST', Email, Password, LoadHref);
    console.log('Email----------' + '\n' + Email + '\n' + 'Password------------' + '\n' + Password);
}

//发送注册请求
function Register() {
    var Email = document.getElementsByClassName('EmailInput')[0].value.trim();
    var Password = document.getElementsByClassName('PasswordInput')[0].value.trim();
    var Nickname = document.getElementsByClassName('NicknameInput')[0].value.trim();

    var url = 'user_registrations';
    AjaxRegister(url, 'POST', Email, Password, Nickname);
}

function ResetPassword() {
    var Email = document.getElementsByClassName('EmailInput')[0].value.trim();
    var url = 'users/forget_password';
    AjaxResetPassword(url, 'POST', Email, 'Reset email have sent.Check!');
}

//注册点击事件
function RegisterShow() {
    Email_Pass_Name('Sign Up', 'example@cz-tek.com', 'Private Password', 'Jack', 'Sign Up', 'block', 'Register');
    var SignUp = document.getElementsByClassName('Register')[0];
    SignUp.onclick = function () {
        Register();
    }
}

//忘记密码事件
function ForgetPasswordShow(avaliable) {
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
    SimpleDialog.style.height = '240px';
    SimpleDialog.style.display = avaliable;
    SimpleDialog.style.top = (ClientHeight - 350) / 2 + 'px';
    SimpleDialog.style.left = (ClientWidth - 400) / 2 + 'px';
    SimpleDialog.style.borderRadius = '3px';
    SimpleDialog.style.background = "#fff";
    SimpleDialog.style.zIndex = 1000;
    SimpleDialog.setAttribute('class', 'SimpleDialog');
    //SimpleDialog.innerHTML = 'Forget Password<br/> <hr/>';
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
    TitleMsg.innerHTML = 'Forget Password <hr/>';
    TitleMsg.style.fontSize = '1.3em';
    TitleMsg.getElementsByTagName('hr')[0].style.margin = '0';
    Title.appendChild(TitleMsg);

    var Email = document.createElement('div');
    Email.style.position = 'absolute';
    Email.style.height = '34px';
    Email.style.lineHeight = '100px';
    Email.style.display = 'flex';
    Email.style.background = '#e0e0e0';
    Email.style.fontSize = '.7em';
    Email.style.borderRadius = '3px';
    Email.style.margin = '90px 0 0 70px';
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
    EmailInput.setAttribute('placeholder', 'example@cz-tek.com');
    Email.appendChild(EmailInput);

    var ResetPasswordBtn = document.createElement('div');
    ResetPasswordBtn.style.position = 'absolute';
    ResetPasswordBtn.style.cursor = 'pointer';
    ResetPasswordBtn.style.width = '90px';
    ResetPasswordBtn.style.height = '34px';
    ResetPasswordBtn.style.lineHeight = '30px';
    ResetPasswordBtn.style.display = avaliable;
    ResetPasswordBtn.style.background = 'translate';
    ResetPasswordBtn.style.border = '2px solid #23537C';
    ResetPasswordBtn.style.borderRadius = '3px';
    ResetPasswordBtn.style.fontSize = '.6em';
    ResetPasswordBtn.innerHTML = 'Forget';
    ResetPasswordBtn.style.marginTop = '150px';
    ResetPasswordBtn.style.marginLeft = '155px';
    ResetPasswordBtn.setAttribute('class', 'BtnSubmit ');
    SimpleDialog.appendChild(ResetPasswordBtn);

    InputChangeColor(EmailInput);

    TitleIcon.onclick = function () {
        Close();
    };

    ResetPasswordBtn.onclick = function () {
        ResetPassword();
    }
}

//为输入框添加回车事件
function EnterSignIn(e) {
    var ev = window.event || e;
    if (ev.keyCode == 13) {
        SignIn();
    }
}