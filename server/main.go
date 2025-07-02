package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strings"
)

func main() {
	http.Handle("/", (http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("hello")
		tmp, err := template.ParseFiles("../index.html")
		if err != nil {
			fmt.Println(err)
		}
		tmp.Execute(w, nil)
	})))
	http.HandleFunc("/core/", HandelPics)
	fmt.Println("the server is up")
	http.ListenAndServe(":8000", nil)
}

func HandelPics(w http.ResponseWriter, r *http.Request) {
	// if r.Method != http.MethodGet {
	// 	utils.WriteJSON(w, map[string]string{"error:": "mehtod not allowed"}, http.StatusMethodNotAllowed)
	// 	return
	// }
	fmt.Println("---------------------", r.URL.Path)
	path := r.URL.Path
	validpath := strings.TrimPrefix(r.URL.Path, "/core/")
	// validpath = strings.TrimPrefix(r.URL.Path, "/defaultIMG/")
	if validpath == "" {
		// utils.WriteJSON(w, map[string]string{"error": "Forbidden"}, http.StatusForbidden)
		return
	}

	http.ServeFile(w, r, ".."+path)
}
