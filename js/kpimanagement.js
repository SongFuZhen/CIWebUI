/**
 * Created by zero on 2015/12/25.
 */

window.onload = function () {
    AjaxGetTopNavHtml('NavDemo.html', 'GET');
    SetPosition();
    InitParams();
    var UOMList = "";
    var CalculateList = "";
    var FrequencyList = "";

    var RightContent = document.getElementsByClassName('RightContent')[0];
    /*When Load Show All KPI*/
    LoadAllKpis();
    LeftNavFun();
    /*Get All List Value*/
    GetListFunc();

    ManageKPI();

    FollowKPI();
};

function FollowKPI() {
    $('.Follow').unbind().on('click', function () {
            var FollowNodes = $(this).parent().parent().children('td');

            /*KPI Name*/
            var FollowKPIID = FollowNodes[0].children[0].getAttribute('id');
            var FollowKPIName = FollowNodes[0].children[0].getAttribute('title');

            /*KPI Description*/
            var FollowKPIDescription = FollowNodes[1].children[0].innerHTML;

            /*KPI TargetMin*/
            var FollowKPITargetMin = FollowNodes[2].children[0].innerHTML;

            /*KPI TargetMax*/
            var FollowKPITargetMax = FollowNodes[3].children[0].innerHTML;

            /*KPI Creator*/
            var FollowKPICreatorEmail = FollowNodes[4].children[0].getAttribute('title');
            var FollowKPICreatorName = FollowNodes[4].children[0].innerHTML;

            /*   console.log(FollowKPIID);
             console.log(FollowKPIName);
             console.log(FollowKPIDescription);
             console.log(FollowKPITargetMin);
             console.log(FollowKPITargetMax);
             console.log(FollowKPICreatorEmail);
             console.log(FollowKPICreatorName);
             */

            RemoveLi();
            var RightContent = document.getElementsByClassName('RightContent')[0];
            var HtmlDate = AjaxGetHtml('FollowKPI.html', 'GET');
            RightContent.innerHTML = HtmlDate;
            $('.follow').css({
                width: (ClientWidth - 220) + 'px',
                marginTop: '10px',
                marginLeft: '20px'
            });

            $('.panel-heading').children('h4').html(FollowKPIName);
            $('.panel-heading').attr('id', FollowKPIID);
            $('.FollowKPIDescription').html(FollowKPIDescription);

            var url = 'kpis/departments';
            var Token = $.cookie('token');
            var FollowKPIDepartmentsData = AjaxFollowKPIDepartments(url, 'GET', FollowKPIID, "", Token);

            var DepartmentFollowStates = FollowKPIDepartmentsData.department_follow_states;

            for (var i = 0; i < DepartmentFollowStates.length; i++) {
                /*var DepartmentFollowStatesFlag = DepartmentFollowStates[i].follow_flag;
                 var DepartmentFollowStatesFlagValue = DepartmentFollowStates[i].follow_flag_value;*/
                var DepartmentFollowStatesFollowed = DepartmentFollowStates[i].followed;

                if (DepartmentFollowStatesFollowed) {
                    $('<tbody><tr style="border-bottom: 1px dashed #ccc;">' +
                        '<td style="margin: 10px 0 0 0;display: block;font-size: 1.2em;">' +
                        '<i class="glyphicon glyphicon-plus-sign PlusIcon" style="color: green;"></i>' +
                        '<strong id="' + DepartmentFollowStates[i].department.id + '" ' +
                        'title="' + DepartmentFollowStates[i].department.members + '">' + DepartmentFollowStates[i].department.name + '</strong></td>' +
                        '<td><button class="BtnSubmit" style="margin: 2px 0 0 0;background: darkred;color: white;border: none;">UnFollow</button></td>' +
                        '</tr></tbody>').appendTo('.DepartmentTable').ready(function () {
                    });
                } else {
                    $('<tbody><tr style="border-bottom: 1px dashed #ccc;">' +
                        '<td style="margin: 10px 0 0 0;display: block;font-size: 1.2em;">' +
                        '<i class="glyphicon glyphicon-plus-sign PlusIcon" style="color: green;"></i>' +
                        '<strong id="' + DepartmentFollowStates[i].department.id + '" ' +
                        'title="' + DepartmentFollowStates[i].department.members + '">' + DepartmentFollowStates[i].department.name + '</strong></td>' +
                        '<td><button class="BtnSubmit" style="margin: 2px 0 0 0">+Follow</button></td>' +
                        '</tr></tbody>').appendTo('.DepartmentTable').ready(function () {
                    });
                }
            }

            $('.PlusIcon').on('click', function () {
                /*请求数据*/
                $(this).removeAttr('class');
                $(this).attr('class', 'glyphicon glyphicon-minus-sign MinuIcon');

                var DepartmentID = $(this).parent().children('strong').attr('id');
                var DepartmentFollowStatesData = AjaxFollowKPIDepartments(url, 'GET', FollowKPIID, DepartmentID, Token);

                var DepartmentFollowStates = DepartmentFollowStatesData.department_follow_states;
                for (var i = 0; i < DepartmentFollowStates.length; i++) {
                    var DepartmentFollowStatesFollowed = DepartmentFollowStates[i].followed;
                    if (DepartmentFollowStatesFollowed) {
                        $('<tr style="border-bottom: 1px dashed #ccc;"><td><i class="glyphicon glyphicon-plus-sign PlusIcon" style="color: green;margin: 10px 0 0 50px;"></i>' +
                            '<strong id="' + DepartmentFollowStates[i].department.id + '">' + DepartmentFollowStates[i].department.name + '</strong></td>' +
                            '<td><button class="BtnSubmit" style="margin: 2px 0 0 0;background: darkred;color: white;border: none;">UnFollow</button></td></tr>').appendTo($(this).parent().parent().parent()).ready(function () {
                        });
                    } else {
                        $('<tr style="border-bottom: 1px dashed #ccc;"><td><i class="glyphicon glyphicon-plus-sign PlusIcon" style="color: green;margin: 10px 0 0 50px;"></i>' +
                            '<strong id="' + DepartmentFollowStates[i].department.id + '">' + DepartmentFollowStates[i].department.name + '</strong></td>' +
                            '<td><button class="BtnSubmit" style="margin: 2px 0 0 0;">+Follow</button></td></tr>').appendTo($(this).parent().parent().parent()).ready(function () {
                        });
                    }
                }
            });

            $('.MinuIcon').unbind().on('click', function () {
                console.log($(this));
            })
        }
    );
}

