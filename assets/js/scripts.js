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

  // characters counter
  $("[data-counter-from]").each(function (element) {
    const $el = $(this);
    const $from = $($el.attr("data-counter-from"));
    $from.on("input", function () {
      $el.html(this.value.length || 0);
    });
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

function sendMessage(params, callback) {
  $.ajax({
    type: "POST",
    url: "https://api.mrcaricati.com/contact",
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
