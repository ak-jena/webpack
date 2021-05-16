<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Todo</title>

    <link rel="icon" type="image/png" href="./img/icons/favicon.png" />

    <meta name="theme-color" content="#2A3443" />
    <meta name="description" content="Tutorial app." />

    <!-- iOS -->
    <link rel="apple-touch-icon" href="./img/icons/icon-144x144.png" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-status-bar-style" content="black" />
    <meta name="mobile-web-app-title" content="TutorialApp" />

    <script>
      if (!window.customElements) {
        document.write('<!--');
      }
    </script>
    <script src="./vendor/custom-elements-es5-adapter.js"></script>
    <!-- ! DO NOT REMOVE THIS COMMENT, WE NEED ITS CLOSING MARKER -->
  </head>

  <body>
    <header><h1>Todo app</h1></header>

    <main><todo-view></todo-view></main>
    <script src="./vendor/webcomponents-loader.js"></script>
  </body>
</html>
