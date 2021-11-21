var reg_username = /^[a-zA-Z]\w{2,12}$/; // not sure use 2 or 3
var reg_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[*\d])(?=.*[$@$!%*#?&])[^]{8,20}$/; // not sure use 8 or 7

//check vaild when user left enter. 
/* document.onload = function() {
    document.getElementById("username").onblur = checkUsername;
    document.getElementById("password").onblur = checkPassword;
    document.getElementById("passwordR").onblur = checkPasswordRe;
    return checkUsername() && checkPassword() && checkPasswordRe();
}; */

function checkUsername() {
    var username = document.getElementById("Username").value;
    var flag = reg_username.test(username);
    var s_username = document.getElementById("s_username");
    if (flag) {
        s_username.innerHTML = "<img width='25' height='15' src='public\image\CHECK.png'/>";
    } else {
        s_username.innerHTML = "Wrong Format! Pleas enter username have 3-20 digit letter or number";
    }
    return flag;
}

function checkPassword() {
    var password = document.getElementById("Password").value;
    var reg_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[*\d])(?=.*['/'*-+!@#$^&*])[^]{8,20}$/;
    var flag = reg_password.test(password);
    var s_password = document.getElementById("s_password");
    if (flag) {
        s_password.innerHTML = "<img width='25' height='15' src='pubilc/image/CHECK.png'/>";
    } else {
        s_password.innerHTML = "Wrong Format! Pleas enter username with 8-20 digit and having at less one upper, lower, number, and symbol";
    }
    return flag;
}

function checkPasswordRe() {
    var passwordR = document.getElementById("PasswordR").value;
    var password = document.getElementById("Password").value;
    var s_passwordR = document.getElementById("s_passwordR");
    var same = (passwordR == password);
    if (same) {
        s_passwordR.innerHTML = "<img width='25' height='15' src='css/resources/CHECK.png'/>";
    } else {
        s_passwordR.innerHTML = "enter not match!"
    }
    return same;
}

//used requrie
function checkCheckBoxes() {
    var s_age = document.getElementById("s_age").value;
    var s_TOS = document.getElementById("s_TOS").value;
    var s_PrivacyRules = document.getElementById("s_PrivacyRules").value;
    var CheckBoxStatic = true;
    if (!document.getElementById("age").checked) {
        s_age.innerHTML = "Must be checked!";
        CheckBoxStatic = false;
    } else {
        s_age.innerHTML = "";
    }

    if (!document.getElementById("TOS").checked) {
        s_TOS.innerHTML = "Must be checked!";
        CheckBoxStatic = false;
    } else {
        s_TOS.innerHTML = "";
    }

    if (!document.getElementById("PrivacyRules").checked) {
        s_PrivacyRules.innerHTML = "Must be checked!";
        CheckBoxStatic = false;
    } else {
        s_PrivacyRules.innerHTML = "";
    }

    return CheckBoxStatic;
}

//unuseful
function Fsumbition() {
    var static = checkUsername() && checkPassword() && checkPasswordRe();
    var s_PrivacyRules = document.getElementById("s_PrivacyRules").value;
    s_PrivacyRules.innerHTML = static;
    if (static) {
        alert("Well done!");
    } else {
        alert("Fail");
    }
    return false;
}

//if username, password and comfirm meet requirement, sumbit it(and to next page); else nothing happen
function fromSubmition() {
    return checkUsername() && checkPassword() && checkPasswordRe();
}

let registerPage = document.getElementById('regist');
if (registerPage) {
    setFlashMessageFadeOut();
}