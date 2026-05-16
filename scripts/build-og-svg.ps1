#requires -Version 5.1
<#
.SYNOPSIS
  Emits public/og-cover-v2.svg as a self-contained design source.
  The photo is downsized and embedded as base64 so the SVG opens
  standalone in any browser or vector editor.
#>

Add-Type -AssemblyName System.Drawing

$root     = Split-Path -Parent $PSScriptRoot
$heroPath = Join-Path $root 'src\assets\images\chai_01_hero_cinematic.jpg'
$outPath  = Join-Path $root 'public\og-cover-v2.svg'

# Downsize hero to 1200x630 cover so the embedded base64 stays small
$src = [System.Drawing.Image]::FromFile($heroPath)
$W = 1200; $H = 630
$scale = [Math]::Max($W / $src.Width, $H / $src.Height)
$dw = [int]($src.Width * $scale); $dh = [int]($src.Height * $scale)
$ox = [int](($W - $dw) / 2 - 60); $oy = [int](($H - $dh) / 2)

$bmp = New-Object System.Drawing.Bitmap $W, $H, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($src, $ox, $oy, $dw, $dh)
$src.Dispose()

# Encode the resized photo to JPEG bytes
$ms = New-Object System.IO.MemoryStream
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 85L
$bmp.Save($ms, $jpegEncoder, $encParams)
$g.Dispose(); $bmp.Dispose()
$b64 = [Convert]::ToBase64String($ms.ToArray())
$ms.Dispose()

$svg = @"
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 1200 630" width="1200" height="630" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="warmDark" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#120D0A" stop-opacity="0"/>
      <stop offset="35%"  stop-color="#120D0A" stop-opacity="0.15"/>
      <stop offset="65%"  stop-color="#120D0A" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#120D0A" stop-opacity="0.92"/>
    </linearGradient>
    <style>
      .eyebrow { font-family: 'Fraunces', 'Georgia', serif; font-size: 14px; letter-spacing: 0.42em; fill: #C59860; }
      .title   { font-family: 'Fraunces', 'Georgia', serif; font-weight: 600; font-size: 92px; fill: #F5E9D4; }
      .vol     { font-family: 'Fraunces', 'Georgia', serif; font-style: italic; font-size: 14px; letter-spacing: 0.32em; fill: #C59860; }
      .tagline { font-family: 'Fraunces', 'Georgia', serif; font-style: italic; font-size: 30px; fill: #D7C6AA; }
      .footer  { font-family: 'Fraunces', 'Georgia', serif; font-size: 12px; letter-spacing: 0.36em; fill: #C59860; }
    </style>
  </defs>

  <image x="0" y="0" width="1200" height="630"
         preserveAspectRatio="xMidYMid slice"
         xlink:href="data:image/jpeg;base64,$b64"/>

  <rect x="0" y="0" width="1200" height="630" fill="url(#warmDark)"/>
  <rect x="0" y="0" width="1200" height="630" fill="#0A0604" opacity="0.18"/>

  <text class="eyebrow" x="640" y="195">CINEMATIC  MAGAZINE</text>
  <text class="title"   x="634" y="290">Chai Edition</text>

  <line x1="640" y1="340" x2="700" y2="340" stroke="#C59860" stroke-width="1.5"/>
  <text class="vol"     x="715" y="345">VOL.  01</text>
  <line x1="815" y1="340" x2="875" y2="340" stroke="#C59860" stroke-width="1.5"/>

  <text class="tagline" x="640" y="410">A cinematic magazine on</text>
  <text class="tagline" x="640" y="452">Indian chai culture.</text>

  <text class="footer"  x="640" y="560">REACT    TYPESCRIPT    FRAMER  MOTION</text>
</svg>
"@

Set-Content -Path $outPath -Value $svg -Encoding UTF8 -NoNewline
$size = (Get-Item $outPath).Length
Write-Output ("Wrote {0} ({1:N0} bytes)" -f $outPath, $size)
