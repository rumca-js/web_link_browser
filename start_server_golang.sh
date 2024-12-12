go run -e "http.ListenAndServe(`:8000`, http.FileServer(http.Dir(`.`)))"
