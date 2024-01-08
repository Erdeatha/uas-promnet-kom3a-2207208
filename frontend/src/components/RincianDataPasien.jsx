import React, { Component } from 'react'
import UserService from '../services/UserService'

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            pasien: {}
        }
    }

    componentDidMount(){
        UserService.getPasienById(this.state.id).then( res => {
            this.setState({pasien: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> 
                    Rincian Data Pasien</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Nama : </label>
                            <div> { this.state.pasien.nama }
                            </div>
                        </div>
                        <div className = "row">
                            <label> Usia : </label>
                            <div> { this.state.pasien.usia }
                            </div>
                        </div>
                        <div className = "row">
                            <label> Jenis Kelamin : </label>
                            <div> { this.state.pasien.jenis_kelamin }
                            </div>
                        </div>
                        <div className = "row">
                            <label> Alamat : </label>
                            <div> { this.state.pasien.alamat }
                            </div>
                        </div>
                        <div className = "row">
                            <label> Deskripsi : </label>
                            <div> { this.state.pasien.deskripsi }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewUserComponent
