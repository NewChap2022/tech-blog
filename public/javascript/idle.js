const endCookie = idleTimeout(
    () => {
        document.cookie = "secondAuth= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    },
    {
      element: document,
      timeout: 1000 * 60 * 30,
      loop: false
    }
  );