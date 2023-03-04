
Set-Location $PSScriptRoot

$mimes = @"
[
"image/jpeg",
"image/webp",
"image/png"
]
"@ | ConvertFrom-Json

$hars = @"
[
    "imgs.json",
    "imgs1.har",
    "imgs2.har"
]
"@ | ConvertFrom-Json

$images = New-Object "System.Collections.Generic.Dictionary[[string],[string]]"


$hars | ForEach-Object {

    $path = $_
    $json = get-content $path | ConvertFrom-Json

    $entries = $json.log.entries

    foreach ($entry in $entries) {
        
        $b64 = $entry.response.content.text

        if (-not [String]::IsNullOrEmpty($b64)) {

            $mime = $entry.response.content.mimeType
            $ext = $mime -replace "image/", ""

            if ($mimes.Contains($mime)) {
                #$src = "data:$($mime);base64,$($b64)"
                # $filename = "C:\Users\MensuriWS\source\Repos\HtmlPure\LeximeTePara\img\$($counter).$($ext)"
                # $bytes = [Convert]::FromBase64String($b64)
                # [IO.File]::WriteAllBytes($filename, $bytes)
                # $counter++

                #$images[$b64] = $ext
                if (-not $images.ContainsKey($b64)) {
                    $images.Add($b64, $ext)
                }

            }
            
            

        }


        
        
    }

    

}

$cnt = 0

foreach ($b64 in $images.Keys) {    
    $ext = $images[$b64]
    $filename = "C:\Users\MensuriWS\source\Repos\HtmlPure\LeximeTePara\img\$($cnt).$($ext)"
    $bytes = [Convert]::FromBase64String($b64)
    [IO.File]::WriteAllBytes($filename, $bytes)
    $cnt++
}


# for ($i = 0; $i -lt $images.Keys.Count; $i++) {
#     $b64 = $images.Keys[$i]
#     $ext = $images[$b64]

#     $filename = "C:\Users\MensuriWS\source\Repos\HtmlPure\LeximeTePara\img\$($i).$($ext)"
#     $bytes = [Convert]::FromBase64String($b64)
#     [IO.File]::WriteAllBytes($filename, $bytes)
# }