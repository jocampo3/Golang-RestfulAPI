package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Album represents data about a record album
type album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

// Albums slice to seed record album data
var albums = []album{
	{ID: "1", Title: "Blue Train", Artist: "John Coltraine", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func main() {
	router := gin.Default()
	router.GET("/albums", getAlbums)
	router.POST("/albums", postAlbums)
	router.DELETE("/albums/:id", deleteAlbum)
	router.PUT("/albums/:id", updateAlbum)
	router.Run("localhost:8080")
}

// getAlbums responds with the list of all albums as JSON
// Note: Gin is a web framework written in Go. It features martini-like API with performance that is up to 40
// -times faster thanks to httprouter.
// Note: gin.Context carries request details, validates and seralizes JSON, and more.
// "c" == Context
func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums) // This functions first argument is the status code we want to send to the client (statusOK == 200)
}

// postAlbums adds an album from JSON received in the request body.
func postAlbums(c *gin.Context) {
	var newAlbum album

	// Call BindJSON to bind the received JSON to newAlbum
	if err := c.BindJSON(&newAlbum); err != nil {
		c.IndentedJSON(http.StatusOK, gin.H{"message": "Album Created"})
		return
	}

	albums = append(albums, newAlbum)
	c.IndentedJSON(http.StatusCreated, newAlbum)
}

func deleteAlbum(c *gin.Context) {
	id := c.Param("id")

	for i, a := range albums {
		if a.ID == id {
			albums = append(albums[:i], albums[i+1:]...)
			c.IndentedJSON(http.StatusOK, gin.H{"message": "Album Deleted"})
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Album not found"})
}

func updateAlbum(c *gin.Context) {
	id := c.Param("id")
	var updatedAlbum album

	// Bind JSON body to updatedAlbum struct
	if err := c.BindJSON(&updatedAlbum); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid request"})
		return
	}

	// Find the album by ID and update it
	for i, a := range albums {
		if a.ID == id {
			albums[i] = updatedAlbum // Replace existing album with updated data
			c.IndentedJSON(http.StatusOK, gin.H{"message": "Album updated", "album": updatedAlbum})
			return
		}
	}

	// If album is not found, return 404
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Album not found"})
}
