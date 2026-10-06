#!/bin/bash

# ==========================================
# Jekyll Post Generator
# ==========================================

# Função para gerar slug
slugify() {
  echo "$1" \
    | iconv -t ascii//TRANSLIT \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g' \
    | sed -E 's/^-+|-+$//g'
}

# ==========================================
# Inputs
# ==========================================

read -p "Titulo em portugues: " TITLE
read -p "Data da publicação (YYYY-MM-DD): " POST_DATE
read -p "Layout: " POST_LAYOUT

# ==========================================
# Datas
# ==========================================

YYYY=$(date -d "$POST_DATE" +"%Y")
YY=$(date -d "$POST_DATE" +"%y")
MM=$(date -d "$POST_DATE" +"%m")
DD=$(date -d "$POST_DATE" +"%d")

# ==========================================
# Slugs
# ==========================================

SLUG=$(slugify "$TITLE")

# ==========================================
# Diretórios
# ==========================================

UPLOAD_DIR="uploads/$YY/$MM/$SLUG"

POST_DIR="_posts/$YYYY/$MM"

POST_FILE="$POST_DIR/$YYYY-$MM-$DD-$SLUG.md"

# ==========================================
# Criar diretórios sem sobrescrever
# ==========================================

mkdir -p "$UPLOAD_DIR"
mkdir -p "$POST_DIR"

# ==========================================
# Criar .keep se não existir
# ==========================================

if [ ! -f "$UPLOAD_DIR/.keep" ]; then
  touch "$UPLOAD_DIR/.keep"
fi

# ==========================================
# Criar post PT
# ==========================================

if [ ! -f "$POST_FILE" ]; then
cat > "$POST_FILE" <<EOF
---
title: "$TITLE"
description: ""
layout: $POST_LAYOUT
date: $YYYY-$MM-$DD 12:20:00 -0300
bannerUrl: /uploads/$YY/$MM/$SLUG/cover.jpg
thumbUrl: /uploads/$YY/$MM/$SLUG/thumb.jpg
image: /uploads/$YY/$MM/$SLUG/thumb.jpg
categories:
  - 
tags:
  - 
---
EOF

  echo "Arquivo PT criado: $POST_FILE"
else
  echo "Arquivo PT já existe: $POST_FILE"
fi


echo ""
echo "Slug: $SLUG"
echo "Estrutura criada com sucesso."