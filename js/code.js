

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
  
  if(val){
    setTimeout(sendForm,500,form);
    
  }
}
function sendForm(form){
  //alert("We will answer you as soon as posible\n(wink, wink)\n");
  //form.submit();
  $('#succesModal').modal();
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
  }
 }

 function lol(form){
  for (var i = 0; i < form.length; i++) {
    alert(form[i].type);
  }
 }
function clearForm(txtArray) {
  txtArray.forEach((e) => {
    e.value = "";
  });
}
