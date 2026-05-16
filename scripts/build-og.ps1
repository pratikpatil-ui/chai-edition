#requires -Version 5.1
<#
.SYNOPSIS
  Composes public/og-cover-v3.jpg as an editorial "gallery placard":
  the Chai Edition cover sits as a framed portrait artifact on the left,
  with credit-card metadata (title, description, byline, stack) on the right.
  1200x630, Open Graph spec. Re-run after tweaking copy or layout.
#>

Add-Type -AssemblyName System.Drawing

$root      = Split-Path -Parent $PSScriptRoot
$heroPath  = Join-Path $root 'src\assets\images\chai_01_hero_cinematic.jpg'
$outPath   = Join-Path $root 'public\og-cover-v3.jpg'

if (-not (Test-Path $heroPath)) { throw "Hero photo not found at $heroPath" }

$W = 1200; $H = 630

$bmp = New-Object System.Drawing.Bitmap $W, $H, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint  = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

# Palette
$bg       = [System.Drawing.Color]::FromArgb(255, 18, 13, 10)
$gold     = [System.Drawing.Color]::FromArgb(255, 197, 152, 96)
$goldSoft = [System.Drawing.Color]::FromArgb(150, 197, 152, 96)
$cream    = [System.Drawing.Color]::FromArgb(255, 245, 233, 212)
$muted    = [System.Drawing.Color]::FromArgb(220, 215, 198, 170)

# Solid warm-dark background
$bgBrush = New-Object System.Drawing.SolidBrush $bg
$g.FillRectangle($bgBrush, 0, 0, $W, $H)
$bgBrush.Dispose()

# Subtle warm wash from left to give the canvas depth
$wash = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Point 0, 0),
  (New-Object System.Drawing.Point $W, $H),
  ([System.Drawing.Color]::FromArgb(35, 70, 42, 22)),
  ([System.Drawing.Color]::FromArgb(0, 18, 13, 10))
)
$g.FillRectangle($wash, 0, 0, $W, $H)
$wash.Dispose()

# === Top editorial header marks ===
$markFont = New-Object System.Drawing.Font 'Georgia', 10, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Point)
$markBrush = New-Object System.Drawing.SolidBrush $goldSoft

$sfNear   = New-Object System.Drawing.StringFormat
$sfNear.Alignment = [System.Drawing.StringAlignment]::Near
$sfCenter = New-Object System.Drawing.StringFormat
$sfCenter.Alignment = [System.Drawing.StringAlignment]::Center
$sfFar    = New-Object System.Drawing.StringFormat
$sfFar.Alignment = [System.Drawing.StringAlignment]::Far

$g.DrawString("E S T .   M M X X V I", $markFont, $markBrush,
  (New-Object System.Drawing.RectangleF ([single]80), ([single]28), ([single]200), ([single]20)), $sfNear)
$g.DrawString("A   P O R T F O L I O   P I E C E", $markFont, $markBrush,
  (New-Object System.Drawing.RectangleF ([single]0), ([single]28), ([single]$W), ([single]20)), $sfCenter)
$g.DrawString("I S S U E   N O .   0 1", $markFont, $markBrush,
  (New-Object System.Drawing.RectangleF ([single]($W - 280)), ([single]28), ([single]200), ([single]20)), $sfFar)

$markBrush.Dispose()
$markFont.Dispose()

# Hairline gold rule under the header
$hairPen = New-Object System.Drawing.Pen $goldSoft, 1
$g.DrawLine($hairPen, 80, 60, ($W - 80), 60)

# === Cover frame: the magazine as a portrait artifact ===
$cx = 90; $cy = 90; $cw = 380; $ch = 500

# Soft drop shadow — two layers, no real blur but progressive offset/alpha
$shadowParams = @(
  @{ off = 14; alpha = 38 },
  @{ off = 8;  alpha = 70 }
)
foreach ($s in $shadowParams) {
  $sBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($s.alpha, 0, 0, 0))
  $g.FillRectangle($sBrush, ($cx + $s.off), ($cy + $s.off + 2), $cw, $ch)
  $sBrush.Dispose()
}

