const userName = document.getElementById("username");
const userMa = document.getElementById("userma");
const userEn = document.getElementById("useren");
const userKo = document.getElementById("userko");
const userSi = document.getElementById("usersi");
const btnins = document.getElementById("btnins");

userName.addEventListener("change", event => {
    noSpaceForm(userName);
});
userName.addEventListener("keyup", event => {
    noSpaceForm(userName);
});

userMa.addEventListener("change", event => {
    noSpaceForm(userMa);
});
userMa.addEventListener("keyup", event => {
    noSpaceForm(userMa);
});

userEn.addEventListener("change", event => {
    noSpaceForm(userEn);
});
userEn.addEventListener("keyup", event => {
    noSpaceForm(userEn);
});

userKo.addEventListener("change", event => {
    noSpaceForm(userKo);
});
userKo.addEventListener("keyup", event => {
    noSpaceForm(userKo);
});

userSi.addEventListener("change", event => {
    noSpaceForm(userSi);
});
userSi.addEventListener("keyup", event => {
    noSpaceForm(userSi);
});


btnins.addEventListener("click", handlerLogin);

function enterkey(){
    if(window.event.keyCode == 13){
        handlerLogin();
    }
}

function handlerLogin() {
    if (userName.value === null || userName.value === "") {
        swal({
            title: "이름을 입력하세요.",
            icon: "info",
            button: "확인"
        });
        return false;
    }else if (userMa.value === null || userMa.value === "") {
        swal({
            title: "점수를 입력하세요.",
            icon: "info",
            button: "확인"
        });
        return false;
    } else if (userEn.value === null || userEn.value === "") {
        swal({
            title: "점수를 입력하세요.",
            icon: "info",
            button: "확인"
        });
        return false;
    } else if (userKo.value === null || userKo.value === "") {
         swal({
             title: "점수를 입력하세요.",
             icon: "info",
             button: "확인"
         });
         return false;
    } else if (userSi.value === null || userSi.value === "") {
         swal({
             title: "점수를 입력하세요.",
             icon: "info",
             button: "확인"
         });
         return false;
    }else {
        $('#load').show();
        let sendData = {
            "username" : userName.value,
            "userma" : userMa.value,
            "useren" : userEn.value,
            "userko" : userKo.value,
            "usersi" : userSi.value
        };
        $.ajax({
            url      : "/modify",
            data     : sendData,
            type     : "POST",
            success : function(result) {
                    location.href = "/user";
                },
            error : function(request,status,error){
                $('#load').hide();
                swal({
                    text: "성적입력 도중 서버에 문제가 발생했습니다.",
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
};