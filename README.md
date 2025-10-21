# Hugo conversion of 'My Blog'

## How to use
1. Install Hugo (extended) from https://gohugo.io/getting-started/installing/
2. In a terminal:
```bash
hugo server -s /mnt/data/hugo_my_blog -D
```
3. Open http://localhost:1313

## Notes
- Your original `index.html` body was placed into `layouts/index.html` inside `{ define "main" }`.
- Original `style.css` and `script.js` moved to `static/css/style.css` and `static/js/script.js`.
- `assets/avatar.jpg` moved to `static/images/avatar.jpg` (update your HTML if you referenced it elsewhere).
