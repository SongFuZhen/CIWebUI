/**
 * Created by zero on 2015/12/25.
 */

window.onload = function () {
    var LockScreen = document.getElementsByClassName('lockscreen')[0];
    LockScreen.style.width = ClientWidth + 'px';
    LockScreen.style.height = ClientHeight + 'px';

    var ShowLockMsg = document.getElementsByClassName('ShowLockMsg')[0];
    ShowLockMsg.style.left = (ClientWidth - 450) / 2 + 'px';
    ShowLockMsg.style.top = (ClientHeight - 300) / 2 + 'px';

    /* var token = document.cookie.split(";")[0].split("=")[1];
     var email = document.cookie.split(";")[1].split("=")[1];*/
    var token = $.cookie('token');
    var email = $.cookie('email');
    var nickname = $.cookie('nickname');

    var Email = document.getElementsByClassName('LockContentText')[0].getElementsByTagName('h4')[0];
    Email.innerHTML = email;

    var url = 'users/infos';
    AjaxGetUsersInfos(url, 'GET', token);

    var Icons = document.getElementsByClassName('InputPassword')[0].getElementsByTagName("i")[0];
    Icons.onclick = function () {
        var Password = document.getElementsByClassName('InputPassword')[0].getElementsByTagName('input')[0];
        console.log(Password.value);
        var PasswordValue = Password.value.toString();
        var url = 'user_sessions';
        AjaxSignIn(url, 'POST', email, PasswordValue, 'MyKPI.html');
    }
};