# Clip and draw the hero photo into the cover
$hero = [System.Drawing.Image]::FromFile($heroPath)
$photoScale = [Math]::Max($cw / $hero.Width, $ch / $hero.Height)
$pw = [int]($hero.Width  * $photoScale)
$ph = [int]($hero.Height * $photoScale)
# Center horizontally on the chai glass (slightly right of frame center in source)
$px = $cx + [int](($cw - $pw) / 2) - 20
$py = $cy + [int](($ch - $ph) / 2)

$clip = New-Object System.Drawing.Rectangle $cx, $cy, $cw, $ch
$g.SetClip($clip)
$g.DrawImage($hero, $px, $py, $pw, $ph)
$g.ResetClip()
$hero.Dispose()

# Top-of-cover dark gradient (for masthead legibility)
$topGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Point $cx, $cy),
  (New-Object System.Drawing.Point $cx, ($cy + 150)),
  ([System.Drawing.Color]::FromArgb(225, 12, 8, 5)),
  ([System.Drawing.Color]::FromArgb(0, 12, 8, 5))
)
$g.FillRectangle($topGrad, $cx, $cy, $cw, 150)
$topGrad.Dispose()

# Bottom-of-cover dark gradient (for issue marker legibility)
$botGrad = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Point $cx, ($cy + $ch - 130)),
  (New-Object System.Drawing.Point $cx, ($cy + $ch)),
  ([System.Drawing.Color]::FromArgb(0, 12, 8, 5)),
  ([System.Drawing.Color]::FromArgb(225, 12, 8, 5))
)
$g.FillRectangle($botGrad, $cx, ($cy + $ch - 130), $cw, 130)
$botGrad.Dispose()

# Cover outer gold border (hairline)
$borderPen = New-Object System.Drawing.Pen $gold, 1.5
$g.DrawRectangle($borderPen, $cx, $cy, $cw, $ch)
$borderPen.Dispose()

# Cover inner border (faint, 12px inset)
$innerPen = New-Object System.Drawing.Pen $goldSoft, 1
$g.DrawRectangle($innerPen, ($cx + 12), ($cy + 12), ($cw - 24), ($ch - 24))
$innerPen.Dispose()

# Cover masthead "CHAI EDITION"
$mastheadFont = New-Object System.Drawing.Font 'Georgia', 22, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Point)
$mastheadBrush = New-Object System.Drawing.SolidBrush $cream
$mastheadRect = New-Object System.Drawing.RectangleF ([single]$cx), ([single]($cy + 42)), ([single]$cw), ([single]50)
$g.DrawString("CHAI EDITION", $mastheadFont, $mastheadBrush, $mastheadRect, $sfCenter)
$mastheadFont.Dispose()
$mastheadBrush.Dispose()

# Hairline rule below masthead
$rulePen = New-Object System.Drawing.Pen $gold, 1
$ruleMidX = $cx + [int]($cw / 2)
$g.DrawLine($rulePen, ($ruleMidX - 38), ($cy + 92), ($ruleMidX + 38), ($cy + 92))

# Cover footer "VOL. 01 · MMXXVI"
$volFont = New-Object System.Drawing.Font 'Georgia', 10, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Point)
$volBrush = New-Object System.Drawing.SolidBrush $gold
$volRect = New-Object System.Drawing.RectangleF ([single]$cx), ([single]($cy + $ch - 44)), ([single]$cw), ([single]20)
$g.DrawString("V O L .   0 1     ·     M M X X V I", $volFont, $volBrush, $volRect, $sfCenter)
$volFont.Dispose()
$volBrush.Dispose()

# Hairline rule above the cover footer
$g.DrawLine($rulePen, ($ruleMidX - 50), ($cy + $ch - 52), ($ruleMidX + 50), ($cy + $ch - 52))

