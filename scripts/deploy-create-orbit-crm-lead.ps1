# Deploy create-orbit-crm-lead + secrets (MKT Orbit)
# Requires .env.local with SUPABASE_ACCESS_TOKEN=sbp_... and ORBIT_CRM_TOKEN
# Usage: .\scripts\deploy-create-orbit-crm-lead.ps1

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot

$keys = @{}
Get-Content (Join-Path $repo '.env.local') | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
  if ($_ -match '^([^=]+)=(.*)$') {
    $keys[$Matches[1].Trim()] = $Matches[2].Trim().Trim('"').Trim("'")
  }
}
if (-not $keys['SUPABASE_ACCESS_TOKEN']) { throw 'SUPABASE_ACCESS_TOKEN missing in .env.local' }
if (-not $keys['ORBIT_CRM_TOKEN']) { throw 'ORBIT_CRM_TOKEN missing in .env.local' }

$env:SUPABASE_ACCESS_TOKEN = $keys['SUPABASE_ACCESS_TOKEN']
$crmToken = $keys['ORBIT_CRM_TOKEN']
$restBase = 'https://cvanwvoddchatcdstwry.supabase.co/functions/v1/crm-api-v1'
$pipeB2b = '7b522de3-210a-4c62-9eb5-25788a4e6239'
$stageB2b = '94a0e221-9f3b-42a0-b204-f60b8f609182'
$pipeTreina = '51da79ac-7bb0-4946-a4ca-12138cee9e18'
$stageTreina = '675c1b15-7290-4fb4-a6cc-254ea50ce453'
$projectRef = 'yfpdrckyuxltvznqfqgh'

$src = Join-Path $repo 'supabase\functions\create-orbit-crm-lead\index.ts'
$dstDir = Join-Path $repo 'supabase\supabase\functions\create-orbit-crm-lead'
New-Item -ItemType Directory -Force -Path $dstDir | Out-Null
Copy-Item $src (Join-Path $dstDir 'index.ts') -Force

Write-Host 'Setting secrets...'
npx --yes supabase secrets set `
  "ORBIT_CRM_BASE_URL=$restBase" `
  "ORBIT_CRM_TOKEN=$crmToken" `
  "ORBIT_PIPELINE_B2B=$pipeB2b" `
  "ORBIT_STAGE_B2B=$stageB2b" `
  "ORBIT_PIPELINE_TREINAMENTOS=$pipeTreina" `
  "ORBIT_STAGE_TREINAMENTOS=$stageTreina" `
  --project-ref $projectRef

Write-Host 'Deploying function...'
Push-Location (Join-Path $repo 'supabase\supabase')
try {
  npx --yes supabase functions deploy create-orbit-crm-lead --project-ref $projectRef --no-verify-jwt
} finally {
  Pop-Location
}

Remove-Item Env:SUPABASE_ACCESS_TOKEN -ErrorAction SilentlyContinue
Write-Host 'Done.'
