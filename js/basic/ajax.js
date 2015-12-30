/**
 * Created by zero on 2015/12/22.
 */
var urlhead = 'http://112.124.28.10:8001/api/v2/';

function AjaxSignIn(url, type, email, password, LoadHref) {
    $(document).ready(function () {
        $.ajax({
            type: type,
            url: urlhead + url,
            timeout: 4000,
            data: {email: email, password: password},
            dataType: 'json',
            success: function (data) {
                console.log('------------------200 Call SignIn API Success!-------------------');
                var background = '#71C671';
                if (data.result_code.toString() == '1') {
                    //此处添加cookies
                    $.cookie('token', data.token.toString(), {path: '/'});
                    $.cookie('email', data.customized_field.email.toString(), {path: '/'});
                    $.cookie('nickname', data.customized_field.nick_name.toString(), {path: '/'});
                    secure: true;
                    /* if (document.cookie.length > 0) {
                     $.cookie.raw = true;
                     $.removeCookie('token');
                     $.removeCookie('email');

                     $.cookie('token', data.token.toString(), {path: '/'});
                     $.cookie('email', email, {path: '/'});
                     secure: true;
                     } else {
                     $.cookie.raw = true;
                     $.cookie('token', data.token.toString());
                     $.cookie('email', email);
                     secure: true;
                     }*/
                    /*if (document.cookie.length > 0) {
                     //此处是已经存在cookie了
                     document.cookie = "token=" + "; expires=" + (new Date(0)).toUTCString() - 1000;
                     document.cookie = "email=" + "; expires=" + (new Date(0)).toUTCString() - 1000;
                     document.cookie = "token=" + data.token.toString();
                     document.cookie = "email=" + email;
                     } else {
                     document.cookie = "token=" + data.token.toString();
                     document.cookie = "email=" + email;
                     }*/

                    setTimeout(function () {
                        window.location.href = LoadHref;
                    }, 3500);
                    ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                } else {
                    var background = '#DC143C';
                    ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                }
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

var ProfileFlagForPass = "";
function AjaxSetPassword(url, type, newpassword, AuthToken) {
    $(document).ready(function () {
        $.ajax({
            type: type,
            url: urlhead + url,
            timeout: 4000,
            data: {new_password: newpassword},
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
            },
            dataType: 'json',
            async: false,
            success: function (data) {
                var background = '#DC143C';
                if (data.result_code.toString() == '1') {
                    background = '#71C671';
                    //ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                    //    成功之后  消失遮罩层和对话框，直接打开登录界面。
                    //Close();
                    ProfileFlagForPass = data.result_code.toString();

                    console.info("SetPassword--->" + ProfileFlagForPass);
                } else {
                    //ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                    ProfileFlagForPass = data.result_code.toString();
                    console.log("What the Fuck---->" + ProfileFlagForPass);
                }
                /* SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                 setTimeout(function () {
                 RemoveDialog('ShowMsgDialog');
                 }, 3000);*/
                console.log('------------------Call SignIn API Success------------------');
            },
            error: function () {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {
                    Close();
                };
                console.log('------------------Call SignIn API Error------------------');
            }
        });
    });
    return ProfileFlagForPass;
    /*$(document).ready(function () {
     $.ajax({
     crossDomain: true,
     url: urlhead + url,
     type: 'POST',
     data: {new_password: newpassword},
     dataType: 'json',
     /!* headers: {
     "Authorization": "Bearer " + AuthToken,
     "Content-Type": "application/json",
     "Access-Control-Allow-Origin": "*"
     },*!/
     beforeSend: function (xhr) {
     xhr.setRequestHeader('Content-Type', 'application/json');
     xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
     xhr.setRequestHeader('Access-Control-Allow-Origin', 'localhost:63342');
     },
     success: function (data) {
     alert('success');
     },
     error: function () {
     alert('error');
     }
     })
     })*/
}
var ProfileFlagForInfos = "";
function AjaxPutUserInfos(url, type, nickname, email, AuthToken) {
    $(document).ready(function () {
        $.ajax({
            type: type,
            url: urlhead + url,
            timeout: 4000,
            data: {nick_name: nickname, email: email},
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
            },
            dataType: 'json',
            async: false,
            success: function (data) {
                var background = '#DC143C';
                if (data.result_code.toString() == '1') {
                    background = '#71C671';
                    //ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                    //    成功之后  消失遮罩层和对话框，直接打开登录界面。
                    //Close();
                    ProfileFlagForInfos = data.result_code.toString();
                    console.info("Info--->" + ProfileFlagForInfos);
                } else {
                    ProfileFlagForInfos = data.result_code.toString();
                    console.log('------------------------------------------------')
                    //ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', data.messages.toString(), background);
                }

                /*  SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                 setTimeout(function () {
                 RemoveDialog('ShowMsgDialog');
                 }, 3000);*/
                console.log('------------------Call SignIn API Success------------------');
            },
            error: function () {
                SimpleDialog("Error !", "Call API Error", 'OK', 'block');
                var DialogBtn = document.getElementsByClassName('DialogBtn');
                DialogBtn[0].onclick = function () {
                    Close();
                };
                console.log('------------------Call SignIn API Error------------------');
            }
        });
    });
    return ProfileFlagForInfos;
}

function AjaxGetUsersInfos(url, type, AuthToken) {
    $(document).ready(function () {
        $.ajax({
            url: urlhead + url,
            type: type,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + AuthToken);
            },
            dataType: 'json',
            success: function (data) {
                console.log(data.brief_user_info.email + ',' + data.brief_user_info.nick_name);
                console.log('------------------Call SignIn API Success------------------');
                var NickName = document.getElementsByClassName('LockContentText')[0].getElementsByTagName('h3')[0];
                NickName.innerHTML = data.brief_user_info.nick_name;

                var NotNickName = document.getElementsByClassName('LockContentText')[0].getElementsByTagName('a')[0];
                NotNickName.innerHTML = "Not " + data.brief_user_info.nick_name + " ?";
            },
            error: function () {
                console.log('------------------Call SignIn API Error------------------');
            }
        })
    })
}


function AjaxGetTopNavHtml(url, type) {
    $(document).ready(function () {
        $.ajax({
            url: url,
            type: type,
            dataType: 'html',
            success: function (data) {
                document.getElementsByClassName('GetTopNavContent')[0].innerHTML = data;
                TopNavOperation();
            },
            error: function () {
                alert('error');
            }
        });
    });
}


function AjaxGetAllKPI(url, type, page, size) {

}