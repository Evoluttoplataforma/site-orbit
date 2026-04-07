# ✏️ Editor de texto rico (rich-text)

O CMS tem um editor próprio super leve (~300 linhas), sem dependências externas. Usa `contenteditable` + `document.execCommand()`.

## Por que não TinyMCE/CKEditor?

- ✅ **Zero dependência** — não precisa instalar nem importar nada
- ✅ **Super leve** — funciona em qualquer browser, mobile incluso
- ✅ **Customização total** — toolbar tem só o que você quer
- ❌ **`execCommand()` é deprecated** — mas funciona em todos os browsers ainda em 2026 e ainda vai funcionar por anos

## HTML do editor

```html
<div class="rich-editor-wrapper">
  <div class="rich-editor-toolbar">
    <button type="button" onclick="execCmd('bold')" title="Negrito (Ctrl+B)">
      <i class="fas fa-bold"></i>
    </button>
    <button type="button" onclick="execCmd('italic')" title="Itálico (Ctrl+I)">
      <i class="fas fa-italic"></i>
    </button>
    <button type="button" onclick="execCmd('underline')" title="Sublinhado (Ctrl+U)">
      <i class="fas fa-underline"></i>
    </button>
    
    <div class="toolbar-divider"></div>
    
    <button type="button" onclick="execCmd('formatBlock', 'h2')" title="Título 2">
      H2
    </button>
    <button type="button" onclick="execCmd('formatBlock', 'h3')" title="Título 3">
      H3
    </button>
    <button type="button" onclick="execCmd('formatBlock', 'p')" title="Parágrafo">
      P
    </button>
    <button type="button" onclick="execCmd('formatBlock', 'blockquote')" title="Citação">
      <i class="fas fa-quote-right"></i>
    </button>
    
    <div class="toolbar-divider"></div>
    
    <button type="button" onclick="execCmd('insertUnorderedList')" title="Lista">
      <i class="fas fa-list-ul"></i>
    </button>
    <button type="button" onclick="execCmd('insertOrderedList')" title="Lista numerada">
      <i class="fas fa-list-ol"></i>
    </button>
    
    <div class="toolbar-divider"></div>
    
    <button type="button" onclick="insertLink()" title="Link">
      <i class="fas fa-link"></i>
    </button>
    <button type="button" onclick="insertImage()" title="Imagem">
      <i class="fas fa-image"></i>
    </button>
    <button type="button" onclick="execCmd('removeFormat')" title="Limpar formatação">
      <i class="fas fa-remove-format"></i>
    </button>
    
    <div class="toolbar-divider"></div>
    
    <button type="button" onclick="toggleHtmlSource()" title="Ver código HTML">
      <i class="fas fa-code"></i>
    </button>
  </div>
  
  <div class="rich-editor" id="richEditor" contenteditable="true">
    Comece a escrever...
  </div>
  
  <textarea class="rich-editor-source" id="richEditorSource" style="display:none;"></textarea>
</div>
```

## CSS

```css
.rich-editor-wrapper {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg);
}

.rich-editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px 12px;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
}

.rich-editor-toolbar button {
  background: transparent;
  border: 1px solid transparent;
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--text);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.15s;
  min-width: 36px;
}

.rich-editor-toolbar button:hover {
  background: var(--bg-hover);
  border-color: var(--border);
}

.rich-editor-toolbar button.active {
  background: var(--primary-light);
  color: var(--primary);
  border-color: var(--primary);
}

.toolbar-divider {
  width: 1px;
  background: var(--border);
  margin: 4px 4px;
}

.rich-editor {
  min-height: 400px;
  padding: 20px 24px;
  color: var(--text);
  font-size: 16px;
  line-height: 1.7;
  outline: none;
  overflow-y: auto;
  max-height: 600px;
}

.rich-editor:empty::before {
  content: 'Comece a escrever...';
  color: var(--text-muted);
}

.rich-editor h2 {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-bright);
  margin: 24px 0 12px;
}

.rich-editor h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-bright);
  margin: 20px 0 10px;
}

.rich-editor p { margin: 0 0 16px; }

.rich-editor blockquote {
  border-left: 4px solid var(--primary);
  padding-left: 16px;
  margin: 16px 0;
  font-style: italic;
  color: var(--text-muted);
}

.rich-editor a {
  color: var(--primary);
  text-decoration: underline;
}

.rich-editor img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius);
  margin: 16px 0;
}

.rich-editor ul, .rich-editor ol {
  margin: 16px 0;
  padding-left: 24px;
}

.rich-editor li { margin-bottom: 6px; }
```

## JavaScript

