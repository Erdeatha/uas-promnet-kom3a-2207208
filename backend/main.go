package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
		
	router.HandleFunc("/pasien_puskesmas_erdeatharamdaniputra",
		GetPasien).Methods("GET")
	router.HandleFunc("/pasien_puskesmas_erdeatharamdaniputra",
		CreatePasien).Methods("POST")
	router.HandleFunc("/pasien_puskesmas_erdeatharamdaniputra/{id}",
		GetPasienID).Methods("GET")
	router.HandleFunc("/pasien_puskesmas_erdeatharamdaniputra/{id}",
		UpdatePasien).Methods("PUT")
	router.HandleFunc("/pasien_puskesmas_erdeatharamdaniputra/{id}",
		DeletePasien).Methods("DELETE")
	http.ListenAndServe(":9080",
		&CORSRouterDecorator{router})
}

/***************************************************/

//Get all users
func GetPasien(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var pasien []Pasien
	result, err := db.Query("SELECT * from pasien_puskesmas_erdeatharamdaniputra")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var pasien_data Pasien
		err := result.Scan(&pasien_data.ID, &pasien_data.Nama, &pasien_data.Usia, &pasien_data.Jenis_kelamin, &pasien_data.Alamat, &pasien_data.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
		pasien = append(pasien, pasien_data)
	}
	json.NewEncoder(w).Encode(pasien)
}

//Create user
func CreatePasien(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO pasien_puskesmas_erdeatharamdaniputra(nama, usia, jenis_kelamin, alamat, deskripsi) VALUES(?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)

	nama := keyVal["nama"]
	usia := keyVal["usia"]
	jenis_kelamin := keyVal["jenis_kelamin"]
	alamat := keyVal["alamat"]
	deskripsi := keyVal["deskripsi"]
	_, err = stmt.Exec(nama, usia, jenis_kelamin, alamat, deskripsi)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Data Pasien Telah Ditambahkan!")
}

//Get user by ID
func GetPasienID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT * from pasien_puskesmas_erdeatharamdaniputra WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var pasien Pasien
	for result.Next() {
		err := result.Scan(&pasien.ID, &pasien.Nama, &pasien.Usia, &pasien.Jenis_kelamin, &pasien.Alamat, &pasien.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(pasien)
}

//Update user
func UpdatePasien(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE pasien_puskesmas_erdeatharamdaniputra SET nama = ?, usia=?, jenis_kelamin=?, alamat=?, deskripsi=? WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	nama := keyVal["nama"]
	usia := keyVal["usia"]
	jenis_kelamin := keyVal["jenis_kelamin"]
	alamat := keyVal["alamat"]
	deskripsi := keyVal["deskripsi"]
	_, err = stmt.Exec(nama, usia, jenis_kelamin, alamat, deskripsi, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Data Pasien dengan ID = %s dan Nama = %s telah diubah",
		params["id"], nama)
}

//Delete User
func DeletePasien(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM pasien_puskesmas_erdeatharamdaniputra WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Data Pasien dengan ID = %s telah dihapus",
		params["id"])
}

/***************************************************/


type Pasien struct {
	ID               string `json:"id"`
	Nama             string `json:"nama"`
	Usia             string `json:"usia"`
	Jenis_kelamin    string `json:"jenis_kelamin"`
	Alamat           string `json:"alamat"`
	Deskripsi        string `json:"deskripsi"`
}

//Db configuration
var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql",
		"root:@tcp(127.0.0.1:3306)/db_2207208_erdeatharamdaniputra_uas")
	if err != nil {
		panic(err.Error())
	}
}

/***************************************************/

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language,"+
				" Content-Type, YourOwnHeader")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
