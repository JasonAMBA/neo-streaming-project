const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get('id');

function getUser(id) {
    
    $.ajax({
        url: "watch.php",
        type: "GET",
        data:{
            choice: 'select',
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                let episodes = '';

                res.historicals.forEach(historical => {
                    episodes += "<div>" +
                        "<h5> le " + historical.date + " à "+ historical.time + "</h5>" +
                        "<p>" + historical.manga + " Episode " + historical.number_episode + " : " + historical.titre_episode + "</p>" + "<hr>" +
                        "</div>"
                });

                $('#episodes').append(episodes);
            }
        }
    })
}

user_id ? getUser(user_id) : alert('error');

$('#deco').click((e) => {
    e.preventDefault();
    $.ajax({
        url: "../logout/logout.php",
        type: "GET",
        data: {

        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                localStorage.removeItem('user');
                window.location.replace("../homepage/homepage.html")
            } else alert("erreur")
        }
    })
})

if (localStorage.getItem('user')) {
    $('#deco').css("display", "block");
} else $('#deco').css("display", "none");

function wantToDelete(id) {
    const wantTo = confirm("Voulez-vous vraiment supprimer votre historique ?");

    if (wantTo) {
        $.ajax({
            url: "../watch/watch.php",
            type: "POST",
            data: {
                choice: 'delete',
                user_id
            },
            dataType: "json",
            success: (res, status) => {
                if (res.success) {
                    $(id).remove();
                    alert("Votre historique a bien été supprimé ! Veuillez recharger la page !");

                }
            }
        });
    }
}

if (JSON.parse(localStorage.getItem('user')).is_admin == 1) {
    $("#redirection").prop("href", "../admin/admin.html");
}