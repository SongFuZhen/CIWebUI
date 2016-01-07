/**
 * Created by zero on 2015/12/31.
 */
var labelType, useGradients, nativeTextSupport, animate;

(function () {
    var ua = navigator.userAgent,
        iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
        typeOfCanvas = typeof HTMLCanvasElement,
        nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
        textSupport = nativeCanvasSupport
            && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
    //I'm setting this based on the fact that ExCanvas provides text support for IE
    //and that as of today iPhone/iPad current text support is lame
    labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML';
    nativeTextSupport = labelType == 'Native';
    useGradients = nativeCanvasSupport;
    animate = !(iStuff || !nativeCanvasSupport);
})();

/*var Log = {
 elem: false,
 write: function(text){
 if (!this.elem)
 this.elem = document.getElementById('log');
 this.elem.innerHTML = text;
 this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
 }
 };*/


function init(url, type, AuthToken, JSON, Divname) {
    //init data
    /*var json = {
     id: "node02",
     name: "0.2",
     data: {},
     children: [{
     id: "node13",
     name: "1.3",
     data: {},
     children: [{
     id: "node24",
     name: "2.4",
     data: {},
     children: [{
     id: "node35",
     name: "3.5",
     data: {},
     children: [{
     id: "node46",
     name: "4.6",
     data: {},
     children: []
     }]
     }, {
     id: "node37",
     name: "3.7",
     data: {},
     children: [{
     id: "node48",
     name: "4.8",
     data: {},
     children: []
     }, {
     id: "node49",
     name: "4.9",
     data: {},
     children: []
     }, {
     id: "node410",
     name: "4.10",
     data: {},
     children: []
     }, {
     id: "node411",
     name: "4.11",
     data: {},
     children: []
     }]
     }, {
     id: "node312",
     name: "3.12",
     data: {},
     children: [{
     id: "node413",
     name: "4.13",
     data: {},
     children: []
     }]
     }, {
     id: "node314",
     name: "3.14",
     data: {},
     children: [{
     id: "node415",
     name: "4.15",
     data: {},
     children: []
     }, {
     id: "node416",
     name: "4.16",
     data: {},
     children: []
     }, {
     id: "node417",
     name: "4.17",
     data: {},
     children: []
     }, {
     id: "node418",
     name: "4.18",
     data: {},
     children: []
     }]
     }, {
     id: "node319",
     name: "3.19",
     data: {},
     children: [{
     id: "node420",
     name: "4.20",
     data: {},
     children: []
     }, {
     id: "node421",
     name: "4.21",
     data: {},
     children: []
     }]
     }]
     }, {
     id: "node222",
     name: "2.22",
     data: {},
     children: [{
     id: "node323",
     name: "3.23",
     data: {},
     children: [{
     id: "node424",
     name: "4.24",
     data: {},
     children: [{
     id: "node1125",
     name: "11.25"
     }]
     }]
     }]
     }]
     }, {
     id: "node125",
     name: "1.25",
     data: {},
     children: [{
     id: "node226",
     name: "2.26",
     data: {},
     children: [{
     id: "node327",
     name: "3.27",
     data: {},
     children: [{
     id: "node428",
     name: "4.28",
     data: {},
     children: []
     }, {
     id: "node429",
     name: "4.29",
     data: {},
     children: []
     }]
     }, {
     id: "node330",
     name: "3.30",
     data: {},
     children: [{
     id: "node431",
     name: "4.31",
     data: {},
     children: []
     }]
     }, {
     id: "node332",
     name: "3.32",
     data: {},
     children: [{
     id: "node433",
     name: "4.33",
     data: {},
     children: []
     }, {
     id: "node434",
     name: "4.34",
     data: {},
     children: []
     }, {
     id: "node435",
     name: "4.35",
     data: {},
     children: []
     }, {
     id: "node436",
     name: "4.36",
     data: {},
     children: []
     }]
     }]
     }, {
     id: "node237",
     name: "2.37",
     data: {},
     children: [{
     id: "node338",
     name: "3.38",
     data: {},
     children: [{
     id: "node439",
     name: "4.39",
     data: {},
     children: []
     }, {
     id: "node440",
     name: "4.40",
     data: {},
     children: []
     }, {
     id: "node441",
     name: "4.41",
     data: {},
     children: []
     }]
     }, {
     id: "node342",
     name: "3.42",
     data: {},
     children: [{
     id: "node443",
     name: "4.43",
     data: {},
     children: []
     }]
     }, {
     id: "node344",
     name: "3.44",
     data: {},
     children: [{
     id: "node445",
     name: "4.45",
     data: {},
     children: []
     }, {
     id: "node446",
     name: "4.46",
     data: {},
     children: []
     }, {
     id: "node447",
     name: "4.47",
     data: {},
     children: []
     }]
     }, {
     id: "node348",
     name: "3.48",
     data: {},
     children: [{
     id: "node449",
     name: "4.49",
     data: {},
     children: []
     }, {
     id: "node450",
     name: "4.50",
     data: {},
     children: []
     }, {
     id: "node451",
     name: "4.51",
     data: {},
     children: []
     }, {
     id: "node452",
     name: "4.52",
     data: {},
     children: []
     }, {
     id: "node453",
     name: "4.53",
     data: {},
     children: []
     }]
     }, {
     id: "node354",
     name: "3.54",
     data: {},
     children: [{
     id: "node455",
     name: "4.55",
     data: {},
     children: []
     }, {
     id: "node456",
     name: "4.56",
     data: {},
     children: []
     }, {
     id: "node457",
     name: "4.57",
     data: {},
     children: []
     }]
     }]
     }, {
     id: "node258",
     name: "2.58",
     data: {},
     children: [{
     id: "node359",
     name: "3.59",
     data: {},
     children: [{
     id: "node460",
     name: "4.60",
     data: {},
     children: []
     }, {
     id: "node461",
     name: "4.61",
     data: {},
     children: []
     }, {
     id: "node462",
     name: "4.62",
     data: {},
     children: []
     }, {
     id: "node463",
     name: "4.63",
     data: {},
     children: []
     }, {
     id: "node464",
     name: "4.64",
     data: {},
     children: []
     }]
     }]
     }]
     }, {
     id: "node165",
     name: "1.65",
     data: {},
     children: [{
     id: "node266",
     name: "2.66",
     data: {},
     children: [{
     id: "node367",
     name: "3.67",
     data: {},
     children: [{
     id: "node468",
     name: "4.68",
     data: {},
     children: []
     }, {
     id: "node469",
     name: "4.69",
     data: {},
     children: []
     }, {
     id: "node470",
     name: "4.70",
     data: {},
     children: []
     }, {
     id: "node471",
     name: "4.71",
     data: {},
     children: []
     }]
     }, {
     id: "node372",
     name: "3.72",
     data: {},
     children: [{
     id: "node473",
     name: "4.73",
     data: {},
     children: []
     }, {
     id: "node474",
     name: "4.74",
     data: {},
     children: []
     }, {
     id: "node475",
     name: "4.75",
     data: {},
     children: []
     }, {
     id: "node476",
     name: "4.76",
     data: {},
     children: []
     }]
     }, {
     id: "node377",
     name: "3.77",
     data: {},
     children: [{
     id: "node478",
     name: "4.78",
     data: {},
     children: []
     }, {
     id: "node479",
     name: "4.79",
     data: {},
     children: []
     }]
     }, {
     id: "node380",
     name: "3.80",
     data: {},
     children: [{
     id: "node481",
     name: "4.81",
     data: {},
     children: []
     }, {
     id: "node482",
     name: "4.82",
     data: {},
     children: []
     }]
     }]
     }, {
     id: "node283",
     name: "2.83",
     data: {},
     children: [{
     id: "node384",
     name: "3.84",
     data: {},
     children: [{
     id: "node485",
     name: "4.85",
     data: {},
     children: []
     }]
     }, {
     id: "node386",
     name: "3.86",
     data: {},
     children: [{
     id: "node487",
     name: "4.87",
     data: {},
     children: []
     }, {
     id: "node488",
     name: "4.88",
     data: {},
     children: []
     }, {
     id: "node489",
     name: "4.89",
     data: {},
     children: []
     }, {
     id: "node490",
     name: "4.90",
     data: {},
     children: []
     }, {
     id: "node491",
     name: "4.91",
     data: {},
     children: []
     }]
     }, {
     id: "node392",
     name: "3.92",
     data: {},
     children: [{
     id: "node493",
     name: "4.93",
     data: {},
     children: []
     }, {
     id: "node494",
     name: "4.94",
     data: {},
     children: []
     }, {
     id: "node495",
     name: "4.95",
     data: {},
     children: []
     }, {
     id: "node496",
     name: "4.96",
     data: {},
     children: []
     }]
     }, {
     id: "node397",
     name: "3.97",
     data: {},
     children: [{
     id: "node498",
     name: "4.98",
     data: {},
     children: []
     }]
     }, {
     id: "node399",
     name: "3.99",
     data: {},
     children: [{
     id: "node4100",
     name: "4.100",
     data: {},
     children: []
     }, {
     id: "node4101",
     name: "4.101",
     data: {},
     children: []
     }, {
     id: "node4102",
     name: "4.102",
     data: {},
     children: []
     }, {
     id: "node4103",
     name: "4.103",
     data: {},
     children: []
     }]
     }]
     }, {
     id: "node2104",
     name: "2.104",
     data: {},
     children: [{
     id: "node3105",
     name: "3.105",
     data: {},
     children: [{
     id: "node4106",
     name: "4.106",
     data: {},
     children: []
     }, {
     id: "node4107",
     name: "4.107",
     data: {},
     children: []
     }, {
     id: "node4108",
     name: "4.108",
     data: {},
     children: []
     }]
     }]
     }, {
     id: "node2109",
     name: "2.109",
     data: {},
     children: [{
     id: "node3110",
     name: "3.110",
     data: {},
     children: [{
     id: "node4111",
     name: "4.111",
     data: {},
     children: []
     }, {
     id: "node4112",
     name: "4.112",
     data: {},
     children: []
     }]
     }, {
     id: "node3113",
     name: "3.113",
     data: {},
     children: [{
     id: "node4114",
     name: "4.114",
     data: {},
     children: []
     }, {
     id: "node4115",
     name: "4.115",
     data: {},
     children: []
     }, {
     id: "node4116",
     name: "4.116",
     data: {},
     children: []
     }]
     }, {
     id: "node3117",
     name: "3.117",
     data: {},
     children: [{
     id: "node4118",
     name: "4.118",
     data: {},
     children: []
     }, {
     id: "node4119",
     name: "4.119",
     data: {},
     children: []
     }, {
     id: "node4120",
     name: "4.120",
     data: {},
     children: []
     }, {
     id: "node4121",
     name: "4.121",
     data: {},
     children: []
     }]
     }, {
     id: "node3122",
     name: "3.122",
     data: {},
     children: [{
     id: "node4123",
     name: "4.123",
     data: {},
     children: []
     }, {
     id: "node4124",
     name: "4.124",
     data: {},
     children: []
     }]
     }]
     }, {
     id: "node2125",
     name: "2.125",
     data: {},
     children: [{
     id: "node3126",
     name: "3.126",
     data: {},
     children: [{
     id: "node4127",
     name: "4.127",
     data: {},
     children: []
     }, {
     id: "node4128",
     name: "4.128",
     data: {},
     children: []
     }, {
     id: "node4129",
     name: "4.129",
     data: {},
     children: []
     }]
     }]
     }]
     }, {
     id: "node1130",
     name: "1.130",
     data: {},
     children: [{
     id: "node2131",
     name: "2.131",
     data: {},
     children: [{
     id: "node3132",
     name: "3.132",
     data: {},
     children: [{
     id: "node4133",
     name: "4.133",
     data: {},
     children: []
     }, {
     id: "node4134",
     name: "4.134",
     data: {},
     children: []
     }, {
     id: "node4135",
     name: "4.135",
     data: {},
     children: []
     }, {
     id: "node4136",
     name: "4.136",
     data: {},
     children: []
     }, {
     id: "node4137",
     name: "4.137",
     data: {},
     children: []
     }]
     }]
     }, {
     id: "node2138",
     name: "2.138",
     data: {},
     children: [{
     id: "node3139",
     name: "3.139",
     data: {},
     children: [{
     id: "node4140",
     name: "4.140",
     data: {},
     children: []
     }, {
     id: "node4141",
     name: "4.141",
     data: {},
     children: []
     }]
     }, {
     id: "node3142",
     name: "3.142",
     data: {},
     children: [{
     id: "node4143",
     name: "4.143",
     data: {},
     children: []
     }, {
     id: "node4144",
     name: "4.144",
     data: {},
     children: []
     }, {
     id: "node4145",
     name: "4.145",
     data: {},
     children: []
     }, {
     id: "node4146",
     name: "4.146",
     data: {},
     children: []
     }, {
     id: "node4147",
     name: "4.147",
     data: {},
     children: []
     }]
     }]
     }]
     }]
     };*/
    //end
    //init Spacetree
    var json = JSON;

    /*var json = {
     id: 'node1',
     name: 1,
     data: {},
     children: [{
     id: 'node2',
     name: 2,
     data: {},
     children: [{
     id: 'node4',
     name: 4,
     data: {},
     children: {}
     }]
     },
     {
     id: 'node3',
     name: 3,
     data: {},
     children: {}
     }]
     }*/
    //Create a new ST instance
    var st = new $jit.ST({
            //id of viz container element
            injectInto: Divname,
            //set duration for the animation
            duration: 500,
            //set animation transition type
            transition: $jit.Trans.Quart.easeInOut,
            //set distance between node and its children
            levelDistance: 50,
            //enable panning
            Navigation: {
                enable: true,
                panning: true
            },
            //set node and edge styles
            //set overridable=true for styling individual
            //nodes or edges
            Node: {
                /*height: 40,
                 width: 80,*/
                type: 'rectangle',
                color: '#aaa',
                overridable: true
            },

            Edge: {
                type: 'bezier',
                overridable: true
            },

            onBeforeCompute: function (node) {
                //Log.write("loading " + node.name);
                //Loading(0, 0, 0, 0, 'block');
            },

            onAfterCompute: function () {
                //Log.write("done");
                //var Loading = document.getElementById('Loading');
                //Loading.parentNode.removeChild(Loading);
            },

            //This method is called on DOM label creation.
            //Use this method to add event handlers and styles to
            //your node.

            onCreateLabel: function (label, node) {
                //set label styles
                var style = label.style;
                style.cursor = 'pointer';
                style.color = '#333';
                style.fontSize = '0.8em';
                //style.background = '#e0e0e0';
                //style.borderRadius = '3px';
                style.padding = '2px 4px 4px 0';
                style.minWidth = '60px';
                //style.textAlign = 'center';

                label.id = node.id;
                label.innerHTML = node.name;
                label.onclick = function () {
                    //if(normal.checked) {
                    st.onClick(node.id);
                    /*} else {
                     st.setRoot(node.id, 'animate');
                     }*/

                    console.log("Tree Click Node---->" + node.name);
                    var url = 'users/departments';
                    var Token = $.cookie('token');
                    //获取到子节点
                    var childjson = GetChildDepartment(url, 'GET', node.id, Token);
                    console.log("Get Tree---->" + childjson[0].department.name);
                    for (var i = 0; i < childjson.length; i++) {
                        var ChildrenJSON = new Array();
                        ChildrenJSON.push(childjson[i].department);
                        st.addNodeInPath(node.id);
                    }
                    /*显示Add Department和Users*/
                    var CloseAddTwo = document.getElementsByClassName('AddTwo');
                    for (var i = 0; i < CloseAddTwo.length; i++) {
                        //清除所有的AddTwo
                        CloseAddTwo[i].parentNode.removeChild(CloseAddTwo[i]);
                    }
                    /*显示AddTwo*/
                    var GetNodeID = document.getElementById(node.id);
                    AddTwo(GetNodeID);

                    var AddDepartmentOperate = document.getElementsByClassName('AddDepartment');
                    if (AddDepartmentOperate.length > 0) {
                        AddDepartmentOperate[0].onclick = function () {
                            DepartmentDialog(label);
                            var AddDepartmentDialog = document.getElementsByClassName('AddDepartmentDialog')[0];
                            var CancelBtn = AddDepartmentDialog.getElementsByTagName('button')[0];
                            CancelBtn.onclick = function () {
                                RemoveDialog('AddDepartmentDialog');
                            };

                            var AddBtn = AddDepartmentDialog.getElementsByTagName('button')[1];
                            AddBtn.onclick = function () {
                                var GetDepartmentName = AddDepartmentDialog.getElementsByTagName('input')[0].value;
                                var GetDepartmentDescription = AddDepartmentDialog.getElementsByTagName('textarea')[0].value;
                                var url = 'departments';
                                var Token = $.cookie('token');
                                AjaxAddDepartment(url, 'POST', GetDepartmentName, GetDepartmentDescription, node.id, Token);
                                //st.addNodeInPath(node.id);
                                console.log("Click Department" + '--->' + GetDepartmentName + '--->' + GetDepartmentDescription);
                            };
                        }
                    }
                };
            }
            ,

            //This method is called right before plotting
            //a node. It's useful for changing an individual node
            //style properties before plotting it.
            //The data properties prefixed with a dollar
            //sign will override the global node style properties.
            onBeforePlotNode: function (node) {
                //add some color to the nodes in the path between the
                //root node and the selected node.
                if (node.selected) {
                    node.data.$color = "#ff7";
                }
                else {
                    delete node.data.$color;
                    //if the node belongs to the last plotted level
                    if (!node.anySubnode("exist")) {
                        //count children number
                        var count = 0;
                        node.eachSubnode(function (n) {
                            count++;
                        });
                        //assign a node color based on
                        //how many children it has
                        /*set Color*/
                        //node.data.$color = ['#aaa', '#aaa', '#aaa', '#aaa', '#aaa', '#aaa'][count];
                    }
                }
            },

            //This method is called right before plotting
            //an edge. It's useful for changing an individual edge
            //style properties before plotting it.
            //Edge data proprties prefixed with a dollar sign will
            //override the Edge global style properties.
            onBeforePlotLine: function (adj) {
                if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                    adj.data.$color = "#eed";
                    adj.data.$lineWidth = 3;
                }
                else {
                    delete adj.data.$color;
                    delete adj.data.$lineWidth;
                }
            }
        })
        ;
    //load json data
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    //emulate a click on the root node.
    st.onClick(st.root);
}

