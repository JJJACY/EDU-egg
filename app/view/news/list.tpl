<html>
  <head>
    <title>Hacker News</title>
    <!-- <link rel="stylesheet" href="/public/css/news.css" /> -->
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>

<!-- <script crossorigin="anonymous" integrity="sha384-3zW4Ss6nBzDaj/vvjP2Qwu5xaWAzOgTSccYj0DfBO/5tDzQksJa+tWrYMlYPM00u" src="https://lib.baomitu.com/axios/0.19.2/axios.min.js"></script> -->
<script type="text/javascript">
  
</script>

