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

function mapLibre(id, center, zoom, _markers) {
  const markers = _markers.split(',').filter(item => !!item).map(config => {
    const data = config.split('|')
    return [[data[0], data[1]], data[2] || '']
  })
  console.log(markers)
  const pinImg = new Image(38, 45);
  pinImg.setAttribute('src', '/assets/img/icons/pin.svg');

  const map = new maplibregl.Map({
    container: id,
    zoom: zoom,
    center: center,
    style: {
      version: 8,
      sources: {
        'esri-satellite': {
          type: 'raster',
          tiles: [
            'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256,
          attribution: 'Esri'
        }
      },
      layers: [
        {
          id: 'esri-satellite-layer',
          type: 'raster',
          source: 'esri-satellite'
        }
      ]
    },
  });

  map.scrollZoom.disable();

  map.addControl(new maplibregl.NavigationControl({
      visualizePitch: true,
      showZoom: true,
      showCompass: true
  }), 'top-right');

  map.on('click', (e) => {
    console.log(`lng/lat: [${e.lngLat.lng}, ${e.lngLat.lat}]`);
  });

  if (Array.isArray(markers)) {
    markers.forEach(([cords, label]) => {
      const marker = new maplibregl.Marker({
        element: pinImg.cloneNode(),
        anchor: 'bottom'
      })
      .setLngLat(cords)
      .addTo(map);

      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`<p>${label}</p>`);
      marker.setPopup(popup);
    })
  }
}

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

$(document).ready(function () {
  const galleryModalTemplate =
    '<div class="overlay" id="gallery-modal">' +
    '<button type="button" class="close-gallery-modal">' +
    '<img src="/assets/img/icons/close.svg" alt="close buttun" />' +
    "</button>" +
    '<div id="gallery-modal-content"></div>' +
    "</div>";

  const links = $(".photo-gallery a");

  function closeModal() {
    $("#gallery-modal").remove();
    document.body.classList.remove("lock-scroll");
  }

  function setModalImage(src) {
    const galleryContainer = document.getElementById("gallery-modal-content");
    galleryContainer.innerHTML = '<img src="' + src + '" alt="" />';
  }

  function listenerArrowCommands(event) {
    const isArrowLeft = event.keyCode === 37 || event.key === "ArrowLeft";
    const isArrowRight = event.keyCode === 39 || event.key === "ArrowRight";
    const $modal = $("#gallery-modal");
    $modal.attr("data-gallery");
    const arr = Array.from(document.querySelectorAll(".photo-gallery a"))
      .filter(
        (el) =>
          el.getAttribute("data-gallery") === $modal.attr("data-gallery-ref")
      )
      .map((el) => el.getAttribute("href"));
    const current = $modal.find("#gallery-modal-content img").attr("src");
    const currentIndex = arr.indexOf(current);

    // prev
    if (isArrowLeft) {
      if (currentIndex === 0) {
        return setModalImage(arr[arr.length - 1]);
      }
      return setModalImage(arr[currentIndex - 1]);
    }

    // next
    if (isArrowRight) {
      if (currentIndex === arr.length - 1) {
        return setModalImage(arr[0]);
      }
      return setModalImage(arr[currentIndex + 1]);
    }
  }

  function handleClose(event) {
    if (event.keyCode === 27 || event.key === "Escape") {
      closeModal();
    }
  }

  $(document).on("keydown", function (event) {
    handleClose(event);
    listenerArrowCommands(event);
  });

  function generateModal(galleryNamespace) {
    const galleryModal = document.getElementById("gallery-modal");
    if (!galleryModal) {
      $("#portal").append(galleryModalTemplate);
      $(".close-gallery-modal").click(function () {
        closeModal();
      });
    }
    document
      .getElementById("gallery-modal")
      .setAttribute("data-gallery-ref", galleryNamespace);
  }

  links.on("click", function (event) {
    event.preventDefault();
    generateModal(this.getAttribute("data-gallery"));
    setModalImage(this.getAttribute("href"));
    document.body.classList.add("lock-scroll");
  });

  const $gototop = $("#goto-top");

  $(window).on("scroll", function (event) {
    const scrollPosition = $(this).scrollTop();
    if (scrollPosition >= 800 && !$gototop.is(":visible")) {
      $gototop.fadeIn(350);
    }

    if (scrollPosition < 800 && $gototop.is(":visible")) {
      $gototop.fadeOut(350);
    }
  });

  $gototop.children('button').on('click', function() {
    $(window).scrollTop(0);
  });
});
