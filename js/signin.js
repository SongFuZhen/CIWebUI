/**
 * Created by zero on 2015/12/22.
 */

window.onload = function () {
    var Welcome = document.getElementsByClassName('Welcome')[0];
    Welcome.style.top = (ClientHeight - 400) / 2 + 'px';
    Welcome.style.left = (ClientWidth - 900) / 2 + 'px';
    //RegisterShow('block');
};

function SignIn() {
    var SignInDiv = document.getElementsByClassName('SignIn');
    var Email = SignInDiv[0].getElementsByTagName('input')[0].value.trim();
    var Password = SignInDiv[0].getElementsByTagName('input')[1].value.trim();
    var url = 'user_sessions';
    AjaxSignIn(url, 'POST', Email, Password);
    console.log('Email----------' + '\n' + Email + '\n' + 'Password------------' + '\n' + Password);
}

function Register() {
    var Email = document.getElementsByClassName('EmailInput')[0].value.trim();
    var Password = document.getElementsByClassName('PasswordInput')[0].value.trim();
    var Nickname = document.getElementsByClassName('NicknameInput')[0].value.trim();
    //alert(Email + Password + Nickname);

    var url = 'user_registrations';
    AjaxRegister(url, 'POST', Email, Password, Nickname);
}
function RgAndFGTPass() {
    var RgAndFGTPass = document.getElementsByClassName('RgAndFGTPass');
    var RgAndFGTPassATag = RgAndFGTPass[0].getElementsByTagName('a');
    var RegisterTag = RgAndFGTPassATag[0];
    var ForgetPassword = RgAndFGTPassATag[1];
    RegisterTag.onclick = function () {
        RegisterShow('block');
    };
    ForgetPassword.onclick = function () {
        alert(34);
    }
}

function RegisterShow(avaliable) {
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
    SimpleDialog.innerHTML = 'Sign Up<br/> <hr/>';
    SimpleDialog.style.color = '#23527C';
    SimpleDialog.style.fontSize = '2em';
    SimpleDialog.style.textAlign = 'center';
    SimpleDialog.setAttribute('class', 'SimpleDialog');
    document.body.appendChild(SimpleDialog);

    var Email = document.createElement('div');
    Email.style.position = 'absolute';
    //Email.style.widths = '400px';
    Email.style.height = '34px';
    Email.style.lineHeight = '100px';
    Email.style.display = 'flex';
    Email.style.background = '#e0e0e0';
    Email.style.fontSize = '.7em';
    Email.style.borderRadius = '3px';
    Email.style.margin = '10px 0 0 70px';
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
    EmailInput.style.borderLeft = 'none';
    EmailInput.style.borderRadius = '3px';
    EmailInput.style.padding = '0 0 0 10px';
    EmailInput.style.fontFamily = 'Arial,sans-serif';
    EmailInput.style.fontSize = '.85em';
    EmailInput.setAttribute('class', 'EmailInput');
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
    Password.style.margin = '80px 0 0 70px';
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
    PasswordInput.style.borderLeft = 'none';
    PasswordInput.style.borderRadius = '3px';
    PasswordInput.style.padding = '0 0 0 10px';
    PasswordInput.style.fontSize = '.85em';
    PasswordInput.setAttribute('type', 'password');
    PasswordInput.setAttribute('class', 'PasswordInput');
    Password.appendChild(PasswordInput);


    var Nickname = document.createElement('div');
    Nickname.style.position = 'absolute';
    Nickname.style.height = '34px';
    Nickname.style.lineHeight = '100px';
    Nickname.style.display = 'flex';
    Nickname.style.background = '#e0e0e0';
    Nickname.style.fontSize = '.7em';
    Nickname.style.margin = '148px 0 0 70px';
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
    NicknameInput.style.borderLeft = 'none';
    NicknameInput.style.borderRadius = '3px';
    NicknameInput.style.padding = '0 0 0 10px';
    NicknameInput.style.fontSize = '.85em';
    NicknameInput.setAttribute('class', 'NicknameInput');
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
    SignUpBtn.innerHTML = 'Sign Up';
    SignUpBtn.style.marginTop = '220px';
    SignUpBtn.style.marginLeft = '155px';
    SignUpBtn.setAttribute('class', 'SignUpBtn');
    SimpleDialog.appendChild(SignUpBtn);

    SignUpBtn.onclick = function () {
        Register();
    }
}