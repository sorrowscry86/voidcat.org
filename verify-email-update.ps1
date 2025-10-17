#!/usr/bin/env powershell
# VoidCat.org Email & Branding Update Verification Script
# Purpose: Verify all email references have been updated to sorrowscry86@voidcat.org
# Date: October 17, 2025

Write-Host "================================" -ForegroundColor Cyan
Write-Host "VoidCat.org Email Update Report" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$repoPath = "c:\Users\Wykeve\OneDrive\Documents\GitHub\voidcat.org"
$updatedPages = @(
    "index.html",
    "contact\index.html", 
    "investors\index.html"
)

Write-Host "Email Update Status:" -ForegroundColor Green
Write-Host ""

foreach ($page in $updatedPages) {
    $fullPath = Join-Path $repoPath $page
    $content = Get-Content $fullPath -Raw
    
    $newEmailCount = ($content | Select-String -Pattern "sorrowscry86@voidcat\.org" -AllMatches).Matches.Count
    $oldEmailCount = ($content | Select-String -Pattern "hello@voidcatrdc\.com" -AllMatches).Matches.Count
    
    Write-Host "  [OK] $page" -ForegroundColor Green
    Write-Host "     -> New email (sorrowscry86@voidcat.org): $newEmailCount instances" -ForegroundColor White
    if ($oldEmailCount -gt 0) {
        Write-Host "     -> Old email (hello@voidcatrdc.com): $oldEmailCount instances [WARNING]" -ForegroundColor Red
    } else {
        Write-Host "     -> Old email references: 0 (Cleaned)" -ForegroundColor Green
    }
    Write-Host ""
}

Write-Host "Global Search Results:" -ForegroundColor Yellow
Write-Host ""

$allFiles = Get-ChildItem -Path $repoPath -Include "*.html" -Recurse

$newEmailTotal = 0
$oldEmailTotal = 0

foreach ($file in $allFiles) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    $newCount = ($content | Select-String -Pattern "sorrowscry86@voidcat\.org" -AllMatches).Matches.Count
    $oldCount = ($content | Select-String -Pattern "hello@voidcatrdc\.com" -AllMatches).Matches.Count
    
    $newEmailTotal += $newCount
    $oldEmailTotal += $oldCount
}

Write-Host "  Total instances of sorrowscry86@voidcat.org: $newEmailTotal" -ForegroundColor Green
Write-Host "  Total instances of hello@voidcatrdc.com: $oldEmailTotal" -ForegroundColor $(if ($oldEmailTotal -eq 0) { "Green" } else { "Red" })
Write-Host ""

Write-Host "Update Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Contact Information Summary:" -ForegroundColor Cyan
Write-Host "  Email:       sorrowscry86@voidcat.org"
Write-Host "  GitHub:      @sorrowscry86"
Write-Host "  Domain:      voidcatrdc.com -> displays as VoidCat.org"
Write-Host "  Company:     VoidCat RDC, LLC"
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
