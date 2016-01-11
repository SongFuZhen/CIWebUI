/**
 * Created by zero on 2015/12/25.
 */

window.onload = function () {
    AjaxGetTopNavHtml('NavDemo.html', 'GET');

    var LeftNav = document.getElementsByClassName('LeftNav')[0];
    LeftNav.style.height = (ClientHeight - 60) + 'px';

    var ClientWidth = document.documentElement.clientWidth;
    var RightContent = document.getElementsByClassName('RightContent')[0];
    LoadAllKpis();
    var Kpis = document.getElementsByClassName('Kpis');
    if (Kpis.length > 0) {
        for (var i = 0; i < Kpis.length; i++) {
            Kpis[i].style.width = (ClientWidth - 280) + 'px';
        }
    }
};
/*

 window.onresize = function () {
 window.onload();
 };
 */

function LoadAllKpis() {
    var accessesurl = 'kpis/users/accesses';
    var Token = $.cookie('token');
    var Accesses = AjaxAccesses(accessesurl, 'GET', Token);

    for (var i = 0; i < Accesses.length; i++) {
        var users = Accesses[i].user;
        var kpi = Accesses[i].kpi;
        var department = Accesses[i].department;
        var follow_flag = Accesses[i].follow_flag;
        var follow_flag_value = Accesses[i].follow_flag_value;
        var is_created = Accesses[i].is_created;
        var is_managable = Accesses[i].is_managable;

        var signupurl = 'users/signuped';
        var SignedUsersInfo = AjaxUserSingUp(signupurl, 'POST', users.email, Token);

        $('<li><div class="Kpis"><table class="table"><tbody><tr>' +
            '<td style="border-right:1px solid #e0e0e0;"><h3 class="KpiName" id="' + kpi.kpi_id + '" title="' + kpi.kpi_name + '">' + kpi.kpi_name + '</h3></td>' +
            '<td style="border-right:1px solid #e0e0e0;margin-top:20px ;"><h3 class="KpiDescription" title="' + kpi.description + '">' + kpi.description + '</h3></td>' +
            '<td class="TargetMin"><h3 style="border-right:1px solid #e0e0e0;">' + kpi.target_min_text + '</h3></td>' +
            '<td class="TargetMax"><h3 style="border-right:1px solid #e0e0e0;">' + kpi.target_max_text + '</h3></td>' +
            '<td class="KpiCreator" style="border-right:1px solid #e0e0e0;"><h3 title="' + SignedUsersInfo.user.email + '">' + SignedUsersInfo.user.nick_name + '</h3></td>' +
            '<td><button class="BtnSubmit Follow"><i class="glyphicon glyphicon-plus"></i> Follow</button></td></tr>' +
            '<tr>' +
            '<td style="border-right:1px solid #e0e0e0;"><h5>KPI Name</h5></td>' +
            '<td style="border-right:1px solid #e0e0e0;"><h5 style="min-width: 340px;">Description</h5></td>' +
            '<td><h5 style="width: 60px;">Min</h5></td>' +
            '<td><h5 style="width:60px;">Max</h5></td>' +
            '<td style="border-right:1px solid #e0e0e0;"><h5>Creator</h5></td>' +
            '</tr>' +
            '</tbody></table></div></li>').appendTo('.RightContent>ul').ready(function () {
        });

        /*Judge Font Size*/
        if (kpi.kpi_name.length > 10) {
            var KpiName = document.getElementsByClassName('KpiName')[i];
            KpiName.style.fontSize = '.9em';
            KpiName.style.fontWeight = 'bold';
        }

        if (kpi.description.length > 50) {
            var KpiDescriptionFont = document.getElementsByClassName('KpiDescription')[i];
            KpiDescriptionFont.style.fontSize = '.9em';
            KpiDescriptionFont.style.fontWeight = 'bold';
        }
    }
}
