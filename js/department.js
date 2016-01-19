/**
 * Created by zero on 2015/12/31.
 */

window.onload = function () {
    AjaxGetTopNavHtml('NavDemo.html', 'GET');

    $('#InviteUsers').tagEditor();
    var DepartmentLeftNav = document.getElementsByClassName('DepartmentLeftNav')[0];
    DepartmentLeftNav.style.height = (ClientHeight - 60) + 'px';

    //Get Left Nav  :Name Description
    var DepartmentName = document.getElementsByClassName('DepartmentName')[0].getElementsByTagName('input')[0];
    var DepartmentDescription = document.getElementsByClassName('DepartmentDescription')[0].getElementsByTagName('textarea')[0];

    /*Get Member Members*/
    var getmembers = 'departments/members';
    var GetDepartmentID = DepartmentName.getAttribute('title');

    /*Get JSON*/
    var departmentsurl = 'users/departments';
    var AutoToken = $.cookie('token');

    /*Here Get RootJSON*/
    var RootJSON = AjaxGetRootDepartment(departmentsurl, 'GET', AutoToken);

    /*Here is the First Load*/
    DepartmentName.setAttribute('title', RootJSON[0].department.id);
    DepartmentName.setAttribute('value', RootJSON[0].department.name);
    DepartmentDescription.innerHTML = RootJSON[0].department.description;

    /*Default Show*/
    var GetRootMembers = AjaxGetAllMembers(getmembers, 'GET', RootJSON[0].department.id, AutoToken);
    for (var i = 0; i < GetRootMembers.length; i++) {
        if (GetRootMembers[i].is_manager) {
            $('<li class="Leaders" id="' + GetMembers[i].user.id + '" title="' + GetMembers[i].user.email + '">' +
                '' + GetMembers[i].user.nick_name + '<i class="glyphicon glyphicon-remove" style="display: none;"></i></li>').appendTo('.DepartmentHeads>ul').ready(function () {
            });
        }
    }

    //Click the Tree
    $('.tree li.parent_li> span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');

        /*Here can get childclass number*/
        var Child = $(this).parent().html().split('</span>')[0];
        var ChildID = Child.split('"')[1];
        var ChildName = Child.split('>')[3];
        var ChildDescription = Child.split('"')[3];

        /*Here can set LeftNav Message : ID　Name Description*/
        DepartmentName.setAttribute('title', ChildID);
        DepartmentName.setAttribute('value', ChildName);
        DepartmentDescription.innerHTML = ChildDescription;

        /*删除列表中的所有li*/
        $('.DepartmentHeads ul li').remove();
        /*Show Leader*/
        var GetMembers = AjaxGetAllMembers(getmembers, 'GET', ChildID, AutoToken);
        for (var i = 0; i < GetMembers.length; i++) {
            if (GetMembers[i].is_manager) {
                $('<li class="Leaders" id="' + GetMembers[i].user.id + '" title="' + GetMembers[i].user.email + '">' +
                    '' + GetMembers[i].user.nick_name + '<i class="glyphicon glyphicon-remove" style="display: none;"></i></li>').appendTo('.DepartmentHeads>ul').ready(function () {
                });
            }
        }

        /*Remove Leaders*/
        var DepartmentHeads = document.getElementsByClassName('DepartmentHeads')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
        $('.DepartmentHeads ul>li').each(function (index) {
            var RemoveLeadersIcon = DepartmentHeads[index].getElementsByTagName('i')[0];
            $(this).mouseover(function () {
                RemoveLeadersIcon.style.display = 'block';
                RemoveLeadersIcon.onclick = function () {
                    ShowConfirmDialog((ClientHeight - 260) / 2, (ClientWidth - 400) / 2, (ClientHeight - 260) / 2, (ClientWidth - 400) / 2, 'block', 'Delete', 'Are you Sure?<br/><br/>Delete the Leader from Department', 'Cancel', 'Delete', '#f2f2f2');
                    var CancelBtn = document.getElementsByClassName('Cancel')[0];
                    var DeleteBtn = document.getElementsByClassName('Confirm')[0];
                    CancelBtn.onclick = function () {
                        RemoveDialog('Masked');
                        RemoveDialog('ShowConfirmDialog');
                    };
                    DeleteBtn.onclick = function () {
                        var url = 'departments/remove_manager';
                        var DepartmentID = DepartmentName.getAttribute('title');
                        var UsersID = DepartmentHeads[index].getAttribute('id');
                        var Token = $.cookie('token');
                        AjaxRemoveManager(url, 'POST', DepartmentID, UsersID, Token);
                        RemoveDialog('Masked');
                        RemoveDialog('ShowConfirmDialog');

                        /*Remove li in DepartmentHeads*/
                        DepartmentHeads[index].remove();

                    };
                }
            });

            $(this).mouseout(function () {
                RemoveLeadersIcon.style.display = 'none';
            });
        });

        if (children.is(":visible")) {
            children.hide('fast');
            $(this).find(' > i').addClass('glyphicon-plus-sign').removeClass('glyphicon-minus-sign');
        } else {
            children.show('fast');

            $(this).find(' > i').addClass('glyphicon-minus-sign').removeClass('glyphicon-plus-sign');

            /*显示Add Department和Users*/
            var CloseAddTwo = document.getElementsByClassName('AddTwo');
            for (var i = 0; i < CloseAddTwo.length; i++) {
                //清除所有的AddTwo
                CloseAddTwo[i].parentNode.removeChild(CloseAddTwo[i]);
            }

            /* AddDepartment    See Users*/
            AddTwo($(this).parent('li.parent_li').find('>ul>li').prevObject[0]);

            var AddDepartmentOperate = document.getElementsByClassName('AddDepartment');
            if (AddDepartmentOperate.length > 0) {
                /*Cancle Add Department*/
                AddDepartmentOperate[0].onclick = function () {
                    DepartmentDialog(document.getElementsByClassName('AddTwo')[0]);
                    var AddDepartmentDialog = document.getElementsByClassName('AddDepartmentDialog')[0];
                    var CancelBtn = AddDepartmentDialog.getElementsByTagName('button')[0];
                    CancelBtn.onclick = function () {
                        RemoveDialog('AddDepartmentDialog');
                    };
                    /*Confirm Add Department*/
                    var AddBtn = AddDepartmentDialog.getElementsByTagName('button')[1];
                    AddBtn.onclick = function () {
                        var GetDepartmentName = AddDepartmentDialog.getElementsByTagName('input')[0].value;
                        var GetDepartmentDescription = AddDepartmentDialog.getElementsByTagName('textarea')[0].value;
                        var url = 'departments';
                        var Token = $.cookie('token');
                        AjaxAddDepartment(url, 'POST', GetDepartmentName, GetDepartmentDescription, ChildID, Token);
                    };
                }
            }

            var SeeUsersOperate = document.getElementsByClassName('SeeUsers');
            if (SeeUsersOperate.length > 0) {
                //var ShowMembers = document.getElementsByClassName('DepartmentMembers')[0];
                SeeUsersOperate[0].onclick = function (event) {
                    /*Show DepartmentMembers*/
                    //ClickTopNavIcon(event, '.DepartmentMembers');
                    $('.DepartmentMembers').show(400);

                    /*删除列表中的所有li*/
                    $('.MembersList ul li').remove();

                    /*Show Members*/
                    var url = 'departments/members';
                    var GetMembers = AjaxGetAllMembers(url, 'GET', ChildID, AutoToken);
                    /*Deal Members Data*/
                    for (var i = 0; i < GetMembers.length; i++) {
                        var GetUsers = GetMembers[i].user;
                        $('<li class="members" title="' + GetUsers.email + '" id="' + GetUsers.id + '">' + GetUsers.nick_name + '<i class="glyphicon glyphicon-remove"></i> </li>').appendTo($('.MembersList> ul')).ready(function () {
                        });
                    }

                    /*Delete Members Button*/
                    var MembersShow = document.getElementsByClassName('MembersList')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
                    $('.MembersList ul>li').each(function (index) {
                        var RemoveUsersIcon = MembersShow[index].getElementsByTagName('i')[0];
                        $(this).mouseover(function () {
                            RemoveUsersIcon.style.display = 'block';
                            RemoveUsersIcon.onclick = function () {
                                ShowConfirmDialog((ClientHeight - 260) / 2, (ClientWidth - 400) / 2, (ClientHeight - 260) / 2, (ClientWidth - 400) / 2, 'block', 'Delete', 'Are you Sure?<br/><br/>Delete the Users from Department', 'Cancel', 'Delete', '#f2f2f2');
                                var CancelBtn = document.getElementsByClassName('Cancel')[0];
                                var DeleteBtn = document.getElementsByClassName('Confirm')[0];
                                CancelBtn.onclick = function () {
                                    RemoveDialog('Masked');
                                    RemoveDialog('ShowConfirmDialog');
                                };
                                DeleteBtn.onclick = function () {
                                    var url = 'departments/remove_user';
                                    var DepartmentID = ChildID;
                                    var UsersID = MembersShow[index].getAttribute('id');
                                    AjaxRemoveUsers(url, 'POST', ChildID, UsersID, AutoToken);
                                    RemoveDialog('Masked');
                                    RemoveDialog('ShowConfirmDialog');
                                };
                            }
                        });

                        $(this).mouseout(function () {
                            RemoveUsersIcon.style.display = 'none';
                        });
                    });

                    /*Close Add Users*/
                    var AddMembersClose = document.getElementsByClassName('AddMembers')[0].getElementsByTagName('i')[0];
                    AddMembersClose.onclick = function () {
                        $('.DepartmentMembers').hide(400);
                    };

                    /*Add Members*/
                    var AddMembers = document.getElementsByClassName('AddUsers')[0];
                    AddMembers.onclick = function (event) {
                        /*Department ID :ChildID    Department Name ChildName  Department Description  ChildDescription */

                        var MembersShow = document.getElementsByClassName('MembersShow')[0];
                        MembersShow.style.width = (ClientWidth - 400) + 'px';
                        MembersShow.style.height = (ClientHeight - 60) + 'px';

                        MembersShow.getElementsByTagName('h2')[0].innerHTML = '<span title="' + ChildID + '">' + ChildName + '</span>';
                        MembersShow.getElementsByTagName('em')[0].innerHTML = '<h4>Description:' + ChildDescription + '</h4>';
                        //ClickTopNavIcon(event, '.MembersShow');
                        $('.MembersShow').fadeIn(400);

                        var MembersShowIcon = MembersShow.getElementsByTagName('i')[0];
                        MembersShowIcon.onclick = function () {
                            $('.MembersShow').fadeOut(400);
                        };

                        var InviteBtn = document.getElementsByClassName('InviteBtn')[0];
                        InviteBtn.onclick = function () {
                            TimeDisabled(this);
                            var Signed = document.getElementsByClassName('Signed')[0];
                            Signed.style.width = (ClientWidth - 400) + 'px';
                            var GetEmails = $('#InviteUsers').tagEditor('getTags')[0].tags;

                            /*Add Users*/
                            var Token = $.cookie('token');
                            var addusersurl = 'departments/add_users';
                            var AddUsersFlag = AjaxAddUsers(addusersurl, 'POST', ChildID, GetEmails, Token);
                            if (AddUsersFlag == '1') {
                                /*Is SignUp*/
                                var signupurl = 'users/signuped';
                                for (var i = 0; i < GetEmails.length; i++) {
                                    var SignedUserInfo = AjaxUserSingUp(signupurl, 'POST', GetEmails[i], Token);
                                    console.log(GetEmails[i] + '============' + SignedUserInfo.user);
                                    if (SignedUserInfo.user != null) {
                                        $('<div class="CheckEmail col-sm-4"><div class="Email" title="' + SignedUserInfo.user.id + '">' + SignedUserInfo.user.email + '</div>' +
                                            '<div class="Nickname">' + SignedUserInfo.user.nick_name +
                                            '</div><div class="IsSigned">Registered</div></div>'
                                        ).appendTo('.Signed').ready(function () {
                                            });

                                        $('<li class="members" title="' + SignedUserInfo.user.email + '" id="' + SignedUserInfo.user.id + '">' + SignedUserInfo.user.nick_name + '</li>').appendTo($('.MembersList> ul')).ready(function () {
                                        });
                                    } else {
                                        $('<div class="CheckEmail col-sm-4"><div class="Email">' + GetEmails[i] + '</div>' +
                                            '<div class="Nickname"></div><div class="IsSigned" style="color:red">Will Invite</div></div>'
                                        ).appendTo('.Signed').ready(function () {
                                            });
                                    }
                                }
                            }
                        };
                    };

                };
            }
        }
        e.stopPropagation();

    });

    /*Name Pencil*/
    var ChangeDepartmentName = document.getElementsByClassName('DepartmentName')[0].getElementsByTagName('i')[0];
    ChangeDepartmentName.onclick = function () {
        if (DepartmentName.getAttribute('time') == '1') {
            DepartmentName.removeAttribute('readonly');
            DepartmentName.style.background = 'white';
            DepartmentName.setAttribute('time', '2');
        } else {
            DepartmentName.setAttribute('readonly', 'readonly');
            DepartmentName.style.background = '#f2f2f2';
            DepartmentName.setAttribute('time', '1');
        }
    };

    /*Description Pencil*/
    var ChangeDepartmentDescription = document.getElementsByClassName('DepartmentDescription')[0].getElementsByTagName('i')[0];
    ChangeDepartmentDescription.onclick = function () {
        if (DepartmentDescription.getAttribute('time') == '1') {
            DepartmentDescription.removeAttribute('readonly');
            DepartmentDescription.style.background = 'white';
            DepartmentDescription.setAttribute('time', '2');
        } else {
            DepartmentDescription.setAttribute('readonly', 'readonly');
            DepartmentDescription.style.background = '#f2f2f2';
            DepartmentDescription.setAttribute('time', '1');
        }
    };

    /* LeftNav Button [0] is Change Button [1] is Delete Button*/
    /*Change Department*/
    var DepartmentInfoBtn = document.getElementsByClassName('BasicInfo')[0].getElementsByTagName('button');
    DepartmentInfoBtn[0].onclick = function () {
        //Here is the Change Department
        /*Here can get Changed Message:  ID  Name  Description*/
        var AfterChangedDepartmentID = DepartmentName.getAttribute('title');
        var AfterChangedDepartmentName = DepartmentName.value;
        var AfterChangedDepartmentDescription = DepartmentDescription.value;

        var Msg = 'Are you Sure?<br/>Change the Department Name Or Description.';
        ShowConfirmDialog(0, 0, 0, 0, 'block', 'Confirm Changed?', Msg, 'Cancle', 'Changed', 'white');

        var ShowDialogBtn = document.getElementsByClassName('ShowConfirmDialog')[0].getElementsByTagName('button');
        //Cancle Btn
        ShowDialogBtn[0].onclick = function () {
            RemoveDialog('Masked');
            RemoveDialog('ShowConfirmDialog');
        };
        //Confirm Btn
        ShowDialogBtn[1].onclick = function () {
            //Here Changed Department
            var url = 'departments';
            var AutoToken = $.cookie('token');
            AjaxChangeDepartment(url, 'PUT', AfterChangedDepartmentName, AfterChangedDepartmentDescription, AfterChangedDepartmentID, AutoToken);
        };
    };

    /*Delete Department*/
    DepartmentInfoBtn[1].onclick = function () {
        console.log("Click the Delete Btn");
        var DepartmentID = DepartmentName.getAttribute('title');
        var url = 'departments';
        var Token = $.cookie('token');

        var Msg = 'Are you Sure?<br/>If you Delete,you will miss this Department.';
        ShowConfirmDialog(0, 0, 0, 0, 'block', 'Confirm Delete?', Msg, 'Cancle', 'Delete', 'white');

        var DialogBtn = document.getElementsByClassName('ShowConfirmDialog')[0].getElementsByTagName('button');
        //Cancle Btn
        DialogBtn[0].onclick = function () {
            RemoveDialog('Masked');
            RemoveDialog('ShowConfirmDialog');
        };
        //Confirm Btn
        DialogBtn[1].onclick = function () {
            //Here is delete Department
            console.log(DepartmentID + '--------------');
            //Call Ajax to Delete Department.
            AjaxDeleteDepartment(url, 'DELETE', DepartmentID, Token);
        };
    };

    /*Add Leader*/
    var AddLeaders = document.getElementsByClassName('Leader')[0];
    AddLeaders.onclick = function () {
        var LeadersShowDom = document.getElementsByClassName('LeadersShow')[0];
        LeadersShowDom.style.height = (ClientHeight - 60) + 'px';
        $('.LeadersShow').fadeIn(400);

        /*Show Users List*/

        /*删除列表中的所有li*/
        $('.LeadersShow ul li').remove();

        var ID = DepartmentName.getAttribute('title');
        var GetMembers = AjaxGetAllMembers(getmembers, 'GET', ID, AutoToken);
        /*Deal Members Data*/
        for (var i = 0; i < GetMembers.length; i++) {
            console.log('GetMembers' + GetMembers[i].is_manager)
            var GetUsers = GetMembers[i].user;
            $('<li class="members" title="' + GetUsers.email + '" id="' + GetUsers.id + '">' + GetUsers.nick_name + '</li>').appendTo($('.LeadersShow> ul')).ready(function () {
            });
        }

        var LeadersClose = LeadersShowDom.getElementsByTagName('i')[0];
        LeadersClose.onclick = function () {
            $('.LeadersShow').fadeOut(400);
        };

        /*Judge click which li*/
        $('.LeadersShow ul>li').each(function (index) {
            $(this).click(function () {
                var Li = document.getElementsByClassName('members');
                var ID = Li[index].getAttribute('id');
                var Email = Li[index].getAttribute('title');
                var Nickname = Li[index].innerHTML;

                /*Call Ajax*/
                var setmanagerurl = 'departments/set_manager';
                var DepartmentID = DepartmentName.getAttribute('title');
                var Token = $.cookie('token');
                var SetManagerFlag = AjaxSetManager(setmanagerurl, 'POST', DepartmentID, ID, Token);
                if (SetManagerFlag == '1') {
                    /*Add Leader*/
                    $('<li id="' + ID + '" title="' + Email + '">' + Nickname + '<i class="glyphicon glyphicon-remove" style="display: none;"></i></li>').appendTo('.DepartmentHeads>ul').ready(function () {
                    });
                    /*remove this li*/
                    $(this).remove();
                }
            });
        });

    };

