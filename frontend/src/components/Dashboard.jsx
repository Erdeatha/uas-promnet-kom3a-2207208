import React, { Component } from 'react'
import PasienService from '../services/UserService'

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
                pasien: []
        }
        this.addPasien = this.addPasien.bind(this);
        this.editPasien = this.editPasien.bind(this);
        this.deletePasien = this.deletePasien.bind(this);
    }

    deletePasien(id){
        PasienService.deletePasien(id).then( res => {
            const confirmHapus = window.confirm('Apakah Anda yakin ingin menghapus data pasien?');
            if (!confirmHapus) {
                this.props.history.push('/Dashboard'); // Kembali ke /Dashboard jika tidak jadi ubah data
                return;
            }else{
            this.setState({pasien: 
                this.state.pasien.
                filter(pasien => pasien.id !== id)});
                window.alert('Data Pasien Berhasil Dihapus!');
            }});
    }
    viewPasien(id){
        this.props.history.push(`/view-pasien/${id}`);
    }
    editPasien(id){
        this.props.history.push(`/add-pasien/${id}`);
    }

    componentDidMount(){
        PasienService.getPasien().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-pasien/_add');
            }
            this.setState({ pasien: res.data});
        });
    }

    addPasien(){
        this.props.history.push('/add-pasien/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">
                     List Pasien</h2>
                 <div className = "row">
                    <button className="btn btn-primary"
                     onClick={this.addPasien}> Tambah Pasien</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className 
                        = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Nama</th>
                                    <th> Usia</th>
                                    <th> Jenis Kelamin </th>
                                    <th> Alamat</th>
                                    <th> Deskripsi</th>
                                    <th> Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.pasien.map(
                                        pasien => 
                                        <tr key = {pasien.id}>
                                   <td> {pasien.nama} </td>   
                                   <td> {pasien.usia}</td>
                                   <td> {pasien.jenis_kelamin}</td>
                                   <td> {pasien.alamat}</td>
                                   <td> {pasien.deskripsi}</td>
                                             <td>
                      <button onClick={ () => 
                          this.editPasien(pasien.id)} 
                               className="btn btn-info">Update 
                                 </button>
                       <button style={{marginLeft: "10px"}}
                          onClick={ () => this.deletePasien(pasien.id)} 
                             className="btn btn-danger">Delete 
                                 </button>
                       <button style={{marginLeft: "10px"}} 
                           onClick={ () => this.viewPasien(pasien.id)}
                              className="btn btn-info">View 
                                  </button>
                                    </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>
            </div>
        )
    }
}

export default Dashboard