function ManageKPI() {
    $('.Manage').unbind().on('click', function () {
            RemoveLi();

            var RightContent = document.getElementsByClassName('RightContent')[0];
            var HtmlDate = AjaxGetHtml('ManageKPI.html', 'GET');
            RightContent.innerHTML = HtmlDate;

            $('.manual').css({
                width: (ClientWidth - 220) + 'px',
                marginTop: '10px',
                marginLeft: '20px'
            });

            $('#manualdimensions').tagEditor({
                forceLowercase: false
            });

            $('#manualdimensions + ul').css({
                height: '100px',
                marginLeft: '200px',
                marginRight: '200px',
                marginTop: '30px',
                marginBottom: '-25px'
            });

            /*Resize the window Operate*/
            $(window).resize(function () {
                $('.manual').css({width: (document.documentElement.clientWidth - 220) + 'px'});
            });

            var KPIID = $(this).parent().prevAll('td')[4].getElementsByTagName('h3')[0].getAttribute('id');
            var url = 'kpis';
            var Token = $.cookie('token');
            var KPIDate = AjaxGetKPIDate(url, 'GET', KPIID, Token);

            /*Write Date*/

            $('.panel-heading').children('h4').html(KPIDate.kpi.kpi_name);

            $('.panel-heading').attr('id', KPIDate.kpi.kpi_id);

            /*Basic information*/
            ManualBasicInformationWirte(KPIDate);

            /*Dimensions*/
            var ManualKPIAttributes = KPIDate.kpi.attributes;
            for (var i = 0; i < ManualKPIAttributes.length; i++) {
                $('#manualdimensions').tagEditor3parments('addTag', value, title, id);
            }

            /*Here is the First time to Load Assignments*/
            var ManualKPIAssign = KPIDate.assignments;
            if (ManualKPIAssign.length > 0) {
                for (var i = 0; i < ManualKPIAssign.length; i++) {
                    var AssignmentID = ManualKPIAssign[i].assignment_id;
                    var AutoNotification = ManualKPIAssign[i].auto_notification;

                    var FrequencyDate = ManualKPIAssign[i].frequency;
                    var FrequencyID = FrequencyDate.id;
                    var FrequencyName = FrequencyDate.name;

                    var Time = ManualKPIAssign[i].time;

                    var User = ManualKPIAssign[i].user;
                    /*UserDepartment is null.*/
                    //var UserDepartment = User.departments;
                    var UserEmail = User.email;
                    var UserID = User.id;
                    var UserName = User.nick_name;

                    /*Here is Department*/
                    var AssignDepartment = ManualKPIAssign[i].departmen;
                    var AssignDepartmentID = AssignDepartment.id;
                    var AssignDepartmentName = AssignDepartment.name;
                    var AssignDepartmentDescription = AssignDepartment.description;

                    if (AutoNotification) {
                        var BellBackground = 'lightseagreen';
                        ShowAssignToWhoDiv(AssignmentID, UserID, UserEmail, UserName, Time, FrequencyID, FrequencyName, AssignDepartmentID, AssignDepartmentName, AssignDepartmentDescription, "Auto Notification", BellBackground);
                    } else {
                        var BellBackground = 'darkred';
                        ShowAssignToWhoDiv(AssignmentID, UserID, UserEmail, UserName, Time, FrequencyID, FrequencyName, AssignDepartmentID, AssignDepartmentName, AssignDepartmentDescription, "Not Auto Notification", BellBackground);
                    }
                }
                DeleteAssign();
            } else {
                $('<div style="height: 70px;color:#ccc;text-align: center;"><h1 style="padding-top: 20px;">Click Left Button to Assign.</h1></div>').appendTo('.ShowManualAssign').ready(function () {
                });
            }

            /*Viewable*/
            var ManualKPIViewable = KPIDate.kpi.viewable;
            var ManualKPIViewableCode = ManualKPIViewable.viewable_code;
            var ManualKPIViewType = document.getElementsByName('manualViewType');

            if (ManualKPIViewableCode == 0) {
                ManualKPIViewType[0].setAttribute('checked', true);
            } else if (ManualKPIViewableCode == 1) {
                ManualKPIViewType[1].setAttribute('checked', true);
            } else if (ManualKPIViewableCode == 2) {
                ManualKPIViewType[2].setAttribute('checked', true);
                var ManualKPIPartialViewableGroup = ManualKPIViewable.user_group;
                $('.SMCGroup').attr('id', ManualKPIPartialViewableGroup.id);
                $('.SMCGroup').attr('value', ManualKPIPartialViewableGroup.name);
                $('.SMCGroup').attr('title', ManualKPIPartialViewableGroup.members);
                $('.SMCGroup').html(ManualKPIPartialViewableGroup.name);
                $('.SMCGroup').attr('data-toggle', 'tooltip');
                $('.SMCGroup').attr('data-placement', 'top');
                $('.SMCGroup').attr('data-original-title', ManualKPIPartialViewableGroup.members);
                $('[data-toggle="tooltip"]').tooltip();
                /*Here collapse the All Group.*/
            } else if (ManualKPIViewableCode == 3) {
                ManualKPIViewType[3].setAttribute('checked', true);
                var ManualKPIBlockViewableGroup = ManualKPIViewable.user_group;
                $('.SMNCGroup').attr('id', ManualKPIBlockViewableGroup.id);
                $('.SMNCGroup').attr('value', ManualKPIBlockViewableGroup.name);
                $('.SMNCGroup').attr('title', ManualKPIBlockViewableGroup.members);
                $('.SMNCGroup').html(ManualKPIBlockViewableGroup.name);
                $('.SMNCGroup').attr('data-toggle', 'tooltip');
                $('.SMNCGroup').attr('data-placement', 'top');
                $('.SMNCGroup').attr('data-original-title', ManualKPIBlockViewableGroup.members);
                $('[data-toggle="tooltip"]').tooltip();
            } else {
                ManualKPIViewType[0].setAttribute('checked', true);
                console.log("Something Error.")
            }

            GetAllDepartmentList('ManualAssignDepartment');
            GetListWithFor(FrequencyList, 'ManualFrequency');

            $('.AddManualAssignBtn').click(function () {
                var ManualAssignModal = document.getElementById('AddManualAssign');
                ManualAssignModal.style.top = (ClientHeight - 600) / 2 + 'px';

                $('#AddManualAssign').modal('show');

                $('.ManualUsersIcon').click(function () {
                    $('.ManualAssignUserList').fadeIn(400);
                    $('.ManualAssignUserList').animate({right: ((ClientWidth - 600) / 2 - 180) + 'px'});

                    /*删除列表中的所有li*/
                    $('.ManualList ul li').remove();

                    GetAllAssignUserList('ManualList', 'ManualUserList');

                    var ManualAssignToWho = document.getElementsByClassName('ManualAssignUser')[0];
                    /*获取到单选按钮点击事件*/
                    $("[name=ManualUserList]").click(function () {
                        ManualAssignToWho.value = $(this).val();
                        ManualAssignToWho.setAttribute('title', $(this).attr("title"));
                        ManualAssignToWho.setAttribute('value', $(this).val());
                        ManualAssignToWho.setAttribute('data-toggle', 'tooltip');
                        ManualAssignToWho.setAttribute('data-placement', 'bottom');
                        ManualAssignToWho.setAttribute('data-original-title', $(this).attr('title'));
                        $('[data-toggle="tooltip"]').tooltip();
                    });


                    $('.ManualCloseAssignUserList').click(function () {
                        $('.ManualAssignUserList').fadeOut(400);
                    })
                });

                $('#AddManualAssign').on('hidden.bs.modal', function () {
                    $('.ManualAssignUserList').fadeOut(400);
                });

                /*Assign Btn*/
                $('.ManualAssginBtn').click(function () {
                    /*Get Date*/
                    var MuanualAssignKpi_ID = document.getElementsByClassName('panel-heading')[0].getAttribute('id');

                    var MaunalAssignUser = $('.ManualAssignUser').attr('data-original-title');

                    var ManualAssignDepartmentDate = $('#ManualAssignDepartment').val();

                    var ManualAssignFrequencyDate = $('#ManualFrequency').val();

                    var ManualAssignTime = $('.ManualInputTime').val();

                    var ManualAutoNotificationFlag = document.getElementsByClassName('ManualNotificationCls')[0];
                    var ManualAutoNotification = false;
                    if (ManualAutoNotificationFlag.checked) {
                        ManualAutoNotification = true;
                    }

                    var AssignsDateJSON = [
                        {
                            user: MaunalAssignUser,
                            department_id: ManualAssignDepartmentDate,
                            time: ManualAssignTime,
                            frequency: ManualAssignFrequencyDate,
                            auto_notification: ManualAutoNotification
                        }
                    ];


                    /*How to Send Params？*/
                    var url = 'kpis/assigns';
                    var Token = $.cookie('token');
                    console.log(AssignsDateJSON);
                    //AssignsDateJSON = JSON.stringify(AssignsDateJSON);
                    AjaxCreateAssign(url, 'POST', MuanualAssignKpi_ID, AssignsDateJSON, Token);
                });
            });

            $('.AddManualDimensionsBtn').click(function () {
                var Display = $('.AddDimensionsDiv').css('display');
                if (Display == 'none') {
                    $('.AddDimensionsDiv').slideDown(400);
                    $('.AddManualDimensionsBtn').children('i').removeClass('glyphicon-plus');
                    $('.AddManualDimensionsBtn').children('i').attr('class', 'glyphicon glyphicon-minus');
                    $('.AddDimensionsTagBtn').click(function () {
                        /*here get value*/
                        var TagName = $('.AddDimensionsTagName').val().trim();
                        var TagType = $('.AddDimensionsTagType').val();

                        if (!TagName == "") {
                            $('#manualdimensions').tagEditor('addTag', TagName, TagType);
                        }
                    });
                } else {
                    $('.AddDimensionsDiv').slideUp(400);
                    $('.AddManualDimensionsBtn').children('i').removeClass('glyphicon-minus');
                    $('.AddManualDimensionsBtn').children('i').attr('class', 'glyphicon glyphicon-plus');
                    setTimeout(function () {
                    }, 400);
                }
            });

            //TODO:Viewable , Show Groups.
            var grouplisturl = 'user_groups/for_kpis';
            var Token = $.cookie('token');
            var GetAllGroupListData = AjaxGetList(grouplisturl, 'GET', Token);

            for (var i = 0; i < GetAllGroupListData.length; i++) {
                /*$('<div class="col-md-1" style="display: flex;"><input type="radio" name="ManualShowGroups" id="' + GetAllGroupListData[i].user_group.id + '"><h5 data-toggle="tooltip" data-placement="bottom" title="' + GetAllGroupListData[i].user_group.members + '" >' + GetAllGroupListData[i].user_group.name + '</h5></div>').appendTo('.ShowViewableGroups').ready(function () {
                 });*/
                $('<div class="CheckBox" style="width: 100px;margin-left: 20px;margin-top: 5px;"><input type="radio" grouplist  name="GroupList" title="' + GetAllGroupListData[i].user_group.members + '" value="' + GetAllGroupListData[i].user_group.name + '" id="' + GetAllGroupListData[i].user_group.id + '"/>' +
                    '<label for="' + GetAllGroupListData[i].user_group.id + '"></label>' +
                    '<p data-toggle="tooltip" data-placement="bottom" title="' + GetAllGroupListData[i].user_group.members + '">' + GetAllGroupListData[i].user_group.name + '</p>' +
                    '</div>').appendTo('.ShowViewableGroups').ready(function () {
                });
            }
            $('[data-toggle="tooltip"]').tooltip();
            /*Get event of click partial public.*/
            if (ManualKPIViewType[2].getAttribute("checked")) {
                $('.ShowViewableGroups').slideDown(400);
                $('.ShowViewableGroups').css({display: "flex"});
                ClickGroup('SMCGroup');
            }

            if (ManualKPIViewType[3].getAttribute("checked")) {
                $('.ShowViewableGroups').slideDown(400);
                $('.ShowViewableGroups').css({display: "flex"});
                ClickGroup('SMNCGroup');
            }

            $('[name=manualViewType]').on('click', function () {
                switch ($(this).val()) {
                    case "0":
                        ManualKPIViewType[0].setAttribute('checked', true);
                        ManualKPIViewType[1].removeAttribute('checked');
                        ManualKPIViewType[2].removeAttribute('checked');
                        ManualKPIViewType[3].removeAttribute('checked');

                        $('.ShowViewableGroups').slideUp(400);
                        RemoveAttr('SMCGroup');
                        RemoveAttr('SMNCGroup');
                        break;
                    case "1":
                        ManualKPIViewType[0].removeAttribute('checked');
                        ManualKPIViewType[1].setAttribute('checked', true);
                        ManualKPIViewType[2].removeAttribute('checked');
                        ManualKPIViewType[3].removeAttribute('checked');
                        $('.ShowViewableGroups').slideUp(400);
                        RemoveAttr('SMCGroup');
                        RemoveAttr('SMNCGroup');
                        break;
                    case "2":
                        ManualKPIViewType[0].removeAttribute('checked');
                        ManualKPIViewType[1].removeAttribute('checked');
                        ManualKPIViewType[2].setAttribute('checked', true);
                        ManualKPIViewType[3].removeAttribute('checked');
                        $('.ShowViewableGroups').slideDown(400);
                        $('.ShowViewableGroups').css({display: "flex"});
                        RemoveAttr('SMCGroup');
                        RemoveAttr('SMNCGroup');
                        ClickGroup('SMCGroup');
                        break;
                    case "3":
                        ManualKPIViewType[0].removeAttribute('checked');
                        ManualKPIViewType[1].removeAttribute('checked');
                        ManualKPIViewType[2].removeAttribute('checked');
                        ManualKPIViewType[3].setAttribute('checked', true);
                        $('.ShowViewableGroups').slideDown(400);
                        $('.ShowViewableGroups').css({display: "flex"});
                        RemoveAttr('SMCGroup');
                        RemoveAttr('SMNCGroup');
                        ClickGroup('SMNCGroup');
                        break;
                }
            });

            //TODO:Preview Btn Click Event
            $('.Preview').on('click', function () {
                var ManualPreviewModal = document.getElementById('ManualPreview');
                ManualPreviewModal.style.top = (ClientHeight - 900) / 2 + 'px';
                $('#ManualPreview').modal('show');

                /*Get Value */
                var ManualPreKPIID = $('.manualpanel').children()[0].getAttribute('id');

                var ManualPreBasicInformation = document.getElementsByClassName('NameAndInput');

                var ManualPreKPIName = ManualPreBasicInformation[0].getElementsByTagName('input')[0].value;
                var ManualPreKPIDescription = ManualPreBasicInformation[1].getElementsByTagName('input')[0].value;
                var ManualPreKPITargetMin = ManualPreBasicInformation[2].getElementsByTagName('input')[0].value;
                var ManualPreKPITargetMax = ManualPreBasicInformation[3].getElementsByTagName('input')[0].value;

                var ManualPreKPIDefaultFreValue = $('#manualdefaultfrequency').val();
                var ManualPreKPIDefaultFre = $('#manualdefaultfrequency').find('option[value=' + ManualPreKPIDefaultFreValue + ']').html();

                var ManualPreKPIUOMValue = $('#manualuom').val();
                var ManualPreKPIUOM = $('#manualuom').find('option[value=' + ManualPreKPIUOMValue + ']').html();

                var ManualPreKPICalculateMethodValue = $('#manualcalculatemethod').val();
                var ManualPreKPICalculateMethod = $('#manualcalculatemethod').find('option[value=' + ManualPreKPICalculateMethodValue + ']').html();

                $('#ManualPreKPIName').html(ManualPreKPIName);
                $('#ManualPreKPIDescription').html(ManualPreKPIDescription);
                $('#ManualPreKPITargetMax').html(ManualPreKPITargetMax);
                $('#ManualPreKPITargetMin').html(ManualPreKPITargetMin);

                $('#ManualPreKPIDefaultFre').html(ManualPreKPIDefaultFre);
                $('#ManualPreKPIDefaultFre').attr('title', ManualPreKPIDefaultFreValue);

                $('#ManualPreKPIUOM').html(ManualPreKPIUOM);
                $('#ManualPreKPIUOM').attr('title', ManualPreKPIUOMValue);

                $('#ManualPreKPICalculateMethod').html(ManualPreKPICalculateMethod);
                $('#ManualPreKPICalculateMethod').attr('title', ManualPreKPICalculateMethodValue);

                /*Dimensions*/
                var Attributes = [];
                $('#ManualPreKPIDimensions').empty();
                var ManualPreKPIDimensions = $('#manualdimensions').tagEditor('getTags')[0].editor[0].children;
                if (ManualPreKPIDimensions.length > 1) {
                    for (var i = 1; i < ManualPreKPIDimensions.length; i++) {
                        var ManualKPIDimensionsName = ManualPreKPIDimensions[i].children[1].innerHTML;
                        var ManualKPIDimensionsType = ManualPreKPIDimensions[i].children[1].getAttribute('data-original-title');
                        $('<tr><td>' + ManualKPIDimensionsName + '</td><td>' + ManualKPIDimensionsType + '</td></tr>').appendTo('#ManualPreKPIDimensions').ready(function () {
                        });

                        Attributes.push({
                            attribute_name: ManualKPIDimensionsName,
                            attribute_type: ManualKPIDimensionsType
                        })
                    }
                } else {
                    $('#ManualPreKPIDimensions').html("<strong style='margin:-10px 0 0 200px'>Here is No Dimensions.</strong>");
                }


                /*AssignTo*/
                var Assignments = [];
                $('#ManualPreKPIAssignTo').empty();
                var ManualPreKPIAssignTo = $('.ShowManualAssign')[0].children;
                try {
                    for (var i = 0; i < ManualPreKPIAssignTo.length; i++) {
                        var ManualPreKPIAssignToWho = ManualPreKPIAssignTo[i].children[0].children[0].children[0].innerHTML;
                        var ManualPreKPIAssignToWhoValue = ManualPreKPIAssignTo[i].children[0].children[0].children[0].getAttribute('data-original-title');
                        var ManualPreKPIAssignToID = ManualPreKPIAssignTo[i].children[0].children[0].getAttribute('id');

                        var ManualPreKPIAssignToTime = ManualPreKPIAssignTo[i].children[0].children[1].innerHTML.split('<span')[0].split('  ')[0];
                        var ManualPreKPIAssignToFrequency = ManualPreKPIAssignTo[i].children[0].children[1].innerHTML.split('<span')[0].split('  ')[1];
                        var ManualPreKPIAssignToFrequencyValue = ManualPreKPIAssignTo[i].children[0].children[1].getAttribute('id');
                        var ManualPreKPIAssignToNotification = ManualPreKPIAssignTo[i].children[0].children[1].children[0].getAttribute('data-original-title');

                        var ManualPreKPIAssignToDepartment = ManualPreKPIAssignTo[i].children[0].children[2].children[0].innerHTML;
                        var ManualPreKPIAssignToDepartmentValue = ManualPreKPIAssignTo[i].children[0].children[2].getAttribute('id');
                        if (ManualPreKPIAssignToNotification == "Auto Notification") {
                            $('<tr id="' + ManualPreKPIAssignToID + '"><td title="' + ManualPreKPIAssignToWhoValue + '">' + ManualPreKPIAssignToWho + '</td>' +
                                '<td>' + ManualPreKPIAssignToTime + '</td>' +
                                '<td title="' + ManualPreKPIAssignToFrequencyValue + '">' + ManualPreKPIAssignToFrequency + '</td>' +
                                '<td title="' + ManualPreKPIAssignToDepartmentValue + '">' + ManualPreKPIAssignToDepartment + '</td>' +
                                '<td><i class="glyphicon glyphicon-ok" style="color: green;" title="Auto Notification"></i></td></tr>').appendTo('#ManualPreKPIAssignTo').ready(function () {
                            });

                            Assignments.push({
                                assignment_id: ManualPreKPIAssignToID,
                                user: ManualPreKPIAssignToWho,
                                department_id: ManualPreKPIAssignToDepartmentValue,
                                time: ManualPreKPIAssignToTime,
                                frequency: ManualPreKPIAssignToFrequencyValue,
                                auto_notification: true
                            })
                        } else {
                            $('<tr id="' + ManualPreKPIAssignToID + '"><td title="' + ManualPreKPIAssignToWhoValue + '">' + ManualPreKPIAssignToWho + '</td>' +
                                '<td>' + ManualPreKPIAssignToTime + '</td>' +
                                '<td title="' + ManualPreKPIAssignToFrequencyValue + '">' + ManualPreKPIAssignToFrequency + '</td>' +
                                '<td title="' + ManualPreKPIAssignToDepartmentValue + '">' + ManualPreKPIAssignToDepartment + '</td>' +
                                '<td><i class="glyphicon glyphicon-remove" style="color: red;" title="No Notification"></i></td></tr>').appendTo('#ManualPreKPIAssignTo').ready(function () {
                            });

                            Assignments.push({
                                assignment_id: ManualPreKPIAssignToID,
                                user: ManualPreKPIAssignToWho,
                                department_id: ManualPreKPIAssignToDepartmentValue,
                                time: ManualPreKPIAssignToTime,
                                frequency: ManualPreKPIAssignToFrequencyValue,
                                auto_notification: false
                            })
                        }
                    }
                } catch (e) {
                    //$('#ManualPreKPIAssignTo').prev().children()[1].remove();
                    //$('#ManualPreKPIAssignTo').html("<strong style='margin: -10px 0 0 200px;'>No People To Assign.</strong>");
                    console.log(e);
                }

                /*Viewable*/
                $('#ManualPreKPIViewable').empty();
                var Viewable = [];
                $('[name=manualViewType]').each(function () {
                    if ($(this).attr('checked')) {
                        var WhichValue = $(this)[0].value;
                        switch (WhichValue) {
                            case "0":
                                $('<td id="0">Public</td> <td>Everyone can see it.</td>').appendTo('#ManualPreKPIViewable').ready(function () {
                                });
                                Viewable.push({
                                    viewable_code: 0,
                                    user_group_id: ""
                                });
                                break;
                            case "1":
                                $('<td id="1">Private</td> <td>Only you can see it.</td>').appendTo('#ManualPreKPIViewable').ready(function () {
                                });
                                Viewable.push({
                                    viewable_code: 1,
                                    user_group_id: ""
                                });
                                break;
                            case "2":
                                var Group = $(this).parent().parent().children('span')[1].innerHTML;
                                var GroupID = $(this).parent().parent().children('span')[1].getAttribute('id');
                                var GroupMembers = $(this).parent().parent().children('span')[1].getAttribute('data-original-title');
                                if (Group == "") {
                                    $('<td id="2">Partial Public</td> <td style="background: darkred;color: white;">Group is Null.</td>').appendTo('#ManualPreKPIViewable').ready(function () {
                                    });
                                } else {
                                    $('<td id="2">Partial Public</td> <td id="' + GroupID + '" title="' + GroupMembers + '">' + Group + '</td>').appendTo('#ManualPreKPIViewable').ready(function () {
                                    });
                                }
                                Viewable.push({
                                    viewable_code: 2,
                                    user_group_id: GroupID
                                });
                                break;
                            case "3":
                                var Group = $(this).parent().parent().children('span')[1].innerHTML;
                                var GroupID = $(this).parent().parent().children('span')[1].getAttribute('id');
                                var GroupMembers = $(this).parent().parent().children('span')[1].getAttribute('data-original-title');
                                if (Group == "") {
                                    $('<td id="3">Block Specific</td> <td style="background: darkred;color: white;">Group is Null.</td>').appendTo('#ManualPreKPIViewable').ready(function () {
                                    });
                                } else {
                                    $('<td id="3">Block Specific</td> <td id="' + GroupID + '" title="' + GroupMembers + '">' + Group + '</td>').appendTo('#ManualPreKPIViewable').ready(function () {
                                    });
                                }
                                Viewable.push({
                                    viewable_code: 3,
                                    user_group_id: GroupID
                                });
                                break;
                        }
                    } else {
                        /*Not Choosed*/
                    }
                });

                /*Confirm Btn*/
                $('.ManualPreKPIConfirm').unbind().on('click', function () {
                    var kpi = {
                        kpi_id: ManualPreKPIID,
                        kpi_name: ManualPreKPIName,
                        description: ManualPreKPIDescription,
                        target_max: ManualPreKPITargetMax,
                        target_min: ManualPreKPITargetMin,
                        uom: ManualPreKPIUOMValue,
                        calculate_method: ManualPreKPICalculateMethodValue,
                        frequency: ManualPreKPIDefaultFreValue,
                        viewable: Viewable,
                        attributes: Attributes
                    };

                    console.log(kpi);
                    console.log(Assignments);

                    var url = 'kpis';
                    var Token = $.cookie('token');
                    AjaxChangeKPI(url, 'PUT', kpi, Assignments, Token);
                });

            });
        }
    );
}

