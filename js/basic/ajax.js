/**
 * Created by zero on 2015/12/22.
 */
var urlhead = 'http://112.124.28.10:8001/api/v2/';

function AjaxSignIn(url, type, email, password) {
    $(document).ready(function () {
        $.ajax({
            type: type,
            url: urlhead + url,
            timeout: 4000,
            data: {email: email, password: password},
            dataType: 'json',
            success: function (data) {
                console.log('------------------200 Call SignIn API Success!-------------------')
                var background = '#DC143C';
                if (data.result_code.toString() == '1') {
                    document.cookie = data.token.toString();
                    document.cookie = data.token.toString();
                    background = '#71C671';

                    setTimeout(function () {
                        window.location.href = 'Html/MyKPI/MyKPI.html';
                    }, 3500);
                }
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);

                SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                //删除掉MsgDialog
                setTimeout(function () {
                    RemoveDialog('ShowMsgDialog');
                }, 3000);
            },
            error: function () {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {
                    Close();
                };

                console.log('------------------Call SignIn API Error------------------');
            }
        })
    });
}

function AjaxRegister(url, type, email, password, nickname) {
    $(document).ready(function () {
        $.ajax({
            type: type,
            url: urlhead + url,
            timeout: 4000,
            data: {email: email, password: password, nick_name: nickname},
            dataType: 'json',
            success: function (data) {
                console.log('------------------200 Call SignIn API Success!-------------------');

                var background = '#DC143C';
                if (data.result_code.toString() == '1') {
                    background = '#71C671';
                    //成功之后  消失遮罩层和对话框，直接打开登录界面。
                    Close();
                }

                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);

                SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                //删除掉MsgDialog
                setTimeout(function () {
                    RemoveDialog('ShowMsgDialog');
                }, 3000);
            },
            error: function () {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                console.log('------------------Call SignIn API Error------------------');
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {
                    Close();
                };
            }
        })
    });
}

function AjaxResetPassword(url, type, email, msg) {
    $(document).ready(function () {
        $.ajax({
            type: type,
            url: urlhead + url,
            timeout: 4000,
            data: {email: email},
            dataType: 'json',
            success: function (data) {
                console.log('------------------200 Call SignIn API Success!-------------------')
                var background = '#DC143C';
                if (data.result_code.toString() == '1') {
                    background = '#71C671';
                    ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', msg, background);
                    //    成功之后  消失遮罩层和对话框，直接打开登录界面。
                    Close();
                } else {
                    ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString() + '.Check!', background);
                }

                SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                setTimeout(function () {
                    RemoveDialog('ShowMsgDialog');
                }, 3000);

            },
            error: function () {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {
                    Close();
                };
                console.log('------------------Call SignIn API Error------------------');
            }
        })
    });
}

function AjaxGetAllKPI(url, type, page, size) {

}