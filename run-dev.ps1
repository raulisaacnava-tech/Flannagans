Set-Location -LiteralPath 'F:\Flannagans qr'
$log = Join-Path $PWD 'run-dev.log'
Start-Transcript -Path $log -Append | Out-Null
try {
  Write-Host "Starting dev server..."
  & npm.cmd run dev -- --port 3000
} finally {
  Stop-Transcript | Out-Null
}