function LoadAllKpis() {
    var accessesurl = 'kpis/users/accesses';
    var Token = $.cookie('token');
    var Accesses = AjaxGetList(accessesurl, 'GET', Token);

    LoadKpis(Accesses, Token);
}

function LoadCreatedKpis() {
    var accessesurl = 'kpis/users/created';
    var Token = $.cookie('token');
    var CreatedKpis = AjaxGetList(accessesurl, 'GET', Token);
    LoadKpis(CreatedKpis, Token);
}

function LoadFollowedKpis() {
    var accessesurl = 'kpis/users/followed';
    var Token = $.cookie('token');
    var FollowedKpis = AjaxGetList(accessesurl, 'GET', Token);
    LoadKpis(FollowedKpis, Token);
}

function LoadKpis(LoadKpis, Token) {
    $('.RightContent ul').css({'margin-top': '0px'});
    for (var i = 0; i < LoadKpis.length; i++) {
        var users = LoadKpis[i].user;
        var kpi = LoadKpis[i].kpi;
        var department = LoadKpis[i].department;
        var follow_flag = LoadKpis[i].follow_flag;
        var follow_flag_value = LoadKpis[i].follow_flag_value;
        var is_created = LoadKpis[i].is_created;
        var is_managable = LoadKpis[i].is_managable;

        /*Here only can get UserEmail,use signup ajax can get all.*/
        var signupurl = 'users/signuped';
        var SignedUsersInfo = AjaxUserSingUp(signupurl, 'POST', users.email, Token);

        function Is_Followed(FollowedFlag, CreatedFlag) {
            if (CreatedFlag) {
                if (FollowedFlag == "0") {
                    /*NONE*/
                    CreatedKPI("darkgreen", "white", i);
                } else if (FollowedFlag == "1") {
                    /*PARTLY*/
                    CreatedKPI("deepskyblue", "white", i);
                } else if (FollowedFlag == "2") {
                    /*ALL*/
                    CreatedKPI("#f2f2f2", "black", i);
                } else {
                    CreatedKPI("white", "black", i);
                }
            } else {
                if (FollowedFlag == "0") {
                    /*NONE*/
                    NotCreatedKPI("darkgreen", "white", i);
                } else if (FollowedFlag == "1") {
                    /*PARTLY*/
                    NotCreatedKPI("deepskyblue", "white", i);
                } else if (FollowedFlag == "2") {
                    /*ALL*/
                    NotCreatedKPI("#f2f2f2", "black", i);
                } else {
                    NotCreatedKPI("white", "black", i);
                }
            }
        }

        function CreatedKPI(BackColor, FontColor, i) {
            $('<li style="top:' + 100 * i + 'px;"><div class="Kpis"><table class="table"><tbody><tr>' +
                '<td style="border-right:1px solid #e0e0e0;"><h3 class="KpiName" id="' + kpi.kpi_id + '" title="' + kpi.kpi_name + '">' + kpi.kpi_name + '</h3></td>' +
                '<td style="border-right:1px solid #e0e0e0;border-left: 1px solid white;margin-top:20px; width: ' + (ClientWidth - 600) + 'px' + '"><h3 class="KpiDescription" title="' + kpi.description + '">' + kpi.description + '</h3></td>' +
                '<td class="TargetMin"><h3 style="border-right:1px solid #e0e0e0;">' + kpi.target_min_text + '</h3></td>' +
                '<td class="TargetMax"><h3 style="border-right:1px solid #e0e0e0;">' + kpi.target_max_text + '</h3></td>' +
                '<td class="KpiCreator" style="border-right:1px solid #e0e0e0;"><h3 title="' + SignedUsersInfo.user.email + '">' + SignedUsersInfo.user.nick_name + '</h3></td>' +
                '<td><button class="BtnSubmit Follow" style="background: ' + BackColor + ';color:' + FontColor + ' ;"><i class="glyphicon glyphicon-plus"></i> Follow</button>' +
                '<button class="BtnSubmit Manage" style="background:' + BackColor + ' ;color: ' + FontColor + ';"><i class="glyphicon glyphicon-wrench"></i> Manage</button></td></tr>' +
                '<tr>' +
                '<td><h5>KPI Name</h5></td>' +
                '<td style="width: ' + (ClientWidth - 600) + 'px' + ';"><h5>Description</h5></td>' +
                '<td><h5 style="width: 80px;">Min</h5></td>' +
                '<td><h5 style="width:80px;">Max</h5></td>' +
                '<td ><h5>Creator</h5></td>' +
                '</tr>' +
                '</tbody></table></div></li>').appendTo('.RightContent>ul').ready(function () {
            });
        }

        function NotCreatedKPI(BackColor, FontColor, i) {
            $('<li style="top:' + 100 * i + 'px;"><div class="Kpis"><table class="table"><tbody><tr>' +
                '<td style="border-right:1px solid #e0e0e0;"><h3 class="KpiName" id="' + kpi.kpi_id + '" title="' + kpi.kpi_name + '">' + kpi.kpi_name + '</h3></td>' +
                '<td style="border-right:1px solid #e0e0e0;border-left: 1px solid white;margin-top:20px; width: ' + (ClientWidth - 600) + 'px' + '"><h3 class="KpiDescription" title="' + kpi.description + '">' + kpi.description + '</h3></td>' +
                '<td class="TargetMin"><h3 style="border-right:1px solid #e0e0e0;">' + kpi.target_min_text + '</h3></td>' +
                '<td class="TargetMax"><h3 style="border-right:1px solid #e0e0e0;">' + kpi.target_max_text + '</h3></td>' +
                '<td class="KpiCreator" style="border-right:1px solid #e0e0e0;"><h3 title="' + SignedUsersInfo.user.email + '">' + SignedUsersInfo.user.nick_name + '</h3></td>' +
                '<td><button class="BtnSubmit Follow" style="margin: 20px 0 0 0 ;border: none; ;background: ' + BackColor + ';color:' + FontColor + ' ;"><i class="glyphicon glyphicon-plus"></i> Follow</button></td></tr>' +
                '<tr>' +
                '<td><h5>KPI Name</h5></td>' +
                '<td style="border-right:1px solid #e0e0e0; width: ' + (ClientWidth - 600) + 'px' + ';"><h5>Description</h5></td>' +
                '<td><h5 style="width: 80px;">Min</h5></td>' +
                '<td><h5 style="width:80px;">Max</h5></td>' +
                '<td ><h5>Creator</h5></td>' +
                '</tr>' +
                '</tbody></table></div></li>').appendTo('.RightContent>ul').ready(function () {
            });
        }

        /*Is Created? Floow Flag*/
        Is_Followed(follow_flag_value, is_created);

        /*Dynamic Judge Font Size  if add this , the font size will changed*/
        /*Judge Font Size*/
        /* if (kpi.kpi_name.length > 10) {
         var KpiName = document.getElementsByClassName('KpiName')[i];
         KpiName.style.fontSize = '.9em';
         KpiName.style.fontWeight = 'bold';
         }

         if (kpi.description.length > ((ClientWidth - 600) / 18)) {
         var KpiDescriptionFont = document.getElementsByClassName('KpiDescription')[i];
         KpiDescriptionFont.style.fontSize = '.9em';
         KpiDescriptionFont.style.fontWeight = 'bold';
         }
         */

        /*Here also can judge TargetMax and TargetMin*/
    }
}

