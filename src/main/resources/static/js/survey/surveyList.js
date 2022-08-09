// 비활성화 버튼 클릭 시
function btnSurveyActive(num, type) {
    if (type === 1) {
        swal({
            text: "이 설문지를 활성화하시겠습니까?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let sendData = {
                    "SM_PK" : num,
                }
                $.ajax({
                    url      : "/survey/changeactive",
                    data     : sendData,
                    type     : "GET",
                    success: function (result) {
                        const myPageQuery = new URLSearchParams(location.search);
                        var querydata = {
                            "page": myPageQuery.get('page'),
                            "selectKey": myPageQuery.get('selectKey'),
                            "titleText": myPageQuery.get('titleText')
                        };

                        $.ajax({
                            url: "/survey/querydsl",
                            data: querydata,
                            type: "POST",
                        }).done(function (fragment) {
                            $("#wangin_survey_list").replaceWith(fragment);
                        });

                        $.ajax({
                            url: "/survey/paging",
                            data: querydata,
                            type: "POST",
                        }).done(function (fragment) {
                            $("#pageList").replaceWith(fragment);
                        });

                        swal("변경완료", {
                            icon: "success",
                        });
                    },
                    error:function(request,status,error){
                        swal("서버오류입니다.", {
                            icon: "error",
                        });
                    }
                });
            }
        });
    } else if (type === 0) {
        swal({
            text: "이 설문지를 비활성화하시겠습니까?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let sendData = {
                    "SM_PK" : num,
                }
                $.ajax({
                    url      : "/survey/changeinactive",
                    data     : sendData,
                    type     : "GET",
                    success: function (result) {
                        const myPageQuery = new URLSearchParams(location.search);
                        var querydata = {
                            "page": myPageQuery.get('page'),
                            "selectKey": myPageQuery.get('selectKey'),
                            "titleText": myPageQuery.get('titleText')
                        };

                        $.ajax({
                            url: "/survey/querydsl",
                            data: querydata,
                            type: "POST",
                        }).done(function (fragment) {
                            $("#wangin_survey_list").replaceWith(fragment);
                        });

                        $.ajax({
                            url: "/survey/paging",
                            data: querydata,
                            type: "POST",
                        }).done(function (fragment) {
                            $("#pageList").replaceWith(fragment);
                        });

                        swal("변경완료", {
                            icon: "success",
                        });
                    },
                    error:function(request,status,error){
                        swal("서버오류입니다.", {
                            icon: "error",
                        });
                    }
                });
            }
        });
    }
}



// 페이지 번호 눌렀을 때
function paging(pageValue) {
    const myPageQuery = new URLSearchParams(location.search);
    var selectKey = "";
    var titleText = "";

    $('#load').show();

    //문자열 "null" 이 들어가는것 방지하기 위해 값이 null 이라면 공백 문자열 대입
    if (titleText == null) {
        titleText = "";
    }
    if (selectKey == null) {
        selectKey == "";
    }

    // 대입 끝

    //url 주소 바꾸기
    const params = {
        page: pageValue,
        selectKey: selectKey,
        titleText: titleText
    }
    const queryString = new URLSearchParams(params).toString();
    const replaceUri = location.pathname + '?' + queryString;
    history.pushState(null, '', replaceUri);
    //url 주소 바꾸기 끝


    var querydata = {
        "page": pageValue,
        "selectKey": selectKey,
        "titleText": titleText
    };


    $.ajax({
        url: "/survey/querydsl",
        data: querydata,
        type: "POST",
    }).done(function (fragment) {
        $("#wangin_survey_list").replaceWith(fragment);

    });

    $.ajax({
        url: "/survey/paging",
        data: querydata,
        type: "POST",
    }).done(function (fragment) {
        $("#pageList").replaceWith(fragment);
    });
}

//뒤로가면 전 주소값으로 이동하기
window.onpopstate = function (event) {
    console.log("popstate 실행됨");
    $(window).unbind('popstate')
    location.href = document.location;
};








function searching() {

    var selectKey = $('#selectKey').val();
    var titleText = $('#titleText').val();

    const params = {
        page: 0,
        selectKey: selectKey,
        titleText: titleText
    }

    const queryString = new URLSearchParams(params).toString();

    const replaceUri = location.pathname + '?' + queryString;


    history.pushState(null, '', replaceUri);
    console.log("replaceUri: " + replaceUri);
    console.log("queryString: " + queryString);

    //값 가져오기 (페이지네이션)
    const myPageQuery = new URLSearchParams(location.search);

    console.log(myPageQuery.get('page'));

    var querydata = {
        "page": myPageQuery.get('page'),
        "selectKey": myPageQuery.get('selectKey'),
        "titleText": myPageQuery.get('titleText')
    };

    $.ajax({
        url: "/querydsl",
        data: querydata,
        type: "POST",
    }).done(function (fragment) {
        $("#userlist").replaceWith(fragment);
    });

    $.ajax({
        url: "/paging",
        data: querydata,
        type: "POST",
    }).done(function (fragment) {
        $("#pageList").replaceWith(fragment);
    });
}

function enterkey() {
    if (window.event.keyCode == 13) {
        searching();
    }
}