```javascript
function execCmd(command, value) {
  document.execCommand(command, false, value);
  document.getElementById('richEditor').focus();
  updateToolbarState();
}

function updateToolbarState() {
  // Marca botões ativos baseado no que está selecionado
  const buttons = document.querySelectorAll('.rich-editor-toolbar button[onclick^="execCmd"]');
  buttons.forEach(btn => {
    const onclick = btn.getAttribute('onclick');
    const cmdMatch = onclick.match(/execCmd\('(\w+)'/);
    if (cmdMatch) {
      const cmd = cmdMatch[1];
      try {
        if (document.queryCommandState(cmd)) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      } catch(e) {}
    }
  });
}

document.getElementById('richEditor').addEventListener('keyup', updateToolbarState);
document.getElementById('richEditor').addEventListener('mouseup', updateToolbarState);

function insertLink() {
  const url = prompt('URL do link:');
  if (!url) return;
  const text = window.getSelection().toString() || prompt('Texto do link:') || url;
  const finalUrl = url.startsWith('http') ? url : 'https://' + url;
  execCmd('insertHTML', `<a href="${finalUrl}" target="_blank" rel="noopener">${text}</a>`);
}

function insertImage() {
  // Pode ser via URL ou upload
  const choice = confirm('OK = upload | Cancelar = URL');
  if (choice) {
    // Upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function() {
      const file = input.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert('Imagem maior que 2MB. Use uma menor ou suba pro storage e cole a URL.');
        return;
      }
      const reader = new FileReader();
      reader.onload = function(e) {
        execCmd('insertHTML', `<img src="${e.target.result}" alt="">`);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  } else {
    // URL
    const url = prompt('URL da imagem:');
    if (!url) return;
    const alt = prompt('Texto alternativo (acessibilidade):') || '';
    execCmd('insertHTML', `<img src="${url}" alt="${alt}">`);
  }
}

function toggleHtmlSource() {
  const editor = document.getElementById('richEditor');
  const source = document.getElementById('richEditorSource');
  if (source.style.display === 'none') {
    source.value = editor.innerHTML;
    source.style.display = 'block';
    editor.style.display = 'none';
  } else {
    editor.innerHTML = source.value;
    source.style.display = 'none';
    editor.style.display = 'block';
  }
}

// Atalhos de teclado
document.getElementById('richEditor').addEventListener('keydown', function(e) {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key.toLowerCase()) {
      case 'b': e.preventDefault(); execCmd('bold'); break;
      case 'i': e.preventDefault(); execCmd('italic'); break;
      case 'u': e.preventDefault(); execCmd('underline'); break;
      case 'k': e.preventDefault(); insertLink(); break;
    }
  }
});

// Cola limpa - remove formatação do source ao colar de Word/Google Docs
document.getElementById('richEditor').addEventListener('paste', function(e) {
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData).getData('text/plain');
  document.execCommand('insertText', false, text);
});
```

## Como salvar o conteúdo

```javascript
function getEditorContent() {
  // Se tá no modo HTML source, sincroniza primeiro
  const source = document.getElementById('richEditorSource');
  if (source.style.display !== 'none') {
    document.getElementById('richEditor').innerHTML = source.value;
  }
  return document.getElementById('richEditor').innerHTML;
}

function setEditorContent(html) {
  document.getElementById('richEditor').innerHTML = html || '';
}

// Ao salvar artigo:
const article = {
  // ...
  content: getEditorContent(),
};
```

## Limitações conhecidas

1. **`execCommand()` é deprecated** — funciona em todos os browsers mas pode parar de funcionar no futuro. Solução de longo prazo: migrar pra ContentEditable API ou Slate/Tiptap.

2. **HTML "sujo" do paste** — o paste handler acima cola só texto plano. Se quiser preservar formatação ao colar de outras fontes, remove o handler de paste.

3. **Sem undo/redo customizado** — usa o do browser (Ctrl+Z funciona).

4. **Sem suporte a tabelas** — pra adicionar, usa `execCmd('insertHTML', '<table>...</table>')` ou um botão custom.

## Sanitização (importante!)

Como o conteúdo é salvo direto como HTML e renderizado no blog público com `innerHTML`, **TEM RISCO DE XSS** se um admin malicioso colocar `<script>` no editor.

Pra produção real, sanitiza no save **OU** no render:

**No save (server-side preferível):**

Cria uma edge function `sanitize-html` que recebe o HTML, passa por `DOMPurify` e retorna limpo. Chama antes de salvar.

**No render (client-side, fallback):**

```html
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js"></script>
<script>
  const cleanHtml = DOMPurify.sanitize(article.content, { 
    ALLOWED_TAGS: ['h2','h3','p','strong','em','u','a','ul','ol','li','blockquote','img','br','span'],
    ALLOWED_ATTR: ['href','target','rel','src','alt','class']
  });
  document.getElementById('articleContent').innerHTML = cleanHtml;
</script>
```

**Como o CMS atual só aceita admins de confiança (cms_admins é fechado), o risco é baixo. Mas vale adicionar a sanitização pra defesa em profundidade.**
