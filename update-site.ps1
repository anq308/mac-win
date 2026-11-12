# Обновить сайт после новой сборки: кладёт свежие «Центр Mac.exe» и MacSuite.zip в downloads
# и пишет дату версии и размеры в assets\version.js. Запуск: правый клик → «Выполнить с помощью PowerShell»
$site = $PSScriptRoot
$kit = "D:\mac-wind\Комплект"
$down = Join-Path $site "downloads"
New-Item -ItemType Directory -Force $down | Out-Null

Copy-Item (Join-Path $kit "Центр Mac.exe") (Join-Path $down "mac-center.exe") -Force
Copy-Item (Join-Path $kit "MacSuite.zip") (Join-Path $down "MacSuite.zip") -Force

function Size($p) { "{0:N1} МБ" -f ((Get-Item $p).Length / 1MB) }
$exe = Join-Path $down "mac-center.exe"
# дата сборки — из метки внутри exe (MACCENTER-STAMP:ГГГГММДДччмм;), иначе дата файла
$text = [Text.Encoding]::ASCII.GetString([IO.File]::ReadAllBytes($exe))
$m = [regex]::Match($text, "MACCENTER-STAMP:(\d{4})(\d{2})(\d{2})\d{4};")
$date = if ($m.Success) { "$($m.Groups[3].Value).$($m.Groups[2].Value).$($m.Groups[1].Value)" } else { (Get-Item $exe).LastWriteTime.ToString("dd.MM.yyyy") }

$js = "window.MAC_VERSION = { date: `"$date`", exe: `"$(Size $exe)`", zip: `"$(Size (Join-Path $down 'MacSuite.zip'))`" };`n"
[IO.File]::WriteAllText((Join-Path $site "assets\version.js"), $js, (New-Object Text.UTF8Encoding $false))
Write-Host "Сайт обновлён: версия от $date, Центр Mac — $(Size $exe)"
