/**
 * Created by zero on 2015/12/22.
 */
function SignIn() {
    var SignInDiv = document.getElementsByClassName('SignIn');
    var Email = SignInDiv[0].getElementsByTagName('input')[0].value.trim();
    var Password = SignInDiv[0].getElementsByTagName('input')[1].value.trim();
    var url = 'user_sessions';
    AjaxSignIn(url, 'POST', Email, Password);
    console.log('Email----------' + '\n' + Email + '\n' + 'Password------------' + '\n' + Password);
}

window.onload = function () {
    //ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'block', 'Invalsagagsa', '');
    var Welcome = document.getElementsByClassName('Welcome')[0];
    Welcome.style.top = (ClientHeight - 400) / 2 + 'px';
    Welcome.style.left = (ClientWidth - 900) / 2 + 'px';
}

function RgAndFGTPass() {
    var RgAndFGTPass = document.getElementsByClassName('RgAndFGTPass');
    var RgAndFGTPassATag = RgAndFGTPass[0].getElementsByTagName('a');
    var Register = RgAndFGTPassATag[0];
    var ForgetPassword = RgAndFGTPassATag[1];
    Register.onclick = function () {
        alert(12);
    }
    ForgetPassword.onclick = function () {
        alert(34);
    }
}