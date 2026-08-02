# Deploy das functions de treinamento + secrets (MKT Orbit)
#
# Exige em .env.local:
#   SUPABASE_ACCESS_TOKEN=sbp_...
#   ZOOM_ACCOUNT_ID=...
#   ZOOM_CLIENT_ID=...
#   ZOOM_CLIENT_SECRET=...
#   MAILERSEND_API_KEY=...      (mesma usada pelas outras send-*)
#   CRON_SECRET=...             (qualquer string longa; protege o modo interno)
#   RATE_SALT=...               (qualquer string longa; sal do hash de IP)
#
# Uso: .\scripts\deploy-training-zoom.ps1
#      .\scripts\deploy-training-zoom.ps1 -SecretsOnly
#      .\scripts\deploy-training-zoom.ps1 -Only register-training

param(
  [switch]$SecretsOnly,
  [string]$Only
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$projectRef = 'yfpdrckyuxltvznqfqgh'

# ─── lê .env.local ───────────────────────────────────────────────────────────
$keys = @{}
Get-Content (Join-Path $repo '.env.local') | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
  if ($_ -match '^([^=]+)=(.*)$') {
    $keys[$Matches[1].Trim()] = $Matches[2].Trim().Trim('"').Trim("'")
  }
}

if (-not $keys['SUPABASE_ACCESS_TOKEN']) { throw 'SUPABASE_ACCESS_TOKEN missing in .env.local' }
$env:SUPABASE_ACCESS_TOKEN = $keys['SUPABASE_ACCESS_TOKEN']

# Zoom e MailerSend sao obrigatorios para o fluxo funcionar; CRON_SECRET/RATE_SALT
# ganham default gerado se ausentes (mas o ideal e fixa-los no .env.local, senao
# cada deploy troca o segredo e o cron para de autenticar).
$required = @('ZOOM_ACCOUNT_ID','ZOOM_CLIENT_ID','ZOOM_CLIENT_SECRET')
$missing = $required | Where-Object { -not $keys[$_] }
if ($missing) {
  Write-Warning ("Faltando no .env.local: " + ($missing -join ', '))
  Write-Warning "As functions serao deployadas, mas a integracao Zoom fica DESLIGADA (fail-soft: inscricoes ficam 'pending')."
}

$secretArgs = @()
foreach ($k in @('ZOOM_ACCOUNT_ID','ZOOM_CLIENT_ID','ZOOM_CLIENT_SECRET','MAILERSEND_API_KEY','CRON_SECRET','RATE_SALT','TRAINING_FROM_EMAIL')) {
  if ($keys[$k]) { $secretArgs += "$k=$($keys[$k])" }
}

if ($secretArgs.Count -gt 0) {
  Write-Host "Setting secrets ($($secretArgs.Count))..." -ForegroundColor Cyan
  # Nao imprime valores
  npx --yes supabase secrets set @secretArgs --project-ref $projectRef
  if (-not $?) { throw 'secrets set falhou' }
} else {
  Write-Warning 'Nenhum secret para definir.'
}

if ($SecretsOnly) {
  Remove-Item Env:SUPABASE_ACCESS_TOKEN -ErrorAction SilentlyContinue
  Write-Host 'Secrets atualizados. Deploy das functions ignorado (-SecretsOnly).' -ForegroundColor Green
  exit 0
}

# ─── copia source -> staging da CLI ──────────────────────────────────────────
# supabase/functions/ e o source-of-truth editavel; supabase/supabase/functions/
# e o staging onde vive o config.toml que a CLI usa.
$fns = @('register-training','send-training-reminders','training-unsubscribe')
if ($Only) { $fns = @($Only) }

# _shared vai junto: register-training importa ../_shared/zoom.ts
$sharedSrc = Join-Path $repo 'supabase\functions\_shared'
if (Test-Path $sharedSrc) {
  $sharedDst = Join-Path $repo 'supabase\supabase\functions\_shared'
  New-Item -ItemType Directory -Force -Path $sharedDst | Out-Null
  Copy-Item (Join-Path $sharedSrc '*') $sharedDst -Recurse -Force
  Write-Host 'Copiado _shared/' -ForegroundColor DarkGray
}

foreach ($fn in $fns) {
  $src = Join-Path $repo "supabase\functions\$fn\index.ts"
  if (-not (Test-Path $src)) { Write-Warning "Ignorando $fn (index.ts nao encontrado)"; continue }
  $dstDir = Join-Path $repo "supabase\supabase\functions\$fn"
  New-Item -ItemType Directory -Force -Path $dstDir | Out-Null
  Copy-Item $src (Join-Path $dstDir 'index.ts') -Force
}

# ─── deploy ──────────────────────────────────────────────────────────────────
# Sem --no-verify-jwt: supabaseMkt.functions.invoke ja manda o JWT anon.
# (A anon key e publica, entao isso e quebra-molas — os controles reais sao
# honeypot + rate limit dentro da function.)
Push-Location (Join-Path $repo 'supabase\supabase')
try {
  foreach ($fn in $fns) {
    if (-not (Test-Path (Join-Path $repo "supabase\functions\$fn\index.ts"))) { continue }
    Write-Host "Deploying $fn..." -ForegroundColor Cyan
    npx --yes supabase functions deploy $fn --project-ref $projectRef
    if (-not $?) { throw "deploy de $fn falhou" }
  }
} finally {
  Pop-Location
  Remove-Item Env:SUPABASE_ACCESS_TOKEN -ErrorAction SilentlyContinue
}

Write-Host 'Done.' -ForegroundColor Green