# === Right placard: the credit card ===
$tx = 555
$tw = $W - $tx - 90

# Project title (italic display serif, the artwork's name)
$titleFont = New-Object System.Drawing.Font 'Georgia', 40, ([System.Drawing.FontStyle]::Italic), ([System.Drawing.GraphicsUnit]::Point)
$titleBrush = New-Object System.Drawing.SolidBrush $cream
$g.DrawString("Chai Edition", $titleFont, $titleBrush, [single]($tx - 4), [single]120)
$titleFont.Dispose()
$titleBrush.Dispose()

# Hairline under title
$g.DrawLine($rulePen, [single]$tx, [single]212, [single]($tx + 60), [single]212)

# Description (italic serif body)
$descFont = New-Object System.Drawing.Font 'Georgia', 19, ([System.Drawing.FontStyle]::Italic), ([System.Drawing.GraphicsUnit]::Point)
$descBrush = New-Object System.Drawing.SolidBrush $muted
$descRect = New-Object System.Drawing.RectangleF ([single]$tx), ([single]235), ([single]$tw), ([single]120)
$g.DrawString("A cinematic digital magazine`non Indian chai culture, framed`nas a print issue for the web.", $descFont, $descBrush, $descRect, $sfNear)
$descFont.Dispose()
$descBrush.Dispose()

# Byline eyebrow
$eyeFont = New-Object System.Drawing.Font 'Georgia', 10, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Point)
$eyeBrush = New-Object System.Drawing.SolidBrush $gold
$g.DrawString("D E S I G N E D   A N D   C O D E D   B Y", $eyeFont, $eyeBrush, [single]$tx, [single]400)
$eyeFont.Dispose()
$eyeBrush.Dispose()

# Name (the artist)
$nameFont = New-Object System.Drawing.Font 'Georgia', 30, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Point)
$nameBrush = New-Object System.Drawing.SolidBrush $cream
$g.DrawString("Pratik Patil", $nameFont, $nameBrush, [single]($tx - 4), [single]420)
$nameFont.Dispose()
$nameBrush.Dispose()

# Hairline above the stack credits
$g.DrawLine($rulePen, [single]$tx, [single]510, [single]($tx + 260), [single]510)
$rulePen.Dispose()

# Stack credits footer
$stackFont = New-Object System.Drawing.Font 'Georgia', 10, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Point)
$stackBrush = New-Object System.Drawing.SolidBrush $gold
$g.DrawString("R E A C T    ·    T Y P E S C R I P T    ·    F R A M E R   M O T I O N", $stackFont, $stackBrush, [single]$tx, [single]530)
$stackFont.Dispose()
$stackBrush.Dispose()

# Bottom hairline matching the header
$bottomPen = New-Object System.Drawing.Pen $goldSoft, 1
$g.DrawLine($bottomPen, 80, ($H - 60), ($W - 80), ($H - 60))
$bottomPen.Dispose()

# Bottom corner marks (footer)
$footerMarkFont = New-Object System.Drawing.Font 'Georgia', 10, ([System.Drawing.FontStyle]::Italic), ([System.Drawing.GraphicsUnit]::Point)
$footerMarkBrush = New-Object System.Drawing.SolidBrush $goldSoft
$g.DrawString("a cinematic edition", $footerMarkFont, $footerMarkBrush,
  (New-Object System.Drawing.RectangleF ([single]80), ([single]($H - 48)), ([single]200), ([single]20)), $sfNear)
$g.DrawString("steeped, written, designed for the web", $footerMarkFont, $footerMarkBrush,
  (New-Object System.Drawing.RectangleF ([single]($W - 480)), ([single]($H - 48)), ([single]400), ([single]20)), $sfFar)
$footerMarkFont.Dispose()
$footerMarkBrush.Dispose()

$hairPen.Dispose()

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
