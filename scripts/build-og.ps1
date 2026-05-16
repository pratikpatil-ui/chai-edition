#requires -Version 5.1
<#
.SYNOPSIS
  Composes public/og-cover-v4.jpg as a restrained editorial composition:
  the chai photo sits in a portrait frame on the left, the right column
  carries a single stacked italic wordmark, a short tagline, and a quiet
  byline. 1200x630, Open Graph spec. Re-run to tweak copy or layout.
#>

Add-Type -AssemblyName System.Drawing

$root      = Split-Path -Parent $PSScriptRoot
$heroPath  = Join-Path $root 'src\assets\images\chai_01_hero_cinematic.jpg'
$outPath   = Join-Path $root 'public\og-cover-v4.jpg'

if (-not (Test-Path $heroPath)) { throw "Hero photo not found at $heroPath" }

$W = 1200; $H = 630

$bmp = New-Object System.Drawing.Bitmap $W, $H, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint  = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

# Palette - warm, restrained, low-saturation
$bg        = [System.Drawing.Color]::FromArgb(255, 16, 11, 8)
$goldRule  = [System.Drawing.Color]::FromArgb(170, 197, 152, 96)
$goldTrack = [System.Drawing.Color]::FromArgb(220, 197, 152, 96)
$cream     = [System.Drawing.Color]::FromArgb(255, 245, 233, 212)
$muted     = [System.Drawing.Color]::FromArgb(215, 213, 196, 168)
$quiet     = [System.Drawing.Color]::FromArgb(190, 200, 184, 158)

# Background
$bgBrush = New-Object System.Drawing.SolidBrush $bg
$g.FillRectangle($bgBrush, 0, 0, $W, $H)
$bgBrush.Dispose()

# Very subtle warm wash, diagonal, almost invisible
$wash = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Point 0, 0),
  (New-Object System.Drawing.Point $W, $H),
  ([System.Drawing.Color]::FromArgb(28, 70, 42, 22)),
  ([System.Drawing.Color]::FromArgb(0, 16, 11, 8))
)
$g.FillRectangle($wash, 0, 0, $W, $H)
$wash.Dispose()

# === Cover frame: photo as portrait artifact, no text overlay ===
$cx = 90; $cy = 75; $cw = 380; $ch = 480

# Soft drop shadow (two progressively offset rectangles fake the blur)
$shadows = @(
  @{ off = 18; alpha = 28 },
  @{ off = 10; alpha = 55 },
  @{ off = 4;  alpha = 80 }
)
foreach ($s in $shadows) {
  $sBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($s.alpha, 0, 0, 0))
  $g.FillRectangle($sBrush, ($cx + $s.off), ($cy + $s.off + 3), $cw, $ch)
  $sBrush.Dispose()
}

# Photo, clipped to cover frame
$hero = [System.Drawing.Image]::FromFile($heroPath)
$photoScale = [Math]::Max($cw / $hero.Width, $ch / $hero.Height)
$pw = [int]($hero.Width  * $photoScale)
$ph = [int]($hero.Height * $photoScale)
$px = $cx + [int](($cw - $pw) / 2) - 25
$py = $cy + [int](($ch - $ph) / 2)

$clip = New-Object System.Drawing.Rectangle $cx, $cy, $cw, $ch
$g.SetClip($clip)
$g.DrawImage($hero, $px, $py, $pw, $ph)
$g.ResetClip()
$hero.Dispose()

# Very faint hairline border to define the photo as an object
$borderColor = [System.Drawing.Color]::FromArgb(110, 197, 152, 96)
$borderPen   = New-Object System.Drawing.Pen $borderColor, 1
$g.DrawRectangle($borderPen, $cx, $cy, $cw, $ch)
$borderPen.Dispose()

# === Right placard: one title, one tagline, one byline ===
$tx = 555

$sfNear = New-Object System.Drawing.StringFormat
$sfNear.Alignment = [System.Drawing.StringAlignment]::Near

# Stacked italic wordmark — "Chai" then "Edition"
$titleFont = New-Object System.Drawing.Font 'Georgia', 56, ([System.Drawing.FontStyle]::Italic), ([System.Drawing.GraphicsUnit]::Point)
$titleBrush = New-Object System.Drawing.SolidBrush $cream
$g.DrawString("Chai",    $titleFont, $titleBrush, [single]($tx - 6), [single]110)
$g.DrawString("Edition", $titleFont, $titleBrush, [single]($tx - 6), [single]198)
$titleFont.Dispose()
$titleBrush.Dispose()

# Single short hairline under the wordmark
$rulePen = New-Object System.Drawing.Pen $goldRule, 1
$g.DrawLine($rulePen, [single]$tx, [single]310, [single]($tx + 58), [single]310)

# Tagline — short, two lines, italic
$tagFont = New-Object System.Drawing.Font 'Georgia', 22, ([System.Drawing.FontStyle]::Italic), ([System.Drawing.GraphicsUnit]::Point)
$tagBrush = New-Object System.Drawing.SolidBrush $muted
$tagRect = New-Object System.Drawing.RectangleF ([single]$tx), ([single]340), ([single]($W - $tx - 90)), ([single]110)
$g.DrawString("A cinematic magazine`non Indian chai culture.", $tagFont, $tagBrush, $tagRect, $sfNear)
$tagFont.Dispose()
$tagBrush.Dispose()

# Quiet byline at the foot of the placard — only place the name appears
$bylineFont = New-Object System.Drawing.Font 'Georgia', 14, ([System.Drawing.FontStyle]::Italic), ([System.Drawing.GraphicsUnit]::Point)
$bylineBrush = New-Object System.Drawing.SolidBrush $quiet
$g.DrawString("Designed and coded by Pratik Patil", $bylineFont, $bylineBrush, [single]$tx, [single]510)
$bylineFont.Dispose()
$bylineBrush.Dispose()

# Stack credits — tiny tracked caps, sits just below the byline
$stackFont = New-Object System.Drawing.Font 'Georgia', 9, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Point)
$stackBrush = New-Object System.Drawing.SolidBrush $goldTrack
$g.DrawString("R E A C T    ·    T Y P E S C R I P T    ·    F R A M E R   M O T I O N", $stackFont, $stackBrush, [single]$tx, [single]545)
$stackFont.Dispose()
$stackBrush.Dispose()

$rulePen.Dispose()

# Save as high quality JPEG
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 94L

$publicDir = Split-Path $outPath -Parent
if (-not (Test-Path $publicDir)) { New-Item -ItemType Directory -Path $publicDir | Out-Null }
$bmp.Save($outPath, $jpegEncoder, $encParams)

$g.Dispose()
$bmp.Dispose()

$size = (Get-Item $outPath).Length
Write-Output ("Wrote {0} ({1:N0} bytes)" -f $outPath, $size)
