$("#register").click((e) => {
    e.preventDefault();

    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    const birth = $("#birth").val();
    const email = $("#email").val();
    const pseudo = $("#pseudo").val();
    const pwd = $("#pwd").val();
    const confirm = $("#confirm").val();

    if (
        firstname.trim() != '' &&
        lastname.trim() != '' &&
        birth.trim() != '' &&
        email.trim() != '' &&
        pseudo.trim() != '' &&
        pwd.trim() != '' &&
        confirm.trim() != '' 
    ) {

        $.ajax({
            url: "register.php",
            type: "POST",
            data: {
                firstname,
                lastname,
                birth,
                email,
                pseudo,
                pwd,
                confirm
            },
            dataType: "json",
            success: (res, status) => {
                if (res.success) {
                    alert("Tu es inscrit, bienvenue!")
                    window.location.replace("../login/login.html")
                } else alert("Tout les champs n'ont pas été renseignés");
            }
        })
    }
})