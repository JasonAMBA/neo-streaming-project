const urlParams = new URLSearchParams(window.location.search);
const episode_id = urlParams.get('id');



function getEpisode(id) {

    $.ajax({
        url: "episode.php",
        type: "GET",
        data: {
            choice: "episode",
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                let ep = '';

                res.episodes.forEach(episode => {
                    ep += "<div>" +
                    "<h4> episode" + " " + episode.number_episode + " : " + episode.titre_episode + "</h4>" +
                    "<iframe src='" + episode.video + " ' WIDTH=800 HEIGHT=600 allowfullscreen>" + "</iframe>" +
                    "</div>"
                });

                $('#episode').append(ep);
            }
        }
    })
}

episode_id ? getEpisode(episode_id) : alert('error');

if (localStorage.getItem('user')) {
    $('#historical').css("display", "block");
} else $('#historical').css("display", "none");

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

$.ajax({
    url: "../watch/watch.php",
    type: "GET",
    data: {
        choice: 'select_id'
    },
    dataType: 'json',
    success: (res, status) => {
        if (res.success) {
            let hist = '';

            res.ids.forEach(id => {
                hist += "<a href='../watch/watch.html?id=" + id.id_user + "'>" + "<h2> Historique </h2>" + "</a>"
            });

            $('#historical').append(hist);
        } else alert("erreur lors de l'ajout de l'historique !")
    }
});

if (localStorage.getItem('user')) {
    $('#historical').css("display", "block");
} else $('#historical').css("display", "none");



if (JSON.parse(localStorage.getItem('user')).is_admin == 1) {
    $("#redirection").prop("href", "../admin/admin.html");
}

$.ajax({
    url: "../watch/watch.php",
    type: "POST",
    data: {
        choice: 'insert',
        episode_id
    },
    dataType: "json",
    success:(res, status) => {
        if (res.success) {
            alert("Episode ajouté à votre historique !")
        } else alert("Erreur lors de l'ajout");
    }
})