#!/bin/bash
# Cache Busting automático para Orbit Gestão
# Gera hash MD5 do CSS e atualiza todas as páginas HTML
# Uso: bash cache-bust.sh

CSS_FILE="css/styles-v2.css"
HASH=$(md5 -q "$CSS_FILE" | cut -c1-8)
OLD_PATTERN='styles-v2\.css\?v=[a-zA-Z0-9]*'
NEW_REF="styles-v2.css?v=$HASH"

echo "🔄 CSS hash: $HASH"

COUNT=0
for f in $(find . -name "*.html" -not -path "./node_modules/*"); do
    if grep -q "styles-v2.css" "$f"; then
        sed -i '' "s|$OLD_PATTERN|$NEW_REF|g" "$f"
        COUNT=$((COUNT + 1))
    fi
done

echo "✅ $COUNT arquivos atualizados para $NEW_REF"
