$(document).ready(function () {
  $(".photo[data-full-img]").each(function () {
    const el = $(this);
    const icon = document.createElement("img");
    icon.setAttribute("src", "/assets/img/icons/zoom.svg");

    const button = document.createElement("button");
    button.setAttribute("class", "btn-img-full-screen");
    button.appendChild(icon);

    button.addEventListener("click", function () {
      const url = this.parentNode.getAttribute("data-full-img");
      window.open(url, "_blank");
    });

    this.appendChild(button);
  });

  function closeNav() {
    const nav = $("#float-menu-nav");
    nav.slideUp(200);
    nav.attr("aria-hidden", "true");
  }

  function openNav() {
    const nav = $("#float-menu-nav");
    nav.slideDown(200);
    nav.attr("aria-hidden", "false");
  }

  $("#float-menu-trigger").on("click", function () {
    const nav = $("#float-menu-nav");
    nav.attr("aria-hidden") === "true" ? openNav() : closeNav();
  });

  $("#float-menu-nav a").on("click", closeNav);
});

function loadMap(id, cords, zoom, pins) {
  var map = L.map(id).setView(cords, zoom || 13);
  map.scrollWheelZoom.disable();

  // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri",
    }
  ).addTo(map);

  var pin = L.icon({
    iconUrl: "/assets/img/icons/pin.svg",
    shadowUrl: "/assets/img/icons/pin.svg",

    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  pin.options.shadowSize = [0, 0];

  pins.forEach(function (item) {
    L.marker(item.cords, { icon: pin })
      .addTo(map)
      .bindPopup(
        '<span style="font-size:14px; text-align: center; display: block;">' +
          item.tooltip +
          "</span>"
      );
  });

  map.on("contextmenu", function (event) {
    console.log("Coordinates: " + event.latlng.toString());
    L.marker(event.latlng, { icon: pin }).addTo(map);
  });
}

(function GoogleAnalytics() {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-SWMTFR44KJ";
  script.setAttribute("async", "");

  $("body").append(script);

  $(document).ready(function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-SWMTFR44KJ");
  });
})();

$(document).ready(function loadIGStories() {
  const storiesUrl =
    "https://graph.facebook.com/17841407771133380/stories?fields=id,media_url,media_type,thumbnail_url,permalink,timestamp&access_token=EAARGZAVd79TEBAFEXVRj3ZACPusIVORQAS95V07t5nvdLHr1q2iPbpAvswoRtZClbEg9xLnG6KZAIW4ZAP0ZBTxg5CLNgRG05pl4A0ZBCOwh2u5rtjT1INSYSTZAAH40BacD9e9CBdTNnwK8RqidTAJa4CT6VC9cxS5Ed2YEtk2ZAsFxUk7XOQUp7";
  $.get(storiesUrl, function (res) {
    const data = [...res.data];

    const htmlList = data.map(function (item) {
      if (item.thumbnail_url) {
        return '<li><img src="' + item.thumbnail_url + '" /></li>';
      }
      return '<li><img src="' + item.media_url + '" /></li>';
    });

    const totalLengthItems = htmlList.length;

    if (totalLengthItems > 0) {
      const items =
        totalLengthItems > 3
          ? htmlList
              .slice(0, 3)
              .concat(
                '<li class="count">' +
                  (totalLengthItems - 3 > 9 ? "9+" : totalLengthItems - 3) +
                  "</li>"
              )
          : htmlList;
      $("#header-stories").html("<ul>" + items.join("") + "</ul>");

      $("#amp-story-wrapper").append(
        data.map(
          (story, index) => `
        <amp-story-page id="page${index + 1}">
          <amp-story-grid-layer template="vertical">
            <amp-img src="${story.media_url}"
                width="720" height="1280"
                layout="responsive">
            </amp-img>
          </amp-story-grid-layer>
        </amp-story-page>
      `
        )
      );
    }
  });
});

function sendMessage(params, callback) {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/contact",
    data: JSON.stringify({
      name: params.name,
      contact: params.contact,
      message: params.message,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      callback({ ok: data.ok });
    },
    fail: function (data) {
      callback({ ok: true });
    },
  });
}