/*Array Is Repeat*/
function ArrayIsRepeat(array) {
    var NoRepeat = new Array();
    var p = 0;
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < NoRepeat.length; j++) {
            if (NoRepeat[j] == array[i]) break; // 检查重复
        }
        if (j >= NoRepeat.length) { // 没重复就增加它
            NoRepeat[p++] = array[i];
        }
    }
    return NoRepeat;
}

function InitParams() {
    $('[data-toggle="tooltip"]').tooltip();

    $('#Dimensions').tagEditor({
        forceLowercase: false
    });

    $('#UpdateGroupUsers').tagEditor3parments({
        forceLowercase: false,
        beforeTagDelete: function (field, editor, tags, val) {
            $('li', editor).each(function (index) {
                var li = $(this);
                if (li.find('.tag-editor-tag').html() == val) {
                    var title = li.find('.tag-editor-tag')[0].attributes[1].value;
                    var id = li.find('.tag-editor-tag')[0].attributes[4].value;
                    var value = li.find('.tag-editor-tag')[0].attributes[5].value;
                    $('<li><div class="CheckBox" groupuserlist style="margin-left: -20px"><input type="checkbox" name="AllGroupUsersList" title="' + title + '" value="' + value + '" id="' + id + '"/>' +
                        '<label for="' + id + '"></label>' +
                        '<p data-toggle="tooltip" data-original-title="' + title + '" data-placement="bottom" title="' + title + '">' + value + '</p></div></li>').appendTo('.GroupList>ul').ready(function () {
                    });

                    $('[data-toggle="tooltip"]').tooltip();
                    ChooseGroupUserList('UpdateGroupUsers');
                }
            });
        }
    });

    $('#ChoosedGroupUsers').tagEditor3parments({
        forceLowercase: false,
        beforeTagDelete: function (field, editor, tags, val) {
            $('li', editor).each(function (index) {
                var li = $(this);
                if (li.find('.tag-editor-tag').html() == val) {
                    //console.log(li.find('.tag-editor-tag')[0].attributes);
                    var title = li.find('.tag-editor-tag')[0].attributes[1].value;
                    var id = li.find('.tag-editor-tag')[0].attributes[4].value;
                    var value = li.find('.tag-editor-tag')[0].attributes[5].value;

                    $('<li><div class="CheckBox" groupuserlist style="margin-left: -20px"><input type="checkbox" name="AllGroupUsersList" title="' + title + '" value="' + value + '" id="' + id + '"/>' +
                        '<label for="' + id + '"></label>' +
                        '<p data-toggle="tooltip" data-original-title="' + title + '" data-placement="bottom" title="' + title + '">' + value + '</p></div></li>').appendTo('.GroupList>ul').ready(function () {
                    });

                    $('[data-toggle="tooltip"]').tooltip();
                    ChooseGroupUserList('ChoosedGroupUsers');
                }
            });
        }
    });
}

