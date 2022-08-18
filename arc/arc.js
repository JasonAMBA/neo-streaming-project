const urlParams = new URLSearchParams(window.location.search);
const arc_id = urlParams.get('id');

function getArc(id) {

    $.ajax({
        url: "arc.php",
        type: "GET",
        data: {
            choice: "arc",
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                let arc = '';

                res.infos.forEach(info => {
                    arc += "<div>" +  
                        "<h4> Arc" + " " + info.arc_number + " " + ": " + info.name_arc + "</h4>" +
                        "<img src='" + "../mangas/" + info.picture + "'>" +
                        "</div>" +

                        "<div>" +
                        "<h4> Synopsis </h4>" +
                        "<p>" + info.synopsis + "</p>"
                });

                $('#arc').append(arc);
            }
        }
    })
}

arc_id ? getArc(arc_id) : alert('error');

function getEpisode(id) {

    $.ajax({
        url: "arc.php",
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
                    "<button>" + "<a href='../episode/episode.html?id=" + episode.id_episode + "'>" + "<h4> Episode" + " " + episode.number_episode +  "</h4>" + "</a>" + "</button>" +
                    "</div>"
                });

                $('#episode').append(ep);
            }
        }
    })
}

arc_id ? getEpisode(arc_id) : alert('error');

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