/**
 * Created by zero on 2015/12/24.
 */

window.onload = function () {
    /*
     var Li = document.getElementsByClassName('topNav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
     Li[0].onclick = function () {
     //GetMyKPIPage('MyKPI/MyKPI.html');
     //window.location.href = 'MyKPI/MyKPI.html';
     };

     Li[1].onclick = function () {
     };

     Li[2].onclick = function () {
     //GetMyKPIPage('MyTasks/MyTasks.html');
     //window.location.href = 'MyTasks/MyTasks.html';
     };*/

    /* var NavTaskShow = document.getElementsByClassName('NavTaskShow')[0];
     ShowTopNavMask(NavTaskShow, '.NavTaskShow');
     */

    AjaxGetTopNavHtml('NavDemo.html', 'GET');
};


function TopNavOperation() {
    //旋转图片
    var img = document.getElementsByClassName('topleftNav')[0].getElementsByTagName('img')[0];
    img.onmousemove = function () {
        img.style.transform = 'rotate(90deg)';
    };
    img.onmouseout = function () {
        img.style.transform = 'rotate(360deg)';
    };

//Show top nav mask
    var Nickname = document.getElementsByClassName('nickname')[0].getElementsByTagName('h4')[0];
//var Email = document.cookie.split(";")[1].split("=")[1];

//get cookie email
    var Nick_Name = $.cookie('nickname');
    Nickname.innerHTML = Nick_Name;

    var Icons = document.getElementsByClassName('icons')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');

    Nickname.onclick = function (event) {
        ClickTopNavIcon(event, '.shownickname');
    };

    Icons[0].onclick = function (event) {
        ClickTopNavIcon(event, '.NavTaskShow');
    };

    Icons[1].onclick = function (event) {
        ClickTopNavIcon(event, '.NavSystemShow');
    };

    Icons[2].onclick = function (event) {
        ClickTopNavIcon(event, '.NavAbnormalShow');
    };

    /*Click Profile*/
    var Profile = document.getElementsByClassName('nicknamecontent')[0].getElementsByTagName('ul')[0]
        .getElementsByTagName('li')[1];

    Profile.onclick = function () {
        Email_Pass_Name('Change Profile', 'example@cz-tek.com', 'New Password', 'Nacy', 'Change', 'block', 'ChangeProfile');
        var ChangeProfile = document.getElementsByClassName('ChangeProfile')[0];

        ChangeProfile.onclick = function () {
            //    Here Call set password  set info .
            var NewEmail = document.getElementsByClassName('EmailInput')[0].value;
            var NewPassword = document.getElementsByClassName('PasswordInput')[0].value;
            var NewNickname = document.getElementsByClassName('NicknameInput')[0].value;
            console.log(NewEmail + ',' + NewPassword + ',' + NewNickname);

            var Token = document.cookie.split(';')[0].split('=')[1];
            var urlsetpass = 'users/set_password';
            var urlinfos = 'users/infos';
            var background = '#DC143C';
            //background = '#DC143C';//红色

            //获取到返回值
            /**
             * 简单的修改密码：不跳转到登录界面。
             * 修改邮箱和昵称：跳转到登录界面
             */
            if (!NewPassword == "") {
                var ProfileFlagForPass = AjaxSetPassword(urlsetpass, 'POST', NewPassword, Token);
                console.log("Nav.js--------ProfileFlagForPass----->" + ProfileFlagForPass);
                if (ProfileFlagForPass == '1') {
                    background = '#71C671';
                    if (!NewEmail == "" || !NewNickname == "") {
                        var ProfileFlagForInfos = AjaxPutUserInfos(urlinfos, 'PUT', NewNickname, NewEmail, Token);
                        console.log("ProfileFlagForInfos----->" + ProfileFlagForInfos);

                        if (ProfileFlagForInfos == '1') {
                            ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', 'Change Profile Successfully.', background);
                            SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                            setTimeout(function () {
                                RemoveDialog('ShowMsgDialog');
                            }, 3000);
                            setTimeout(function () {
                                Close();
                                window.location.href = '../../index.html'
                            }, 3000);
                        } else {
                            ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', 'Email or Nickname Null.', background);
                            setTimeout(function () {
                                RemoveDialog('ShowMsgDialog');
                            }, 3000);
                        }
                    } else {
                        ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', 'Change Password Successfully.', background);
                        SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                        setTimeout(function () {
                            RemoveDialog('ShowMsgDialog');
                        }, 3000);
                        Close();
                    }
                } else {
                    ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', 'Password Short than 4 bytes.', background);
                    SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                    setTimeout(function () {
                        RemoveDialog('ShowMsgDialog');
                    }, 3000);
                }
            } else {
                if (!NewEmail == "" || !NewNickname == "") {
                    var ProfileFlagForInfos = AjaxPutUserInfos(urlinfos, 'PUT', NewNickname, NewEmail, Token);
                    console.log("ProfileFlagForInfos----->" + ProfileFlagForInfos);

                    if (ProfileFlagForInfos == '1') {
                        background = '#71C671';
                        ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', 'Change Profile Successfully.', background);
                        SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                        setTimeout(function () {
                            RemoveDialog('ShowMsgDialog');
                        }, 3000);
                        setTimeout(function () {
                            Close();
                            window.location.href = '../../index.html'
                        }, 3000);
                    } else {
                        ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', 'Check Email And Nickname.', background);
                        SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                        setTimeout(function () {
                            RemoveDialog('ShowMsgDialog');
                        }, 3000);
                    }
                }
            }
        };
    };
}

function ClickTopNavIcon(event, MaskName) {
    var e = window.event || event;
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
    $(MaskName).slideDown(500);
    ShowTopNavMask(MaskName);
};

function ShowTopNavMask(MaskName) {
    $(MaskName).click(function (event) {
        var e = window.event || event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    });
    document.onclick = function () {
        $(MaskName).slideUp(500);
        console.log(MaskName);
    };
};