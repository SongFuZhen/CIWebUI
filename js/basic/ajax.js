/**
 * Created by zero on 2015/12/22.
 */
var urlhead = 'http://192.168.1.12:3000/api/v2/';

function AjaxSignIn(url, type, email, password) {
    $(document).ready(function () {
        //Loading(0, 0, 0, 0, 'block');
        $.ajax({
            //async: true,
            type: type,
            //跨域设置
            //crossDomain: true,
            url: urlhead + url,
            timeout: 4000,
            data: {email: email, password: password},
            dataType: 'json',
            success: function (data) {
                console.log('------------------200 Call SignIn API Success!-------------------')
                //document.getElementById('Loading').parentNode.removeChild(document.getElementById('Loading'));
                //保存在cookie中

                var background = '#DC143C';
                if (data.result_code.toString() == '1') {
                    document.cookie = data.token.toString();
                    document.cookie = data.token.toString();
                    background = '#71C671';

                    setTimeout(function () {
                        window.location.href = 'MyKPI/MyKPI.html';
                    }, 3500);
                }
                console.log(data.messages.toString());
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);

                SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
            },
            error: function (data) {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                console.log('------------------Call SignIn API Error------------------');
            },
            complete: function (XMLHttpRequest, status) {
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {
                    document.getElementsByClassName('Masked')[0].parentNode.removeChild(document.getElementsByClassName('Masked')[0]);
                    document.getElementsByClassName('SimpleDialog')[0].parentNode.removeChild(document.getElementsByClassName('SimpleDialog')[0]);
                };

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
                console.log('------------------200 Call SignIn API Success!-------------------')
                //document.getElementById('Loading').parentNode.removeChild(document.getElementById('Loading'));
                //保存在cookie中

                var background = '#DC143C';
                if (data.result_code.toString() == '1') {
                    document.cookie = data.token.toString();
                    document.cookie = data.token.toString();
                    background = '#71C671';

                    setTimeout(function () {
                        window.location.href = 'MyKPI/MyKPI.html';
                    }, 3500);
                }
                console.log(data.messages.toString());
                ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);

                SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
            },
            error: function (data) {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                console.log('------------------Call SignIn API Error------------------');
            },
            complete: function (XMLHttpRequest, status) {
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {

                    document.getElementsByClassName('Masked')[0].parentNode.removeChild(document.getElementsByClassName('Masked')[0]);
                    document.getElementsByClassName('SimpleDialog')[0].parentNode.removeChild(document.getElementsByClassName('SimpleDialog')[0]);
                };

            }
        })
    });
}