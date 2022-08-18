const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get('id');

$("input:submit").click((e) => {
    e.preventDefault();
    

    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    const birth = $("#birth").val();
    const email = $("#email").val();
    const pseudo = $("#pseudo").val();
    const pwd = $("#pwd").val();
    const confirm = $("#confirm").val();   

    updateUser(firstname, lastname, birth, email, pseudo, pwd, confirm);
    
});

function updateUser(firstname, lastname, birth, email, pseudo, pwd, confirm) {

    $.ajax({
        url: "update_user.php",
        type: "POST",
        data: {
            choice: "update_user",
            firstname,
            lastname,
            birth,
            email,
            pseudo,
            pwd,
            confirm
        },
        dataType: 'json',
        success: (res, status) => {
            if (res.success) {
                alert("Vos informations ont été mise à jour !");
                window.location.replace("../homepage/homepage.html");
            } else alert("Erreur lors de la mise à jour de vos informations !")
        }
    })
}

function getUser(id) {

    $.ajax({
        url: "update_user.php",
        type: "GET",
        data: {
            choice: 'select_user',
            id
        },
        dataType: 'json',
        success: (res, status) => {
            if (res.success) {
                $("#firstname").val(res.infos.firstname);
                $("#lastname").val(res.infos.lastname);
                $("#birth").val(res.infos.date_birth);
                $("#email").val(res.infos.email);
                $("#pseudo").val(res.infos.login);
                $("#pwd").val(res.infos.passwd);
            }
        }
    })
}

user_id ? getUser(user_id) : alert('error');