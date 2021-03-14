
function recherche(jeu){
    jeu = jeu.replace(/ /gi, "-"); // remplacement global
    jeu = jeu.replace(/:/gi, ""); // remplacement global
    jeu = jeu.toLowerCase();

        fetch("data.php") // sécurise rien du tout vis à vis de la clé API, trouver autre méthode
            .then((response) => response.json())
            .then ((json) =>{
                var api = json
                //console.log(api)
            })

    $.ajax({
        url: 'https://api.rawg.io/api/games/'+ jeu,
        data: {
            key: '',
            userAgent: navigator.userAgent,
        },
        dataType: 'json',
        success: function(apiResponse) {
            if (apiResponse.redirect == true){ //si le jeu existe mais sous un autre nom, genre Street Fighter V et Street Fighter 5, ou FF7 pour Final Fantasy 7
                return recherche(apiResponse.slug)
            }
            var plateformes = ""
            var devJeu = ""
            var genres = ""
            var editeurs = ""
            var videoJeu = ""
            for (const key in apiResponse.platforms) {
                if (apiResponse.platforms.hasOwnProperty(key)) {
                    plateformes += apiResponse.platforms[key].platform.name + " "
                }
            }

            for (const key in apiResponse.developers) {
                if (apiResponse.developers.hasOwnProperty(key)) {
                    devJeu += apiResponse.developers[key].name + " "
                }
            }

            for (const key in apiResponse.genres) {
                if (apiResponse.genres.hasOwnProperty(key)) {
                    genres += apiResponse.genres[key].name + " "
                }
            }

            for (const key in apiResponse.publishers) {
                if (apiResponse.publishers.hasOwnProperty(key)) {
                    editeurs += apiResponse.publishers[key].name + " "
                }
            }

            if (apiResponse.clip != null){
               videoJeu = ('<video width="480" height="360" controls>' +
                '<source src="' + apiResponse.clip.clip + '"' + '</video>')
            } 
            console.log(plateformes)
            $("#result").html(
                "Nom du jeu : " + apiResponse.name + "<br>" +
                "Développé par : " + devJeu + "<br>" +
                "Edité par : " + editeurs + "<br>" +
                "Sorti le : " + apiResponse.released + "<br>" +
                "Description : " + apiResponse.description + "<br>" +
                "Genres : " + genres + "<br>" +
                "Plate-formes : " + plateformes + "<br>" +
                "<img class='imageJeu' src ='" + apiResponse.background_image + "'alt='Jeu'>" +
                "<img class='imageJeu' src ='" + apiResponse.background_image_additional + "'alt='Jeu'>" + "<br>" +
                videoJeu
            )
            console.log(navigator.userAgent)
        },
        error: function(apiResponse) {
            $("#result").html(
                "Le jeu n'existe pas"
            )
        }
    });
}

$("#validation").click(function(){
    recherche($(".jeu").val())
})

$('.jeu').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        recherche($(".jeu").val()) 
    }
})