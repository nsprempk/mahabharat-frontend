# Bhagavad Gita frontend AdSense audit notes

## Changes made in this audit

- Removed the static AdSense script from `index.html`; the app now uses one centralized loader.
- Added an explicit environment flag. All manual ad components stay hidden unless `VITE_ADS_ENABLED=true`. The supplied code now defaults to ads disabled.
- Kept the existing publisher `ads.txt` file. Verify its publisher ID against AdSense Account information.
- Moved the chapter-page ad from between clickable verse cards to after the chapter navigation.
- Moved the verse-page ad from immediately before the shloka selector/navigation controls to after the navigation controls.
- Kept the homepage ad after the substantial editorial content and its primary chapter CTA.
- Manual ad units remain restricted to the homepage, chapter pages, and verse pages; the chapter index, search, favorites, and policy pages are not ad routes.

## During the suspension

Keep `VITE_ADS_ENABLED=false`. Do not test or click live advertisements.

## After reinstatement

Only consider setting `VITE_ADS_ENABLED=true` after checking the Policy Center and reviewing the traffic sources and placements. Rebuild and deploy the production frontend after changing the environment variable. This is a technical control, not a guarantee of AdSense reinstatement or compliance.
