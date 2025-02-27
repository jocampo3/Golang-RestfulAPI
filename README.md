# Golang RESTful API

Welcome to my **basic Golang RESTful API** repository! 🚀

This project is a simple **microservice** that provides basic **CRUD operations** using the [Gin framework](https://github.com/gin-gonic/gin). It allows you to create, read, update, and delete album records.

## 📌 Features
- ✅ GET all albums
- ✅ POST a new album
- ✅ PUT (update) an existing album
- ✅ DELETE an album

---

## 🚀 Running the Program
### **1️⃣ Install Dependencies** (if needed)
> The dependencies should already be included, but just in case, run:
```sh
go get .
```

### **2️⃣ Start the Server**
Open a terminal and run:
```sh
go run .
```
This starts the API server on **localhost:8080**.

### **3️⃣ Test API Endpoints**
Open a different terminal and invoke various HTTP requests.

#### 🔍 **Get all albums**
- **PowerShell:**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:8080/albums" -Method Get
  ```
- **Linux/macOS (cURL):**
  ```sh
  curl -X GET http://localhost:8080/albums
  ```

#### ➕ **Create a new album**
- **PowerShell:**
  ```powershell
  $body = @{ id = "4"; title = "New Album"; artist = "New Artist"; price = 29.99 } | ConvertTo-Json
  Invoke-RestMethod -Uri "http://localhost:8080/albums" -Method Post -Body $body -ContentType "application/json"
  ```
- **Linux/macOS (cURL):**
  ```sh
  curl -X POST "http://localhost:8080/albums" \  
  -H "Content-Type: application/json" \  
  -d '{"id":"4","title":"New Album","artist":"New Artist","price":29.99}'
  ```

#### ✏️ **Update an album** (Example: Update album with ID `1`)
- **PowerShell:**
  ```powershell
  $body = @{ id = "1"; title = "Blue Train (Updated)"; artist = "John Coltrane"; price = 59.99 } | ConvertTo-Json
  Invoke-RestMethod -Uri "http://localhost:8080/albums/1" -Method Put -Body $body -ContentType "application/json"
  ```
- **Linux/macOS (cURL):**
  ```sh
  curl -X PUT "http://localhost:8080/albums/1" \  
  -H "Content-Type: application/json" \  
  -d '{"id":"1","title":"Blue Train (Updated)","artist":"John Coltrane","price":59.99}'
  ```

#### ❌ **Delete an album** (Example: Delete album with ID `1`)
- **PowerShell:**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:8080/albums/1" -Method Delete
  ```
- **Linux/macOS (cURL):**
  ```sh
  curl -X DELETE http://localhost:8080/albums/1
  ```

---

Happy coding! 🎯🔥

