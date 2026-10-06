---
layout: blog
title: Blog
permalink: /blog
description: Blog de Mr. Caricati
tags:
  - blog
---

{% assign posts = site.categories.blog %}
{% for post in posts limit: 6 %}
  <article class="blog-article">
    <header>
      <h2>
        <a href="{{ post.url | relative_url }}">#</a>
        {{ post.title }}
      </h2>
      <p class="metainfos">
        <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date: "%d/%m/%Y %H:%M" }}</time>
      </p>
    </header>
    <figure class="banner-post">
      <img src="{{ post.bannerUrl }}" alt="" />
    </figure>
    {{ post.content }}
    <a href="{{ post.url | relative_url }}#comments">Fazer um comentário</a>
  </article>
{% endfor %}