function SetPosition() {
    /*Position Start*/
    var LeftNav = document.getElementsByClassName('LeftNav')[0];
    LeftNav.style.height = (ClientHeight - 60) + 'px';

    var CreateGroupModal = document.getElementById('CreateGroup');
    CreateGroupModal.style.top = (ClientHeight - 600) / 2 + 'px';

    var UpdateGroupModal = document.getElementById('UpdateGroup');
    UpdateGroupModal.style.top = (ClientHeight - 600) / 2 + 'px';

    var CreateKpiModal = document.getElementById('CreateKpi');
    CreateKpiModal.style.top = (ClientHeight - 600) / 2 + 'px';

    var AddDimensionsPosition = document.getElementsByClassName('AddDimensions')[0];
    AddDimensionsPosition.style.right = ((ClientWidth - 600) / 2 - 205) + 'px';

    var ChooseNavPosition = document.getElementsByClassName('ChooseNav')[0];
    ChooseNavPosition.style.right = ((ClientWidth - 600) / 2 - 205) + 'px';

    var NewGroupPosition = document.getElementsByClassName('NewGroup')[0];
    NewGroupPosition.style.right = ((ClientWidth - 600) / 2 - 205) + 'px';

    var AssignUserListPosition = document.getElementsByClassName('AssignUserList')[0];
    AssignUserListPosition.style.right = ((ClientWidth - 600) / 2 - 405) + 'px';
    /*Position End*/
}

