$.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=0vShAj4vExecSTKefNSBVZ03Y28edndFF4Oj8Y3L", function(data) {
    let photoPath = data.photos[0].img_src;
    let mainPhoto = $('<img class="main-image" src="' + photoPath + '" alt="photo-of-the-day">');
    $("#image-of-a-day").append(mainPhoto);
});

$("#submit-form").on("click", function(event) {
    event.preventDefault();
    let currentRover = $("#rover-name").val();
    let earthDate = $("#earth-date").val().trim();
    let cameraName = $("#camera").val();
    if (isEmpty(earthDate)) {
        let errorText = ("Ошибка: Введите дату!");
        $("#error").text(errorText).css("text-transform", "uppercase");
    } else {
        if (currentRover === "Curiosity" && cameraName === "PANCAM") {
            let errorText = ("У Curiosity такой камеры нет, выберите другую!");
            $("#error").text(errorText).css("text-transform", "uppercase");
        } else {
            if (currentRover !== "Curiosity" && cameraName === "MAST") {
                let errorText = ("Камера на мачте есть только у Curiosity!");
                $("#error").text(errorText).css("text-transform", "uppercase");
            } else {
                $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${currentRover}/photos?earth_date=${earthDate}&camera=${cameraName}&api_key=0vShAj4vExecSTKefNSBVZ03Y28edndFF4Oj8Y3L`, function(data) {
                    let photos = data.photos;
                    if (isEmpty(data.photos)) {
                        let errorText = ("Фотографий нет");
                        $("#message").text(errorText).css("text-transform", "uppercase");
                    } else {
                        photos.forEach(element => {
                            let photoPath = element.img_src;
                            let smallPhoto = $('<div class="image-column"><div class="image-column-block"><div class="image-small-box"><img class="small-image" src="' + photoPath + '" alt="photo"></div></div></div>');
                            $("#images-row").append(smallPhoto);
                        });
                    }
                });

                $("#images-container").css("display", "block");
                $("#start-page").css("display", "none");
            }
        }
    }
});

$("#info-manifest").on("click", function(event) {

    let buttonAction = $("#info-manifest").text();
    if (buttonAction === "Справка") {
        $("#info").css("display", "block");
        $("#info-manifest").text("Скрыть");
        $(".tiny-logo").css("display", "none");
    } else {
        $("#info").css("display", "none");
        $("#info-manifest").text("Справка");
        $(".tiny-logo").css("display", "block");
    }
});

$("#submit-manifest").on("click", function(event) {
    event.preventDefault();
    let currentRover = $("#rover-name-manifest").val();
    $.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${currentRover}?api_key=0vShAj4vExecSTKefNSBVZ03Y28edndFF4Oj8Y3L`, function(data) {
        let roverManifest = data.photo_manifest;
        let roverName = roverManifest.name;
        if (roverName === "Spirit") {
            $("#name").text(roverManifest.name + ' ("Дух")');
        }
        if (roverName === "Curiosity") {
            $("#name").text(roverManifest.name + ' ("Любопытство")');
        }
        if (roverName === "Opportunity") {
            $("#name").text(roverManifest.name + ' ("Возможность")');
        }

        $("#landing-date").text(roverManifest.landing_date);
        $("#launch-date").text(roverManifest.launch_date);
        $("#max-date").text(roverManifest.max_date);
        $("#total-photos").text(roverManifest.total_photos);
        let statusText = roverManifest.status;
        if (statusText === "complete") {
            $("#status").text("завершена");
        } else {
            $("#status").text("активна");
        }
    });
});

$("#back").on("click", function(event) {
    location.reload();
});

function isEmpty(string) {
    return (!string || string.length === 0);
};