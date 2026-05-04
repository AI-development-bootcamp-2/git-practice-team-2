Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$imgPath = "$PSScriptRoot\flying_bat.png"
$img = [System.Drawing.Image]::FromFile($imgPath)

$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds

$form = New-Object System.Windows.Forms.Form
$form.FormBorderStyle = 'None'
$form.TopMost = $true
$form.ShowInTaskbar = $false
$form.AllowTransparency = $true
$form.BackColor = [System.Drawing.Color]::Black
$form.TransparencyKey = [System.Drawing.Color]::Black
$form.Width = 150
$form.Height = 150
$form.StartPosition = 'Manual'

$pb = New-Object System.Windows.Forms.PictureBox
$pb.Image = $img
$pb.SizeMode = 'Zoom'
$pb.Dock = 'Fill'
$pb.BackColor = [System.Drawing.Color]::Black
$form.Controls.Add($pb)

$x = -160
$step = 0
$form.Location = New-Object System.Drawing.Point($x, ($screen.Height / 2))
$form.Show()

$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 16
$timer.Add_Tick({
    $script:x += 14
    $newY = [int]($screen.Height / 2 + 180 * [Math]::Sin($script:step * 0.08))
    $form.Location = New-Object System.Drawing.Point($script:x, $newY)
    $script:step++
    if ($script:x -gt $screen.Width + 160) {
        $timer.Stop()
        $form.Close()
    }
})
$timer.Start()
[System.Windows.Forms.Application]::Run($form)