function LeftNavFun() {
    /*Judge Which li Click*/
    var LeftNav = document.getElementsByClassName('LeftNav')[0];
    var LeftNavLi = LeftNav.getElementsByTagName('ul')[0].getElementsByTagName('li');

    LeftNavLi[0].onclick = function () {
        /*Remove All Li*/
        RemoveLi();
        $('.RightContent').append('<ul></ul>');
        $(this).addClass('IsClick');
        LoadAllKpis();
        ManageKPI();
    };

    LeftNavLi[1].onclick = function () {
        RemoveLi();
        $('.RightContent').append('<ul></ul>');
        $(this).addClass('IsClick');
        LoadCreatedKpis();
        ManageKPI();
    };

    LeftNavLi[2].onclick = function () {
        RemoveLi();
        $('.RightContent').append('<ul></ul>');
        $(this).addClass('IsClick');
        LoadFollowedKpis();
        ManageKPI();
    };

    LeftNavLi[3].onclick = function () {
        RemoveLi();
        $('.RightContent').append('<ul></ul>');
        $(this).addClass('IsClick');

        var RightContent = document.getElementsByClassName('RightContent')[0];
        RightContent.style.width = (ClientWidth - 200) + 'px';
        RightContent.getElementsByTagName('ul')[0].style.marginTop = '65px';

        $('<div class="NewGroupBtn" style="position: absolute;top: 0;left: 60px;height: 65px;">' +
            '<button class="BtnSubmit" style="width: 200px;"><i class="glyphicon glyphicon-plus" style="margin-right: 20px;"></i>' +
            '<span>New Group</span></button></div>').appendTo('.RightContent').ready(function () {
        });

        UserGroups();
    };

    /*New KPI Btn*/
    $('.Create').click(function () {
        $('#CreateKpi').modal('show');
        $('#CreateKpi').unbind().on('shown.bs.modal', function () {
            /*初始化一些值*/

        });

        /*Dimention*/
        var AddDimentionBtn = document.getElementsByClassName('AddDimentionBtn')[0].getElementsByTagName('i')[0];
        AddDimentionBtn.onclick = function () {
            $('.AddDimensions').fadeIn(400);

            /*Close Dimension Btn*/
            var CloseDimension = document.getElementsByClassName('CloseDimension')[0].getElementsByTagName('i')[0];
            CloseDimension.onclick = function () {
                $('.AddDimensions').fadeOut(400);
            };

            var DimensionAddBtn = document.getElementsByClassName('DimensionAddBtn')[0];
            DimensionAddBtn.onclick = function () {
                var DimensionName = document.getElementsByClassName('AddDimensions')[0].getElementsByTagName('input')[0].value;
                var DimensionType = document.getElementById('DimensionType').value;

                if (DimensionName == "") {
                    document.getElementsByClassName('AddDimensions')[0].getElementsByTagName('input')[0].style.border = '2px solid darkred';
                    ShowMsgDialog(0, (ClientWidth - 500) / 2, ClientHeight - 80, (ClientWidth - 500) / 2, 'none', 'Dimension Name cannot Empty', '#DC143C');
                    SlideToggle('.ShowMsgDialog', 1000, 2000, 1000);
                    //Delete AddDepartment Dialog
                    //删除掉MsgDialog
                    setTimeout(function () {
                        RemoveDialog('ShowMsgDialog');
                    }, 3000);
                } else {
                    document.getElementsByClassName('AddDimensions')[0].getElementsByTagName('input')[0].style.border = '1px solid #ccc';
                    $('#Dimensions').tagEditor('addTag', DimensionName, DimensionType);
                }
            }
        };
        /*Three Btn on modal footer*/
        var CreateKPIBtn = document.getElementsByClassName('modal-footer')[0].getElementsByTagName('button');

        var BasicHeader = document.getElementsByClassName('BasicHeader')[0];
        var AssignToHeader = document.getElementsByClassName('AssignToHeader')[0];
        var ViewableHeader = document.getElementsByClassName('ViewableHeader')[0];

        var BasicInfo = document.getElementsByClassName('basic-info')[0];
        var AssignTo = document.getElementsByClassName('assign-to')[0];
        var Viewable = document.getElementsByClassName('viewable')[0];

        var BasicHeaderFont = BasicHeader.getElementsByTagName('h4')[0];
        var AssignToHeaderFont = AssignToHeader.getElementsByTagName('h4')[0];
        var ViewableHeaderFont = ViewableHeader.getElementsByTagName('h4')[0];

        /*footer button*/
        var PreStepBtn = CreateKPIBtn[0];
        var NextStepBtn = CreateKPIBtn[1];
        var FinishBtn = CreateKPIBtn[2];

        /*step control*/
        PreStepBtn.onclick = function () {
            if (AssignTo.getAttribute('isopen') == 'yes') {
                BasicInfo.style.display = 'none';
                AssignTo.style.display = 'none';
                Viewable.style.display = 'block';

                BasicInfo.setAttribute('isopen', 'no');
                AssignTo.setAttribute('isopen', 'no');
                Viewable.setAttribute('isopen', 'yes');

                BasicHeader.style.border = 'none';
                AssignToHeader.style.border = 'none';
                ViewableHeader.style.borderBottom = '4px solid lightseagreen';

                BasicHeaderFont.style.color = '#000';
                AssignToHeaderFont.style.color = '#000';
                ViewableHeaderFont.style.color = '#FFA500';

                $('.AssignUserList').fadeOut(400);

                NextStepBtn.removeAttribute('disabled');
                NextStepBtn.style.border = '2px solid green';
            } else if (Viewable.getAttribute('isopen') === 'yes') {
                BasicInfo.style.display = 'block';
                AssignTo.style.display = 'none';
                Viewable.style.display = 'none';

                BasicInfo.setAttribute('isopen', 'yes');
                AssignTo.setAttribute('isopen', 'no');
                Viewable.setAttribute('isopen', 'no');

                BasicHeader.style.borderBottom = '4px solid lightseagreen';
                AssignToHeader.style.border = 'none';
                ViewableHeader.style.border = 'none';

                BasicHeaderFont.style.color = '#FFA500';
                AssignToHeaderFont.style.color = '#000';
                ViewableHeaderFont.style.color = '#000';

                $('.ChooseNav').fadeOut(400);

                PreStepBtn.setAttribute('disabled', 'disabled');
                PreStepBtn.style.border = 'none';
            }
        };

        var Basic_Info = document.getElementsByClassName('basic-info')[0];
        var Row = Basic_Info.getElementsByClassName('row');
        var Kpi_Name = Row[0].getElementsByClassName('col-md-6')[0].getElementsByTagName('input')[0];
        var Kpi_Description = Row[1].getElementsByClassName('col-md-6')[0].getElementsByTagName('textarea')[0];
        var TargetMin = Row[3].getElementsByClassName('col-md-6')[0].getElementsByTagName('input')[0];
        var TargetMax = Row[4].getElementsByClassName('col-md-6')[0].getElementsByTagName('input')[0];

        /*此处为点击user 图标*/
        var AssignToWhoIcon = document.getElementsByClassName('AssignToWho')[0].getElementsByClassName('col-md-1')[0].getElementsByTagName('i')[0];
        var AssignToWho = document.getElementsByClassName('AssignToWho')[0].getElementsByClassName('col-md-7')[0].getElementsByTagName('input')[0];

        AssignToWhoIcon.onclick = function () {
            $('.AssignUserList').fadeIn(400);
            $('.AssignUserList').animate({right: ((ClientWidth - 600) / 2 - 180) + 'px'});
            /*删除列表中的所有li*/
            $('.List ul li').remove();

            GetAllAssignUserList('List', 'AllUsersList');
            /*获取到单选按钮点击事件*/
            $("[name=AllUsersList]").click(function () {
                AssignToWho.value = $(this).val();
                AssignToWho.setAttribute('title', $(this).attr("title"));
                AssignToWho.setAttribute('value', $(this).val());
                AssignToWho.setAttribute('data-toggle', 'tooltip');
                AssignToWho.setAttribute('data-placement', 'bottom');
                AssignToWho.setAttribute('data-original-title', $(this).attr('title'));
                $('[data-toggle="tooltip"]').tooltip();
            });
        };

        NextStepBtn.onclick = function () {
            if (BasicInfo.getAttribute('isopen') == 'yes') {
                /*Judge is Empty*/
                if ((!ValueIsNull(Kpi_Name))) {
                } else if (!ValueIsNull(TargetMin)) {
                    console.log('TargeMin error')
                } else if (!ValueIsNull(TargetMax)) {
                    console.log('TargeMax error')
                } else {
                    FinishBtn.removeAttribute('disabled');

                    BasicInfo.style.display = 'none';
                    AssignTo.style.display = 'none';
                    Viewable.style.display = 'block';

                    BasicInfo.setAttribute('isopen', 'no');
                    AssignTo.setAttribute('isopen', 'no');
                    Viewable.setAttribute('isopen', 'yes');

                    BasicHeader.style.border = 'none';
                    AssignToHeader.style.border = 'none';
                    ViewableHeader.style.borderBottom = '4px solid lightseagreen';

                    BasicHeaderFont.style.color = '#000';
                    AssignToHeaderFont.style.color = '#000';
                    ViewableHeaderFont.style.color = '#FFA500';

                    /*Display AddDimensions Dialog*/
                    $('.AddDimensions').fadeOut(400);
                    PreStepBtn.removeAttribute('disabled');
                    PreStepBtn.style.border = '2px solid green';


                    FinishBtn.onclick = function () {
                        var Default_Frequency = $('#DefaultFrequency').val();
                        var uom = $('#uom').val();
                        var CalculateMethod = $('#calculatemethod').val();

                        var url = 'kpis';
                        var Token = $.cookie('token');

                        var GetDimensions = document.getElementsByClassName('GetDimensions')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
                        var Attributes = new Array();

                        if (GetDimensions.length > 1) {
                            for (var i = 1; i < GetDimensions.length; i++) {
                                var AttributeName = GetDimensions[i].getElementsByClassName('tag-editor-tag')[0].innerHTML;
                                var AttributeType = GetDimensions[i].getElementsByClassName('tag-editor-tag')[0].getAttribute('data-original-title');
                                var AttributesDate = {
                                    attribute_name: AttributeName,
                                    attribute_type: AttributeType
                                };
                                Attributes = Attributes.concat(AttributesDate);
                            }
                        } else {
                            Attributes = [];
                        }

                        //console.log(Attributes);
                        var AssignDepartment = $('#AssignDepartment').val();
                        var Frequency = $('#Frequency').val();
                        var InputTime = document.getElementsByClassName('InputTime')[0].value;
                        var AutoNotificationFlag = document.getElementsByClassName('assign-to')[0].getElementsByClassName('row')[3].getElementsByClassName('col-md-3')[0].getElementsByTagName('input')[0];
                        var AutoNotification = false;
                        if (AutoNotificationFlag.checked) {
                            AutoNotification = true;
                        }
                        Default_Frequency = parseInt(Default_Frequency);
                        CalculateMethod = parseInt(CalculateMethod);

                        /*get viewable Date*/
                        var viewable_code = 0;
                        var ViewType = document.getElementsByName('ViewType');
                        for (var i = 0; i < ViewType.length; i++) {
                            if (ViewType[i].checked) {
                                viewable_code = ViewType[i].value;
                            }
                        }
                        var ShowChoosedGroupDate = $('.ShowChoosedGroup').attr('id');
                        var ShowNotChoosedGroupDate = $('.ShowNotChoosedGroup').attr('id');
                        var ViewableDate = "";
                        if (viewable_code == 0) {
                            ViewableDate = {
                                viewable_code: viewable_code
                            };
                        } else if (viewable_code == 1) {
                            ViewableDate = {
                                viewable_code: viewable_code
                            };
                        } else if (viewable_code == 2) {
                            ViewableDate = {
                                viewable_code: viewable_code,
                                user_group_id: ShowChoosedGroupDate
                            };
                        } else if (viewable_code == 3) {
                            ViewableDate = {
                                viewable_code: viewable_code,
                                user_group_id: ShowNotChoosedGroupDate
                            };
                        } else {
                            ViewableDate = {
                                viewable_code: viewable_code
                            }
                        }

                        var kpis = {
                            "kpi_name": Kpi_Name.value,
                            "description": Kpi_Description.value,
                            "target_min": TargetMin.value,
                            "target_max": TargetMax.value,
                            "uom": uom,
                            "frequency": Default_Frequency,
                            "calculate_method": CalculateMethod,
                            "viewable": ViewableDate,
                            "attributes": Attributes
                        };

                        /*Assign to someone*/
                        var assignments = new Array();
                        if (!AssignToWho.getAttribute('data-original-title') == "") {
                            var usersdate = AssignToWho.getAttribute('data-original-title');
                            Frequency = parseInt(Frequency);
                            var AssignmentsDate = {
                                "user": usersdate,
                                "department_id": AssignDepartment,
                                "time": InputTime,
                                "frequency": Frequency,
                                "auto_notification": AutoNotification
                            };
                            assignments.push(AssignmentsDate);
                        } else {
                            assignments = [];
                        }

                        //console.log(assignments);
                        //console.log(Object.prototype.toString.call(assignments));

                        AjaxCreateKpis(url, 'POST', kpis, assignments, Token);
                    };

                }
            } else if (Viewable.getAttribute('isopen') == 'yes') {
                BasicInfo.style.display = 'none';
                AssignTo.style.display = 'block';
                Viewable.style.display = 'none';

                BasicInfo.setAttribute('isopen', 'no');
                AssignTo.setAttribute('isopen', 'yes');
                Viewable.setAttribute('isopen', 'no');

                BasicHeader.style.border = 'none';
                AssignToHeader.style.borderBottom = '4px solid lightseagreen';
                ViewableHeader.style.border = 'none';

                BasicHeaderFont.style.color = '#000';
                AssignToHeaderFont.style.color = '#FFA500';
                ViewableHeaderFont.style.color = '#000';

                $('.AssignUserList').fadeOut(400);
                $('.ChooseNav').fadeOut(400);

                NextStepBtn.setAttribute('disabled', 'disabled');
                NextStepBtn.style.border = 'none';
            }
        };


        /*four viewable style*/
        var ViewMsgShow = document.getElementsByClassName('ViewMsgShow');
        var Public = ViewMsgShow[0].getElementsByTagName('span')[0].getElementsByTagName('input')[0];
        var Private = ViewMsgShow[1].getElementsByTagName('span')[0].getElementsByTagName('input')[0];
        var PartialPublic = ViewMsgShow[2].getElementsByTagName('span')[0].getElementsByTagName('input')[0];
        var BlockSpecific = ViewMsgShow[3].getElementsByTagName('span')[0].getElementsByTagName('input')[0];

        Public.onclick = function () {
            RemoveAttr('ShowChoosedGroup');
            RemoveAttr('ShowNotChoosedGroup');
            $('.GroupUserList').fadeOut(400);
            $('.NewGroup').fadeOut(400);
            $('.ChooseNav').fadeOut(400);
        };

        Private.onclick = function () {
            RemoveAttr('ShowChoosedGroup');
            RemoveAttr('ShowNotChoosedGroup');
            $('.GroupUserList').fadeOut(400);
            $('.NewGroup').fadeOut(400);
            $('.ChooseNav').fadeOut(400);
        };

        PartialPublic.onclick = function () {
            $('.ChooseNav').fadeIn(400);
            RemoveAttr('ShowChoosedGroup');
            RemoveAttr('ShowNotChoosedGroup');
            GetAllGroupList("ShowGroup");

            var CloseCheckBox = document.getElementsByClassName('CloseCheckBox')[0].getElementsByTagName('i')[0];
            CloseCheckBox.onclick = function () {
                $('.ChooseNav').fadeOut(400);
            };

            ClickGroup('ShowChoosedGroup');
        };

        BlockSpecific.onclick = function () {
            $('.ChooseNav').fadeIn(400);
            RemoveAttr('ShowChoosedGroup');
            RemoveAttr('ShowNotChoosedGroup');
            GetAllGroupList("ShowGroup");
            var CloseCheckBox = document.getElementsByClassName('CloseCheckBox')[0].getElementsByTagName('i')[0];
            CloseCheckBox.onclick = function () {
                $('.ChooseNav').fadeOut(400);
            };
            ClickGroup('ShowNotChoosedGroup');
        };

        var CloseAssignUserList = document.getElementsByClassName('CloseAssignUserList')[0].getElementsByTagName('i')[0];
        CloseAssignUserList.onclick = function () {
            $('.AssignUserList').fadeOut(400);
        };

        $('.close').click(function () {
            $('#CreateKpi').modal('hide');
            $('#CreateKpi').on('hidden.bs.modal', function () {
                /*Reset Button*/
                PreStepBtn.style.border = '2px solid green';
                PreStepBtn.removeAttribute('disabled');
                NextStepBtn.removeAttribute('disabled');
                FinishBtn.removeAttribute('disabled');
            });
        });
    });
}

function RemoveLi() {
    //$('.RightContent ul').empty();
    $('.LeftNav li').removeClass('IsClick');
    $('.NewGroupBtn').remove();
    $('.RightContent').empty();
}

function GetListFunc() {
    /*Set UOM Calculate_Method  timing_frequencies*/
    var uomurl = 'kpis/unit_of_measurements';
    var calculateurl = 'kpis/calculate_methods';
    var frequencyurl = 'kpis/timing_frequencies';
    var Token = $.cookie('token');

    UOMList = AjaxGetList(uomurl, 'GET', Token);
    CalculateList = AjaxGetList(calculateurl, 'GET', Token);
    FrequencyList = AjaxGetList(frequencyurl, 'GET', Token);

    GetListWithFor(UOMList, 'uom');
    GetListWithFor(CalculateList, 'calculatemethod');
    GetListWithFor(FrequencyList, 'DefaultFrequency');
    GetListWithFor(FrequencyList, 'Frequency');

    GetAllDepartmentList('AssignDepartment');
}

