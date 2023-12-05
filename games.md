---
layout: single
title: Games
published: false
---

{% if site.posts.size > 1 %}
  <section class="padding-top-72 padding-bottom-72 bg-contrast">
    <div class="max-width videos-x-list">
      {% for post in site.categories.games %}
        <a class="video-item" href="{{ post.url }}">
          <img src="{{ post.thumbUrl }}" alt="{{ post.title }}" />
        </a>
      {% endfor %}
    </div>
  </section>
{% endif %}