function AddTwo(label) {
    var AddTwo = document.createElement('div');
    AddTwo.style.position = 'absolute';
    AddTwo.style.display = 'block';
    AddTwo.style.left = '-65px';
    AddTwo.style.top = '30px';
    AddTwo.style.width = '200px';
    AddTwo.style.height = '40px';
    //AddTwo.style.background = '#000'
    AddTwo.setAttribute('class', 'AddTwo');
    label.appendChild(AddTwo);


    var AddDepartment = document.createElement('div');
    AddDepartment.style.position = 'absolute';
    AddDepartment.style.display = 'block';
    AddDepartment.style.left = '10px';
    AddDepartment.innerHTML = '<i class="glyphicon glyphicon-plus-sign"></i> <em>Department</em>';
    AddDepartment.style.color = '#23527C';
    AddDepartment.setAttribute('class', 'AddDepartment');
    AddTwo.appendChild(AddDepartment);

    var AddUsers = document.createElement('div');
    AddUsers.style.position = 'absolute';
    AddUsers.style.display = 'block';
    AddUsers.style.left = '130px';
    AddUsers.innerHTML = '<i class="glyphicon glyphicon-eye-open"><i/> <em>Users</em>';
    AddUsers.style.color = '#23527C';
    AddUsers.setAttribute('class', 'AddUsers');
    AddTwo.appendChild(AddUsers);
}