function GetListWithFor(data, id) {
    for (var i = 0; i < data.length; i++) {
        $('<option value="' + data[i].id + '">' + data[i].name + '</option>').appendTo('#' + id).ready(function () {
        });
    }
}

/*Get All Department*/
function GetAllDepartmentList(ID) {
    /*获取所有的值*/
    var getalldeprtmenturl = 'users/departments';
    var Token = $.cookie('token');
    var GetAllDepartments = AjaxGetAllDepartment(getalldeprtmenturl, 'GET', Token);

    /**
     *解析数组，将之放置在一个数组中
     * 但是数组中套着数组
     * @type {Array}
     */
    var AllDepartment = new Array();
    var UniqueDepartmentJSON;
    for (var i = 0; i < GetAllDepartments.length; i++) {
        UniqueDepartmentJSON = $.parseJSON(GetAllDepartments[i]);
        for (var j = 0; j < UniqueDepartmentJSON.length; j++) {
            var AllID = UniqueDepartmentJSON[j].department.id;
            var AllName = UniqueDepartmentJSON[j].department.name;
            AllDepartment.push({ID: AllID, Name: AllName});
        }
    }

    /**
     * 将数组的数组放置到一个数组中
     * @type {Array}
     */

    var GetAllDepartment = new Array();
    for (var i = 0; i < AllDepartment.length; i++) {
        var DepartmentJSON = JSON.stringify(AllDepartment[i]).toString();
        GetAllDepartment.push(DepartmentJSON);
    }

    /*No Repeat*/
    var NoRepeatDepartment = ArrayIsRepeat(GetAllDepartment);
    /* console.log(NoRepeatDepartment);*/

    for (var i = 0; i < NoRepeatDepartment.length; i++) {
        var NoRepeatDepartmentJSON = eval("(" + NoRepeatDepartment[i] + ")");
        var NoRepeatDepartmentID = NoRepeatDepartmentJSON.ID;
        var NoRepeatDepartmentName = NoRepeatDepartmentJSON.Name;
        $('<option value="' + NoRepeatDepartmentID + '">' + NoRepeatDepartmentName + '</option>').appendTo('#' + ID).ready(function () {
        });
    }
}

/*Get All Users List*/
function GetAllAssignUserList(ListCls, ListName) {
    /*获取所有的用户列表*/
    var url = 'users/brief_infos';
    var Token = $.cookie('token');
    var AllDepartmentJSON = AjaxGetList(url, 'GET', Token);
    for (var i = 0; i < AllDepartmentJSON.length; i++) {
        $('<li><div class="CheckBox" userlist style="margin-left: -20px"><input type="radio" name="' + ListName + '" title="' + AllDepartmentJSON[i].email + '" value="' + AllDepartmentJSON[i].nick_name + '" id="' + AllDepartmentJSON[i].id + '"/>' +
            '<label for="' + AllDepartmentJSON[i].id + '"></label>' +
            '<p data-toggle="tooltip" data-placement="bottom" title="' + AllDepartmentJSON[i].email + '">' + AllDepartmentJSON[i].nick_name + '</p></div></li>').appendTo('.' + ListCls + '>ul').ready(function () {
        });
    }
    $('[data-toggle="tooltip"]').tooltip();
}

/*Get All Group List*/
function GetAllGroupList(ClassName) {
    /*Clear All*/
    $('.ShowGroup').empty();
    var grouplisturl = 'user_groups/for_kpis';
    var Token = $.cookie('token');
    var GetAllGroupListData = AjaxGetList(grouplisturl, 'GET', Token);

    /*将GroupList添加到HTML中*/
    for (var i = 0; i < GetAllGroupListData.length; i++) {
        $('<div class="CheckBox"><input type="radio" grouplist  name="GroupList" title="' + GetAllGroupListData[i].user_group.members + '" value="' + GetAllGroupListData[i].user_group.name + '" id="' + GetAllGroupListData[i].user_group.id + '"/>' +
            '<label for="' + GetAllGroupListData[i].user_group.id + '"></label>' +
            '<p data-toggle="tooltip" data-placement="bottom" title="' + GetAllGroupListData[i].user_group.members + '">' + GetAllGroupListData[i].user_group.name + '</p>' +
            '</div><hr>').appendTo('.' + ClassName).ready(function () {
        });
    }
    $('[data-toggle="tooltip"]').tooltip();
}

function ClickGroup(selector) {
    /*获取到单选按钮点击事件 -然并卵-*/
    $("[grouplist]").unbind().on('click', function () {
        $('.' + selector).html($(this).val());
        $('.' + selector).attr('value', $(this).val());
        $('.' + selector).attr('id', $(this).attr("id"));
        //$('.' + selector).attr('title', $(this).attr("title"));
        $('.' + selector).attr('title', "");
        $('.' + selector).attr('data-toggle', 'tooltip');
        $('.' + selector).attr('data-original-title', $(this).attr("title"));
        $('[data-toggle="tooltip"]').tooltip();
    });
}

function RemoveAttr(ClassName) {
    /*删除部分可见元素属性*/
    $('.' + ClassName).html('');
    $('.' + ClassName).removeAttr('value');
    $('.' + ClassName).removeAttr('id');
    $('.' + ClassName).removeAttr('title');
    $('.' + ClassName).removeAttr('data-toggle');
    $('.' + ClassName).removeAttr('data-original-title');
}

function GetAllGroupUserList() {
    $('.GroupList>ul>li').remove();
    /*获取所有的用户列表*/
    var url = 'users/brief_infos';
    var Token = $.cookie('token');
    var AllDepartmentJSON = AjaxGetList(url, 'GET', Token);

    for (var i = 0; i < AllDepartmentJSON.length; i++) {
        $('<li><div class="CheckBox" groupuserlist style="margin-left: -20px"><input type="checkbox" name="AllGroupUsersList" title="' + AllDepartmentJSON[i].email + '" value="' + AllDepartmentJSON[i].nick_name + '" id="' + AllDepartmentJSON[i].id + '"/>' +
            '<label for="' + AllDepartmentJSON[i].id + '"></label>' +
            '<p data-toggle="tooltip" data-placement="bottom" title="' + AllDepartmentJSON[i].email + '">' + AllDepartmentJSON[i].nick_name + '</p></div></li>').appendTo('.GroupList>ul').ready(function () {
        });
    }
    $('[data-toggle="tooltip"]').tooltip();
    return AllDepartmentJSON;
}

function ChooseGroupUserList(ID) {
    $("[groupuserlist]").click(function () {
        var title = $(this).children('input').attr("title");
        var id = $(this).children('input').attr("id");
        var value = $(this).children('input').val();

        $('#' + ID).tagEditor3parments('addTag', value, title, id);

        $('[data-toggle="tooltip"]').tooltip();
        $(this).parent().remove();
    });
}

function UserGroups() {
    ShowGroupList();

    CreateGroup();

    EditGroup();
}

function CreateGroup() {
    $('.GroupUserList').fadeIn(400);
    setTimeout(function () {
        $('.GroupUserList').animate({right: ((ClientWidth - 600) / 2) - 180 + 'px'});
    }, 1400);

    $('.NewGroupBtn').children('button').click(function () {
        $('#CreateGroup').modal('show');
        $('#CreateGroup').on('shown.bs.modal', function () {
            GetAllGroupUserList();
            ChooseGroupUserList('ChoosedGroupUsers');

            var CreateGroupBtn = document.getElementsByClassName('CreateGroupBtn')[0];
            CreateGroupBtn.onclick = function () {
                ChangeGroup('ChoosedGroupUsers', 'CreateGroupName', 'POST');
            };
        });
    });
}

function EditGroup() {
    $('.EditBtn').bind('click', function () {
        var MembersArray = new Array();
        var MembersIndex = new Array();
        var GroupMembersStyle = $(this).parent().prev('div');
        var GroupNameStyle = GroupMembersStyle.prev('div');

        var GroupMemberAttr = GroupMembersStyle[0].attributes;
        var GroupNameAttr = GroupNameStyle[0].attributes;

        ChooseGroupUserList('UpdateGroupUsers');
        /*Show modal*/
        $('#UpdateGroup').modal('show');
        $('#UpdateGroup').unbind().on('shown.bs.modal', function () {
            var ID = GroupNameAttr[0].value;
            var Name = GroupNameAttr[5].value;
            var Members = GroupMemberAttr[4].value;

            MembersArray = Members.split(',');
            $('.UpdateGroupName').val(Name);
            $('.UpdateGroupName').attr('id', ID);
            RemoveAllTags('UpdateGroupUsers');

            var AllUserListDate = GetAllGroupUserList();
            /*如果相同，删除*/
            for (var i = 0; i < MembersArray.length; i++) {
                for (var j = 0; j < AllUserListDate.length; j++) {
                    if (MembersArray[i] == AllUserListDate[j].nick_name) {
                        $('#UpdateGroupUsers').tagEditor3parments('addTag', AllUserListDate[j].nick_name, AllUserListDate[j].email, AllUserListDate[j].id);
                        MembersIndex.push(j);
                        break;
                    }
                }
            }

            /*Array Sort from top to bottom*/
            MembersIndex = MembersIndex.sort(function (a, b) {
                return a < b ? 1 : -1;
            });

            var DeleteLi = $(this).children('div')[1].getElementsByClassName('GroupList')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
            for (var i = 0; i < MembersIndex.length; i++) {
                DeleteLi[MembersIndex[i]].parentNode.removeChild(DeleteLi[MembersIndex[i]]);
            }
            ChooseGroupUserList('UpdateGroupUsers');
        });

        $('.UpdateGroupBtn').bind('click', function () {
            var GroupUsersID = new Array();
            var ChoosedGroupEditor = $('#UpdateGroupUsers').tagEditor3parments('getTags')[0].editor;
            var GroupName = document.getElementsByClassName('UpdateGroupName')[0];
            if (GroupName.value == "") {
                GroupName.style.border = '2px solid darkred';
                console.log("Group Name is Null");
            } else {
                GroupName.style.border = '1px solid #ccc';
                $('li', ChoosedGroupEditor).each(function (index) {
                    var li = $(this);
                    var Length = (li.find('.tag-editor-tag')).length;
                    if (Length > 0) {
                        var id = (li.find('.tag-editor-tag'))[0].getAttribute('id');
                        var title = (li.find('.tag-editor-tag'))[0].getAttribute('data-original-title');
                        var value = (li.find('.tag-editor-tag'))[0].getAttribute('value');
                        GroupUsersID.push(id);
                    }
                });

                if (GroupUsersID.length == 0) {
                    /*没有填写用户列表怎么处理*/
                    console.log("Group Users ID is Null");
                } else {
                    var url = 'user_groups';
                    var Token = $.cookie('token');
                    var ID = $('.UpdateGroupName').attr('id');
                    var CreateUsersGroups = {
                        id: ID,
                        name: GroupName.value,
                        users: GroupUsersID
                    };

                    AjaxCreateGroups(url, 'PUT', CreateUsersGroups, Token);
                }
            }
        });

        $('.close').click(function () {
            $('#UpdateGroup').modal('hide');
            $('.GroupList ul li').remove();
        });
    });
}