//    show department members
    var DepartmentMembers = document.getElementsByClassName('DepartmentMembers')[0];
    DepartmentMembers.style.height = (ClientHeight - 60) + 'px';
    DepartmentMembers.style.left = (ClientWidth - 400) + 'px';
};

function AddTwo(label) {
    var AddTwo = document.createElement('div');
    AddTwo.style.position = 'absolute';
    AddTwo.style.display = 'block';
    AddTwo.style.left = '20px';
    //AddTwo.style.margin = '0 0 0 100px';
    AddTwo.style.top = '74px';
    AddTwo.style.width = '200px';
    AddTwo.style.height = '30px';
    //AddTwo.style.background = '#F2F2F2';
    AddTwo.style.borderRadius = '3px';
    AddTwo.style.zIndex = '500';
    AddTwo.setAttribute('class', 'AddTwo');
    label.appendChild(AddTwo);


    var AddDepartment = document.createElement('div');
    AddDepartment.style.position = 'absolute';
    AddDepartment.style.display = 'block';
    AddDepartment.style.width = '100px';
    AddDepartment.style.left = '10px';
    AddDepartment.innerHTML = '<i class="glyphicon glyphicon-plus-sign"></i> <em>Department</em>';
    AddDepartment.style.color = '#23527C';
    AddDepartment.setAttribute('class', 'AddDepartment');
    AddDepartment.style.background = 'beige';
    AddDepartment.style.borderRadius = '3px';
    AddDepartment.style.cursor = 'pointer';
    AddDepartment.style.padding = '3px';
    AddTwo.appendChild(AddDepartment);

    var AddUsers = document.createElement('div');
    AddUsers.style.position = 'absolute';
    AddUsers.style.display = 'block';
    AddUsers.style.width = '100px';
    AddUsers.style.left = '120px';
    AddUsers.innerHTML = '<i class="glyphicon glyphicon-eye-open"></i> <em>Users</em>';
    AddUsers.style.color = '#23527C';
    AddUsers.setAttribute('class', 'SeeUsers');
    AddUsers.style.background = 'beige';
    AddUsers.style.borderRadius = '3px';
    AddUsers.style.cursor = 'pointer';
    AddUsers.style.padding = '3px 3px 3px 5px ';
    AddTwo.appendChild(AddUsers);
}

