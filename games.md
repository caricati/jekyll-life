---
layout: single
title: Games
published: false
---

{% if site.posts.size > 1 %}
  <section class="padding-top-72 padding-bottom-72 bg-contrast">
    <div class="max-width videos-grid-list">
      {% for post in site.categories.games %}
        <a class="video-item" href="{{ post.url }}">
          <figure>
            <img src="{{ post.thumbUrl }}" alt="{{ post.title }}" />
          </figure>
        </a>
      {% endfor %}
    </div>
  </section>
{% endif %}