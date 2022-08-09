const userId = document.getElementById("userid");
const userPw = document.getElementById("userpw");
const userAge = document.getElementById("userage");
const userName = document.getElementById("username");
const userPhone = document.getElementById("userphone");
const btnJoin = document.getElementById("btnjoin");

userId.addEventListener("change", event => {
    noSpaceForm(userId);
});
userId.addEventListener("keyup", event => {
    noSpaceForm(userId);
});

userPw.addEventListener("change", event => {
    noSpaceForm(userPw);
});
userPw.addEventListener("keyup", event => {
    noSpaceForm(userPw);
});

btnJoin.addEventListener("click", handlerLogin);

function enterkey(){
    if(window.event.keyCode == 13){
        handlerLogin();
    }
}

function handlerLogin() {
    if (userId.value === null || userId.value === "") {
        swal({
            title: "아이디를 입력하세요.",
            icon: "info",
            button: "확인"
        });
        return false;
    } else if (userPw.value === null || userPw.value === "") {
        swal({
            title: "비밀번호를 입력하세요.",
            icon: "info",
            button: "확인"
        });
        return false;
    } else if (userName.value === null || userName.value === "") {
         swal({
             title: "이름을 입력하세요.",
             icon: "info",
             button: "확인"
         });
         return false;
    } else if (userAge.value === null || userAge.value === "") {
         swal({
             title: "나이를 입력하세요.",
             icon: "info",
             button: "확인"
         });
         return false;
    } else if (userPhone.value === null || userPhone.value === "") {
         swal({
             title: "전화번호를 입력하세요.",
             icon: "info",
             button: "확인"
         });
         return false;
     }else {
        $('#load').show();
        let sendData = {
            "userid" : userId.value,
            "userpw" : userPw.value,
            "userAge" : userAge.value,
            "userName" : userName.value,
            "userPhone" : userPhone.value
        };
        $.ajax({
            url      : "/join/userjoin",
            data     : sendData,
            type     : "POST",
            success : function(result) {
                    location.href = "/";
                },
            error:function(request,status,error){
                $('#load').hide();
                swal({
                    text: "회원가입 도중 서버에 문제가 발생했습니다.",
                    icon: "warning" //"info,success,warning,error" 중 택1
                });
            }
        });
    }
};

//공백입력막기
function noSpaceForm(obj) {
    let str_space = /\s/;
    if (str_space.exec(obj.value)) {
        swal({
            title: "공백을 사용할 수 없습니다.",
            icon: "error",
            button: "확인"
        });
        obj.focus();
        obj.value = obj.value.replace(' ', '');
        return false;
    }
}