function DepartmentDialog(label) {
    var DepartmentDialog = document.createElement('div');
    var Style = DepartmentDialog.style;
    Style.position = 'absolute';
    Style.top = '30px';
    Style.left = '10px';
    Style.borderRadius = '3px';
    Style.zIndex = '1000';
    Style.display = 'block';
    Style.width = '300px';
    Style.height = '220px';
    Style.background = 'beige';
    Style.fontSize = '1.3em';
    Style.textAlign = 'center';
    DepartmentDialog.innerHTML = 'Add Department';
    DepartmentDialog.setAttribute('class', 'AddDepartmentDialog');
    label.appendChild(DepartmentDialog);


    var Input = document.createElement('input');
    var InputStyle = Input.style;
    InputStyle.position = 'absolute';
    InputStyle.top = '30px';
    InputStyle.left = '10px';
    InputStyle.borderRadius = '3px';
    InputStyle.display = 'block';
    InputStyle.height = '25px';
    InputStyle.width = '280px';
    InputStyle.lineHeight = '25px';
    Input.placeholder = 'Department Name';
    DepartmentDialog.appendChild(Input);

    var Description = document.createElement('textarea');
    var DescriptionStyle = Description.style;
    DescriptionStyle.position = 'absolute';
    Description.setAttribute('cols', '33');
    Description.setAttribute('rows', '3');
    DescriptionStyle.top = '60px';
    DescriptionStyle.left = '10px';
    DescriptionStyle.borderRadius = '3px';
    DescriptionStyle.display = 'block';
    DescriptionStyle.lineHeight = '25px';
    DescriptionStyle.resize = 'none';
    Description.placeholder = 'Department Description';
    DescriptionStyle.width = '280px';
    DepartmentDialog.appendChild(Description);


    var Cancel = document.createElement('button');
    var CancelStyle = Cancel.style;
    CancelStyle.position = 'absolute';
    CancelStyle.top = '150px';
    CancelStyle.left = '50px';
    CancelStyle.display = 'block';
    Cancel.innerHTML = 'Cancel';
    Cancel.setAttribute('class', 'BtnSubmit');
    DepartmentDialog.appendChild(Cancel);

    var Confirm = document.createElement('button');
    var ConfirmStyle = Confirm.style;
    ConfirmStyle.position = 'absolute';
    ConfirmStyle.top = '150px';
    ConfirmStyle.left = '180px';
    ConfirmStyle.display = 'block';
    Confirm.setAttribute('class', 'BtnSubmit');
    Confirm.innerHTML = 'Add';
    ConfirmStyle.padding = '-10px 0 0 0';
    DepartmentDialog.appendChild(Confirm);
}