function DepartmentDialog(label) {
    var DepartmentDialog = document.createElement('div');
    var Style = DepartmentDialog.style;
    Style.position = 'absolute';
    Style.top = '50px';
    Style.left = '-200px';
    Style.borderRadius = '3px';
    Style.zIndex = '1000';
    Style.display = 'block';
    Style.width = '300px';
    Style.height = '220px';
    Style.background = '#e0e0e0';
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
    DepartmentDialog.appendChild(Description);


    var Cancel = document.createElement('button');
    var CancelStyle = Cancel.style;
    CancelStyle.position = 'absolute';
    CancelStyle.top = '180px';
    CancelStyle.left = '50px';
    CancelStyle.display = 'block';
    Cancel.innerHTML = 'Cancel';
    Cancel.setAttribute('class', 'BtnSubmit');
    DepartmentDialog.appendChild(Cancel);

    var Confirm = document.createElement('button');
    var ConfirmStyle = Confirm.style;
    ConfirmStyle.position = 'absolute';
    ConfirmStyle.top = '180px';
    ConfirmStyle.left = '180px';
    ConfirmStyle.display = 'block';
    Confirm.setAttribute('class', 'BtnSubmit');
    Confirm.innerHTML = 'Add';
    ConfirmStyle.padding = '-10px 0 0 0';
    DepartmentDialog.appendChild(Confirm);
}