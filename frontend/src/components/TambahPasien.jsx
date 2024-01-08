import React, { Component } from 'react'
import UserService from '../services/UserService';

class TambahPasien extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            nama: '',
            usia: 0,
            jenis_kelamin: '',
            alamat: '',
            deskripsi: ''
        }
        this.ubahNama =
            this.ubahNama.bind(this);
        this.ubahUsia =
            this.ubahUsia.bind(this);
        this.ubahJenisKelamin =
            this.ubahJenisKelamin.bind(this);
        this.ubahAlamat =
            this.ubahAlamat.bind(this);
        this.ubahDeskripsi =
            this.ubahDeskripsi.bind(this);
        this.saveOrUpdatePasien =
            this.saveOrUpdatePasien.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            UserService.getPasienById(this.state.id).
            then((res) => {
                let pasien = res.data;
                this.setState({
                    nama: pasien.nama,
                    usia: pasien.usia,
                    jenis_kelamin: pasien.jenis_kelamin,
                    alamat: pasien.alamat,
                    deskripsi: pasien.deskripsi
                });
            });
        }
    }

    saveOrUpdatePasien = (e) => {
        e.preventDefault();

        let pasien = { nama: this.state.nama, usia:
             this.state.usia, jenis_kelamin: this.state.jenis_kelamin, alamat: this.state.alamat, deskripsi: this.state.deskripsi };
        console.log('pasien => ' + JSON.stringify(pasien));

        // step 5
        if (this.state.id === '_add') {
            UserService.createPasien(pasien).then(res => {
                this.props.history.push('/Dashboard');
            }).then(() => {
                // Tampilkan alert
                window.alert('Pasien berhasil ditambahkan!');
              });
        } else {
            const confirmUbah = window.confirm('Apakah Anda yakin ingin mengubah data pasien?');
            if (!confirmUbah) {
                this.props.history.push('/Dashboard'); // Kembali ke /Dashboard jika tidak jadi ubah data
                return;
            }
            UserService.updatePasien(pasien, this.state.id).then(res => {
                this.props.history.push('/Dashboard');
            }).then(() => {
                // Tampilkan alert
                window.alert('Data Pasien berhasil Diubah!');
              });
        }
    }

    ubahNama = (event) => {
        this.setState({ nama: event.target.value });
    }

    ubahUsia = (event) => {
        this.setState({ usia: event.target.value });
    }

    ubahJenisKelamin = (event) => {
        this.setState({ jenis_kelamin: event.target.value });
    }

    ubahAlamat = (event) => {
        this.setState({ alamat: event.target.value });
    }

    ubahDeskripsi = (event) => {
        this.setState({ deskripsi: event.target.value });
    }

    cancel() {
        this.props.history.push('/pasien_puskesmas_erdeatharamdaniputra');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Tambah Data Pasien</h3>
        } else {
            return <h3 className="text-center">Update Data Pasien</h3>
        }
    }

    ubahUsia = (event) => {
        const usia = event.target.value;
        const validUsia = /^[0-9]+$/.test(usia); // Cek apakah input hanya angka
        if (validUsia) {
            // Hanya ubah nilai jika nilai input diubah
            if (usia !== this.state.usia) {
                this.setState({ usia });
            }
        } else {
            // Tampilkan peringatan jika input bukan angka
            // (Anda bisa tambahkan kode untuk menampilkan peringatan di sini)
        }
    }

    incrementUsia = () => {
        const currentUsia = Number(this.state.usia);
        const newUsia = currentUsia + 1;
        this.setState({ usia: newUsia });
    };
    
    decrementUsia = () => {
        const currentUsia = Number(this.state.usia);
        if (currentUsia > 0) {
            const newUsia = currentUsia - 1;
            this.setState({ usia: newUsia });
        }
    };

    render() {
        return (
            <div>
                <br></br>
        <div className="container">
            <div className="row">
               <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
            <div className="form-group">
              <label> Nama : </label>
                <input placeholder="Nama" 
                  name="nama" className="form-control"
                    value={this.state.nama} 
                      onChange={this.ubahNama} />
            </div>
            <div className="form-group">
                <label> Usia : </label>
                <input type="number"
                    placeholder="Usia"
                    name="usia" className="form-control"
                    value={this.state.usia}
                    onChange={this.ubahUsia}
                    style={{ cursor: "pointer" }} />
                <div className="btn-group" style={{ justifyContent: "space-between" }}>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm is-active"
                        style={{ padding: "0px 10px", borderRadius: "50%",
                        cursor: "pointer" }}
                        onClick={this.incrementUsia}
                        >
                        <span style={{ fontSize: "20px" }}>+</span>
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm is-active"
                        style={{ padding: "0px 10px", borderRadius: "50%",
                        cursor: "pointer" }}
                        onClick={this.decrementUsia}>
                        <span style={{ fontSize: "20px" }}>-</span>
                    </button>
                </div>
            </div>
            <div className="form-group">
            <label> Jenis Kelamin : </label>
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="jenis_kelamin"
                    id="laki-laki"
                    value="laki-laki"
                    checked={this.state.jenis_kelamin === 'laki-laki'}
                    onChange={this.ubahJenisKelamin}
                />
                <label className="form-check-label" htmlFor="laki-laki">Laki-laki</label>
            </div>
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="jenis_kelamin"
                    id="perempuan"
                    value="perempuan"
                    checked={this.state.jenis_kelamin === 'perempuan'}
                    onChange={this.ubahJenisKelamin}
                />
                <label className="form-check-label" htmlFor="perempuan">Perempuan</label>
            </div>
        </div>
            <div className="form-group">
                <label> Alamat : </label>
                    <input placeholder="Alamat" 
                       name="alamat" className="form-control"
                        value={this.state.alamat} 
                         onChange={this.ubahAlamat} />
            </div>
            <div className="form-group">
                <label>Deskripsi:</label>
                <textarea placeholder="Deskripsi" 
                            name="deskripsi" 
                            className="form-control"
                            value={this.state.deskripsi} 
                            onChange={this.ubahDeskripsi} 
                            rows="5" />
            </div>

             <button className="btn btn-success" 
                  onClick={this.saveOrUpdatePasien}>Save
                    </button>
             <button className="btn btn-danger" 
                  onClick={this.cancel.bind(this)} 
                     style={{ marginLeft: "10px" }}>Cancel
                        </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TambahPasien