function RemoveAllTags(ID) {
    var tags = $('#' + ID).tagEditor3parments('getTags')[0].tags;
    for (var i = 0; i < tags.length; i++) {
        $('#' + ID).tagEditor3parments('removeTag', tags[i]);
    }
}

function ChangeGroup(ID, NameClass, type) {
    var GroupUsersID = new Array();
    var ChoosedGroupEditor = $('#' + ID).tagEditor3parments('getTags')[0].editor;
    var GroupName = document.getElementsByClassName(NameClass)[0];
    if (GroupName.value == "") {
        GroupName.style.border = '2px solid darkred';
    } else {
        GroupName.style.border = '1px solid #ccc';
        $('li', ChoosedGroupEditor).each(function () {
            var li = $(this);
            var Length = (li.find('.tag-editor-tag')).length;
            if (Length > 0) {
                var id = (li.find('.tag-editor-tag'))[0].getAttribute('id');
                var title = (li.find('.tag-editor-tag'))[0].getAttribute('data-original-title');
                var value = (li.find('.tag-editor-tag'))[0].getAttribute('value');
                GroupUsersID.push(id);
            }
        });
        if (GroupUsersID.length == 0) {
            /*没有填写用户列表怎么处理*/

        } else {
            var url = 'user_groups';
            var Token = $.cookie('token');
            var CreateUsersGroups = {
                name: GroupName.value,
                users: GroupUsersID
            };
            AjaxCreateGroups(url, type, CreateUsersGroups, Token);
        }
    }
}

function ShowGroupList() {
    var url = 'user_groups/for_kpis';
    var Token = $.cookie('token');
    var Groups = AjaxGetList(url, 'GET', Token);

    for (var i = 0; i < Groups.length; i++) {
        var GroupName = Groups[i].user_group.name;
        var GroupId = Groups[i].user_group.id;
        var GroupMember = Groups[i].user_group.members;

        $('<div class="col-md-5 GroupListStyle"><div class="col-md-3 GroupNameStyle" data-toggle="tooltip" data-placement="bottom" title="' + GroupName + '" id="' + GroupId + '"><h4>' + GroupName + '</h4></div>' +
            '<div class="col-md-6 GroupMembersStyle" data-toggle="tooltip" data-placement="bottom" title="' + GroupMember + '">' + GroupMember + '</div>' +
            '<div class="col-md-3"><button class="BtnSubmit EditBtn"><i class="glyphicon glyphicon-edit"></i><span>Edit</span> </button></div></div>').appendTo('.RightContent>ul').ready(function () {
        });
    }
    $('[data-toggle="tooltip"]').tooltip();
}

function ValueIsNull(name) {
    if (name.value == "" || name.value == "undefined") {
        name.style.border = '3px solid brown';
        return false;
    } else {
        name.style.border = '1px solid #ccc';
        return true;
    }
}

function ManualBasicInformationWirte(KPIDate) {
    var BasicInformation = document.getElementsByClassName('NameAndInput');

    var ManualKPIName = BasicInformation[0].getElementsByTagName('input')[0];
    ManualKPIName.value = KPIDate.kpi.kpi_name;

    var ManualKPIDescription = BasicInformation[1].getElementsByTagName('input')[0];
    ManualKPIDescription.value = KPIDate.kpi.description;

    var ManualKPITargetMin = BasicInformation[2].getElementsByTagName('input')[0];
    ManualKPITargetMin.value = KPIDate.kpi.target_min;

    var ManualKPITargetMax = BasicInformation[3].getElementsByTagName('input')[0];
    ManualKPITargetMax.value = KPIDate.kpi.target_max;

    GetListWithFor(FrequencyList, 'manualdefaultfrequency');

    for (var i = 0; i < FrequencyList.length; i++) {
        if (KPIDate.kpi.frequency.id == FrequencyList[i].id) {
            $('#manualdefaultfrequency').find('option[value=' + FrequencyList[i].id + ']').attr('selected', true);
        }
    }

    GetListWithFor(UOMList, 'manualuom');
    for (var i = 0; i < UOMList.length; i++) {
        if (KPIDate.kpi.uom.id == UOMList[i].id) {
            $('#manualuom').find('option[value=' + UOMList[i].id + ']').attr('selected', true);
        }
    }

    GetListWithFor(CalculateList, 'manualcalculatemethod');
    for (var i = 0; i < CalculateList.length; i++) {
        if (KPIDate.kpi.calculate_method.id == CalculateList[i].id) {
            $('#manualcalculatemethod').find('option[value=' + CalculateList[i].id + ']').attr('selected', true);
        }
    }
}

function ShowAssignToWhoDiv(AssignmentID, UserID, UserEmail, UserName, Time, FrequencyID, FrequencyName, DepartmentID, DepartmentName, DepartmentDescription, AutoNotificationMsg, BellBackground) {
    $('<div class="ManualAssignToWho col-md-3" id="' + AssignmentID + '"> ' +
        '<div class="AssignInfo col-md-10">' +
        '<h5 id="' + AssignmentID + '">Assign To <strong id="' + UserID + '" data-toggle="tooltip" data-placement="top" title="' + UserEmail + '">' + UserName + '</strong></h5>' +
        '<h5 id="' + FrequencyID + '">' + Time + "&emsp;&emsp;" + FrequencyName + ' <span class="glyphicon glyphicon-bell" data-toggle="tooltip" data-placement="top" title="' + AutoNotificationMsg + '" style="margin-left: 20px;transform: rotate(30deg);color: ' + BellBackground + ';"></span></h5>' +
        '<h5 id="' + DepartmentID + '" title="' + DepartmentDescription + '" data-toggle="tooltip" data-placement="top">Department: &nbsp; <strong>' + DepartmentName + ' </strong></h5></div>' +
        '<button class="DeleteAssignBtn" id="DeleteBtn' + AssignmentID + '">Delete</button> ' +
        '</div>').appendTo('.ShowManualAssign').ready(function () {
    });

    $('[data-toggle="tooltip"]').tooltip();
}

function DeleteAssign() {
    $(".DeleteAssignBtn").each(function () {
        $(this).click(function () {
            ShowConfirmDialog((ClientHeight - 260) / 2, (ClientWidth - 400) / 2, (ClientHeight - 260) / 2, (ClientWidth - 400) / 2, 'block', 'Delete', 'Are you Sure?<br/><br/>Delete the Assign from this KPI', 'Cancel', 'Delete', '#f2f2f2');
            $('.ShowConfirmDialog').fadeIn(800);

            var url = 'kpis/assigns';
            var Token = $.cookie('token');
            var AssignmentID = $(this).parent().attr('id');

            $('.Cancel').click(function () {
                RemoveDialog('Masked');
                RemoveDialog('ShowConfirmDialog');
            });

            $('.Confirm').click(function () {
                AjaxDeleteAssign(url, 'DELETE', AssignmentID, Token);
            });
        });
    })
}

function GetAllAssignList(KPI_ID) {
    var url = "kpis/assigns";
    var Token = $.cookie('token');
    var AllAssignList = AjaxGetKPIDate(url, 'GET', KPI_ID, Token);
    if (AllAssignList.length > 0) {
        var SignalAssign = AllAssignList[i];
        var SignalAssignID = SignalAssign.assignment_id;
        var SignalAssignTime = SignalAssign.time;
        var SignalAssignFrequency = SignalAssign.frequency;
        var SignalAssignFrequencyID = SignalAssignFrequency.id;
        var SignalAssignFrequencyName = SignalAssignFrequency.name;

        var SignalAssignNotification = SignalAssign.auto_notification;

        var SignalAssignUser = SignalAssign.user;
        var SignalAssignUserID = SignalAssignUser.id;
        var SignalAssignUserName = SignalAssignUser.nick_name;
        var SignalAssignUserEmail = SignalAssignUser.email;
        /*department is hide*/

        var SignalAssignDepartment = SignalAssign.department;
        var SignalAssignDepartmentID = SignalAssignDepartment.id;
        var SignalAssignDepartmentName = SignalAssignDepartment.name;
        var SignalAssignDepartmentDescription = SignalAssignDepartment.description;
        /*parent_id  has_children members is hide*/

        var BellBackgroud = 'lightseagreen';
        if (SignalAssignNotification) {
            ShowAssignToWhoDiv(SignalAssignID, SignalAssignUserID, SignalAssignUserEmail, SignalAssignUserName, SignalAssignTime, SignalAssignFrequencyID, SignalAssignFrequencyName, SignalAssignDepartmentID,
                SignalAssignDepartmentName, SignalAssignDepartmentDescription, SignalAssignNotification, BellBackgroud);
        } else {
            BellBackgroud = 'darkred';
            ShowAssignToWhoDiv(SignalAssignID, SignalAssignUserID, SignalAssignUserEmail, SignalAssignUserName, SignalAssignTime, SignalAssignFrequencyID, SignalAssignFrequencyName, SignalAssignDepartmentID,
                SignalAssignDepartmentName, SignalAssignDepartmentDescription, SignalAssignNotification, BellBackgroud);
        }
    }
}