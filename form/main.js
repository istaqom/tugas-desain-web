function setInputFilter(textbox) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function(event) {
        textbox.addEventListener(event, function(e) {
                if (["keydown","mousedown"].indexOf(e.type) >= 0){
                    this.classList.remove("input-error");
                } else if (this.value == "") {
                    this.classList.add("input-error");
                }
            });
    });
}

function setInputFilterNumber(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function(event) {
        textbox.addEventListener(event, function(e) {
        if (inputFilter(this.value)) {
            if (["keydown","mousedown","focusout"].indexOf(e.type) >= 0){
            this.classList.remove("input-error");
            }
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.classList.add("input-error");
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            this.value = "";
        }
        });
    });
}

setInputFilterNumber(document.getElementById("no_hp"), function(value) {
    return /^\+?\d*$/.test(value);
});

['nama', 'no_hp', 'email', 'barang', 'keluhan'].forEach(e => {
    setInputFilter(document.getElementById(e));
})

document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault();

    const nama_field = document.getElementById("nama");
    const no_hp_field = document.getElementById("no_hp");
    const email_field = document.getElementById("email");
    const barang_field = document.getElementById("barang");
    const keluhan_field = document.getElementById("keluhan");

    if (nama_field.value != "" && 
        no_hp_field.value != "" && 
        email_field.value != "" && 
        barang_field.value != "" && 
        keluhan_field.value != "") {
            document.getElementById("form").submit();
            return true;
        } else {
            ['nama', 'no_hp', 'email', 'barang', 'keluhan'].forEach(i => {
                const temp = document.getElementById(i);
                if (temp.value == "") {
                    temp.classList.add("input-error");
                    temp.focus();
                }
            })
        }

});