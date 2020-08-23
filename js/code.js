

$(document).ready(function () {
  $('[data-toggle="popover"]').popover();
});

function checkWithRegularExpression(txt, expression) {
  if (txt.value.match(expression)) {
    return isvalid(txt, true);
  } else {
    return isvalid(txt, false);
  }
}

function checkPhoneNumber(txt) {
  var phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return checkWithRegularExpression(txt, phone);
}
function checkCCV(txt) {
  var ccv = /^[0-9]{3}$/;
  return checkWithRegularExpression(txt, ccv);
}
function checkCC(txt) {
  var ccv = /^\(?([0-9]{4})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})?[-. ]?([0-9]{4})$/;
  return checkWithRegularExpression(txt, ccv);
}
function checkEmail(txt) {
  var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return checkWithRegularExpression(txt, email);
}

function checkEmpty(txt) {
  if (txt.value === "") {
    return isvalid(txt, false);
  } else {
    return isvalid(txt, true);
  }
}
function isvalid(txt, valid) {
  if (valid) {
    txt.classList.remove("is-invalid");
    txt.classList.add("is-valid");
    return true;
  } else {
    txt.classList.remove("is-valid");
    txt.classList.add("is-invalid");
    return false;
  }
}

function validateForm(form) {
  var val = true;
  for (var i = 0; i < form.length; i++) {
    val &= checkEmpty(form[i]);
    switch (form[i].name) {
      case "txtPhone":
        val &= checkPhoneNumber(form[i]);
        break;
      case "txtEmail":
        val &= checkEmail(form[i]);
        break;
    }
  }

  if (val) {
    setTimeout(sendForm, 500, form,'#succesModal');
  }
}
function sendForm(form,modalName) {
  //alert("We will answer you as soon as posible\n(wink, wink)\n");
  //form.submit();
  $(modalName).modal();
  resetForm(form);
}
function resetForm(form) {
  for (var i = 0; i < form.length; i++) {
    if (
      !(form[i].type === "button") &&
      !(form[i].type === "submit") &&
      !(form[i].type === "reset") &&
      !(form[i].type === "radio") &&
      !(form[i].type === "select-one") &&
      !(form[i].type === "checkbox")
    ) {
      form[i].value = "";
      form[i].classList.remove("is-invalid");
      form[i].classList.remove("is-valid");
    }
    if ((form[i].type === "checkbox")) {
      form[i].checked = false;
      form[i].classList.remove("is-invalid");
      form[i].classList.remove("is-valid");
    }
    if ((form[i].type === "radio")) {
      form[i].checked = false;
      form[i].classList.remove("is-invalid");
      form[i].classList.remove("is-valid");
    }
    if((form[i].type === "select-one")){
      form[i].selectedIndex = 0;
      form[i].classList.remove("is-invalid");
      form[i].classList.remove("is-valid");
    }
  }
}

function validatePayment(form) {
  var val = true;
  var rsltRbtn = validateRadiobtn(form.ccRadioOptions);
  val &= rsltRbtn[0];
  val &= validateCheckbtn(form.agreeChckBtn)
  val &= validateDate([form.cYear, form.cMonth]);
  val &= checkCCV(form.ccv);
  val &= checkCC(form.cc);
  val &= checkEmail(form.user_email);
  var userInfo = form.user_info;
  for(i = 0; i < userInfo.length; i++){
    val &= checkEmpty(userInfo[i]);
  }
  if(val){
    document.getElementById("uName").innerHTML = userInfo[0].value;
    document.getElementById("uCCT").innerHTML = rsltRbtn[1];
    document.getElementById("CCN").innerHTML = form.cc.value.slice(12, 16);
    document.getElementById("uEmail").innerHTML = form.user_email.value;
    document.getElementById("uAdd").innerHTML = userInfo[1].value;
    setTimeout(sendForm, 500, form,'#succesPayment');
  }
}

function validateDate(cardDate) {
  var date = new Date(parseInt(cardDate[0].value), (parseInt(cardDate[1].value) - 1));
  if (new Date() > date) {
    isvalid(cardDate[0], false);
    return isvalid(cardDate[1], false);
  } else {
    isvalid(cardDate[0], true);
    return isvalid(cardDate[1], true);
  }
}
function validateCheckbtn(checkbtns) {

  if (checkbtns.checked == true) {
    return isvalid(checkbtns, true);
  } else {
    return isvalid(checkbtns, false);
  }
}
function validateRadiobtn(radiobtns) {
  for (var i = 0; i < radiobtns.length; i++) {
    if ((radiobtns[i].checked == true)) {
      return [isvalid(radiobtns[2], true), radiobtns[i].value];
    }
  }
  return [isvalid(radiobtns[2], false), null];
}
function clearForm(txtArray) {
  txtArray.forEach((e) => {
    e.value = "";
  });
}
