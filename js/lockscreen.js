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
};