# rollup-plugin-material-symbols
 
## example

<!DOCTYPE html>
```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  // @material-symbols-link
</head>
<body>
  <span style="display: none;">
    <template name="home">@symbol-home</template>
    <template name="more_vert">@symbol-more_vert</template>
  </span>

  <test-icon>home</test-icon>
  <test-icon>more_vert</test-icon>
  <script src="./icon.js" type="module"></script>
</body>
</html>
```